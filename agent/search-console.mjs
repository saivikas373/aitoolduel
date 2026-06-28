// Pings Google and Bing to index new URLs immediately after publishing

import https from "https";

const SITE_URL = "https://www.aitoolduel.com";

function ping(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on("error", () => resolve(null));
  });
}

export async function requestIndexing(slug) {
  const pageUrl = `${SITE_URL}/compare/${slug}`;
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;

  // Ping Google with sitemap
  const googleStatus = await ping(
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  );
  console.log(`✅ Google pinged (status: ${googleStatus}): ${pageUrl}`);

  // Ping Bing with sitemap
  const bingStatus = await ping(
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  );
  console.log(`✅ Bing pinged (status: ${bingStatus}): ${pageUrl}`);

  return true;
}

// Test directly
if (process.argv[2] === "--test") {
  await requestIndexing("gemini-vs-grok");
  console.log("✅ Indexing pings sent!");
}
