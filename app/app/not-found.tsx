import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p>We couldn&apos;t find that page.</p>
      <Link href="/" className="font-medium text-brand underline">
        Go to search
      </Link>
    </div>
  );
}
