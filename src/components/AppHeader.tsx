import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Users, Search, LogIn, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";

export function AppHeader() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/chart" as const, icon: Building2, label: "Org Chart" },
    { to: "/directory" as const, icon: Search, label: "Directory" },
    ...(isAuthenticated && isAdmin
      ? [{ to: "/admin/dashboard" as const, icon: Users, label: "Admin" }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-navy text-navy-foreground">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/chart" className="flex items-center gap-2 font-bold text-lg">
          <Building2 className="h-5 w-5 text-electric" />
          <span>OrgChart</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <Button key={item.to} variant="ghost" size="sm" asChild className="text-navy-foreground hover:bg-navy-light hover:text-navy-foreground">
              <Link to={item.to} activeProps={{ className: "bg-navy-light" }}>
                <item.icon className="mr-1.5 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}

          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              className="ml-2 text-navy-foreground hover:bg-navy-light hover:text-navy-foreground"
            >
              <span className="text-xs text-muted-foreground mr-2 hidden lg:inline">
                {user?.email}
              </span>
              Logout
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild className="ml-2 text-navy-foreground hover:bg-navy-light hover:text-navy-foreground">
              <Link to="/login" search={{ redirect: "/chart" }}>
                <LogIn className="mr-1.5 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-navy-foreground hover:bg-navy-light">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-navy text-navy-foreground border-navy-light">
            <SheetHeader>
              <SheetTitle className="text-navy-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-electric" />
                OrgChart
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((item) => (
                <Button
                  key={item.to}
                  variant="ghost"
                  asChild
                  className="w-full justify-start min-h-[44px] text-navy-foreground hover:bg-navy-light hover:text-navy-foreground"
                  onClick={() => setOpen(false)}
                >
                  <Link to={item.to}>
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </Button>
              ))}

              <div className="my-3 border-t border-navy-light" />

              {isAuthenticated ? (
                <>
                  <p className="px-4 text-xs text-navy-foreground/50 truncate">{user?.email}</p>
                  <Button
                    variant="ghost"
                    className="w-full justify-start min-h-[44px] text-navy-foreground hover:bg-navy-light hover:text-navy-foreground"
                    onClick={() => { logout(); setOpen(false); }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start min-h-[44px] text-navy-foreground hover:bg-navy-light hover:text-navy-foreground"
                  onClick={() => setOpen(false)}
                >
                  <Link to="/login" search={{ redirect: "/chart" }}>
                    <LogIn className="mr-3 h-5 w-5" />
                    Login
                  </Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
