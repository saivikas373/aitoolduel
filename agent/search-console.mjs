// Notifies search engines about new/updated pages.
//
// Google retired the sitemap ping endpoint (google.com/ping?sitemap=) in
// 2023 — it now silently does nothing, so we don't use it. Google has no
// public instant-index API; it discovers new pages via sitemap.xml and
// robots.txt on its own crawl schedule (see app/robots.ts, app/sitemap.ts).
//
// Bing, Yandex, Seznam, and Naver support IndexNow, a real push-based
// protocol, so we use that for immediate submission.

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://www.aitoolduel.com";
const SITE_HOST = "www.aitoolduel.com";
const KEY_FILE = path.join(__dirname, "indexnow-key.txt");

function getIndexNowKey() {
  if (!fs.existsSync(KEY_FILE)) {
    console.log("⚠️  No indexnow-key.txt found — skipping IndexNow submission.");
    return null;
  }
  return fs.readFileSync(KEY_FILE, "utf8").trim();
}

function postJSON(url, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => resolve(res.statusCode)
    );
    req.on("error", () => resolve(null));
    req.write(data);
    req.end();
  });
}

// pagePath should be a site-relative path, e.g. "/compare/foo" or "/news/bar"
export async function requestIndexing(pagePath) {
  const normalizedPath = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  const pageUrl = `${SITE_URL}${normalizedPath}`;

  const key = getIndexNowKey();
  if (key) {
    const status = await postJSON("https://api.indexnow.org/indexnow", {
      host: SITE_HOST,
      key,
      urlList: [pageUrl],
    });
    console.log(`✅ IndexNow submitted (status: ${status}): ${pageUrl}`);
  }

  console.log(`ℹ️  Google has no instant-index API — it will discover ${pageUrl} via sitemap.xml on its normal crawl schedule.`);
  return true;
}

// Test directly
if (process.argv[2] === "--test") {
  await requestIndexing("/compare/gemini-vs-grok");
  console.log("✅ Indexing notification sent!");
}
