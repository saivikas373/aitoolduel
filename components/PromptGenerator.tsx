"use client";

import { useState } from "react";
import Link from "next/link";

type AiTool = "ChatGPT" | "Claude" | "Gemini" | "Midjourney" | "General";
type UseCase =
  | "Writing" | "Coding" | "Marketing" | "Email" | "Resume"
  | "Study" | "Business" | "Creative" | "Social Media" | "SEO";

const AI_TOOLS: AiTool[] = ["ChatGPT", "Claude", "Gemini", "Midjourney", "General"];
const USE_CASES: UseCase[] = [
  "Writing", "Coding", "Marketing", "Email", "Resume",
  "Study", "Business", "Creative", "Social Media", "SEO",
];

const TOOL_COLORS: Record<AiTool, string> = {
  ChatGPT: "bg-emerald-500",
  Claude: "bg-orange-500",
  Gemini: "bg-blue-500",
  Midjourney: "bg-purple-600",
  General: "bg-slate-600",
};

const USE_CASE_LINKS: Record<UseCase, { label: string; href: string }> = {
  Writing:       { label: "ChatGPT vs Claude",          href: "/compare/chatgpt-vs-claude" },
  Coding:        { label: "GitHub Copilot vs Cursor",   href: "/compare/github-copilot-vs-cursor" },
  Marketing:     { label: "ChatGPT vs Claude",          href: "/compare/chatgpt-vs-claude" },
  Email:         { label: "ChatGPT vs Claude",          href: "/compare/chatgpt-vs-claude" },
  Resume:        { label: "ChatGPT vs Claude",          href: "/compare/chatgpt-vs-claude" },
  Study:         { label: "Perplexity vs Google",       href: "/compare/perplexity-vs-google" },
  Business:      { label: "ChatGPT vs Claude",          href: "/compare/chatgpt-vs-claude" },
  Creative:      { label: "Midjourney vs DALL-E",       href: "/compare/midjourney-vs-dalle" },
  "Social Media":{ label: "ChatGPT vs Claude",          href: "/compare/chatgpt-vs-claude" },
  SEO:           { label: "Perplexity vs Google",       href: "/compare/perplexity-vs-google" },
};

// ── 50+ Templates (5 per use case) ────────────────────────────────────────
type Tpl = (tool: AiTool, desc: string) => string;

