import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aitoolduel.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/compare/chatgpt-vs-claude`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/gemini-vs-chatgpt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/github-copilot-vs-cursor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/midjourney-vs-dalle`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/perplexity-vs-google`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/claude-vs-gemini`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/chatgpt-vs-google`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/cursor-vs-github-copilot`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/elevenlabs-vs-adobe-firefly`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/canva-ai-vs-adobe-firefly`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/claude-code-vs-codex`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/grok-vs-chatgpt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/deepseek-vs-chatgpt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/claude-opus-47-vs-gpt54`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/llama-vs-chatgpt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/gpt-4o-vs-claude-sonnet-4`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/chatgpt-vs-meta-ai`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/perplexity-vs-chatgpt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/best-ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/prompt-generator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/ai-detector`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },    { url: `${baseUrl}/compare/gemini-vs-grok`, lastModified: new Date() },    { url: `${baseUrl}/news/ai-tools-weekly-roundup-june-29-2026`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },    { url: `${baseUrl}/compare/claude-vs-gpt-4o`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },    { url: `${baseUrl}/news/ai-tool-news-weekly-roundup-june-29-2026`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },    { url: `${baseUrl}/compare/notion-ai-vs-chatgpt`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },    { url: `${baseUrl}/news/ai-tools-weekly-news-june-29-2026`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },    { url: `${baseUrl}/compare/copilot-vs-chatgpt`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },    { url: `${baseUrl}/compare/perplexity-vs-claude`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },    { url: `${baseUrl}/compare/runway-vs-pika`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },    { url: `${baseUrl}/compare/jasper-vs-chatgpt`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },    { url: `${baseUrl}/news/gemini-3-ultra-release-june-2026`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },    { url: `${baseUrl}/compare/grammarly-vs-chatgpt`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },













  ]
}
