import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <Building2 className="h-5 w-5 text-white" />
          <span>OrgChart</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10">
            <Link to="/login" search={{ redirect: "/chart" }}>Login</Link>
          </Button>
          <Button size="sm" asChild className="bg-electric hover:bg-electric/90 text-white">
            <Link to="/login" search={{ redirect: "/chart" }}>Get Started</Link>
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-navy text-white border-navy-light">
            <SheetHeader>
              <SheetTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-white" />
                OrgChart
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-2">
              <Button
                variant="ghost"
                asChild
                className="w-full justify-start min-h-[44px] text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <Link to="/login" search={{ redirect: "/chart" }}>Login</Link>
              </Button>
              <Button
                asChild
                className="w-full min-h-[44px] bg-electric hover:bg-electric/90 text-white"
                onClick={() => setOpen(false)}
              >
                <Link to="/login" search={{ redirect: "/chart" }}>Get Started</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
