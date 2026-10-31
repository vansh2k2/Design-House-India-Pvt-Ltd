/* Spoken replies for the website chat (components/ui/Chatbot.tsx), using the browser's own
   text-to-speech (Web Speech API): no audio files, no external service. */

type Lang = "en" | "hi";

const supported = () => typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

let voices: SpeechSynthesisVoice[] = [];
const loadVoices = () => {
  voices = window.speechSynthesis.getVoices();
};

/** Starts loading the browser's voices (they arrive asynchronously in Chrome/Edge). */
export function prepareVoices(): () => void {
  if (!supported()) return () => {};
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
}

// Indian English first, then other English; Hindi for हिं. Natural/online voices sound best.
const pickVoice = (lang: Lang): SpeechSynthesisVoice | undefined => {
  const codes = lang === "hi" ? ["hi-in"] : ["en-in", "en-gb", "en-us"];
  for (const code of codes) {
    const matches = voices.filter((v) => v.lang.replace("_", "-").toLowerCase() === code);
    if (matches.length) {
      return (
        matches.find((v) => /natural|online/i.test(v.name) && /neerja|swara|heera|kalpana|female|aria|jenny|sonia/i.test(v.name)) ??
        matches.find((v) => /natural|online|google/i.test(v.name)) ??
        matches[0]
      );
    }
  }
  return voices.find((v) => v.lang.toLowerCase().startsWith(lang));
};

// What is written for the eye, rewritten for the ear
const forSpeech = (text: string, lang: Lang) =>
  text
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "") // emoji
    .replace(/\n\s*[•✓-]\s*/g, ", ") // list bullets
    .replace(/(\d)\s*[–-]\s*(\d)/g, lang === "hi" ? "$1 से $2" : "$1 to $2") // "1–2 months"
    .replace(/(\d)\+/g, lang === "hi" ? "$1 से ज़्यादा" : "$1 plus") // "5000+"
    .replace(/\s&\s/g, lang === "hi" ? " और " : " and ")
    .replace(/\n+/g, ". ")
    .replace(/([.!?।])\s*\.(\s|$)/g, "$1$2") // "Namaste! . I'm" (emoji removed) → "Namaste! I'm"
    .replace(/\s{2,}/g, " ")
    .trim();

/**
 * Reads `text` aloud and resolves when it has been spoken (or straight away if speech is
 * unavailable). Never rejects; a cut-off or failed utterance just resolves.
 */
export function speak(text: string, lang: Lang): Promise<void> {
  if (!supported()) return Promise.resolve();
  const spoken = forSpeech(text, lang);
  if (!spoken) return Promise.resolve();

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(spoken);
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang ?? (lang === "hi" ? "hi-IN" : "en-IN");
    utterance.rate = lang === "hi" ? 0.95 : 1;
    utterance.pitch = 1.05;

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      clearTimeout(guard);
      resolve();
    };
    utterance.onend = done;
    utterance.onerror = done;
    // Some browsers never fire "end" (or the voice is missing): don't hold the chat up
    const guard = setTimeout(done, Math.min(4000 + spoken.length * 90, 30000));

    window.speechSynthesis.speak(utterance);
  });
}

/** Stops anything being read out (closing the chat, the visitor sending a new message, muting). */
export function stopSpeaking() {
  if (supported()) window.speechSynthesis.cancel();
}
