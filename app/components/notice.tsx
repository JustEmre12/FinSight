// Message box for empty, warning and error states.

type Tone = "info" | "warning" | "error";

const TONES: Record<Tone, string> = {
  info: "border-blue-300 bg-blue-50 text-blue-950",
  warning: "border-amber-400 bg-amber-50 text-amber-950",
  error: "border-red-300 bg-red-50 text-red-950",
};

const ICONS: Record<Tone, string> = { info: "ℹ", warning: "⚠", error: "✕" };

export function Notice({
  tone = "info",
  title,
  children,
  live = false,
}: {
  tone?: Tone;
  title: string;
  children?: React.ReactNode;
  /** Announce to screen readers when the message appears after a user action. */
  live?: boolean;
}) {
  const role = live ? (tone === "error" ? "alert" : "status") : undefined;
  return (
    <div role={role} className={`flex gap-3 rounded-lg border p-4 ${TONES[tone]}`}>
      <span aria-hidden="true" className="mt-0.5 font-bold">
        {ICONS[tone]}
      </span>
      <div className="space-y-1 text-sm">
        <p className="font-semibold">{title}</p>
        {children && <div className="space-y-1">{children}</div>}
      </div>
    </div>
  );
}
