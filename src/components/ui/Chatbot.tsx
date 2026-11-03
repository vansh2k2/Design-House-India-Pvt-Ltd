"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, BellOff, Download, Mic, Minus, Send, Square, Volume2, VolumeX, X } from "lucide-react";

import { api, API_URL } from "@/lib/api";
import { isAbusive } from "@/lib/chatGuards";
import { prepareVoices, speak, stopSpeaking, unlockVoice } from "@/lib/chatVoice";
import RobotLoader from "@/components/ui/RobotLoader";

/* The conversation itself lives on the backend (backend/src/modules/chatbot): it asks the name first,
   answers from the website's content, blocks abusive visitors and saves every chat with its IP. This
   component shows the replies and adds the voice, mic and sound effects. */

type Lang = "en" | "hi";
type Step = "name" | "chat" | "phone" | "email" | "service" | "requirement" | "done";

const COPY = {
  en: {
    title: "DH Assist",
    subtitle: "Design House Assistant",
    placeholder: {
      name: "Type your name...",
      chat: "Type your question...",
      phone: "10-digit mobile number",
      email: "you@example.com",
      service: "Choose a service above, or type it",
      requirement: "Describe your project...",
      done: "Type your question...",
    } as Record<Step, string>,
    blockedPlaceholder: "This chat is blocked",
    abuseHint: "Please avoid offensive words. Sending this counts as a warning.",
    offline: "Sorry, the chat isn't available right now. Please call +91 96549 00525 or email info@designhouse.co.in.",
    footer: "AI assistant • Chats and IP address are saved for follow-up",
    online: "Online",
    soundOn: "Notification sound on",
    soundOff: "Notification sound off",
    voiceOn: "Voice replies on",
    voiceOff: "Voice replies off",
    micStart: "Ask by voice",
    micStop: "Stop listening",
    listening: "Listening... speak now",
    understanding: "Understanding...",
    micDenied: "Microphone access is blocked. Click the icon in the address bar and allow the microphone.",
    micNoSpeech: "I didn't hear anything. Tap the mic and try again.",
    micNotFound: "No microphone was found on this device.",
    micBusy: "Another app is using the microphone. Close it and try again.",
    micFailed: "Sorry, I couldn't understand that. Please try again or type your message.",
  },
  hi: {
    title: "DH Assist",
    subtitle: "Design House असिस्टेंट",
    placeholder: {
      name: "अपना नाम लिखें...",
      chat: "अपना सवाल लिखें...",
      phone: "10 अंकों का मोबाइल नंबर",
      email: "you@example.com",
      service: "ऊपर से सेवा चुनें या लिखें",
      requirement: "अपने प्रोजेक्ट के बारे में लिखें...",
      done: "अपना सवाल लिखें...",
    } as Record<Step, string>,
    blockedPlaceholder: "यह चैट ब्लॉक है",
    abuseHint: "कृपया गलत शब्द इस्तेमाल न कीजिए। भेजने पर आपको चेतावनी मिलेगी।",
    offline: "माफ़ कीजिए, चैट अभी उपलब्ध नहीं है। कृपया +91 96549 00525 पर कॉल करें या info@designhouse.co.in पर ईमेल करें।",
    footer: "एआई असिस्टेंट • चैट और IP पता फ़ॉलो-अप के लिए सेव होते हैं",
    online: "ऑनलाइन",
    soundOn: "नोटिफ़िकेशन साउंड चालू",
    soundOff: "नोटिफ़िकेशन साउंड बंद",
    voiceOn: "बोलकर जवाब चालू",
    voiceOff: "बोलकर जवाब बंद",
    micStart: "बोलकर पूछें",
    micStop: "सुनना बंद करें",
    listening: "सुन रही हूँ... बोलिए",
    understanding: "समझ रही हूँ...",
    micDenied: "माइक्रोफ़ोन की अनुमति नहीं है। एड्रेस बार के आइकन पर क्लिक करके माइक्रोफ़ोन की अनुमति दें।",
    micNoSpeech: "कुछ सुनाई नहीं दिया। माइक दबाकर दोबारा बोलें।",
    micNotFound: "इस डिवाइस पर माइक्रोफ़ोन नहीं मिला।",
    micBusy: "कोई दूसरा ऐप माइक्रोफ़ोन इस्तेमाल कर रहा है। उसे बंद करके दोबारा कोशिश करें।",
    micFailed: "माफ़ कीजिए, समझ नहीं पाई। दोबारा बोलिए या लिख दीजिए।",
  },
};

