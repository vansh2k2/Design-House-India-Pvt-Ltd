"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, BellOff, Download, Mic, Minus, Send, Square, Volume2, VolumeX, X } from "lucide-react";

import { api, API_URL } from "@/lib/api";
import { isAbusive } from "@/lib/chatGuards";
import { canOpenMic, openMic, STOP_AFTER_QUIET_MS, type Mic as OpenMic } from "@/lib/chatMic";
import { pauseSpeaking, prepareVoices, resumeSpeaking, speak, stopSpeaking, unlockVoice } from "@/lib/chatVoice";

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
    micStart: "Start talking",
    micStop: "Stop talking",
    listening: "I'm listening, just speak...",
    interruptHint: "Speak any time, I'll stop and listen",
    understanding: "Understanding...",
    micDenied: "Microphone access is blocked. Click the icon in the address bar and allow the microphone.",
    micNoSpeech: "I can't hear anything. Please check your microphone.",
    micAutoOff: "I switched the mic off because it was quiet for a while. Tap it to talk again.",
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
    micStart: "बात शुरू करें",
    micStop: "बात बंद करें",
    listening: "सुन रही हूँ, बस बोलिए...",
    interruptHint: "कभी भी बोलिए, मैं रुककर सुनूँगी",
    understanding: "समझ रही हूँ...",
    micDenied: "माइक्रोफ़ोन की अनुमति नहीं है। एड्रेस बार के आइकन पर क्लिक करके माइक्रोफ़ोन की अनुमति दें।",
    micNoSpeech: "कुछ सुनाई नहीं दे रहा। अपना माइक्रोफ़ोन देख लीजिए।",
    micAutoOff: "काफ़ी देर से कोई आवाज़ नहीं आई, इसलिए माइक बंद कर दिया। बात करनी हो तो माइक दबाइए।",
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
  repeatGreeting?: Reply; // the welcome already in the chat, to be said again
}

const SESSION_KEY = "dh_chat_session";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const LOGO = "/logotransparent-sm.webp";
const CHAT_BG = "/assets/chatbot/bg.webp";

/* Voice input: the mic is listened to here (lib/chatMic) and what the visitor says is turned into text on the
   backend (OpenAI). The browsers' own speech recognition heard speech but returned no text in Chrome or Edge,
   with no error to go on. */
const FAINT_LEVEL = 0.004; // below this the mic is hearing nothing at all
const MIC_SILENT_NOTE_MS = 10000;
const MIC_IDLE_MS = 120000; // the mic switches itself off after this long without anyone talking
// The words so far are fetched again and again while the visitor speaks; long messages less often, since
// each request sends the whole clip
const LIVE_TEXT_EVERY_MS = 800;
const LIVE_TEXT_SLOWER_MS = 3000;
const LIVE_TEXT_SLOWER_AFTER_MS = 15000;

