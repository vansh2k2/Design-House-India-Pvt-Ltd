"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { AudioLines, Bell, BellOff, Download, Headset, Mic, MicOff, Minus, PhoneOff, Send, Volume2, VolumeX, X } from "lucide-react";

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
    chatEnded: "This chat has ended.",
    resume: "Resume chat",
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
    callIdle: "I ended the call because it was quiet for a while. Tap the mic to talk again.",
    didntCatch: "Sorry, I didn't catch that. Could you say it again?",
    noise: "Noise cancellation",
    noiseOnHint: "On: background noise and voices further away are filtered out",
    noiseOffHint: "Off: your mic is heard as it is",
    teamTitle: "Design House Team",
    teamSubtitle: "You're chatting with our team",
    teamName: "Design House Team",
    teamJoined: "Someone from the Design House team has joined the chat",
    teamLeft: "The team has left the chat. DH Assist will reply from here.",
    teamPlaceholder: "Message our team...",
    teamFooter: "You're chatting with a person from Design House",
  },
  // Hindi as people type it in chats (Roman letters), like the assistant's own Hindi
  hi: {
    title: "DH Assist",
    subtitle: "Design House Assistant",
    placeholder: "Yahan likhiye...",
    blockedPlaceholder: "Ye chat block hai",
    abuseHint: "Please galat shabd use na kijiye. Bhejne par aapko warning milegi.",
    offline: "Maaf kijiye, chat abhi chal nahi rahi. +91 96549 00525 par call kijiye ya info@designhouse.co.in par email kijiye.",
    footer: "AI assistant • Chat aur IP address follow-up ke liye save hote hain",
    online: "Online",
    typing: "likh rahi hai…",
    soundOn: "Notification sound on",
    soundOff: "Notification sound off",
    voiceOn: "Bolkar jawab on",
    voiceOff: "Bolkar jawab off",
    callStart: "Mujhse baat kijiye",
    callEnd: "Call band kijiye",
    chatEnded: "Ye chat band ho gayi hai.",
    resume: "Chat phir shuru kijiye",
    callMute: "Apna mic band kijiye",
    callUnmute: "Apna mic chalu kijiye",
    connecting: "Jod rahi hoon...",
    listening: "Sun rahi hoon, bas boliye...",
    interruptHint: "Kabhi bhi boliye, main rukkar sunungi",
    muted: "Aapka mic band hai",
    micDenied: "Microphone ki permission nahi hai. Address bar ke icon par click karke allow kijiye, ya yahan likh dijiye.",
    micNoSpeech: "Kuch sunai nahi de raha. Apna microphone check kar lijiye.",
    micNotFound: "Is device par microphone nahi mila. Aap yahan likh sakte hain.",
    micBusy: "Koi doosra app microphone use kar raha hai. Use band kijiye, ya yahan likh dijiye.",
    callFailed: "Maaf kijiye, call jud nahi payi. Aap yahan likh sakte hain.",
    callUnavailable: "Abhi voice call available nahi hai. Aap yahan likhiye, main jawab dungi.",
    callDropped: "Call band ho gayi. Baat karni ho toh mic dabaiye.",
    callEnding: "Call ka time ab poora hone wala hai. Aage ki baat aap yahan chat mein likhkar kar sakte hain.",
    goodbye: "Design House se baat karne ke liye dhanyavaad! Aapka din accha rahe.",
    callIdle: "Kaafi der se koi awaaz nahi aayi, isliye call band kar di. Baat karni ho toh mic dabaiye.",
    didntCatch: "Maaf kijiye, main theek se samajh nahi paayi. Kya aap dobara bata sakte hain?",
    noise: "Noise cancellation",
    noiseOnHint: "On: aas-paas ka shor aur door ki awaazein filter hoti hain",
    noiseOffHint: "Off: aapka mic jaisa hai waisa suna jata hai",
    teamTitle: "Design House Team",
    teamSubtitle: "Aap hamari team se baat kar rahe hain",
    teamName: "Design House Team",
    teamJoined: "Design House team se koi chat mein jud gaye hain",
    teamLeft: "Team chat se chali gayi. Ab DH Assist jawab degi.",
    teamPlaceholder: "Hamari team ko likhiye...",
    teamFooter: "Aap Design House ki team se baat kar rahe hain",
  },
};

/* ───────────────────────── Messages ───────────────────────── */

interface Reply {
  title?: string;
  text: string;
  link?: { href: string; label: string };
  files?: Array<{ href: string; label: string; type?: string; size?: number }>; // PDFs to download; href is a path on the API, or a full URL for files the team sent
  speakId?: number; // how to ask the backend for this message's audio
  spoken?: string; // the text written for reading aloud
  greeting?: boolean; // the welcome: a new one replaces the one still showing instead of adding another
}
// "agent": someone from the team who took the chat over in the admin; event: they joined or left (a note, not a bubble)
type From = "bot" | "user" | "agent";
interface HistoryItem extends Reply {
  from: From;
  event?: "joined" | "left";
  at?: number;
}
interface Message extends Reply {
  id: number;
  at?: number; // when it appeared (shown under the bubble)
  from: From;
  event?: "joined" | "left";
  key?: string; // in a call: the conversation item this bubble shows
  live?: boolean; // in a call: still being said
}
interface ChatResponse {
  sessionId: string;
  lang?: Lang;
  replies: Reply[];
  blocked: boolean;
  flagged?: boolean;
  end?: boolean; // the visitor said goodbye: the chat ends shortly
  history?: HistoryItem[];
  repeatGreeting?: Reply; // the welcome already in the chat, to be said again
  agent?: boolean; // someone from the team has the chat: the assistant isn't replying
  serverTime?: number;
}
interface TeamUpdates {
  agent: boolean;
  messages: Array<{ text: string; event?: "joined" | "left"; files?: Reply["files"]; at: number }>;
  serverTime: number;
}
interface CallStart {
  blocked?: boolean;
  unavailable?: boolean;
  agent?: boolean; // someone from the team has the chat: no call with the assistant
  serverTime?: number;
  sessionId: string;
  lang: Lang;
  sdp: string;
  greeting: string;
  choiceGreeting?: string; // the same welcome, asking whether they'd rather talk or type
  history: HistoryItem[];
  maxSeconds: number;
  knowsName?: boolean; // the visitor's name is already known (from earlier in this chat)
  voiceStyle?: string; // how the assistant sounds: a reply with its own instructions replaces the call's, so it goes along
  goodbye?: { en: string; hi: string }; // the ending message the team set (admin: AI Training)
}
interface CallEvent {
  type: string;
  item_id?: string;
  delta?: string;
  transcript?: string;
  logprobs?: Array<{ logprob: number }>; // how sure the transcriber was of each word
  text?: string;
  item?: { id: string; type: string; role?: string; content?: Array<{ type: string }> };
  response?: { status?: string; output?: Array<{ type: string; id?: string; name?: string; call_id?: string; arguments?: string }> };
  error?: { code?: string; message?: string };
}
interface ToolDone {
  output: unknown;
  files?: Reply["files"];
  link?: Reply["link"];
  end?: boolean;
  blocked?: boolean;
  flagged?: boolean;
}