/* ───────────────────────── Messages ───────────────────────── */

interface Chip {
  label: string;
  action?: "consult" | "retry";
  primary?: boolean;
}
interface Reply {
  title?: string;
  text: string;
  link?: { href: string; label: string };
  files?: Array<{ href: string; label: string }>; // PDFs to download; href is a path on the API
  chips?: Chip[];
  speakId?: number; // how to ask the backend for this message's audio
  spoken?: string; // the text written for reading aloud
}
interface Message extends Reply {
  id: number;
  from: "bot" | "user";
}
interface ChatResponse {
  sessionId: string;
  step: Step;
  lang?: Lang;
  replies: Reply[];
  blocked: boolean;
  flagged?: boolean;
  history?: Array<Reply & { from: "bot" | "user" }>;
}

const SESSION_KEY = "dh_chat_session";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const LOGO = "/logotransparent-sm.webp";
const CHAT_BG = "/assets/chatbot/bg.webp";

/* Voice input: the mic is recorded here and turned into text on the backend (OpenAI). The browsers' own
   speech recognition heard speech but returned no text in Chrome or Edge, with no error to go on. */
const SPEECH_LEVEL = 0.012; // louder than this counts as speaking (laptop mics can be quiet)
const FAINT_LEVEL = 0.004; // below this a clip is silence: not worth sending
const STOP_AFTER_QUIET_MS = 1600; // the visitor has finished
const GIVE_UP_NO_SPEECH_MS = 8000;
const MAX_RECORDING_MS = 30000;
// The words so far are fetched again and again while the visitor speaks; long messages less often, since
// each request sends the whole recording
const LIVE_TEXT_EVERY_MS = 1000;
const LIVE_TEXT_SLOWER_MS = 3000;
const LIVE_TEXT_SLOWER_AFTER_MS = 15000;
const LIVE_TEXT_MIN_SPEECH_MS = 700; // less than this is too little to make out words from

const canRecord = () => typeof navigator.mediaDevices?.getUserMedia === "function" && typeof MediaRecorder !== "undefined";

const EnhancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  // Browser-only component (loaded with ssr: false), so localStorage is available here
  const [muted, setMuted] = useState(() => localStorage.getItem("dh_chat_muted") === "1");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [blocked, setBlocked] = useState(false);
  // Spoken replies (separate from the notification chime) and voice input
  const [voiceOn, setVoiceOn] = useState(() => localStorage.getItem("dh_chat_voice") !== "0");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcribing, setTranscribing] = useState(false); // recording finished, final text on its way
  const [liveText, setLiveText] = useState(""); // words recognised so far, shown in the chat while speaking
  const [canListen] = useState(canRecord);
  const [voiceNote, setVoiceNote] = useState("");
  const voiceOnRef = useRef(voiceOn);
  const micRef = useRef<{ stop: () => void; abort: () => void } | null>(null); // the recording in progress
  const micRingRef = useRef<HTMLSpanElement>(null); // grows with the sound level while recording
  // Always the latest send function, for when a recording finishes
  const handleTextRef = useRef<(text: string) => void>(() => {});

  const t = COPY[lang];
  const inputIsAbusive = input.trim().length > 0 && isAbusive(input);
  const langRef = useRef<Lang>(lang);
  const mutedRef = useRef(muted);
  const idRef = useRef(0);
  const aliveRef = useRef(true);
  const startedRef = useRef(false);
  const sessionIdRef = useRef(localStorage.getItem(SESSION_KEY) || "");
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  const audioRef = useRef<AudioContext | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  langRef.current = lang;
  mutedRef.current = muted;
  voiceOnRef.current = voiceOn;
  // On screen: open and not minimised. Sound and the mic only ever start while this is true.
  const activeRef = useRef(false);
  activeRef.current = isOpen && !isMinimized;

  useEffect(() => {
    aliveRef.current = true;
    const forgetVoices = prepareVoices();
    return () => {
      aliveRef.current = false;
      forgetVoices();
      stopSpeaking();
      micRef.current?.abort();
      void audioRef.current?.close();
    };
  }, []);

  // Closing or minimising stops whatever is already going on; replies that arrive later stay silent (see botSay)
  useEffect(() => {
    if (!isOpen || isMinimized) {
      stopSpeaking();
      micRef.current?.abort();
    }
  }, [isOpen, isMinimized]);

  // Mic messages ("didn't hear anything") fade after a few seconds
  useEffect(() => {
    if (!voiceNote) return;
    const timer = setTimeout(() => setVoiceNote(""), 6000);
    return () => clearTimeout(timer);
  }, [voiceNote]);

  // Keep the newest message in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, liveText, listening, transcribing]);

  // On phones the chat covers the page: stop the page scrolling underneath
  useEffect(() => {
    if (!isOpen || isMinimized || !window.matchMedia("(max-width: 639px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized, step]);

  /* ── Sound effects, generated in the browser (no audio files) ──
     Browsers only allow sound that starts from a click, so the audio is unlocked inside click
     handlers (opening the chat, chips, send) and the bot's later replies can then play. */
  const audio = () => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      const ctx = (audioRef.current ??= new Ctx());
      if (ctx.state === "suspended") void ctx.resume();
      return ctx;
    } catch {
      return null; // Audio unsupported: the chat works silently
    }
  };

  // Bell-like notes: a sine with a softer octave overtone, quick attack and a ringing fade
  const chime = (notes: Array<[freq: number, at: number]>, volume: number, ring: number) => {
    if (mutedRef.current) return;
    const ctx = audio();
    if (!ctx) return;
    const now = ctx.currentTime + 0.01;
    const out = ctx.createDynamicsCompressor(); // keeps overlapping notes from clipping
    out.connect(ctx.destination);
    notes.forEach(([freq, at]) => {
      [
        { type: "sine" as OscillatorType, mult: 1, level: volume },
        { type: "triangle" as OscillatorType, mult: 2, level: volume * 0.25 },
      ].forEach(({ type, mult, level }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq * mult;
        gain.gain.setValueAtTime(0.0001, now + at);
        gain.gain.exponentialRampToValueAtTime(level, now + at + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + at + ring);
        osc.connect(gain).connect(out);
        osc.start(now + at);
        osc.stop(now + at + ring + 0.05);
      });
    });
  };

  // New bot message: "ding-dong"
  const playIncoming = () => chime([[880, 0], [1318.5, 0.13]], 0.32, 0.55);
  // Chat opens: short rising welcome
  const playOpen = () => chime([[523.3, 0], [659.3, 0.07], [784, 0.14], [1046.5, 0.21]], 0.22, 0.4);
  // Your message sent: a soft "pop" (pitch drops quickly)
  const playSent = () => {
    if (mutedRef.current) return;
    const ctx = audio();
    if (!ctx) return;
    const now = ctx.currentTime + 0.01;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.09);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  };

  /* ── Bot replies: queued so they appear one after another, each after a short "typing..." ── */
  const botSay = (lines: Reply[]) => {
    queueRef.current = queueRef.current.then(async () => {
      for (const line of lines) {
        if (!aliveRef.current) return;
        setIsTyping(true);
        await sleep(350 + Math.min(line.text.length * 4, 500));
        if (!aliveRef.current) return;
        setIsTyping(false);
        // Only the newest message keeps its quick questions
        setMessages((prev) => [...prev.map((m) => (m.chips ? { ...m, chips: undefined } : m)), { id: ++idRef.current, from: "bot", ...line }]);
        // A reply that arrives while the chat is closed just waits in the chat, silently
        if (activeRef.current) playIncoming();
        // Read it out (unless voice replies are off or the mic is listening), and let the next
        // message wait until it has been spoken
        if (voiceOnRef.current && !micRef.current) {
          await sleep(150);
          if (activeRef.current) {
            setSpeaking(true);
            const audioUrl = line.speakId === undefined ? undefined : `${API_URL}/api/chatbot/speak?session=${sessionIdRef.current}&message=${line.speakId}`;
            await speak(line.spoken || [line.title, line.text].filter(Boolean).join(". "), audioUrl);
            setSpeaking(false);
          }
        }
        await sleep(280);
      }
    });
    return queueRef.current;
  };

  const userSay = (text: string) => {
    const id = ++idRef.current;
    stopSpeaking(); // the visitor moved on: don't keep reading the old reply
    setMessages((prev) => [...prev.map((m) => (m.chips ? { ...m, chips: undefined } : m)), { id, from: "user", text }]);
    playSent();
    return id;
  };

  const applyResponse = (data: ChatResponse) => {
    if (data.sessionId) {
      sessionIdRef.current = data.sessionId;
      localStorage.setItem(SESSION_KEY, data.sessionId);
    }
    setStep(data.step);
    setBlocked(Boolean(data.blocked));
    if (data.lang) setLang(data.lang); // writing or speaking in Hindi switches the chat to Hindi
  };

  /* ── Opening the chat: greet, or bring back the saved conversation ── */
  const startChat = async () => {
    setIsTyping(true);
    try {
      const res = await api.post("/api/chatbot/session", {
        sessionId: sessionIdRef.current || undefined,
        lang: langRef.current,
        pageUrl: window.location.pathname,
      });
      const data: ChatResponse = res.data.data;
      applyResponse(data);
      setIsTyping(false);
      if (data.history?.length) {
        const lastBot = data.history.map((m) => m.from).lastIndexOf("bot");
        setMessages(data.history.map((m, i) => ({ ...m, id: ++idRef.current, chips: i === lastBot ? m.chips : undefined })));
      }
      if (data.replies.length) await botSay(data.replies);
    } catch {
      startedRef.current = false; // try again next time the chat is opened
      setIsTyping(false);
      await botSay([{ text: COPY[langRef.current].offline }]);
    }
  };

  const open = () => {
    playOpen(); // also unlocks audio for the replies that follow (this runs inside the click)
    unlockVoice();
    setIsOpen(true);
    setIsMinimized(false);
    if (!startedRef.current) {
      startedRef.current = true;
      void startChat();
    }
  };

  /* ── Sending a typed or spoken message, or a clicked chip, to the assistant ── */
  const sendToAssistant = async (text: string, action?: Chip["action"]) => {
    // An abusive message is never shown in the chat; the backend counts it as a strike
    const bubbleId = isAbusive(text) ? null : userSay(text);
    await queueRef.current; // let a reply still being read out finish its queue first
    setIsTyping(true);
    try {
      const res = await api.post("/api/chatbot/message", {
        sessionId: sessionIdRef.current || undefined,
        text,
        action,
        lang: langRef.current,
        pageUrl: window.location.pathname,
      });
      const data: ChatResponse = res.data.data;
      applyResponse(data);
      setIsTyping(false);
      // The assistant found it abusive: take the visitor's message back out of the chat
      if (data.flagged && bubbleId !== null) setMessages((prev) => prev.filter((m) => m.id !== bubbleId));
      await botSay(data.replies);
    } catch (error) {
      setIsTyping(false);
      const tooMany = (error as { response?: { status?: number } })?.response?.status === 429;
      await botSay([{ text: tooMany ? (error as Error).message : COPY[langRef.current].offline }]);
    }
  };

  const onChip = (chip: Chip) => {
    if (isTyping || blocked) return;
    unlockVoice();
    void sendToAssistant(chip.label, chip.action);
  };

  const handleText = (raw: string) => {
    const text = raw.trim();
    if (!text || blocked) return;
    // The assistant is still replying: keep it in the box (what was spoken mustn't be lost)
    if (isTyping) return setInput(text);
    setInput("");
    void sendToAssistant(text);
  };
  handleTextRef.current = handleText;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleText(input);
  };

  /* ── Voice input: record the mic, show the words as they come, send when the visitor stops talking ── */
  const transcribeClip = async (chunks: Blob[], type: string) => {
    const blob = new Blob(chunks, { type });
    const form = new FormData();
    form.append("audio", blob, type.includes("mp4") ? "speech.mp4" : type.includes("ogg") ? "speech.ogg" : "speech.webm");
    const res = await api.post(`/api/chatbot/transcribe?lang=${langRef.current}`, form);
    return res.data.data as { text: string; blocked?: boolean };
  };

  const startListening = async () => {
    if (micRef.current) return;
    const copy = () => COPY[langRef.current];
    stopSpeaking(); // don't let the mic hear the bot
    audio(); // unlock audio while this is still part of the click
    unlockVoice();
    setVoiceNote("");
    setLiveText("");
    setInput("");
    setListening(true);

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (error) {
      setListening(false);
      const name = (error as DOMException).name;
      if (name === "NotAllowedError" || name === "SecurityError") setVoiceNote(copy().micDenied);
      else if (name === "NotFoundError") setVoiceNote(copy().micNotFound);
      else if (name === "NotReadableError") setVoiceNote(copy().micBusy);
      else setVoiceNote(copy().micFailed);
      return;
    }

    // The chat was closed while the browser was asking for permission: the mic must not start
    if (!activeRef.current) {
      stream.getTracks().forEach((track) => track.stop());
      setListening(false);
      return;
    }

    const type = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"].find((t) => MediaRecorder.isTypeSupported(t)) || "";
    const recorder = type ? new MediaRecorder(stream, { mimeType: type }) : new MediaRecorder(stream);
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    // Sound level: shows the visitor they're being heard, and tells when they have stopped talking
    const ctx = audioRef.current;
    const analyser = ctx?.createAnalyser();
    const source = ctx && analyser ? ctx.createMediaStreamSource(stream) : null;
    if (source && analyser) source.connect(analyser);
    const samples = analyser ? new Uint8Array(analyser.fftSize) : null;

    const started = Date.now();
    let spoke = !analyser; // can't measure the level: assume there is speech and let the mic button or timers stop it
    let loudest = 0;
    let lastSound = started;
    let firstSpeech = 0;
    let lastLiveText = started;
    let liveBusy = false;
    let finished = false;
    let discarded = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      clearInterval(meter);
      if (recorder.state !== "inactive") recorder.stop();
    };

    const meter = setInterval(() => {
      const now = Date.now();
      if (analyser && samples) {
        analyser.getByteTimeDomainData(samples);
        let sum = 0;
        for (const s of samples) sum += ((s - 128) / 128) ** 2;
        const level = Math.sqrt(sum / samples.length);
        if (micRingRef.current) micRingRef.current.style.transform = `scale(${1 + Math.min(level * 7, 0.9)})`;
        loudest = Math.max(loudest, level);
        if (level > SPEECH_LEVEL) {
          spoke = true;
          lastSound = now;
          firstSpeech ||= now;
        }
      }
      if ((spoke && analyser && now - lastSound > STOP_AFTER_QUIET_MS) || (!spoke && now - started > GIVE_UP_NO_SPEECH_MS) || now - started > MAX_RECORDING_MS) {
        finish();
        return;
      }
      // The words so far, so what's being said shows up in the chat while it is being said
      const liveGap = now - started > LIVE_TEXT_SLOWER_AFTER_MS ? LIVE_TEXT_SLOWER_MS : LIVE_TEXT_EVERY_MS;
      const heardEnough = !analyser || (firstSpeech > 0 && now - firstSpeech > LIVE_TEXT_MIN_SPEECH_MS);
      if (spoke && heardEnough && !liveBusy && chunks.length && now - lastLiveText > liveGap) {
        liveBusy = true;
        lastLiveText = now;
        transcribeClip([...chunks], recorder.mimeType)
          .then(({ text, blocked: isBlocked }) => {
            if (isBlocked) setBlocked(true);
            if (!finished && text) setLiveText(text);
          })
          .catch(() => {}) // only a preview: the final text is what counts
          .finally(() => {
            liveBusy = false;
          });
      }
    }, 100);

    recorder.onstop = async () => {
      clearInterval(meter);
      micRef.current = null;
      stream.getTracks().forEach((track) => track.stop());
      source?.disconnect();
      setListening(false);
      if (discarded) return setLiveText("");
      // Quiet speech may never reach SPEECH_LEVEL; only true silence is not sent
      if ((!spoke && loudest < FAINT_LEVEL) || !chunks.length) {
        setLiveText("");
        return setVoiceNote(copy().micNoSpeech);
      }

      setTranscribing(true);
      try {
        const { text, blocked: isBlocked } = await transcribeClip(chunks, recorder.mimeType);
        if (isBlocked) setBlocked(true);
        // Closed while the words were being worked out: leave them in the box instead of sending
        else if (text && !activeRef.current) setInput(text);
        else if (text) handleTextRef.current(text);
        else setVoiceNote(copy().micNoSpeech);
      } catch {
        setVoiceNote(copy().micFailed);
      } finally {
        setTranscribing(false);
        setLiveText("");
      }
    };

    micRef.current = {
      stop: finish,
      abort: () => {
        discarded = true;
        finish();
      },
    };
    recorder.start(250); // short chunks, so the live text includes the latest words
  };
  const stopListeningToMic = () => micRef.current?.stop();

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    mutedRef.current = next;
    localStorage.setItem("dh_chat_muted", next ? "1" : "0");
    if (!next) playIncoming(); // turning the chime on plays it, so it's clear it works
  };

  const toggleVoice = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    voiceOnRef.current = next;
    localStorage.setItem("dh_chat_voice", next ? "1" : "0");
    if (!next) stopSpeaking();
  };

  // Show the avatar only on the first of consecutive bot messages
  const showAvatar = (index: number) => messages[index].from === "bot" && messages[index - 1]?.from !== "bot";

  return (
    <>
      <style>{`
        @keyframes dhChatIn { from { opacity: 0; transform: translateY(16px) scale(.96); } to { opacity: 1; transform: none; } }
        @keyframes dhMsgIn { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes dhDot { 0%, 80%, 100% { transform: translateY(0); opacity: .45; } 40% { transform: translateY(-4px); opacity: 1; } }
        @keyframes dhBubble { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .dh-chat-in { animation: dhChatIn .32s cubic-bezier(.2,.9,.3,1.2) both; transform-origin: bottom right; }
        .dh-msg-in { animation: dhMsgIn .28s ease-out both; }
        .dh-dot { animation: dhDot 1.1s infinite ease-in-out; }
        .dh-bubble-float { animation: dhBubble 2.8s ease-in-out infinite; }
      `}</style>

      {/* Launcher: "May I help you?" bubble above the animated robot */}
      {!isOpen && (
        <button
          onClick={open}
          className="group fixed bottom-1 right-1 sm:bottom-3 sm:right-5 z-50 flex flex-col items-center cursor-pointer"
          aria-label="May I help you? Open chat"
        >
          <span className="dh-bubble-float relative z-10 -mb-2 whitespace-nowrap rounded-[14px] border border-[#d5deee] bg-white px-4 py-2 text-[14px] sm:text-[15px] font-bold tracking-[-0.01em] text-[#0A2B5E] shadow-[0_6px_16px_rgba(10,43,94,0.15)]">
            May I help you?
            <span className="absolute left-1/2 -bottom-[7px] h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[#d5deee] bg-white" />
          </span>
          {/* Animated CSS robot (16 × 21 of --rb-size) */}
          <RobotLoader className="[--rb-size:5.4px] sm:[--rb-size:6.4px] transition-transform duration-300 group-hover:scale-105" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <>
          <section
            role="dialog"
            aria-label={`${t.title} chat`}
            className={`dh-chat-in fixed z-[1000] flex flex-col overflow-hidden bg-white shadow-[0_18px_50px_rgba(10,30,74,0.28)] inset-x-2 bottom-2 rounded-[20px] sm:inset-x-auto sm:right-5 sm:bottom-[92px] sm:w-[392px] sm:rounded-[22px] ${
              isMinimized ? "" : "h-[82vh] sm:h-[560px] sm:max-h-[calc(100vh-120px)]"
            }`}
          >
            {/* Header */}
            <header className="relative flex shrink-0 items-center gap-2.5 bg-gradient-to-r from-[#0A2050] via-[#0F2F6B] to-[#134698] px-3.5 py-3 border-b-[3px] border-[#fd6e15]">
              <div className="relative shrink-0">
                <span className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full bg-white p-1.5 ring-2 ring-[#fd6e15]/70">
                  <Image src={LOGO} alt="Design House" width={44} height={30} className="h-auto w-full object-contain" />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5" title={t.online}>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-60" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22c55e]" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] font-bold leading-tight text-white">{t.title}</p>
                <p className="truncate text-[11px] text-white/80">{t.subtitle}</p>
              </div>

              {/* Language */}
              <div className="flex shrink-0 items-center rounded-full bg-white/15 p-0.5 text-[11px] font-bold">
                {(["en", "hi"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`rounded-full px-2 py-1 transition cursor-pointer ${lang === l ? "bg-white text-[#0A2B5E] shadow" : "text-white/85 hover:text-white"}`}
                  >
                    {l === "en" ? "EN" : "हिं"}
                  </button>
                ))}
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button type="button" onClick={() => setIsMinimized((v) => !v)} aria-label="Minimise chat" className="hidden sm:flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 cursor-pointer">
                  <Minus className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            {!isMinimized && (
              <>
                {/* Messages */}
                {/* Wireframe city sketch behind the messages; it stays put while the messages scroll */}
                <div
                  ref={scrollRef}
                  data-lenis-prevent
                  className="relative flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-[#f4f7fb] bg-cover bg-bottom bg-no-repeat px-3.5 py-4"
                  style={{ backgroundImage: `url(${CHAT_BG})` }}
                >

                  <div className="relative space-y-2.5">
                    {messages.map((m, i) =>
                      m.from === "bot" ? (
                        <div key={m.id} className="dh-msg-in flex items-start gap-2">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-1 ring-[#fd6e15]/40 shadow-sm ${showAvatar(i) ? "" : "invisible"}`}>
                            <Image src={LOGO} alt="" width={30} height={20} className="h-auto w-full object-contain" />
                          </span>
                          <div className="min-w-0 max-w-[82%]">
                            <div className="rounded-[16px] rounded-tl-[6px] bg-white px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-[#1f2d44] shadow-[0_1px_3px_rgba(10,30,74,0.10)]">
                              {m.title && <p className="font-bold text-[#0A2B5E]">{m.title}</p>}
                              <p className="whitespace-pre-line">{m.text}</p>
                              {m.link && (
                                <Link href={m.link.href} className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#fd6e15] hover:underline">
                                  {m.link.label} →
                                </Link>
                              )}
                              {m.files?.map((file) => (
                                <a
                                  key={file.href}
                                  href={`${API_URL}${file.href}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download
                                  className="mt-2 flex items-center gap-2 rounded-xl border border-[#fd6e15]/40 bg-[#fff6ef] px-3 py-2 text-[12.5px] font-semibold text-[#b84a08] transition hover:bg-[#ffecdf]"
                                >
                                  <Download className="h-4 w-4 shrink-0" />
                                  <span className="min-w-0">{file.label}</span>
                                </a>
                              ))}
                            </div>
                            {m.chips && m.chips.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {m.chips.map((chip) => (
                                  <button
                                    key={chip.label}
                                    type="button"
                                    onClick={() => onChip(chip)}
                                    disabled={isTyping}
                                    className={`rounded-full border px-3 py-1.5 text-left text-[12px] font-semibold transition hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer ${
                                      chip.primary
                                        ? "border-[#fd6e15] bg-[#fd6e15] text-white hover:bg-[#e05d0e]"
                                        : "border-[#c9d5ea] bg-white text-[#134698] hover:border-[#134698] hover:bg-[#eef3fb]"
                                    }`}
                                  >
                                    {chip.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div key={m.id} className="dh-msg-in flex justify-end">
                          <p className="max-w-[80%] whitespace-pre-line rounded-[16px] rounded-tr-[6px] bg-gradient-to-br from-[#134698] to-[#0A2B5E] px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-white shadow-[0_2px_6px_rgba(10,43,94,0.25)]">
                            {m.text}
                          </p>
                        </div>
                      )
                    )}

                    {/* What you're saying, live, while the mic listens */}
                    {(listening || transcribing) && (
                      <div className="dh-msg-in flex justify-end" aria-live="polite">
                        <p className="max-w-[80%] whitespace-pre-line rounded-[16px] rounded-tr-[6px] border border-dashed border-[#134698]/60 bg-white px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-[#0A2B5E] shadow-[0_2px_6px_rgba(10,43,94,0.12)]">
                          <Mic className="-mt-0.5 mr-1.5 inline h-3.5 w-3.5 animate-pulse text-red-500" />
                          {liveText || <span className="italic text-[#8a97ad]">{transcribing ? t.understanding : t.listening}</span>}
                        </p>
                      </div>
                    )}

                    {isTyping && (
                      <div className="dh-msg-in flex items-center gap-2" aria-live="polite" aria-label="DH Assist is typing">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-1 ring-[#fd6e15]/40 shadow-sm ${messages[messages.length - 1]?.from === "bot" ? "invisible" : ""}`}>
                          <Image src={LOGO} alt="" width={30} height={20} className="h-auto w-full object-contain" />
                        </span>
                        <span className="flex items-center gap-1 rounded-[16px] rounded-tl-[6px] bg-white px-3.5 py-3 shadow-[0_1px_3px_rgba(10,30,74,0.10)]">
                          {[0, 0.15, 0.3].map((d) => (
                            <span key={d} className="dh-dot h-2 w-2 rounded-full bg-[#134698]" style={{ animationDelay: `${d}s` }} />
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input */}
                <form onSubmit={onSubmit} className="relative shrink-0 border-t border-[#e3e9f3] bg-white px-3.5 pt-2 pb-1.5">
                  <div
                    className={`flex items-center gap-1.5 rounded-full border bg-white py-1 pl-3.5 pr-1 shadow-[0_2px_8px_rgba(10,30,74,0.06)] ${
                      inputIsAbusive
                        ? "border-red-500 ring-2 ring-red-200"
                        : listening
                          ? "border-red-400 ring-2 ring-red-100"
                          : "border-[#d5deee] focus-within:border-[#134698]"
                    } ${blocked ? "opacity-60" : ""}`}
                  >
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={blocked ? t.blockedPlaceholder : listening ? t.listening : t.placeholder[step]}
                      disabled={blocked}
                      aria-invalid={inputIsAbusive}
                      inputMode={step === "phone" ? "tel" : step === "email" ? "email" : "text"}
                      maxLength={step === "requirement" ? 1500 : 500}
                      className="min-w-0 flex-1 bg-transparent text-[13.5px] text-[#1f2d44] outline-none placeholder:text-[#8a97ad]"
                      aria-label={t.placeholder[step]}
                    />
                    {/* Bot's voice on/off: always here; turning it off stops the reply being read out.
                        Pulses while the bot is speaking. */}
                    <button
                      type="button"
                      onClick={toggleVoice}
                      title={voiceOn ? t.voiceOn : t.voiceOff}
                      aria-label={voiceOn ? t.voiceOn : t.voiceOff}
                      aria-pressed={voiceOn}
                      className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition cursor-pointer ${
                        voiceOn ? "bg-[#eef3fb] text-[#134698] hover:bg-[#dfe8f7]" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {voiceOn && speaking && <span className="absolute inset-0 animate-ping rounded-full bg-[#134698]/25" />}
                      {voiceOn ? <Volume2 className="relative h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </button>
                    {/* Ask by voice (hidden where the page can't record, e.g. a non-https address).
                        While recording, the ring grows with the sound the mic is picking up. */}
                    {canListen && (
                      <button
                        type="button"
                        onClick={listening ? stopListeningToMic : () => void startListening()}
                        disabled={blocked || transcribing}
                        title={listening ? t.micStop : t.micStart}
                        aria-label={listening ? t.micStop : t.micStart}
                        aria-pressed={listening}
                        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition disabled:opacity-40 cursor-pointer ${
                          listening ? "bg-red-500 text-white" : "text-[#134698] hover:bg-[#eef3fb]"
                        }`}
                      >
                        {listening && <span ref={micRingRef} className="absolute inset-0 rounded-full bg-red-400/50 transition-transform duration-100" />}
                        {listening ? <Square className="relative h-3 w-3" fill="currentColor" /> : <Mic className="h-4 w-4" />}
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping || blocked}
                      aria-label="Send"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd6e15] text-white transition hover:bg-[#e05d0e] hover:scale-105 disabled:bg-[#fdb98f] disabled:hover:scale-100 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5 -translate-x-px translate-y-px" />
                    </button>
                  </div>
                  {inputIsAbusive && (
                    <p role="alert" className="mt-1 text-center text-[11px] font-semibold text-red-600">
                      {t.abuseHint}
                    </p>
                  )}
                  {!inputIsAbusive && voiceNote && (
                    <p role="status" className="mt-1 text-center text-[11px] font-semibold text-[#b45309]">
                      {voiceNote}
                    </p>
                  )}
                  <div className="mt-1 flex items-center justify-center gap-1.5 text-[10.5px] text-[#7a879c]">
                    <span>{t.footer}</span>
                    {/* Notification chime on/off (remembered in this browser) */}
                    <button
                      type="button"
                      onClick={toggleMute}
                      title={muted ? t.soundOff : t.soundOn}
                      aria-label={muted ? t.soundOff : t.soundOn}
                      className="flex h-5 w-5 items-center justify-center rounded-full text-[#134698] transition hover:bg-[#eef3fb] cursor-pointer"
                    >
                      {muted ? <BellOff className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </form>
              </>
            )}
          </section>

          {/* Round close button where the robot was (desktop), like the reference */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="dh-chat-in fixed bottom-5 right-6 z-[1000] hidden h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#134698] to-[#0A2050] text-white shadow-[0_8px_20px_rgba(10,43,94,0.35)] transition hover:scale-105 sm:flex cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </>
      )}
    </>
  );
};

export default EnhancedChatbot;
