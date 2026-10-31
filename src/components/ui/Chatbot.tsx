"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Bell, BellOff, Mic, Minus, Send, Square, Volume2, VolumeX, X } from "lucide-react";

import { api } from "@/lib/api";
import { isAbusive, readName } from "@/lib/chatGuards";
import { prepareVoices, speak, stopSpeaking } from "@/lib/chatVoice";

// Animated robot on the chat launcher. The Lottie player is large, so it loads in its own chunk,
// after the page (the launcher itself only appears once the page is idle, see Providers).
const DotLottieReact = dynamic(() => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact), {
  ssr: false,
});
const ROBOT_ANIMATION = "https://lottie.host/8f0cd7c3-56f7-4c1e-af2c-677790d041f8/RaDToGLLNh.lottie";

/* ───────────────────────── Content (English / Hindi) ───────────────────────── */

type Lang = "en" | "hi";
type L = Record<Lang, string>;

// Chat steps: ask the name, answer questions, then (free consultation) collect contact details
type Step = "name" | "chat" | "phone" | "email" | "service" | "requirement" | "sending" | "done";

interface Faq {
  id: string;
  chip?: L; // shown as a quick question; keyword-only answers have none
  answer: L;
  link?: { href: string; label: L };
  keywords: string[];
}

const FAQS: Faq[] = [
  {
    id: "services",
    chip: { en: "What services do you offer?", hi: "आप कौन-सी सेवाएँ देते हैं?" },
    answer: {
      en: "We design and build complete commercial and residential spaces:\n• Corporate Interiors\n• Retail Showrooms\n• Restaurant & Hospitality Interiors\n• Exhibition Stalls\n• Retail Kiosks\n• Signage & Branding\n• Display Fixtures\n• Residential Interiors\nFrom design to manufacturing and on-site execution, all under one roof.",
      hi: "हम कमर्शियल और रेज़िडेंशियल स्पेस का पूरा डिज़ाइन और निर्माण करते हैं:\n• कॉर्पोरेट इंटीरियर\n• रिटेल शोरूम\n• रेस्टोरेंट और हॉस्पिटैलिटी इंटीरियर\n• एग्ज़िबिशन स्टॉल\n• रिटेल कियोस्क\n• साइनेज और ब्रांडिंग\n• डिस्प्ले फिक्स्चर\n• रेज़िडेंशियल इंटीरियर\nडिज़ाइन से लेकर मैन्युफैक्चरिंग और साइट पर काम तक, सब एक ही जगह।",
    },
    link: { href: "/services", label: { en: "View all services", hi: "सभी सेवाएँ देखें" } },
    keywords: ["service", "offer", "what do you do", "सेवा", "काम"],
  },
  {
    id: "corporate",
    chip: { en: "Corporate office interiors", hi: "कॉर्पोरेट ऑफिस इंटीरियर" },
    answer: {
      en: "We create productive, brand-led workplaces:\n• Space planning & modular workstations\n• Executive cabins & conference rooms\n• Reception, pantry & collaboration zones\n• Turnkey execution with our own manufacturing",
      hi: "हम ब्रांड के हिसाब से प्रोडक्टिव ऑफिस बनाते हैं:\n• स्पेस प्लानिंग और मॉड्यूलर वर्कस्टेशन\n• एग्ज़ीक्यूटिव केबिन और कॉन्फ़्रेंस रूम\n• रिसेप्शन, पैंट्री और मीटिंग ज़ोन\n• अपनी मैन्युफैक्चरिंग के साथ टर्नकी काम",
    },
    link: { href: "/services/corporate-interiors", label: { en: "Corporate Interiors", hi: "कॉर्पोरेट इंटीरियर देखें" } },
    keywords: ["corporate", "office", "workstation", "cabin", "ऑफिस", "दफ्तर"],
  },
  {
    id: "retail",
    chip: { en: "Retail showroom design", hi: "रिटेल शोरूम डिज़ाइन" },
    answer: {
      en: "Retail is our core strength. We build stores for brands across India:\n• Store layout & customer flow\n• Custom display fixtures & lighting\n• Shop-in-shop and mall stores\n• Roll-outs across multiple cities",
      hi: "रिटेल हमारी सबसे बड़ी ताकत है। हम पूरे भारत में ब्रांड्स के लिए स्टोर बनाते हैं:\n• स्टोर लेआउट और ग्राहकों का फ्लो\n• कस्टम डिस्प्ले फिक्स्चर और लाइटिंग\n• शॉप-इन-शॉप और मॉल स्टोर\n• कई शहरों में एक साथ रोल-आउट",
    },
    link: { href: "/services/retail-showrooms", label: { en: "Retail Showrooms", hi: "रिटेल शोरूम देखें" } },
    keywords: ["retail", "showroom", "store", "shop", "mall", "kiosk", "शोरूम", "दुकान", "स्टोर"],
  },
  {
    id: "exhibition",
    chip: { en: "Exhibition stall design", hi: "एग्ज़िबिशन स्टॉल डिज़ाइन" },
    answer: {
      en: "We design, fabricate and install exhibition stalls:\n• 3D stall concepts for your brand\n• In-house fabrication\n• On-site installation and dismantling\n• Trade fairs, expos and product launches",
      hi: "हम एग्ज़िबिशन स्टॉल का डिज़ाइन, निर्माण और इंस्टॉलेशन करते हैं:\n• आपके ब्रांड के लिए 3D स्टॉल कॉन्सेप्ट\n• अपनी फैक्ट्री में निर्माण\n• साइट पर इंस्टॉलेशन और हटाना\n• ट्रेड फेयर, एक्सपो और प्रोडक्ट लॉन्च",
    },
    link: { href: "/services/exhibition-stalls", label: { en: "Exhibition Stalls", hi: "एग्ज़िबिशन स्टॉल देखें" } },
    keywords: ["exhibition", "stall", "expo", "booth", "event", "प्रदर्शनी", "स्टॉल"],
  },
  {
    id: "timeline",
    chip: { en: "How long does a project take?", hi: "प्रोजेक्ट में कितना समय लगता है?" },
    answer: {
      en: "It depends on the size and scope. As a rough guide:\n• Exhibition stall: a few weeks\n• Retail store: about 1–2 months\n• Office fit-out: about 2–4 months\nAfter a site visit we share a detailed schedule for your project.",
      hi: "यह प्रोजेक्ट के साइज़ और काम पर निर्भर करता है। मोटे तौर पर:\n• एग्ज़िबिशन स्टॉल: कुछ हफ़्ते\n• रिटेल स्टोर: लगभग 1–2 महीने\n• ऑफिस फिट-आउट: लगभग 2–4 महीने\nसाइट विज़िट के बाद हम आपके प्रोजेक्ट का पूरा शेड्यूल देते हैं।",
    },
    keywords: ["how long", "time", "timeline", "duration", "days", "weeks", "समय", "कितने दिन"],
  },
  {
    id: "panindia",
    chip: { en: "Do you work across India?", hi: "क्या आप पूरे भारत में काम करते हैं?" },
    answer: {
      en: "Yes! We work pan-India: Delhi NCR, Mumbai, Pune, Bengaluru, Chennai, Hyderabad, Kolkata, Ahmedabad, Jaipur, Lucknow and many more cities. 5000+ projects delivered over 21+ years.",
      hi: "जी हाँ! हम पूरे भारत में काम करते हैं: दिल्ली NCR, मुंबई, पुणे, बेंगलुरु, चेन्नई, हैदराबाद, कोलकाता, अहमदाबाद, जयपुर, लखनऊ और कई शहर। 21+ सालों में 5000+ प्रोजेक्ट पूरे किए हैं।",
    },
    keywords: ["india", "city", "cities", "location", "where", "mumbai", "delhi", "bangalore", "शहर", "भारत", "कहाँ"],
  },
  {
    id: "profile",
    chip: { en: "Download company profile", hi: "कंपनी प्रोफ़ाइल डाउनलोड करें" },
    answer: {
      en: "You can download our company profile, e-brochures and newsletters from the Downloads page.",
      hi: "आप हमारी कंपनी प्रोफ़ाइल, ई-ब्रोशर और न्यूज़लेटर Downloads पेज से डाउनलोड कर सकते हैं।",
    },
    link: { href: "/downloads", label: { en: "Open Downloads", hi: "Downloads खोलें" } },
    keywords: ["profile", "brochure", "catalogue", "catalog", "download", "pdf", "ब्रोशर", "प्रोफ़ाइल"],
  },
  {
    id: "contact",
    chip: { en: "Contact & office address", hi: "संपर्क और ऑफिस का पता" },
    answer: {
      en: "📞 +91 93106 08427 / +91 98102 47319\n✉️ info@designhouse.co.in\n📍 Corporate Office: Plot No. 12/29, Site-II Industrial Area, Loni Road, Mohan Nagar, Ghaziabad, UP – 201007",
      hi: "📞 +91 93106 08427 / +91 98102 47319\n✉️ info@designhouse.co.in\n📍 कॉर्पोरेट ऑफिस: Plot No. 12/29, Site-II Industrial Area, Loni Road, Mohan Nagar, Ghaziabad, UP – 201007",
    },
    link: { href: "/contact", label: { en: "Contact page", hi: "संपर्क पेज" } },
    keywords: ["contact", "phone", "call", "number", "email", "address", "office", "visit", "संपर्क", "पता", "फोन", "नंबर"],
  },
  {
    id: "pricing",
    answer: {
      en: "Costs depend on the area, design and materials, so we quote after understanding your requirement. Book a free consultation and our expert will share an estimate.",
      hi: "खर्च एरिया, डिज़ाइन और मटेरियल पर निर्भर करता है, इसलिए हम आपकी ज़रूरत समझकर कोटेशन देते हैं। फ्री कंसल्टेशन बुक करें, हमारे एक्सपर्ट अनुमान बताएँगे।",
    },
    keywords: ["price", "cost", "quote", "quotation", "budget", "rate", "charges", "कीमत", "खर्च", "बजट", "रेट"],
  },
  {
    id: "residential",
    answer: {
      en: "Yes, we also do residential interiors: modular kitchens, wardrobes, living and bedroom design, with furniture made in our own factory.",
      hi: "जी हाँ, हम घर के इंटीरियर भी करते हैं: मॉड्यूलर किचन, वॉर्डरोब, लिविंग और बेडरूम डिज़ाइन, फर्नीचर हमारी अपनी फैक्ट्री में बनता है।",
    },
    link: { href: "/services/residential-interiors", label: { en: "Residential Interiors", hi: "रेज़िडेंशियल इंटीरियर देखें" } },
    keywords: ["home", "house", "residential", "kitchen", "wardrobe", "bedroom", "flat", "apartment", "घर", "किचन"],
  },
];

