import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Users,
  Target,
  Zap,
  HeartHandshake,
  Quote,
  Star,
} from "lucide-react";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { Reveal } from "@/components/bovas/Reveal";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/bovas/Bits";
import { JobSearchBar } from "@/components/bovas/JobSearchBar";
import { SwipeCarousel } from "@/components/bovas/Carousel";
import { ArticleCard, IndustryCard, JobCard } from "@/components/bovas/Cards";
import { img, PHOTOS, portrait } from "@/lib/bovas/images";
import { featuredJobs, JOBS } from "@/lib/bovas/jobs";
import { INDUSTRIES } from "@/lib/bovas/industries";
import { ARTICLES } from "@/lib/bovas/articles";
import { TESTIMONIALS } from "@/lib/bovas/testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BOVAS — Find the Right Opportunity. Build the Right Team." },
      {
        name: "description",
        content:
          "BOVAS is a global recruitment and talent platform connecting exceptional professionals with organisations ready to grow. Browse jobs or hire top talent.",
      },
      { property: "og:title", content: "BOVAS — Find the Right Opportunity. Build the Right Team." },
      {
        property: "og:description",
        content: "BOVAS connects exceptional talent with organisations ready to grow.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BOVAS",
          description: "Recruitment and talent platform connecting candidates with employers.",
          slogan: "Find the right opportunity. Build the right team.",
        }),
      },
    ],
  }),
  component: HomePage,
});

const STATS = [
  { value: "500+", label: "Open Opportunities" },
  { value: "1,000+", label: "Candidates Connected" },
  { value: "50+", label: "Hiring Companies" },
  { value: "95%", label: "Candidate Satisfaction" },
];

const WHY = [
  { n: "01", title: "Better Talent", icon: Users, body: "Connect organizations with candidates whose skills and ambitions align with their needs." },
  { n: "02", title: "Smarter Matching", icon: Target, body: "Go beyond keywords and focus on the right fit for the role, the team and the direction of travel." },
  { n: "03", title: "Faster Hiring", icon: Zap, body: "Streamline the recruitment process and reach qualified candidates faster, without cutting corners." },
  { n: "04", title: "Human Support", icon: HeartHandshake, body: "Technology makes recruitment easier, but people remain at the centre of every decision." },
];

const STEPS = [
  { n: "01", title: "Tell us what you need", body: "We start with a proper briefing — the role, the team and what success looks like.", image: PHOTOS.discussion },
  { n: "02", title: "We find the talent", body: "We search, screen and qualify candidates against the brief, not against a keyword list.", image: PHOTOS.laptopWork },
  { n: "03", title: "Meet the right people", body: "You meet a short, relevant shortlist with full context on every candidate.", image: PHOTOS.interview },
  { n: "04", title: "Make the connection", body: "We support offer, onboarding and the first months in role.", image: PHOTOS.handshake },
];

