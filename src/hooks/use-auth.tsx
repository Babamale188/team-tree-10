import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AuthState, AppRole } from "@/lib/types";

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    role: null,
    isAdmin: false,
    isLoading: true,
  });

  const fetchRole = useCallback(async (userId: string): Promise<{ role: AppRole | null; isAdmin: boolean }> => {
    try {
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching roles:", error.message);
        return { role: null, isAdmin: false };
      }

      const isAdmin = roles?.some((r) => r.role === "admin") ?? false;
      const role = isAdmin ? "admin" : (roles?.length ? roles[0].role : null);
      return { role: role as AppRole | null, isAdmin };
    } catch {
      return { role: null, isAdmin: false };
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    // 1. Restore session first
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      if (session?.user) {
        const { role, isAdmin } = await fetchRole(session.user.id);
        if (cancelled) return;
        setAuth({
          isAuthenticated: true,
          user: { id: session.user.id, email: session.user.email ?? "" },
          role,
          isAdmin,
          isLoading: false,
        });
      } else {
        setAuth({ isAuthenticated: false, user: null, role: null, isAdmin: false, isLoading: false });
      }
    });

    // 2. Listen for future changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (cancelled) return;

        if (session?.user) {
          // Set authenticated immediately, fetch role async
          setAuth((prev) => ({
            ...prev,
            isAuthenticated: true,
            user: { id: session.user.id, email: session.user.email ?? "" },
            isLoading: false,
          }));

          // Fire-and-forget role fetch
          fetchRole(session.user.id).then(({ role, isAdmin }) => {
            if (cancelled) return;
            setAuth((prev) => ({ ...prev, role, isAdmin }));
          });
        } else {
          setAuth({ isAuthenticated: false, user: null, role: null, isAdmin: false, isLoading: false });
        }
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [fetchRole]);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
