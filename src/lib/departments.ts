export const DEPARTMENTS = [
  "Executive",
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Operations",
  "Legal",
  "Customer Success",
  "Data & Analytics",
  "IT & Infrastructure",
  "Research & Development",
] as const;

export type Department = (typeof DEPARTMENTS)[number];
