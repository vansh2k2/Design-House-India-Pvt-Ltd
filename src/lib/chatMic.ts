/* The open microphone for talking to the website chat (components/ui/Chatbot.tsx). Once it is on it keeps listening
   between turns: it notices when the visitor starts and stops talking, and hands over just that part of the sound
   as a WAV clip, so silence and background noise are never uploaded. It also notices the visitor talking over the
   assistant, which has to be told apart from the assistant's own voice coming back through the speakers. */

const UPLOAD_RATE = 16000; // plenty for speech, and a third of what the browser records

// Sound levels (RMS, 0 to 1). Laptop mics can be quiet.
const SPEECH_LEVEL = 0.012;
const NOISE_MARGIN = 3; // speech is this many times louder than the room's background noise
const QUIETEST_ROOM = 0.002;
const INTERRUPT_LEVEL = 0.012; // while the assistant talks, the visitor must be at least this loud...
const OVER_ECHO_MARGIN = 2.5; // ...and this many times louder than its voice coming back through the mic...
const INTERRUPT_CEILING = 0.06; // ...but this is always loud enough, so a wrong guess about the echo can't lock the visitor out

// Times in milliseconds
const WARM_UP_MS = 300; // mics click when they switch on
const ROOM_WINDOW_MS = 2000; // speech always has small gaps within this time: sound with no gap at all is the room, not a person
const START_AFTER_MS = 120; // this much sound counts as the visitor starting to talk
const SUSPECT_AFTER_MS = 140; // the same, while the assistant is talking: it pauses at once...
const SETTLE_MS = 120; // ...its voice fades from the room...
const CONFIRM_SPEECH_MS = 140; // ...and sound that carries on is the visitor...
const CONFIRM_WINDOW_MS = 800; // ...but if there is none by now it was only an echo, and the assistant carries on
const AFTER_ASSISTANT_MS = 350; // the room still rings for a moment after the assistant stops
export const STOP_AFTER_QUIET_MS = 1000; // the visitor has finished
const MIN_SPEECH_MS = 250; // a cough or a door, not worth sending
const MAX_SPEECH_MS = 30000;
const PRE_ROLL_MS = 500; // kept from before the start was noticed, so the first word isn't cut
const AFTER_FALSE_ALARM_MS = 2000; // a false alarm may have been the visitor after all: keep that sound a little longer
const TAIL_KEPT_MS = 300;
const MAX_FALSE_ALARMS = 3; // loud speakers: stop checking until the assistant's next turn, rather than stutter

export interface DetectorEvents {
  onCaptureStart: () => void;
  onInterruptSuspected: () => void;
  onFalseAlarm: () => void;
  onSpeechStart: () => void;
  onSpeechEnd: (usable: boolean, quietMs: number) => void;
}

