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
    "slug": "gemini-3-ultra-release-june-2026",
    "title": "Google Drops Gemini 3 Ultra: The Most Powerful AI Yet",
    "metaTitle": "Google Gemini 3 Ultra Released June 2026 | AI News",
    "metaDescription": "Google officially launches Gemini 3 Ultra on June 26, 2026, boasting 2M token context, native video generation, and benchmark-breaking reasoning scores.",
    "date": "2026-06-29",
    "category": "Industry News",
    "badge": "Hot",
    "summary": "Google DeepMind dropped its most ambitious model to date this week, officially releasing Gemini 3 Ultra on June 26, 2026, to enterprise customers and Gemini Advanced subscribers. The new flagship model claims top scores across every major reasoning, coding, and multimodal benchmark, and introduces a native 2-million-token context window as a standard feature. The release marks Google's most aggressive strike yet in its ongoing contest with OpenAI's GPT-5 and Anthropic's Claude 4 Opus.",
    "sections": [
      {
        "h2": "What Is Gemini 3 Ultra and What Can It Do?",
        "paragraphs": [
          "Gemini 3 Ultra is Google DeepMind's third-generation flagship large language model, succeeding the Gemini 2.0 Ultra released in late 2025. The model was trained on a vastly expanded dataset that includes proprietary Google Search signals, YouTube video transcripts, and scientific literature aggregated through Google Scholar, giving it a uniquely broad knowledge base that the company says extends robustly through early 2026.",
          "One of the most headline-grabbing features is the native 2-million-token context window, effectively allowing users to feed in entire codebases, multi-hour video files, or thousands of documents in a single prompt. In contrast, GPT-5 launched earlier this year with a 1-million-token context ceiling, and Claude 4 Opus sits at 500,000 tokens in its standard configuration. Google claims Gemini 3 Ultra maintains near-perfect recall across that full context length, a claim that independent researchers are already beginning to stress-test.",
          "Beyond raw context length, Gemini 3 Ultra ships with native video generation capabilities integrated directly into the model's architecture rather than bolted on as a separate diffusion module. Users of Gemini Advanced can now prompt the model in natural language to produce short video clips up to 60 seconds in length, a feature Google is branding as 'VideoGen inline.' The company says this makes Gemini 3 Ultra the first frontier model to unify text, image understanding, image generation, audio, and video generation in a single model call."
        ]
      },
      {
        "h2": "Benchmark Performance and How It Compares to Rivals",
        "paragraphs": [
          "Google published its full technical report alongside the launch, and the numbers are striking. Gemini 3 Ultra scores 92.4% on the MMLU Pro benchmark, outperforming GPT-5's reported 89.7% and Claude 4 Opus's 90.1%. On the newly adopted MATH-500 benchmark, Gemini 3 Ultra achieves 96.8% accuracy, which Google describes as approaching 'saturation' on the test. The model also posts a 78.3% pass rate on LiveCodeBench, a real-world coding evaluation that draws problems from competitive programming contests published after most model training cutoffs.",
          "Independent AI safety and evaluation nonprofit HELM released its own early third-party assessment on June 28, largely corroborating Google's internal numbers while flagging some nuance. HELM noted that Gemini 3 Ultra's advantage over GPT-5 narrows considerably on tasks requiring multi-step logical deduction across very long contexts, suggesting that the 2-million-token window may introduce subtle degradation on complex reasoning chains that does not appear in shorter evaluations. OpenAI was quick to amplify the HELM caveat on social media, calling it evidence that 'raw context length is not the same as usable context length.'",
          "In the agentic capability category, Gemini 3 Ultra sets a new record on the WebArena-Live benchmark with a 61.2% task completion rate, besting the previous record of 54.8% held by GPT-5 with its operator tool-calling layer. Google attributes this performance to a new internal architecture feature called 'Planner-Executor Decoupling,' which separates the model's high-level goal planning from its step-by-step action execution, reducing compounding errors in long-horizon tasks. Analysts say this agentic performance gap could be the most commercially significant differentiator as enterprises build automated workflows."
        ]
      },
      {
        "h2": "Pricing, Availability, and Enterprise Rollout",
        "paragraphs": [
          "Gemini 3 Ultra is available immediately through Google's Gemini Advanced subscription tier, priced at $29.99 per month, unchanged from the Gemini 2.0 Ultra tier it replaces. Enterprise customers on Google Workspace Business and Enterprise plans gain access through the Gemini for Workspace add-on, which is now bundled into the Enterprise Plus tier at no additional cost — a deliberate move that analysts say is designed to accelerate adoption inside corporate environments already running on Google infrastructure.",
          "API access via Google AI Studio and Vertex AI is live as of June 26, with pricing set at $18 per million input tokens and $54 per million output tokens for the Ultra tier. The 2-million-token context window is billed proportionally, making very long context calls significantly more expensive than standard interactions. Google is offering a 'context caching' feature that stores frequently referenced documents server-side, reducing effective costs for applications that repeatedly reference the same large documents by up to 75%, a pricing mechanic similar to the one Anthropic introduced for Claude 3.5.",
          "Regional availability at launch covers the United States, Canada, the United Kingdom, the European Union, Japan, South Korea, Australia, and India. Google has committed to expanding to an additional 40 countries by the end of Q3 2026. Notably, the VideoGen inline feature is initially restricted to U.S. and UK users only while the company works through content policy reviews in other jurisdictions. Enterprise customers in regulated industries such as healthcare and finance can opt into a 'data residency' mode that ensures all processing occurs within their specified geographic boundary, a compliance feature that competitors have been slower to offer at this scale."
        ]
      },
      {
        "h2": "Industry Reaction and Competitive Implications",
        "paragraphs": [
          "The reception from the developer community has been enthusiastic, with Gemini 3 Ultra trending on GitHub within hours of the API going live. Several high-profile open-source projects, including the LangChain and LlamaIndex frameworks, pushed compatibility updates by the evening of June 26. Early builders on X and Hacker News were particularly vocal about the 2-million-token window unlocking use cases previously impossible with any commercial model, including loading entire enterprise knowledge bases or full legal case histories into a single session without chunking or retrieval-augmented generation pipelines.",
          "OpenAI and Anthropic have responded, each in their own way. OpenAI quietly updated its GPT-5 documentation to emphasize retrieval quality over raw context length and announced a 'GPT-5 Pro' update scheduled for July that will introduce enhanced agentic tool use. Anthropic, for its part, sent a note to Claude enterprise customers on June 27 highlighting Claude 4 Opus's lead in safety evaluations and its lower hallucination rate on factual benchmarks, a metric where Gemini models have historically lagged. Neither company announced immediate feature releases in direct response, though few observers expect that to last long given the pace of competition in 2026.",
          "Venture capital and market analysts have taken note of the strategic timing. Google's release comes just two weeks before its annual Google Cloud Next partner conference, where the company is expected to announce deeper integrations between Gemini 3 Ultra and its suite of enterprise products including BigQuery, Workspace, and the newly branded Google Agentspace platform. Wedbush analyst Dan Ives described the launch as 'Google's clearest signal yet that it intends to lead the enterprise AI market in the second half of 2026,' while noting that the bundling of Gemini 3 Ultra into Workspace Enterprise Plus creates significant competitive pressure on Microsoft Copilot and its GPT-5 powered integrations."
        ]
      },
      {
        "h2": "Safety Evaluations, Known Limitations, and What Comes Next",
        "paragraphs": [
          "Google's technical report devotes 40 pages to safety evaluations conducted in partnership with third-party red-teaming firms including Anthropic alumni startup Redwood Research and cybersecurity firm Trail of Bits. The model underwent evaluations across 14 risk categories, including CBRN uplift risk, autonomous replication, and persuasion capability. Google reports that Gemini 3 Ultra falls below the threshold for 'high risk' on all 14 categories using the Frontier Safety Framework scoring rubric, which Google co-authored with several other frontier labs in early 2026. The model does, however, score higher on persuasion capability than its predecessor, a finding Google says is being actively monitored.",
          "Known limitations disclosed in the technical report include occasional factual confabulation on very recent events occurring after the model's knowledge cutoff of March 2026, reduced performance on low-resource languages outside the top 50 by web prevalence, and a tendency toward verbosity in responses when given ambiguous instructions. The VideoGen inline feature currently caps resolution at 720p and does not support audio generation, though Google has signaled both will be addressed in a point release expected in August 2026. Developers have also noted that the model's default refusals on certain creative writing tasks are more conservative than competing models, which some users have described as a friction point.",
          "Looking ahead, Google has confirmed that a 'Gemini 3 Nano' variant optimized for on-device inference on Pixel and Android OEM hardware is in the pipeline for a fall 2026 reveal, likely timed to coincide with the Pixel 10 launch. A 'Gemini 3 Flash' mid-tier model is also expected to replace the current Gemini 2.0 Flash in the API, promising dramatically lower latency and cost for high-volume applications. Internally, Google DeepMind is reportedly already in early training runs for what would become Gemini 4, though no public timeline has been disclosed. For now, the industry's attention is firmly fixed on whether Gemini 3 Ultra's benchmark dominance translates into real-world adoption gains when developers begin deploying it in production over the coming weeks."
        ]
      }
    ],
    "faqs": [
      {
        "question": "When was Gemini 3 Ultra officially released?",
        "answer": "Google officially released Gemini 3 Ultra on June 26, 2026, making it available simultaneously to Gemini Advanced subscribers and enterprise API customers via Google AI Studio and Vertex AI."
      },
      {
        "question": "How does Gemini 3 Ultra's context window compare to GPT-5 and Claude 4 Opus?",
        "answer": "Gemini 3 Ultra offers a 2-million-token context window as standard, compared to GPT-5's 1-million-token limit and Claude 4 Opus's 500,000-token maximum. Google claims near-perfect recall across the full 2-million-token window, though independent evaluators have flagged some degradation on complex multi-step reasoning over very long contexts."
      },
      {
        "question": "What is the VideoGen inline feature in Gemini 3 Ultra?",
        "answer": "VideoGen inline is a native video generation capability built directly into Gemini 3 Ultra's architecture, allowing users to generate short video clips up to 60 seconds in length through a natural language prompt within a standard model call. At launch it supports up to 720p resolution without audio and is available only to users in the United States and United Kingdom while Google completes content policy reviews in other regions."
      },
      {
        "question": "How much does Gemini 3 Ultra cost for API access?",
        "answer": "API access to Gemini 3 Ultra is priced at $18 per million input tokens and $54 per million output tokens through Google AI Studio and Vertex AI. Google also offers a context caching feature that can reduce costs by up to 75% for applications that repeatedly reference the same large documents. Consumer access is included in the Gemini Advanced subscription at $29.99 per month."
      },
      {
        "question": "Is Gemini 3 Ultra available globally?",
        "answer": "At launch, Gemini 3 Ultra is available in the United States, Canada, the United Kingdom, the European Union, Japan, South Korea, Australia, and India. Google has committed to expanding to an additional 40 countries before the end of Q3 2026. The VideoGen inline feature is currently restricted to the U.S. and UK only pending content policy reviews in other jurisdictions."
      }
    ]
  },

  {
    "slug": "ai-tools-weekly-news-june-29-2026",
    "title": "AI Weekly: Major Model Drops & Pricing Wars Heat Up",
    "metaTitle": "AI Tools Weekly News Roundup – June 29, 2026",
    "metaDescription": "This week in AI: OpenAI, Anthropic, Google, and Meta all made major moves with new model releases, pricing cuts, and product announcements. Full roundup inside.",
    "date": "2026-06-29",
    "category": "Weekly Roundup",
    "badge": "Weekly Roundup",
    "summary": "The last week of June 2026 proved to be one of the most competitive stretches in AI history, with OpenAI, Anthropic, Google DeepMind, and Meta all racing to outmaneuver one another with new model launches, aggressive pricing changes, and bold product expansions. From frontier reasoning models to consumer-facing AI assistants getting major upgrades, the industry showed no signs of slowing down heading into Q3. Here is everything you need to know from the past seven days.",
    "sections": [
      {
        "h2": "OpenAI Launches GPT-5 Turbo With Aggressive New Pricing",
        "paragraphs": [
          "OpenAI made waves on June 23, 2026, officially releasing GPT-5 Turbo, a distilled and optimized variant of its flagship GPT-5 model that the company claims delivers 94% of GPT-5's benchmark performance at roughly one-third of the cost. The new model is priced at $1.50 per million input tokens and $4.00 per million output tokens via the API, undercutting GPT-5's previous rate of $5.00 and $15.00 respectively. The move is widely interpreted as a direct response to Anthropic's Claude 3.7 Sonnet, which had been gaining significant enterprise market share throughout Q2.",
          "GPT-5 Turbo is also being rolled out natively inside ChatGPT as the default model for Plus subscribers at $20 per month, replacing GPT-4o in that tier. OpenAI CEO Sam Altman announced on X that the company will keep GPT-4o available in a legacy access tier for users who prefer it, though it will no longer receive feature updates after July 31, 2026. Benchmark results shared by OpenAI show GPT-5 Turbo scoring 87.4 on MMLU, 72.1 on MATH-500, and achieving a new high of 63.2 on the GPQA Diamond set, outperforming all previously released models in its price bracket.",
          "Enterprise and API customers received immediate access starting June 23, while the broader ChatGPT rollout is expected to complete globally by July 5, 2026. OpenAI also confirmed that GPT-5 Turbo supports a 256K context window and includes native tool use, structured outputs, and real-time web search as built-in capabilities — features that previously required additional configuration. Industry analysts at Andreessen Horowitz described the release as 'a significant commoditization inflection point,' predicting it will force competitors to accelerate their own pricing adjustments within 60 days."
        ]
      },
      {
        "h2": "Anthropic Unveils Claude 4 Opus and Expands Claude.ai Features",
        "paragraphs": [
          "Not to be outdone, Anthropic used its annual developer summit on June 25, 2026 to announce Claude 4 Opus, its most capable model to date and the first in the Claude 4 family. The company describes Claude 4 Opus as a 'frontier-class reasoning model' with extended thinking capabilities that can spend up to 30 minutes working through complex multi-step problems before generating a response. Early access benchmarks shared by Anthropic show the model achieving a 91.2 on MMLU and a remarkable 79.8 on GPQA Diamond, which the company says represents the highest score any publicly released model has achieved on that dataset as of June 2026.",
          "Claude 4 Opus is initially available only through the Claude.ai Pro plan at $20 per month and through the API at $18.00 per million input tokens and $54.00 per million output tokens, reflecting its position as a premium frontier offering. Anthropic also simultaneously launched Claude 4 Sonnet at $3.00 per million input tokens and $9.00 per million output tokens, targeting the mid-tier enterprise use case. The company said Claude 4 Haiku, the lightweight and fastest variant, will arrive in late July 2026 and is expected to be priced below $0.50 per million input tokens, matching or undercutting GPT-5 Turbo in the value tier.",
          "Alongside the model announcements, Anthropic shipped several major updates to Claude.ai, including a persistent Projects memory system that allows Claude to remember context across all conversations within a workspace — a feature that had been in beta since March 2026. The platform also introduced Claude Artifacts 2.0, an enhanced version of its interactive code and document generation feature that now supports real-time collaborative editing with up to five users simultaneously. Anthropic's VP of Product, Zack Witten, described the summit announcements as 'the beginning of Claude's transition from a chat interface to a full collaborative intelligence platform.'"
        ]
      },
      {
        "h2": "Google DeepMind's Gemini 2.5 Ultra Goes GA, Veo 3 Expands Access",
        "paragraphs": [
          "Google DeepMind announced on June 24, 2026 that Gemini 2.5 Ultra has officially exited preview and is now generally available to all Google AI Studio users and enterprise customers via Vertex AI. The model, which first appeared in limited preview in April 2026, features a native 1 million token context window — the largest of any commercially available model — and supports multimodal inputs including text, images, audio, video, and documents simultaneously in a single prompt. Google confirmed API pricing for Gemini 2.5 Ultra at $3.50 per million input tokens and $10.50 per million output tokens, a 15% reduction from its preview pricing that positions it competitively against Claude 4 Sonnet.",
          "Google also made a significant consumer-side announcement by expanding Veo 3, its text-to-video generation model, to all Google One AI Premium subscribers in the United States, United Kingdom, Canada, and Australia. Veo 3, which had been limited to a small waitlist since its debut at Google I/O 2026 in May, can now generate video clips up to 60 seconds in length at 1080p resolution with synchronized AI-generated audio. The expansion was accompanied by a new Veo 3 Fast variant available in Google Workspace, designed for quicker turnaround on shorter clips for business presentations and marketing materials.",
          "In a further competitive move, Google updated its Gemini app on Android and iOS to integrate Gemini 2.5 Ultra as the default model for all Google One AI Premium subscribers, who pay $19.99 per month. The app update also introduced a new 'Deep Research Pro' mode powered by Gemini 2.5 Ultra that can autonomously browse the web, synthesize findings across dozens of sources, and produce structured research reports with citations in under five minutes. Google's SVP of AI Products, Sissie Hsiao, stated in a blog post that over 35 million users are now active monthly on the Gemini platform, up from 22 million reported in January 2026."
        ]
      },
      {
        "h2": "Meta Releases Llama 4 Scout and Maverick in Open Weights Format",
        "paragraphs": [
          "Meta made its biggest open-source AI move of 2026 on June 26, releasing two new members of its Llama 4 family — Llama 4 Scout and Llama 4 Maverick — as fully open weights models available for download on Hugging Face and Meta's AI portal. Llama 4 Scout is a 17-billion active parameter model using a mixture-of-experts architecture with a 10 million token context window, which Meta claims is the largest context window ever shipped in an open weights model. Llama 4 Maverick is a larger 400-billion parameter MoE model with 128 billion active parameters, designed for users and enterprises who need frontier-level performance without the cost of closed-source API access.",
          "Benchmark results published by Meta show Llama 4 Maverick outperforming GPT-4o and Claude 3.7 Sonnet on several standard evaluations, including MMLU (88.6), HumanEval (79.1), and MATH-500 (73.2), placing it among the most capable open-source models ever released. Meta CEO Mark Zuckerberg called the launch 'the most important open-source AI release in the company's history' and framed it as a deliberate strategic effort to prevent proprietary AI companies from locking up intelligence behind expensive APIs. Both models are released under the Llama 4 Community License, which permits commercial use for applications with fewer than 700 million monthly active users.",
          "The release immediately sent ripples through the developer and enterprise communities, with Hugging Face reporting over 180,000 downloads of Llama 4 Maverick within the first 24 hours of availability — breaking the previous record set by Llama 3.1 405B. Several AI infrastructure providers including Together AI, Groq, and Fireworks AI announced same-day hosted inference support, with Groq offering Llama 4 Maverick at $0.20 per million input tokens leveraging its LPU hardware — dramatically below any comparable closed-source alternative. The open-weights release is expected to accelerate fine-tuning and specialization across industries including healthcare, legal, and financial services throughout the second half of 2026."
        ]
      },
      {
        "h2": "Cursor, Perplexity, and Midjourney Drop Significant Product Updates",
        "paragraphs": [
          "AI coding tool Cursor shipped version 0.50 on June 27, 2026, introducing its most requested feature to date: Cursor Background Agent, an autonomous coding agent that can execute long-running development tasks in a sandboxed cloud environment without requiring the user to keep the application open. The agent can clone repositories, run tests, fix failing builds, and open pull requests on GitHub autonomously, with users receiving notifications upon task completion. Cursor also announced it has surpassed 3 million paying subscribers as of June 2026, up from 1.2 million reported in January, making it one of the fastest-growing developer tools in history by revenue trajectory.",
          "Perplexity AI launched Perplexity Deep Research Pro on June 24, 2026, a premium research feature available exclusively to its $20-per-month Pro subscribers that can execute research tasks lasting up to 45 minutes, browsing hundreds of sources and generating publication-ready reports with inline citations and structured data visualizations. The company also quietly updated its API to include access to Perplexity's proprietary Sonar Pro Large model, priced at $1.00 per million tokens for online-enabled search queries. Perplexity also confirmed a new partnership with Marriott International to deploy its AI search inside Marriott's hotel booking and concierge platforms, marking one of the largest hospitality AI deployments announced to date.",
          "Midjourney made headlines on June 25, 2026 by releasing Midjourney V7 Web, a major redesign of its web interface that for the first time brings the full image generation experience out of Discord and into a standalone browser application with a polished UI. V7 Web includes a new 'Style Tuner Pro' feature that allows users to create, save, and share custom visual style profiles derived from their own image libraries, and a new video-to-image feature that extracts keyframes from uploaded video clips to use as generation references. Midjourney CEO David Holz announced that the web platform already has over 800,000 registered users from its first week of open beta access, and teased that Midjourney Video, a text-to-video product, will enter closed beta by August 2026."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is GPT-5 Turbo and how much does it cost via the API?",
        "answer": "GPT-5 Turbo is OpenAI's optimized and lower-cost variant of its flagship GPT-5 model, released on June 23, 2026. It is priced at $1.50 per million input tokens and $4.00 per million output tokens via the API, making it significantly cheaper than full GPT-5. It is also the new default model for ChatGPT Plus subscribers at $20 per month and features a 256K context window with native web search and tool use."
      },
      {
        "question": "What did Anthropic announce at its June 2026 developer summit?",
        "answer": "Anthropic announced Claude 4 Opus and Claude 4 Sonnet at its developer summit on June 25, 2026. Claude 4 Opus is the company's most capable model yet, priced at $18 per million input tokens, with extended thinking capabilities and an GPQA Diamond score of 79.8. Anthropic also launched Claude Artifacts 2.0 with real-time collaborative editing and a persistent Projects memory system inside Claude.ai."
      },
      {
        "question": "Is Google's Gemini 2.5 Ultra now publicly available and what does it cost?",
        "answer": "Yes, Gemini 2.5 Ultra became generally available on June 24, 2026, after exiting preview. It is accessible through Google AI Studio and Vertex AI, priced at $3.50 per million input tokens and $10.50 per million output tokens — a 15% price reduction from its preview pricing. It features a 1 million token context window and supports multimodal inputs including text, images, audio, and video."
      },
      {
        "question": "What are Meta's Llama 4 Scout and Maverick models, and can they be used commercially?",
        "answer": "Llama 4 Scout and Llama 4 Maverick are open-weights AI models released by Meta on June 26, 2026. Scout is a 17B active parameter model with a 10 million token context window, while Maverick is a 400B parameter mixture-of-experts model with 128B active parameters targeting frontier performance. Both are released under the Llama 4 Community License, which allows commercial use for products with fewer than 700 million monthly active users."
      },
      {
        "question": "What is the Cursor Background Agent and when was it released?",
        "answer": "The Cursor Background Agent is an autonomous coding feature released with Cursor version 0.50 on June 27, 2026. It allows the AI coding assistant to execute long-running development tasks — such as fixing bugs, running tests, and opening pull requests on GitHub — in a sandboxed cloud environment without requiring the user to keep the application open. Users receive notifications when tasks are completed, enabling a fully asynchronous development workflow."
      }
    ]
  },

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
