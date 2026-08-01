import { NextRequest, NextResponse } from "next/server";
import { getSupportDb } from "./support-db";

export const SESSION_COOKIE = "gby_session";
const SESSION_DAYS = 30;
const PASSWORD_ITERATIONS = 210_000;

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function randomToken(size = 32): string {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
}

function toDatabaseDate(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function parseDatabaseDate(value: string): number {
  return Date.parse(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
}

async function digest(value: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toBase64Url(new Uint8Array(hash));
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value) && value.length <= 254;
}

export function validPassword(value: string): boolean {
  return value.length >= 10 && value.length <= 128;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: PASSWORD_ITERATIONS },
    key,
    256,
  );
  return `pbkdf2_sha256$${PASSWORD_ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(new Uint8Array(bits))}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, iterationsValue, saltValue, expectedValue] = stored.split("$");
  const iterations = Number(iterationsValue);
  if (algorithm !== "pbkdf2_sha256" || !Number.isSafeInteger(iterations) || iterations < 100_000) {
    return false;
  }

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const bits = new Uint8Array(
      await crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          hash: "SHA-256",
          salt: fromBase64Url(saltValue).slice().buffer as ArrayBuffer,
          iterations,
        },
        key,
        256,
      ),
    );
    const expected = fromBase64Url(expectedValue);
    if (bits.length !== expected.length) return false;

    let difference = 0;
    for (let index = 0; index < bits.length; index += 1) {
      difference |= bits[index] ^ expected[index];
    }
    return difference === 0;
  } catch {
    return false;
  }
}

export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

export async function getSessionUser(request: NextRequest): Promise<SessionUser | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = await getSupportDb()
    .prepare(
      `SELECT users.id, users.name, users.email, users.role
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token_hash = ? AND sessions.expires_at > datetime('now')`,
    )
    .bind(await digest(token))
    .first<SessionUser>();

  return row ?? null;
}

export async function createSession(userId: string): Promise<{ token: string; expires: Date }> {
  const token = randomToken();
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const database = getSupportDb();

  await database.batch([
    database.prepare("DELETE FROM sessions WHERE expires_at <= datetime('now')"),
    database
      .prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
      .bind(await digest(token), userId, toDatabaseDate(expires)),
  ]);

  return { token, expires };
}

export function setSessionCookie(
  response: NextResponse,
  session: { token: string; expires: Date },
): void {
  response.cookies.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: session.expires,
    priority: "high",
  });
}

export async function deleteSession(request: NextRequest): Promise<void> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) {
    await getSupportDb().prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await digest(token)).run();
  }
}

export async function checkRateLimit(
  request: NextRequest,
  scope: string,
  identity: string,
  limit: number,
): Promise<boolean> {
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "local";
  const attemptKey = await digest(`${scope}|${identity}|${ip.split(",")[0].trim()}`);
  const database = getSupportDb();
  const current = await database
    .prepare(
      `SELECT attempts, window_started_at, blocked_until
       FROM auth_attempts WHERE attempt_key = ?`,
    )
    .bind(attemptKey)
    .first<{ attempts: number; window_started_at: string; blocked_until: string | null }>();

  const now = Date.now();
  if (current?.blocked_until && parseDatabaseDate(current.blocked_until) > now) return false;
  const inWindow = current && parseDatabaseDate(current.window_started_at) > now - 15 * 60 * 1000;
  const attempts = inWindow ? current.attempts + 1 : 1;
  const blockedUntil = attempts > limit ? toDatabaseDate(new Date(now + 15 * 60 * 1000)) : null;

  await database
    .prepare(
      `INSERT INTO auth_attempts (attempt_key, attempts, window_started_at, blocked_until)
       VALUES (?, ?, datetime('now'), ?)
       ON CONFLICT(attempt_key) DO UPDATE SET
         attempts = excluded.attempts,
         window_started_at = CASE
           WHEN auth_attempts.window_started_at <= datetime('now', '-15 minutes') THEN datetime('now')
           ELSE auth_attempts.window_started_at
         END,
         blocked_until = excluded.blocked_until`,
    )
    .bind(attemptKey, attempts, blockedUntil)
    .run();

  return attempts <= limit;
}

export function apiError(message: string, status: number): NextResponse {
  return NextResponse.json({ ok: false, message }, { status });
}
