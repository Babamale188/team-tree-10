import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Employee = Tables<"employees">;
export type EmployeeInsert = TablesInsert<"employees">;
export type EmployeeUpdate = TablesUpdate<"employees">;
export type UserRole = Tables<"user_roles">;
export type AppRole = "admin" | "member";

export interface EmployeeWithRelations extends Employee {
  manager?: Employee | null;
  directReports?: Employee[];
}

export interface OrgNode extends Employee {
  children: OrgNode[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  role: AppRole | null;
  isAdmin: boolean;
  isLoading: boolean;
}