/** Decides from sound levels alone who is talking. Separate from the mic, so it can be tested without one. */
export const createSpeechDetector = (events: DetectorEvents) => {
  let state: "waiting" | "confirming" | "speech" = "waiting";
  let assistantTalking = false;
  let recentLevels: number[] = [];
  let thresholdAtStart = 0;
  let echo = 0;
  let peak = 0;
  let warmUp = WARM_UP_MS;
  let voiced = 0;
  let confirmTime = 0;
  let confirmVoiced = 0;
  let quiet = 0;
  let talked = 0;
  let heard = 0;
  let afterAssistant = 0;
  let falseAlarms = 0;

  const room = () => Math.max(QUIETEST_ROOM, Math.min(...recentLevels));
  const threshold = () => Math.max(SPEECH_LEVEL, room() * NOISE_MARGIN);
  const startSpeech = () => {
    state = "speech";
    thresholdAtStart = threshold();
    voiced = quiet = talked = heard = 0;
    events.onSpeechStart();
  };

  return {
    setAssistantTalking(on: boolean) {
      if (assistantTalking && !on) afterAssistant = AFTER_ASSISTANT_MS;
      if (on) falseAlarms = 0;
      assistantTalking = on;
    },

    /** What sounded like the visitor over the assistant turned out to be nothing: don't react so easily again */
    falseStart() {
      falseAlarms += 1;
      echo = Math.max(echo, peak * 0.5);
    },

    /** One short piece of sound: its level, and how long it lasted */
    frame(level: number, ms: number) {
      recentLevels.push(level);
      if (recentLevels.length * ms > ROOM_WINDOW_MS) recentLevels.shift();

      if (warmUp > 0) {
        warmUp -= ms;
        return;
      }

      if (state === "speech") {
        talked += ms;
        if (level > threshold() * 0.7) {
          heard += ms;
          quiet = 0;
        } else {
          quiet += ms;
        }
        if (quiet >= STOP_AFTER_QUIET_MS || talked >= MAX_SPEECH_MS) {
          state = "waiting";
          voiced = 0;
          // A fan switched on looks like talking until it never pauses: then it is the room, and isn't sent
          events.onSpeechEnd(heard >= MIN_SPEECH_MS && room() < thresholdAtStart, quiet);
        }
        return;
      }

      if (state === "confirming") {
        confirmTime += ms;
        if (confirmTime > SETTLE_MS && level > threshold()) confirmVoiced += ms;
        if (confirmVoiced >= CONFIRM_SPEECH_MS) {
          startSpeech();
        } else if (confirmTime >= CONFIRM_WINDOW_MS) {
          // Only the assistant's own voice: remember how loud it comes back, so it doesn't happen again
          state = "waiting";
          voiced = 0;
          falseAlarms += 1;
          echo = Math.max(echo, peak * 0.5);
          events.onFalseAlarm();
        }
        return;
      }

      const guarded = assistantTalking || afterAssistant > 0;
      if (afterAssistant > 0) afterAssistant -= ms;

      if (guarded) {
        if (assistantTalking && falseAlarms >= MAX_FALSE_ALARMS) return;
        if (level > Math.max(threshold(), Math.min(INTERRUPT_CEILING, Math.max(INTERRUPT_LEVEL, echo * OVER_ECHO_MARGIN)))) {
          voiced += ms;
          peak = Math.max(peak, level);
        } else {
          voiced = Math.max(0, voiced - ms);
          peak = 0;
          echo += (level - echo) * (level > echo ? 0.1 : 0.002); // how loud its voice comes back, not a single bump
        }
        if (voiced >= SUSPECT_AFTER_MS) {
          events.onCaptureStart();
          if (assistantTalking) {
            state = "confirming";
            confirmTime = confirmVoiced = 0;
            events.onInterruptSuspected();
          } else {
            startSpeech();
          }
        }
        return;
      }

      if (level > threshold()) {
        voiced += ms;
      } else {
        voiced = Math.max(0, voiced - ms);
      }
      if (voiced >= START_AFTER_MS) {
        events.onCaptureStart();
        startSpeech();
      }
    },
  };
};

/** Sound pieces as a 16 kHz, 16-bit mono WAV file */
export const encodeWav = (pieces: Float32Array[], sampleRate: number): Blob => {
  const total = pieces.reduce((sum, piece) => sum + piece.length, 0);
  const merged = new Float32Array(total);
  let at = 0;
  for (const piece of pieces) {
    merged.set(piece, at);
    at += piece.length;
  }

  const step = sampleRate / UPLOAD_RATE;
  const count = Math.floor(total / step);
  const view = new DataView(new ArrayBuffer(44 + count * 2));
  const text = (offset: number, value: string) => [...value].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)));
  text(0, "RIFF");
  view.setUint32(4, 36 + count * 2, true);
  text(8, "WAVEfmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, UPLOAD_RATE, true);
  view.setUint32(28, UPLOAD_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, "data");
  view.setUint32(40, count * 2, true);

  for (let i = 0; i < count; i++) {
    const from = Math.floor(i * step);
    const to = Math.max(from + 1, Math.floor((i + 1) * step));
    let sum = 0;
    for (let j = from; j < to; j++) sum += merged[j];
    const sample = Math.max(-1, Math.min(1, sum / (to - from)));
    view.setInt16(44 + i * 2, sample * 0x7fff, true);
  }
  return new Blob([view], { type: "audio/wav" });
};