const TEMPLATES: Record<UseCase, Tpl[]> = {
  Writing: [
    (tool, desc) => tool === "Midjourney"
      ? `A beautifully designed book cover featuring themes of ${desc}, cinematic lighting, detailed illustration, professional typography, 8K resolution --ar 2:3 --stylize 750`
      : `${tool === "Claude" ? "You are" : "Act as"} an expert writer with 10+ years of experience. Write a compelling, well-structured piece about: ${desc}

Include:
- An engaging hook in the first sentence
- Clear structure with descriptive subheadings
- Specific examples and evidence
- A strong conclusion with actionable takeaways
- Professional yet conversational tone

Every sentence should add value. No filler content.`,

    (tool, desc) => `${tool === "Claude" ? "You are" : "Act as"} a senior editor at a top publication. Write a detailed, nuanced piece on: ${desc}

Structure:
1. Hook (first 2 sentences must grab attention)
2. Context and background
3. Main arguments (3–5 key points)
4. Counter-perspectives where relevant
5. Conclusion with a clear insight

Write in active voice. Be specific — avoid vague generalizations.`,

    (_tool, desc) => `You are a professional ghostwriter known for producing work indistinguishable from world-class human writers. Write the following in a compelling, original voice:

Topic: ${desc}

Requirements:
- Show, don't tell — use vivid, specific language
- Vary sentence length for rhythm and flow
- Use concrete examples over abstract claims
- Target a smart, curious general audience
- Short paragraphs for easy reading`,

    (_tool, desc) => `You are a content strategist and SEO copywriter. Create a complete, publish-ready article on: ${desc}

Include:
- SEO-optimized title (60 chars max)
- Meta description (155 chars max)
- Full body with H2/H3 structure
- Internal linking suggestions [in brackets]
- Strong call-to-action at the end

Prioritize clarity, depth, and reader value.`,

    (_tool, desc) => `You are a narrative nonfiction writer. Take this topic and transform it into a compelling, story-driven piece:

Topic: ${desc}

Start with a specific, surprising anecdote. Build toward a broader insight. Move between micro (personal story) and macro (big idea). End with a memorable, quotable conclusion.`,
  ],

  Coding: [
    (tool, desc) => `${tool === "Claude" ? "You are" : "Act as"} a senior software engineer with 15 years of production experience. Write clean, efficient, well-commented code for:

Task: ${desc}

Requirements:
- Follow best practices and SOLID principles
- Comprehensive error handling
- Inline comments explaining non-obvious logic
- Include a usage example at the end
- Note any edge cases or limitations`,

    (_tool, desc) => `You are a staff engineer. Solve the following in the most elegant, maintainable way:

${desc}

Before writing code:
1. State your approach and why
2. Note trade-offs (time vs space, readability vs performance)

Then provide:
- Complete, runnable implementation
- Time and space complexity analysis
- 3 test cases including edge cases`,

    (_tool, desc) => `You are a code reviewer and architect. Write production-ready code for:

${desc}

Standards:
- Clean architecture with separation of concerns
- Input validation at all boundaries
- Meaningful variable and function names (no abbreviations)
- DRY principle — extract reusable logic
- Docstring/JSDoc for every public function
- Security considerations noted`,

    (_tool, desc) => `Act as a senior developer in a pair programming session. Walk me through solving this step by step:

${desc}

Format:
1. Restate the problem in your own words
2. Break into sub-problems
3. Write pseudocode first
4. Implement the solution
5. Test and verify
6. Suggest optimizations

Explain your reasoning — teach, don't just code.`,

    (_tool, desc) => `You are a developer advocate writing a technical tutorial. Create a beginner-friendly implementation of:

${desc}

Include:
- Prerequisites and setup
- Step-by-step implementation with explanations
- Full working code (copy-pasteable)
- Common mistakes to avoid
- Where to go next / further reading`,
  ],

  Marketing: [
    (_tool, desc) => `Act as a CMO at a high-growth startup. Create a comprehensive marketing strategy for:

${desc}

Include:
- Target audience profile (demographics + psychographics)
- Core messaging and unique value proposition
- 3 recommended marketing channels and why
- 5 content pillars for consistent content
- 30-day quick-win action plan
- KPIs to track success`,

    (_tool, desc) => `You are a direct-response copywriter. Write compelling marketing copy for:

${desc}

Structure:
- 5 headline variations (curiosity, benefit, urgency, social proof, question)
- Sub-headline that expands the promise
- Body copy: customer pain → solution
- Social proof placeholder
- Clear, urgent call-to-action
- P.S. line

Write to convert, not just to impress.`,

    (_tool, desc) => `You are a growth marketer. Design a full-funnel campaign for:

${desc}

Map out:
- Awareness: channels + hooks for discovery
- Consideration: content + social proof
- Decision: offer + urgency + guarantees
- Retention: onboarding + lifecycle messaging

Include specific copy examples at each stage.`,

    (_tool, desc) => `Act as a brand strategist. Develop a positioning strategy for:

${desc}

Deliver:
1. Brand positioning statement
2. Brand voice (3 adjectives + what they mean in practice)
3. Key messages for each audience segment
4. Differentiation from top competitors
5. 5 tagline options`,

    (_tool, desc) => `You are a performance marketing expert. Create a paid advertising brief for:

${desc}

Include:
- Campaign objective
- Target audience segments
- 3 ad creative concepts with hooks
- Landing page headline and CTA copy
- A/B test ideas for the first 30 days
- Budget allocation by channel`,
  ],

  Email: [
    (_tool, desc) => `You are an email marketing expert who achieves 40%+ open rates. Write a high-converting email for:

${desc}

Include:
- 5 subject line variations (curiosity, benefit, urgency, personalization, question)
- Preview text (max 90 characters)
- Opening line with immediate hook (no "I hope this email finds you well")
- Scannable, conversational body
- Single focused CTA
- P.S. line

Sound like a real person, not a template.`,

    (_tool, desc) => `Act as a cold email specialist. Write a high-performing cold outreach email for:

${desc}

Rules:
- Subject line: max 6 words
- Total email: max 150 words
- Specific hook in line 1 (no generic openers)
- One soft CTA (question, not demand)
- Zero buzzwords, conversational tone

Framework: Problem → Credibility → Solution → CTA`,

    (_tool, desc) => `You are a lifecycle email strategist. Write a 3-email welcome sequence for:

${desc}

Email 1 (Day 0): Welcome + deliver the promise
Email 2 (Day 2): Key benefit or quick win
Email 3 (Day 5): Social proof + next action

For each: subject line, body (under 200 words), CTA`,

    (_tool, desc) => `Act as a professional business writer. Write a formal yet compelling email for:

${desc}

Requirements:
- Professional tone for B2B/executive communication
- State the purpose in the first sentence
- Provide context concisely
- End with a specific, easy-to-respond-to ask
- No fluff — respect the reader's time`,

    (_tool, desc) => `You are an email copywriter. Write a re-engagement campaign (2 emails) for:

${desc}

Email 1: Acknowledge the silence + offer value
Email 2: Final "we'll miss you" + strong incentive

Tone: Warm, slightly playful, not desperate
Include subject, preview text, body, and CTA for each`,
  ],

  Resume: [
    (_tool, desc) => `You are a professional resume writer who has helped candidates land roles at top companies. Write powerful resume content for:

${desc}

Use the CAR method for each achievement:
- Context: The situation
- Action: What you specifically did
- Result: Quantified outcome

Rules:
- Lead with strong action verbs (built, drove, led, reduced, achieved)
- Include numbers/percentages wherever possible
- No vague claims like "improved processes"`,

    (_tool, desc) => `Act as a hiring manager at a Fortune 500 company. Rewrite the following for maximum resume impact:

${desc}

Transform using:
- Power verbs at the start of each bullet
- Quantified impact (even estimates like "~40% faster")
- The "so what?" test on every line
- ATS-optimized keywords
- Concise language — cut anything that doesn't sell

Output 3 alternative versions to choose from.`,

    (_tool, desc) => `You are a LinkedIn profile optimizer. Create a compelling professional summary for:

${desc}

Requirements:
- 3–5 sentences max
- Lead with title + years of experience
- Top 2–3 achievements with numbers
- 2–3 keywords relevant to target role
- End with your unique value proposition

Write 3 variations: formal, conversational, achievement-focused.`,

    (_tool, desc) => `Act as a technical recruiter who screens 200+ resumes per week. Optimize the following for ATS and human reviewers:

${desc}

Provide:
1. Revised version with stronger language
2. 10 relevant keywords to include naturally
3. The candidate's top 3 selling points (recruiter perspective)
4. What's weak or missing`,

    (_tool, desc) => `You are a career coach specializing in career transitions. Help craft resume content for:

${desc}

Create:
- Career summary bridging old experience to new direction
- 5 transferable skills bullets (reframed for the new field)
- How to present past roles to highlight relevant experience
- What to emphasize vs. de-emphasize
- Recommended resume format for this situation`,
  ],

  Study: [
    (_tool, desc) => `You are a master tutor. Teach the following concept as clearly as possible:

${desc}

Approach:
1. Simplest possible explanation (ELI5)
2. Full, accurate explanation
3. An analogy from everyday life
4. 2 concrete examples
5. The 3 most common points of confusion — addressed
6. A self-check question to test understanding`,

    (_tool, desc) => `Act as a Socratic tutor. Help me deeply understand:

${desc}

Format:
1. Core concept in 2 sentences
2. What most people misunderstand about this
3. 3 progressively harder questions to build mastery
4. Practice problem with step-by-step solution
5. Related concepts worth exploring next`,

    (_tool, desc) => `You are an expert in active learning. Create a complete study guide for:

${desc}

Include:
- Key points summary (bullet form)
- 10 flashcard Q&A pairs
- 3 practice questions (easy → medium → hard)
- Memory aids or mnemonics
- Common exam misconceptions to watch out for
- 5-minute review checklist`,

    (_tool, desc) => `Act as a research assistant. Break down the following for a smart non-expert:

${desc}

Provide:
1. Plain-English summary (what it is and why it matters)
2. Key terms defined simply
3. Main arguments or findings
4. Strengths and limitations
5. Real-world applications
6. Questions raised for further exploration`,

    (_tool, desc) => `You are a critical thinking instructor. Analyze the following from multiple angles:

${desc}

Structure:
- Steel-man the strongest argument FOR
- Steel-man the strongest argument AGAINST
- Underlying assumptions on each side
- What evidence would change your mind?
- How experts actually disagree on this
- Your recommended synthesis`,
  ],

  Business: [
    (_tool, desc) => `You are a strategy consultant. Provide a rigorous business analysis of:

${desc}

Framework:
1. Situation summary
2. Key questions to answer before deciding
3. Analysis (SWOT, competitive forces, etc.)
4. 3 strategic options with pros/cons
5. Recommendation with rationale
6. Risk mitigation plan
7. 30/60/90-day implementation steps`,

    (_tool, desc) => `Act as a seasoned entrepreneur who has built and sold multiple companies. Give honest advice on:

${desc}

Include:
- What most people get wrong about this
- The 3 most important things to get right
- Common mistakes to avoid
- Your recommended first 3 moves
- How you'd measure success in 90 days
- Red flags that would make you pivot`,

    (_tool, desc) => `You are a business plan writer. Create a compelling business plan section for:

${desc}

Include:
- Executive summary (100 words — make it count)
- Problem statement (quantify the pain)
- Solution and how it works
- Target market (TAM/SAM/SOM)
- Business model and revenue streams
- Competitive advantage and moat
- Go-to-market strategy`,

    (_tool, desc) => `Act as a COO. Analyze and improve the following business process:

${desc}

Provide:
1. Current state assessment
2. Root cause of inefficiencies
3. 3 quick wins (implementable in 2 weeks)
4. 2 strategic improvements (longer-term)
5. KPIs to track improvement
6. Implementation checklist`,

    (_tool, desc) => `You are a venture capital analyst. Evaluate the following with VC-level rigor:

${desc}

Assessment:
- Market size and timing
- Team and execution risk
- Product differentiation and moat
- Business model strength and unit economics
- Competitive landscape
- Bull case (why this becomes massive)
- Bear case (why this fails)
- Verdict: Fund / Pass / Need more info — and why`,
  ],

  Creative: [
    (tool, desc) => tool === "Midjourney"
      ? `${desc}, hyperrealistic digital art, dramatic cinematic lighting, 8K resolution, award-winning photography, ultra-detailed, masterpiece, trending on ArtStation --ar 16:9 --stylize 1000 --v 6`
      : `You are a visionary creative director. Develop a fully realized creative concept for:

${desc}

Deliver:
- Central concept/theme (the "big idea")
- Narrative structure or visual arc
- Characters, setting, mood, and tone
- 3 scenes or moments that capture the idea
- What makes this unexpected or memorable
- Production or execution notes`,

    (tool, desc) => tool === "Midjourney"
      ? `${desc}, concept art, vibrant color palette, fantastical atmosphere, intricate details, professional illustration, by Greg Rutkowski and Artgerm --ar 3:2 --stylize 750 --v 6`
      : `You are a celebrated fiction writer. Write a compelling story opening for:

${desc}

Requirements:
- Start in media res — drop us into the action
- Establish character, setting, and stakes in the first 3 paragraphs
- Use sensory detail — smell, sound, texture
- Build immediate tension or intrigue
- Write 500 words — end at a moment that demands the reader continue`,

    (tool, desc) => tool === "Midjourney"
      ? `${desc}, surrealist art style, dreamlike atmosphere, Salvador Dali inspired, otherworldly colors, highly detailed --ar 1:1 --stylize 900 --v 6`
      : `Act as a creative writing coach. Develop this concept with maximum originality:

${desc}

Push the idea:
1. The obvious interpretation (and why to avoid it)
2. The unexpected twist that makes it interesting
3. What emotion or truth the piece is really about
4. Three different possible formats
5. Write the strongest opening 150 words
6. What would make this truly unforgettable?`,

    (tool, desc) => tool === "Midjourney"
      ? `${desc}, photorealistic, Studio Ghibli aesthetic, soft natural lighting, peaceful atmosphere, lush environment, beautiful art direction --ar 16:9 --stylize 600`
      : `You are a screenwriter. Write a scene treatment for:

${desc}

Include:
- Scene heading and setting
- Action lines (show, don't tell)
- Dialogue that reveals character and advances plot
- Subtext — what's really being said beneath the words
- Scene beats and emotional turns
- How this connects to the larger story arc`,

    (tool, desc) => tool === "Midjourney"
      ? `${desc}, abstract expressionism, bold textures, emotional depth, large format canvas art, museum quality, impasto technique --ar 4:5 --stylize 850`
      : `You are a poet laureate. Create a poem about:

${desc}

Write three versions:
1. Free verse — emotional, personal, no rules
2. Structured form (sonnet, haiku sequence, or villanelle)
3. Prose poem — narrative with poetic density

Make each feel completely different. Prove the same subject can take wildly different forms.`,
  ],

  "Social Media": [
    (_tool, desc) => `You are a social media strategist who builds 100K+ audiences organically. Create a complete content plan for:

${desc}

Deliver:
- 5 hook styles that stop the scroll (with examples)
- 5 content pillars (themes that build authority + community)
- Platform adaptations (Twitter/X, LinkedIn, Instagram, TikTok)
- Posting frequency recommendation
- 10 specific post ideas with hooks
- Engagement tactics to boost reach`,

    (_tool, desc) => `Act as a viral content creator. Write 5 high-engagement social media posts about:

${desc}

For each post:
- Hook (first line that stops the scroll)
- Body (value, story, or insight)
- Engagement trigger (question, CTA, or debate-starter)
- Platform fit (specify which platform and why)

Make each post feel completely different in format and emotion.`,

    (_tool, desc) => `You are a LinkedIn growth expert. Write a high-performing LinkedIn post about:

${desc}

Formula:
- Line 1: Bold claim or counterintuitive statement (no "I'm excited to share")
- Lines 2–3: Set up the tension or story
- Lines 4–8: The insight (use white space aggressively)
- Final line: Question or soft CTA

Rules: No hashtag spam. No corporate speak. 150–250 words.`,

    (_tool, desc) => `Act as a TikTok and Reels script writer. Create a compelling short-form video script for:

${desc}

Script format:
- Hook (0–3s): What to say or show to stop the scroll
- Setup (3–8s): What this is about
- Middle (8–45s): The value/story with pattern interrupts every 7–10 seconds
- Ending (45–60s): Takeaway + CTA

Include: camera directions, on-screen text suggestions, sound notes`,

    (_tool, desc) => `You are a Twitter/X growth strategist. Write a high-performing thread about:

${desc}

Thread structure:
- Tweet 1: Hook (bold claim, surprising stat, or "here's why...")
- Tweets 2–7: One insight per tweet, building the argument
- Tweet 8: Summary with the key takeaway
- Tweet 9: CTA (follow, retweet, reply)

Rule: Each tweet must stand alone AND make someone want to read the next.`,
  ],

  SEO: [
    (_tool, desc) => `You are an SEO content strategist. Create a comprehensive SEO content brief for:

${desc}

Include:
- Primary keyword + 5 semantic/LSI keywords
- Search intent analysis
- Title tag (60 chars, keyword-first)
- Meta description (155 chars, keyword + CTA)
- H1 and H2 outline (6–8 subheadings)
- Word count recommendation
- Featured snippet optimization strategy
- E-E-A-T signals to include`,

    (_tool, desc) => `Act as an SEO copywriter with a track record of ranking position 1–3. Write fully optimized content for:

${desc}

Requirements:
- Primary keyword in H1, first paragraph, and conclusion
- Semantic variations throughout (not keyword stuffing)
- Featured snippet eligibility (define the topic in 40–60 words early)
- Subheadings answer specific user questions (People Also Ask format)
- Statistics and original insights for E-E-A-T
- FAQ section with 5 long-tail keyword questions`,

    (_tool, desc) => `You are an SEO auditor. Analyze and optimize the following for search performance:

${desc}

Provide:
1. Primary keyword opportunities
2. Content gaps vs. top competitors
3. On-page SEO recommendations
4. Schema markup suggestions
5. Internal linking strategy
6. Quick wins vs. long-term plays`,

    (_tool, desc) => `Act as a keyword research specialist. Develop a keyword strategy for:

${desc}

Deliver:
- 5–10 seed/core keywords
- 20+ long-tail variations
- Search intent map (grouped by intent)
- Content cluster structure (pillar + 5–8 cluster pages)
- Difficulty assessment (easy wins vs. competitive)
- Content to create in priority order`,

    (_tool, desc) => `You are a local SEO expert. Create an SEO strategy for:

${desc}

Focus on:
- Google Business Profile optimization tips
- Local keyword targeting (near me, city-specific)
- Review strategy for building authority
- Local content ideas (location pages, local guides)
- Schema markup for local business
- How to outrank competitors in the map pack`,
  ],
};

