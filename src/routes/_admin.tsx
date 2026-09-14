import { useState } from "react";
import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Building2, LayoutDashboard, Users, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { isAuthenticated, isAdmin, isLoading, user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Please log in</h2>
          <p className="mt-2 text-muted-foreground">You need to be logged in to access the admin panel.</p>
          <Button asChild className="mt-4">
            <Link to="/login" search={{ redirect: "/admin/dashboard" }}>Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="mt-2 text-muted-foreground">You don't have admin privileges.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/chart">Back to Org Chart</Link>
          </Button>
        </div>
      </div>
    );
  }

  const navItems = [
    { to: "/admin/dashboard" as const, icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/people" as const, icon: Users, label: "People" },
    { to: "/chart" as const, icon: Building2, label: "Org Chart" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-navy text-navy-foreground border-r border-navy-light">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-navy-light">
          <Link to="/chart" className="flex items-center gap-2 font-bold text-lg">
            <Building2 className="h-5 w-5 text-electric" />
            OrgChart
          </Link>
          <Badge className="ml-auto bg-electric/20 text-electric hover:bg-electric/30 border-0 text-[10px]">
            Admin
          </Badge>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-navy-light text-navy-foreground"
                    : "text-navy-foreground/70 hover:bg-navy-light hover:text-navy-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-navy-light px-3 py-4">
          <p className="text-xs text-navy-foreground/50 truncate px-3 mb-2">{user?.email}</p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-navy-foreground/70 hover:text-navy-foreground hover:bg-navy-light"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between bg-navy text-navy-foreground px-4 py-3 border-b">
          <Link to="/chart" className="flex items-center gap-2 font-bold">
            <Building2 className="h-5 w-5 text-electric" />
            OrgChart
          </Link>
          <div className="flex items-center gap-2">
            <Badge className="bg-electric/20 text-electric hover:bg-electric/30 border-0 text-[10px]">
              Admin
            </Badge>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-navy-foreground hover:bg-navy-light">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-navy text-navy-foreground border-navy-light">
                <SheetHeader>
                  <SheetTitle className="text-navy-foreground flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-electric" />
                    Admin Panel
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
                    return (
                      <Button
                        key={item.to}
                        variant="ghost"
                        asChild
                        className={`w-full justify-start min-h-[44px] ${
                          isActive
                            ? "bg-navy-light text-navy-foreground"
                            : "text-navy-foreground/70 hover:bg-navy-light hover:text-navy-foreground"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        <Link to={item.to}>
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </Link>
                      </Button>
                    );
                  })}
                  <div className="my-3 border-t border-navy-light" />
                  <p className="px-4 text-xs text-navy-foreground/50 truncate">{user?.email}</p>
                  <Button
                    variant="ghost"
                    className="w-full justify-start min-h-[44px] text-navy-foreground/70 hover:text-navy-foreground hover:bg-navy-light"
                    onClick={() => { logout(); setOpen(false); }}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 bg-background p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
