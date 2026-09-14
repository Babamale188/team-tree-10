// Placeholder testimonials — structured for easy replacement with real BOVAS stories.
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  portraitIndex: number;
  kind: "candidate" | "employer";
}

export const TESTIMONIALS: Testimonial[] = [
  { name: "Placeholder Name", role: "Software Engineer", company: "Company Name", quote: "My consultant understood the type of engineering team I wanted, not just the job title. I had three relevant interviews within two weeks.", portraitIndex: 0, kind: "candidate" },
  { name: "Placeholder Name", role: "Head of Talent", company: "Company Name", quote: "BOVAS gave us a shortlist we could actually use. Every candidate had been properly briefed on the role and the team.", portraitIndex: 1, kind: "employer" },
  { name: "Placeholder Name", role: "Financial Controller", company: "Company Name", quote: "The interview preparation was genuinely useful — specific to the business, not generic advice.", portraitIndex: 2, kind: "candidate" },
  { name: "Placeholder Name", role: "Operations Director", company: "Company Name", quote: "We filled two hard-to-hire operational roles in under six weeks without dropping our standards.", portraitIndex: 3, kind: "employer" },
  { name: "Placeholder Name", role: "Registered Nurse", company: "Company Name", quote: "Honest communication throughout. I was never left wondering where my application stood.", portraitIndex: 4, kind: "candidate" },
  { name: "Placeholder Name", role: "Marketing Manager", company: "Company Name", quote: "They pushed back when a role wasn't right for me. That built a lot of trust.", portraitIndex: 5, kind: "candidate" },
  { name: "Placeholder Name", role: "Founder", company: "Company Name", quote: "As a scale-up, we needed help defining the role before advertising it. That advice mattered as much as the shortlist.", portraitIndex: 6, kind: "employer" },
  { name: "Placeholder Name", role: "Site Manager", company: "Company Name", quote: "Straightforward process, clear expectations, and a package that reflected my experience.", portraitIndex: 7, kind: "candidate" },
];
