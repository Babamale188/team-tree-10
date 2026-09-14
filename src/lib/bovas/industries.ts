import { PHOTOS } from "./images";

export interface Industry {
  slug: string;
  name: string;
  short: string;
  intro: string;
  overview: string;
  hero: string;
  gallery: { id: string; alt: string }[];
  skills: string[];
  roles: string[];
  trends: { title: string; body: string }[];
  openings: number;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "technology",
    name: "Technology",
    short:
      "Build the future with opportunities across software, data, cybersecurity and emerging technology.",
    intro:
      "Technology teams are hiring for people who can ship reliable products, secure critical systems and turn data into decisions.",
    overview:
      "BOVAS recruits across the full technology stack — from early-career engineers to principal architects and technology leadership. We work with product companies, scale-ups, consultancies and in-house digital teams that need specialist skills quickly, without compromising on quality of hire.",
    hero: PHOTOS.tech,
    gallery: [
      { id: PHOTOS.tech2, alt: "Software engineer reviewing code on a large display" },
      { id: PHOTOS.tech3, alt: "Developer working on a cloud platform dashboard" },
      { id: PHOTOS.collaboration, alt: "Product and engineering team planning a sprint" },
      { id: PHOTOS.analytics, alt: "Data analyst reviewing performance dashboards" },
      { id: PHOTOS.officeSpace, alt: "Modern technology office workspace" },
      { id: PHOTOS.discussion, alt: "Technical interview between engineer and hiring manager" },
    ],
    skills: ["Cloud architecture", "TypeScript & React", "Python", "Kubernetes", "Cybersecurity", "Data engineering", "Machine learning", "Product management"],
    roles: ["Software Engineer", "DevOps Engineer", "Data Engineer", "Security Analyst", "Product Manager", "Engineering Manager", "QA Engineer", "Solutions Architect"],
    trends: [
      { title: "AI-enabled delivery", body: "Teams increasingly value engineers who can pair well with AI tooling while keeping architectural judgement." },
      { title: "Security by default", body: "Security skills are moving from specialist teams into mainstream engineering job descriptions." },
      { title: "Platform thinking", body: "Internal platform and reliability roles remain among the hardest to fill in the market." },
    ],
    openings: 148,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    short: "Support patient outcomes through clinical, allied health and healthcare operations careers.",
    intro:
      "Healthcare employers need dependable clinical and operational professionals who can work at pace without losing care quality.",
    overview:
      "BOVAS supports hospitals, private practices, care providers and health-tech organisations with permanent and temporary recruitment across clinical, allied health, and administrative functions.",
    hero: PHOTOS.health,
    gallery: [
      { id: PHOTOS.health2, alt: "Doctor consulting with a colleague in a hospital corridor" },
      { id: PHOTOS.health3, alt: "Nurse preparing patient notes at a ward station" },
      { id: PHOTOS.teamMeeting, alt: "Healthcare operations team meeting" },
      { id: PHOTOS.planning, alt: "Care coordinator planning staffing rotas" },
      { id: PHOTOS.presenting, alt: "Clinical training session in progress" },
      { id: PHOTOS.officeSpace, alt: "Healthcare administration office" },
    ],
    skills: ["Patient care", "Clinical governance", "Care coordination", "Medical coding", "Health informatics", "Safeguarding", "Rota management"],
    roles: ["Registered Nurse", "Clinical Manager", "Healthcare Assistant", "Medical Scientist", "Practice Manager", "Health Data Analyst"],
    trends: [
      { title: "Flexible staffing", body: "Blended permanent and temporary models help providers cover demand peaks." },
      { title: "Digital health records", body: "Informatics literacy is now expected in most clinical job specifications." },
      { title: "Retention focus", body: "Employers invest more in progression pathways to reduce clinical turnover." },
    ],
    openings: 96,
  },
  {
    slug: "finance",
    name: "Finance & Banking",
    short: "Careers across banking, investment, accountancy, audit and financial operations.",
    intro: "Finance functions are hiring analytical professionals who can pair technical accuracy with commercial insight.",
    overview:
      "From newly qualified accountants to finance directors, BOVAS places professionals across banking, insurance, asset management and corporate finance teams.",
    hero: PHOTOS.finance,
    gallery: [
      { id: PHOTOS.finance2, alt: "Financial analyst reviewing market charts" },
      { id: PHOTOS.finance3, alt: "Team reviewing quarterly financial data" },
      { id: PHOTOS.presenting, alt: "Finance leader presenting results to stakeholders" },
      { id: PHOTOS.handshake, alt: "Client meeting in a banking environment" },
      { id: PHOTOS.officeSpace, alt: "Corporate finance office floor" },
      { id: PHOTOS.analytics, alt: "Risk dashboard being reviewed on screen" },
    ],
    skills: ["Financial modelling", "IFRS", "Risk & compliance", "Audit", "FP&A", "Treasury", "Power BI"],
    roles: ["Financial Analyst", "Management Accountant", "Audit Manager", "Risk Analyst", "Finance Business Partner", "Credit Analyst"],
    trends: [
      { title: "Automation of reporting", body: "Analytical tooling skills now separate strong candidates from the field." },
      { title: "Regulatory pressure", body: "Compliance and financial-crime expertise remains in constant demand." },
      { title: "Commercial partnering", body: "Employers want finance professionals who influence, not just report." },
    ],
    openings: 112,
  },
  {
    slug: "engineering",
    name: "Engineering",
    short: "Mechanical, electrical, civil and manufacturing engineering roles across major projects.",
    intro: "Engineering employers are competing for chartered and experienced technical specialists.",
    overview:
      "BOVAS recruits engineers for infrastructure programmes, manufacturing plants, energy projects and product development teams.",
    hero: PHOTOS.engineering,
    gallery: [
      { id: PHOTOS.engineering2, alt: "Engineer running diagnostics on equipment" },
      { id: PHOTOS.construction2, alt: "Engineering project site inspection" },
      { id: PHOTOS.collaboration, alt: "Design engineers reviewing technical drawings" },
      { id: PHOTOS.planning, alt: "Project engineer planning a delivery schedule" },
      { id: PHOTOS.teamMeeting, alt: "Multidisciplinary engineering team meeting" },
      { id: PHOTOS.analytics, alt: "Engineering performance data review" },
    ],
    skills: ["CAD", "Project delivery", "Lean manufacturing", "Electrical design", "Structural analysis", "Health & safety", "Commissioning"],
    roles: ["Mechanical Engineer", "Electrical Engineer", "Project Engineer", "Manufacturing Engineer", "Civil Engineer", "Maintenance Manager"],
    trends: [
      { title: "Energy transition", body: "Renewables and electrification projects are creating sustained engineering demand." },
      { title: "Chartership premium", body: "Chartered status continues to unlock senior technical pathways." },
      { title: "Digital twins", body: "Simulation and data skills increasingly appear in engineering specs." },
    ],
    openings: 87,
  },
  {
    slug: "marketing",
    name: "Marketing & Communications",
    short: "Brand, digital, content and communications roles for growth-focused organisations.",
    intro: "Marketing teams want measurable growth specialists who can still tell a compelling brand story.",
    overview:
      "BOVAS places marketing professionals across in-house brand teams, agencies and growth functions — from performance specialists to communications directors.",
    hero: PHOTOS.marketing,
    gallery: [
      { id: PHOTOS.marketing2, alt: "Marketing team reviewing campaign creative" },
      { id: PHOTOS.analytics, alt: "Performance marketing dashboard review" },
      { id: PHOTOS.presenting, alt: "Brand strategy presentation" },
      { id: PHOTOS.collaboration, alt: "Content team planning an editorial calendar" },
      { id: PHOTOS.discussion, alt: "Communications workshop in progress" },
      { id: PHOTOS.officeSpace, alt: "Creative marketing studio space" },
    ],
    skills: ["Performance marketing", "SEO", "Brand strategy", "Content design", "Lifecycle CRM", "Analytics", "PR"],
    roles: ["Marketing Manager", "Growth Marketer", "Content Strategist", "SEO Lead", "Communications Manager", "Brand Director"],
    trends: [
      { title: "Full-funnel accountability", body: "Marketers are measured on pipeline contribution, not impressions alone." },
      { title: "In-housing", body: "More organisations build internal creative and performance capability." },
      { title: "AI-assisted content", body: "Editorial judgement matters more as production volume rises." },
    ],
    openings: 74,
  },
  {
    slug: "sales",
    name: "Sales",
    short: "Revenue-generating roles from SDR through to enterprise and commercial leadership.",
    intro: "Employers are hiring consultative sellers who can build long-term commercial relationships.",
    overview:
      "BOVAS recruits across SaaS, industrial, professional services and consumer sales teams, with a focus on evidenced performance and cultural fit.",
    hero: PHOTOS.sales,
    gallery: [
      { id: PHOTOS.handshake, alt: "Sales professional closing an agreement" },
      { id: PHOTOS.presenting, alt: "Account executive presenting to a client" },
      { id: PHOTOS.discussion, alt: "Sales team pipeline review" },
      { id: PHOTOS.analytics, alt: "Revenue analytics review" },
      { id: PHOTOS.teamMeeting, alt: "Commercial leadership meeting" },
      { id: PHOTOS.officeSpace, alt: "Modern commercial office" },
    ],
    skills: ["Consultative selling", "Pipeline management", "Negotiation", "CRM hygiene", "Account strategy", "Forecasting"],
    roles: ["Account Executive", "Business Development Manager", "Sales Manager", "Key Account Manager", "Sales Director", "Customer Success Manager"],
    trends: [
      { title: "Longer buying cycles", body: "Multi-stakeholder selling skills are decisive in current markets." },
      { title: "Revenue operations", body: "Data-literate sellers progress faster into leadership." },
      { title: "Retention focus", body: "Expansion and renewal performance now sits alongside new business." },
    ],
    openings: 103,
  },
  {
    slug: "human-resources",
    name: "Human Resources",
    short: "People, talent and HR operations roles that shape how organisations work.",
    intro: "HR teams are hiring people partners who combine employee experience with commercial judgement.",
    overview:
      "BOVAS supports HR functions with generalist, specialist and leadership hires across talent acquisition, reward, employee relations and people operations.",
    hero: PHOTOS.hr,
    gallery: [
      { id: PHOTOS.onboarding, alt: "HR manager onboarding a new employee" },
      { id: PHOTOS.interview, alt: "HR interview in a meeting room" },
      { id: PHOTOS.teamMeeting, alt: "People team planning session" },
      { id: PHOTOS.presenting, alt: "HR leader presenting a people strategy" },
      { id: PHOTOS.workplaceCulture, alt: "Employees collaborating in an open workplace" },
      { id: PHOTOS.planning, alt: "Workforce planning session" },
    ],
    skills: ["Employee relations", "Talent acquisition", "Reward & benefits", "HRIS", "People analytics", "Organisational design"],
    roles: ["HR Business Partner", "Talent Acquisition Manager", "People Operations Lead", "Reward Analyst", "HR Director", "L&D Manager"],
    trends: [
      { title: "Hybrid policy maturity", body: "Employers refine flexible working rather than reverse it." },
      { title: "Skills-based hiring", body: "Role requirements shift from credentials toward demonstrable skills." },
      { title: "People analytics", body: "Data fluency is now a core HR competency." },
    ],
    openings: 58,
  },
  {
    slug: "construction",
    name: "Construction",
    short: "Site, commercial and project roles across residential, commercial and infrastructure builds.",
    intro: "Construction employers need reliable delivery professionals for complex, deadline-driven programmes.",
    overview:
      "BOVAS recruits site management, quantity surveying, planning and health & safety professionals for contractors, developers and consultancies.",
    hero: PHOTOS.construction,
    gallery: [
      { id: PHOTOS.construction2, alt: "Construction site with active works" },
      { id: PHOTOS.engineering2, alt: "Site engineer checking technical specifications" },
      { id: PHOTOS.planning, alt: "Programme planning for a construction project" },
      { id: PHOTOS.teamMeeting, alt: "Project delivery team briefing" },
      { id: PHOTOS.handshake, alt: "Contract agreement between client and contractor" },
      { id: PHOTOS.officeSpace, alt: "Construction consultancy office" },
    ],
    skills: ["Site management", "Quantity surveying", "NEC contracts", "Programme planning", "CDM regulations", "BIM"],
    roles: ["Site Manager", "Quantity Surveyor", "Project Manager", "Health & Safety Advisor", "Planner", "Contracts Manager"],
    trends: [
      { title: "Sustainable build", body: "Low-carbon construction knowledge is a growing differentiator." },
      { title: "Modern methods", body: "Offsite and modular delivery reshape site team structures." },
      { title: "Skills shortage", body: "Experienced site leadership remains scarce across major markets." },
    ],
    openings: 69,
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    short: "Planning, warehousing, transport and supply chain careers that keep operations moving.",
    intro: "Supply chain employers want operators who can balance cost, service and resilience.",
    overview:
      "BOVAS recruits supply chain professionals for retailers, manufacturers, 3PL providers and e-commerce operations.",
    hero: PHOTOS.logistics,
    gallery: [
      { id: PHOTOS.logistics2, alt: "Transport fleet ready for distribution" },
      { id: PHOTOS.analytics, alt: "Supply chain performance dashboard" },
      { id: PHOTOS.planning, alt: "Demand planning meeting" },
      { id: PHOTOS.teamMeeting, alt: "Operations leadership meeting" },
      { id: PHOTOS.collaboration, alt: "Warehouse operations team briefing" },
      { id: PHOTOS.officeSpace, alt: "Logistics head office" },
    ],
    skills: ["Demand planning", "S&OP", "Warehouse operations", "Transport planning", "Procurement", "Inventory optimisation"],
    roles: ["Supply Chain Analyst", "Warehouse Manager", "Transport Manager", "Procurement Specialist", "Logistics Coordinator", "Operations Director"],
    trends: [
      { title: "Resilient networks", body: "Dual-sourcing and scenario planning skills are highly valued." },
      { title: "Automation", body: "Warehouse automation changes the shape of operational leadership roles." },
      { title: "Sustainability", body: "Emissions reporting is entering mainstream supply chain job scopes." },
    ],
    openings: 64,
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    short: "Hotel, food service and guest experience roles for service-led organisations.",
    intro: "Hospitality employers hire for consistency, warmth and operational discipline.",
    overview:
      "BOVAS supports hotels, restaurant groups, venues and travel businesses with management and operational recruitment.",
    hero: PHOTOS.hospitality,
    gallery: [
      { id: PHOTOS.hospitality2, alt: "Hotel guest reception experience" },
      { id: PHOTOS.teamMeeting, alt: "Hospitality management team briefing" },
      { id: PHOTOS.collaboration, alt: "Front of house team preparing for service" },
      { id: PHOTOS.planning, alt: "Events planning session" },
      { id: PHOTOS.presenting, alt: "Service training session" },
      { id: PHOTOS.officeSpace, alt: "Hospitality group head office" },
    ],
    skills: ["Guest experience", "Food safety", "Revenue management", "Team leadership", "Events delivery", "Cost control"],
    roles: ["Hotel Manager", "Food & Beverage Manager", "Events Manager", "Head Chef", "Guest Relations Manager", "Operations Manager"],
    trends: [
      { title: "Experience economy", body: "Guests expect personalised service delivered consistently." },
      { title: "Retention", body: "Structured progression reduces churn in operational teams." },
      { title: "Tech-enabled service", body: "Digital booking and ordering skills support modern operations." },
    ],
    openings: 47,
  },
  {
    slug: "legal",
    name: "Legal",
    short: "Private practice and in-house legal careers across corporate, commercial and compliance.",
    intro: "Legal employers seek commercially minded practitioners who can manage risk pragmatically.",
    overview:
      "BOVAS recruits solicitors, counsel, paralegals and compliance professionals for firms and in-house legal teams.",
    hero: PHOTOS.legal,
    gallery: [
      { id: PHOTOS.legal2, alt: "Legal professionals outside a courthouse" },
      { id: PHOTOS.discussion, alt: "Legal team reviewing contract terms" },
      { id: PHOTOS.presenting, alt: "Counsel briefing a leadership team" },
      { id: PHOTOS.planning, alt: "Case preparation session" },
      { id: PHOTOS.handshake, alt: "Client engagement meeting" },
      { id: PHOTOS.officeSpace, alt: "Law firm office interior" },
    ],
    skills: ["Contract drafting", "Corporate law", "Regulatory compliance", "Litigation", "Data protection", "Negotiation"],
    roles: ["Corporate Solicitor", "In-house Counsel", "Compliance Manager", "Paralegal", "Contracts Manager", "Legal Director"],
    trends: [
      { title: "In-house growth", body: "More organisations build internal legal capability." },
      { title: "Privacy specialism", body: "Data protection expertise is widely sought across sectors." },
      { title: "Legal operations", body: "Process and technology roles are emerging inside legal teams." },
    ],
    openings: 41,
  },
  {
    slug: "education",
    name: "Education",
    short: "Teaching, academic and education leadership roles across institutions and ed-tech.",
    intro: "Education employers need practitioners who can raise outcomes and support learners.",
    overview:
      "BOVAS partners with schools, colleges, universities and education technology organisations on teaching, support and leadership recruitment.",
    hero: PHOTOS.education,
    gallery: [
      { id: PHOTOS.education2, alt: "Classroom teaching session" },
      { id: PHOTOS.learning, alt: "Student learning with a laptop" },
      { id: PHOTOS.presenting, alt: "Academic presenting to colleagues" },
      { id: PHOTOS.teamMeeting, alt: "Faculty planning meeting" },
      { id: PHOTOS.collaboration, alt: "Education team designing curriculum" },
      { id: PHOTOS.officeSpace, alt: "Education institution administrative office" },
    ],
    skills: ["Curriculum design", "Assessment", "Pastoral care", "SEND support", "Learning technology", "Academic leadership"],
    roles: ["Teacher", "Head of Department", "Lecturer", "Learning Designer", "Education Consultant", "Head of Year"],
    trends: [
      { title: "Blended learning", body: "Digital delivery skills remain part of core teaching practice." },
      { title: "Wellbeing", body: "Pastoral capability is weighted heavily in hiring decisions." },
      { title: "Ed-tech growth", body: "Learning design roles expand outside traditional institutions." },
    ],
    openings: 52,
  },
];

export const industryBySlug = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);
