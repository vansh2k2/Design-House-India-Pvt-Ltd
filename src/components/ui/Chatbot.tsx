"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, BellOff, Download, Mic, MicOff, Minus, PhoneOff, Send, Volume2, VolumeX, X } from "lucide-react";

import { api, API_URL } from "@/lib/api";
import { isAbusive } from "@/lib/chatGuards";
import { canCall, openCall, type Call } from "@/lib/chatCall";
import { prepareVoices, speak, stopSpeaking, unlockVoice } from "@/lib/chatVoice";

/* The conversation itself lives on the backend (backend/src/modules/chatbot): it answers from the website's content,
   blocks abusive visitors and saves every chat with its IP. Opening the chat starts a spoken call, like phoning
   someone: the visitor just talks, and can talk over the assistant. Typing works too, during a call and without one
   (no mic, or the call was ended), and then the replies can be read out. */

type Lang = "en" | "hi";

const COPY = {
  en: {
    title: "DH Assist",
    subtitle: "Design House Assistant",
    placeholder: "Type here...",
    blockedPlaceholder: "This chat is blocked",
    abuseHint: "Please avoid offensive words. Sending this counts as a warning.",
    offline: "Sorry, the chat isn't available right now. Please call +91 96549 00525 or email info@designhouse.co.in.",
    footer: "AI assistant • Chats and IP address are saved for follow-up",
    online: "Online",
    typing: "typing…",
    soundOn: "Notification sound on",
    soundOff: "Notification sound off",
    voiceOn: "Voice replies on",
    voiceOff: "Voice replies off",
    callStart: "Talk to me",
    callEnd: "End the call",
    callMute: "Mute your mic",
    callUnmute: "Unmute your mic",
    connecting: "Connecting...",
    listening: "I'm listening, just speak...",
    interruptHint: "Speak any time, I'll stop and listen",
    muted: "Your mic is muted",
    micDenied: "Microphone access is blocked. Click the icon in the address bar and allow the microphone, or just type here.",
    micNoSpeech: "I can't hear anything. Please check your microphone.",
    micNotFound: "No microphone was found on this device. You can type here.",
    micBusy: "Another app is using the microphone. Close it and try again, or type here.",
    callFailed: "Sorry, the voice call couldn't connect. You can type here.",
    callUnavailable: "Voice calls aren't available right now. You can type here and I'll reply.",
    callDropped: "The call ended. Tap the mic to talk again.",
    callEnding: "This call is almost at its time limit. You can carry on by typing here in the chat.",
    goodbye: "Thank you for talking to Design House. Have a great day!",
    switchedLanguage: "Sure, let's talk in English. How can I help you?",
    callIdle: "I ended the call because it was quiet for a while. Tap the mic to talk again.",
  },
  hi: {
    title: "DH Assist",
    subtitle: "Design House Assistant",
    placeholder: "यहाँ लिखें...",
    blockedPlaceholder: "यह चैट ब्लॉक है",
    abuseHint: "कृपया गलत शब्द इस्तेमाल न कीजिए। भेजने पर आपको चेतावनी मिलेगी।",
    offline: "माफ़ कीजिए, चैट अभी चल नहीं रही। +91 96549 00525 पर कॉल कीजिए या info@designhouse.co.in पर ईमेल कीजिए।",
    footer: "एआई असिस्टेंट • चैट और IP पता फ़ॉलो-अप के लिए सेव होते हैं",
    online: "ऑनलाइन",
    typing: "लिख रही है…",
    soundOn: "नोटिफ़िकेशन साउंड चालू",
    soundOff: "नोटिफ़िकेशन साउंड बंद",
    voiceOn: "बोलकर जवाब चालू",
    voiceOff: "बोलकर जवाब बंद",
    callStart: "मुझसे बात करें",
    callEnd: "कॉल बंद करें",
    callMute: "अपना माइक बंद करें",
    callUnmute: "अपना माइक चालू करें",
    connecting: "जोड़ रही हूँ...",
    listening: "सुन रही हूँ, बस बोलिए...",
    interruptHint: "कभी भी बोलिए, मैं रुककर सुनूँगी",
    muted: "आपका माइक बंद है",
    micDenied: "माइक्रोफ़ोन की अनुमति नहीं है। एड्रेस बार के आइकन पर क्लिक करके अनुमति दीजिए, या यहाँ लिख दीजिए।",
    micNoSpeech: "कुछ सुनाई नहीं दे रहा। अपना माइक्रोफ़ोन देख लीजिए।",
    micNotFound: "इस डिवाइस पर माइक्रोफ़ोन नहीं मिला। आप यहाँ लिख सकते हैं।",
    micBusy: "कोई दूसरा ऐप माइक्रोफ़ोन इस्तेमाल कर रहा है। उसे बंद कीजिए, या यहाँ लिख दीजिए।",
    callFailed: "माफ़ कीजिए, कॉल जुड़ नहीं पाई। आप यहाँ लिख सकते हैं।",
    callUnavailable: "अभी वॉइस कॉल उपलब्ध नहीं है। आप यहाँ लिखिए, मैं जवाब दूँगी।",
    callDropped: "कॉल बंद हो गई। बात करनी हो तो माइक दबाइए।",
    callEnding: "कॉल का टाइम अब पूरा होने वाला है। आगे की बात आप यहाँ चैट में लिखकर कर सकते हैं।",
    goodbye: "Design House से बात करने के लिए धन्यवाद! आपका दिन अच्छा रहे।",
    switchedLanguage: "ज़रूर, अब हिंदी में बात करते हैं। बताइए, मैं आपकी क्या मदद कर सकती हूँ?",
    callIdle: "काफ़ी देर से कोई आवाज़ नहीं आई, इसलिए कॉल बंद कर दी। बात करनी हो तो माइक दबाइए।",
  },
};

