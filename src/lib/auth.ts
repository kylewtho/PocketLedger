/**
 * Simple PIN-based authentication utilities.
 *
 * Uses the Web Crypto API (available in Node.js 18+, Edge runtime, and browsers)
 * so the same code works in both middleware and server components.
 *
 * TODO: Replace with full user authentication (e.g. NextAuth.js) when
 *       multi-user support or social/SSO login is needed.
 */

export const SESSION_COOKIE = "pl_session";

/** Session lifetime: 7 days */
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requireSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET environment variable is not set");
  return secret;
}

async function getHmacKey(secret: string, usages: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usages
  );
}

function hexToBytes(hex: string): ArrayBuffer {
  if (hex.length % 2 !== 0) return new ArrayBuffer(0);
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes.buffer as ArrayBuffer;
}

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── PIN Hashing ──────────────────────────────────────────────────────────────

/**
 * Hash a PIN with HMAC-SHA256 using SESSION_SECRET.
 *
 * Run this once to generate the PIN_HASH value for your .env.local:
 *   node -e "require('./src/lib/auth').hashPin('YOUR_PIN').then(h => console.log('PIN_HASH=' + h))"
 */
export async function hashPin(pin: string): Promise<string> {
  const key = await getHmacKey(requireSecret(), ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(pin));
  return bytesToHex(sig);
}

/**
 * Verify a PIN attempt against the stored PIN_HASH env variable.
 * Uses SubtleCrypto.verify() for constant-time comparison.
 */
export async function verifyPin(pin: string): Promise<boolean> {
  const stored = process.env.PIN_HASH;
  if (!stored || !process.env.SESSION_SECRET) return false;
  try {
    const key = await getHmacKey(requireSecret(), ["verify"]);
    const storedBytes = hexToBytes(stored);
    if (storedBytes.byteLength === 0) return false;
    return crypto.subtle.verify(
      "HMAC",
      key,
      storedBytes,
      new TextEncoder().encode(pin)
    );
  } catch {
    return false;
  }
}

// ─── Session Tokens ───────────────────────────────────────────────────────────

/** Create a signed session token: `<timestamp>.<hmac>` */
export async function createSessionToken(): Promise<string> {
  const payload = Date.now().toString();
  const key = await getHmacKey(requireSecret(), ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${bytesToHex(sig)}`;
}

/** Verify a session token — checks HMAC signature and expiry. */
export async function verifySessionToken(token: string): Promise<boolean> {
  if (!process.env.SESSION_SECRET) return false;
  try {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const payload = token.substring(0, dotIndex);
    const sig = token.substring(dotIndex + 1);

    // Check expiry before doing crypto work
    const created = parseInt(payload, 10);
    if (isNaN(created) || Date.now() - created > SESSION_TTL_MS) return false;

    const key = await getHmacKey(requireSecret(), ["verify"]);
    const sigBytes = hexToBytes(sig);
    if (sigBytes.byteLength === 0) return false;

    return crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(payload)
    );
  } catch {
    return false;
  }
}
