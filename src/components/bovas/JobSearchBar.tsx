import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, MapPin, Briefcase } from "lucide-react";
import { EMPLOYMENT_TYPES } from "@/lib/bovas/jobs";

export function JobSearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({
          to: "/jobs",
          search: { q: q || undefined, location: loc || undefined, type: type || undefined },
        });
      }}
      className={`grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-[0_30px_70px_-40px_rgba(4,20,38,0.8)] sm:p-5 ${
        compact ? "" : "lg:grid-cols-[1.2fr_1fr_0.9fr_auto]"
      }`}
    >
      <label className="flex items-center gap-2.5 rounded-xl bg-muted px-3.5 py-3">
        <Search className="h-4 w-4 shrink-0 text-royal" />
        <span className="sr-only">What job are you looking for?</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What job are you looking for?"
          className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
        />
      </label>
      <label className="flex items-center gap-2.5 rounded-xl bg-muted px-3.5 py-3">
        <MapPin className="h-4 w-4 shrink-0 text-royal" />
        <span className="sr-only">What location?</span>
        <input
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="What location?"
          className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
        />
      </label>
      <label className="flex items-center gap-2.5 rounded-xl bg-muted px-3.5 py-3">
        <Briefcase className="h-4 w-4 shrink-0 text-royal" />
        <span className="sr-only">Employment type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full min-w-0 bg-transparent text-sm text-ink outline-none"
        >
          <option value="">Employment type</option>
          {EMPLOYMENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-xl bg-royal px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-bright"
      >
        Search Jobs
      </button>
    </form>
  );
}
