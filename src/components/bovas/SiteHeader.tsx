import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { BovasLogo } from "./BovasLogo";

type Item = { label: string; to: string; params?: Record<string, string> };
type Group = { label: string; items: Item[] };

export const NAV_GROUPS: Group[] = [
  {
    label: "Company",
    items: [
      { label: "About BovasTalent", to: "/about" },
      { label: "Our Services", to: "/services" },
      { label: "Meet the Team", to: "/team" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    label: "Candidates",
    items: [
      { label: "Find Jobs", to: "/jobs" },
      { label: "Submit Your CV", to: "/submit-cv" },
      { label: "Career Resources", to: "/resources" },
      { label: "Candidate Support", to: "/candidate-support" },
    ],
  },
  {
    label: "Employers",
    items: [
      { label: "Hire Talent", to: "/employers" },
      { label: "Recruitment Services", to: "/services" },
      { label: "Submit a Vacancy", to: "/submit-vacancy" },
      { label: "Employer Support", to: "/employer-support" },
    ],
  },
  {
    label: "Industries",
    items: [
      { label: "Technology", to: "/industries/$slug", params: { slug: "technology" } },
      { label: "Healthcare", to: "/industries/$slug", params: { slug: "healthcare" } },
      { label: "Finance", to: "/industries/$slug", params: { slug: "finance" } },
      { label: "Engineering", to: "/industries/$slug", params: { slug: "engineering" } },
      { label: "Marketing", to: "/industries/$slug", params: { slug: "marketing" } },
      { label: "All Industries", to: "/industries" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Career Advice", to: "/resources/$slug", params: { slug: "how-to-find-the-right-career-opportunity" } },
      { label: "Recruitment Insights", to: "/resources/$slug", params: { slug: "skills-employers-are-looking-for" } },
      { label: "Interview Tips", to: "/resources/$slug", params: { slug: "5-ways-to-prepare-for-your-next-interview" } },
      { label: "CV Advice", to: "/resources/$slug", params: { slug: "how-to-build-a-cv-that-gets-noticed" } },
      { label: "FAQs", to: "/faqs" },
    ],
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/92 backdrop-blur-xl shadow-[0_10px_40px_-24px_rgba(4,20,38,0.9)]"
          : "bg-navy-950/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <BovasLogo />

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          <Link
            to="/jobs"
            activeProps={{ className: "text-white bg-white/10" }}
            className="rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Find Jobs
          </Link>
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-haspopup="true"
              >
                {group.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-1 rounded-2xl border border-white/10 bg-navy-950/98 p-2 opacity-0 shadow-[0_30px_60px_-30px_rgba(4,20,38,1)] backdrop-blur-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    params={item.params}
                    className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:ml-4 lg:flex">
          <Link
            to="/login"
            className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Sign In
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(47,128,255,0.9)] transition-all hover:bg-bright"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="max-h-[calc(100dvh-72px)] overflow-y-auto bg-navy-950 px-4 pb-8 pt-2 sm:px-6">
            <nav aria-label="Mobile" className="flex flex-col">
              <Link
                to="/jobs"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-4 text-base font-semibold text-white"
              >
                Find Jobs
                <ArrowRight className="h-4 w-4 text-bright" />
              </Link>
              {NAV_GROUPS.map((group) => {
                const expanded = openGroup === group.label;
                return (
                  <div key={group.label} className="border-b border-white/10">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpenGroup(expanded ? null : group.label)}
                      className="flex w-full items-center justify-between py-4 text-base font-semibold text-white"
                    >
                      {group.label}
                      <ChevronDown className={`h-4 w-4 text-bright transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    {expanded && (
                      <div className="pb-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            params={item.params}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 pl-3 text-sm font-medium text-white/75"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="mt-6 grid gap-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/25 py-3 text-center text-sm font-semibold text-white"
              >
                Sign In
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-royal py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