// ── Main Component ──────────────────────────────────────────────────────────
export default function PromptGenerator() {
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [description, setDescription] = useState("");
  const [generated, setGenerated] = useState<string | null>(null);
  const [templateIndex, setTemplateIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const canGenerate = selectedTool && selectedUseCase && description.trim().length >= 5;

  const generate = async (idxOverride?: number) => {
    if (!canGenerate || isGenerating) return;
    setIsGenerating(true);
    setGenerated(null);
    await new Promise((r) => setTimeout(r, 600));
    const templates = TEMPLATES[selectedUseCase!];
    const idx = idxOverride !== undefined ? idxOverride : templateIndex;
    const prompt = templates[idx % templates.length](selectedTool!, description.trim());
    setGenerated(prompt);
    setTemplateIndex((idx + 1) % templates.length);
    setIsGenerating(false);
  };

  const handleGenerateAnother = () => {
    generate(templateIndex);
  };

  const copyToClipboard = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ── Step 1: Select AI Tool ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
          <h2 className="font-bold text-slate-900 text-base">Select AI Tool</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {AI_TOOLS.map((tool) => (
            <button
              key={tool}
              onClick={() => setSelectedTool(tool)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                selectedTool === tool
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-orange-300"
              }`}
            >
              <span className={`w-5 h-5 rounded-md ${TOOL_COLORS[tool]} text-white text-xs font-bold flex items-center justify-center`}>
                {tool.charAt(0)}
              </span>
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 2: Select Use Case ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
          <h2 className="font-bold text-slate-900 text-base">Select Use Case</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {USE_CASES.map((uc) => (
            <button
              key={uc}
              onClick={() => setSelectedUseCase(uc)}
              className={`px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all text-center ${
                selectedUseCase === uc
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-orange-300"
              }`}
            >
              {uc}
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 3: Description ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
          <h2 className="font-bold text-slate-900 text-base">Describe What You Need</h2>
        </div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && canGenerate && generate(0)}
          placeholder={
            selectedUseCase === "Writing" ? "e.g. a blog post about the future of remote work" :
            selectedUseCase === "Coding" ? "e.g. a Python function that parses CSV files" :
            selectedUseCase === "Marketing" ? "e.g. a SaaS tool for project management" :
            selectedUseCase === "Email" ? "e.g. a cold outreach email for a web design service" :
            selectedUseCase === "Resume" ? "e.g. a software engineer with 5 years at startups" :
            selectedUseCase === "Study" ? "e.g. explain how neural networks work" :
            selectedUseCase === "Business" ? "e.g. a subscription box for pet owners" :
            selectedUseCase === "Creative" ? "e.g. a short story set on a space station" :
            selectedUseCase === "Social Media" ? "e.g. productivity tips for freelancers" :
            selectedUseCase === "SEO" ? "e.g. best project management software" :
            "Write a brief description of what you need..."
          }
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <p className="text-xs text-slate-400 mt-2">Tip: Be specific for better results. Min 5 characters.</p>
      </div>

      {/* ── Generate Button ── */}
      <button
        onClick={() => generate(0)}
        disabled={!canGenerate || isGenerating}
        className={`w-full py-4 rounded-xl font-bold text-white text-base transition-all ${
          canGenerate && !isGenerating
            ? "bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg"
            : "bg-slate-300 cursor-not-allowed"
        }`}
      >
        {isGenerating ? "Generating..." : "Generate Prompt ✨"}
      </button>

      {/* ── Output ── */}
      {generated && (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-bold text-sm">Generated Prompt</span>
              {selectedUseCase && (
                <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {selectedTool} · {selectedUseCase}
                </span>
              )}
            </div>
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-white"
              }`}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          {/* Prompt text */}
          <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed font-sans">
            {generated}
          </pre>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-700">
            <button
              onClick={handleGenerateAnother}
              className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              ↻ Generate Another Variation
            </button>
            {selectedUseCase && USE_CASE_LINKS[selectedUseCase] && (
              <Link
                href={USE_CASE_LINKS[selectedUseCase].href}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                <span className="text-orange-400">⚡</span>
                Works best with: {USE_CASE_LINKS[selectedUseCase].label} →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── AdSense placeholders — only shown after generation ── */}
      {generated && (
        <>
          <div style={{ height: "90px", background: "#f8f9fa", border: "1px dashed #dee2e6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "#adb5bd", fontSize: "12px" }}>
            Advertisement
          </div>
          <div style={{ height: "90px", background: "#f8f9fa", border: "1px dashed #dee2e6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#adb5bd", fontSize: "12px" }}>
            Advertisement
          </div>
        </>
      )}
    </div>
  );
}