const SESSION_KEY = "dh_chat_session";
// The name comes before any answer. Until it is known, the call doesn't reply by itself (backend: create_response off)
// and each reply is asked for with only this to do. A hello or the "talk or type" choice is answered without asking it;
// the name is asked when they ask something. After a few turns the call goes on without it.
const MAX_NAME_ASKS = 5;
const NAME_STEP = `You are DH Assist, a warm young woman answering a call for Design House India Private Limited. You are a woman, so use feminine verbs for yourself (बताती हूँ, बताऊँगी). You don't know the visitor's name yet: you ask it when they ask you something, before answering it.
- If what the visitor just said is their name (like "Rahul", "mera naam Rahul hai", "I'm Priya"), call update_visitor with it and say nothing.
- If they would rather type than talk (like "typing", "type karunga", "likhkar", "I'll type"), call continue_typing and say nothing.
- If they just chose to talk (like "bolkar", "baat karni hai", "talk"), or only said hello, ok or thanks, say one short warm line asking how you can help, in their language, without asking their name: "जी ज़रूर! बताइए, मैं आपकी क्या मदद कर सकती हूँ?" or "Sure! Tell me, how can I help you today?"
- If the talk is over and they want nothing more, call end_conversation and say nothing.
- Otherwise (they asked something or want something, even "tell me first"): do NOT answer it yet. In the language they are speaking (Hindi in Devanagari), say one short warm line that you'll help right away, and ask their name. For example: "जी, मैं अभी बताती हूँ, बस पहले अपना नाम बता दीजिए?" or "Sure, I'll tell you right away. May I know your name first?"
- If they clearly refuse to give a name, call update_visitor with name "Visitor" and say nothing.
- Insults or harassment: call report_abuse. Talk not meant for you (people around them talking to each other): call not_for_me and say nothing.`;
// Typed in answer to "talk or type?": this means talking, anything else means they are typing
const WANTS_TO_TALK = /\b(talk|speak|voice|call|bol\w*|baat)\b|बोल|बात/i;
const botSaysGoodbye = (text: string) => /have a (great|good|nice|lovely) day|good\s?bye|take care|din (accha|acha|achha|shubh)|दिन अच्छा|दिन शुभ|alvida|अलविदा/i.test(text) && !/[?؟]\s*$/.test(text);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const LOGO = "/logotransparent-sm.webp";
const CHAT_BG = "/assets/chatbot/bg.webp";
// The assistant's files are paths on the API; the team's are full URLs
const fileUrl = (href: string) => (/^https?:\/\//.test(href) ? href : `${API_URL}${href}`);
const isPhoto = (file: { href: string; type?: string; label?: string }) => (file.type || "").startsWith("image/") || /\.(jpe?g|png|webp|gif)$/i.test(file.label || file.href);

const FAINT_LEVEL = 0.004; // below this the mic is hearing nothing at all
const MIC_SILENT_NOTE_MS = 10000;
const CALL_IDLE_MS = 120000; // the call ends itself after this long without anyone talking
const CALL_ENDING_WARNING_S = 30; // the assistant says so this long before the call's time limit
const CHAT_END_AFTER_GOODBYE_MS = 10000; // the chat ends this long after the goodbye, unless the visitor carries on
const END_AFTER_GOODBYE_MS = 15000; // if the "finished speaking" event never comes
const TEAM_CHECK_MS = 4000; // while the chat is open, how often it checks for messages from the team

// Spoken Hindi comes in Devanagari or Urdu letters; the chat shows it in Roman letters (Hinglish), as the backend
// rewrites it. Until then the bubble shows "listening" or "typing". (Marathi and others come back as they are.)
const REWRITTEN_SCRIPTS = /[\u0900-\u097F\u0600-\u06FF\u0A00-\u0A7F]/;

// A cough, a click or chopped sound comes back from the transcriber as words of any language (Japanese, Korean, Welsh…).
// Those are never shown or answered. Letters of languages spoken by this site's visitors are allowed; the rest aren't.
const FOREIGN_LETTERS = new RegExp("(?![\\p{Script=Latin}\\p{Script=Devanagari}\\p{Script=Arabic}\\p{Script=Gurmukhi}\\p{Script=Gujarati}\\p{Script=Bengali}\\p{Script=Tamil}\\p{Script=Telugu}\\p{Script=Kannada}\\p{Script=Malayalam}\\p{Script=Oriya}])\\p{L}", "u");
const LEAST_CONFIDENCE = -0.7; // the transcriber's average log-probability: in tests real speech stayed above this, and noise below
const misheard = (text: string, logprobs?: Array<{ logprob: number }>) =>
  FOREIGN_LETTERS.test(text) || Boolean(logprobs?.length && logprobs.reduce((sum, word) => sum + word.logprob, 0) / logprobs.length < LEAST_CONFIDENCE);
const SHORTEST_SPEECH_MS = 1200; // misheard and shorter than this is a noise: ignored. Longer is someone talking: asked again.
const NOISE_KEY = "dh_chat_noise";

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openRef: RefObject<(() => void) | null>; // the robot (ChatbotLauncher) opens the chat through this, inside its click
  openAtOnce: boolean; // the robot was clicked before this code had arrived
}

