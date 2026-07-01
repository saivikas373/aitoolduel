"use client";

import { useState } from "react";

interface AnalysisResult {
  score: number;
  pseudoPerplexity: number;
  burstiness: number;
  vocabularyDiversity: number;
  aiPhraseFingerprints: number;
  sentenceUniformity: number;
  passiveVoice: number;
  ngramRepetition: number;
  formatPattern: number;
  foundPhrases: string[];
}

// ── AI Bigrams (Signal 1) ─────────────────────────────────────────────
const AI_BIGRAMS = [
  "it is", "this is", "there are", "in order", "it's important",
  "plays a crucial", "one of the", "in terms of", "as well as",
  "due to the", "in addition", "on the other hand", "such as",
  "in conclusion", "it can be", "we can see", "it should be",
  "in this", "of the most", "is a great", "is very important",
];

// ── AI Phrase Fingerprints (Signal 4) ─────────────────────────────────
const TIER1_PHRASES = [
  "it is worth noting", "it's worth noting", "in today's fast-paced",
  "in today's world", "it is important to note", "it's important to note",
  "as an ai language model", "i cannot and will not", "delve into",
  "tapestry of", "testament to", "it goes without saying", "needless to say",
  "in the realm of", "at the end of the day", "in terms of",
  "with that being said", "having said that", "on a final note",
  "to summarize", "in summary", "in conclusion", "overall,",
  "importantly,", "notably,", "it is crucial", "it's crucial",
  "plays a vital role", "plays a crucial role", "is a great way",
  "serves as a reminder",
  "bottom line", "here's the", "here is the",
  "what you should", "what not to",
  "the bottom line", "in short",
  "let me be clear", "the truth is", "the reality is",
  "simply put", "long story short",
];

const TIER2_PHRASES = [
  "furthermore", "moreover", "additionally", "consequently",
  "nevertheless", "nonetheless", "in addition to", "it should be noted",
  "one must consider", "it is essential", "as previously mentioned",
  "as mentioned above", "this is because", "due to the fact",
  "in order to", "for the purpose of", "with respect to", "with regard to",
];

// ── Helpers ───────────────────────────────────────────────────────────
function getSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).filter(Boolean).length >= 3);
}

function getSentenceLengths(sentences: string[]): number[] {
  return sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
}

