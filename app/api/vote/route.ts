import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const KV_CONFIGURED = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function voteKey(slug: string) {
  return `votes:${slug}`;
}

async function getCounts(slug: string) {
  const counts = await kv.hgetall<{ tool1?: number; tool2?: number }>(voteKey(slug));
  return { tool1: Number(counts?.tool1 ?? 0), tool2: Number(counts?.tool2 ?? 0) };
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug." }, { status: 400 });

  if (!KV_CONFIGURED) {
    return NextResponse.json({ configured: false, tool1: 0, tool2: 0 });
  }

  try {
    const counts = await getCounts(slug);
    return NextResponse.json({ configured: true, ...counts });
  } catch (err) {
    console.error("[vote] failed to read counts:", err);
    return NextResponse.json({ configured: false, tool1: 0, tool2: 0 });
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { slug, choice } = (body ?? {}) as { slug?: string; choice?: string };
  if (!slug || (choice !== "tool1" && choice !== "tool2")) {
    return NextResponse.json({ error: "Missing or invalid slug/choice." }, { status: 400 });
  }

  if (!KV_CONFIGURED) {
    return NextResponse.json({ configured: false, tool1: 0, tool2: 0 });
  }

  try {
    await kv.hincrby(voteKey(slug), choice, 1);
    const counts = await getCounts(slug);
    return NextResponse.json({ configured: true, ...counts });
  } catch (err) {
    console.error("[vote] failed to record vote:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
