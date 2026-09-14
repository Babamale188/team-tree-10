import { Link } from "@tanstack/react-router";

export function BovasLogo({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const text = tone === "light" ? "text-white" : "text-navy-900";
  return (
    <Link
      to="/"
      aria-label="BOVAS home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bovas-gradient shadow-[0_6px_18px_-6px_rgba(21,94,239,0.8)] transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M5 19V5h7a4 4 0 0 1 0 8H5" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17.5" cy="16.5" r="2.5" fill="#F4B740" />
        </svg>
      </span>
      <span className={`text-[1.35rem] font-extrabold leading-none tracking-tight ${text}`}>
        BOVAS
      </span>
    </Link>
  );
}
