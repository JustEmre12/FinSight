"use client";

// Shared sign-up / log-in form (FR-01). Uses the MOCK auth context for now.

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MIN_PASSWORD_LENGTH, useAuth } from "./auth-context";
import { Notice } from "./notice";

/** Only allow redirects to pages on this site. */
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/watchlist";
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { signUp, logIn } = useAuth();
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === "signup";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    if (isSignup && password !== String(data.get("confirm") ?? "")) {
      setError("The two passwords don't match. Please type them again.");
      return;
    }
    setSubmitting(true);
    const result = isSignup ? await signUp(email, password) : await logIn(email, password);
    setSubmitting(false);
    if (result.ok) router.push(next);
    else setError(result.message);
  }

  const field = "min-h-11 w-full rounded-md border border-slate-400 bg-white px-3 text-base aria-[invalid=true]:border-red-700";
  const otherHref = `${isSignup ? "/login" : "/signup"}?next=${encodeURIComponent(next)}`;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">{isSignup ? "Create your account" : "Log in"}</h1>
      <Notice tone="info" title="Demo sign-in">
        <p>
          Accounts are only saved in this browser so the watchlist can be tested. Passwords are not checked, sent or
          stored. Real, secure accounts will come with the backend.
        </p>
      </Notice>

      <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        {error && (
          <div id="auth-error">
            <Notice tone="error" title="Please check the form" live>
              <p>{error}</p>
            </Notice>
          </div>
        )}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!error} aria-describedby={error ? "auth-error" : undefined} className={field} />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            aria-invalid={!!error}
            aria-describedby={isSignup ? "password-hint" : undefined}
            className={field}
          />
          {isSignup && (
            <p id="password-hint" className="text-sm text-muted">
              At least {MIN_PASSWORD_LENGTH} characters.
            </p>
          )}
        </div>
        {isSignup && (
          <div className="space-y-1">
            <label htmlFor="confirm" className="block text-sm font-medium">
              Confirm password
            </label>
            <input id="confirm" name="confirm" type="password" autoComplete="new-password" required aria-invalid={!!error} className={field} />
          </div>
        )}
        <button type="submit" disabled={submitting} className="min-h-11 w-full rounded-md bg-brand font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
          {isSignup ? "Sign up" : "Log in"}
        </button>
      </form>

      <p className="text-sm">
        {isSignup ? "Already have an account? " : "New to FinSight? "}
        <Link href={otherHref} className="font-medium text-brand underline">
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
