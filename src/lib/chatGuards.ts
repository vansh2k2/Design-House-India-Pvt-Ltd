/* Input checks for the website chat (components/ui/Chatbot.tsx): reading a name out of what the
   visitor types, and blocking abusive language (English, Hindi and Hinglish). */

/* ───────────────────────── Abusive language ───────────────────────── */

// Common character swaps used to dodge filters: "f@ck", "sh1t", "b!tch", "a$$"
const LEET: Record<string, string> = { "@": "a", "4": "a", "0": "o", "1": "i", "!": "i", "3": "e", "$": "s", "5": "s", "7": "t" };

// Lower-case, undo the swaps and squeeze repeated letters ("fuuuuck" → "fuck", "asshole" → "ashole").
// The word lists below go through the same squeeze, so both sides compare the same way.
const squeeze = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFC")
    .replace(/[@4013!$57]/g, (c) => LEET[c] ?? c)
    .replace(/(\p{L})\1+/gu, "$1");

// Whole words only, so ordinary words and names that merely contain them stay allowed
// ("class", "Dickson", "Gandhi", "Kamini", "Scunthorpe").
const EXACT_WORDS = [
  // English
  "ass", "dick", "dik", "shit", "shitty", "bullshit", "fck", "wtf", "stfu", "idiot", "stupid", "dumbass", "jackass",
  "porn", "nude", "nudes", "boobs", "pussy", "cock", "twat", "prick",
  // Hinglish
  "harami", "haramzada", "haramzadi", "kamina", "kamine", "kameena", "kameene", "kutta", "kutte", "kuttiya", "suar", "suwar",
  "gand", "gaand", "gandu", "gaandu", "lund", "lauda", "laude", "lavda", "lavde", "lawda", "lawde", "lodu", "randi",
  "randiya", "randwa", "chodu", "chut", "chinal", "bsdk", "bkl", "mkc", "mkb", "tharki",
  // Hindi
  "गांड", "गाँड", "गांडू", "लंड", "लौड़ा", "लोड़ा", "रंडी", "हरामी", "हरामज़ादा", "कमीना", "कमीने", "कुत्ता", "कुत्ते", "कुतिया",
  "सुअर", "चूत", "छिनाल", "ठरकी",
].map(squeeze);

// Word beginnings that are always abusive ("fucking", "bitches", "chutiyapa", "bhosdike")
const WORD_STARTS = [
  "fuck", "fuk", "motherf", "bitch", "bastard", "asshole", "cunt", "slut", "whore", "dickhead", "retard", "nigg",
  "chutiy", "chutia", "chootiy", "madarch", "maderch", "madarj", "behench", "bhench", "benchod", "bhosd", "bhosad",
  "jhaatu", "jhantu", "haramkh",
  "चूतिय", "चुतिय", "मादरच", "बहनच", "बहेनच", "भेनच", "भोसड", "भोसड़", "हरामख", "भड़व", "भडव", "चोद",
].map(squeeze);

const EXACT_SET = new Set(EXACT_WORDS);

// Letters, marks (Hindi vowel signs) and "*" (as in "f*ck"); everything else separates words
const tokensOf = (text: string) => squeeze(text).split(/[^\p{L}\p{M}*]+/u).filter(Boolean);

const isBadWord = (token: string) => {
  if (token.includes("*")) {
    // "f*ck", "sh*t": "*" stands for one hidden letter
    const pattern = new RegExp(`^${token.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".?")}$`, "u");
    return EXACT_WORDS.some((w) => pattern.test(w)) || WORD_STARTS.some((w) => pattern.test(w));
  }
  return EXACT_SET.has(token) || WORD_STARTS.some((start) => token.startsWith(start));
};

/** True if the text contains an abusive word, also when spelled "f u c k", "f.u.c.k" or "f*ck". */
export function isAbusive(text: string): boolean {
  const tokens = tokensOf(text);
  if (tokens.some(isBadWord)) return true;

  // Letters typed one by one ("f u c k"): join each run of single letters and check it as a word
  let run = "";
  for (const token of [...tokens, ""]) {
    if ([...token].length === 1) {
      run += token;
      continue;
    }
    if (run.length >= 3 && isBadWord(run)) return true;
    run = "";
  }
  return false;
}

/* ───────────────────────── Names ───────────────────────── */

