import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check, Quote, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, Eyebrow, ImageTile, PageHero, SectionHeading } from "@/components/bovas/Bits";
import { ArticleCard, JobCard } from "@/components/bovas/Cards";
import { Reveal } from "@/components/bovas/Reveal";
import { industryBySlug } from "@/lib/bovas/industries";
import { jobsByIndustry } from "@/lib/bovas/jobs";
import { ARTICLES } from "@/lib/bovas/articles";
import { TESTIMONIALS } from "@/lib/bovas/testimonials";
import { portrait } from "@/lib/bovas/images";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = industryBySlug(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Industry not found | BOVAS" }, { name: "robots", content: "noindex" }] };
    }
    const { industry } = loaderData;
    const title = `${industry.name} Recruitment & Jobs | BOVAS`;
    return {
      meta: [
        { title },
        { name: "description", content: industry.short },
        { property: "og:title", content: title },
        { property: "og:description", content: industry.short },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/industries/${industry.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/industries/${industry.slug}` }],
    };
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  const jobs = jobsByIndustry(industry.slug, 6);
  const g = industry.gallery;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={`${industry.name} recruitment`}
        title={<>{industry.name} talent,<br />matched properly.</>}
        sub={industry.intro}
        image={industry.hero}
        alt={`${industry.name} professionals at work`}
      >
        <ButtonLink to="/jobs" params={{}}>Browse {industry.name} Jobs</ButtonLink>
        <ButtonLink to="/contact" variant="outline">Hire {industry.name} Talent</ButtonLink>
      </PageHero>

      {/* Overview */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <div>
              <SectionHeading eyebrow="Industry overview" title={`Inside ${industry.name.toLowerCase()} hiring`} sub={industry.overview} />
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  ["Live roles", `${industry.openings}+`],
                  ["Specialist consultants", "8"],
                  ["Avg. time to shortlist", "7 days"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-softblue p-4">
                    <p className="text-xl font-extrabold text-royal">{v}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <ImageTile id={g[0].id} alt={g[0].alt} className="col-span-2" ratio="aspect-[16/9]" />
              <ImageTile id={g[1].id} alt={g[1].alt} />
              <ImageTile id={g[2].id} alt={g[2].alt} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills + roles */}
      <section className="bg-navy-900 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading tone="light" center eyebrow="Market demand" title="Skills in demand and roles we recruit" />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
            <Reveal>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-bold">Skills in demand</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {industry.skills.map((s) => (
                    <li key={s} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85">{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-bold">Roles BOVAS recruits for</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {industry.roles.map((r) => (
                    <li key={r} className="flex items-center gap-2"><Check className="h-4 w-4 text-bright" />{r}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <ImageTile id={g[3].id} alt={g[3].alt} className="h-full" ratio="aspect-[3/4]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="bg-softblue py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Current opportunities" title={`Live ${industry.name.toLowerCase()} roles`} />
              <ButtonLink to="/jobs" variant="ghost" className="self-start">View all jobs</ButtonLink>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => <JobCard key={j.slug} job={j} />)}
          </div>
        </div>
      </section>

      {/* Candidate + employer */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border">
              <ImageTile id={g[4].id} alt={g[4].alt} ratio="aspect-[16/9]" />
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-navy-900">Candidate opportunities</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Talk to a consultant who works in {industry.name.toLowerCase()} every day. We'll share realistic market
                  ranges, prepare you properly and only put you forward for roles that fit.
                </p>
                <div className="mt-5"><ButtonLink to="/candidates" variant="ghost">Candidate support</ButtonLink></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl border border-border bg-softblue">
              <ImageTile id={g[5].id} alt={g[5].alt} ratio="aspect-[16/9]" />
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-navy-900">Employer recruitment solutions</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Permanent, contract and executive search for {industry.name.toLowerCase()} teams, with screening and
                  market mapping included as standard.
                </p>
                <div className="mt-5"><ButtonLink to="/employers" variant="ghost">Employer services</ButtonLink></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trends */}
      <section className="bg-navy-950 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal><SectionHeading tone="light" center eyebrow="Industry trends" title={`What's shaping ${industry.name.toLowerCase()} hiring`} /></Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {industry.trends.map((t, i) => (
              <Reveal key={t.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  <h3 className="mt-3 text-lg font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Resources + testimonial */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal><SectionHeading eyebrow="Related career resources" title="Advice for your next move" /></Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {TESTIMONIALS.slice(0, 2).map((t, i) => (
              <figure key={i} className="rounded-2xl bg-softblue p-6">
                <Quote className="h-6 w-6 text-royal/40" />
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">"{t.quote}"</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <img src={portrait(t.portraitIndex, 100)} alt={`${t.name}, ${t.role}`} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  <span className="text-xs text-muted-foreground">{t.name} · {t.role}, {t.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bovas-gradient py-20 text-center text-white">
        <div className="pointer-events-none absolute inset-0 bovas-diagonals opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-4">
          <Eyebrow>{industry.name}</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Let's find the right fit.</h2>
          <p className="mt-4 text-white/75">Whether you're hiring or looking, our {industry.name.toLowerCase()} team can help.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/jobs">Find a Job</ButtonLink>
            <ButtonLink to="/contact" variant="outline">Hire Talent</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
