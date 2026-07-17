// lib/auth.ts

import { createHmac, timingSafeEqual } from "crypto";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET environment variable is not set");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(): string {
  const expiry = (Date.now() + SESSION_DURATION_MS).toString();
  const signature = sign(expiry);
  return `${expiry}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;

  const expectedSignature = sign(expiry);

  // Constant-time comparison — prevents timing attacks from leaking
  // how much of the signature an attacker guessed correctly.
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  return Number(expiry) > Date.now();
}

export function verifyPassword(input: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD environment variable is not set");
  }

  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(adminPassword);
  if (inputBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(inputBuffer, expectedBuffer);
}
