import { createFileRoute } from "@tanstack/react-router";
import {
  Map, Radar, ClipboardCheck, Users, Handshake, ShieldCheck,
  Award, Repeat, Lock, Scale, BadgeCheck, TrendingUp,
} from "lucide-react";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading } from "@/components/bovas/Bits";
import { BulletList, FeatureGrid, StepGrid } from "@/components/bovas/Center";
import { Reveal } from "@/components/bovas/Reveal";
import { PHOTOS } from "@/lib/bovas/images";

const TITLE = "Recruitment Services | BovasTalent";
const DESC =
  "End-to-end recruitment for permanent, contract and interim roles — role scoping, multi-channel sourcing, structured screening, shortlists and a 90-day replacement guarantee.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const INCLUDED = [
  { icon: Map, title: "Role scoping & market map", body: "We align on the brief, benchmark comp and competitors, and map the talent pool before we start outreach." },
  { icon: Radar, title: "Multi-channel sourcing", body: "Database, referrals, AI-assisted search and targeted outreach — not just job-board posts." },
  { icon: ClipboardCheck, title: "Structured screening", body: "Competency-based interviews, skills assessments and reference checks on every shortlisted candidate." },
  { icon: Users, title: "Shortlist & interview support", body: "3 – 5 qualified profiles, interview coordination, scorecards and interviewer prep." },
  { icon: Handshake, title: "Offer & close", body: "Salary negotiation, counter-offer defence and resignation coaching to reduce fall-throughs." },
  { icon: ShieldCheck, title: "Onboarding & guarantee", body: "First-90-days check-ins and a replacement guarantee if a hire doesn't work out." },
];

const STEPS = [
  { n: "01", title: "Discovery", body: "Kick-off call, role brief, success criteria and hiring timeline." },
  { n: "02", title: "Search", body: "Market map, active outreach and screening against the scorecard." },
  { n: "03", title: "Shortlist", body: "Curated candidates with written summaries and video intros." },
  { n: "04", title: "Hire", body: "Interviews, offer, negotiation and onboarding follow-up." },
];

const WHO = [
  "Growing companies that need to fill roles fast without lowering the bar",
  "HR and Talent teams that want a specialist partner to extend their capacity",
  "Employers hiring across multiple regions or unfamiliar markets",
  "Businesses replacing an underperforming agency or in-house function",
];

const OUTCOMES = [
  "Time-to-shortlist typically inside 10 business days",
  "Higher offer-acceptance rate through proactive close management",
  "Diverse, pre-vetted candidate slates on every brief",
  "Fewer bad hires — backed by our 90-day replacement guarantee",
];

const TRUST = [
  { icon: Award, title: "1,200+ Placements delivered", body: "Successful hires across USA, UK, Canada, South Africa and Türkiye." },
  { icon: TrendingUp, title: "92% Client retention", body: "Long-standing partnerships with employers who hire with us again and again." },
  { icon: Repeat, title: "90-Day Replacement guarantee", body: "If a hire doesn't work out in the first 90 days, we replace at no extra cost." },
  { icon: Lock, title: "100% Confidential search", body: "Discreet, NDA-backed head hunting for sensitive and executive briefs." },
  { icon: Scale, title: "GDPR & EEO compliant", body: "Data-privacy compliant processes and fair, bias-aware shortlisting." },
  { icon: BadgeCheck, title: "Vetted Candidate screening", body: "Right-to-work, reference and credential checks on every shortlist." },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Recruitment"
        title={<>End-to-end hiring for permanent, contract and interim roles.</>}
        sub="From role scoping to signed offer, Bovas runs a modern, data-driven recruitment process that consistently delivers hires who fit the role, the team and the culture."
        image={PHOTOS.heroEmployers}
        alt="Recruitment consultants reviewing a hiring brief together"
      >
        <ButtonLink to="/jobs">See open roles</ButtonLink>
        <ButtonLink to="/contact" variant="outline">Talk to a consultant</ButtonLink>
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center eyebrow="Service detail" title="What's included" />
          </Reveal>
          <FeatureGrid items={INCLUDED} />
        </div>
      </section>

      <section className="relative overflow-hidden bovas-gradient py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 bovas-diagonals opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center tone="light" eyebrow="Process" title="How it works" />
          </Reveal>
          <StepGrid steps={STEPS} />
        </div>
      </section>

      <section className="bg-softblue py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center eyebrow="Fit" title="Who this is for" />
          </Reveal>
          <BulletList items={WHO} />
        </div>
      </section>

      <section className="bg-navy-900 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center tone="light" eyebrow="Results" title="Outcomes you can expect" />
          </Reveal>
          <BulletList items={OUTCOMES} tone="light" />
        </div>
      </section>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              center
              eyebrow="Trust & Assurance"
              title="Proof points our clients and candidates rely on."
            />
          </Reveal>
          <FeatureGrid items={TRUST} />
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 bovas-diagonals opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to get started?</h2>
          <p className="mt-4 text-white/70">
            Talk to a BovasTalent consultant today — no obligation, no fees to explore.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact">Contact Us</ButtonLink>
            <ButtonLink to="/submit-vacancy" variant="outline">Submit a Vacancy</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
