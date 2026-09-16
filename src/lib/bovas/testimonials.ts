export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  portraitIndex: number;
  kind: "candidate" | "employer";
}

export const TESTIMONIALS: Testimonial[] = [
  { name: "Emily Carter", role: "Software Engineer", company: "London, UK", quote: "My consultant understood the engineering culture I wanted, not just the title. Every conversation was relevant and well prepared.", portraitIndex: 0, kind: "candidate" },
  { name: "Daniel Brooks", role: "Head of Talent", company: "Austin, US", quote: "BOVAS brought structure to a difficult search and introduced people who understood our stage of growth.", portraitIndex: 1, kind: "employer" },
  { name: "Sophie Bennett", role: "Financial Controller", company: "Manchester, UK", quote: "The interview preparation was specific, practical and gave me a much clearer way to present my experience.", portraitIndex: 2, kind: "candidate" },
  { name: "Michael Turner", role: "Operations Director", company: "Sydney, Australia", quote: "Communication was direct and the shortlist was focused. We moved from brief to offer without wasted interviews.", portraitIndex: 3, kind: "employer" },
  { name: "Olivia Hughes", role: "Registered Nurse", company: "Bristol, UK", quote: "I always knew where my application stood and felt supported through every stage of the process.", portraitIndex: 4, kind: "candidate" },
  { name: "James Walker", role: "Marketing Manager", company: "New York, US", quote: "The team challenged me when a role was not the right fit. That honesty made the final match much stronger.", portraitIndex: 5, kind: "candidate" },
  { name: "Grace Mitchell", role: "People Director", company: "Melbourne, Australia", quote: "Their advice helped us define the role before the search began, which made every later decision easier.", portraitIndex: 6, kind: "employer" },
  { name: "Thomas Reed", role: "Site Manager", company: "Leeds, UK", quote: "A straightforward process, clear expectations and a role that genuinely matched my experience.", portraitIndex: 7, kind: "candidate" },
  { name: "Hannah Collins", role: "Product Manager", company: "Boston, US", quote: "I was introduced to a team whose mission and working style matched what I had been looking for.", portraitIndex: 8, kind: "candidate" },
  { name: "Noah Williams", role: "Engineering Lead", company: "Brisbane, Australia", quote: "The recruiter understood the technical brief and the leadership qualities we needed from day one.", portraitIndex: 9, kind: "employer" },
  { name: "Charlotte Evans", role: "HR Business Partner", company: "Cardiff, UK", quote: "The process felt personal, efficient and refreshingly honest from the first call to the offer.", portraitIndex: 10, kind: "candidate" },
  { name: "Ethan Parker", role: "Commercial Director", company: "Chicago, US", quote: "Weekly updates were concise and useful, and each candidate arrived fully briefed on our priorities.", portraitIndex: 11, kind: "employer" },
  { name: "Amelia Scott", role: "Data Analyst", company: "Edinburgh, UK", quote: "BOVAS helped me articulate my strengths and focus on opportunities where I could make a real contribution.", portraitIndex: 12, kind: "candidate" },
  { name: "Liam Cooper", role: "Finance Director", company: "Perth, Australia", quote: "The team balanced pace with care and gave us confidence at every stage of the appointment.", portraitIndex: 13, kind: "employer" },
  { name: "Isabella Morgan", role: "UX Designer", company: "Seattle, US", quote: "I never felt pushed toward a role. The advice was thoughtful, and the opportunity felt right for my goals.", portraitIndex: 14, kind: "candidate" },
  { name: "Benjamin Clarke", role: "Managing Director", company: "Birmingham, UK", quote: "A discreet, well-managed search that delivered a leader with the experience and judgement we needed.", portraitIndex: 15, kind: "employer" },
];
