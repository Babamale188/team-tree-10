import { createFileRoute } from "@tanstack/react-router";
import { Users, Search, Crown, Clock3, BadgeCheck, Briefcase } from "lucide-react";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading } from "@/components/bovas/Bits";
import { Reveal } from "@/components/bovas/Reveal";
import { SwipeCarousel } from "@/components/bovas/Carousel";
import { PHOTOS, portrait } from "@/lib/bovas/images";
import { TESTIMONIALS } from "@/lib/bovas/testimonials";
import { INDUSTRIES } from "@/lib/bovas/industries";

const TITLE = "For Employers — Hire Exceptional Talent | BOVAS";
const DESC =
  "Talent sourcing, candidate screening, executive search, temporary staffing and permanent recruitment from specialist BOVAS consultants.";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/employers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/employers" }],
  }),
  component: EmployersPage,
});

const SERVICES = [
  { icon: Search, t: "Talent sourcing", d: "Proactive search across our network and the wider market, including professionals who are not actively applying." },
  { icon: BadgeCheck, t: "Candidate screening", d: "Structured interviews, skills validation and reference work before anyone reaches your shortlist." },
  { icon: Crown, t: "Executive search", d: "Discreet, mapped search for leadership appointments where the wrong hire is expensive." },
  { icon: Clock3, t: "Temporary staffing", d: "Vetted professionals for peak demand, parental cover and project work — available quickly." },
  { icon: Briefcase, t: "Permanent recruitment", d: "End-to-end hiring for roles you need to get right the first time, with replacement guarantees." },
  { icon: Users, t: "Hiring advisory", d: "Role definition, salary benchmarking and interview design before you go to market." },
];

const BENEFITS = [
  "Shortlists you can actually use",
  "Specialist consultants per industry",
  "Transparent, agreed fee structures",
  "Faster time from brief to offer",
  "Market and salary insight included",
  "Support through onboarding",
];

const STEPS = [
  { n: "01", t: "Tell us what you need", d: "We agree the brief, the must-haves and the realistic market position." },
  { n: "02", t: "We find the talent", d: "Targeted search, screening and briefing of every candidate." },
  { n: "03", t: "Meet the right people", d: "A short, relevant shortlist with structured interview support." },
  { n: "04", t: "Make the connection", d: "Offer management, negotiation and onboarding follow-up." },
];

function EmployersPage() {
  const stories = TESTIMONIALS.filter((t) => t.kind === "employer");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="For Employers"
        title={<>Find the people who move your business forward.</>}
        sub="BOVAS identifies, screens and connects you with qualified professionals — without burying your team in irrelevant CVs."
        image={PHOTOS.heroEmployers}
        alt="Employer and recruiter discussing a hiring plan in a modern office"
      >
        <ButtonLink to="/contact">Start Hiring</ButtonLink>
        <ButtonLink to="/industries" variant="outline">Explore Industry Expertise</ButtonLink>
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Recruitment solutions"
              title="Six ways we support your hiring."
              sub="Engage us for a single critical role or as an extension of your talent function."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 80}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_40px_-32px_rgba(7,27,51,0.6)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex flex-1 flex-col p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-softblue text-royal">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy-900">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white lg:py-24">
         <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Employer benefits"
              title="Hiring that protects your standards."
              sub="We would rather send three genuinely suitable candidates than twenty that look busy."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-white/75">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-bright" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink to="/contact">Submit a Vacancy</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bovas-gradient py-20 text-white lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center tone="light" eyebrow="How BOVAS recruitment works" title="Simple. Transparent. Effective." />
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
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Employer success stories"
              title="Teams built with BOVAS."
               sub="Hiring experiences from teams across the UK, US and Australia."
            />
          </Reveal>
          <div className="mt-10">
            <SwipeCarousel
              ariaLabel="Employer success stories"
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

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Industry expertise" title="Specialists in your sector." />
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {INDUSTRIES.map((ind) => (
              <ButtonLink key={ind.slug} to="/industries/$slug" params={{ slug: ind.slug }} variant="ghost" className="px-4 py-2.5 text-xs">
                {ind.name}
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 bovas-diagonals opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Your next great hire could be closer than you think.</h2>
          <p className="mt-4 text-white/70">Tell us about the role and we'll come back with a plan, a timeline and a market view.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact">Start Hiring</ButtonLink>
            <ButtonLink to="/about" variant="outline">About BOVAS</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
