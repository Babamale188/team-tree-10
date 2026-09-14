import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Facebook, Mail, Phone } from "lucide-react";
import { BovasLogo } from "./BovasLogo";

const COLUMNS: { title: string; links: { label: string; to: string; params?: Record<string, string> }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About BOVAS", to: "/about" },
      { label: "Our Services", to: "/employers" },
      { label: "Careers", to: "/jobs" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Candidates",
    links: [
      { label: "Find Jobs", to: "/jobs" },
      { label: "Submit Your CV", to: "/contact" },
      { label: "Career Resources", to: "/resources" },
      { label: "Candidate Support", to: "/candidates" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Hire Talent", to: "/employers" },
      { label: "Recruitment Services", to: "/employers" },
      { label: "Submit a Vacancy", to: "/contact" },
      { label: "Employer Support", to: "/contact" },
    ],
  },
];

const INDUSTRY_LINKS = [
  { label: "Technology", slug: "technology" },
  { label: "Healthcare", slug: "healthcare" },
  { label: "Finance", slug: "finance" },
  { label: "Engineering", slug: "engineering" },
  { label: "Marketing", slug: "marketing" },
];

const RESOURCE_LINKS = [
  { label: "Career Advice", slug: "how-to-find-the-right-career-opportunity" },
  { label: "Recruitment Insights", slug: "skills-employers-are-looking-for" },
  { label: "Interview Tips", slug: "5-ways-to-prepare-for-your-next-interview" },
  { label: "CV Advice", slug: "how-to-build-a-cv-that-gets-noticed" },
];

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
              <a href="mailto:hello@bovas.com" className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-bright" /> hello@bovas.com
              </a>
              <a href="tel:+441234567890" className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-bright" /> +44 (0) 1234 567 890
              </a>
            </div>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="BOVAS social profile"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/75 transition-colors hover:border-bright hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={`${l.label}-${i}`}>
                    <Link to={l.to} className="text-sm text-white/65 transition-colors hover:text-bright">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Industries</h3>
            <ul className="mt-4 space-y-2.5">
              {INDUSTRY_LINKS.map((l) => (
                <li key={l.slug}>
                  <Link
                    to="/industries/$slug"
                    params={{ slug: l.slug }}
                    className="text-sm text-white/65 transition-colors hover:text-bright"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/industries" className="text-sm text-white/65 transition-colors hover:text-bright">
                  All Industries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.slug}>
                  <Link
                    to="/resources/$slug"
                    params={{ slug: l.slug }}
                    className="text-sm text-white/65 transition-colors hover:text-bright"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/resources" className="text-sm text-white/65 transition-colors hover:text-bright">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">© 2046 BOVAS. All rights reserved.</p>
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