/* ───────────────────────── Messages ───────────────────────── */

interface Reply {
  title?: string;
  text: string;
  link?: { href: string; label: string };
  files?: Array<{ href: string; label: string }>; // PDFs to download; href is a path on the API
  speakId?: number; // how to ask the backend for this message's audio
  spoken?: string; // the text written for reading aloud
  greeting?: boolean; // the welcome: a new one replaces the one still showing instead of adding another
}
interface Message extends Reply {
  id: number;
  at?: number; // when it appeared (shown under the bubble)
  from: "bot" | "user";
  key?: string; // in a call: the conversation item this bubble shows
  live?: boolean; // in a call: still being said
}
interface ChatResponse {
  sessionId: string;
  lang?: Lang;
  replies: Reply[];
  blocked: boolean;
  flagged?: boolean;
  history?: Array<Reply & { from: "bot" | "user" }>;
  repeatGreeting?: Reply; // the welcome already in the chat, to be said again
}
interface CallStart {
  blocked?: boolean;
  unavailable?: boolean;
  sessionId: string;
  lang: Lang;
  sdp: string;
  greeting: string;
  history: Array<Reply & { from: "bot" | "user" }>;
  maxSeconds: number;
}
interface CallEvent {
  type: string;
  item_id?: string;
  delta?: string;
  transcript?: string;
  item?: { id: string; type: string; role?: string; content?: Array<{ type: string }> };
  response?: { status?: string; output?: Array<{ type: string; name?: string; call_id?: string; arguments?: string }> };
  error?: { code?: string; message?: string };
}
interface ToolDone {
  output: unknown;
  files?: Reply["files"];
  link?: Reply["link"];
  language?: Lang;
  end?: boolean;
  blocked?: boolean;
  flagged?: boolean;
}

const SESSION_KEY = "dh_chat_session";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const LOGO = "/logotransparent-sm.webp";
const CHAT_BG = "/assets/chatbot/bg.webp";

const FAINT_LEVEL = 0.004; // below this the mic is hearing nothing at all
const MIC_SILENT_NOTE_MS = 10000;
const CALL_IDLE_MS = 120000; // the call ends itself after this long without anyone talking
const CALL_ENDING_WARNING_S = 30; // the assistant says so this long before the call's time limit
const END_AFTER_GOODBYE_MS = 15000; // if the "finished speaking" event never comes

const TRANSCRIBE_MODEL = "gpt-4o-mini-transcribe"; // the same as the backend's call settings (chatbot.call.js)

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openRef: RefObject<(() => void) | null>; // the robot (ChatbotLauncher) opens the chat through this, inside its click
  openAtOnce: boolean; // the robot was clicked before this code had arrived
}

