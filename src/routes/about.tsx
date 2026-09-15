import { createFileRoute } from "@tanstack/react-router";
import { Compass, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading, ImageTile, Eyebrow } from "@/components/bovas/Bits";
import { Reveal } from "@/components/bovas/Reveal";
import { PHOTOS } from "@/lib/bovas/images";

const TITLE = "About BOVAS — Connecting People With Possibilities";
const DESC =
  "BOVAS is a recruitment and talent platform connecting qualified candidates with employers across twelve industries and four continents.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const TEAM = [
  { name: "Nason Bamy", role: "Executive Search Recruiter", focus: "Leadership and director-level appointments across technology and finance." },
  { name: "Rashmi Babale", role: "Technical Recruiter", focus: "Engineering, data and product hiring for scale-ups and enterprise teams." },
  { name: "Favour Chwaka", role: "Healthcare & Public Sector Recruiter", focus: "Clinical, care and regulated-sector roles across permanent and contract work." },
  { name: "Chelsea Volz", role: "Commercial & Contract Recruiter", focus: "Sales, marketing and operations hiring, including temporary and interim cover." },
];

const VALUES = [
  { icon: ShieldCheck, t: "Honesty first", d: "Clear advice, even when it costs us a placement." },
  { icon: HeartHandshake, t: "People before process", d: "Careers and teams are not transactions." },
  { icon: Compass, t: "Specialist knowledge", d: "Consultants who understand the work, not just the job title." },
  { icon: Sparkles, t: "Quality over volume", d: "Short, relevant shortlists rather than noise." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About BOVAS"
        title={<>Connecting people with possibilities.</>}
        sub="We are a recruitment and talent partner built around one belief: the right match changes both a career and a company."
        image={PHOTOS.heroAbout}
        alt="BOVAS recruitment team collaborating in a modern office"
      >
        <ButtonLink to="/contact">Talk to Our Team</ButtonLink>
        <ButtonLink to="/jobs" variant="outline">Browse Opportunities</ButtonLink>
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Who we are"
              title="A specialist team, not a CV factory."
              sub="BOVAS was built by recruiters who wanted to work differently: fewer clients, deeper relationships and advice people can act on."
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Our consultants each own an industry practice, which means the person you speak to understands the role, the market rate and the difference between a good hire and a convenient one.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <ImageTile id={PHOTOS.teamMeeting} alt="BOVAS consultants in a team meeting" />
              <ImageTile id={PHOTOS.discussion} alt="Consultant briefing a candidate" className="mt-8" />
              <ImageTile id={PHOTOS.officeSpace} alt="The BOVAS office environment" />
              <ImageTile id={PHOTOS.collaboration} alt="Colleagues collaborating on a hiring brief" className="mt-8" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-10">
          {[
            { t: "Our mission", d: "To connect exceptional talent with organizations ready to grow, and to make that process clear for everyone involved." },
            { t: "Our vision", d: "A hiring market where people are matched on capability and fit, not on keyword luck." },
            { t: "Our approach", d: "Understand the work first, then the person. Brief properly, screen honestly, and stay involved after the offer." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="h-full rounded-2xl border border-white/12 bg-white/5 p-7 backdrop-blur">
                <Eyebrow>{c.t}</Eyebrow>
                <p className="mt-4 leading-relaxed text-white/75">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-softblue py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center eyebrow="Meet our team" title="The recruiters behind BOVAS." sub="Each consultant leads a specialist practice." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-lg font-extrabold text-white">
                    {m.name.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy-900">{m.name}</h3>
                  <p className="text-sm font-semibold text-royal">{m.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Our values" title="What we hold ourselves to." />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-softblue text-royal">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy-900">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bovas-gradient py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Our philosophy & culture"
              title="Recruitment built around people."
              sub="We hire consultants for judgement and curiosity, and we give them the time to do the job properly."
            />
            <div className="mt-8">
              <ButtonLink to="/employers" variant="outline">Explore Employer Services</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <ImageTile id={PHOTOS.workplaceCulture} alt="BOVAS team culture" className="ring-1 ring-white/10" />
              <ImageTile id={PHOTOS.mentoring} alt="Senior consultant mentoring a colleague" className="mt-8 ring-1 ring-white/10" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 bovas-diagonals opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Let's talk about what you need.</h2>
          <p className="mt-4 text-white/70">Whether you're hiring or looking, a short conversation is the fastest place to start.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact">Contact BOVAS</ButtonLink>
            <ButtonLink to="/candidates" variant="outline">Candidate Support</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