function HomePage() {
  const jobs = featuredJobs(9);

  return (
    <SiteLayout>
      {/* ============ 1. HERO ============ */}
      <section className="relative isolate overflow-hidden bovas-mesh pb-40 pt-28 text-white sm:pb-44 sm:pt-32 lg:pb-52 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bovas-grid opacity-70" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-bright/25 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10">
          <div>
            <Eyebrow>Global recruitment &amp; talent platform</Eyebrow>
            <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.9rem]">
              Find the right opportunity.
              <span className="block bg-gradient-to-r from-white via-skyline to-bright bg-clip-text text-transparent">
                Build the right team.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              BOVAS connects exceptional talent with organizations ready to grow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/jobs">Find Your Next Job</ButtonLink>
              <ButtonLink to="/employers" variant="outline">Hire Top Talent</ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bovas-diagonals opacity-70" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-2xl border border-white/20" aria-hidden="true" />
            <img
              src={img(PHOTOS.heroHome, 1200, 900)}
              alt="Diverse team of professionals collaborating in a modern business environment"
              width={1200}
              height={900}
              className="relative aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-[0_50px_110px_-45px_rgba(4,20,38,1)] ring-1 ring-white/15"
            />
            <div className="absolute -bottom-6 left-4 hidden items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-xl ring-1 ring-white/20 sm:flex">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <img key={i} src={portrait(i, 80)} alt="" aria-hidden="true" loading="lazy" className="h-9 w-9 rounded-full object-cover ring-2 ring-navy-900" />
                ))}
              </div>
              <p className="text-xs font-semibold text-white">1,000+ professionals placed</p>
            </div>
          </div>
        </div>

        {/* overlapping search */}
        <div className="relative mx-auto -mb-[7.5rem] mt-14 max-w-[1180px] px-4 sm:px-6 lg:px-10">
          <JobSearchBar />
        </div>
      </section>

      {/* ============ 2. TRUST / STATS ============ */}
      <section className="bg-navy-900 pb-16 pt-40 text-white sm:pt-44">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              tone="light"
              center
              eyebrow="Trusted by professionals"
              title="Connecting talent with opportunity."
              sub="Indicative placeholder figures — replace with verified BOVAS performance data."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur">
                  <p className="text-3xl font-extrabold text-white sm:text-4xl">{s.value}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/60 sm:text-sm sm:normal-case sm:tracking-normal">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/45">
              Companies hiring through BOVAS
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="grid h-14 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-wider text-white/40"
                >
                  Client Logo
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. FEATURED JOBS ============ */}
      <section className="bg-softblue py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Featured roles"
                title="Your next opportunity starts here."
                sub="Explore opportunities from companies looking for exceptional talent."
              />
              <ButtonLink to="/jobs" variant="ghost" className="self-start">View All Jobs</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-12 block">
            <SwipeCarousel
              ariaLabel="Featured jobs"
              items={jobs.map((j) => <JobCard key={j.slug} job={j} />)}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ 4. CANDIDATES + EMPLOYERS ============ */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
          <Reveal>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-navy-900 text-white">
              <div className="relative h-60 overflow-hidden">
                <img
                  src={img(PHOTOS.heroCandidates, 1000, 700)}
                  alt="Candidate exploring career opportunities with a recruitment consultant"
                  loading="lazy"
                  width={1000}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
                <span className="absolute left-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                  For Candidates
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
                  Your career.<br />Your next move.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Discover opportunities that match your skills, experience and ambitions.
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {["Personalized opportunities", "Career support", "Easy applications", "Access to leading employers"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/85">
                      <Check className="h-4 w-4 shrink-0 text-bright" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink to="/candidates">Explore Jobs</ButtonLink>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-softblue">
              <div className="relative h-60 overflow-hidden">
                <img
                  src={img(PHOTOS.heroEmployers, 1000, 700)}
                  alt="Employer and recruiter reviewing a candidate shortlist together"
                  loading="lazy"
                  width={1000}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute left-6 top-6 rounded-full bg-royal px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  For Employers
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold leading-tight text-navy-900 sm:text-3xl">
                  The right people move businesses forward.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Find qualified professionals who can help your organization grow.
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {["Talent sourcing", "Candidate screening", "Recruitment support", "Faster hiring"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-navy-900">
                      <Check className="h-4 w-4 shrink-0 text-royal" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink to="/employers">Hire Talent</ButtonLink>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ============ 5. INDUSTRIES ============ */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 bovas-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                tone="light"
                eyebrow="Industries"
                title="Talent across the industries that matter."
                sub="Specialist recruitment teams with real understanding of the sectors they hire for."
              />
              <ButtonLink to="/industries" variant="outline" className="self-start">All Industries</ButtonLink>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 3) * 90}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. WHY BOVAS ============ */}
      <section className="bg-navy-900 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              tone="light"
              center
              eyebrow="Why BOVAS"
              title="Recruitment built around people."
              sub="A modern recruitment platform with experienced consultants behind every introduction."
            />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.n} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 text-center transition-colors hover:border-bright/40">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bovas-gradient">
                    <w.icon className="h-5 w-5 text-white" />
                  </span>
                  <p className="mt-4 text-xs font-bold tracking-[0.2em] text-gold">{w.n}</p>
                  <h3 className="mt-1.5 text-lg font-bold">{w.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/65">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. HOW BOVAS WORKS ============ */}
      <section className="relative overflow-hidden bovas-gradient py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 bovas-diagonals opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading tone="light" center eyebrow="How it works" title="Simple. Transparent. Effective." />
          </Reveal>
          <ol className="relative mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-4">
            <span className="pointer-events-none absolute left-0 right-0 top-[58px] hidden h-px bg-white/20 lg:block" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <li className="relative text-center">
                  <img
                    src={img(s.image, 400, 400)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-white/20"
                  />
                  <span className="mx-auto -mt-5 grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-extrabold text-royal shadow-lg">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/75">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 8. EMPLOYER CTA ============ */}
      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-10">
          <Reveal>
            <div>
              <Eyebrow>For employers</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
                Your next great hire could be closer than you think.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
                Let BOVAS help you identify, attract and connect with the talent your business needs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/contact">Start Hiring</ButtonLink>
                <ButtonLink to="/employers" variant="outline">Explore Employer Services</ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative mx-auto grid w-full max-w-md gap-3">
              {JOBS.slice(0, 3).map((j, i) => (
                <Link
                  key={j.slug}
                  to="/jobs/$slug"
                  params={{ slug: j.slug }}
                  className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${
                    i === 1 ? "lg:translate-x-8" : ""
                  }`}
                >
                  <img src={portrait(i + 2, 120)} alt="" aria-hidden="true" loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{j.title}</p>
                    <p className="truncate text-xs text-white/60">{j.industryName} · {j.location}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-gold/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold">
                    Shortlist
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 9. CAREER RESOURCES ============ */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Career resources"
                title="More than a job. A career."
                sub="Practical resources to help you make better career decisions, prepare for opportunities and grow professionally."
              />
              <ButtonLink to="/resources" variant="ghost" className="self-start">All Resources</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-12 block">
            <SwipeCarousel
              ariaLabel="Career resources"
              items={ARTICLES.map((a) => <ArticleCard key={a.slug} article={a} />)}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ 10. TESTIMONIALS ============ */}
      <section className="bg-skyline py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              center
              eyebrow="Testimonials"
              title="People who found the right fit."
              sub="Placeholder stories, structured so real BOVAS testimonials can replace them directly."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12 block">
            <SwipeCarousel
              ariaLabel="Testimonials"
              items={TESTIMONIALS.map((t, i) => (
                <figure key={i} className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_20px_50px_-38px_rgba(7,27,51,0.7)]">
                  <Quote className="h-7 w-7 text-royal/30" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">"{t.quote}"</blockquote>
                  <div className="mt-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                    <img src={portrait(t.portraitIndex, 100)} alt={`${t.name}, ${t.role}`} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-navy-900">{t.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{t.role}, {t.company}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ 11. FINAL CTA ============ */}
      <section className="relative isolate overflow-hidden py-24 text-white lg:py-28">
        <img
          src={img(PHOTOS.teamMeeting, 1800, 1000)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-royal/70" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Ready for what's next?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">
            Whether you're looking for your next opportunity or your next great hire, BOVAS is here to help.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/jobs">Find a Job</ButtonLink>
            <ButtonLink to="/employers" variant="outline">Hire Talent</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