function stdDev(arr: number[]): number {
  if (arr.length < 2) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

// ── The 8-Signal Algorithm ────────────────────────────────────────────
function analyzeText(text: string): AnalysisResult {
  const lowerText = text.toLowerCase();
  const words = lowerText.match(/\b[a-z]+\b/g) || [];
  const sentences = getSentences(text);
  const sentenceLengths = getSentenceLengths(sentences);
  const totalSentences = Math.max(sentences.length, 1);

  // ── Signal 1: Pseudo-Perplexity (bigram match rate) ──────────────
  let bigramMatches = 0;
  let totalBigrams = Math.max(words.length - 1, 1);
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = words[i] + " " + words[i + 1];
    if (AI_BIGRAMS.includes(bigram)) bigramMatches++;
  }
  const matchRate = bigramMatches / totalBigrams;
  const pseudoPerplexity = Math.min(100, Math.round(matchRate * 100 * 8)); // scale up

  // ── Signal 2: Burstiness (CV of sentence lengths) ────────────────
  let burstiness = 50;
  if (sentenceLengths.length > 1) {
    const mean = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const cv = mean > 0 ? stdDev(sentenceLengths) / mean : 0;
    // Low CV = AI = high burstiness score (AI signal)
    const cvScore = Math.round(Math.max(0, Math.min(100, (0.5 - cv) / 0.5 * 100)));
    // Short sentence ratio: >40% under 8 words = AI (bullet-point/punchy style)
    const shortSentences = sentenceLengths.filter((l) => l < 8).length;
    const shortSentenceRatio = shortSentences / sentenceLengths.length;
    const shortBoost = shortSentenceRatio > 0.4 ? Math.round(shortSentenceRatio * 100) : 0;
    burstiness = Math.min(100, cvScore + shortBoost);
  }

  // ── Signal 3: Vocabulary Diversity (Type-Token Ratio) ────────────
  const totalWords = Math.max(words.length, 1);
  const ttr = new Set(words).size / totalWords;
  // Higher TTR = more human. Score here = AI signal = invert.
  const vocabularyDiversity = Math.round(Math.max(0, Math.min(100, (0.6 - ttr) / 0.6 * 100)));

  // ── Signal 4: AI Phrase Fingerprints ─────────────────────────────
  const foundPhrases: string[] = [];
  let tier1Count = 0;
  let tier2Count = 0;

  for (const phrase of TIER1_PHRASES) {
    if (lowerText.includes(phrase.toLowerCase())) {
      foundPhrases.push(phrase);
      tier1Count++;
    }
  }
  for (const phrase of TIER2_PHRASES) {
    if (lowerText.includes(phrase.toLowerCase())) {
      foundPhrases.push(phrase);
      tier2Count++;
    }
  }

  const rawPhraseScore = tier1Count * 3 + tier2Count * 1.5;
  const aiPhraseFingerprints = Math.round(Math.min(100, rawPhraseScore / 0.5));

  // ── Signal 5: Sentence Uniformity (duplicate first words) ─────────
  const firstWords = sentences.map((s) => s.trim().split(/\s+/)[0]?.toLowerCase() || "");
  const firstWordCounts: Record<string, number> = {};
  for (const w of firstWords) firstWordCounts[w] = (firstWordCounts[w] || 0) + 1;
  const duplicateStarters = firstWords.filter((w) => firstWordCounts[w] > 1).length;
  const sentenceUniformity = Math.round(Math.min(100, (duplicateStarters / totalSentences) * 100));

  // ── Signal 6: Passive Voice & Nominalization ──────────────────────
  const passivePattern = /\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi;
  const passiveMatches = (text.match(passivePattern) || []).length;
  const nominalizationPattern = /\w+(tion|ment|ance|ence|ity|ness)\b/gi;
  const nominalizationMatches = (text.match(nominalizationPattern) || []).length;
  const nominalizationRate = nominalizationMatches / totalWords;
  const passiveVoice = Math.round(
    Math.min(100, (passiveMatches / totalSentences) * 50 + nominalizationRate * 30)
  );

  // ── Signal 7: N-gram Repetition (trigrams) ────────────────────────
  const trigrams: string[] = [];
  for (let i = 0; i < words.length - 2; i++) {
    trigrams.push(words[i] + " " + words[i + 1] + " " + words[i + 2]);
  }
  const trigramCounts: Record<string, number> = {};
  for (const tg of trigrams) trigramCounts[tg] = (trigramCounts[tg] || 0) + 1;
  const repeatedTrigrams = Object.values(trigramCounts).filter((c) => c > 1).length;
  const totalTrigrams = Math.max(trigrams.length, 1);
  const ngramRepetition = Math.round(Math.min(100, (repeatedTrigrams / totalTrigrams) * 500));

  // ── Signal 8: Format Pattern Detection ───────────────────────────
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  let formatPatternCount = 0;
  for (const line of lines) {
    // Detect emoji via surrogate pairs (covers most emoji ranges without /u flag)
    if (/[\uD83C-\uDBFF][\uDC00-\uDFFF]/.test(line) || /[\u2600-\u27BF]/.test(line)) formatPatternCount++;
    if (/^[A-Z][^.!?]*$/.test(line) && line.split(" ").length <= 6) formatPatternCount++;
    if (/^[-•*]\s/.test(line)) formatPatternCount++;
  }
  const formatPattern = Math.min(100, formatPatternCount * 20);

  // ── Final Weighted Score ──────────────────────────────────────────
  const rawScore =
    pseudoPerplexity     * 0.20 +
    burstiness           * 0.15 +
    vocabularyDiversity  * 0.10 +
    aiPhraseFingerprints * 0.25 +
    sentenceUniformity   * 0.10 +
    passiveVoice         * 0.05 +
    ngramRepetition      * 0.05 +
    formatPattern        * 0.10;

  const score = Math.round(Math.min(100, Math.max(0, rawScore)));

  return {
    score,
    pseudoPerplexity,
    burstiness,
    vocabularyDiversity,
    aiPhraseFingerprints,
    sentenceUniformity,
    passiveVoice,
    ngramRepetition,
    formatPattern,
    foundPhrases,
  };
}

// ── Utility ───────────────────────────────────────────────────────────
function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

// ── Sub-components ────────────────────────────────────────────────────
function ScoreCircle({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = "#22c55e"; // green ≤30
  if (score > 55) color = "#f97316"; // orange >55
  else if (score > 30) color = "#eab308"; // yellow 31-55

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke={color} strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        <text x="70" y="70" textAnchor="middle" dominantBaseline="central"
          fontSize="28" fontWeight="bold" fill={color}>{score}</text>
        <text x="70" y="92" textAnchor="middle" fontSize="11" fill="#cbd5e1">AI Score</text>
      </svg>
    </div>
  );
}

