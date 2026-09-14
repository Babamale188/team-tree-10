import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { PageHero } from "@/components/bovas/Bits";
import { JobCard } from "@/components/bovas/Cards";
import { JobSearchBar } from "@/components/bovas/JobSearchBar";
import { PHOTOS } from "@/lib/bovas/images";
import { INDUSTRIES } from "@/lib/bovas/industries";
import {
  JOBS,
  COUNTRIES,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  WORK_MODES,
} from "@/lib/bovas/jobs";

interface JobSearch {
  q?: string;
  location?: string;
  type?: string;
  industry?: string;
}

export const Route = createFileRoute("/jobs/")({
  validateSearch: (search: Record<string, unknown>): JobSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    location: typeof search.location === "string" ? search.location : undefined,
    type: typeof search.type === "string" ? search.type : undefined,
    industry: typeof search.industry === "string" ? search.industry : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse Jobs — Search Opportunities Worldwide | BOVAS" },
      {
        name: "description",
        content:
          "Search hundreds of professional opportunities across technology, finance, healthcare, engineering and more in the UK, US, Canada, Australia and Europe.",
      },
      { property: "og:title", content: "Browse Jobs — Search Opportunities Worldwide | BOVAS" },
      { property: "og:description", content: "Search professional opportunities across every major industry with BOVAS." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/jobs" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/jobs" }],
  }),
  component: JobsPage,
});

const PAGE_SIZE = 12;

function JobsPage() {
  const search = Route.useSearch();
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState(search.industry ?? "");
  const [type, setType] = useState(search.type ?? "");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");
  const [recent, setRecent] = useState(false);

  const results = useMemo(() => {
    const q = (search.q ?? "").toLowerCase().trim();
    const loc = (search.location ?? "").toLowerCase().trim();
    return JOBS.filter((j) => {
      if (q && !`${j.title} ${j.company} ${j.industryName}`.toLowerCase().includes(q)) return false;
      if (loc && !j.location.toLowerCase().includes(loc)) return false;
      if (country && j.country !== country) return false;
      if (industry && j.industry !== industry) return false;
      if (type && j.type !== type) return false;
      if (level && j.experience !== level) return false;
      if (mode && j.workMode !== mode) return false;
      if (recent && j.postedDaysAgo > 7) return false;
      return true;
    });
  }, [search.q, search.location, country, industry, type, level, mode, recent]);

  const visible = results.slice(0, page * PAGE_SIZE);

  const selectCls =
    "w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-royal";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Job directory"
        title={<>Every opportunity,<br />in one place.</>}
        sub="Browse and filter live roles across our specialist markets. New opportunities are added throughout the week."
        image={PHOTOS.heroJobs}
        alt="Professionals working in a modern open-plan office"
      />

      <div className="relative z-10 mx-auto -mt-10 max-w-[1180px] px-4 sm:px-6 lg:px-10">
        <JobSearchBar />
      </div>

      <section className="bg-softblue py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-10">
          <aside className="h-max rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900">Filters</h2>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Location</span>
                <select className={selectCls} value={country} onChange={(e) => { setCountry(e.target.value); setPage(1); }}>
                  <option value="">All locations</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Industry</span>
                <select className={selectCls} value={industry} onChange={(e) => { setIndustry(e.target.value); setPage(1); }}>
                  <option value="">All industries</option>
                  {INDUSTRIES.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Job type</span>
                <select className={selectCls} value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
                  <option value="">Any type</option>
                  {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Experience level</span>
                <select className={selectCls} value={level} onChange={(e) => { setLevel(e.target.value); setPage(1); }}>
                  <option value="">Any level</option>
                  {EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Remote / on-site</span>
                <select className={selectCls} value={mode} onChange={(e) => { setMode(e.target.value); setPage(1); }}>
                  <option value="">Any working pattern</option>
                  {WORK_MODES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={recent}
                  onChange={(e) => { setRecent(e.target.checked); setPage(1); }}
                  className="h-4 w-4 rounded border-border accent-[#155EEF]"
                />
                Posted in the last 7 days
              </label>
              <button
                type="button"
                onClick={() => { setCountry(""); setIndustry(""); setType(""); setLevel(""); setMode(""); setRecent(false); setPage(1); }}
                className="w-full rounded-xl border border-border py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-royal hover:text-royal"
              >
                Clear filters
              </button>
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-extrabold text-navy-900">
                {results.length.toLocaleString()} opportunities
              </h2>
              <p className="text-sm text-muted-foreground">Showing {visible.length} of {results.length}</p>
            </div>

            {visible.length === 0 ? (
              <p className="mt-10 rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                No roles match these filters yet. Try widening your search.
              </p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((j) => <JobCard key={j.slug} job={j} />)}
              </div>
            )}

            {visible.length < results.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-full bg-royal px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-bright"
                >
                  Load more roles
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
