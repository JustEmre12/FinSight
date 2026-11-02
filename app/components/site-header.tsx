"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./auth-context";

const NAV = [
  { href: "/", label: "Search" },
  { href: "/compare", label: "Compare" },
  { href: "/watchlist", label: "Watchlist" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user, ready, logOut } = useAuth();

  const isActive = (href: string) => (href === "/" ? pathname === "/" || pathname.startsWith("/search") : pathname.startsWith(href));

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand-dark">
          FinSight
        </Link>
        <nav aria-label="Main" className="order-3 w-full sm:order-none sm:w-auto">
          <ul className="flex gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 aria-[current=page]:bg-blue-50 aria-[current=page]:text-brand-dark aria-[current=page]:underline aria-[current=page]:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex min-h-10 items-center gap-2 text-sm">
          {!ready ? null : user ? (
            <>
              <span className="hidden text-muted md:inline">
                Signed in as <span className="font-medium text-ink">{user.email}</span>
              </span>
              <button
                type="button"
                onClick={logOut}
                className="rounded-md border border-slate-300 px-3 py-2 font-medium hover:bg-slate-100"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-md px-3 py-2 font-medium text-brand hover:bg-slate-100">
                Log in
              </Link>
              <Link href="/signup" className="rounded-md bg-brand px-3 py-2 font-medium text-white hover:bg-brand-dark">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