const EnhancedChatbot = ({ isOpen, setIsOpen, openRef, openAtOnce }: ChatbotProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  // Browser-only component (loaded with ssr: false), so localStorage is available here
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("dh_chat_lang") === "en" ? "en" : "hi"));
  const [muted, setMuted] = useState(() => localStorage.getItem("dh_chat_muted") === "1");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [blocked, setBlocked] = useState(false);
  // Replies read out when there's no call (separate from the notification chime)
  const [voiceOn, setVoiceOn] = useState(() => localStorage.getItem("dh_chat_voice_on") !== "0");
  const [speaking, setSpeaking] = useState(false);
  const [callState, setCallState] = useState<"off" | "connecting" | "on">("off");
  const [micMuted, setMicMuted] = useState(false);
  const [canTalk] = useState(canCall);
  const [voiceNote, setVoiceNote] = useState("");
  const voiceOnRef = useRef(voiceOn);
  const callRef = useRef<Call | null>(null);
  const micRingRef = useRef<HTMLSpanElement>(null); // grows with the sound level during a call
  const openingCallRef = useRef(false);
  const callCleanupRef = useRef<(() => void) | null>(null);
  const endedByHandRef = useRef(false); // the visitor ended the call: opening the chat again doesn't call them back
  const greetingNextRef = useRef(false); // the next thing the assistant says in the call is the welcome
  const endAfterSpeechRef = useRef(false);
  const lastActivityRef = useRef(0);
  const speakingRef = useRef(false);
  const callPostsRef = useRef<Promise<unknown>>(Promise.resolve());
  // Always the latest function, for when a timer or an event calls it
  const endCallRef = useRef<(note?: string) => void>(() => {});

  const t = COPY[lang];
  const inputIsAbusive = input.trim().length > 0 && isAbusive(input);
  const inCall = callState === "on";
  const langRef = useRef<Lang>(lang);
  const mutedRef = useRef(muted);
  const idRef = useRef(0);
  const aliveRef = useRef(true);
  const openingChatRef = useRef(false);
  const chatLoadedRef = useRef(false);
  const greetAgainRef = useRef(false);
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
      endCallRef.current();
      void audioRef.current?.close();
    };
  }, []);

  // Closing or minimising stops whatever is already going on; replies that arrive later stay silent (see botSay)
  useEffect(() => {
    if (!isOpen || isMinimized) {
      stopSpeaking();
      endCallRef.current();
    }
  }, [isOpen, isMinimized]);

  // The call also ends when the visitor goes to another tab: the mic shouldn't stay on unseen
  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden || !callRef.current) return;
      endCallRef.current();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Mic messages ("didn't hear anything") fade after a few seconds
  useEffect(() => {
    if (!voiceNote) return;
    const timer = setTimeout(() => setVoiceNote(""), 6000);
    return () => clearTimeout(timer);
  }, [voiceNote]);

  // Keep the newest message in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // On phones the chat covers the page: stop the page scrolling underneath
  useEffect(() => {
    if (!isOpen || isMinimized || !window.matchMedia("(max-width: 639px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen, isMinimized]);

  /* ── Sound effects, generated in the browser (no audio files) ──
     Browsers only allow sound that starts from a click, so the audio is unlocked inside click
     handlers (opening the chat, send) and the bot's later replies can then play. */
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

  /* ── Typed replies: queued so they appear one after another, each after a short "typing..." ── */
  // Reads a line aloud, unless voice replies are off or the chat is closed. In a call the assistant speaks for itself.
  const readOut = async (line: Reply) => {
    if (!voiceOnRef.current || !activeRef.current || callRef.current) return;
    await sleep(150);
    if (!activeRef.current || callRef.current) return;
    const spoken = line.spoken || [line.title, line.text].filter(Boolean).join(". ");
    const audioUrl = line.speakId === undefined ? undefined : `${API_URL}/api/chatbot/speak?session=${sessionIdRef.current}&message=${line.speakId}`;
    speakingRef.current = true;
    setSpeaking(true);
    await speak(spoken, audioUrl);
    speakingRef.current = false;
    setSpeaking(false);
  };

  const botSay = (lines: Reply[]) => {
    queueRef.current = queueRef.current.then(async () => {
      for (const line of lines) {
        if (!aliveRef.current) return;
        setIsTyping(true);
        await sleep(350 + Math.min(line.text.length * 4, 500));
        if (!aliveRef.current) return;
        setIsTyping(false);
        const bubble: Message = { id: ++idRef.current, from: "bot", at: Date.now(), ...line };
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return line.greeting && last?.from === "bot" && last.greeting ? [...prev.slice(0, -1), bubble] : [...prev, bubble];
        });
        // A reply that arrives while the chat is closed just waits in the chat, silently
        if (activeRef.current) playIncoming();
        // Let the next message wait until this one has been spoken
        await readOut(line);
        await sleep(280);
      }
    });
    return queueRef.current;
  };

  const userSay = (text: string) => {
    const id = ++idRef.current;
    stopSpeaking(); // the visitor moved on: don't keep reading the old reply
    setMessages((prev) => [...prev, { id, from: "user", text, at: Date.now() }]);
    playSent();
    return id;
  };

  const showHistory = (history?: Array<Reply & { from: "bot" | "user" }>) => {
    if (!chatLoadedRef.current && history?.length) setMessages(history.map((m) => ({ ...m, id: ++idRef.current })));
    chatLoadedRef.current = true;
  };

  const rememberChat = (sessionId: string, chatLang?: Lang) => {
    if (sessionId) {
      sessionIdRef.current = sessionId;
      localStorage.setItem(SESSION_KEY, sessionId);
    }
    if (chatLang) {
      langRef.current = chatLang;
      setLang(chatLang); // a whole sentence in the other language switches the chat to it
      localStorage.setItem("dh_chat_lang", chatLang);
    }
  };

  const applyResponse = (data: ChatResponse) => {
    rememberChat(data.sessionId, data.lang);
    setBlocked(Boolean(data.blocked));
  };

  /* ── The typed chat: when opened it welcomes the visitor and asks how it can help ── */
  const startChat = async () => {
    if (openingChatRef.current) {
      greetAgainRef.current = true; // opened again, or the language changed, during the welcome
      return;
    }
    openingChatRef.current = true;
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
      showHistory(data.history);
      if (data.repeatGreeting) {
        // Nothing has been said since the last welcome: say it again without adding it to the chat again
        const line = data.repeatGreeting;
        queueRef.current = queueRef.current.then(() => readOut(line));
        await queueRef.current;
      } else if (data.replies.length) {
        await botSay(data.replies);
      }
    } catch {
      setIsTyping(false);
      if (!chatLoadedRef.current) await botSay([{ text: COPY[langRef.current].offline }]);
    } finally {
      openingChatRef.current = false;
      if (greetAgainRef.current) {
        greetAgainRef.current = false;
        void startChat();
      }
    }
  };

  /* ── The spoken call ── */

  // Everything sent to the backend during a call goes one at a time, so the saved conversation stays in order
  const callPost = <T,>(path: string, body: object) => {
    const sent = callPostsRef.current.then(() => api.post(`/api/chatbot/call/${path}`, { sessionId: sessionIdRef.current, ...body }));
    callPostsRef.current = sent.catch(() => {});
    return sent.then((res) => res.data.data as T);
  };

  const dropBubble = (key: string) => setMessages((prev) => prev.filter((m) => m.key !== key));

  const updateBubble = (key: string, from: Message["from"], change: (bubble: Message) => Partial<Message>) =>
    setMessages((prev) => {
      const bubble = prev.find((m) => m.key === key) ?? { id: ++idRef.current, key, from, text: "", live: true };
      const updated = { ...bubble, ...change(bubble) };
      return prev.some((m) => m.key === key) ? prev.map((m) => (m.key === key ? updated : m)) : [...prev, updated];
    });

  const assistantTalking = (on: boolean) => {
    speakingRef.current = on;
    setSpeaking(on);
    callRef.current?.setAssistantTalking(on);
    if (on) lastActivityRef.current = Date.now();
  };

  // Stops the assistant and has it say this instead
  const sayInstead = (line: string) => {
    const call = callRef.current;
    if (!call) return;
    if (speakingRef.current) {
      call.send({ type: "response.cancel" });
      call.send({ type: "output_audio_buffer.clear" });
    }
    call.send({ type: "response.create", response: { instructions: `Say exactly this and nothing else: "${line}"`, tool_choice: "none" } });
  };

  const onAbuse = ({ say, blocked: nowBlocked }: { say?: string; blocked?: boolean }, itemId?: string) => {
    if (itemId) {
      dropBubble(itemId);
      callRef.current?.send({ type: "conversation.item.delete", item_id: itemId });
    }
    if (nowBlocked) {
      setBlocked(true);
      endAfterSpeechRef.current = true;
    }
    if (say) sayInstead(say);
  };

  // The visitor finished a sentence: it is saved, and checked for abuse by the word list
  const visitorSaid = async (itemId: string, text: string) => {
    updateBubble(itemId, "user", () => ({ text, live: false }));
    try {
      const saved = await callPost<{ flagged?: boolean; say?: string; blocked?: boolean }>("turn", { role: "user", text, lang: langRef.current });
      if (saved.flagged) onAbuse(saved, itemId);
    } catch {
      // the conversation carries on even if this line isn't saved
    }
  };

  const setCallLanguage = (next: Lang) => {
    rememberChat("", next);
    callRef.current?.send({ type: "session.update", session: { type: "realtime", audio: { input: { transcription: { model: TRANSCRIBE_MODEL, language: next } } } } });
  };

  // The assistant decided to do these things: the backend does them, and the results go back to it
  const runCallTools = async (requested: NonNullable<NonNullable<CallEvent["response"]>["output"]>, spoke: boolean) => {
    let replyAfterwards = false;
    for (const { name, call_id: callId, arguments: rawArgs } of requested) {
      let done: ToolDone;
      try {
        done = await callPost<ToolDone>("tool", { name, args: JSON.parse(rawArgs || "{}") });
      } catch {
        done = { output: { problem: "That didn't work just now. Don't guess: say you'll have the team help them." } };
      }
      if (done.files?.length || done.link) setMessages((prev) => [...prev, { id: ++idRef.current, from: "bot", text: "", files: done.files, link: done.link }]);
      if (done.language) setCallLanguage(done.language);
      if (done.flagged) setMessages((prev) => prev.filter((m, i) => !(i === prev.length - 1 && m.from === "user")));
      if (done.blocked) setBlocked(true);
      if (done.end) endAfterSpeechRef.current = true;
      callRef.current?.send({ type: "conversation.item.create", item: { type: "function_call_output", call_id: callId, output: JSON.stringify(done.output) } });
      if (name !== "end_conversation") replyAfterwards = true;
    }
    if (replyAfterwards) callRef.current?.send({ type: "response.create" });
    // A call never just goes dead: if the assistant hung up without saying goodbye, it says it now
    else if (endAfterSpeechRef.current && !spoke) sayInstead(COPY[langRef.current].goodbye);
    else if (endAfterSpeechRef.current && !speakingRef.current) endCallRef.current();
  };

  const onCallEvent = (event: CallEvent) => {
    switch (event.type) {
      case "conversation.item.added": {
        // A bubble straight away, so the chat stays in the order things were said. Typed messages have one already.
        const { item } = event;
        if (item?.type !== "message" || item.content?.some((part) => part.type === "input_text")) break;
        if (item.role === "user") updateBubble(item.id, "user", () => ({}));
        else if (item.role === "assistant") updateBubble(item.id, "bot", () => ({}));
        break;
      }
      case "input_audio_buffer.speech_started":
        lastActivityRef.current = Date.now();
        break;
      case "conversation.item.input_audio_transcription.delta":
        if (event.item_id) updateBubble(event.item_id, "user", (bubble) => ({ text: bubble.text + (event.delta || "") }));
        break;
      case "conversation.item.input_audio_transcription.completed": {
        lastActivityRef.current = Date.now();
        const text = (event.transcript || "").trim();
        if (!event.item_id) break;
        if (text) void visitorSaid(event.item_id, text);
        else dropBubble(event.item_id);
        break;
      }
      case "conversation.item.input_audio_transcription.failed":
        if (event.item_id) dropBubble(event.item_id);
        break;
      case "response.output_audio_transcript.delta":
        if (event.item_id) updateBubble(event.item_id, "bot", (bubble) => ({ text: bubble.text + (event.delta || "") }));
        break;
      case "response.output_audio_transcript.done": {
        const text = (event.transcript || "").trim();
        if (!event.item_id) break;
        updateBubble(event.item_id, "bot", () => ({ text, live: false }));
        const greeting = greetingNextRef.current;
        greetingNextRef.current = false;
        if (text) void callPost("turn", { role: "assistant", text, lang: langRef.current, greeting }).catch(() => {});
        break;
      }
      case "response.done": {
        // Nothing was said in this response: its empty bubble goes
        setMessages((prev) => prev.filter((m) => !(m.from === "bot" && m.key && !m.text)));
        const output = event.response?.output || [];
        const requested = output.filter((item) => item.type === "function_call");
        if (event.response?.status === "completed" && requested.length) void runCallTools(requested, output.some((item) => item.type === "message"));
        break;
      }
      case "output_audio_buffer.started":
        assistantTalking(true);
        break;
      case "output_audio_buffer.stopped":
      case "output_audio_buffer.cleared":
        assistantTalking(false);
        if (endAfterSpeechRef.current) endCallRef.current();
        break;
      case "error":
        console.warn("[chat] call:", event.error?.code, event.error?.message);
        break;
      default:
        break;
    }
  };

  const endCall = (note?: string) => {
    callCleanupRef.current?.();
    callCleanupRef.current = null;
    const call = callRef.current;
    callRef.current = null;
    if (call) {
      call.stop();
      void api.post("/api/chatbot/call/end", { sessionId: sessionIdRef.current }).catch(() => {});
    }
    endAfterSpeechRef.current = false;
    speakingRef.current = false;
    setSpeaking(false);
    setMicMuted(false);
    setCallState("off");
    // Whatever was still being said stays only if some of it had been written down
    setMessages((prev) => prev.filter((m) => m.text || m.files?.length || m.link).map((m) => (m.live ? { ...m, live: false } : m)));
    if (note) setVoiceNote(note);
  };
  endCallRef.current = endCall;

  const startCall = async () => {
    if (callRef.current || openingCallRef.current) return;
    const copy = () => COPY[langRef.current];
    openingCallRef.current = true;
    endedByHandRef.current = false;
    stopSpeaking();
    setVoiceNote("");
    setCallState("connecting");

    let start: CallStart | null = null;
    let heardAnything = false;
    let warnedSilent = false;
    let warnedEnding = false;
    const opened = Date.now();

    let call: Call;
    try {
      call = await openCall({
        connect: async (offer) => {
          const res = await api.post("/api/chatbot/call", {
            sdp: offer,
            sessionId: sessionIdRef.current || undefined,
            lang: langRef.current,
            pageUrl: window.location.pathname,
            mic: window.matchMedia("(pointer: coarse)").matches ? "near" : "far",
          });
          start = res.data.data as CallStart;
          if (start.blocked) throw new DOMException("Blocked", "Blocked");
          if (start.unavailable) throw new DOMException("No calls right now", "Unavailable");
          rememberChat(start.sessionId, start.lang);
          showHistory(start.history);
          return start.sdp;
        },
        onEvent: (event) => onCallEvent(event as unknown as CallEvent),
        onLevel: (level) => {
          if (micRingRef.current) micRingRef.current.style.transform = `scale(${1 + Math.min(level * 7, 0.9)})`;
          if (level > FAINT_LEVEL) heardAnything = true;
        },
        onClosed: () => {
          if (callRef.current) endCallRef.current(copy().callDropped);
        },
      });
    } catch (error) {
      openingCallRef.current = false;
      setCallState("off");
      const name = (error as DOMException).name;
      if (name === "Blocked") setBlocked(true);
      else if (name === "NotAllowedError" || name === "SecurityError") setVoiceNote(copy().micDenied);
      else if (name === "NotFoundError") setVoiceNote(copy().micNotFound);
      else if (name === "NotReadableError") setVoiceNote(copy().micBusy);
      else {
        if (name !== "Unavailable") console.warn("[chatbot] voice call failed:", error);
        setVoiceNote(name === "Unavailable" ? copy().callUnavailable : copy().callFailed);
      }
      // Typing still works: the chat carries on without a call
      if (activeRef.current) void startChat();
      return;
    }
    openingCallRef.current = false;

    // The chat was closed while the browser was asking for permission: the mic must not stay on
    if (!activeRef.current || !start) {
      call.stop();
      void api.post("/api/chatbot/call/end", { sessionId: sessionIdRef.current }).catch(() => {});
      setCallState("off");
      return;
    }
    const { greeting, maxSeconds } = start as CallStart;
    callRef.current = call;
    setCallState("on");
    lastActivityRef.current = Date.now();

    const tick = setInterval(() => {
      const now = Date.now();
      // No sound at all: the mic is probably muted or the wrong one
      if (!heardAnything && !warnedSilent && now - opened > MIC_SILENT_NOTE_MS) {
        warnedSilent = true;
        setVoiceNote(copy().micNoSpeech);
      }
      // Nobody has said anything for a while: don't leave the mic open
      if (!speakingRef.current && now - lastActivityRef.current > CALL_IDLE_MS) {
        endCall(copy().callIdle);
        return;
      }
      // The backend ends the call at its time limit: finish politely before that
      if (!warnedEnding && now - opened > (maxSeconds - CALL_ENDING_WARNING_S) * 1000) {
        warnedEnding = true;
        sayInstead(copy().callEnding);
      }
    }, 1000);
    const goodbyeGuard = setInterval(() => {
      if (endAfterSpeechRef.current && !speakingRef.current && Date.now() - lastActivityRef.current > END_AFTER_GOODBYE_MS) endCall();
    }, 2000);
    callCleanupRef.current = () => {
      clearInterval(tick);
      clearInterval(goodbyeGuard);
    };

    greetingNextRef.current = true;
    call.send({ type: "response.create", response: { instructions: `Greet the visitor now, warmly and naturally, by saying exactly this: "${greeting}"`, tool_choice: "none" } });
  };

  const endCallByHand = () => {
    endedByHandRef.current = true;
    endCall();
  };

  const toggleMic = () => {
    const next = !micMuted;
    setMicMuted(next);
    callRef.current?.setMuted(next);
  };

  // The welcome comes again in the chosen language
  const switchLanguage = (next: Lang) => {
    if (next === langRef.current) return;
    if (callRef.current) {
      setCallLanguage(next);
      const name = next === "en" ? "English" : "Hindi";
      callRef.current.send({ type: "conversation.item.create", item: { type: "message", role: "system", content: [{ type: "input_text", text: `The visitor chose ${name}. From now on speak only ${name}.` }] } });
      sayInstead(COPY[next].switchedLanguage);
      return;
    }
    stopSpeaking();
    rememberChat("", next);
    void startChat();
  };

  const open = () => {
    unlockVoice(); // this runs inside the click, so replies that arrive later can play
    audio();
    setIsOpen(true);
    setIsMinimized(false);
    activeRef.current = true; // the welcome below is read out before the next render
    if (canTalk && !endedByHandRef.current) void startCall();
    else void startChat();
  };

  useEffect(() => {
    openRef.current = open;
  });

  const openedAtOnceRef = useRef(false);
  useEffect(() => {
    if (!openAtOnce || openedAtOnceRef.current) return;
    openedAtOnceRef.current = true;
    open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAtOnce]);

  /* ── A typed message ── */

  // During a call it goes into the same conversation, and the assistant answers aloud
  const typeInCall = async (text: string) => {
    const bubbleId = isAbusive(text) ? null : userSay(text);
    try {
      const saved = await callPost<{ flagged?: boolean; say?: string; blocked?: boolean }>("turn", { role: "user", text, lang: langRef.current });
      if (saved.flagged) {
        if (bubbleId !== null) setMessages((prev) => prev.filter((m) => m.id !== bubbleId));
        onAbuse(saved);
        return;
      }
    } catch {
      // the conversation carries on even if this line isn't saved
    }
    const call = callRef.current;
    if (!call) return;
    if (speakingRef.current) {
      call.send({ type: "response.cancel" });
      call.send({ type: "output_audio_buffer.clear" });
    }
    call.send({ type: "conversation.item.create", item: { type: "message", role: "user", content: [{ type: "input_text", text }] } });
    call.send({ type: "response.create" });
  };

  const sendToAssistant = async (text: string) => {
    // An abusive message is never shown in the chat; the backend counts it as a strike
    const bubbleId = isAbusive(text) ? null : userSay(text);
    await queueRef.current; // let a reply still being read out finish its queue first
    setIsTyping(true);
    try {
      const res = await api.post("/api/chatbot/message", {
        sessionId: sessionIdRef.current || undefined,
        text,
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || blocked || (isTyping && !callRef.current)) return;
    setInput("");
    if (callRef.current) void typeInCall(text);
    else void sendToAssistant(text);
  };

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
    localStorage.setItem("dh_chat_voice_on", next ? "1" : "0");
    if (!next) stopSpeaking();
  };

  // Closing plays the shrink animation first
  const [closing, setClosing] = useState(false);
  const closeChat = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsOpen(false);
    }, 240);
  };

  // "11:30 AM" under a bubble
  const timeOf = (at: number) => new Date(at).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  // The visitor's message has been read once the assistant has replied after it (blue ticks)
  const seen = (index: number) => messages.slice(index + 1).some((m) => m.from === "bot");

  // Show the avatar only on the first of consecutive bot messages
  const showAvatar = (index: number) => messages[index].from === "bot" && messages[index - 1]?.from !== "bot";

  const placeholder = blocked ? t.blockedPlaceholder : callState === "connecting" ? t.connecting : inCall ? (micMuted ? t.muted : speaking ? t.interruptHint : t.listening) : t.placeholder;

  const typingDots = [0, 0.15, 0.3].map((d) => <span key={d} className="dh-dot h-2 w-2 rounded-full bg-[#134698]" style={{ animationDelay: `${d}s` }} />);

  return (
    <>
      <style>{`
        @keyframes dhChatIn {
          0% { opacity: 0; transform: translate(18px, 36px) scale(.5); filter: blur(10px); border-radius: 48px; }
          55% { opacity: 1; filter: blur(0); }
          75% { transform: translate(0, -5px) scale(1.015); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes dhChatOut {
          0% { opacity: 1; transform: none; }
          100% { opacity: 0; transform: translate(18px, 30px) scale(.55); filter: blur(8px); border-radius: 48px; }
        }
        @keyframes dhHeadIn { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: none; } }
        @keyframes dhBodyIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes dhMsgIn {
          0% { opacity: 0; transform: translateY(10px) scale(.9); }
          65% { opacity: 1; transform: translateY(-2px) scale(1.01); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes dhDot { 0%, 80%, 100% { transform: translateY(0); opacity: .45; } 40% { transform: translateY(-4px); opacity: 1; } }
        .dh-chat-in { animation: dhChatIn .55s cubic-bezier(.2,.9,.25,1) both; transform-origin: bottom right; }
        .dh-chat-out { animation: dhChatOut .26s cubic-bezier(.5,0,.75,0) both; transform-origin: bottom right; }
        .dh-head-in { animation: dhHeadIn .45s .12s cubic-bezier(.2,.9,.3,1) both; }
        .dh-body-in { animation: dhBodyIn .45s .2s cubic-bezier(.2,.9,.3,1) both; }
        .dh-msg-in { animation: dhMsgIn .36s cubic-bezier(.2,.9,.3,1.2) both; transform-origin: bottom left; }
        .dh-msg-in.dh-mine { transform-origin: bottom right; }
        .dh-dot { animation: dhDot 1.1s infinite ease-in-out; }
      `}</style>

      {/* Chat window */}
      {isOpen && (
        <>
          <section
            role="dialog"
            aria-label={`${t.title} chat`}
            className={`${closing ? "dh-chat-out" : "dh-chat-in"} fixed z-[1000] flex flex-col overflow-hidden bg-white shadow-[0_24px_60px_-12px_rgba(10,30,74,0.38),0_0_0_1px_rgba(10,30,74,0.06)] inset-x-2 bottom-2 rounded-[20px] sm:inset-x-auto sm:right-5 sm:bottom-[92px] sm:w-[392px] sm:rounded-[22px] ${
              isMinimized ? "" : "h-[82vh] sm:h-[560px] sm:max-h-[calc(100vh-120px)]"
            }`}
          >
            {/* Header */}
            <header className="dh-head-in relative flex shrink-0 items-center gap-2.5 bg-gradient-to-r from-[#0A2050] via-[#0F2F6B] to-[#134698] px-3.5 py-3 border-b-[3px] border-[#fd6e15]">
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
                <p className={`truncate text-[11px] ${isTyping && !inCall ? "font-semibold text-[#86efac]" : "text-white/80"}`}>{isTyping && !inCall ? t.typing : t.subtitle}</p>
              </div>

              {/* Language */}
              <div className="flex shrink-0 items-center rounded-full bg-white/15 p-0.5 text-[11px] font-bold">
                {(["hi", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => switchLanguage(l)}
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
                <button type="button" onClick={closeChat} aria-label="Close chat" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 cursor-pointer">
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
                  className="dh-body-in relative flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-[#f4f7fb] bg-cover bg-bottom bg-no-repeat px-3.5 py-4"
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
                            <div className={`relative rounded-[16px] bg-white px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-[#1f2d44] shadow-[0_1px_3px_rgba(10,30,74,0.10)] ${showAvatar(i) ? "rounded-tl-[4px]" : ""}`}>
                              {m.title && <p className="font-bold text-[#0A2B5E]">{m.title}</p>}
                              {m.text && <p className="whitespace-pre-line">{m.text}</p>}
                              {m.live && !m.text && <span className="flex items-center gap-1 py-1">{typingDots}</span>}
                              {m.link && (
                                <Link href={m.link.href} className={`${m.text ? "mt-2 " : ""}inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#fd6e15] hover:underline`}>
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
                                  className="mt-2 first:mt-0 flex items-center gap-2 rounded-xl border border-[#fd6e15]/40 bg-[#fff6ef] px-3 py-2 text-[12.5px] font-semibold text-[#b84a08] transition hover:bg-[#ffecdf]"
                                >
                                  <Download className="h-4 w-4 shrink-0" />
                                  <span className="min-w-0">{file.label}</span>
                                </a>
                              ))}
                            </div>
                            {m.at && <p className="mt-1 pl-1 text-[10px] text-[#8a97ad]">{timeOf(m.at)}</p>}
                          </div>
                        </div>
                      ) : m.live ? (
                        // What the visitor is saying, live
                        <div key={m.id} className="dh-msg-in flex justify-end" aria-live="polite">
                          <p className="max-w-[80%] whitespace-pre-line rounded-[16px] rounded-tr-[6px] border border-dashed border-[#134698]/60 bg-white px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-[#0A2B5E] shadow-[0_2px_6px_rgba(10,43,94,0.12)]">
                            <Mic className="-mt-0.5 mr-1.5 inline h-3.5 w-3.5 animate-pulse text-red-500" />
                            {m.text || <span className="italic text-[#8a97ad]">{t.listening}</span>}
                          </p>
                        </div>
                      ) : (
                        <div key={m.id} className="dh-msg-in dh-mine flex flex-col items-end">
                          <p className="max-w-[80%] whitespace-pre-line rounded-[16px] rounded-tr-[4px] bg-gradient-to-br from-[#134698] to-[#0A2B5E] px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-white shadow-[0_2px_6px_rgba(10,43,94,0.25)]">
                            {m.text}
                          </p>
                          {m.at && (
                            <span className="mt-1 flex items-center gap-1 pr-1 text-[10px] text-[#8a97ad]">
                              {timeOf(m.at)}
                              <svg viewBox="0 0 24 24" fill="none" stroke={seen(i) ? "#2f80ed" : "#9aa6b8"} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-label={seen(i) ? "Seen" : "Sent"}>
                                <path d="M2 12.5l4.5 4.5L15 8.5M10 16l1 1 8.5-8.5" />
                              </svg>
                            </span>
                          )}
                        </div>
                      )
                    )}

                    {(isTyping || callState === "connecting") && (
                      <div className="dh-msg-in flex items-center gap-2" aria-live="polite" aria-label="DH Assist is typing">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-1 ring-[#fd6e15]/40 shadow-sm ${messages[messages.length - 1]?.from === "bot" ? "invisible" : ""}`}>
                          <Image src={LOGO} alt="" width={30} height={20} className="h-auto w-full object-contain" />
                        </span>
                        <span className="flex items-center gap-1 rounded-[16px] rounded-tl-[6px] bg-white px-3.5 py-3 shadow-[0_1px_3px_rgba(10,30,74,0.10)]">{typingDots}</span>
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
                        : inCall && !micMuted
                          ? "border-red-400 ring-2 ring-red-100"
                          : "border-[#d5deee] focus-within:border-[#134698]"
                    } ${blocked ? "opacity-60" : ""}`}
                  >
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={placeholder}
                      disabled={blocked}
                      aria-invalid={inputIsAbusive}
                      maxLength={1000}
                      className="min-w-0 flex-1 bg-transparent text-[13.5px] text-[#1f2d44] outline-none placeholder:text-[#8a97ad]"
                      aria-label={t.placeholder}
                    />
                    {inCall ? (
                      <>
                        {/* During a call: mute your mic (the ring grows with the sound it is picking up), or end the call */}
                        <button
                          type="button"
                          onClick={toggleMic}
                          title={micMuted ? t.callUnmute : t.callMute}
                          aria-label={micMuted ? t.callUnmute : t.callMute}
                          aria-pressed={micMuted}
                          className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition cursor-pointer ${micMuted ? "bg-slate-100 text-slate-500 hover:bg-slate-200" : "bg-[#eef3fb] text-[#134698] hover:bg-[#dfe8f7]"}`}
                        >
                          {!micMuted && <span ref={micRingRef} className="absolute inset-0 rounded-full bg-[#134698]/20 transition-transform duration-100" />}
                          {micMuted ? <MicOff className="h-4 w-4" /> : <Mic className="relative h-4 w-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={endCallByHand}
                          title={t.callEnd}
                          aria-label={t.callEnd}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600 cursor-pointer"
                        >
                          <PhoneOff className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        {/* No call: the replies can be read out, and the mic starts a call (hidden where the page can't, e.g. a non-https address) */}
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
                        {canTalk && (
                          <button
                            type="button"
                            onClick={() => void startCall()}
                            disabled={blocked || callState === "connecting"}
                            title={t.callStart}
                            aria-label={t.callStart}
                            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#134698] transition hover:bg-[#eef3fb] disabled:opacity-40 cursor-pointer"
                          >
                            <Mic className="h-4 w-4" />
                          </button>
                        )}
                      </>
                    )}
                    <button
                      type="submit"
                      disabled={!input.trim() || (isTyping && !inCall) || blocked}
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
            onClick={closeChat}
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
