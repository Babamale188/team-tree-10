import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading } from "@/components/bovas/Bits";
import { IndustryCard } from "@/components/bovas/Cards";
import { Reveal } from "@/components/bovas/Reveal";
import { PHOTOS } from "@/lib/bovas/images";
import { INDUSTRIES } from "@/lib/bovas/industries";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Recruit For | BOVAS" },
      {
        name: "description",
        content:
          "Specialist recruitment across technology, healthcare, finance, engineering, marketing, sales, legal, education and more.",
      },
      { property: "og:title", content: "Industries We Recruit For | BOVAS" },
      { property: "og:description", content: "Specialist recruitment teams across twelve core industries." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/industries" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Industries"
        title={<>Specialists in the sectors<br />we recruit for.</>}
        sub="Twelve industry practices, each led by consultants who understand the roles, the language and the market."
        image={PHOTOS.heroIndustries}
        alt="Modern corporate office building representing multiple industries"
      >
        <ButtonLink to="/jobs">Browse All Jobs</ButtonLink>
        <ButtonLink to="/contact" variant="outline">Speak to a Consultant</ButtonLink>
      </PageHero>

      <section className="bg-softblue py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              center
              eyebrow="Choose your sector"
              title="Talent across the industries that matter."
              sub="Each industry has its own dedicated page with market insight, in-demand skills and live opportunities."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 3) * 80}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