// Runs apart from the page, so a busy page can't lose any sound. Hands it over about every 40 ms.
const TAP = `class DhMicTap extends AudioWorkletProcessor {
  constructor() { super(); this.pieces = []; this.size = 0; }
  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (channel) {
      this.pieces.push(channel.slice(0));
      this.size += channel.length;
      if (this.size >= sampleRate * 0.04) {
        const merged = new Float32Array(this.size);
        let at = 0;
        for (const piece of this.pieces) { merged.set(piece, at); at += piece.length; }
        this.port.postMessage(merged);
        this.pieces = [];
        this.size = 0;
      }
    }
    return true;
  }
}
registerProcessor("dh-mic-tap", DhMicTap);`;

export interface MicEvents {
  onLevel: (level: number) => void;
  onInterruptSuspected: () => void; // pause the assistant's voice
  onFalseAlarm: () => void; // only its echo: carry on talking
  onSpeechStart: () => void; // someone seems to be talking: keep the assistant paused
  onSpeechEnd: (clip: Blob | null) => void; // null: too short to be worth sending
}

export interface Mic {
  setAssistantTalking: (on: boolean) => void;
  falseStart: () => void; // what interrupted the assistant turned out not to be words
  clip: () => Blob | null; // what has been said so far, for showing the words live
  stop: () => void;
}

/** True where the page can use the open microphone (not on a plain http address, for one) */
export const canOpenMic = () =>
  typeof navigator.mediaDevices?.getUserMedia === "function" && typeof AudioContext !== "undefined" && "audioWorklet" in AudioContext.prototype;

/** Asks for the mic and starts listening. Call it from a click. Rejects if the mic can't be opened. */
export async function openMic(events: MicEvents): Promise<Mic> {
  const ctx = new AudioContext(); // made before anything is awaited: browsers only allow this during a click
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  } catch (error) {
    void ctx.close();
    throw error;
  }

  try {
    await ctx.resume();
    const script = URL.createObjectURL(new Blob([TAP], { type: "application/javascript" }));
    await ctx.audioWorklet.addModule(script);
    URL.revokeObjectURL(script);
  } catch (error) {
    stream.getTracks().forEach((track) => track.stop());
    void ctx.close();
    throw error;
  }

  const rate = ctx.sampleRate;
  const source = ctx.createMediaStreamSource(stream);
  const tap = new AudioWorkletNode(ctx, "dh-mic-tap");
  source.connect(tap).connect(ctx.destination); // it outputs silence: the connection only keeps it running

  let recent: Float32Array[] = [];
  let captured: Float32Array[] | null = null;
  let pieceMs = 40;
  let keepMs = PRE_ROLL_MS;

  const detector = createSpeechDetector({
    onCaptureStart: () => {
      captured = recent;
      recent = [];
    },
    onInterruptSuspected: events.onInterruptSuspected,
    onFalseAlarm: () => {
      recent = captured ?? recent;
      captured = null;
      keepMs = AFTER_FALSE_ALARM_MS;
      events.onFalseAlarm();
    },
    onSpeechStart: events.onSpeechStart,
    onSpeechEnd: (usable, quietMs) => {
      const pieces = captured;
      captured = null;
      if (!usable || !pieces) return events.onSpeechEnd(null);
      const dropped = Math.max(0, Math.floor((quietMs - TAIL_KEPT_MS) / pieceMs));
      events.onSpeechEnd(encodeWav(pieces.slice(0, pieces.length - dropped), rate));
    },
  });

  tap.port.onmessage = ({ data }: MessageEvent<Float32Array>) => {
    pieceMs = (data.length / rate) * 1000;
    let sum = 0;
    for (const sample of data) sum += sample * sample;
    const level = Math.sqrt(sum / data.length);
    events.onLevel(level);

    if (captured) {
      captured.push(data);
    } else {
      recent.push(data);
      keepMs = Math.max(PRE_ROLL_MS, keepMs - pieceMs);
      while (recent.length * pieceMs > keepMs) recent.shift();
    }
    detector.frame(level, pieceMs);
  };

  return {
    setAssistantTalking: detector.setAssistantTalking,
    falseStart: detector.falseStart,
    clip: () => (captured?.length ? encodeWav(captured, rate) : null),
    stop: () => {
      tap.port.onmessage = null;
      source.disconnect();
      tap.disconnect();
      stream.getTracks().forEach((track) => track.stop());
      void ctx.close();
    },
  };
}
