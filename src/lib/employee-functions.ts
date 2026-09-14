import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const employeeSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  title: z.string().min(1, "Title is required").max(255),
  bio: z.string().max(2000).optional().nullable(),
  manager_id: z.string().uuid().optional().nullable(),
  photo_url: z.string().url().max(2048).optional().nullable(),
  skills: z.array(z.string().min(1).max(100)).max(20).default([]),
  department: z.string().max(100).optional().nullable(),
});

const idSchema = z.object({
  id: z.string().uuid(),
});

export const createEmployee = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: z.infer<typeof employeeSchema>) => employeeSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { error } = await supabase.from("employees").insert({
      name: data.name,
      title: data.title,
      bio: data.bio || null,
      manager_id: data.manager_id || null,
      photo_url: data.photo_url || null,
      skills: data.skills,
      department: data.department || null,
    });
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateEmployee = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: z.infer<typeof employeeSchema> & { id: string }) => {
    const parsed = employeeSchema.parse(input);
    const id = z.string().uuid().parse(input.id);
    return { ...parsed, id };
  })
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { id, ...fields } = data;
    const { error } = await supabase
      .from("employees")
      .update({
        name: fields.name,
        title: fields.title,
        bio: fields.bio || null,
        manager_id: fields.manager_id || null,
        photo_url: fields.photo_url || null,
        skills: fields.skills,
        department: fields.department || null,
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteEmployee = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { error } = await supabase.from("employees").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
