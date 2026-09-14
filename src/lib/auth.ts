import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export const checkUserRole = createServerFn({ method: "POST" })
  .inputValidator(z.object({ userId: z.string().uuid() }).parse)
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      console.error("Missing Supabase server env vars for role check. URL:", !!url, "Service key:", !!serviceKey);
      return { role: null, isAdmin: false };
    }

    const key = serviceKey;

    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.userId);

    const isAdmin = roles?.some((r) => r.role === "admin") ?? false;
    const role = isAdmin ? "admin" : (roles?.length ? roles[0].role : null);
    return { role, isAdmin };
  });
