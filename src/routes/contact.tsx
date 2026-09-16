import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/bovas/SiteLayout";
import { ButtonLink, PageHero, SectionHeading } from "@/components/bovas/Bits";
import { Reveal } from "@/components/bovas/Reveal";
import { PHOTOS } from "@/lib/bovas/images";

const TITLE = "Contact BOVAS — Talk to a Recruitment Specialist";
const DESC =
  "Get in touch with BOVAS about finding a job, hiring talent, partnerships or general enquiries. We reply within one working day.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const INTERESTS = ["Finding a job", "Hiring talent", "Partnership", "General enquiry"];

const field =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-muted-foreground focus:border-royal focus:ring-2 focus:ring-royal/20";

function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thanks — your message has been received. A consultant will reply within one working day.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title={<>Let's start the conversation.</>}
        sub="Tell us whether you're looking for your next role or your next hire, and the right specialist will get back to you."
        image={PHOTOS.heroContact}
        alt="BOVAS office reception and meeting space"
      >
        <ButtonLink to="/jobs">Browse Jobs</ButtonLink>
        <ButtonLink to="/employers" variant="outline">Employer Services</ButtonLink>
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[0_24px_60px_-40px_rgba(7,27,51,0.6)]">
              <h2 className="text-2xl font-extrabold text-navy-900">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">Fields marked with * are required.</p>
              <form className="mt-7 space-y-5" onSubmit={onSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-semibold text-navy-900">Name *</label>
                    <input id="name" name="name" required autoComplete="name" placeholder="Your full name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-navy-900">Email *</label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="text-sm font-semibold text-navy-900">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+44 (0) 1234 567 890" className={field} />
                  </div>
                  <div>
                    <label htmlFor="interest" className="text-sm font-semibold text-navy-900">I'm interested in *</label>
                    <select id="interest" name="interest" required defaultValue={INTERESTS[0]} className={field}>
                      {INTERESTS.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-semibold text-navy-900">Message *</label>
                  <textarea id="message" name="message" required rows={6} placeholder="Tell us about the role you're looking for, or the role you're hiring for." className={field} />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-royal px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_-16px_rgba(21,94,239,0.9)] transition-colors hover:bg-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bright focus-visible:ring-offset-2 sm:w-auto"
                >
                  Submit
                </button>
                <p aria-live="polite" className="text-sm text-royal">
                  {sent ? "Thanks — your message has been received. A consultant will reply within one working day." : ""}
                </p>
              </form>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-xl font-extrabold text-navy-900">Contact details</h2>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-royal" />
                    <a href="mailto:hello@bovas.com" className="font-semibold text-navy-900 hover:text-royal">hello@bovas.com</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 text-royal" />
                    <a href="tel:+441234567890" className="font-semibold text-navy-900 hover:text-royal">+44 (0) 1234 567 890</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-royal" />
                    <span className="text-muted-foreground">
                      BOVAS Recruitment<br />
                      Placeholder office address<br />
                      London, United Kingdom
                    </span>
                  </li>
                </ul>
                <p className="mt-5 text-xs text-muted-foreground">
                  Office hours: Monday to Friday, 9:00–18:00. Contact details are placeholders until confirmed.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-softblue py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading center eyebrow="Where to next" title="Not sure who to speak to?" sub="These pages answer most first questions." />
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/candidates" variant="ghost">For Candidates</ButtonLink>
            <ButtonLink to="/employers" variant="ghost">For Employers</ButtonLink>
            <ButtonLink to="/resources" variant="ghost">Career Resources</ButtonLink>
            <ButtonLink to="/industries" variant="ghost">Industries</ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
