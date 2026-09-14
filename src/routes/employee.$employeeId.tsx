import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { AuthGate } from "@/components/AuthGate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeCard } from "@/components/EmployeeCard";
import { getInitials } from "@/lib/org-utils";
import { useAuth } from "@/hooks/use-auth";
import { useSignedUrl } from "@/hooks/use-signed-url";

export const Route = createFileRoute("/employee/$employeeId")({
  component: EmployeeProfile,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Employee not found</h1>
        <Link to="/chart" className="text-primary mt-4 inline-block">
          Back to Org Chart
        </Link>
      </div>
    </div>
  ),
});

function EmployeeProfile() {
  return (
    <AuthGate>
      <EmployeeProfileContent />
    </AuthGate>
  );
}

function EmployeeProfileContent() {
  const { employeeId } = Route.useParams();
  const { isAdmin } = useAuth();


  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", employeeId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: manager } = useQuery({
    queryKey: ["employee", employee?.manager_id],
    enabled: !!employee?.manager_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", employee!.manager_id!)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: directReports = [] } = useQuery({
    queryKey: ["directReports", employeeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("manager_id", employeeId)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const signedUrl = useSignedUrl(employee?.photo_url);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Employee not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/chart">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Org Chart
          </Link>
        </Button>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                    <AvatarImage
                      src={signedUrl ?? undefined}
                      alt={employee.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                   <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">
                          {employee.name}
                        </h1>
                        <p className="text-lg text-muted-foreground">{employee.title}</p>
                        {employee.department && (
                          <Badge variant="outline" className="mt-1 w-fit">{employee.department}</Badge>
                        )}
                      </div>
                      {isAdmin && (
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            to="/admin/people/$employeeId/edit"
                            params={{ employeeId: employee.id }}
                          >
                            <Pencil className="mr-1.5 h-3.5 w-3.5" />
                            Edit
                          </Link>
                        </Button>
                      )}
                    </div>

                    {employee.skills && employee.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {employee.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {employee.bio && (
                      <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                        {employee.bio}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {manager && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    Reports To
                    <ArrowUpRight className="h-3 w-3" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <EmployeeCard employee={manager} compact />
                </CardContent>
              </Card>
            )}

            {directReports.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Direct Reports ({directReports.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  {directReports.map((report) => (
                    <EmployeeCard key={report.id} employee={report} compact />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
