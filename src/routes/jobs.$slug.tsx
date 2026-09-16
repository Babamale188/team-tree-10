import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  MapPin, Briefcase, Banknote, Clock, Building2, Check, Share2, Bookmark, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/bovas/Bits";
import { JobCard } from "@/components/bovas/Cards";
import { img } from "@/lib/bovas/images";
import { jobBySlug, formatSalary, postedLabel, relatedJobs } from "@/lib/bovas/jobs";

export const Route = createFileRoute("/jobs/$slug")({
  loader: ({ params }) => {
    const job = jobBySlug(params.slug);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Job unavailable | BOVAS" }, { name: "robots", content: "noindex" }] };
    }
    const { job } = loaderData;
    const title = `${job.title} at ${job.company} — ${job.location} | BOVAS`;
    const desc = `${job.title} (${job.type}, ${job.workMode}) at ${job.company} in ${job.location}. ${formatSalary(job)}. Apply through BOVAS.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/jobs/${job.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/jobs/${job.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description: job.summary,
            employmentType: job.type.toUpperCase().replace("-", "_"),
            hiringOrganization: { "@type": "Organization", name: job.company },
            jobLocation: {
              "@type": "Place",
              address: { "@type": "PostalAddress", addressLocality: job.location },
            },
            industry: job.industryName,
          }),
        },
      ],
    };
  },
  component: JobDetail,
  notFoundComponent: JobNotFound,
});

function JobNotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-40 text-center">
        <h1 className="text-3xl font-extrabold text-navy-900">This role is no longer live</h1>
        <p className="mt-3 text-muted-foreground">It may have been filled or withdrawn. Browse current opportunities instead.</p>
        <div className="mt-8 flex justify-center"><ButtonLink to="/jobs">Browse all jobs</ButtonLink></div>
      </div>
    </SiteLayout>
  );
}

function JobDetail() {
  const { job } = Route.useLoaderData();
  const [applyOpen, setApplyOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const related = relatedJobs(job, 3);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: job.title, url }); return; } catch { /* dismissed */ }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-extrabold text-navy-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );

  const List = ({ items }: { items: string[] }) => (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-royal" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate flex min-h-[650px] items-end overflow-hidden pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24">
        <img src={img(job.heroImage, 1800, 1100)} alt={`${job.industryName} professionals at work`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/30" />
        <div className="pointer-events-none absolute inset-0 bovas-grid opacity-25" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <Eyebrow>{job.industryName}</Eyebrow>
            <div className="mt-5 flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-base font-bold ring-1 ring-white/20">
                {job.companyInitials}
              </span>
              <div className="min-w-0">
                <h1 className="text-[1.9rem] font-extrabold leading-tight sm:text-4xl lg:text-[2.9rem]">{job.title}</h1>
                <p className="mt-1.5 text-sm font-semibold text-skyline">{job.company}</p>
              </div>
            </div>
            <ul className="mt-6 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-bright" />{job.location}</li>
              <li className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-bright" />{job.type} · {job.workMode}</li>
              <li className="flex items-center gap-2"><Banknote className="h-4 w-4 text-bright" />{formatSalary(job)}</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-bright" />{postedLabel(job.postedDaysAgo)}</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_-16px_rgba(21,94,239,0.9)] transition-colors hover:bg-bright"
              >
                Apply Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => { setSaved((s) => !s); toast.success(saved ? "Job removed from saved" : "Job saved"); }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-gold text-gold" : ""}`} /> {saved ? "Saved" : "Save Job"}
              </button>
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-10">
          <article className="space-y-8">
            <section>
              <h2 className="text-xl font-extrabold text-navy-900">Job Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
            </section>

            <Section title="About the Role">
              <p>
                {job.company} is hiring a {job.title.toLowerCase()} to join their team in {job.location}. This is a{" "}
                {job.type.toLowerCase()} position with a {job.workMode.toLowerCase()} working pattern, suited to a{" "}
                {job.experience.toLowerCase()} professional.
              </p>
              <p>
                You will work alongside experienced colleagues in a team that values clear communication, considered
                decision-making and consistent delivery.
              </p>
            </Section>

            <Section title="Responsibilities"><List items={job.responsibilities} /></Section>

            <Section title="Requirements"><List items={job.requirements} /></Section>
            <Section title="Preferred Qualifications"><List items={job.preferred} /></Section>

            <Section title="What You'll Do">
              <p>
                Expect a balance of focused delivery work and collaboration. In the first three months you will learn the
                team's systems, build relationships with key stakeholders and take ownership of a defined area.
              </p>
            </Section>

            <Section title="What We Offer"><List items={job.benefits} /></Section>

            <Section title="Location">
              <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-royal" />{job.location} — {job.workMode}</p>
            </Section>

            <Section title="Application Process">
              <ol className="space-y-2">
                {["Submit your application through BOVAS", "Initial screening call with your consultant", "Interview with the hiring team", "Final stage and offer"].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-softblue text-xs font-bold text-royal">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </Section>
          </article>

          <aside className="h-max space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-softblue p-6">
              <h2 className="text-base font-extrabold text-navy-900">Interested in this role?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Apply in a few minutes. Your consultant will be in touch within two working days.</p>
              <button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="mt-4 w-full rounded-xl bg-royal py-3 text-sm font-bold text-white transition-colors hover:bg-bright"
              >
                Apply Now
              </button>
              <Link
                to="/industries/$slug"
                params={{ slug: job.industry }}
                className="mt-3 block text-center text-sm font-semibold text-royal hover:underline"
              >
                More {job.industryName} roles
              </Link>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900">Job summary</h2>
              <dl className="mt-3 space-y-2 text-sm">
                {[
                  ["Industry", job.industryName],
                  ["Experience", job.experience],
                  ["Employment", job.type],
                  ["Working pattern", job.workMode],
                  ["Salary", formatSalary(job)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-semibold text-navy-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-softblue py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <SectionHeading eyebrow="Related roles" title={`More ${job.industryName} opportunities`} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <JobCard key={r.slug} job={r} />)}
            </div>
          </div>
        </section>
      )}

      {/* APPLY DIALOG */}
      {applyOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-navy-950/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Apply for ${job.title}`}>
          <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-navy-900">Apply for {job.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{job.company} · {job.location}</p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setApplyOpen(false);
                toast.success("Application received — your consultant will be in touch.");
              }}
            >
              {[
                { label: "Full name", type: "text", name: "name" },
                { label: "Email address", type: "email", name: "email" },
                { label: "Phone number", type: "tel", name: "phone" },
              ].map((f) => (
                <label key={f.name} className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{f.label}</span>
                  <input required type={f.type} name={f.name} className="w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-royal" />
                </label>
              ))}
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Upload your CV</span>
                <input type="file" name="cv" accept=".pdf,.doc,.docx" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-sm" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Anything we should know?</span>
                <textarea rows={3} name="message" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-royal" />
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 rounded-xl bg-royal py-3 text-sm font-bold text-white transition-colors hover:bg-bright">
                  Submit application
                </button>
                <button type="button" onClick={() => setApplyOpen(false)} className="rounded-xl border border-border px-5 text-sm font-semibold text-navy-900">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
