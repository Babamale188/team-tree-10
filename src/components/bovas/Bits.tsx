import type { ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/bovas/images";

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
        tone === "light"
          ? "bg-white/10 text-skyline ring-1 ring-white/15"
          : "bg-softblue text-royal ring-1 ring-royal/15"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

export function ButtonLink({
  to,
  params,
  children,
  variant = "primary",
  className = "",
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bright focus-visible:ring-offset-2";
  const styles = {
    primary:
      "bg-royal text-white shadow-[0_16px_36px_-16px_rgba(21,94,239,0.9)] hover:bg-bright hover:shadow-[0_20px_44px_-16px_rgba(47,128,255,0.95)]",
    outline:
      "border border-white/30 text-white hover:bg-white/10",
    ghost:
      "border border-navy-900/15 text-navy-900 hover:border-royal hover:text-royal",
  }[variant];
  const L = Link as unknown as ComponentType<Record<string, unknown>>;
  return (
    <L to={to} params={params} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </L>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "dark",
  center = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  tone?: "light" | "dark";
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "dark"}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-base leading-relaxed ${tone === "light" ? "text-white/70" : "text-muted-foreground"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  sub,
  image,
  alt,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  image: string;
  alt: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[620px] items-end overflow-hidden pb-16 pt-28 text-white sm:min-h-[680px] sm:pb-20 sm:pt-32 lg:pb-24">
      <img
        src={img(image, 1800, 1100)}
        alt={alt}
        width={1800}
        height={1100}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/78 to-navy-950/15" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bovas-grid opacity-25" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-[2.15rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{sub}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function ImageTile({
  id,
  alt,
  caption,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  id: string;
  alt: string;
  caption?: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl ${className}`}>
      <img
        src={img(id, 900, 680)}
        alt={alt}
        loading="lazy"
        width={900}
        height={680}
        className={`${ratio} w-full object-cover transition-transform duration-500 hover:scale-[1.03]`}
      />
      {caption && <figcaption className="mt-2 text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
