import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading, Eyebrow } from "@/components/bovas/Bits";
import { ArticleCard, JobCard } from "@/components/bovas/Cards";
import { Reveal } from "@/components/bovas/Reveal";
import { SwipeCarousel } from "@/components/bovas/Carousel";
import { PHOTOS, portrait } from "@/lib/bovas/images";
import { featuredJobs } from "@/lib/bovas/jobs";
import { ARTICLES } from "@/lib/bovas/articles";
import { TESTIMONIALS } from "@/lib/bovas/testimonials";

const TITLE = "For Candidates — Find Your Next Opportunity | BOVAS";
const DESC =
  "Discover roles that match your skills and ambitions, with CV support, interview preparation and honest guidance from BOVAS consultants.";

export const Route = createFileRoute("/candidates")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/candidates" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/candidates" }],
  }),
  component: CandidatesPage,
});

const WHY = [
  { t: "Roles you won't find everywhere", d: "Many of our opportunities are filled through direct relationships with hiring managers." },
  { t: "A consultant who knows your market", d: "You speak to a specialist in your discipline, not a generalist working from a script." },
  { t: "Honest feedback", d: "If a role isn't right for you, we say so — and explain why." },
  { t: "Support beyond the offer", d: "Preparation, negotiation guidance and a check-in through your first months." },
];

const STEPS = [
  { n: "01", t: "Share your CV", d: "Send us your CV and tell us what a good next move looks like." },
  { n: "02", t: "Talk to a specialist", d: "A short conversation about your experience, priorities and salary expectations." },
  { n: "03", t: "Get matched", d: "We put you forward only for roles that genuinely fit." },
  { n: "04", t: "Interview and decide", d: "Preparation, feedback and support through offer and onboarding." },
];

function CandidatesPage() {
  const jobs = featuredJobs(6);
  const stories = TESTIMONIALS.filter((t) => t.kind === "candidate");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="For Candidates"
        title={<>Your career starts with the right opportunity.</>}
        sub="BOVAS helps you find roles that match your skills, your experience and the direction you actually want to take."
        image={PHOTOS.heroCandidates}
        alt="Professional candidate preparing for a job interview"
      >
        <ButtonLink to="/jobs">Browse Jobs</ButtonLink>
        <ButtonLink to="/contact" variant="outline">Submit Your CV</ButtonLink>
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Find your next opportunity"
              title="Live roles across twelve industries."
              sub="New opportunities are added continually across the UK, US, Canada, Australia and Europe."
            />
          </Reveal>
          <div className="mt-10">
            <SwipeCarousel
              ariaLabel="Featured opportunities for candidates"
              items={jobs.map((j) => <JobCard key={j.slug} job={j} />)}
            />
          </div>
          <div className="mt-10">
            <ButtonLink to="/jobs">View All Jobs</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div>
            <Reveal>
              <SectionHeading
                tone="light"
                eyebrow="Why candidates choose BOVAS"
                title="Guidance that respects your time."
                sub="We work with a smaller number of candidates properly, rather than a large number superficially."
              />
              <ul className="mt-8 space-y-5">
                {WHY.map((w) => (
                  <li key={w.t} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-bright" />
                    <div>
                      <p className="font-bold text-white">{w.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{w.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bovas-gradient py-20 text-white lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center tone="light" eyebrow="How applications work" title="Four clear steps, no guesswork." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                  <span className="text-sm font-extrabold tracking-widest text-gold">{s.n}</span>
                  <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-softblue py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] grid gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <Eyebrow tone="dark">CV support</Eyebrow>
              <h3 className="mt-4 text-2xl font-extrabold text-navy-900">Make your experience easy to assess.</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We review structure, clarity and evidence — then tell you exactly what to change before your CV reaches a hiring manager.
              </p>
              <div className="mt-6">
                <ButtonLink to="/resources/$slug" params={{ slug: "how-to-build-a-cv-that-gets-noticed" }} variant="ghost">
                  Read the CV guide
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <Eyebrow tone="dark">Interview preparation</Eyebrow>
              <h3 className="mt-4 text-2xl font-extrabold text-navy-900">Walk in knowing what matters.</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Company context, interviewer background, likely questions and the outcomes the team is measured on.
              </p>
              <div className="mt-6">
                <ButtonLink to="/resources/$slug" params={{ slug: "5-ways-to-prepare-for-your-next-interview" }} variant="ghost">
                  Read the interview guide
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Candidate success stories"
              title="People who found the right fit."
               sub="Career experiences from professionals across the UK, US and Australia."
            />
          </Reveal>
          <div className="mt-10">
            <SwipeCarousel
              ariaLabel="Candidate success stories"
              items={stories.map((t, i) => (
                <div key={i} className="h-full rounded-2xl border border-border bg-card p-6">
                  <p className="text-base leading-relaxed text-navy-900">“{t.quote}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src={portrait(t.portraitIndex)}
                      alt={`${t.name}, ${t.role}`}
                      loading="lazy"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-bold text-navy-900">{t.name}</p>
                      <p className="text-muted-foreground">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            />
          </div>
        </div>
      </section>

      <section className="bg-softblue py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Career resources" title="Practical advice for your next move." />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 bovas-diagonals opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Ready for what's next?</h2>
          <p className="mt-4 text-white/70">Browse live opportunities or send us your CV and we'll come to you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/jobs">Browse Jobs</ButtonLink>
            <ButtonLink to="/contact" variant="outline">Submit Your CV</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
