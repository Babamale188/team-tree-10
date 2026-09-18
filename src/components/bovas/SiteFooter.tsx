import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { BovasLogo } from "./BovasLogo";
import { NAV_GROUPS } from "./SiteHeader";

const LEGAL = [
  { label: "Privacy Policy", slug: "privacy-policy" },
  { label: "Terms of Use", slug: "terms-of-use" },
  { label: "Cookie Policy", slug: "cookie-policy" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute inset-0 bovas-diagonals opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(5,minmax(0,1fr))]">
          <div className="max-w-xs">
            <BovasLogo />
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Connecting talent with opportunity.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <a href="mailto:hello@bovastalent.com" className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-bright" /> hello@bovastalent.com
              </a>
              <a href="tel:+441234567890" className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-bright" /> +44 (0) 1234 567 890
              </a>
            </div>
          </div>

          {NAV_GROUPS.map((col) => (
            <div key={col.label}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">{col.label}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      params={l.params}
                      className="text-sm text-white/65 transition-colors hover:text-bright"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">© 2024 BovasTalent. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <li key={l.slug}>
                <Link
                  to="/legal/$slug"
                  params={{ slug: l.slug }}
                  className="text-xs text-white/55 transition-colors hover:text-bright"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
