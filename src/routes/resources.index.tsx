import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading } from "@/components/bovas/Bits";
import { ArticleCard } from "@/components/bovas/Cards";
import { Reveal } from "@/components/bovas/Reveal";
import { PHOTOS } from "@/lib/bovas/images";
import { ARTICLES, CATEGORIES } from "@/lib/bovas/articles";

const TITLE = "Career Resources & Advice | BOVAS";
const DESC =
  "CV advice, interview preparation, career development and job search guidance written by BOVAS recruitment consultants.";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/resources" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const FAQS = [
  { q: "Does BOVAS charge candidates?", a: "No. Our services are free for candidates; we are paid by the employers we recruit for." },
  { q: "How do I apply for a role?", a: "Open any job page and use Apply Now. You can also send a general CV through the contact page." },
  { q: "Will my CV be shared without permission?", a: "Never. We ask before submitting your details to any employer." },
  { q: "How long does hiring usually take?", a: "It varies by role and market, but most permanent processes run four to eight weeks from brief to offer." },
];

function ResourcesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Career Resources"
        title={<>More than a job. A career.</>}
        sub="Practical resources to help you make better career decisions, prepare for opportunities and grow professionally."
        image={PHOTOS.heroResources}
        alt="Professional reading career development material"
      >
        <ButtonLink to="/jobs">Explore BOVAS Jobs</ButtonLink>
        <ButtonLink to="/candidates" variant="outline">Candidate Support</ButtonLink>
      </PageHero>

      <section className="bg-softblue py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Article library"
              title="Advice from people who hire every day."
              sub="Each guide opens as its own article with examples you can apply immediately."
            />
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <span key={c} className="rounded-full border border-royal/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-royal">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading center tone="light" eyebrow="FAQs" title="Questions we're asked most." />
          </Reveal>
          <div className="mt-10 space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <div className="rounded-2xl border border-white/12 bg-white/5 p-6">
                  <h3 className="text-base font-bold text-white">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact">Ask a Question</ButtonLink>
            <ButtonLink to="/jobs" variant="outline">Browse Jobs</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
