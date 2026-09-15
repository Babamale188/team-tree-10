import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink } from "@/components/bovas/Bits";

interface Policy {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
}

const POLICIES: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How BOVAS collects, uses and protects personal information from candidates, employers and website visitors.",
    sections: [
      { heading: "Information we collect", body: ["We collect the details you give us directly: your name, contact details, CV, work history and the preferences you share with a consultant.", "We also collect limited technical information such as device type and pages visited, used to keep the site working and to improve it."] },
      { heading: "How we use your information", body: ["To match you with suitable roles, to brief employers with your permission, and to keep you informed about opportunities you have asked about.", "We do not sell personal data, and we do not share your CV with an employer without asking you first."] },
      { heading: "How long we keep it", body: ["We keep candidate records for as long as they remain useful to your job search, and review them periodically. You can ask us to delete your record at any time."] },
      { heading: "Your rights", body: ["You can request a copy of the information we hold, ask for corrections, or ask us to erase it. Contact us and we will respond promptly."] },
      { heading: "Contact", body: ["Questions about privacy can be sent to hello@bovas.com."] },
    ],
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    summary: "The terms that apply when you use the BOVAS website and services.",
    sections: [
      { heading: "Using this website", body: ["You may use this website for lawful purposes connected with finding work or hiring staff. You agree not to misuse the site, attempt to access it in unauthorised ways, or copy its content for commercial use."] },
      { heading: "Job listings", body: ["Listings are provided in good faith and reflect the information available at the time of publication. Roles may be withdrawn, amended or filled without notice."] },
      { heading: "Your submissions", body: ["Information you submit, including your CV, must be accurate and yours to share. You remain responsible for the content you provide."] },
      { heading: "Liability", body: ["We work carefully but cannot guarantee that the site will be uninterrupted or error free, and we are not liable for decisions taken solely on the basis of website content."] },
      { heading: "Changes", body: ["We may update these terms. Continued use of the site after an update means you accept the revised terms."] },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "What cookies and similar technologies we use on the BOVAS website, and how you can control them.",
    sections: [
      { heading: "What cookies are", body: ["Cookies are small files stored on your device that help a website function and remember your preferences."] },
      { heading: "Cookies we use", body: ["Essential cookies keep the site secure and working. Preference cookies remember choices such as saved search filters. Analytics cookies help us understand which pages are useful."] },
      { heading: "Managing cookies", body: ["You can block or delete cookies in your browser settings. Blocking essential cookies may stop parts of the site from working correctly."] },
      { heading: "Contact", body: ["For questions about cookies, email hello@bovas.com."] },
    ],
  },
];

const bySlug = (slug: string) => POLICIES.find((p) => p.slug === slug);

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => {
    const policy = bySlug(params.slug);
    if (!policy) throw notFound();
    return { policy };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page not found | BOVAS" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.policy;
    const url = `/legal/${p.slug}`;
    return {
      meta: [
        { title: `${p.title} | BOVAS` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.title} | BOVAS` },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: LegalNotFound,
  component: LegalPage,
});

function LegalNotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-40 text-center">
        <h1 className="text-3xl font-extrabold text-navy-900">We couldn't find that policy.</h1>
        <div className="mt-8 flex justify-center">
          <ButtonLink to="/">Back to Home</ButtonLink>
        </div>
      </div>
    </SiteLayout>
  );
}

function LegalPage() {
  const { policy } = Route.useLoaderData();
  return (
    <SiteLayout>
      <header className="relative isolate overflow-hidden bovas-mesh pb-14 pt-28 text-white sm:pt-32 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bovas-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-[2rem] font-extrabold leading-tight tracking-tight sm:text-4xl">{policy.title}</h1>
          <p className="mt-4 text-white/75">{policy.summary}</p>
          <p className="mt-3 text-xs text-white/50">Last updated 1 September 2046</p>
        </div>
      </header>

      <div className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {policy.sections.map((s) => (
            <section key={s.heading} className="mt-10 first:mt-0">
              <h2 className="text-xl font-extrabold text-navy-900">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
              ))}
            </section>
          ))}
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink to="/contact">Contact BOVAS</ButtonLink>
            <ButtonLink to="/" variant="ghost">Back to Home</ButtonLink>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
