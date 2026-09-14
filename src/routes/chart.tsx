import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { AuthGate } from "@/components/AuthGate";
import { OrgChartTree } from "@/components/OrgChartTree";
import { OrgChartMobile } from "@/components/OrgChartMobile";
import { buildOrgTree } from "@/lib/org-utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/chart")({
  component: OrgChartPage,
});

function OrgChartPage() {
  return (
    <AuthGate>
      <OrgChartContent />
    </AuthGate>
  );
}

function OrgChartContent() {
  const isMobile = useIsMobile();

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const tree = buildOrgTree(employees);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Organization Chart
          </h1>
          <p className="mt-2 text-muted-foreground">
            Know your team. Navigate your company.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="mx-auto h-16 w-16 text-muted-foreground/40" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              No employees yet
            </h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              The org chart is empty. An admin can start by adding the first
              employee.
            </p>
          </div>
        ) : isMobile ? (
          <OrgChartMobile nodes={tree} />
        ) : (
          <OrgChartTree nodes={tree} />
        )}
      </main>
    </div>
  );
}