const EnhancedChatbot = ({ isOpen, setIsOpen, openRef, openAtOnce }: ChatbotProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  // Browser-only component (loaded with ssr: false), so localStorage is available here
  // Every chat starts in English; what the visitor writes or says switches it (the backend decides)
  const [lang, setLang] = useState<Lang>("en");
  // Noise cancellation in calls: on unless the visitor turned it off (remembered in this browser)
  const [noiseOn, setNoiseOn] = useState(() => localStorage.getItem(NOISE_KEY) !== "0");
  const noiseOnRef = useRef(noiseOn);
  noiseOnRef.current = noiseOn;
  const [muted, setMuted] = useState(() => localStorage.getItem("dh_chat_muted") === "1");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [blocked, setBlocked] = useState(false);
  // Replies read out when there's no call (separate from the notification chime)
  const [voiceOn, setVoiceOn] = useState(() => localStorage.getItem("dh_chat_voice_on") === "1");
  const [speaking, setSpeaking] = useState(false);
  const [callState, setCallState] = useState<"off" | "connecting" | "on">("off");
  const [micMuted, setMicMuted] = useState(false);
  const [canTalk] = useState(canCall);
  const [voiceNote, setVoiceNote] = useState("");
  // Someone from the team has taken the chat over in the admin: the assistant is quiet and their messages appear here
  const [teamLive, setTeamLive] = useState(false);
  const teamLiveRef = useRef(false);
  const teamSinceRef = useRef(0); // the team's messages written after this (server time) are fetched
  const teamSeenRef = useRef(new Set<number>());
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

  const showHistory = (history?: HistoryItem[]) => {
    history?.forEach((m) => m.from === "agent" && m.at && teamSeenRef.current.add(m.at));
    if (!chatLoadedRef.current && history?.length) setMessages(history.map((m) => ({ ...m, id: ++idRef.current })));
    chatLoadedRef.current = true;
  };

  // The team took the chat over (or handed it back): during a call the assistant would keep talking, so the call ends
  const setTeam = (on: boolean) => {
    if (teamLiveRef.current === on) return;
    teamLiveRef.current = on;
    setTeamLive(on);
    if (on) {
      stopSpeaking();
      setIsTyping(false);
      if (callRef.current) endCallRef.current();
    }
  };

  const syncTeam = (data: { agent?: boolean; serverTime?: number }) => {
    if (data.agent !== undefined) setTeam(data.agent);
    // A little before the server's time, in case a message was being saved just then (seen ones aren't shown twice)
    if (data.serverTime && !teamSinceRef.current) teamSinceRef.current = data.serverTime - 10000;
  };

  const rememberChat = (sessionId: string, chatLang?: Lang) => {
    if (sessionId) {
      sessionIdRef.current = sessionId;
      localStorage.setItem(SESSION_KEY, sessionId);
    }
    if (chatLang) {
      langRef.current = chatLang;
      setLang(chatLang); // a whole sentence in the other language switches the chat to it
    }
  };

  const applyResponse = (data: ChatResponse) => {
    rememberChat(data.sessionId, data.lang);
    setBlocked(Boolean(data.blocked));
    syncTeam(data);
  };

  // While the chat is open it checks every few seconds whether the team has written or taken the chat over
  useEffect(() => {
    if (!isOpen) return;
    let busy = false;
    const check = async () => {
      if (busy || document.hidden || !sessionIdRef.current || !teamSinceRef.current) return;
      busy = true;
      try {
        const res = await api.get(`/api/chatbot/updates?session=${encodeURIComponent(sessionIdRef.current)}&since=${teamSinceRef.current}`);
        const data: TeamUpdates = res.data.data;
        const fresh = data.messages.filter((m) => !teamSeenRef.current.has(m.at));
        if (fresh.length) {
          fresh.forEach((m) => teamSeenRef.current.add(m.at));
          teamSinceRef.current = Math.max(teamSinceRef.current, ...fresh.map((m) => m.at));
          setMessages((prev) => [...prev, ...fresh.map((m): Message => ({ id: ++idRef.current, from: "agent", text: m.text, event: m.event, files: m.files, at: m.at }))]);
          if (activeRef.current) playIncoming();
        }
        setTeam(data.agent);
      } catch {
        // tried again on the next tick
      } finally {
        busy = false;
      }
    };
    const timer = setInterval(() => void check(), TEAM_CHECK_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  const dropBubble = (key: string) => {
    droppedRef.current.add(key);
    setMessages((prev) => prev.filter((m) => m.key !== key));
  };

  // In a call, text arrives word by word. The visitor's own words show as they come (unless in Urdu letters); the
  // assistant's are kept here and appear whole, like a sent message, after a "typing" bubble.
  const heardRef = useRef(new Map<string, string>());
  const botTextRef = useRef(new Map<string, string>());
  // Replies whose words are on their way back from the backend (Hindi into Roman letters): their bubbles stay
  const rewritingRef = useRef(new Set<string>());
  // What the visitor has said since the assistant last spoke: all of it goes if it turns out to be overheard talk
  const unansweredRef = useRef<string[]>([]);
  // Bubbles taken out of the chat: words still arriving for them (rewritten in Roman letters) don't bring them back
  const droppedRef = useRef(new Set<string>());
  // The name comes first: until the visitor gives it, each time they start speaking the assistant is reminded, so the
  // reminder is there before it replies (the prompt alone wasn't followed reliably). A few times at most.
  const nameKnownRef = useRef(false);
  const nameAsksRef = useRef(0);
  const voiceStyleRef = useRef("");
  // The welcome asked "talk or type?" and the visitor hasn't said anything yet
  const choosingRef = useRef(false);
  const goingToTypingRef = useRef(false); // the visitor chose typing: the call ends once the assistant has said so
  const awaitingWordsRef = useRef(false); // the visitor has just spoken and the words aren't written down yet
  const typingAckRef = useRef(false); // the written reply that hands over to typing is on its way: the call ends after it
  // The visitor's last turn in the call was typed: the reply to it is written, not spoken
  const typedTurnRef = useRef(false);
  const replyHow = () => (typedTurnRef.current ? { output_modalities: ["text"] } : {});
  // The goodbye: once it has been said, the chat ends a little later unless the visitor carries on
  const closeAfterSpeechRef = useRef(false);
  const closingAtRef = useRef<number | null>(null);
  // Once the goodbye has been said it stays that way: whatever else is said, 10 seconds of quiet ends the chat
  const closingModeRef = useRef(false);
  const goodbyeSaidRef = useRef(false);
  // The ending message, as the team set it in the admin (the call start brings it)
  const goodbyeRef = useRef({ en: "Thank you for talking to Design House. Have a great day!", hi: "डिज़ाइन हाउस से बात करने के लिए धन्यवाद! आपका दिन अच्छा रहे।" });
  const visitorSpeakingRef = useRef(false);
  const speechStartedAtRef = useRef(0);
  const lastSpeechMsRef = useRef(0);
  const resumeByVoiceRef = useRef(false); // the chat that ended was a call
  const finishChatRef = useRef<() => void>(() => {});
  const [chatEnded, setChatEnded] = useState(false);
  const startClosing = () => {
    closingModeRef.current = true;
    closeAfterSpeechRef.current = false;
    closingAtRef.current = Date.now() + CHAT_END_AFTER_GOODBYE_MS;
  };
  const lastVisitorWordsRef = useRef("");
  // Instructions for one reply replace the call's own, so how the assistant sounds has to go along with them
  const withVoiceStyle = (instructions: string) => [voiceStyleRef.current, instructions].filter(Boolean).join("\n\n");

  // The name is known (or given up on): replies are automatic again
  const nameDone = () => {
    if (nameKnownRef.current) return;
    nameKnownRef.current = true;
    callRef.current?.send({ type: "session.update", session: { type: "realtime", audio: { input: { turn_detection: { type: "semantic_vad", eagerness: "medium", create_response: true, interrupt_response: true } } } } });
  };

  const updateBubble = (key: string, from: Message["from"], change: (bubble: Message) => Partial<Message>) =>
    setMessages((prev) => {
      if (droppedRef.current.has(key)) return prev;
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
    call.send({ type: "response.create", response: { instructions: withVoiceStyle(`Say exactly this and nothing else: "${line}"`), tool_choice: "none", ...replyHow() } });
  };

  // The talk is over: the goodbye, in place of whatever was being said, and then the chat ends a little later
  const sayGoodbye = () => {
    closeAfterSpeechRef.current = true;
    if (goodbyeSaidRef.current) return;
    goodbyeSaidRef.current = true;
    const call = callRef.current;
    if (!call) return;
    call.send({ type: "response.cancel" });
    call.send({ type: "output_audio_buffer.clear" });
    call.send({ type: "response.create", response: { instructions: withVoiceStyle(`You are DH Assist, a warm young woman answering for Design House India Private Limited, so use feminine verbs for yourself. The visitor has finished. Their last words were: "${lastVisitorWordsRef.current.slice(0, 200)}". Reply in the same language as those words, and say only a short warm goodbye. In English: "${goodbyeRef.current.en}" In Hindi, written in Devanagari: "${goodbyeRef.current.hi}" Don't ask anything. Say nothing else.`), tool_choice: "none", ...replyHow() } });
  };

  // What was heard can't be trusted: it isn't shown or answered. Someone talking is asked again; a noise is just ignored.
  const ignoreMisheard = (itemId: string) => {
    dropBubble(itemId);
    heardRef.current.delete(itemId);
    unansweredRef.current = unansweredRef.current.filter((id) => id !== itemId);
    const call = callRef.current;
    if (!call) return;
    call.send({ type: "conversation.item.delete", item_id: itemId });
    call.send({ type: "response.cancel" });
    call.send({ type: "output_audio_buffer.clear" });
    if (lastSpeechMsRef.current >= SHORTEST_SPEECH_MS) sayInstead(COPY[langRef.current].didntCatch);
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
    choosingRef.current = false;
    heardRef.current.delete(itemId);
    const waits = REWRITTEN_SCRIPTS.test(text);
    // Hindi waits (as "listening") until the backend has written it in Roman letters
    if (!waits) updateBubble(itemId, "user", () => ({ text, live: false }));
    try {
      const saved = await callPost<{ flagged?: boolean; say?: string; blocked?: boolean; text?: string; lang?: Lang; finished?: boolean }>("turn", { role: "user", text });
      if (saved.lang) rememberChat("", saved.lang);
      if (saved.finished) sayGoodbye();
      if (saved.flagged) onAbuse(saved, itemId);
      else if (waits) updateBubble(itemId, "user", () => ({ text: saved.text || text, live: false }));
    } catch {
      // the conversation carries on even if this line isn't saved
      if (waits) updateBubble(itemId, "user", () => ({ text, live: false }));
    }
  };

  // The assistant's words: saved, and shown once they are in the chat's script (Hindi in Roman letters)
  const assistantSaid = async (itemId: string, text: string, greeting: boolean) => {
    const waits = REWRITTEN_SCRIPTS.test(text);
    if (!waits) updateBubble(itemId, "bot", () => ({ text, live: false }));
    else rewritingRef.current.add(itemId);
    let shown = text;
    try {
      const saved = await callPost<{ text?: string }>("turn", { role: "assistant", text, greeting });
      shown = saved.text || text;
    } catch {
      // shown as it was said
    }
    if (waits) {
      rewritingRef.current.delete(itemId);
      updateBubble(itemId, "bot", () => ({ text: shown, live: false }));
    }
  };

  // The visitor would rather type: the assistant writes so in their language, then the call ends and the chat carries on
  const goToTyping = async (callId: string | undefined, alreadySpoke: boolean) => {
    const call = callRef.current;
    if (!call) return;
    const output = { type: "conversation.item.create", item: { type: "function_call_output", call_id: callId, output: "{\"ok\":true}" } };
    // A sentence heard in two parts can ask twice: one reply is enough
    if (goingToTypingRef.current) {
      call.send(output);
      return;
    }
    goingToTypingRef.current = true;
    endedByHandRef.current = true; // opening the chat again doesn't call them back
    lastActivityRef.current = Date.now();
    // It has stopped listening
    call.setMuted(true);
    call.send({ type: "session.update", session: { type: "realtime", audio: { input: { turn_detection: null } } } });
    void callPost("tool", { name: "continue_typing", args: {} }).catch(() => {});
    call.send(output);
    // Their words decide the language of the reply, and can still be on their way
    for (let waited = 0; awaitingWordsRef.current && waited < 15; waited++) await sleep(100);
    if (callRef.current !== call) return;
    typingAckRef.current = true;
    // Their name is asked later, once they ask something
    const next = "asking how you can help";
    const line = alreadySpoke ? `You have already told them they can type. Now write only one short warm sentence ${next}.` : `Write one short warm sentence telling them to type here in the chat and ${next}.`;
    call.send({ type: "response.create", response: { instructions: withVoiceStyle(`You are DH Assist, a warm young woman answering a call for Design House India Private Limited, so use feminine verbs for yourself. The visitor wants to type instead of talk. Their last words were: "${lastVisitorWordsRef.current.slice(0, 200)}". Reply in the same language as those words. Hindi written in Urdu letters is spoken Hindi: reply in Hindi. Write Hindi in Devanagari. ${line} Write nothing else.`), tool_choice: "none", output_modalities: ["text"] } });
  };

  // The assistant decided to do these things: the backend does them, and the results go back to it
  const runCallTools = async (requested: NonNullable<NonNullable<CallEvent["response"]>["output"]>, spoke: boolean) => {
    // Overheard talk (people near the visitor): no reply, and it is taken out of the chat and of the conversation
    const overheard = requested.filter((item) => item.name === "not_for_me");
    if (overheard.length) {
      unansweredRef.current.forEach((itemId) => {
        dropBubble(itemId);
        callRef.current?.send({ type: "conversation.item.delete", item_id: itemId });
      });
      unansweredRef.current = [];
      overheard.forEach((item) => item.id && callRef.current?.send({ type: "conversation.item.delete", item_id: item.id }));
    }
    requested = requested.filter((item) => item.name !== "not_for_me");
    if (!requested.length) return;
    const toTyping = requested.find((item) => item.name === "continue_typing");
    if (toTyping) {
      void goToTyping(toTyping.call_id, spoke);
      return;
    }
    let replyAfterwards = false;
    for (const { name, call_id: callId, arguments: rawArgs } of requested) {
      const reportsName = (name === "update_visitor" || name === "submit_enquiry") && /"name"\s*:\s*"[^"]+"/.test(rawArgs || "");
      // The backend checks a name against what was said, and those words can still be on their way
      if (reportsName) for (let waited = 0; awaitingWordsRef.current && waited < 15; waited++) await sleep(100);
      let done: ToolDone;
      try {
        done = await callPost<ToolDone>("tool", { name, args: JSON.parse(rawArgs || "{}") });
      } catch {
        done = { output: { problem: "That didn't work just now. Don't guess: say you'll have the team help them." } };
      }
      if (reportsName && !(done.output as { nameRejected?: boolean })?.nameRejected) {
        nameDone();
        // The reply that follows thanks them by name and answers their earlier question, in their language
        callRef.current?.send({ type: "conversation.item.create", item: { type: "message", role: "system", content: [{ type: "input_text", text: `The visitor just gave their name (if it was "Visitor", they didn't want to). Thank them by name, then answer what they had asked before. If they only chose to talk and asked nothing, simply ask how you can help, without remarking on it. Their last words were: "${lastVisitorWordsRef.current.slice(0, 200)}". Reply in the language of those words, never in English unless they are in English.${/^[\x00-\x7F]*$/.test(lastVisitorWordsRef.current) && !/\b(mera|naam|hai|hoon|aap|main|ji)\b/i.test(lastVisitorWordsRef.current) ? " Those words are in English: reply in English, even if the name is Indian." : ""} Hindi written in Urdu letters is spoken Hindi: reply in Hindi, in Devanagari.` }] } });
      }
      if (done.files?.length || done.link) setMessages((prev) => [...prev, { id: ++idRef.current, from: "bot", text: "", files: done.files, link: done.link }]);
      if (done.flagged) setMessages((prev) => prev.filter((m, i) => !(i === prev.length - 1 && m.from === "user")));
      if (done.blocked) setBlocked(true);
      // Blocked: the call ends as soon as that's said. A goodbye: the chat ends a little later.
      if (done.end) {
        if (done.blocked) endAfterSpeechRef.current = true;
        else closeAfterSpeechRef.current = true;
      }
      callRef.current?.send({ type: "conversation.item.create", item: { type: "function_call_output", call_id: callId, output: JSON.stringify(done.output) } });
      if (name !== "end_conversation") replyAfterwards = true;
    }
    if (replyAfterwards) callRef.current?.send({ type: "response.create", response: replyHow() });
    // A call never just goes dead: if the assistant hung up without saying goodbye, it says it now
    else if (endAfterSpeechRef.current && !spoke) sayInstead(COPY[langRef.current].goodbye);
    else if (closeAfterSpeechRef.current && !spoke) sayGoodbye();
    else if (endAfterSpeechRef.current && !speakingRef.current) endCallRef.current();
    else if (closeAfterSpeechRef.current && !speakingRef.current) startClosing();
  };

  const onCallEvent = (event: CallEvent) => {
    switch (event.type) {
      case "conversation.item.added": {
        // A bubble straight away, so the chat stays in the order things were said. Typed messages have one already.
        const { item } = event;
        if (item?.type !== "message" || item.content?.some((part) => part.type === "input_text")) break;
        if (item.role === "user") {
          unansweredRef.current.push(item.id);
          updateBubble(item.id, "user", () => ({}));
        } else if (item.role === "assistant") {
          unansweredRef.current = [];
          updateBubble(item.id, "bot", () => ({}));
        }
        break;
      }
      case "input_audio_buffer.committed":
        awaitingWordsRef.current = true;
        typedTurnRef.current = false;
        if (goingToTypingRef.current) break;
        // Something was said and the name isn't known: ask for the reply that asks for it (the call won't reply by itself)
        if (!nameKnownRef.current) {
          if (!choosingRef.current) nameAsksRef.current += 1; // answering "talk or type?" isn't a try at the name
          if (nameAsksRef.current > MAX_NAME_ASKS) {
            nameDone();
            callRef.current?.send({ type: "response.create" });
          } else callRef.current?.send({ type: "response.create", response: { instructions: withVoiceStyle(NAME_STEP) } });
        }
        break;
      case "input_audio_buffer.speech_started":
        lastActivityRef.current = Date.now();
        visitorSpeakingRef.current = true;
        speechStartedAtRef.current = Date.now();
        break;
      case "input_audio_buffer.speech_stopped":
        visitorSpeakingRef.current = false;
        lastSpeechMsRef.current = Date.now() - speechStartedAtRef.current;
        if (closingModeRef.current) startClosing();
        break;
      case "conversation.item.input_audio_transcription.delta": {
        if (!event.item_id) break;
        const heard = (heardRef.current.get(event.item_id) || "") + (event.delta || "");
        heardRef.current.set(event.item_id, heard);
        if (!REWRITTEN_SCRIPTS.test(heard) && !FOREIGN_LETTERS.test(heard)) updateBubble(event.item_id, "user", () => ({ text: heard }));
        break;
      }
      case "conversation.item.input_audio_transcription.completed": {
        lastActivityRef.current = Date.now();
        awaitingWordsRef.current = false;
        const text = (event.transcript || "").trim();
        if (!event.item_id) break;
        if (text && misheard(text, event.logprobs)) {
          ignoreMisheard(event.item_id);
          break;
        }
        if (text) {
          lastVisitorWordsRef.current = text;
          void visitorSaid(event.item_id, text);
        } else dropBubble(event.item_id);
        break;
      }
      case "conversation.item.input_audio_transcription.failed":
        awaitingWordsRef.current = false;
        if (event.item_id) {
          heardRef.current.delete(event.item_id);
          dropBubble(event.item_id);
        }
        break;
      case "response.output_audio_transcript.delta":
        // Kept back: the bubble shows "typing" until the whole reply is there
        if (event.item_id) {
          botTextRef.current.set(event.item_id, (botTextRef.current.get(event.item_id) || "") + (event.delta || ""));
          updateBubble(event.item_id, "bot", () => ({}));
        }
        break;
      case "response.output_audio_transcript.done": {
        // Told to "say exactly" a line, the model sometimes writes its quotes too
        const text = (event.transcript || "").trim().replace(/^["“”']+|["“”']+$/g, "").trim();
        if (!event.item_id) break;
        botTextRef.current.delete(event.item_id);
        const greeting = greetingNextRef.current;
        greetingNextRef.current = false;
        if (text && !greeting && botSaysGoodbye(text)) {
          goodbyeSaidRef.current = true;
          closeAfterSpeechRef.current = true;
        }
        if (text) void assistantSaid(event.item_id, text, greeting);
        else updateBubble(event.item_id, "bot", () => ({ live: false }));
        break;
      }
      // A written reply: the visitor typed
      case "response.output_text.done": {
        const text = (event.text || "").trim();
        if (botSaysGoodbye(text)) {
          goodbyeSaidRef.current = true;
          closeAfterSpeechRef.current = true;
        }
        if (event.item_id && text) void assistantSaid(event.item_id, text, false);
        break;
      }
      case "response.done": {
        const handedOver = typingAckRef.current;
        // A reply cut short (the visitor spoke over it) shows what was said of it; one with nothing said goes
        const unfinished = new Map(botTextRef.current);
        botTextRef.current.clear();
        unfinished.forEach((said, key) => {
          if (said.trim()) void assistantSaid(key, said.trim(), false);
        });
        // A bubble still waiting for its words stays; one with nothing said goes
        setMessages((prev) => prev.filter((m) => !(m.from === "bot" && m.key && !m.text && !unfinished.get(m.key)?.trim() && !rewritingRef.current.has(m.key))));
        const output = event.response?.output || [];
        const requested = output.filter((item) => item.type === "function_call");
        if (event.response?.status === "completed" && requested.length) void runCallTools(requested, output.some((item) => item.type === "message"));
        if (handedOver) endCallRef.current();
        else if ((closeAfterSpeechRef.current || closingModeRef.current) && !speakingRef.current) startClosing(); // nothing being spoken: a written reply
        break;
      }
      case "output_audio_buffer.started":
        assistantTalking(true);
        break;
      case "output_audio_buffer.stopped":
      case "output_audio_buffer.cleared":
        assistantTalking(false);
        if (endAfterSpeechRef.current) endCallRef.current();
        if (closeAfterSpeechRef.current || closingModeRef.current) startClosing();
        break;
      case "error":
        console.warn("[chat] call:", event.error?.code, event.error?.message);
        if (typingAckRef.current) endCallRef.current();
        break;
      default:
        break;
    }
  };

  const endCall = (note?: string) => {
    callCleanupRef.current?.();
    callCleanupRef.current = null;
    choosingRef.current = false;
    goingToTypingRef.current = false;
    awaitingWordsRef.current = false;
    typingAckRef.current = false;
    typedTurnRef.current = false;
    closeAfterSpeechRef.current = false;
    closingAtRef.current = null;
    closingModeRef.current = false;
    goodbyeSaidRef.current = false;
    visitorSpeakingRef.current = false;
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

  // Opened from the robot, the welcome asks "talk or type?"; from the mic button they have already chosen to talk
  const startCall = async (askTalkOrType = false) => {
    if (callRef.current || openingCallRef.current) return;
    const copy = () => COPY[langRef.current];
    openingCallRef.current = true;
    endedByHandRef.current = false;
    closingAtRef.current = null;
    closingModeRef.current = false;
    setChatEnded(false);
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
            lang: "en",
            pageUrl: window.location.pathname,
            noise: noiseOnRef.current,
          });
          start = res.data.data as CallStart;
          if (start.blocked) throw new DOMException("Blocked", "Blocked");
          if (start.agent) throw new DOMException("The team has this chat", "Team");
          if (start.unavailable) throw new DOMException("No calls right now", "Unavailable");
          rememberChat(start.sessionId, start.lang);
          syncTeam(start);
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
      }, { noiseCancel: noiseOnRef.current });
    } catch (error) {
      openingCallRef.current = false;
      setCallState("off");
      const name = (error as DOMException).name;
      if (name === "Blocked") setBlocked(true);
      else if (name === "Team") setTeam(true); // no note: the visitor just carries on typing to the team
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
    const { greeting, choiceGreeting, maxSeconds, knowsName, voiceStyle, goodbye } = start as CallStart;
    voiceStyleRef.current = voiceStyle || "";
    if (goodbye?.en) goodbyeRef.current = goodbye;
    nameKnownRef.current = Boolean(knowsName);
    nameAsksRef.current = 0;
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
      if (closeAfterSpeechRef.current && !speakingRef.current && Date.now() - lastActivityRef.current > END_AFTER_GOODBYE_MS) startClosing();
    }, 2000);
    callCleanupRef.current = () => {
      clearInterval(tick);
      clearInterval(goodbyeGuard);
    };

    greetingNextRef.current = true;
    choosingRef.current = askTalkOrType && Boolean(choiceGreeting);
    call.send({ type: "response.create", response: { instructions: withVoiceStyle(`Greet the visitor now, warmly and naturally, in your natural Indian English accent, by saying exactly this: "${choosingRef.current ? choiceGreeting : greeting}"`), tool_choice: "none" } });
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

  // Noise cancellation: the browser's noise filter and a stricter gate (chatCall.ts), and OpenAI's own filter set to
  // keep only the voice close to the mic. Works during a call too.
  const toggleNoise = () => {
    const next = !noiseOnRef.current;
    noiseOnRef.current = next;
    setNoiseOn(next);
    localStorage.setItem(NOISE_KEY, next ? "1" : "0");
    const call = callRef.current;
    if (!call) return;
    call.setNoiseCancel(next);
    call.send({ type: "session.update", session: { type: "realtime", audio: { input: { noise_reduction: { type: next ? "near_field" : "far_field" } } } } });
  };

  // The goodbye was a little while ago: the chat ends, and can be resumed the same way it was going
  const finishChat = () => {
    resumeByVoiceRef.current = Boolean(callRef.current);
    endedByHandRef.current = true;
    stopSpeaking();
    endCall();
    closingAtRef.current = null;
    setChatEnded(true);
  };

  const resumeChat = () => {
    unlockVoice(); // this runs inside the click, so replies that arrive later can play
    audio();
    setChatEnded(false);
    if (resumeByVoiceRef.current && canTalk) void startCall();
    else void startChat();
  };

  const open = () => {
    unlockVoice(); // this runs inside the click, so replies that arrive later can play
    audio();
    setIsOpen(true);
    setIsMinimized(false);
    activeRef.current = true; // the welcome below is read out before the next render
    if (chatEnded) return; // it stays ended until the visitor resumes it
    if (canTalk && !endedByHandRef.current && !teamLiveRef.current) void startCall(true);
    else void startChat();
  };

  useEffect(() => {
    openRef.current = open;
    finishChatRef.current = finishChat;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const at = closingAtRef.current;
      if (!at || Date.now() < at) return;
      // Still writing, or someone is still speaking: not yet
      if (inputRef.current?.value.trim() || speakingRef.current || visitorSpeakingRef.current) closingAtRef.current = Date.now() + 500;
      else finishChatRef.current();
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const openedAtOnceRef = useRef(false);
  useEffect(() => {
    if (!openAtOnce || openedAtOnceRef.current) return;
    openedAtOnceRef.current = true;
    open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAtOnce]);

  /* ── A typed message ── */

  // During a call it goes into the same conversation, and the assistant answers in writing; the mic stays open
  const typeInCall = async (text: string) => {
    choosingRef.current = false;
    typedTurnRef.current = true;
    let finished = false;
    const bubbleId = isAbusive(text) ? null : userSay(text);
    try {
      const saved = await callPost<{ flagged?: boolean; say?: string; blocked?: boolean; lang?: Lang; finished?: boolean }>("turn", { role: "user", text });
      finished = Boolean(saved.finished);
      if (saved.lang) rememberChat("", saved.lang);
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
    if (finished) {
      lastVisitorWordsRef.current = text;
      goodbyeSaidRef.current = false;
      sayGoodbye();
      return;
    }
    // Typed during a call, the name still comes first
    if (!nameKnownRef.current && nameAsksRef.current < MAX_NAME_ASKS) {
      nameAsksRef.current += 1;
      call.send({ type: "response.create", response: { instructions: withVoiceStyle(NAME_STEP), ...replyHow() } });
    } else {
      nameDone();
      call.send({ type: "response.create", response: replyHow() });
    }
  };

  const sendToAssistant = async (text: string) => {
    // An abusive message is never shown in the chat; the backend counts it as a strike
    const bubbleId = isAbusive(text) ? null : userSay(text);
    await queueRef.current; // let a reply still being read out finish its queue first
    // With the team on the chat a person replies, whenever they do: no "typing..." from the assistant
    if (!teamLiveRef.current) setIsTyping(true);
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
      if (data.end || data.replies.some((line) => botSaysGoodbye(line.text))) closingModeRef.current = true;
    } catch (error) {
      setIsTyping(false);
      const tooMany = (error as { response?: { status?: number } })?.response?.status === 429;
      await botSay([{ text: tooMany ? (error as Error).message : COPY[langRef.current].offline }]);
    }
    if (closingModeRef.current) startClosing();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || blocked || (isTyping && !callRef.current)) return;
    setInput("");
    closingAtRef.current = null; // the count restarts after the reply to this
    // Typing in answer to "talk or type?" is the answer: the call ends and this goes to the typed chat
    // So is typing while the call is already handing over to typing
    if (callRef.current && (goingToTypingRef.current || (choosingRef.current && !WANTS_TO_TALK.test(text)))) {
      endedByHandRef.current = true;
      endCall();
      void callPostsRef.current.then(() => sendToAssistant(text)); // after what the call is still saving
      return;
    }
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
  const seen = (index: number) => messages.slice(index + 1).some((m) => m.from !== "user");

  // Show the avatar only on the first of consecutive bot messages
  const showAvatar = (index: number) => messages[index].from !== "user" && (messages[index - 1]?.from !== messages[index].from || !!messages[index - 1]?.event);

  const placeholder = blocked ? t.blockedPlaceholder : teamLive ? t.teamPlaceholder : callState === "connecting" ? t.connecting : inCall ? (micMuted ? t.muted : speaking ? t.interruptHint : t.listening) : t.placeholder;

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
                <p className="truncate text-[16px] font-bold leading-tight text-white">{teamLive ? t.teamTitle : t.title}</p>
                <p className={`truncate text-[11px] ${(isTyping && !inCall) || teamLive ? "font-semibold text-[#86efac]" : "text-white/80"}`}>
                  {teamLive ? t.teamSubtitle : isTyping && !inCall ? t.typing : t.subtitle}
                </p>
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
                      m.event ? (
                        // The team joined or left the chat
                        <div key={m.id} className="dh-msg-in flex justify-center py-1">
                          <span className="flex items-center gap-1.5 rounded-full bg-[#fff1e6] px-3 py-1 text-center text-[11.5px] font-semibold text-[#b84a08] shadow-[0_1px_3px_rgba(10,30,74,0.08)] ring-1 ring-[#fd6e15]/25">
                            <Headset className="h-3.5 w-3.5 shrink-0" />
                            {m.event === "joined" ? t.teamJoined : t.teamLeft}
                          </span>
                        </div>
                      ) : m.from === "agent" ? (
                        // A message from someone on the team
                        <div key={m.id} className="dh-msg-in flex items-start gap-2">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#fd7a26] to-[#e85a05] text-white shadow-sm ${showAvatar(i) ? "" : "invisible"}`}>
                            <Headset className="h-[18px] w-[18px]" />
                          </span>
                          <div className="min-w-0 max-w-[82%]">
                            {showAvatar(i) && <p className="mb-0.5 pl-1 text-[10.5px] font-bold text-[#e85a05]">{t.teamName}</p>}
                            <div className={`rounded-[16px] border border-[#fd6e15]/25 bg-[#fff6ef] px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-[#1f2d44] shadow-[0_1px_3px_rgba(10,30,74,0.10)] ${showAvatar(i) ? "rounded-tl-[4px]" : ""}`}>
                              {m.files?.map((file) =>
                                isPhoto(file) ? (
                                  <a key={file.href} href={fileUrl(file.href)} target="_blank" rel="noopener noreferrer" className="mb-2 block overflow-hidden rounded-xl last:mb-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={fileUrl(file.href)} alt={file.label} className="max-h-[220px] w-full object-cover" />
                                  </a>
                                ) : (
                                  <a
                                    key={file.href}
                                    href={fileUrl(file.href)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="mb-2 flex items-center gap-2 rounded-xl border border-[#fd6e15]/40 bg-white px-3 py-2 text-[12.5px] font-semibold text-[#b84a08] transition last:mb-0 hover:bg-[#ffecdf]"
                                  >
                                    <Download className="h-4 w-4 shrink-0" />
                                    <span className="min-w-0 break-words">{file.label}</span>
                                  </a>
                                )
                              )}
                              {m.text && <p className="whitespace-pre-line">{m.text}</p>}
                            </div>
                            {m.at && <p className="mt-1 pl-1 text-[10px] text-[#8a97ad]">{timeOf(m.at)}</p>}
                          </div>
                        </div>
                      ) : m.from === "bot" ? (
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
                                  href={fileUrl(file.href)}
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
                {chatEnded && (
                  <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#e3e9f3] bg-white px-4 py-3">
                    <span className="text-[13px] font-semibold text-[#0A2B5E]">{t.chatEnded}</span>
                    <button type="button" onClick={resumeChat} className="shrink-0 cursor-pointer rounded-full bg-[#134698] px-4 py-2 text-[12.5px] font-semibold text-white transition hover:bg-[#0f3a80]">
                      {t.resume}
                    </button>
                  </div>
                )}
                <form onSubmit={onSubmit} className={`relative shrink-0 border-t border-[#e3e9f3] bg-white px-3.5 pt-2 pb-1.5 ${chatEnded ? "hidden" : ""}`}>
                  {/* Noise cancellation for calls: on by default */}
                  {canTalk && (
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] font-semibold text-[#0A2B5E]" title={noiseOn ? t.noiseOnHint : t.noiseOffHint}>
                        <AudioLines className={`h-3.5 w-3.5 shrink-0 ${noiseOn ? "text-[#fd6e15]" : "text-[#8a97ad]"}`} />
                        <span className="truncate">{t.noise}</span>
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={noiseOn}
                        aria-label={t.noise}
                        title={noiseOn ? t.noiseOnHint : t.noiseOffHint}
                        onClick={toggleNoise}
                        className={`relative flex h-[22px] w-[52px] shrink-0 items-center rounded-full px-1 text-[9px] font-bold transition cursor-pointer ${noiseOn ? "bg-[#fd6e15] text-white" : "bg-slate-200 text-slate-500"}`}
                      >
                        <span className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-all ${noiseOn ? "left-[33px]" : "left-[3px]"}`} />
                        <span className={noiseOn ? "pl-0.5" : "ml-auto pr-0.5"}>{noiseOn ? "ON" : "OFF"}</span>
                      </button>
                    </div>
                  )}
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
                        {canTalk && !teamLive && (
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
                    <span>{teamLive ? t.teamFooter : t.footer}</span>
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
