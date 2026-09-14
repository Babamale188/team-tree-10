import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/use-auth";

import appCss from "../styles.css?url";

interface RouterContext {
  queryClient: QueryClient;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OrgChart — Company Org Chart & Directory" },
      {
        name: "description",
        content:
          "Know your team. Navigate your company. Interactive org chart and employee directory.",
      },
      { property: "og:title", content: "OrgChart — Company Org Chart & Directory" },
      {
        property: "og:description",
        content: "Know your team. Navigate your company.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "OrgChart — Company Org Chart & Directory" },
      { name: "description", content: "Know your team. Navigate your company." },
      { property: "og:description", content: "Know your team. Navigate your company." },
      { name: "twitter:description", content: "Know your team. Navigate your company." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/KoUaltGzqoVfSfQv3CIsHyhMxAp2/social-images/social-1775576501442-Org-Chart-Navigator-Lovable-04-07-2026_11_41_AM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/KoUaltGzqoVfSfQv3CIsHyhMxAp2/social-images/social-1775576501442-Org-Chart-Navigator-Lovable-04-07-2026_11_41_AM.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
