export interface NewsArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  category: string;
  badge: string;
  summary: string;
  sections: { h2: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
}

export const newsArticles: NewsArticle[] = [
  {
    "slug": "ai-tool-news-weekly-roundup-june-29-2026",
    "title": "AI Weekly: OpenAI, Google & Anthropic Shake Up June 2026",
    "metaTitle": "AI Tool News Weekly Roundup – June 29, 2026",
    "metaDescription": "This week's biggest AI news: OpenAI GPT-5 Pro updates, Google Gemini Ultra 2.5, Anthropic Claude 4 pricing, Cursor 1.2, and Midjourney V7 launch in June 2026.",
    "date": "2026-06-29",
    "category": "Weekly Roundup",
    "badge": "Weekly Roundup",
    "summary": "The final week of June 2026 delivered a torrent of major AI announcements, with OpenAI, Google, and Anthropic all making moves that are reshaping the competitive landscape for developers and enterprises alike. From surprise model upgrades to aggressive pricing restructures and a significant acquisition in the AI coding space, this week proved that the pace of innovation in artificial intelligence shows no sign of slowing. Here is everything that mattered in AI tools from June 23 to June 29, 2026.",
    "sections": [
      {
        "h2": "OpenAI Rolls Out GPT-5 Pro Tier and Slashes API Pricing",
        "paragraphs": [
          "OpenAI sent shockwaves through the developer community on June 24, 2026, by announcing a new 'GPT-5 Pro' access tier within ChatGPT, priced at $49 per month for individual subscribers — sitting above the existing ChatGPT Plus plan at $20 per month and the ChatGPT Team plan at $30 per user per month. The Pro tier unlocks extended context windows of up to 512K tokens, priority inference speed, and early access to experimental reasoning features that OpenAI is internally calling 'o3-Next,' a successor to its o3 reasoning model family. The announcement came alongside a major update to the GPT-5 base model that improves factual grounding and dramatically reduces hallucination rates in long-document summarization tasks.",
          "Simultaneously, OpenAI cut API pricing for GPT-5 by an average of 40 percent, with input tokens now running at $2.50 per million and output tokens at $10.00 per million — down from $4.00 and $16.00 respectively, which had been in place since the model's initial API release in March 2026. The company framed the reduction as a response to growing competition from Google and Anthropic, both of whom have been aggressively targeting enterprise API customers with discounted contracts. OpenAI's developer evangelist team published a detailed blog post on June 25 confirming that the new pricing takes effect immediately for all existing API customers with no contractual renegotiation required.",
          "The pricing announcement was accompanied by the release of GPT-5-mini-2026-06, a refreshed version of OpenAI's cost-optimized model that now outperforms the original GPT-4o on several coding and math benchmarks according to OpenAI's internal evaluations. GPT-5-mini-2026-06 is priced at $0.15 per million input tokens and $0.60 per million output tokens, making it one of the most affordable frontier-class models currently available via API. Analysts at Bernstein Research noted in a June 27 note that the pricing moves signal OpenAI's intent to defend market share ahead of what is widely anticipated to be a Gemini Ultra 2.5 enterprise push from Google later this summer."
        ]
      },
      {
        "h2": "Google DeepMind Launches Gemini Ultra 2.5 With Native Video Generation",
        "paragraphs": [
          "Google DeepMind officially launched Gemini Ultra 2.5 on June 26, 2026, marking the most significant update to the Gemini model family since Gemini 2.0 Ultra debuted in January. The new model introduces native, end-to-end video generation and understanding capabilities without relying on a separate Veo model call — a technical consolidation that Google says reduces latency by up to 60 percent for multimodal workflows. Gemini Ultra 2.5 is available immediately to Google One AI Premium subscribers at $19.99 per month and via Google Cloud's Vertex AI, where enterprise pricing starts at $12.00 per million input tokens for text and $0.065 per second for video input processing.",
          "In benchmark testing published alongside the launch, Google claims Gemini Ultra 2.5 achieves a score of 92.4 on the MMLU Pro evaluation and sets a new state-of-the-art on the VideoMME benchmark with a score of 84.7, surpassing both GPT-5 and Anthropic's Claude 4 Opus on video-based reasoning tasks. The model also features a confirmed 2 million token context window, which Google is positioning as a key differentiator for legal, financial, and scientific research use cases where processing entire document archives in a single prompt is increasingly critical. Google Workspace integration for Gemini Ultra 2.5 is expected to roll out to enterprise customers beginning July 7, 2026.",
          "Perhaps most intriguingly, Google announced Project Astra Live, a real-time agentic assistant layer built on Gemini Ultra 2.5 that is now entering public beta for users in the United States, United Kingdom, and Japan. Project Astra Live allows the model to maintain persistent awareness of a user's screen, active applications, and calendar in real time, acting proactively on tasks without waiting for explicit prompts. Privacy advocates have already raised concerns, and Google confirmed that all Astra Live processing is handled on-device for sensitive data categories including health and financial information, with a full privacy whitepaper released on June 27 to address regulatory scrutiny ahead of anticipated EU review."
        ]
      },
      {
        "h2": "Anthropic Releases Claude 4 Haiku and Restructures Claude Pro Pricing",
        "paragraphs": [
          "Anthropic rounded out its Claude 4 model family on June 23, 2026, with the official general availability launch of Claude 4 Haiku, the lightweight member of the Claude 4 generation following the earlier releases of Claude 4 Sonnet in April and Claude 4 Opus in May. Claude 4 Haiku is designed for high-throughput, latency-sensitive applications and is priced at $0.08 per million input tokens and $0.25 per million output tokens via the Anthropic API — a pricing point that undercuts Google's Gemini 1.5 Flash and positions Haiku as a direct competitor to GPT-5-mini for production deployments where cost efficiency is paramount. The model supports a 200K token context window and, according to Anthropic's published benchmarks, achieves performance on par with Claude 3 Opus on most standard reasoning tasks.",
          "Alongside the Haiku launch, Anthropic announced a restructured pricing model for Claude.ai Pro subscribers, raising the monthly subscription from $20 to $25 effective August 1, 2026, while simultaneously bundling in access to Claude 4 Sonnet with no usage cap and a new 'extended thinking' mode for Claude 4 Opus that was previously gated behind the Claude.ai Max plan at $100 per month. The company framed the restructure as simplification rather than a price hike, noting that the $25 Pro plan now delivers more value than the prior $100 Max plan did at launch in early 2025. Existing annual subscribers will be grandfathered at their current rate through the end of their billing cycle.",
          "Anthropic also made headlines on June 25 with the announcement of Claude for Enterprise 2.0, a revamped enterprise product that introduces role-based access controls, audit logging, custom system prompt libraries, and a new compliance dashboard designed to help organizations meet ISO 27001 and SOC 2 Type II requirements. The enterprise offering is now available with a minimum contract of $60 per user per month for teams of 10 or more, and Anthropic confirmed that Thomson Reuters, Bridgewater Associates, and a Fortune 100 pharmaceutical company — not yet named publicly — have already signed multi-year agreements under the new framework. CEO Dario Amodei noted in a post on X that Claude 4 Opus continues to hold the top position on Anthropic's internal safety evaluations, with no instance of catastrophic capability elicitation observed across more than 10 million red-team test cases conducted this quarter."
        ]
      },
      {
        "h2": "Cursor Acquires Codeium and Releases Cursor 1.2 With Agent Mode",
        "paragraphs": [
          "In arguably the most consequential business development of the week, AI coding editor Cursor confirmed on June 24, 2026, that it has acquired Codeium, the enterprise-focused AI coding assistant, in an all-stock deal valued at approximately $1.25 billion based on Cursor's most recent $9.9 billion valuation from its Series C round in February 2026. The acquisition is expected to close by August 31, 2026, pending standard regulatory review. The deal immediately expands Cursor's addressable market into large enterprise accounts — Codeium had secured contracts with over 700 enterprise customers including Goldman Sachs, Uber, and Dell — while giving Cursor access to Codeium's proprietary low-latency code completion infrastructure, which processes over 2 billion code completions per day.",
          "Coinciding with the acquisition announcement, Cursor released version 1.2 of its editor on June 26, 2026, introducing a long-awaited Agent Mode that allows the AI to autonomously execute multi-step coding tasks including writing files, running terminal commands, installing dependencies, and iterating based on test results without requiring manual approval at each step. Agent Mode is available to Cursor Pro subscribers at $20 per month and Cursor Business subscribers at $40 per user per month, with a daily agent action limit of 200 autonomous steps for Pro and unlimited for Business. Early user reports on X and Hacker News describe the feature as a significant leap over GitHub Copilot Workspace, which launched a similar agentic workflow feature in March 2026.",
          "Cursor 1.2 also introduces support for OpenAI's GPT-5 Pro model, Anthropic Claude 4 Opus, and Google Gemini Ultra 2.5 as selectable base models within the editor — a significant expansion from the previous version, which only supported GPT-4o-class models and Claude 3.5 Sonnet as primary backends. The update includes a new 'Model Router' feature that automatically selects the optimal model based on task type, token budget, and user-defined latency preferences. Cursor co-founder Michael Truell confirmed in an interview with The Verge on June 27 that the Codeium team will be fully integrated into Cursor's engineering organization and that Codeium's standalone product will continue to receive updates through at least December 2026 to support existing enterprise contracts."
        ]
      },
      {
        "h2": "Midjourney V7 Launches Publicly, Perplexity Adds Real-Time Web Tools",
        "paragraphs": [
          "Midjourney officially released V7 to all subscribers on June 25, 2026, ending a three-month alpha period during which access was restricted to users with more than 10,000 lifetime GPU hours on the platform. V7 introduces a fundamentally redesigned diffusion architecture that the company says delivers a 3x improvement in photorealistic detail, significantly more coherent multi-character compositions, and a new 'Style DNA' feature that allows users to define a persistent visual style guide that applies consistently across all images in a project. The model also dramatically reduces the incidence of anatomical errors in human figures, a persistent criticism of earlier Midjourney versions that had largely been addressed by competitors like Flux and Ideogram 3.0.",
          "Pricing for Midjourney remains unchanged with V7: Basic at $10 per month, Standard at $30, Pro at $60, and Mega at $120, with V7 available across all tiers. However, Midjourney also quietly launched a new 'Turbo Mode' for V7 that consumes GPU minutes at 4x the standard rate but delivers image generation in under three seconds — a response to real-time generation capabilities demonstrated by Ideogram's API. The company also teased a forthcoming Midjourney Web 2.0 interface, with a screenshot shared in its official Discord server on June 27 showing a project-based workspace, integrated mood boarding tools, and what appears to be a timeline feature suggesting video generation capabilities are in development.",
          "Meanwhile, Perplexity AI released a major update to its AI search platform on June 23, marking the debut of Perplexity Pro Tools — a suite of integrations allowing the assistant to book travel, execute code, manage calendar events, and place orders through supported e-commerce partners directly within the Perplexity interface. The feature is available exclusively to Perplexity Pro subscribers at $20 per month and represents the company's most direct challenge yet to OpenAI's ChatGPT operator ecosystem. Perplexity also confirmed this week that its underlying answer model has been upgraded to a custom fine-tune built on top of Gemini Ultra 2.5 for factual question answering, while retaining its proprietary retrieval-augmented generation pipeline — a notable strategic shift away from the Mistral-based architecture that had powered Perplexity's answers through most of 2025."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is the new price of OpenAI's GPT-5 API as of June 2026?",
        "answer": "As of June 24, 2026, OpenAI reduced GPT-5 API pricing by approximately 40 percent. Input tokens now cost $2.50 per million and output tokens cost $10.00 per million. The cheaper GPT-5-mini-2026-06 variant is priced at $0.15 per million input tokens and $0.60 per million output tokens. The new pricing applies immediately to all existing API customers."
      },
      {
        "question": "What new features does Gemini Ultra 2.5 include and how much does it cost?",
        "answer": "Launched on June 26, 2026, Gemini Ultra 2.5 introduces native end-to-end video generation, a 2 million token context window, and the Project Astra Live real-time agentic assistant. For consumers, it is available via Google One AI Premium at $19.99 per month. Enterprise access through Google Cloud Vertex AI starts at $12.00 per million input tokens for text and $0.065 per second for video input processing."
      },
      {
        "question": "Why did Cursor acquire Codeium and what does it mean for users?",
        "answer": "Cursor acquired Codeium in an all-stock deal worth approximately $1.25 billion, announced June 24, 2026, to expand into enterprise markets and gain access to Codeium's high-speed code completion infrastructure. For existing Codeium enterprise users, the standalone product will continue receiving updates through at least December 2026. Cursor users gain access to new Agent Mode capabilities in Cursor 1.2 and broader model support including GPT-5 Pro, Claude 4 Opus, and Gemini Ultra 2.5."
      },
      {
        "question": "How has Anthropic changed Claude.ai Pro pricing and what do subscribers get now?",
        "answer": "Anthropic is raising Claude.ai Pro from $20 to $25 per month effective August 1, 2026. However, the updated plan now includes unlimited access to Claude 4 Sonnet and the extended thinking mode for Claude 4 Opus, features previously reserved for the $100 per month Max plan. Existing annual subscribers will be grandfathered at their current rate through the end of their billing period."
      },
      {
        "question": "What is new in Midjourney V7 and who can access it?",
        "answer": "Midjourney V7, publicly released on June 25, 2026, features a redesigned diffusion architecture with 3x improved photorealistic detail, better multi-character scene coherence, a new Style DNA feature for consistent project-wide aesthetics, and significantly reduced anatomical errors in human figures. V7 is available to all Midjourney subscribers from the $10 per month Basic plan upward, with a new Turbo Mode for sub-three-second generation available at 4x the standard GPU minute consumption rate."
      }
    ]
  },

  {
    "slug": "ai-tools-weekly-roundup-june-29-2026",
    "title": "AI Weekly: GPT-5 Turbo, Claude 4, Gemini 2.5 Ultra Drop",
    "metaTitle": "AI Tools Weekly Roundup June 2026 | GPT-5, Claude 4 News",
    "metaDescription": "This week's biggest AI news: OpenAI's GPT-5 Turbo launch, Anthropic's Claude 4 Sonnet update, Google Gemini 2.5 Ultra pricing, and Cursor's major IDE overhaul.",
    "date": "2026-06-29",
    "category": "Weekly Roundup",
    "badge": "Weekly Roundup",
    "summary": "The last week of June 2026 has proven to be one of the most consequential seven-day stretches in AI tooling history, with OpenAI, Anthropic, and Google all making major moves within days of each other. From a surprise mid-tier model drop by OpenAI to Google's aggressive repricing of its flagship Gemini tier, the competition for developer and enterprise mindshare has never been fiercer. Meanwhile, Cursor's sweeping IDE update and Perplexity's new research agent are reshaping how professionals actually use AI day to day.",
    "sections": [
      {
        "h2": "OpenAI Launches GPT-5 Turbo at Sharply Reduced API Pricing",
        "paragraphs": [
          "OpenAI on June 24 quietly released GPT-5 Turbo, a distilled and optimized variant of its flagship GPT-5 model, positioning it squarely between GPT-4o and the full GPT-5 on both capability and cost. The new model is available via API at $2.00 per million input tokens and $6.00 per million output tokens — roughly 60 percent cheaper than standard GPT-5 — and is already live for ChatGPT Plus, Pro, and Team subscribers at no additional charge. OpenAI says the model achieves 94 percent of GPT-5's benchmark scores on MMLU and HumanEval while delivering responses approximately 40 percent faster under load.",
          "The release follows weeks of speculation after OpenAI's developer forum lit up with reports of a new model appearing in internal API logs under the codename 'orion-turbo.' CEO Sam Altman confirmed the launch in a post on X, describing GPT-5 Turbo as 'the model most developers have actually been asking for — fast, cheap, and still genuinely smart.' Enterprise customers already on GPT-5 contracts will have GPT-5 Turbo available as a drop-in alias starting July 1, according to an email sent to business accounts on June 25.",
          "The pricing move is widely interpreted as a direct response to Anthropic's Claude 4 Haiku, which has been winning over cost-sensitive API customers since its May launch. Analysts at Bernstein noted in a same-day research note that OpenAI appears willing to compress margins on inference to protect market share, betting that ecosystem lock-in through tools like the Assistants API and GPT Store will sustain long-term revenue. The stock of OpenAI's closest publicly traded proxy, Microsoft, rose 2.3 percent on the day of the announcement."
        ]
      },
      {
        "h2": "Anthropic Releases Claude 4 Sonnet With Extended 2M Token Context Window",
        "paragraphs": [
          "Anthropic shipped Claude 4 Sonnet on June 23, upgrading its mid-tier model with a 2-million-token context window — double the previous 1-million-token ceiling — and meaningful improvements to instruction-following and multi-step reasoning. The model is available on Claude.ai for Pro subscribers ($20/month) and via API at $3.00 per million input tokens and $15.00 per million output tokens, unchanged from its predecessor. Anthropic claims Claude 4 Sonnet outperforms GPT-5 Turbo on long-document summarization and legal contract analysis benchmarks, categories the company has heavily marketed to enterprise customers.",
          "The 2M context window is the headline feature, and early testing by developers on Hacker News and the Anthropic Discord suggests it holds coherence far better than previous long-context models. Users report successfully loading entire codebases of 150,000+ lines, full regulatory filings, and multi-year email archives without the 'lost in the middle' degradation that plagued earlier attempts at extended context. Anthropic's technical blog post accompanying the release credits architectural changes to its attention mechanism, though specifics remain proprietary.",
          "Claude.ai also received a companion product update alongside the model drop: a redesigned Projects interface that lets teams share persistent memory, custom instructions, and document libraries across an entire workspace rather than individual users. The feature, rolling out to Team and Enterprise plans through July 5, directly mirrors a capability OpenAI introduced for ChatGPT Teams in March. Anthropic's VP of Product Mike Krieger described it as 'bringing the context window to the org level,' signaling the company's continued push upmarket into knowledge-worker workflows."
        ]
      },
      {
        "h2": "Google Cuts Gemini 2.5 Ultra Price by 50%, Announces Gemini in Google Sheets",
        "paragraphs": [
          "Google DeepMind dropped a pricing bombshell on June 26, slashing Gemini 2.5 Ultra API costs by 50 percent across the board — now $3.75 per million input tokens and $11.00 per million output tokens — while simultaneously announcing deep integration of Gemini into Google Sheets via a new 'Analyze with Gemini' sidebar launching in Workspace in early July. The price cut makes Gemini 2.5 Ultra the most affordable frontier-class model by raw token cost, undercutting both GPT-5 Turbo and Claude 4 Sonnet on input pricing. Google framed the move as a reflection of improved infrastructure efficiency at its custom TPU v6 data centers.",
          "The Sheets integration is arguably the bigger story for the 3 billion active Google Workspace users. The 'Analyze with Gemini' feature will allow users to highlight any range of data and prompt Gemini directly in natural language to generate formulas, create pivot tables, flag anomalies, or produce plain-English summaries — all without leaving the spreadsheet. Google is billing it as a successor to its earlier Smart Fill and Explore features, but the capability is substantially more powerful; demo videos circulated by Google show the model correctly diagnosing a multi-column data error and suggesting a corrective formula in under three seconds.",
          "The pricing cut caught competitors off guard, with one OpenAI engineer commenting anonymously to The Verge that 'the economics are moving faster than anyone modeled.' Google also confirmed that Gemini 2.5 Flash, its lower-cost sibling model, will be free for up to 1,500 requests per day via AI Studio starting July 1, a threshold that covers the majority of hobbyist and indie developer workloads. The announcements pushed Alphabet shares up 3.1 percent on June 26, their best single-day gain in six weeks."
        ]
      },
      {
        "h2": "Cursor 1.0 Ships With AI-Native Debugging and Multi-File Agent Mode",
        "paragraphs": [
          "Cursor, the AI-first code editor that has become the default development environment for a growing cohort of professional developers, released version 1.0 on June 25 after eighteen months of rapid iteration. The flagship new feature is an AI-native debugger that integrates directly with the runtime — when a program crashes or throws an exception, Cursor's agent automatically reads the stack trace, cross-references the relevant source files, proposes a fix, and can apply it with a single keystroke. In internal benchmarks shared by the company, the debugger resolved 71 percent of common runtime errors without requiring any additional user input beyond an approval click.",
          "The 1.0 release also ships a revamped multi-file Agent Mode that the company says can now handle tasks spanning up to 200 files coherently, a significant leap from the previous practical ceiling of around 30 to 40 files before context and coherence degraded. The agent can be given high-level goals — 'add OAuth2 login to this Express app' or 'migrate this codebase from Python 3.9 to 3.12' — and will plan, execute, and verify changes across the entire project while surfacing a diff for developer review. Cursor says the underlying model powering Agent Mode is a fine-tuned variant of GPT-5 Turbo, taking advantage of OpenAI's new API pricing.",
          "Cursor 1.0 also introduces a Business plan at $40 per user per month (up from the previous $20 Pro tier) that includes SOC 2 compliance, SSO, centralized billing, and audit logs — features that have been the primary barrier to enterprise adoption. The company, which raised a $900 million Series C in January 2026 at a $9 billion valuation, says it now has over 4 million monthly active developers and more than 2,000 paying enterprise customers. CEO Michael Truell said in a launch livestream that the 1.0 milestone 'marks the moment Cursor stops being a VS Code plugin and becomes a professional platform.'"
        ]
      },
      {
        "h2": "Perplexity Launches Deep Research Agent Pro, Raises $250M at $14B Valuation",
        "paragraphs": [
          "Perplexity AI announced on June 27 both a significant product upgrade and a fresh funding round in a single press release, revealing a $250 million Series E at a $14 billion valuation led by SoftBank Vision Fund 3, with participation from Jeff Bezos's personal investment vehicle and existing backers IVP and NEA. The new capital will fund international expansion, compute infrastructure, and an advertising product the company says is coming in Q4 2026. The valuation represents a nearly 3x increase from Perplexity's $5 billion Series D just thirteen months ago, a trajectory that underscores investor conviction in the search-as-AI-agent category.",
          "Alongside the funding news, Perplexity launched Deep Research Agent Pro, an upgraded version of its automated multi-step research tool available to Perplexity Pro subscribers ($20/month). The new version can conduct research sessions lasting up to 45 minutes, autonomously browsing up to 400 sources, running code to analyze datasets, and producing structured reports with inline citations and an exportable bibliography. Early users in the Perplexity subreddit described it as 'genuinely replacing the first two hours of work on any new project,' with particular praise for its handling of financial and scientific literature.",
          "Perplexity CEO Aravind Srinivas used the announcement to take a pointed swipe at Google, telling journalists on a press call that 'the future of information retrieval is not ten blue links with an AI summary box bolted on top — it is an agent that goes and does the work.' Google's Gemini team did not respond publicly, though the timing of Google's own Workspace AI announcements a day earlier may not be coincidental. Perplexity also confirmed that a native iOS widget and Apple Intelligence integration, teased at WWDC 2026, will ship in the iOS 20 public release expected in September."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is GPT-5 Turbo and how does it differ from standard GPT-5?",
        "answer": "GPT-5 Turbo, released June 24, 2026, is a distilled and optimized version of OpenAI's flagship GPT-5 model. It costs approximately 60 percent less via API ($2.00 input / $6.00 output per million tokens), responds about 40 percent faster, and scores 94 percent as high as full GPT-5 on standard benchmarks. It is included for all ChatGPT Plus, Pro, and Team subscribers at no extra charge."
      },
      {
        "question": "What is new in Claude 4 Sonnet compared to the previous version?",
        "answer": "Claude 4 Sonnet, released June 23, 2026, doubles its context window to 2 million tokens, improves multi-step reasoning and instruction-following, and introduces an upgraded Projects feature for team-wide shared memory and document libraries. Pricing remains unchanged at $3.00 per million input tokens and $15.00 per million output tokens on the API."
      },
      {
        "question": "Why did Google cut Gemini 2.5 Ultra pricing by 50 percent?",
        "answer": "Google attributed the price cut, announced June 26, 2026, to efficiency gains from its TPU v6 data center infrastructure. Analysts also note it is a competitive response to aggressive pricing from OpenAI and Anthropic. Gemini 2.5 Ultra now costs $3.75 per million input tokens and $11.00 per million output tokens, making it the lowest-cost frontier model by input price."
      },
      {
        "question": "What does Cursor 1.0 offer that previous versions did not?",
        "answer": "Cursor 1.0, released June 25, 2026, adds an AI-native runtime debugger that automatically diagnoses and proposes fixes for crashes, a multi-file Agent Mode that handles up to 200 files coherently, and a new Business plan at $40 per user per month with enterprise security features including SOC 2 compliance, SSO, and audit logs."
      },
      {
        "question": "What is Perplexity Deep Research Agent Pro and who can access it?",
        "answer": "Deep Research Agent Pro is an upgraded autonomous research tool launched June 27, 2026, available to Perplexity Pro subscribers at $20 per month. It can run research sessions up to 45 minutes long, browse up to 400 sources, execute code to analyze data, and produce structured reports with citations — a substantial upgrade over the previous version's scope and depth."
      }
    ]
  },
];

export function getArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getLatestArticles(count = 6): NewsArticle[] {
  return [...newsArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
