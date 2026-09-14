import { createFileRoute, Link } from "@tanstack/react-router";
import heroTeamImg from "@/assets/hero-team.jpg";
import teamGroupMeetingImg from "@/assets/team-group-meeting.jpg";
import teamOneOnOneImg from "@/assets/team-one-on-one.jpg";
import teamCultureImg from "@/assets/team-culture.jpg";
import { Building2, Users, Search, Shield, Upload, Smartphone, UserPlus, GitBranch, Compass, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LandingHeader } from "@/components/LandingHeader";
import { OrgChartMockup } from "@/components/OrgChartMockup";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden text-white">
        <img src={heroTeamImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(217_91%_60%/0.15),_transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Know your team.
                <br />
                <span className="text-white">Navigate your company.</span>
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-lg leading-relaxed">
                A clean, internal org chart tool that visualizes company hierarchy and gives every employee a rich, customizable profile. No subscriptions, no bloat.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="w-full sm:w-auto bg-electric hover:bg-electric/90 text-white">
                  <Link to="/login" search={{ redirect: "/chart" }}>
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white">
                  <a href="#features">See Features</a>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <OrgChartMockup />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">How It Works</h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Get your org chart up and running in minutes, not days.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { step: "1", icon: UserPlus, title: "Add Your Team", desc: "Start by adding your CEO or top-level leader, then build out your team one by one with profiles and photos." },
              { step: "2", icon: GitBranch, title: "Build Your Hierarchy", desc: "Assign managers to establish reporting relationships. Your org chart structure takes shape automatically." },
              { step: "3", icon: Compass, title: "Explore & Navigate", desc: "Browse the interactive tree, click into profiles, and search the directory to find anyone in your organization." },
            ].map((item) => (
              <Card key={item.step} className="relative overflow-hidden border-0 shadow-md">
                <div className="absolute top-0 left-0 w-1 h-full bg-electric" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric/10 text-sm font-bold text-electric">
                      {item.step}
                    </span>
                    <item.icon className="h-5 w-5 text-electric" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Photos */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Built for Real Teams</h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              From board meetings to team socials — OrgChart keeps everyone connected.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { src: teamGroupMeetingImg, alt: "Team group meeting", label: "Group Meetings" },
              { src: teamOneOnOneImg, alt: "One-on-one meeting", label: "1:1 Conversations" },
              { src: teamCultureImg, alt: "Team culture event", label: "Team Culture" },
            ].map((item) => (
              <div key={item.label} className="group overflow-hidden rounded-xl">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-center font-semibold text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Everything You Need</h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              A complete org chart solution with all the features your team needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Interactive Org Chart", desc: "Visual hierarchical tree with expand/collapse, click-through navigation, and smooth animations." },
              { icon: Users, title: "Employee Profiles", desc: "Rich profiles with photos, bios, skills, and reporting relationships — all in one place." },
              { icon: Search, title: "People Directory", desc: "Searchable, filterable list to quickly find any teammate by name, title, or skills." },
              { icon: Shield, title: "Admin Dashboard", desc: "Secure, password-protected management panel for adding, editing, and organizing your team." },
              { icon: Upload, title: "Photo Uploads", desc: "Upload and manage profile photos with automatic optimization and secure cloud storage." },
              { icon: Smartphone, title: "Mobile Responsive", desc: "Beautifully adapts to any device with a collapsible list view optimized for mobile screens." },
            ].map((feature) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric/10 text-electric mb-4 group-hover:bg-electric/20 transition-colors">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-20 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "How long does it take to set up?", a: "You can have your org chart live in under 10 minutes. Just sign in, add your first team member, and start building your hierarchy." },
              { q: "Is my company data secure?", a: "Absolutely. All data is stored securely with row-level security policies. Only admins can modify employee records, and all communications are encrypted." },
              { q: "How many employees can it handle?", a: "OrgChart is optimized to handle organizations of up to 500 employees with fast rendering and smooth interactions." },
              { q: "Is it really free?", a: "Yes! OrgChart is a free, open-source template. You own your data — no subscriptions, no SaaS lock-in." },
              { q: "Can employees update their own profiles?", a: "Currently, only admins can manage profiles. Self-service profile updates are planned for a future release." },
              { q: "Does it work on mobile devices?", a: "Yes. The org chart gracefully falls back to a collapsible list view on mobile, and all pages are fully responsive." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Ready to map your organization?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">
            Start building your org chart today. It's free, fast, and your team will love it.
          </p>
          <Button size="lg" asChild className="mt-8 w-full sm:w-auto bg-electric hover:bg-electric/90 text-white">
            <Link to="/login" search={{ redirect: "/chart" }}>
              Get Started Free
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Building2 className="h-4 w-4 text-electric" />
            OrgChart
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <Link to="/login" search={{ redirect: "/chart" }} className="hover:text-foreground transition-colors">Login</Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OrgChart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
