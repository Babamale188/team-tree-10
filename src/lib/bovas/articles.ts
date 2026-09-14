import { PHOTOS } from "./images";

export interface ArticleSection {
  heading: string;
  body: string[];
  image?: { id: string; alt: string; caption?: string };
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  authorRole: string;
  published: string;
  readingTime: string;
  hero: string;
  heroAlt: string;
  intro: string;
  sections: ArticleSection[];
  takeaways: string[];
}

export const CATEGORIES = [
  "CV & Resume",
  "Interview Preparation",
  "Career Development",
  "Job Search",
  "Workplace Advice",
  "Skills & Training",
];

export const ARTICLES: Article[] = [
  {
    slug: "how-to-build-a-cv-that-gets-noticed",
    title: "How to Build a CV That Gets Noticed",
    category: "CV & Resume",
    excerpt:
      "A practical structure for a CV that survives screening software and still reads like a human wrote it.",
    author: "Rashmi Babale",
    authorRole: "Principal Recruitment Consultant, BOVAS",
    published: "12 August 2046",
    readingTime: "8 min read",
    hero: PHOTOS.laptopWork,
    heroAlt: "Professional updating their CV on a laptop",
    intro:
      "Most CVs are rejected for avoidable reasons: unclear structure, unproven claims, or a layout that screening tools cannot read. A strong CV is not a biography — it is an argument that you can do a specific job well.",
    sections: [
      {
        heading: "1. Start with a strong summary",
        body: [
          "Open with three or four lines that state your discipline, your years of relevant experience and the outcome you are known for. Avoid adjectives with no evidence behind them.",
          "A hiring manager should know within ten seconds what kind of role you are targeting and why you are credible for it.",
        ],
        image: { id: PHOTOS.planning, alt: "Candidate planning the structure of their CV", caption: "Plan the structure before you write a word." },
      },
      {
        heading: "2. Lead every bullet with an outcome",
        body: [
          "Replace responsibility statements with results. Instead of 'responsible for reporting', write 'rebuilt monthly reporting, cutting close time from nine days to four'.",
          "Where numbers are confidential, describe scale in relative terms: team size, budget band, or percentage improvement.",
        ],
        image: { id: PHOTOS.analytics, alt: "Reviewing performance metrics on screen" },
      },
      {
        heading: "3. Tailor to the role, not the industry",
        body: [
          "Read the job description and mirror its language where it is honest to do so. Screening tools and human readers both look for the same core terms.",
          "Two tailored applications will outperform ten generic ones almost every time.",
        ],
        image: { id: PHOTOS.discussion, alt: "Recruiter and candidate discussing a role" },
      },
      {
        heading: "4. Keep the format simple and readable",
        body: [
          "Use one column, standard headings, consistent dates and a readable font. Avoid tables, text boxes, graphics and photographs unless the role specifically calls for them.",
          "Two pages is the practical maximum for most professionals.",
        ],
        image: { id: PHOTOS.officeSpace, alt: "Clean modern workspace" },
      },
      {
        heading: "5. Get a second opinion before you send",
        body: [
          "Ask a colleague in your field and, ideally, a recruiter who places your type of role. They will spot missing context you cannot see.",
          "Your BOVAS consultant will review your CV and tell you exactly what a hiring manager will question.",
        ],
        image: { id: PHOTOS.mentoring, alt: "Consultant reviewing a candidate CV together" },
      },
    ],
    takeaways: [
      "Write for a specific role, not for every role",
      "Evidence beats adjectives — quantify wherever possible",
      "Simple formatting survives screening software",
      "Two pages, consistent dates, no gaps left unexplained",
    ],
  },
  {
    slug: "5-ways-to-prepare-for-your-next-interview",
    title: "5 Ways to Prepare for Your Next Interview",
    category: "Interview Preparation",
    excerpt:
      "Preparation separates candidates who are qualified from candidates who get offers. Here is what works.",
    author: "Nason Bamy",
    authorRole: "Executive Search Consultant, BOVAS",
    published: "3 August 2046",
    readingTime: "7 min read",
    hero: PHOTOS.interview,
    heroAlt: "Candidate in a professional interview",
    intro:
      "Interviews reward structured thinking under mild pressure. You cannot script the conversation, but you can prepare the raw material you will need.",
    sections: [
      {
        heading: "1. Research the business, not just the role",
        body: [
          "Understand how the organisation makes money, who its customers are and what pressure its market is under. Questions that show commercial awareness are memorable.",
        ],
        image: { id: PHOTOS.laptopWork, alt: "Candidate researching a company before an interview" },
      },
      {
        heading: "2. Build a story bank",
        body: [
          "Prepare six to eight concise examples covering delivery, conflict, failure, leadership, change and stakeholder management. Use a consistent structure: situation, action, result.",
        ],
        image: { id: PHOTOS.planning, alt: "Writing interview examples in a notebook" },
      },
      {
        heading: "3. Rehearse out loud",
        body: [
          "Rehearsing in your head hides the gaps. Say answers out loud, ideally to another person, and cut anything that takes longer than two minutes.",
        ],
        image: { id: PHOTOS.discussion, alt: "Mock interview practice session" },
      },
      {
        heading: "4. Prepare for the practical stage",
        body: [
          "Many processes include a task, presentation or technical stage. Ask your consultant what format to expect and what the assessors are scoring.",
        ],
        image: { id: PHOTOS.presenting, alt: "Candidate presenting at an interview stage" },
      },
      {
        heading: "5. Bring three good questions",
        body: [
          "Ask about success measures in the first six months, how the team handles disagreement, and what would make the hire a mistake. The answers tell you more than a job description will.",
        ],
        image: { id: PHOTOS.handshake, alt: "Interview concluding with a handshake" },
      },
    ],
    takeaways: [
      "Commercial context makes you memorable",
      "A story bank keeps answers tight under pressure",
      "Rehearse aloud, not silently",
      "Your questions are part of your assessment",
    ],
  },
  {
    slug: "how-to-find-the-right-career-opportunity",
    title: "How to Find the Right Career Opportunity",
    category: "Job Search",
    excerpt:
      "A method for choosing roles that fit your direction, not just roles that are available this month.",
    author: "Favour Chwaka",
    authorRole: "Technology Recruitment Lead, BOVAS",
    published: "22 July 2046",
    readingTime: "6 min read",
    hero: PHOTOS.workplaceCulture,
    heroAlt: "Professionals working together in a modern workplace",
    intro:
      "The best career moves are rarely the highest bidder. They are the roles that add a capability you want, in an environment where you can do your best work.",
    sections: [
      {
        heading: "Define your non-negotiables first",
        body: [
          "Write down the three things a role must offer and the two you will never accept again. Everything else is a trade-off you can evaluate calmly.",
        ],
        image: { id: PHOTOS.planning, alt: "Planning career priorities" },
      },
      {
        heading: "Judge the team, not just the title",
        body: [
          "Your manager and immediate team shape your experience more than the company logo. Ask to meet them before you decide.",
        ],
        image: { id: PHOTOS.teamMeeting, alt: "Team meeting in an office" },
      },
      {
        heading: "Look for roles that compound",
        body: [
          "Prioritise positions that build a skill or relationship set you can use for the next decade, not only the next year.",
        ],
        image: { id: PHOTOS.learning, alt: "Professional developing new skills" },
      },
      {
        heading: "Use a consultant as a market lens",
        body: [
          "A specialist recruiter sees dozens of comparable roles each month. That context is hard to replicate from job adverts alone.",
        ],
        image: { id: PHOTOS.mentoring, alt: "Career conversation with a recruitment consultant" },
      },
      {
        heading: "Move deliberately, not reactively",
        body: [
          "Run a short, focused search rather than an open-ended one. Quality of application beats volume in every market we operate in.",
        ],
        image: { id: PHOTOS.officeSpace, alt: "Calm professional workspace" },
      },
    ],
    takeaways: [
      "Set non-negotiables before you browse roles",
      "Meet the team you will actually work with",
      "Choose roles that compound your capability",
      "Short focused searches outperform open-ended ones",
    ],
  },
  {
    slug: "skills-employers-are-looking-for",
    title: "Skills Employers Are Looking For",
    category: "Skills & Training",
    excerpt:
      "What hiring managers consistently ask us for across technology, finance, healthcare and commercial teams.",
    author: "Chelsea Volz",
    authorRole: "Head of Candidate Experience, BOVAS",
    published: "9 July 2046",
    readingTime: "6 min read",
    hero: PHOTOS.learning,
    heroAlt: "Professional in a learning and development session",
    intro:
      "Job specifications change slowly; hiring conversations change fast. These are the capabilities employers raise most often in our briefing calls.",
    sections: [
      {
        heading: "Data fluency in non-data roles",
        body: [
          "Marketing, HR, operations and finance teams all expect colleagues who can interrogate a dashboard and defend a conclusion.",
        ],
        image: { id: PHOTOS.analytics, alt: "Reviewing a data dashboard" },
      },
      {
        heading: "Working well with AI tooling",
        body: [
          "Employers are less interested in tool names and more interested in judgement: knowing when output is wrong and what to do about it.",
        ],
        image: { id: PHOTOS.tech3, alt: "Professional working with modern software tools" },
      },
      {
        heading: "Stakeholder communication",
        body: [
          "The ability to explain a technical or financial position to a non-specialist audience is repeatedly named as the difference between good and great hires.",
        ],
        image: { id: PHOTOS.presenting, alt: "Presenting to stakeholders" },
      },
      {
        heading: "Delivery discipline",
        body: [
          "Consistent, predictable delivery — scoping, communicating, finishing — remains scarcer than employers expect.",
        ],
        image: { id: PHOTOS.collaboration, alt: "Team delivering a project together" },
      },
      {
        heading: "Adaptability, evidenced",
        body: [
          "Every candidate claims it. Evidence it with a concrete example of changing your approach when the facts changed.",
        ],
        image: { id: PHOTOS.discussion, alt: "Team adapting plans in a working session" },
      },
    ],
    takeaways: [
      "Data fluency is now expected outside data roles",
      "Judgement matters more than tool familiarity",
      "Communication skills separate good hires from great ones",
      "Evidence adaptability instead of claiming it",
    ],
  },
  {
    slug: "negotiating-a-job-offer-with-confidence",
    title: "Negotiating a Job Offer With Confidence",
    category: "Career Development",
    excerpt: "How to discuss salary, scope and flexibility without damaging the relationship.",
    author: "Nason Bamy",
    authorRole: "Executive Search Consultant, BOVAS",
    published: "28 June 2046",
    readingTime: "5 min read",
    hero: PHOTOS.handshake,
    heroAlt: "Professionals agreeing terms in a meeting",
    intro:
      "Negotiation is a normal part of hiring. Handled well, it sets the tone for a strong working relationship.",
    sections: [
      {
        heading: "Know the market range",
        body: ["Anchor to evidence, not to hope. Your consultant can share realistic ranges for comparable roles and locations."],
        image: { id: PHOTOS.finance2, alt: "Reviewing salary benchmarking data" },
      },
      {
        heading: "Negotiate the whole package",
        body: ["Base salary is one variable. Bonus, pension, flexibility, review timing and development budget all carry real value."],
        image: { id: PHOTOS.planning, alt: "Reviewing an offer package" },
      },
      {
        heading: "Be specific and be calm",
        body: ["Make one clear, justified request rather than a list of open-ended asks."],
        image: { id: PHOTOS.discussion, alt: "Calm negotiation conversation" },
      },
      {
        heading: "Get it in writing",
        body: ["Confirm the agreed terms in the contract before resigning from your current role."],
        image: { id: PHOTOS.legal, alt: "Reviewing a written employment contract" },
      },
      {
        heading: "Protect the relationship",
        body: ["You will work with these people from day one. Professional, evidence-led conversations build credibility."],
        image: { id: PHOTOS.teamMeeting, alt: "New colleagues meeting for the first time" },
      },
    ],
    takeaways: [
      "Anchor requests to market evidence",
      "Consider the full package, not just base pay",
      "One clear ask beats a long list",
      "Confirm everything in writing before resigning",
    ],
  },
  {
    slug: "first-90-days-in-a-new-role",
    title: "Your First 90 Days in a New Role",
    category: "Workplace Advice",
    excerpt: "A simple plan for building credibility early without over-promising.",
    author: "Chelsea Volz",
    authorRole: "Head of Candidate Experience, BOVAS",
    published: "14 June 2046",
    readingTime: "6 min read",
    hero: PHOTOS.onboarding,
    heroAlt: "New employee being onboarded by a colleague",
    intro:
      "The first three months set expectations that are hard to reset later. Spend them learning deliberately and delivering something visible.",
    sections: [
      {
        heading: "Days 1–30: listen and map",
        body: ["Meet stakeholders, document how work actually flows, and note where friction is tolerated rather than fixed."],
        image: { id: PHOTOS.discussion, alt: "New starter meeting stakeholders" },
      },
      {
        heading: "Days 31–60: find one visible win",
        body: ["Choose a problem that is small enough to finish and important enough to be noticed."],
        image: { id: PHOTOS.collaboration, alt: "Team working on an improvement project" },
      },
      {
        heading: "Days 61–90: agree the plan",
        body: ["Present what you have learned and what you will own next. Get explicit agreement on priorities."],
        image: { id: PHOTOS.presenting, alt: "Presenting a 90-day plan" },
      },
      {
        heading: "Build the relationships early",
        body: ["Informal trust built in month one makes month six far easier."],
        image: { id: PHOTOS.workplaceCulture, alt: "Colleagues building working relationships" },
      },
      {
        heading: "Ask for feedback before it is offered",
        body: ["A short check-in at week six prevents surprises at the probation review."],
        image: { id: PHOTOS.mentoring, alt: "Manager giving feedback to a new employee" },
      },
    ],
    takeaways: [
      "Map how work really flows before changing it",
      "Deliver one visible win by day 60",
      "Agree priorities explicitly at day 90",
      "Ask for feedback early and often",
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const relatedArticles = (slug: string, n = 3) =>
  ARTICLES.filter((a) => a.slug !== slug).slice(0, n);
