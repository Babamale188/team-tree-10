import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeForm } from "@/components/EmployeeForm";
import { updateEmployee } from "@/lib/employee-functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/admin/people_/$employeeId/edit")({
  component: EditEmployee,
  notFoundComponent: () => (
    <div className="text-center py-16">
      <h2 className="text-xl font-semibold">Employee not found</h2>
      <Link to="/admin/people" className="text-primary mt-4 inline-block">
        Back to People
      </Link>
    </div>
  ),
});

function EditEmployee() {
  const { employeeId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: employee, isLoading: empLoading } = useQuery({
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
      await updateEmployee({ data: { ...values, id: employeeId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", employeeId] });
      toast.success("Employee updated");
      navigate({ to: "/admin/people" });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  if (empLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold">Employee not found</h2>
      </div>
    );
  }

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
          <CardTitle>Edit Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeForm
            employee={employee}
            allEmployees={employees}
            onSubmit={(values) => mutation.mutate(values)}
            isLoading={mutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
