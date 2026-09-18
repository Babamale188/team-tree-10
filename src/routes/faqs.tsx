import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading } from "@/components/bovas/Bits";
import { Reveal } from "@/components/bovas/Reveal";
import { PHOTOS } from "@/lib/bovas/images";

const TITLE = "Frequently Asked Questions | BovasTalent";
const DESC =
  "Answers to the questions candidates and employers ask BovasTalent most — fees, applications, CV handling, timelines, guarantees and data privacy.";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faqs" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
  }),
  component: FaqPage,
});

const CANDIDATE_FAQS = [
  { q: "Does BovasTalent charge candidates?", a: "No. Our services are free for candidates; we are paid by the employers we recruit for." },
  { q: "How do I apply for a role?", a: "Open any job page and use Apply Now. You can also send a general CV through the Submit Your CV page." },
  { q: "Will my CV be shared without permission?", a: "Never. We ask before submitting your details to any employer." },
  { q: "What happens after I apply?", a: "A consultant reviews your application, and you'll hear from us either way — usually within three working days." },
  { q: "Can you help me if I'm not sure what role I want?", a: "Yes. Our career support includes a conversation about direction, transferable skills and realistic next steps." },
  { q: "Do you handle contract and temporary work?", a: "We recruit permanent, contract, interim and temporary roles across every sector we cover." },
  { q: "Can I apply for roles in another country?", a: "Yes, where you have the right to work or the employer supports relocation and visas. We'll tell you upfront." },
  { q: "How do I update or delete my details?", a: "Email us and we'll update or remove your data. We handle personal data in line with GDPR." },
];

const EMPLOYER_FAQS = [
  { q: "How long does hiring usually take?", a: "It varies by role and market, but most permanent processes run four to eight weeks from brief to offer." },
  { q: "How quickly will I see a shortlist?", a: "Time-to-shortlist is typically inside 10 business days from the kick-off call." },
  { q: "Do you offer a replacement guarantee?", a: "Yes. If a placement doesn't work out within the agreed 90-day window, we run the search again at no additional fee." },
  { q: "Can you run a confidential search?", a: "Yes. Sensitive and executive briefs are handled under NDA with a discreet, research-led approach." },
  { q: "How are your fees structured?", a: "Fees depend on the service and seniority. We confirm everything in writing before any work starts — exploring costs nothing." },
  { q: "Do you support hiring across multiple regions?", a: "We place across the UK, US, Canada, Australia, Europe and beyond, with market-specific salary benchmarking." },
  { q: "How do you screen candidates?", a: "Competency-based interviews, skills assessments, right-to-work checks and references on every shortlisted profile." },
  { q: "How do you handle candidate data?", a: "All data is stored and processed in line with GDPR and modern privacy best practice." },
];

function Group({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-royal">{title}</h3>
      <div className="mt-6 space-y-4">
        {items.map((f, i) => (
          <Reveal key={f.q} delay={(i % 4) * 60}>
            <details className="group rounded-2xl border border-border bg-card p-6">
              <summary className="cursor-pointer list-none text-base font-bold text-navy-900">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FaqPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="FAQs"
        title={<>Questions we're asked most.</>}
        sub="Straight answers for candidates and employers, before you pick up the phone."
        image={PHOTOS.discussion}
        alt="Consultant answering questions with a client"
      >
        <ButtonLink to="/contact">Ask a Question</ButtonLink>
        <ButtonLink to="/jobs" variant="outline">Browse Jobs</ButtonLink>
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center eyebrow="Help centre" title="Everything, in one place." />
          </Reveal>
          <Group title="For candidates" items={CANDIDATE_FAQS} />
          <Group title="For employers" items={EMPLOYER_FAQS} />
        </div>
      </section>
    </SiteLayout>
  );
}
