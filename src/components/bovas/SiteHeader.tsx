import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { BovasLogo } from "./BovasLogo";

const NAV = [
  { label: "Find Jobs", to: "/jobs" },
  { label: "For Candidates", to: "/candidates" },
  { label: "For Employers", to: "/employers" },
  { label: "Industries", to: "/industries" },
  { label: "Career Resources", to: "/resources" },
  { label: "About BOVAS", to: "/about" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/92 backdrop-blur-xl shadow-[0_10px_40px_-24px_rgba(4,20,38,0.9)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <BovasLogo />

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-white bg-white/10" }}
              className="rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:ml-6 lg:flex">
          <Link
            to="/login"
            className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Sign In
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(47,128,255,0.9)] transition-all hover:bg-bright"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="max-h-[calc(100dvh-72px)] overflow-y-auto bg-navy-950 px-4 pb-8 pt-2 sm:px-6">
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-base font-semibold text-white"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-bright" />
                </Link>
              ))}
            </nav>
            <div className="mt-6 grid gap-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/25 py-3 text-center text-sm font-semibold text-white"
              >
                Sign In
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-royal py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
