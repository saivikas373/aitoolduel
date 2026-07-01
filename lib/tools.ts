export type ToolCategory =
  | "Writing"
  | "Coding"
  | "Image"
  | "Search"
  | "Video"
  | "Audio"
  | "Productivity"
  | "Design";

export interface AiTool {
  slug: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  rating: number;
  url: string;
  ctaLabel: string;
  color: string; // tailwind bg color for logo placeholder
  comparisons: { href: string; label: string }[];
}

export const tools: AiTool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "OpenAI's flagship AI chatbot for writing, coding, and research.",
    category: "Writing",
    rating: 4.5,
    url: "https://chat.openai.com",
    ctaLabel: "Try ChatGPT Free",
    color: "bg-emerald-500",
    comparisons: [
      { href: "/compare/chatgpt-vs-claude", label: "vs Claude" },
      { href: "/compare/gemini-vs-chatgpt", label: "vs Gemini" },
      { href: "/compare/chatgpt-vs-google", label: "vs Google" },
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    tagline: "Anthropic's AI assistant — best-in-class writing and reasoning.",
    category: "Writing",
    rating: 4.7,
    url: "https://claude.ai",
    ctaLabel: "Try Claude Free",
    color: "bg-orange-500",
    comparisons: [
      { href: "/compare/chatgpt-vs-claude", label: "vs ChatGPT" },
      { href: "/compare/claude-vs-gemini", label: "vs Gemini" },
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    tagline: "Google's AI with native Workspace integration and real-time search.",
    category: "Writing",
    rating: 4.3,
    url: "https://gemini.google.com",
    ctaLabel: "Try Gemini Free",
    color: "bg-blue-500",
    comparisons: [
      { href: "/compare/gemini-vs-chatgpt", label: "vs ChatGPT" },
      { href: "/compare/claude-vs-gemini", label: "vs Claude" },
    ],
  },
  {
    slug: "cursor",
    name: "Cursor",
    tagline: "AI-first code editor with agent mode for multi-file development.",
    category: "Coding",
    rating: 4.7,
    url: "https://cursor.sh",
    ctaLabel: "Try Cursor Free",
    color: "bg-slate-700",
    comparisons: [
      { href: "/compare/cursor-vs-github-copilot", label: "vs Copilot" },
      { href: "/compare/github-copilot-vs-cursor", label: "Copilot vs Cursor" },
    ],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: "Microsoft's AI coding assistant for every major IDE.",
    category: "Coding",
    rating: 4.4,
    url: "https://github.com/features/copilot",
    ctaLabel: "Try Copilot",
    color: "bg-gray-800",
    comparisons: [
      { href: "/compare/github-copilot-vs-cursor", label: "vs Cursor" },
      { href: "/compare/cursor-vs-github-copilot", label: "Cursor vs Copilot" },
    ],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    tagline: "The gold standard for stunning AI-generated artwork and imagery.",
    category: "Image",
    rating: 4.8,
    url: "https://midjourney.com",
    ctaLabel: "Try Midjourney",
    color: "bg-purple-600",
    comparisons: [
      { href: "/compare/midjourney-vs-dalle", label: "vs DALL-E 3" },
    ],
  },
  {
    slug: "dalle",
    name: "DALL-E 3",
    tagline: "OpenAI's image generator with superior text rendering, built into ChatGPT.",
    category: "Image",
    rating: 4.2,
    url: "https://openai.com/dall-e-3",
    ctaLabel: "Try DALL-E 3",
    color: "bg-emerald-600",
    comparisons: [
      { href: "/compare/midjourney-vs-dalle", label: "vs Midjourney" },
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity AI",
    tagline: "AI search engine that answers questions with cited sources.",
    category: "Search",
    rating: 4.6,
    url: "https://perplexity.ai",
    ctaLabel: "Try Perplexity Free",
    color: "bg-teal-500",
    comparisons: [
      { href: "/compare/perplexity-vs-google", label: "vs Google" },
    ],
  },
  {
    slug: "jasper",
    name: "Jasper",
    tagline: "AI writing platform built for marketing teams and content at scale.",
    category: "Writing",
    rating: 4.2,
    url: "https://jasper.ai",
    ctaLabel: "Try Jasper",
    color: "bg-violet-500",
    comparisons: [],
  },
  {
    slug: "copyai",
    name: "Copy.ai",
    tagline: "AI copywriting tool for marketing copy, emails, and social content.",
    category: "Writing",
    rating: 4.1,
    url: "https://copy.ai",
    ctaLabel: "Try Copy.ai Free",
    color: "bg-pink-500",
    comparisons: [],
  },
  {
    slug: "writesonic",
    name: "Writesonic",
    tagline: "AI writer and SEO content tool with a built-in AI chatbot.",
    category: "Writing",
    rating: 4.0,
    url: "https://writesonic.com",
    ctaLabel: "Try Writesonic",
    color: "bg-cyan-500",
    comparisons: [],
  },
  {
    slug: "runway",
    name: "Runway",
    tagline: "Professional AI video generation and editing for creators.",
    category: "Video",
    rating: 4.4,
    url: "https://runwayml.com",
    ctaLabel: "Try Runway",
    color: "bg-red-500",
    comparisons: [],
  },
  {
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    tagline: "Open-source AI image generation — run locally or via API.",
    category: "Image",
    rating: 4.3,
    url: "https://stability.ai",
    ctaLabel: "Try Stable Diffusion",
    color: "bg-indigo-500",
    comparisons: [],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    tagline: "AI writing and summarization built directly into Notion workspaces.",
    category: "Productivity",
    rating: 4.3,
    url: "https://notion.so/product/ai",
    ctaLabel: "Try Notion AI",
    color: "bg-slate-800",
    comparisons: [],
  },
  {
    slug: "otter-ai",
    name: "Otter.ai",
    tagline: "AI meeting transcription, summaries, and action item extraction.",
    category: "Productivity",
    rating: 4.2,
    url: "https://otter.ai",
    ctaLabel: "Try Otter.ai Free",
    color: "bg-blue-400",
    comparisons: [],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    tagline: "Hyper-realistic AI voice generation and text-to-speech.",
    category: "Audio",
    rating: 4.5,
    url: "https://elevenlabs.io",
    ctaLabel: "Try ElevenLabs Free",
    color: "bg-yellow-500",
    comparisons: [],
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    tagline: "Create professional AI avatar videos from text in minutes.",
    category: "Video",
    rating: 4.3,
    url: "https://synthesia.io",
    ctaLabel: "Try Synthesia",
    color: "bg-blue-600",
    comparisons: [],
  },
  {
    slug: "canva-ai",
    name: "Canva AI",
    tagline: "AI design tools built into Canva — generate images, text, and presentations.",
    category: "Design",
    rating: 4.4,
    url: "https://canva.com/ai-image-generator",
    ctaLabel: "Try Canva AI Free",
    color: "bg-purple-400",
    comparisons: [],
  },
  {
    slug: "grammarly-ai",
    name: "Grammarly AI",
    tagline: "AI writing assistant for grammar, tone, clarity, and style.",
    category: "Writing",
    rating: 4.3,
    url: "https://grammarly.com",
    ctaLabel: "Try Grammarly Free",
    color: "bg-green-500",
    comparisons: [],
  },
  {
    slug: "adobe-firefly",
    name: "Adobe Firefly",
    tagline: "Adobe's AI image generator — commercially safe, Photoshop-integrated.",
    category: "Image",
    rating: 4.2,
    url: "https://firefly.adobe.com",
    ctaLabel: "Try Adobe Firefly",
    color: "bg-red-600",
    comparisons: [],
  },
];

export const categoryColors: Record<ToolCategory, string> = {
  Writing: "bg-orange-500/15 text-orange-300 border border-orange-400/20",
  Coding: "bg-blue-500/15 text-blue-300 border border-blue-400/20",
  Image: "bg-purple-500/15 text-purple-300 border border-purple-400/20",
  Search: "bg-green-500/15 text-green-300 border border-green-400/20",
  Video: "bg-red-500/15 text-red-300 border border-red-400/20",
  Audio: "bg-yellow-500/15 text-yellow-300 border border-yellow-400/20",
  Productivity: "bg-white/10 text-slate-300 border border-white/15",
  Design: "bg-pink-500/15 text-pink-300 border border-pink-400/20",
};

export const allCategories: ToolCategory[] = [
  "Writing",
  "Coding",
  "Image",
  "Search",
  "Video",
  "Audio",
  "Productivity",
  "Design",
];
