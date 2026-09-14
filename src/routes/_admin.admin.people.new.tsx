import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeForm } from "@/components/EmployeeForm";
import { createEmployee } from "@/lib/employee-functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/admin/people/new")({
  component: AddEmployee,
});

function AddEmployee() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: employees = [] } = useQuery({
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

  const mutation = useMutation({
    mutationFn: async (values: {
      name: string;
      title: string;
      department?: string | null;
      bio?: string;
      manager_id?: string | null;
      photo_url?: string | null;
      skills: string[];
    }) => {
      await createEmployee({ data: values });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee added successfully");
      navigate({ to: "/admin/people" });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="mx-auto max-w-2xl">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/admin/people">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to People
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>
            {employees.length === 0 ? "Add Your First Employee" : "Add Employee"}
          </CardTitle>
          {employees.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Start building your org chart by adding your CEO or top-level leader.
            </p>
          )}
        </CardHeader>
        <CardContent>
          <EmployeeForm
            allEmployees={employees}
            onSubmit={(values) => mutation.mutate(values)}
            isLoading={mutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
