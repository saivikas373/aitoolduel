// Adds GitHub Actions secrets via API
import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const envFile = path.join(ROOT, ".env.agent");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = "saivikas373/aitoolduel";
const API = "https://api.github.com";

async function getRepoPublicKey() {
  const res = await fetch(`${API}/repos/${REPO}/actions/secrets/public-key`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" }
  });
  return res.json();
}

async function setSecret(name, value, keyId, keyB64) {
  // Use sodium to encrypt
  const sodium = await import("tweetsodium");
  const key = Buffer.from(keyB64, "base64");
  const messageBytes = Buffer.from(value);
  const encryptedBytes = sodium.default.seal(messageBytes, key);
  const encryptedValue = Buffer.from(encryptedBytes).toString("base64");

  const res = await fetch(`${API}/repos/${REPO}/actions/secrets/${name}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ encrypted_value: encryptedValue, key_id: keyId })
  });

  if (res.status === 201 || res.status === 204) {
    console.log(`✅ Secret set: ${name}`);
  } else {
    const body = await res.text();
    console.log(`⚠️  ${name}: ${res.status} ${body}`);
  }
}

const { key_id, key } = await getRepoPublicKey();

await setSecret("ANTHROPIC_API_KEY", process.env.ANTHROPIC_API_KEY, key_id, key);
await setSecret("GH_TOKEN", GITHUB_TOKEN, key_id, key);
await setSecret("EMAIL_USER", "saivikasreddy95@gmail.com", key_id, key);

console.log("✅ GitHub secrets configured!");
console.log("⚠️  EMAIL_PASS still needs Gmail app password — email alerts will fail until set.");
