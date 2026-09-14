import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Briefcase, Banknote, Clock } from "lucide-react";
import { img } from "@/lib/bovas/images";
import { formatSalary, postedLabel, type Job } from "@/lib/bovas/jobs";
import type { Industry } from "@/lib/bovas/industries";
import type { Article } from "@/lib/bovas/articles";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[0_18px_40px_-32px_rgba(7,27,51,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-royal/40 hover:shadow-[0_28px_60px_-30px_rgba(21,94,239,0.45)]">
      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-sm font-bold text-white">
          {job.companyInitials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-muted-foreground">{job.company}</p>
          <h3 className="mt-0.5 text-lg font-bold leading-snug text-navy-900">
            <Link
              to="/jobs/$slug"
              params={{ slug: job.slug }}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {job.title}
            </Link>
          </h3>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-royal" />{job.location}</li>
        <li className="flex items-center gap-2"><Briefcase className="h-4 w-4 shrink-0 text-royal" />{job.type} · {job.workMode} · {job.industryName}</li>
        <li className="flex items-center gap-2"><Banknote className="h-4 w-4 shrink-0 text-royal" />{formatSalary(job)}</li>
        <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-royal" />{postedLabel(job.postedDaysAgo)}</li>
      </ul>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-royal">
        View Job
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  );
}

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_40px_-32px_rgba(7,27,51,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(21,94,239,0.45)]">
      <div className="relative h-44 overflow-hidden">
        <img
          src={img(industry.hero, 800, 520)}
          alt={`${industry.name} professionals at work`}
          loading="lazy"
          width={800}
          height={520}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />
        <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
          <h3 className="text-lg font-bold text-white">{industry.name}</h3>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            {industry.openings} roles
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{industry.short}</p>
        <Link
          to="/industries/$slug"
          params={{ slug: industry.slug }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-royal after:absolute after:inset-0 after:content-['']"
        >
          Explore {industry.name} Jobs
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_40px_-32px_rgba(7,27,51,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(21,94,239,0.45)]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={img(article.hero, 800, 520)}
          alt={article.heroAlt}
          loading="lazy"
          width={800}
          height={520}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-navy-900">
          <Link
            to="/resources/$slug"
            params={{ slug: article.slug }}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between pt-1 text-xs text-muted-foreground">
          <span>{article.readingTime}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-royal">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
