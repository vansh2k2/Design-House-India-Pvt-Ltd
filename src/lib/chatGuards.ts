/* Input checks for the website chat (components/ui/Chatbot.tsx): blocking abusive
   language (English, Hindi and Hinglish). */

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
  "pagal", "ullu", "gadha", "gadhe", "bewakoof", "bewkoof", "kaminey", "bastord", "bastad",
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

// These squeeze into ordinary words ("saale" would become "sale"), so they are compared letter for letter
const UNSQUEEZED_WORDS = new Set(["saale", "saala", "saali"]);

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
  if (text.toLowerCase().split(/[^\p{L}]+/u).some((w) => UNSQUEEZED_WORDS.has(w))) return true;
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
