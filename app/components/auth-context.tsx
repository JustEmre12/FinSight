"use client";

// MOCK authentication (FR-01). No password is sent anywhere or stored: accounts
// are just email addresses saved in this browser's localStorage. Asad's backend
// will replace this with real, secure sign-up/login (issues #35, #44). Keep the
// same `useAuth()` shape so pages do not need to change.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@/lib/types";

const USERS_KEY = "finsight.mock.users";
const SESSION_KEY = "finsight.mock.session";

export type AuthResult = { ok: true } | { ok: false; message: string };

interface AuthContextValue {
  user: User | null;
  /** False until the saved session has been read in the browser. */
  ready: boolean;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  logIn: (email: string, password: string) => Promise<AuthResult>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): Record<string, User> {
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "{}") as Record<string, User>;
  } catch {
    return {};
  }
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const email = window.localStorage.getItem(SESSION_KEY);
    // Reading localStorage is only possible after the first render in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(email ? (readUsers()[email] ?? null) : null);
    setReady(true);
  }, []);

  const startSession = useCallback((u: User) => {
    window.localStorage.setItem(SESSION_KEY, u.email);
    setUser(u);
  }, []);

  const signUp = useCallback(
    async (rawEmail: string, password: string): Promise<AuthResult> => {
      const email = rawEmail.trim().toLowerCase();
      if (!EMAIL_PATTERN.test(email)) return { ok: false, message: "Enter a valid email address, like name@example.com." };
      if (password.length < MIN_PASSWORD_LENGTH)
        return { ok: false, message: `Your password needs at least ${MIN_PASSWORD_LENGTH} characters.` };
      const users = readUsers();
      if (users[email]) return { ok: false, message: "An account with this email already exists. Try logging in instead." };
      const newUser: User = { id: crypto.randomUUID(), email, createdAt: new Date().toISOString() };
      users[email] = newUser;
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
      startSession(newUser);
      return { ok: true };
    },
    [startSession],
  );

  const logIn = useCallback(
    async (rawEmail: string, password: string): Promise<AuthResult> => {
      const email = rawEmail.trim().toLowerCase();
      if (!EMAIL_PATTERN.test(email) || password.length === 0)
        return { ok: false, message: "Enter your email address and password." };
      const existing = readUsers()[email];
      if (!existing) return { ok: false, message: "We couldn't find an account with that email. Check it, or sign up first." };
      startSession(existing);
      return { ok: true };
    },
    [startSession],
  );

  const logOut = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, ready, signUp, logIn, logOut }), [user, ready, signUp, logIn, logOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>.");
  return ctx;
}