// Did the mic just hear the assistant's own voice? Speakers can get past the browser's echo removal.
const isOwnVoice = (heard: string, spoken: string) => {
  const words = (value: string) => value.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const heardWords = words(heard);
  if (heardWords.length < 3) return false;
  const said = new Set(words(spoken));
  return heardWords.filter((word) => said.has(word)).length / heardWords.length >= 0.8;
};

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
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [blocked, setBlocked] = useState(false);
  // Spoken replies (separate from the notification chime) and voice input
  const [voiceOn, setVoiceOn] = useState(() => localStorage.getItem("dh_chat_voice_on") !== "0");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcribing, setTranscribing] = useState(false); // recording finished, final text on its way
  const [liveText, setLiveText] = useState(""); // words recognised so far, shown in the chat while speaking
  const [hearing, setHearing] = useState(false); // the visitor is talking right now
  const [canListen] = useState(canOpenMic);
  const [voiceNote, setVoiceNote] = useState("");
  const voiceOnRef = useRef(voiceOn);
  const micRef = useRef<OpenMic | null>(null); // the open mic of a spoken conversation
  const micRingRef = useRef<HTMLSpanElement>(null); // grows with the sound level while the mic is on
  const openingMicRef = useRef(false);
  const conversationCleanupRef = useRef<(() => void) | null>(null);
  const speakingRef = useRef(false);
  const userTalkingRef = useRef(false);
  const interruptedRef = useRef(false); // the visitor has talked over the assistant's current reply
  const lastSpokenRef = useRef("");
  const sendChainRef = useRef<Promise<void>>(Promise.resolve());
  // Always the latest function, for when the mic or a timer calls it
  const endConversationRef = useRef<() => void>(() => {});

  const t = COPY[lang];
  const inputIsAbusive = input.trim().length > 0 && isAbusive(input);
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
      endConversationRef.current();
      void audioRef.current?.close();
    };
  }, []);

  // Closing or minimising stops whatever is already going on; replies that arrive later stay silent (see botSay)
  useEffect(() => {
    if (!isOpen || isMinimized) {
      stopSpeaking();
      endConversationRef.current();
    }
  }, [isOpen, isMinimized]);

  // The conversation also ends when the visitor is blocked or goes to another tab: the mic shouldn't stay on unseen
  useEffect(() => {
    if (blocked) endConversationRef.current();
  }, [blocked]);

  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden || !micRef.current) return;
      stopSpeaking();
      endConversationRef.current();
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
  }, [messages, isTyping, liveText, hearing, transcribing]);

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
  // Reads a line aloud, unless voice replies are off, the chat is closed or the visitor is talking
  const readOut = async (line: Reply) => {
    if (!voiceOnRef.current || !activeRef.current || interruptedRef.current) return;
    if (!micRef.current) await sleep(150);
    if (!activeRef.current || interruptedRef.current) return;
    const spoken = line.spoken || [line.title, line.text].filter(Boolean).join(". ");
    const audioUrl = line.speakId === undefined ? undefined : `${API_URL}/api/chatbot/speak?session=${sessionIdRef.current}&message=${line.speakId}`;
    lastSpokenRef.current = spoken;
    speakingRef.current = true;
    setSpeaking(true);
    micRef.current?.setAssistantTalking(true);
    await speak(spoken, audioUrl);
    micRef.current?.setAssistantTalking(false);
    speakingRef.current = false;
    setSpeaking(false);
  };

  const botSay = (lines: Reply[]) => {
    queueRef.current = queueRef.current.then(async () => {
      for (const line of lines) {
        if (!aliveRef.current) return;
        // The visitor has started talking: the rest of the reply just appears, without the wait or the voice
        if (!interruptedRef.current && !micRef.current) {
          setIsTyping(true);
          await sleep(350 + Math.min(line.text.length * 4, 500));
          if (!aliveRef.current) return;
          setIsTyping(false);
        }
        // Only the newest message keeps its quick questions
        setMessages((prev) => [...prev.map((m) => (m.chips ? { ...m, chips: undefined } : m)), { id: ++idRef.current, from: "bot", ...line }]);
        // A reply that arrives while the chat is closed just waits in the chat, silently. In a spoken
        // conversation the voice itself is the signal, and a chime would only get into the mic.
        if (activeRef.current && !micRef.current) playIncoming();
        // Let the next message wait until this one has been spoken
        await readOut(line);
        if (!interruptedRef.current) await sleep(280);
      }
    });
    return queueRef.current;
  };

  const userSay = (text: string) => {
    const id = ++idRef.current;
    stopSpeaking(); // the visitor moved on: don't keep reading the old reply
    setMessages((prev) => [...prev.map((m) => (m.chips ? { ...m, chips: undefined } : m)), { id, from: "user", text }]);
    if (!micRef.current) playSent();
    return id;
  };

  const applyResponse = (data: ChatResponse) => {
    if (data.sessionId) {
      sessionIdRef.current = data.sessionId;
      localStorage.setItem(SESSION_KEY, data.sessionId);
    }
    setStep(data.step);
    setBlocked(Boolean(data.blocked));
    if (data.lang) {
      langRef.current = data.lang;
      setLang(data.lang); // a whole sentence in the other language switches the chat to it
      localStorage.setItem("dh_chat_lang", data.lang);
    }
  };

  /* ── Opening the chat: every time it opens it welcomes the visitor and asks how it can help ── */
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
      if (!chatLoadedRef.current && data.history?.length) {
        const lastBot = data.history.map((m) => m.from).lastIndexOf("bot");
        setMessages(data.history.map((m, i) => ({ ...m, id: ++idRef.current, chips: i === lastBot ? m.chips : undefined })));
      }
      chatLoadedRef.current = true;
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

  // The welcome comes again in the chosen language, so that its quick questions are in that language too
  const switchLanguage = (next: Lang) => {
    if (next === langRef.current) return;
    stopSpeaking();
    langRef.current = next;
    setLang(next);
    localStorage.setItem("dh_chat_lang", next);
    void startChat();
  };

  const open = () => {
    playOpen(); // also unlocks audio for the replies that follow (this runs inside the click)
    unlockVoice();
    setIsOpen(true);
    setIsMinimized(false);
    activeRef.current = true; // the welcome below is read out before the next render
    void startChat();
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleText(input);
  };

  /* ── Spoken conversation: one tap on the mic, then it goes back and forth like a phone call. The mic stays on
     between turns, the visitor can talk over the assistant at any moment, and only what they say is uploaded. ── */
  const transcribeClip = async (clip: Blob) => {
    const form = new FormData();
    form.append("audio", clip, "speech.wav");
    const res = await api.post(`/api/chatbot/transcribe?lang=${langRef.current}`, form);
    return res.data.data as { text: string; blocked?: boolean };
  };

  const endConversation = () => {
    conversationCleanupRef.current?.();
    conversationCleanupRef.current = null;
    micRef.current?.stop();
    micRef.current = null;
    userTalkingRef.current = false;
    interruptedRef.current = false;
    setListening(false);
    setHearing(false);
    setLiveText("");
  };

  // Spoken turns go one at a time, in order, even if the visitor talks again before a reply has arrived
  const sendSpoken = (text: string) => {
    sendChainRef.current = sendChainRef.current.then(async () => {
      await queueRef.current;
      if (!userTalkingRef.current) interruptedRef.current = false;
      await sendToAssistant(text);
    });
  };

  const startConversation = async () => {
    if (micRef.current || openingMicRef.current) return;
    const copy = () => COPY[langRef.current];
    openingMicRef.current = true;
    audio(); // unlock audio while this is still part of the click
    unlockVoice();
    setVoiceNote("");
    setListening(true);

    let startedOverAssistant = false;
    let lastActivity = Date.now();
    let lastPreview = 0;
    let previewBusy = false;
    let preview: { startedAt: number; words: ReturnType<typeof transcribeClip> } | null = null;
    let heardAnything = false;
    let warned = false;
    const opened = Date.now();

    let mic: OpenMic;
    try {
      mic = await openMic({
        onLevel: (level) => {
          if (micRingRef.current) micRingRef.current.style.transform = `scale(${1 + Math.min(level * 7, 0.9)})`;
          if (level > FAINT_LEVEL) heardAnything = true;
        },
        onInterruptSuspected: pauseSpeaking,
        onFalseAlarm: resumeSpeaking,
        onSpeechStart: () => {
          startedOverAssistant = speakingRef.current;
          // Only paused: the reply is dropped once real words have been heard, not for a cough or a door
          if (startedOverAssistant) pauseSpeaking();
          userTalkingRef.current = true;
          interruptedRef.current = true;
          lastActivity = Date.now();
          lastPreview = lastActivity;
          preview = null;
          setLiveText("");
          setHearing(true);
        },
        onSpeechEnd: async (clip) => {
          userTalkingRef.current = false;
          lastActivity = Date.now();
          setHearing(false);
          const carryOn = () => {
            interruptedRef.current = false;
            if (!startedOverAssistant) return;
            micRef.current?.falseStart();
            resumeSpeaking();
          };
          if (!clip) {
            carryOn();
            setLiveText("");
            return;
          }
          setTranscribing(true);
          try {
            // A preview that started after the last word has the whole sentence: no need to ask again
            const finished = preview && Date.now() - preview.startedAt < STOP_AFTER_QUIET_MS - 100 ? preview.words : null;
            const { text, blocked: isBlocked } = await (finished ? finished.catch(() => transcribeClip(clip)) : transcribeClip(clip));
            if (isBlocked) setBlocked(true);
            // The chat was closed meanwhile: leave the words in the box instead of sending them
            else if (text && !activeRef.current) setInput(text);
            else if (text && !(startedOverAssistant && isOwnVoice(text, lastSpokenRef.current))) {
              stopSpeaking();
              sendSpoken(text);
            } else carryOn();
          } catch {
            carryOn();
            setVoiceNote(copy().micFailed);
          } finally {
            setTranscribing(false);
            setLiveText("");
            lastActivity = Date.now();
          }
        },
      });
    } catch (error) {
      openingMicRef.current = false;
      setListening(false);
      const name = (error as DOMException).name;
      if (name === "NotAllowedError" || name === "SecurityError") setVoiceNote(copy().micDenied);
      else if (name === "NotFoundError") setVoiceNote(copy().micNotFound);
      else if (name === "NotReadableError") setVoiceNote(copy().micBusy);
      else setVoiceNote(copy().micFailed);
      return;
    }
    openingMicRef.current = false;

    // The chat was closed while the browser was asking for permission: the mic must not stay on
    if (!activeRef.current) {
      mic.stop();
      setListening(false);
      return;
    }
    micRef.current = mic;
    mic.setAssistantTalking(speakingRef.current);

    const tick = setInterval(() => {
      const now = Date.now();
      if (speakingRef.current) lastActivity = now;

      // No sound at all: the mic is probably muted or the wrong one
      if (!heardAnything && !warned && now - opened > MIC_SILENT_NOTE_MS) {
        warned = true;
        setVoiceNote(copy().micNoSpeech);
      }
      // Nobody has said anything for a while: don't leave the mic open
      if (!userTalkingRef.current && now - lastActivity > MIC_IDLE_MS) {
        endConversation();
        setVoiceNote(copy().micAutoOff);
        return;
      }
      // The words so far, so what's being said shows up in the chat while it is being said
      const gap = now - lastActivity > LIVE_TEXT_SLOWER_AFTER_MS ? LIVE_TEXT_SLOWER_MS : LIVE_TEXT_EVERY_MS;
      if (!userTalkingRef.current || previewBusy || now - lastPreview < gap) return;
      const clip = mic.clip();
      if (!clip) return;
      previewBusy = true;
      lastPreview = now;
      const words = transcribeClip(clip);
      preview = { startedAt: now, words };
      words
        .then(({ text, blocked: isBlocked }) => {
          if (isBlocked) setBlocked(true);
          if (userTalkingRef.current && text) setLiveText(text);
        })
        .catch(() => {}) // only a preview: the final text is what counts
        .finally(() => {
          previewBusy = false;
        });
    }, 200);
    conversationCleanupRef.current = () => clearInterval(tick);
  };

  endConversationRef.current = endConversation;

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

  // Show the avatar only on the first of consecutive bot messages
  const showAvatar = (index: number) => messages[index].from === "bot" && messages[index - 1]?.from !== "bot";

  return (
    <>
      <style>{`
        @keyframes dhChatIn { from { opacity: 0; transform: translateY(16px) scale(.96); } to { opacity: 1; transform: none; } }
        @keyframes dhMsgIn { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes dhDot { 0%, 80%, 100% { transform: translateY(0); opacity: .45; } 40% { transform: translateY(-4px); opacity: 1; } }
        .dh-chat-in { animation: dhChatIn .32s cubic-bezier(.2,.9,.3,1.2) both; transform-origin: bottom right; }
        .dh-msg-in { animation: dhMsgIn .28s ease-out both; }
        .dh-dot { animation: dhDot 1.1s infinite ease-in-out; }
      `}</style>

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
                    {(hearing || transcribing) && (
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
                      placeholder={blocked ? t.blockedPlaceholder : listening ? (speaking ? t.interruptHint : t.listening) : t.placeholder[step]}
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
                        onClick={listening ? endConversation : () => void startConversation()}
                        disabled={blocked}
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
