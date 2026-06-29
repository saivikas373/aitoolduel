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