function SignalBar({ label, value, isAiSignal }: { label: string; value: number; isAiSignal: boolean }) {
  let barColor = "bg-green-400";
  if (value > 55) barColor = "bg-orange-500";
  else if (value > 30) barColor = "bg-yellow-400";

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className="text-slate-400">{value}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div className={`${barColor} h-2 rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
      <div className="text-xs text-slate-500 mt-0.5">
        {isAiSignal ? "Higher = more AI-like" : "Higher = more human-like"}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────
export default function AiDetector() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const wordCount = countWords(text);
  const hasEnoughWords = wordCount >= 50;

  const handleAnalyze = async () => {
    if (!hasEnoughWords || isAnalyzing) return;
    setIsAnalyzing(true);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setResult(analyzeText(text));
    setIsAnalyzing(false);
  };

  const getVerdict = (score: number) => {
    if (score <= 30) return { text: "✅ Likely Human Written", className: "text-emerald-400" };
    if (score <= 55) return { text: "⚠️ Uncertain", className: "text-amber-400" };
    return { text: "🤖 Likely AI Generated", className: "text-orange-400" };
  };

  const getVerdictDescription = (score: number) => {
    if (score <= 30) return "This text shows strong human writing patterns — varied sentence structure, rich vocabulary, natural phrasing, and minimal AI clichés.";
    if (score <= 55) return "This text shows mixed signals. Some patterns suggest AI generation, but there are also human-like characteristics present.";
    return "This text shows strong AI writing patterns — predictable word choices, uniform sentence structure, AI phrase fingerprints, and repetitive vocabulary.";
  };

  return (
    <div>
      {/* Input Form */}
      <div className="card p-6 mb-6">
        <label htmlFor="ai-detector-textarea" className="block text-sm font-semibold text-slate-300 mb-2">
          Paste your text below
        </label>
        <textarea
          id="ai-detector-textarea"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to check if it was written by AI or a human..."
          className="glass-input w-full p-4 text-sm resize-y"
        />
        <div className="flex items-center justify-between mt-2 mb-4">
          <span className="text-sm text-slate-400">{wordCount} words</span>
          {!hasEnoughWords && wordCount > 0 && (
            <span className="text-sm text-amber-400 font-medium">Minimum 50 words required</span>
          )}
        </div>
        <button
          onClick={handleAnalyze}
          disabled={!hasEnoughWords || isAnalyzing}
          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white text-sm transition-colors ${
            hasEnoughWords && !isAnalyzing ? "bg-orange-500 hover:bg-orange-600" : "bg-white/10 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isAnalyzing ? "Analyzing..." : "Detect AI Content"}
        </button>
      </div>

      {/* AdSense placeholder */}
      <div className="adsense-slot min-h-[90px]" />

      {/* Results */}
      {result && (
        <div className="card p-6">
          {/* Score + Verdict */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <ScoreCircle score={result.score} />
            <div>
              <div className={`text-3xl font-extrabold mb-1 ${getVerdict(result.score).className}`}>
                {getVerdict(result.score).text}
              </div>
              <p className="text-slate-400 text-sm max-w-xs">{getVerdictDescription(result.score)}</p>
            </div>
          </div>

          {/* Signal Bars — 8 signals */}
          <div className="mb-6">
            <h3 className="font-bold text-white mb-4">Signal Breakdown</h3>
            <SignalBar label="Predictability (Pseudo-Perplexity)" value={result.pseudoPerplexity} isAiSignal={true} />
            <SignalBar label="Sentence Burstiness" value={result.burstiness} isAiSignal={true} />
            <SignalBar label="Vocabulary Diversity" value={100 - result.vocabularyDiversity} isAiSignal={false} />
            <SignalBar label="AI Phrase Fingerprints" value={result.aiPhraseFingerprints} isAiSignal={true} />
            <SignalBar label="Sentence Uniformity" value={result.sentenceUniformity} isAiSignal={true} />
            <SignalBar label="Passive Voice & Structure" value={result.passiveVoice} isAiSignal={true} />
            <SignalBar label="Phrase Repetition (N-gram)" value={result.ngramRepetition} isAiSignal={true} />
            <SignalBar label="Format Pattern Detection" value={result.formatPattern} isAiSignal={true} />
          </div>

          {/* Highlighted Phrases */}
          {result.foundPhrases.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-white mb-3">AI Phrases Found:</h3>
              <div className="flex flex-wrap gap-2">
                {result.foundPhrases.map((phrase) => (
                  <span key={phrase} className="bg-orange-500/15 text-orange-300 border border-orange-400/20 text-sm font-medium px-3 py-1 rounded-full">
                    &ldquo;{phrase}&rdquo;
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="text-xs text-slate-400 bg-white/5 rounded-xl p-4 border border-white/10">
            ⚠️ Best accuracy on formal writing (essays, blog posts, reports). Casual AI responses may score lower. No detector is 100% accurate — use results as a guide, not final verdict.
          </div>

          {/* AdSense placeholder */}
          <div className="adsense-slot min-h-[90px] mt-6" />
        </div>
      )}
    </div>
  );
}
