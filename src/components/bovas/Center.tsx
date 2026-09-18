import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

export type Feature = { icon?: LucideIcon; title: string; body: string };

export function FeatureGrid({
  items,
  tone = "dark",
  cols = 3,
}: {
  items: Feature[];
  tone?: "light" | "dark";
  cols?: 2 | 3 | 4;
}) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`mx-auto mt-12 grid max-w-6xl gap-5 ${grid}`}>
      {items.map((f, i) => (
        <Reveal key={f.title} delay={(i % 3) * 80}>
          <div
            className={`flex h-full flex-col items-center rounded-2xl p-7 text-center ${
              tone === "light"
                ? "border border-white/12 bg-white/[0.05] backdrop-blur"
                : "border border-border bg-card"
            }`}
          >
            {f.icon && (
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl ${
                  tone === "light" ? "bovas-gradient text-white" : "bg-softblue text-royal"
                }`}
              >
                <f.icon className="h-5 w-5" />
              </span>
            )}
            <h3 className={`mt-4 text-lg font-bold ${tone === "light" ? "text-white" : "text-navy-900"}`}>{f.title}</h3>
            <p className={`mt-2.5 text-sm leading-relaxed ${tone === "light" ? "text-white/70" : "text-muted-foreground"}`}>
              {f.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function StepGrid({ steps, tone = "light" }: { steps: { n: string; title: string; body: string }[]; tone?: "light" | "dark" }) {
  return (
    <ol className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal key={s.n} delay={i * 90}>
          <li
            className={`h-full rounded-2xl p-7 text-center ${
              tone === "light" ? "border border-white/12 bg-white/[0.05]" : "border border-border bg-card"
            }`}
          >
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-royal text-sm font-extrabold text-white">
              {s.n}
            </span>
            <h3 className={`mt-4 text-lg font-bold ${tone === "light" ? "text-white" : "text-navy-900"}`}>{s.title}</h3>
            <p className={`mt-2.5 text-sm leading-relaxed ${tone === "light" ? "text-white/70" : "text-muted-foreground"}`}>
              {s.body}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export function BulletList({ items, tone = "dark" }: { items: string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
      {items.map((t) => (
        <li
          key={t}
          className={`rounded-2xl px-5 py-4 text-center text-sm leading-relaxed ${
            tone === "light" ? "border border-white/12 bg-white/[0.05] text-white/80" : "border border-border bg-card text-navy-900"
          }`}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