// Sent to the enquiry as the chosen service
const SERVICES: L[] = [
  { en: "Corporate Interiors", hi: "कॉर्पोरेट इंटीरियर" },
  { en: "Retail Showrooms", hi: "रिटेल शोरूम" },
  { en: "Restaurant Interiors", hi: "रेस्टोरेंट इंटीरियर" },
  { en: "Exhibition Stalls", hi: "एग्ज़िबिशन स्टॉल" },
  { en: "Retail Kiosks", hi: "रिटेल कियोस्क" },
  { en: "Signage & Branding", hi: "साइनेज और ब्रांडिंग" },
  { en: "Residential Interiors", hi: "रेज़िडेंशियल इंटीरियर" },
  { en: "Other", hi: "अन्य" },
];

const COPY = {
  en: {
    title: "DH Assist",
    subtitle: "Design House Assistant",
    greetTitle: "Namaste! 🙏",
    greet: "I'm DH Assist, your interior design assistant from Design House.",
    askName: "May I know your name?",
    greetBack: "Hello! 😊 Before we begin, may I know your name?",
    badName: "Hmm, that doesn't look like a name 🙂 Please type your name, for example: Rahul Sharma.",
    abuse: "Please keep the conversation respectful 🙏 I'm here to help with your interior design questions.",
    abuseLocked: "The chat is paused for a minute because of offensive language.",
    abuseHint: "Please avoid offensive words.",
    lockedPlaceholder: "Chat paused for a minute...",
    niceToMeet: (name: string) => `Nice to meet you, ${name}! 😊 What would you like to know?`,
    anythingElse: "Anything else I can help you with?",
    welcomeBack: (name: string) => `Hello again, ${name}! 😊 What would you like to know?`,
    youreWelcome: "You're welcome! 😊 Anything else I can help you with?",
    goodbye: "Thank you for chatting with Design House! Have a great day 👋",
    // A question the bot has no answer for: collect contact details and pass it to the team
    unknown: "Good question! 🤔 I don't have the answer to that right now, but our team will find out for you. Please share your 10-digit mobile number so we can contact you.",
    questionThanks: "We've noted your question. Our team will contact you soon with the answer.",
    consult: "📅 Book a free consultation",
    askPhone: "Great! Please share your 10-digit mobile number so our design expert can call you.",
    badPhone: "That doesn't look like a valid 10-digit mobile number. Please try again.",
    askEmail: "Thanks! What's your email address?",
    badEmail: "Please enter a valid email address (e.g. name@company.com).",
    askService: "Which service are you interested in?",
    askRequirement: "Briefly tell us about your project: location, area and timeline.",
    shortRequirement: "Please add a few more details (at least 10 characters).",
    thanksTitle: (name: string) => `Thank you, ${name}! ✅`,
    thanks: "Your enquiry has been registered. Our design expert will contact you shortly.",
    submitFail: "Sorry, I couldn't send your details right now. Please call +91 93106 08427 or email info@designhouse.co.in.",
    tryAgain: "Try again",
    placeholder: {
      name: "Type your name...",
      chat: "Type your question...",
      phone: "10-digit mobile number",
      email: "you@example.com",
      service: "Choose a service above, or type it",
      requirement: "Describe your project...",
      sending: "Sending...",
      done: "Type your question...",
    } as Record<Step, string>,
    footer: "Automated assistant • Contact details used only for follow-up",
    online: "Online",
    soundOn: "Notification sound on",
    soundOff: "Notification sound off",
    voiceOn: "Voice replies on",
    voiceOff: "Voice replies off",
    stopVoice: "Stop voice",
    micStart: "Ask by voice",
    micStop: "Stop listening",
    listening: "Listening... speak now",
    micDenied: "Microphone access is blocked. Allow it in your browser settings to ask by voice.",
    micNoSpeech: "I didn't hear anything. Tap the mic and try again.",
  },
  hi: {
    title: "DH Assist",
    subtitle: "Design House असिस्टेंट",
    greetTitle: "नमस्ते! 🙏",
    greet: "मैं DH Assist हूँ, Design House का इंटीरियर डिज़ाइन असिस्टेंट।",
    askName: "क्या मैं आपका नाम जान सकता हूँ?",
    greetBack: "नमस्ते! 😊 शुरू करने से पहले, क्या मैं आपका नाम जान सकता हूँ?",
    badName: "यह नाम जैसा नहीं लग रहा 🙂 कृपया अपना नाम लिखें, जैसे: राहुल शर्मा।",
    abuse: "कृपया सम्मानजनक भाषा का प्रयोग करें 🙏 मैं आपके इंटीरियर डिज़ाइन से जुड़े सवालों में मदद के लिए हूँ।",
    abuseLocked: "अपमानजनक भाषा के कारण चैट एक मिनट के लिए रोकी गई है।",
    abuseHint: "कृपया अपमानजनक शब्दों का प्रयोग न करें।",
    lockedPlaceholder: "चैट एक मिनट के लिए रुकी है...",
    niceToMeet: (name: string) => `आपसे मिलकर खुशी हुई, ${name}! 😊 आप क्या जानना चाहेंगे?`,
    anythingElse: "क्या मैं किसी और चीज़ में मदद कर सकता हूँ?",
    welcomeBack: (name: string) => `फिर से नमस्ते, ${name}! 😊 आप क्या जानना चाहेंगे?`,
    youreWelcome: "आपका स्वागत है! 😊 क्या मैं किसी और चीज़ में मदद कर सकता हूँ?",
    goodbye: "Design House से बात करने के लिए धन्यवाद! आपका दिन शुभ हो 👋",
    unknown: "अच्छा सवाल है! 🤔 अभी मेरे पास इसका जवाब नहीं है, लेकिन हमारी टीम आपको बताएगी। कृपया अपना 10 अंकों का मोबाइल नंबर दें, ताकि हम आपसे संपर्क कर सकें।",
    questionThanks: "हमने आपका सवाल नोट कर लिया है। हमारी टीम जल्द ही जवाब के साथ आपसे संपर्क करेगी।",
    consult: "📅 फ्री कंसल्टेशन बुक करें",
    askPhone: "बढ़िया! कृपया अपना 10 अंकों का मोबाइल नंबर बताएँ, ताकि हमारे डिज़ाइन एक्सपर्ट आपको कॉल कर सकें।",
    badPhone: "यह सही 10 अंकों का मोबाइल नंबर नहीं लग रहा। कृपया दोबारा लिखें।",
    askEmail: "धन्यवाद! आपका ईमेल पता क्या है?",
    badEmail: "कृपया सही ईमेल पता लिखें (जैसे name@company.com)।",
    askService: "आप किस सेवा में रुचि रखते हैं?",
    askRequirement: "अपने प्रोजेक्ट के बारे में थोड़ा बताएँ: जगह, एरिया और समय-सीमा।",
    shortRequirement: "कृपया थोड़ी और जानकारी दें (कम से कम 10 अक्षर)।",
    thanksTitle: (name: string) => `धन्यवाद, ${name}! ✅`,
    thanks: "आपकी enquiry दर्ज हो गई है। हमारे डिज़ाइन एक्सपर्ट जल्द ही आपसे संपर्क करेंगे।",
    submitFail: "माफ़ कीजिए, अभी आपकी जानकारी नहीं भेजी जा सकी। कृपया +91 93106 08427 पर कॉल करें या info@designhouse.co.in पर ईमेल करें।",
    tryAgain: "दोबारा भेजें",
    placeholder: {
      name: "अपना नाम लिखें...",
      chat: "अपना सवाल लिखें...",
      phone: "10 अंकों का मोबाइल नंबर",
      email: "you@example.com",
      service: "ऊपर से सेवा चुनें या लिखें",
      requirement: "अपने प्रोजेक्ट के बारे में लिखें...",
      sending: "भेजा जा रहा है...",
      done: "अपना सवाल लिखें...",
    } as Record<Step, string>,
    footer: "ऑटोमेटेड असिस्टेंट • संपर्क जानकारी केवल फ़ॉलो-अप के लिए",
    online: "ऑनलाइन",
    soundOn: "नोटिफ़िकेशन साउंड चालू",
    soundOff: "नोटिफ़िकेशन साउंड बंद",
    voiceOn: "बोलकर जवाब चालू",
    voiceOff: "बोलकर जवाब बंद",
    stopVoice: "आवाज़ रोकें",
    micStart: "बोलकर पूछें",
    micStop: "सुनना बंद करें",
    listening: "सुन रहा हूँ... बोलिए",
    micDenied: "माइक्रोफ़ोन की अनुमति नहीं है। बोलकर पूछने के लिए ब्राउज़र सेटिंग में इसकी अनुमति दें।",
    micNoSpeech: "कुछ सुनाई नहीं दिया। माइक दबाकर दोबारा बोलें।",
  },
};