// Replies that are not a name: greetings, yes/no, fillers, placeholders
const NOT_A_NAME = new Set(
  [
    "hi", "hii", "hello", "helo", "hlo", "hey", "heya", "hola", "yo", "sup", "namaste", "namaskar", "namaskaram", "pranam",
    "ram ram", "jai shri krishna", "good morning", "good afternoon", "good evening", "good night", "gm", "gn",
    "ok", "okay", "okk", "k", "yes", "yeah", "yep", "no", "nope", "nah", "haan", "han", "ha", "nahi", "nhi", "na", "hmm",
    "thanks", "thank you", "thanku", "ty", "bye", "welcome", "sorry", "please", "pls", "help", "start", "chat",
    "test", "testing", "demo", "abc", "xyz", "asdf", "qwerty", "name", "my name", "your name", "nothing", "none", "null",
    "undefined", "anonymous", "unknown", "guest", "user", "admin", "bot", "robot", "sir", "madam", "mam", "maam", "bro",
    "dude", "boss", "friend", "customer", "client", "me", "you", "i", "who", "what", "why", "how", "where", "when",
    "नमस्ते", "नमस्कार", "प्रणाम", "हाँ", "हां", "नहीं", "ठीक है", "धन्यवाद", "नाम", "कुछ नहीं",
  ].map((w) => w.toLowerCase()),
);

// Filler words: a reply made only of these ("my name is", "this is", "mera naam") has no name in it
const FILLER = new Set(["is", "am", "are", "the", "a", "an", "this", "that", "it", "its", "my", "name", "naam", "nam", "hai", "hu", "hoon", "here", "mera", "meri", "main", "mai", "है", "मेरा", "नाम", "मैं"]);

// Words that make it a question or a request, not a name ("price kya hai", "office design")
const NOT_IN_NAMES = /\b(what|how|why|where|when|price|cost|quote|service|services|design|interior|office|retail|need|want|please|help|kya|kaise|kitna|chahiye)\b/i;

const GREETING_ONLY = /^(hi+|hey+|hel+o+|hlo|hola|yo|namaste|namaskar|pranam|good\s+(morning|afternoon|evening|night)|नमस्ते|नमस्कार|प्रणाम)$/i;

export type NameCheck = { ok: true; name: string } | { ok: false; reason: "greeting" | "invalid" | "abusive" };

/**
 * Reads the visitor's name out of a reply: "Charu", "my name is Charu Saraswat", "I'm Charu",
 * "hi, this is Charu", "mera naam Charu hai", "मेरा नाम चारु है" → "Charu" / "Charu Saraswat" / "चारु".
 * Greetings ("hi", "hello"), fillers ("ok", "test"), questions, numbers and keyboard mashing are refused.
 */
export function readName(raw: string): NameCheck {
  if (isAbusive(raw)) return { ok: false, reason: "abusive" };

  const plain = raw.normalize("NFC").replace(/\s+/g, " ").trim().replace(/[!?.,;:।]+$/u, "").trim();
  if (GREETING_ONLY.test(plain)) return { ok: false, reason: "greeting" };

  const name = plain
    // leading greeting: "hi, I'm Charu"
    .replace(/^(hi+|hey+|hel+o+|hlo|namaste|namaskar|नमस्ते|नमस्कार)[\s,!.]+/iu, "")
    // "my name is", "I am", "this is", "mera naam", "मेरा नाम" …
    .replace(
      /^(my\s+name\s+is|my\s+name's|my\s+name|myself|i\s+am|i'm|im|this\s+is|it's|its|name\s*(is)?\s*[:-]?|mera\s+naam|mera\s+nam|mai|main|मेरा\s+नाम|मैं)\s+/iu,
      "",
    )
    // trailing "hai", "here", "है", "हूँ"
    .replace(/\s+(hai|hain|hu|hoon|hun|here|है|हूँ|हूं)$/iu, "")
    .replace(/[!?.,;:।]+$/u, "")
    .trim();

  if (!name || NOT_A_NAME.has(name.toLowerCase()) || NOT_IN_NAMES.test(name)) return { ok: false, reason: "invalid" };
  // Letters (any script, incl. Hindi vowel signs), spaces, dots, apostrophes and hyphens only: no digits or symbols
  if (!/^\p{L}[\p{L}\p{M}.' -]*$/u.test(name)) return { ok: false, reason: "invalid" };

  const words = name.split(" ").filter(Boolean);
  if (words.every((w) => FILLER.has(w.toLowerCase()))) return { ok: false, reason: "invalid" };
  const letters = name.replace(/[^\p{L}\p{M}]/gu, "");
  if (words.length > 4 || letters.length < 2 || name.length > 40) return { ok: false, reason: "invalid" };

  for (const word of words) {
    const latin = /^[a-z.'-]+$/i.test(word);
    // "aaaa", "hiiii", "zzz"
    if (/(\p{L})\1{2,}/u.test(word)) return { ok: false, reason: "invalid" };
    // Latin words of 3+ letters need a vowel: refuses "xyz", "bcdfg", "qwrt"
    if (latin && word.replace(/[^a-z]/gi, "").length >= 3 && !/[aeiouy]/i.test(word)) return { ok: false, reason: "invalid" };
    if (NOT_A_NAME.has(word.toLowerCase()) && words.length === 1) return { ok: false, reason: "invalid" };
  }

  // "charu saraswat" → "Charu Saraswat" (scripts without capitals are left as they are)
  const pretty = words.map((w) => w.charAt(0).toLocaleUpperCase() + w.slice(1)).join(" ");
  return { ok: true, name: pretty };
}
