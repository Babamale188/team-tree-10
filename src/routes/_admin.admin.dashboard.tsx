import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Users, GitBranch, Plus, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buildOrgTree, getHierarchyDepth, getInitials } from "@/lib/org-utils";
import { formatDistanceToNow } from "date-fns";
import { useSignedUrls } from "@/hooks/use-signed-url";

export const Route = createFileRoute("/_admin/admin/dashboard")({
  component: AdminDashboard,
});

const DEPT_COLORS = [
  "hsl(217, 91%, 60%)", // blue
  "hsl(142, 71%, 45%)", // green
  "hsl(262, 83%, 58%)", // purple
  "hsl(25, 95%, 53%)",  // orange
  "hsl(347, 77%, 50%)", // rose
  "hsl(199, 89%, 48%)", // sky
  "hsl(43, 96%, 56%)",  // amber
  "hsl(173, 80%, 40%)", // teal
  "hsl(292, 84%, 61%)", // fuchsia
  "hsl(0, 72%, 51%)",   // red
  "hsl(221, 83%, 53%)", // indigo
  "hsl(160, 60%, 45%)", // emerald
  "hsl(30, 80%, 55%)",  // warm
  "hsl(280, 65%, 60%)", // violet
];

function AdminDashboard() {
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
  const depth = getHierarchyDepth(tree);
  const topLevel = employees.filter((e) => !e.manager_id).length;

  // Compute department distribution
  const deptCounts = employees.reduce<Record<string, number>>((acc, emp) => {
    const dept = emp.department || "Unassigned";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});
  const deptData = Object.entries(deptCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="mx-auto max-w-lg text-center py-16">
        <Building2 className="mx-auto h-16 w-16 text-muted-foreground/40" />
        <h1 className="mt-6 text-2xl font-bold text-foreground">
          Welcome to OrgChart Admin
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Let's build your org chart. Start by adding your CEO or top-level leader.
        </p>
        <Button asChild className="mt-6" size="lg">
          <Link to="/admin/people/new">
            <Plus className="mr-2 h-4 w-4" />
            Add First Employee
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your organization</p>
        </div>
        <Button asChild>
          <Link to="/admin/people/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{employees.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Hierarchy Depth
            </CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{depth}</div>
            <p className="text-xs text-muted-foreground">levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Level
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{topLevel}</div>
            <p className="text-xs text-muted-foreground">root positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Distribution Donut Chart */}
      {deptData.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-64 w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deptData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {deptData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={DEPT_COLORS[index % DEPT_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value} employee${value !== 1 ? "s" : ""}`, "Count"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {deptData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: DEPT_COLORS[index % DEPT_COLORS.length] }}
                    />
                    <span className="truncate text-foreground">{entry.name}</span>
                    <span className="ml-auto text-muted-foreground font-medium">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Hires */}
      <RecentHires />
    </div>
  );
}

const PAGE_SIZE = 5;

function RecentHires() {
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["recent-hires", page],
    queryFn: async () => {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error, count } = await supabase
        .from("employees")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);
      if (error) throw error;
      return { employees: data, total: count ?? 0 };
    },
  });

  const employees = data?.employees ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const signedUrlMap = useSignedUrls(employees.map((e) => e.photo_url));

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Hires</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {total > 0 ? `${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, total)} of ${total}` : "0"}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          </div>
        ) : employees.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No employees yet.</p>
        ) : (
          <div className="space-y-3">
            {employees.map((emp) => (
              <Link
                key={emp.id}
                to="/employee/$employeeId"
                params={{ employeeId: emp.id }}
                className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={emp.photo_url ? signedUrlMap.get(emp.photo_url) ?? undefined : undefined} alt={emp.name} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {getInitials(emp.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{emp.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{emp.title}</p>
                </div>
                {emp.department && (
                  <Badge variant="outline" className="hidden sm:inline-flex shrink-0">
                    {emp.department}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDistanceToNow(new Date(emp.created_at), { addSuffix: true })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
