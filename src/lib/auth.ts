import { SESSION_COOKIE_NAME } from "@/lib/constants";

const encoder = new TextEncoder();
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function getRequiredEnv(name: "APP_PIN_HASH" | "APP_PIN_SALT" | "SESSION_SECRET"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return bytesToHex(new Uint8Array(digest));
}

async function createHmacSignature(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

function safeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

export async function verifyPin(pin: string): Promise<boolean> {
  const pinHash = getRequiredEnv("APP_PIN_HASH");
  const pinSalt = getRequiredEnv("APP_PIN_SALT");
  const candidateHash = await sha256Hex(`${pinSalt}:${pin}`);

  return safeEqual(candidateHash, pinHash);
}

export async function createSessionToken(): Promise<string> {
  const sessionSecret = getRequiredEnv("SESSION_SECRET");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `v1.${expiresAt}`;
  const signature = await createHmacSignature(payload, sessionSecret);

  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }

  const [version, expiresAtRaw, signature] = token.split(".");

  if (version !== "v1" || !expiresAtRaw || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const sessionSecret = getRequiredEnv("SESSION_SECRET");
  const expectedSignature = await createHmacSignature(`v1.${expiresAt}`, sessionSecret);

  return safeEqual(signature, expectedSignature);
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}