/* ───────────────────────── Messages ───────────────────────── */

type ChipAction = { kind: "faq"; id: string } | { kind: "consult" } | { kind: "service"; value: string } | { kind: "retry" };
interface Chip {
  label: string;
  action: ChipAction;
  primary?: boolean;
}
interface Message {
  id: number;
  from: "bot" | "user";
  title?: string;
  text: string;
  link?: { href: string; label: string };
  chips?: Chip[];
}
type BotLine = Omit<Message, "id" | "from">;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LOGO = "/logotransparent-sm.webp";
const CHAT_BG = "/assets/chatbot/bg.webp";

// English keywords match whole words (plural allowed), so "stall" doesn't fire on "install" or "store" on
// "storage"; Hindi keywords match anywhere (word boundaries don't work for Devanagari in JS regex)
const keywordMatchers = new Map(
  FAQS.flatMap((f) => f.keywords).map((k) => [
    k,
    /^[\x20-\x7e]+$/.test(k)
      ? new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(s|es)?\\b`, "i")
      : { test: (q: string) => q.includes(k) },
  ]),
);
// The answer with the most matching keywords ("office address" → contact, not corporate interiors)
const findFaq = (input: string) => {
  const q = input.toLowerCase();
  let best: Faq | undefined;
  let bestScore = 0;
  for (const faq of FAQS) {
    const score = faq.keywords.filter((k) => keywordMatchers.get(k)!.test(q)).length;
    if (score > bestScore) {
      best = faq;
      bestScore = score;
    }
  }
  return best;
};

// Small talk that isn't a question (so it doesn't start the "we'll contact you" flow)
const SMALL_TALK = {
  thanks: /^(thanks?|thank\s*you|thanku|ty|thx|dhanyavad|dhanyawad|shukriya|धन्यवाद|शुक्रिया)\b/i,
  bye: /^(bye|good\s*bye|see\s+you|tata|alvida|अलविदा)\b/i,
  greeting: /^(hi+|hey+|hel+o+|hlo|namaste|namaskar|नमस्ते|नमस्कार)[\s!.]*$/i,
  ack: /^(ok(ay)?|k+|hmm+|yes|yeah|yep|no|nope|fine|cool|great|nice|good|alright|haan|ha|nahi|theek( hai)?|thik( hai)?|हाँ|हां|नहीं|ठीक है)[\s!.]*$/i,
};

// An email said aloud: "charu dot s at gmail dot com" → "charu.s@gmail.com"
const fromSpokenEmail = (text: string) =>
  text.includes("@")
    ? text.replace(/\s+/g, "")
    : text
        .toLowerCase()
        .replace(/\s+(at the rate|at)\s+/g, "@")
        .replace(/\s+dot\s+/g, ".")
        .replace(/\s+underscore\s+/g, "_")
        .replace(/\s+/g, "");

/* Voice input: the browser's speech recognition (Chrome, Edge, Safari). Not in TypeScript's DOM types. */
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;
const getSpeechRecognition = (): SpeechRecognitionCtor | undefined => {
  const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
};

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
  // Abusive messages: after 3, the input is paused for a minute
  const [lockedUntil, setLockedUntil] = useState(0);
  const strikesRef = useRef(0);
  // Spoken replies (separate from the notification chime) and voice input
  const [voiceOn, setVoiceOn] = useState(() => localStorage.getItem("dh_chat_voice") !== "0");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [liveText, setLiveText] = useState(""); // words recognised so far, shown in the chat while speaking
  const latestRef = useRef("");
  const [canListen] = useState(() => Boolean(getSpeechRecognition()));
  const [voiceNote, setVoiceNote] = useState("");
  const voiceOnRef = useRef(voiceOn);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  // Why contact details are being collected: a free consultation, or a question the bot couldn't answer
  const purposeRef = useRef<"consult" | "question">("consult");
  const questionRef = useRef("");
  // Always the latest text handler, for the speech recognition callback
  const handleTextRef = useRef<(text: string) => void>(() => {});

  const t = COPY[lang];
  const locked = lockedUntil > 0;
  const inputIsAbusive = input.trim().length > 0 && isAbusive(input);
  const langRef = useRef<Lang>(lang);
  const mutedRef = useRef(muted);
  const idRef = useRef(0);
  const aliveRef = useRef(true);
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  const audioRef = useRef<AudioContext | null>(null);
  const lead = useRef({ name: "", phone: "", email: "", service: "", requirement: "" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  langRef.current = lang;
  mutedRef.current = muted;
  voiceOnRef.current = voiceOn;

  useEffect(() => {
    aliveRef.current = true;
    const forgetVoices = prepareVoices();
    return () => {
      aliveRef.current = false;
      forgetVoices();
      stopSpeaking();
      recognitionRef.current?.abort();
      void audioRef.current?.close();
    };
  }, []);

  // Speaking and listening only while the chat is on screen
  useEffect(() => {
    if (!isOpen || isMinimized) {
      stopSpeaking();
      recognitionRef.current?.abort();
    }
  }, [isOpen, isMinimized]);

  // Mic messages ("didn't hear anything") fade after a few seconds
  useEffect(() => {
    if (!voiceNote) return;
    const timer = setTimeout(() => setVoiceNote(""), 6000);
    return () => clearTimeout(timer);
  }, [voiceNote]);

  // Lift the one-minute pause
  useEffect(() => {
    if (!lockedUntil) return;
    const timer = setTimeout(() => {
      setLockedUntil(0);
      strikesRef.current = 0;
    }, Math.max(0, lockedUntil - Date.now()));
    return () => clearTimeout(timer);
  }, [lockedUntil]);

  // Keep the newest message in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, liveText, listening]);

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
  const botSay = (lines: BotLine[]) => {
    queueRef.current = queueRef.current.then(async () => {
      for (const line of lines) {
        if (!aliveRef.current) return;
        setIsTyping(true);
        await sleep(550 + Math.min(line.text.length * 9, 1100));
        if (!aliveRef.current) return;
        setIsTyping(false);
        // Only the newest message keeps its quick questions
        setMessages((prev) => [...prev.map((m) => (m.chips ? { ...m, chips: undefined } : m)), { id: ++idRef.current, from: "bot", ...line }]);
        playIncoming();
        // Read it out (unless voice replies are off or the mic is listening), and let the next
        // message wait until it has been spoken
        if (voiceOnRef.current && !recognitionRef.current) {
          await sleep(250);
          setSpeaking(true);
          await speak([line.title, line.text].filter(Boolean).join(". "), langRef.current);
          setSpeaking(false);
        }
        await sleep(280);
      }
    });
    return queueRef.current;
  };

  const userSay = (text: string) => {
    stopSpeaking(); // the visitor moved on: don't keep reading the old reply
    setMessages((prev) => [...prev.map((m) => (m.chips ? { ...m, chips: undefined } : m)), { id: ++idRef.current, from: "user", text }]);
    playSent();
  };

  // An abusive message is not shown or used; three in a row pause the chat for a minute
  const rejectAbuse = () => {
    const l = langRef.current;
    stopSpeaking();
    strikesRef.current += 1;
    if (strikesRef.current >= 3) {
      setLockedUntil(Date.now() + 60_000);
      return void botSay([{ text: COPY[l].abuseLocked }]);
    }
    botSay([{ text: COPY[l].abuse }]);
  };

  const topicChips = (exclude?: string): Chip[] => {
    const l = langRef.current;
    return [
      { label: COPY[l].consult, action: { kind: "consult" }, primary: true },
      ...FAQS.filter((f) => f.chip && f.id !== exclude).map((f) => ({ label: f.chip![l], action: { kind: "faq", id: f.id } as ChipAction })),
    ];
  };

  const serviceChips = (): Chip[] =>
    SERVICES.map((s) => ({ label: s[langRef.current], action: { kind: "service", value: s.en } }));

  const answerFaq = (faq: Faq) => {
    const l = langRef.current;
    botSay([
      { text: faq.answer[l], link: faq.link ? { href: faq.link.href, label: faq.link.label[l] } : undefined },
      { text: COPY[l].anythingElse, chips: topicChips(faq.id) },
    ]);
  };

  const startConsult = () => {
    purposeRef.current = "consult";
    setStep("phone");
    botSay([{ text: COPY[langRef.current].askPhone }]);
  };

  // A question the bot can't answer: take contact details (once) and pass the question to the team
  const askTeam = (question: string) => {
    purposeRef.current = "question";
    questionRef.current = question.slice(0, 1000);
    if (lead.current.phone && lead.current.email) return void submitLead();
    setStep("phone");
    botSay([{ text: COPY[langRef.current].unknown }]);
  };

  // Sends the consultation or the unanswered question to the backend (admin: Contact Us Messages)
  const submitLead = async () => {
    const l = langRef.current;
    const isQuestion = purposeRef.current === "question";
    const { name, phone, email, service, requirement } = lead.current;
    setStep("sending");
    try {
      await api.post("/api/contact-enquiry", {
        name,
        phone,
        email,
        service: isQuestion ? "General Enquiry" : service,
        message: isQuestion
          ? `Question asked in the website chat (not answered by the assistant):\n${questionRef.current}`
          : `${requirement}\n\n(Sent from the website chat assistant)`,
      });
      setStep("done");
      await botSay([
        { title: COPY[l].thanksTitle(name), text: isQuestion ? COPY[l].questionThanks : COPY[l].thanks },
        { text: COPY[l].anythingElse, chips: isQuestion ? topicChips() : topicChips().filter((c) => c.action.kind !== "consult") },
      ]);
    } catch {
      setStep(isQuestion ? "chat" : "requirement");
      await botSay([{ text: COPY[l].submitFail, chips: [{ label: COPY[l].tryAgain, action: { kind: "retry" }, primary: true }] }]);
    }
  };

  /* ── Opening the chat: greet once ── */
  const open = () => {
    playOpen(); // also unlocks audio for the replies that follow (this runs inside the click)
    setIsOpen(true);
    setIsMinimized(false);
    if (messages.length === 0 && !isTyping) {
      const l = langRef.current;
      botSay([{ title: COPY[l].greetTitle, text: COPY[l].greet }, { text: COPY[l].askName }]);
    }
  };

  /* ── Quick question chips ── */
  const onChip = (chip: Chip) => {
    if (isTyping || step === "sending") return;
    userSay(chip.label);
    const action = chip.action;
    if (action.kind === "consult") return startConsult();
    if (action.kind === "retry") return void submitLead();
    if (action.kind === "service") {
      lead.current.service = action.value;
      setStep("requirement");
      return void botSay([{ text: COPY[langRef.current].askRequirement }]);
    }
    const faq = FAQS.find((f) => f.id === action.id);
    if (faq) answerFaq(faq);
  };

  /* ── Typed or spoken messages, handled by the current step ── */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleText(input);
  };

  const handleText = (raw: string) => {
    const text = raw.trim();
    if (!text || isTyping || step === "sending" || locked) return;
    setInput("");
    const l = langRef.current;

    // Abusive language: not shown, not saved, not answered
    if (isAbusive(text)) return rejectAbuse();
    userSay(text);

    switch (step) {
      case "name": {
        const result = readName(text);
        if ("reason" in result) return void botSay([{ text: result.reason === "greeting" ? COPY[l].greetBack : COPY[l].badName }]);
        lead.current.name = result.name;
        setStep("chat");
        return void botSay([{ text: COPY[l].niceToMeet(result.name), chips: topicChips() }]);
      }
      case "phone": {
        let digits = text.replace(/\D/g, "");
        if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
        if (!/^[6-9]\d{9}$/.test(digits)) return void botSay([{ text: COPY[l].badPhone }]);
        lead.current.phone = digits;
        setStep("email");
        return void botSay([{ text: COPY[l].askEmail }]);
      }
      case "email": {
        const email = fromSpokenEmail(text).toLowerCase();
        if (!EMAIL_RE.test(email)) return void botSay([{ text: COPY[l].badEmail }]);
        lead.current.email = email;
        // An unanswered question needs nothing more; a consultation also asks service and details
        if (purposeRef.current === "question") return void submitLead();
        setStep("service");
        return void botSay([{ text: COPY[l].askService, chips: serviceChips() }]);
      }
      case "service": {
        lead.current.service = text.slice(0, 80);
        setStep("requirement");
        return void botSay([{ text: COPY[l].askRequirement }]);
      }
      case "requirement": {
        if (text.length < 10) return void botSay([{ text: COPY[l].shortRequirement }]);
        lead.current.requirement = text.slice(0, 1500);
        return void submitLead();
      }
      default: {
        const faq = findFaq(text);
        if (faq) return answerFaq(faq);
        if (SMALL_TALK.thanks.test(text)) return void botSay([{ text: COPY[l].youreWelcome, chips: topicChips() }]);
        if (SMALL_TALK.bye.test(text)) return void botSay([{ text: COPY[l].goodbye }]);
        if (SMALL_TALK.greeting.test(text)) return void botSay([{ text: COPY[l].welcomeBack(lead.current.name), chips: topicChips() }]);
        if (SMALL_TALK.ack.test(text)) return void botSay([{ text: COPY[l].anythingElse, chips: topicChips() }]);
        // Something the bot doesn't know: the team will answer
        return askTeam(text);
      }
    }
  };
  handleTextRef.current = handleText;

  /* ── Voice input (speech to text) ── */
  const startListening = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition || recognitionRef.current) return;
    stopSpeaking(); // don't let the mic hear the bot
    const recognition = new Recognition();
    recognition.lang = langRef.current === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    let heard = "";
    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) heard += result[0].transcript;
        else interim += result[0].transcript;
      }
      latestRef.current = `${heard}${interim}`;
      setLiveText(latestRef.current.trim()); // the words appear in the chat as they are recognised
    };
    recognition.onerror = (event) => {
      const l = langRef.current;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") setVoiceNote(COPY[l].micDenied);
      else if (event.error === "no-speech") setVoiceNote(COPY[l].micNoSpeech);
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      // Send what was said, like pressing Send (also words not yet final when the mic was stopped)
      const said = latestRef.current.trim();
      setLiveText("");
      if (said) handleTextRef.current(said);
    };

    recognitionRef.current = recognition;
    latestRef.current = "";
    setLiveText("");
    setVoiceNote("");
    setInput("");
    setListening(true);
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
    }
  };
  const stopListeningToMic = () => recognitionRef.current?.stop();

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
          <DotLottieReact
            src={ROBOT_ANIMATION}
            loop
            autoplay
            className="h-[110px] w-[110px] sm:h-[130px] sm:w-[130px] transition-transform duration-300 group-hover:scale-105"
          />
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
                    {listening && (
                      <div className="dh-msg-in flex justify-end" aria-live="polite">
                        <p className="max-w-[80%] whitespace-pre-line rounded-[16px] rounded-tr-[6px] border border-dashed border-[#134698]/60 bg-white px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-[#0A2B5E] shadow-[0_2px_6px_rgba(10,43,94,0.12)]">
                          <Mic className="-mt-0.5 mr-1.5 inline h-3.5 w-3.5 animate-pulse text-red-500" />
                          {liveText || <span className="italic text-[#8a97ad]">{t.listening}</span>}
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
                    } ${locked ? "opacity-60" : ""}`}
                  >
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={locked ? t.lockedPlaceholder : listening ? t.listening : t.placeholder[step]}
                      disabled={step === "sending" || locked}
                      aria-invalid={inputIsAbusive}
                      inputMode={step === "phone" ? "tel" : step === "email" ? "email" : "text"}
                      maxLength={step === "requirement" ? 1500 : 200}
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
                    {/* Ask by voice (hidden where the browser can't do speech recognition, e.g. Firefox) */}
                    {canListen && (
                      <button
                        type="button"
                        onClick={listening ? stopListeningToMic : startListening}
                        disabled={step === "sending" || locked}
                        title={listening ? t.micStop : t.micStart}
                        aria-label={listening ? t.micStop : t.micStart}
                        aria-pressed={listening}
                        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition disabled:opacity-40 cursor-pointer ${
                          listening ? "bg-red-500 text-white" : "text-[#134698] hover:bg-[#eef3fb]"
                        }`}
                      >
                        {listening && <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-60" />}
                        {listening ? <Square className="relative h-3 w-3" fill="currentColor" /> : <Mic className="h-4 w-4" />}
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping || step === "sending" || locked || inputIsAbusive}
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
                    {/* Notification chime on/off (remembered in this browser); voice replies are in the header */}
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
