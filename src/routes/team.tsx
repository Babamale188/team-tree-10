import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading } from "@/components/bovas/Bits";
import { Reveal } from "@/components/bovas/Reveal";
import { PHOTOS } from "@/lib/bovas/images";

const TITLE = "Meet the Team | BovasTalent Recruiters";
const DESC =
  "Meet the BovasTalent recruitment consultants — specialists in executive search, technology, healthcare and commercial hiring.";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/team" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

const TEAM = [
  { name: "Nason Bamy", role: "Executive Search Recruiter", focus: "Leadership and director-level appointments across technology and finance." },
  { name: "Rashmi Babale", role: "Technical Recruiter", focus: "Engineering, data and product hiring for scale-ups and enterprise teams." },
  { name: "Favour Chwaka", role: "Healthcare & Public Sector Recruiter", focus: "Clinical, care and regulated-sector roles across permanent and contract work." },
  { name: "Chelsea Volz", role: "Commercial & Contract Recruiter", focus: "Sales, marketing and operations hiring, including temporary and interim cover." },
];

function TeamPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our people"
        title={<>Meet the team behind every introduction.</>}
        sub="Each consultant leads a specialist practice, so the person you speak to actually understands the work."
        image={PHOTOS.teamMeeting}
        alt="BovasTalent recruitment consultants in a team meeting"
      >
        <ButtonLink to="/contact">Talk to a Consultant</ButtonLink>
        <ButtonLink to="/careers" variant="outline">Work With Us</ButtonLink>
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center eyebrow="Meet our team" title="The recruiters behind BovasTalent." sub="Each consultant leads a specialist practice." />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 80}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-7 text-center">
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

      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Speak to the right specialist.</h2>
          <p className="mt-4 text-white/70">Tell us what you need and we'll put you with the consultant who covers it.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact">Contact Us</ButtonLink>
            <ButtonLink to="/services" variant="outline">Our Services</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
