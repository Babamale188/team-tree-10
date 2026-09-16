import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SwipeCarousel({
  items,
  slideClass = "basis-[85%] sm:basis-1/2 lg:basis-1/3",
  tone = "dark",
  ariaLabel,
  autoplay = false,
}: {
  items: ReactNode[];
  slideClass?: string;
  tone?: "light" | "dark";
  ariaLabel: string;
  autoplay?: boolean;
}) {
  const [ref, api] = useEmblaCarousel({ align: "start", loop: false, containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    if (!api) return;
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    update();
    api.on("select", update).on("reInit", update);
  }, [api, update]);

  useEffect(() => {
    if (!api || !autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [api, autoplay]);

  const btn = (enabled: boolean) =>
    `grid h-11 w-11 place-items-center rounded-full border transition-colors ${
      tone === "light"
        ? "border-white/30 text-white hover:bg-white/10"
        : "border-navy-900/15 text-navy-900 hover:border-royal hover:text-royal"
    } ${enabled ? "" : "opacity-40 cursor-not-allowed"}`;

  return (
    <div>
      <div className="overflow-hidden" ref={ref} aria-label={ariaLabel} role="region">
        <div className="flex gap-5">
          {items.map((item, i) => (
            <div key={i} className={`min-w-0 shrink-0 grow-0 ${slideClass}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 flex justify-end gap-3">
        <button type="button" aria-label="Previous" onClick={() => api?.scrollPrev()} disabled={!canPrev} className={btn(canPrev)}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Next" onClick={() => api?.scrollNext()} disabled={!canNext} className={btn(canNext)}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
