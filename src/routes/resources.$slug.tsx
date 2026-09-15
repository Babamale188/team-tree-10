import { createFileRoute, notFound } from "@tanstack/react-router";
import { CheckCircle2, Clock, User } from "lucide-react";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, SectionHeading } from "@/components/bovas/Bits";
import { ArticleCard } from "@/components/bovas/Cards";
import { Reveal } from "@/components/bovas/Reveal";
import { img } from "@/lib/bovas/images";
import { ARTICLES, articleBySlug, relatedArticles } from "@/lib/bovas/articles";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found | BOVAS" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    const url = `/resources/${a.slug}`;
    return {
      meta: [
        { title: `${a.title} | BOVAS Career Resources` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: img(a.hero, 1200, 630) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: img(a.hero, 1200, 630) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.excerpt,
            author: { "@type": "Person", name: a.author },
            datePublished: a.published,
            image: img(a.hero, 1200, 630),
            publisher: { "@type": "Organization", name: "BOVAS" },
          }),
        },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-40 text-center">
        <h1 className="text-3xl font-extrabold text-navy-900">We couldn't find that article.</h1>
        <p className="mt-3 text-muted-foreground">It may have been moved or renamed.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink to="/resources">All Career Resources</ButtonLink>
        </div>
      </div>
    </SiteLayout>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = relatedArticles(article.slug, 3);

  return (
    <SiteLayout>
      <article>
        <header className="relative isolate overflow-hidden bovas-mesh pb-14 pt-28 text-white sm:pt-32 lg:pt-36">
          <div className="pointer-events-none absolute inset-0 bovas-grid opacity-50" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-skyline ring-1 ring-white/15">
              {article.category}
            </span>
            <h1 className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4 text-bright" />{article.author} · {article.authorRole}</span>
              <span>{article.published}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-bright" />{article.readingTime}</span>
            </div>
          </div>
          <div className="relative mx-auto mt-10 max-w-5xl px-4 sm:px-6">
            <img
              src={img(article.hero, 1400, 780)}
              alt={article.heroAlt}
              width={1400}
              height={780}
              className="aspect-[16/9] w-full rounded-[1.5rem] object-cover shadow-[0_40px_90px_-40px_rgba(4,20,38,0.95)] ring-1 ring-white/15"
            />
          </div>
        </header>

        <div className="bg-background py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-lg leading-relaxed text-navy-900">{article.intro}</p>

            {article.sections.map((s) => (
              <section key={s.heading} className="mt-12">
                <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-muted-foreground">{p}</p>
                ))}
                {s.image && (
                  <figure className="mt-6 overflow-hidden rounded-2xl">
                    <img
                      src={img(s.image.id, 1100, 700)}
                      alt={s.image.alt}
                      loading="lazy"
                      width={1100}
                      height={700}
                      className="aspect-[16/10] w-full object-cover"
                    />
                    {s.image.caption && (
                      <figcaption className="mt-2 text-xs text-muted-foreground">{s.image.caption}</figcaption>
                    )}
                  </figure>
                )}
              </section>
            ))}

            <aside className="mt-14 rounded-2xl border border-royal/15 bg-softblue p-7">
              <h2 className="text-xl font-extrabold text-navy-900">Key takeaways</h2>
              <ul className="mt-4 space-y-3">
                {article.takeaways.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-navy-900">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-royal" />
                    {t}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/jobs">Explore BOVAS Jobs</ButtonLink>
              <ButtonLink to="/resources" variant="ghost">All Resources</ButtonLink>
            </div>
          </div>
        </div>

        <section className="bg-softblue py-20 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <Reveal>
              <SectionHeading eyebrow="Related reading" title="Keep building your career." />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(related.length ? related : ARTICLES.slice(0, 3)).map((a, i) => (
                <Reveal key={a.slug} delay={i * 80}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}
