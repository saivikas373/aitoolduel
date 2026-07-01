import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "saivikasreddy95@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let email: unknown;
  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const subscriberEmail = email.trim().toLowerCase();

  if (!EMAIL_PASS) {
    console.log(`[newsletter] EMAIL_PASS not configured — new signup: ${subscriberEmail}`);
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"AI Tool Duel" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: subscriberEmail,
      subject: "New AI Weekly newsletter signup",
      text: `New subscriber: ${subscriberEmail}\nDate: ${new Date().toISOString()}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] failed to send signup notification:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
