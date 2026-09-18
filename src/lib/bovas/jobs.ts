import { INDUSTRIES } from "./industries";
import { PHOTOS } from "./images";

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Temporary";
export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type Experience = "Entry level" | "Mid level" | "Senior" | "Lead / Director";

export interface Job {
  slug: string;
  title: string;
  company: string;
  companyInitials: string;
  location: string;
  country: string;
  type: EmploymentType;
  workMode: WorkMode;
  experience: Experience;
  industry: string; // industry slug
  industryName: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  postedDaysAgo: number;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  benefits: string[];
  heroImage: string;
  gallery: { id: string; alt: string }[];
}

const LOCATIONS: { city: string; country: string; currency: string; mult: number }[] = [
  { city: "London, United Kingdom", country: "United Kingdom", currency: "£", mult: 1 },
  { city: "Manchester, United Kingdom", country: "United Kingdom", currency: "£", mult: 0.88 },
  { city: "Edinburgh, United Kingdom", country: "United Kingdom", currency: "£", mult: 0.9 },
  { city: "Birmingham, United Kingdom", country: "United Kingdom", currency: "£", mult: 0.87 },
  { city: "Dublin, Ireland", country: "Ireland", currency: "€", mult: 1.05 },
  { city: "New York, United States", country: "United States", currency: "$", mult: 1.45 },
  { city: "San Francisco, United States", country: "United States", currency: "$", mult: 1.6 },
  { city: "Austin, United States", country: "United States", currency: "$", mult: 1.3 },
  { city: "Chicago, United States", country: "United States", currency: "$", mult: 1.28 },
  { city: "Boston, United States", country: "United States", currency: "$", mult: 1.35 },
  { city: "Toronto, Canada", country: "Canada", currency: "C$", mult: 1.22 },
  { city: "Vancouver, Canada", country: "Canada", currency: "C$", mult: 1.2 },
  { city: "Calgary, Canada", country: "Canada", currency: "C$", mult: 1.14 },
  { city: "Sydney, Australia", country: "Australia", currency: "A$", mult: 1.32 },
  { city: "Melbourne, Australia", country: "Australia", currency: "A$", mult: 1.28 },
  { city: "Brisbane, Australia", country: "Australia", currency: "A$", mult: 1.2 },
  { city: "Auckland, New Zealand", country: "New Zealand", currency: "NZ$", mult: 1.18 },
  { city: "Amsterdam, Netherlands", country: "Netherlands", currency: "€", mult: 1.12 },
  { city: "Berlin, Germany", country: "Germany", currency: "€", mult: 1.1 },
  { city: "Munich, Germany", country: "Germany", currency: "€", mult: 1.16 },
  { city: "Zurich, Switzerland", country: "Switzerland", currency: "CHF ", mult: 1.7 },
  { city: "Stockholm, Sweden", country: "Sweden", currency: "€", mult: 1.05 },
  { city: "Copenhagen, Denmark", country: "Denmark", currency: "€", mult: 1.1 },
  { city: "Singapore", country: "Singapore", currency: "S$", mult: 1.25 },
  { city: "Dubai, United Arab Emirates", country: "United Arab Emirates", currency: "AED ", mult: 1.4 },
];

const COMPANY_NAMES = [
  "Northbridge Group", "Vantera Labs", "Halbrook Partners", "Corvane Systems", "Lumenport",
  "Ardexa Health", "Brightfold", "Kestrel & Co.", "Orenda Digital", "Pinewell Industries",
  "Saltmere Capital", "Thornfield Advisory", "Vireo Technologies", "Westlake Dynamics", "Aldercross",
  "Bexley Harbour", "Clearspan Energy", "Duneford Retail", "Everline Logistics", "Fairhaven Care",
  "Granthill Legal", "Harborlight Media", "Ironvale Manufacturing", "Juniper Row", "Kelmore Analytics",
];

interface RoleDef {
  title: string;
  industry: string;
  base: number;
  span: number;
  level: Experience;
  summary: string;
  resp: string[];
  req: string[];
}

const R = (
  title: string,
  industry: string,
  base: number,
  level: Experience,
  summary: string,
  resp: string[],
  req: string[],
  span = 18000,
): RoleDef => ({ title, industry, base, span, level, summary, resp, req });

const techResp = [
  "Design, build and ship features that meet clear quality and performance standards",
  "Collaborate with product, design and data colleagues throughout delivery",
  "Review peers' work and contribute to engineering standards",
  "Monitor systems in production and respond to issues promptly",
  "Contribute to technical planning and estimation",
];
const techReq = [
  "Proven commercial experience in a comparable role",
  "Strong problem-solving and communication skills",
  "Comfortable working in an agile delivery team",
  "Experience with modern tooling, version control and CI/CD",
];
const genResp = [
  "Own a clear area of delivery and report on progress against agreed outcomes",
  "Work with internal stakeholders to align priorities",
  "Improve processes, documentation and ways of working",
  "Support and mentor less experienced colleagues",
  "Maintain accurate records and reporting",
];
const genReq = [
  "Relevant professional experience in the discipline",
  "Excellent written and verbal communication",
  "Strong organisational skills and attention to detail",
  "Right to work in the advertised location",
];

const ROLES: RoleDef[] = [
  // Technology
  R("Software Engineer", "technology", 72000, "Mid level", "Join a product engineering team building customer-facing services used every day.", techResp, techReq),
  R("Senior Software Engineer", "technology", 95000, "Senior", "Lead technical delivery on a core product area alongside a small, focused team.", techResp, techReq, 28000),
  R("Frontend Engineer", "technology", 74000, "Mid level", "Build accessible, high-performance interfaces for a modern web platform.", techResp, techReq),
  R("Backend Engineer", "technology", 80000, "Mid level", "Design resilient services and APIs powering a growing product suite.", techResp, techReq),
  R("Full Stack Developer", "technology", 78000, "Mid level", "Work across the stack to deliver end-to-end product features.", techResp, techReq),
  R("DevOps Engineer", "technology", 85000, "Senior", "Own build, deployment and observability across cloud infrastructure.", techResp, techReq),
  R("Cloud Architect", "technology", 115000, "Lead / Director", "Define cloud architecture and standards across multiple delivery teams.", techResp, techReq, 35000),
  R("Data Engineer", "technology", 84000, "Mid level", "Build reliable data pipelines that power analytics and machine learning.", techResp, techReq),
  R("Data Analyst", "technology", 58000, "Mid level", "Turn operational data into insight that shapes commercial decisions.", techResp, techReq),
  R("Data Scientist", "technology", 92000, "Senior", "Develop models that improve product performance and decision-making.", techResp, techReq, 26000),
  R("Machine Learning Engineer", "technology", 105000, "Senior", "Take models from prototype to production at scale.", techResp, techReq, 30000),
  R("Cybersecurity Analyst", "technology", 76000, "Mid level", "Protect critical systems through monitoring, response and hardening.", techResp, techReq),
  R("Security Engineer", "technology", 98000, "Senior", "Embed security engineering practice across product and platform teams.", techResp, techReq, 28000),
  R("QA Automation Engineer", "technology", 64000, "Mid level", "Build automated test coverage that protects release quality.", techResp, techReq),
  R("Site Reliability Engineer", "technology", 99000, "Senior", "Improve reliability, performance and incident response for critical services.", techResp, techReq, 28000),
  R("Product Manager", "technology", 88000, "Senior", "Own product direction for a high-impact area of the platform.", genResp, genReq, 26000),
  R("Technical Product Manager", "technology", 94000, "Senior", "Bridge engineering and commercial teams on complex technical products.", genResp, genReq, 26000),
  R("UX Designer", "technology", 68000, "Mid level", "Design intuitive experiences grounded in research and testing.", genResp, genReq),
  R("Product Designer", "technology", 74000, "Mid level", "Shape end-to-end product experiences from concept to delivery.", genResp, genReq),
  R("Engineering Manager", "technology", 118000, "Lead / Director", "Lead and grow a multidisciplinary engineering team.", genResp, genReq, 32000),
  R("IT Support Specialist", "technology", 38000, "Entry level", "Keep colleagues productive with responsive, well-documented IT support.", genResp, genReq, 10000),
  R("Business Intelligence Developer", "technology", 72000, "Mid level", "Build reporting products that leadership relies on.", techResp, techReq),
  R("Mobile Engineer (iOS)", "technology", 82000, "Mid level", "Deliver polished native experiences for a large mobile user base.", techResp, techReq),
  R("Mobile Engineer (Android)", "technology", 82000, "Mid level", "Build and maintain a well-loved Android application.", techResp, techReq),
  R("Platform Engineer", "technology", 92000, "Senior", "Develop internal platform capability that accelerates product teams.", techResp, techReq, 26000),
  R("Solutions Architect", "technology", 108000, "Lead / Director", "Design integrated solutions for enterprise customers.", genResp, genReq, 30000),
  R("Scrum Master", "technology", 66000, "Mid level", "Enable delivery teams to work predictably and improve continuously.", genResp, genReq),
  R("Technical Writer", "technology", 56000, "Mid level", "Create clear documentation for technical and non-technical audiences.", genResp, genReq),
  // Healthcare
  R("Registered Nurse", "healthcare", 42000, "Mid level", "Deliver high-quality patient care within a supportive clinical team.", genResp, genReq, 12000),
  R("Senior Staff Nurse", "healthcare", 52000, "Senior", "Lead shifts and mentor junior clinical colleagues.", genResp, genReq, 14000),
  R("Clinical Nurse Manager", "healthcare", 64000, "Lead / Director", "Manage a clinical unit's staffing, standards and patient outcomes.", genResp, genReq, 16000),
  R("Healthcare Assistant", "healthcare", 26000, "Entry level", "Support patients and clinical staff in day-to-day care delivery.", genResp, genReq, 7000),
  R("Physiotherapist", "healthcare", 46000, "Mid level", "Assess and treat patients across a varied caseload.", genResp, genReq, 12000),
  R("Occupational Therapist", "healthcare", 45000, "Mid level", "Help patients regain independence through tailored therapy plans.", genResp, genReq, 12000),
  R("Radiographer", "healthcare", 48000, "Mid level", "Deliver diagnostic imaging services to a high clinical standard.", genResp, genReq, 12000),
  R("Pharmacist", "healthcare", 58000, "Senior", "Provide clinical pharmacy expertise across services.", genResp, genReq, 14000),
  R("Practice Manager", "healthcare", 52000, "Senior", "Run the operational side of a busy healthcare practice.", genResp, genReq, 14000),
  R("Health Data Analyst", "healthcare", 55000, "Mid level", "Improve care pathways through robust data analysis.", genResp, genReq),
  R("Medical Laboratory Scientist", "healthcare", 50000, "Mid level", "Deliver accurate laboratory diagnostics within regulated standards.", genResp, genReq, 12000),
  R("Care Home Manager", "healthcare", 56000, "Lead / Director", "Lead a care setting with a focus on resident wellbeing and compliance.", genResp, genReq, 15000),
  // Finance
  R("Financial Analyst", "finance", 62000, "Mid level", "Deliver analysis that guides commercial and investment decisions.", genResp, genReq),
  R("Senior Financial Analyst", "finance", 82000, "Senior", "Lead financial analysis for a major business unit.", genResp, genReq, 24000),
  R("Management Accountant", "finance", 58000, "Mid level", "Own month-end reporting and business partnering for a trading unit.", genResp, genReq),
  R("Financial Controller", "finance", 95000, "Lead / Director", "Oversee financial control, reporting and audit readiness.", genResp, genReq, 30000),
  R("Audit Manager", "finance", 78000, "Senior", "Lead audit engagements and develop a growing audit team.", genResp, genReq, 22000),
  R("Risk Analyst", "finance", 66000, "Mid level", "Identify, quantify and monitor financial and operational risk.", genResp, genReq),
  R("Compliance Officer", "finance", 68000, "Mid level", "Keep the business aligned with regulatory obligations.", genResp, genReq),
  R("Investment Analyst", "finance", 78000, "Senior", "Research opportunities and support portfolio decisions.", genResp, genReq, 25000),
  R("Treasury Analyst", "finance", 64000, "Mid level", "Manage liquidity, funding and cash forecasting.", genResp, genReq),
  R("Credit Analyst", "finance", 60000, "Mid level", "Assess credit risk across a commercial lending portfolio.", genResp, genReq),
  R("Finance Business Partner", "finance", 74000, "Senior", "Support operational leaders with decision-grade financial insight.", genResp, genReq, 22000),
  R("Accounts Payable Specialist", "finance", 34000, "Entry level", "Keep supplier payments accurate and on schedule.", genResp, genReq, 9000),
  R("Payroll Manager", "finance", 56000, "Senior", "Run an accurate, compliant payroll operation.", genResp, genReq, 14000),
  R("Tax Manager", "finance", 84000, "Senior", "Manage tax compliance and planning across jurisdictions.", genResp, genReq, 26000),
  // Engineering
  R("Mechanical Engineer", "engineering", 62000, "Mid level", "Design and improve mechanical systems for demanding environments.", genResp, genReq),
  R("Electrical Engineer", "engineering", 66000, "Mid level", "Deliver electrical design and commissioning across projects.", genResp, genReq),
  R("Civil Engineer", "engineering", 60000, "Mid level", "Support infrastructure design and delivery from concept to completion.", genResp, genReq),
  R("Manufacturing Engineer", "engineering", 58000, "Mid level", "Improve manufacturing throughput, quality and cost.", genResp, genReq),
  R("Project Engineer", "engineering", 70000, "Senior", "Coordinate technical delivery across multi-discipline projects.", genResp, genReq, 22000),
  R("Maintenance Manager", "engineering", 68000, "Senior", "Lead planned and reactive maintenance for critical assets.", genResp, genReq, 20000),
  R("Quality Engineer", "engineering", 56000, "Mid level", "Protect product quality through robust inspection and root-cause analysis.", genResp, genReq),
  R("Process Engineer", "engineering", 64000, "Mid level", "Optimise production processes for safety, yield and efficiency.", genResp, genReq),
  R("Automation Engineer", "engineering", 72000, "Senior", "Design and support automated production and control systems.", genResp, genReq, 22000),
  R("Design Engineer", "engineering", 58000, "Mid level", "Produce detailed designs and technical documentation.", genResp, genReq),
  // Marketing
  R("Marketing Manager", "marketing", 58000, "Mid level", "Own multi-channel campaigns that generate measurable demand.", genResp, genReq),
  R("Digital Marketing Specialist", "marketing", 48000, "Mid level", "Run paid, organic and lifecycle channels day to day.", genResp, genReq, 14000),
  R("SEO Manager", "marketing", 60000, "Senior", "Grow organic visibility through technical and content SEO.", genResp, genReq, 18000),
  R("Content Strategist", "marketing", 55000, "Mid level", "Shape content that supports the whole customer journey.", genResp, genReq),
  R("Brand Manager", "marketing", 64000, "Senior", "Protect and grow brand equity across markets.", genResp, genReq, 20000),
  R("Communications Manager", "marketing", 60000, "Senior", "Lead internal and external communications programmes.", genResp, genReq, 18000),
  R("Growth Marketing Lead", "marketing", 78000, "Lead / Director", "Own the growth roadmap and experimentation programme.", genResp, genReq, 24000),
  R("Social Media Manager", "marketing", 44000, "Mid level", "Build engaged communities across social platforms.", genResp, genReq, 12000),
  R("Product Marketing Manager", "marketing", 72000, "Senior", "Position products clearly and enable commercial teams.", genResp, genReq, 22000),
  R("Graphic Designer", "marketing", 42000, "Mid level", "Create brand-consistent design across digital and print.", genResp, genReq, 12000),
  // Sales
  R("Account Executive", "sales", 55000, "Mid level", "Own the full sales cycle for mid-market accounts.", genResp, genReq, 20000),
  R("Enterprise Account Executive", "sales", 88000, "Senior", "Win and grow strategic enterprise relationships.", genResp, genReq, 32000),
  R("Business Development Manager", "sales", 58000, "Mid level", "Open new commercial opportunities in a defined territory.", genResp, genReq, 20000),
  R("Sales Development Representative", "sales", 38000, "Entry level", "Generate qualified pipeline through thoughtful outbound work.", genResp, genReq, 12000),
  R("Key Account Manager", "sales", 64000, "Senior", "Protect and expand revenue with priority customers.", genResp, genReq, 20000),
  R("Sales Manager", "sales", 76000, "Lead / Director", "Lead, coach and forecast for a regional sales team.", genResp, genReq, 26000),
  R("Customer Success Manager", "sales", 58000, "Mid level", "Drive adoption, retention and expansion for a customer portfolio.", genResp, genReq),
  R("Inside Sales Executive", "sales", 42000, "Entry level", "Convert inbound demand into long-term customers.", genResp, genReq, 12000),
  R("Partnerships Manager", "sales", 68000, "Senior", "Build channel and alliance relationships that drive revenue.", genResp, genReq, 20000),
  // HR
  R("HR Business Partner", "human-resources", 62000, "Senior", "Partner with leaders on people strategy and complex casework.", genResp, genReq, 18000),
  R("Talent Acquisition Specialist", "human-resources", 50000, "Mid level", "Run end-to-end hiring processes that candidates rate highly.", genResp, genReq),
  R("Recruitment Manager", "human-resources", 68000, "Lead / Director", "Lead a hiring function and raise quality of hire.", genResp, genReq, 20000),
  R("People Operations Coordinator", "human-resources", 38000, "Entry level", "Keep people processes accurate, timely and compliant.", genResp, genReq, 10000),
  R("Learning & Development Manager", "human-resources", 64000, "Senior", "Design development programmes that build capability.", genResp, genReq, 18000),
  R("Reward Analyst", "human-resources", 58000, "Mid level", "Benchmark and model pay and benefits structures.", genResp, genReq),
  R("HR Director", "human-resources", 110000, "Lead / Director", "Set the people agenda for a growing organisation.", genResp, genReq, 35000),
  // Construction
  R("Site Manager", "construction", 62000, "Senior", "Run day-to-day site delivery, safety and subcontractor performance.", genResp, genReq, 18000),
  R("Quantity Surveyor", "construction", 60000, "Mid level", "Manage commercial performance across live projects.", genResp, genReq),
  R("Senior Quantity Surveyor", "construction", 78000, "Senior", "Lead commercial management on major schemes.", genResp, genReq, 22000),
  R("Construction Project Manager", "construction", 80000, "Lead / Director", "Deliver projects to programme, budget and quality targets.", genResp, genReq, 26000),
  R("Health & Safety Advisor", "construction", 52000, "Mid level", "Embed safe working practice across sites.", genResp, genReq, 14000),
  R("Construction Planner", "construction", 66000, "Senior", "Own programme planning and progress reporting.", genResp, genReq, 20000),
  R("Contracts Manager", "construction", 86000, "Lead / Director", "Oversee multiple sites and contractual performance.", genResp, genReq, 26000),
  // Logistics
  R("Supply Chain Analyst", "logistics", 52000, "Mid level", "Improve service and cost through robust supply chain analysis.", genResp, genReq),
  R("Warehouse Manager", "logistics", 54000, "Senior", "Lead a busy distribution operation and its team.", genResp, genReq, 15000),
  R("Transport Manager", "logistics", 56000, "Senior", "Run compliant, efficient transport operations.", genResp, genReq, 15000),
  R("Procurement Specialist", "logistics", 58000, "Mid level", "Source and negotiate supplier agreements that deliver value.", genResp, genReq),
  R("Demand Planner", "logistics", 54000, "Mid level", "Forecast demand and balance inventory across the network.", genResp, genReq),
  R("Logistics Coordinator", "logistics", 36000, "Entry level", "Coordinate shipments and keep stakeholders informed.", genResp, genReq, 10000),
  R("Operations Director", "logistics", 115000, "Lead / Director", "Lead multi-site operations and long-term network strategy.", genResp, genReq, 35000),
  // Hospitality
  R("Hotel Manager", "hospitality", 58000, "Lead / Director", "Lead a property's commercial and guest experience performance.", genResp, genReq, 16000),
  R("Food & Beverage Manager", "hospitality", 46000, "Senior", "Run F&B operations with consistency and commercial control.", genResp, genReq, 13000),
  R("Head Chef", "hospitality", 52000, "Senior", "Lead a kitchen brigade and own menu development.", genResp, genReq, 14000),
  R("Events Manager", "hospitality", 48000, "Mid level", "Deliver events that clients want to repeat.", genResp, genReq, 13000),
  R("Guest Relations Manager", "hospitality", 42000, "Mid level", "Own the guest journey from arrival to departure.", genResp, genReq, 12000),
  R("Restaurant General Manager", "hospitality", 50000, "Senior", "Run a high-volume site across people, service and P&L.", genResp, genReq, 14000),
  // Legal
  R("Corporate Solicitor", "legal", 82000, "Senior", "Advise on transactions and corporate governance matters.", genResp, genReq, 28000),
  R("In-house Counsel", "legal", 95000, "Senior", "Provide pragmatic legal advice across the business.", genResp, genReq, 30000),
  R("Commercial Contracts Manager", "legal", 72000, "Senior", "Own contract negotiation and lifecycle management.", genResp, genReq, 22000),
  R("Paralegal", "legal", 38000, "Entry level", "Support fee earners with research, drafting and case management.", genResp, genReq, 10000),
  R("Compliance Manager", "legal", 74000, "Senior", "Lead the compliance framework and regulatory reporting.", genResp, genReq, 22000),
  R("Data Protection Officer", "legal", 80000, "Senior", "Own privacy governance across the organisation.", genResp, genReq, 24000),
  // Education
  R("Secondary School Teacher", "education", 40000, "Mid level", "Teach an engaging curriculum and raise student outcomes.", genResp, genReq, 12000),
  R("Head of Department", "education", 56000, "Lead / Director", "Lead curriculum, staff and standards for a subject area.", genResp, genReq, 14000),
  R("University Lecturer", "education", 58000, "Senior", "Teach, research and supervise within an academic department.", genResp, genReq, 18000),
  R("Learning Designer", "education", 54000, "Mid level", "Design digital learning experiences that work at scale.", genResp, genReq),
  R("Teaching Assistant", "education", 26000, "Entry level", "Support classroom learning and individual student needs.", genResp, genReq, 7000),
  R("Education Consultant", "education", 66000, "Senior", "Advise institutions on improvement and delivery strategy.", genResp, genReq, 20000),
];

const TYPES: EmploymentType[] = ["Full-time", "Full-time", "Full-time", "Contract", "Part-time", "Temporary"];
const MODES: WorkMode[] = ["Hybrid", "On-site", "Remote", "Hybrid"];

const INDUSTRY_MEDIA: Record<string, { hero: string; gallery: { id: string; alt: string }[] }> = Object.fromEntries(
  INDUSTRIES.map((i) => [
    i.slug,
    {
      hero: i.hero,
      gallery: i.gallery.slice(0, 6),
    },
  ]),
);

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const round = (n: number) => Math.round(n / 500) * 500;

function build(): Job[] {
  const jobs: Job[] = [];
  const seen = new Set<string>();
  ROLES.forEach((role, ri) => {
    const copies = 3; // ~130 roles x 3 ≈ 390 unique jobs
    for (let c = 0; c < copies; c++) {
      const k = ri * 7 + c * 11;
      const loc = LOCATIONS[(k + ri) % LOCATIONS.length];
      const company = COMPANY_NAMES[(k + c * 3) % COMPANY_NAMES.length];
      const industry = INDUSTRIES.find((i) => i.slug === role.industry)!;
      const media = INDUSTRY_MEDIA[role.industry];
      const slugBase = `${slugify(role.title)}-${slugify(company)}-${slugify(loc.city.split(",")[0])}`;
      if (seen.has(slugBase)) continue;
      seen.add(slugBase);
      const min = round(role.base * loc.mult);
      jobs.push({
        slug: slugBase,
        title: role.title,
        company,
        companyInitials: company
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        location: loc.city,
        country: loc.country,
        type: TYPES[(k + 2) % TYPES.length],
        workMode: MODES[(k + 1) % MODES.length],
        experience: role.level,
        industry: industry.slug,
        industryName: industry.name,
        salaryMin: min,
        salaryMax: round(min + role.span * loc.mult),
        currency: loc.currency,
        postedDaysAgo: (k % 28) + 1,
        summary: role.summary,
        responsibilities: role.resp,
        requirements: role.req,
        preferred: [
          `Experience within the ${industry.name.toLowerCase()} sector`,
          "Relevant professional qualification or equivalent experience",
          "Track record of improving process or performance",
        ],
        benefits: [
          "Competitive salary reviewed annually",
          "Flexible and hybrid working options where the role allows",
          "Pension contribution and private healthcare",
          "Structured learning and development budget",
          "Generous annual leave allowance",
        ],
        heroImage:
          media.gallery.length > 0
            ? [media.hero, ...media.gallery.map((g) => g.id)][
                (ri + c) % (media.gallery.length + 1)
              ]
            : media.hero,
        gallery: [
          ...media.gallery.slice(0, 3),
          { id: PHOTOS.teamMeeting, alt: `${company} team collaborating in the office` },
          { id: PHOTOS.workplaceCulture, alt: `Workplace culture at ${company}` },
          { id: PHOTOS.officeSpace, alt: `${company} office environment in ${loc.city}` },
        ],
      });
    }
  });
  return jobs;
}

export const JOBS: Job[] = build();

export const jobBySlug = (slug: string) => JOBS.find((j) => j.slug === slug);

export const formatSalary = (j: Job) =>
  `${j.currency}${j.salaryMin.toLocaleString()} – ${j.currency}${j.salaryMax.toLocaleString()} / year`;

export const postedLabel = (d: number) =>
  d === 1 ? "Posted 1 day ago" : d < 7 ? `Posted ${d} days ago` : `Posted ${Math.round(d / 7)} week${d >= 14 ? "s" : ""} ago`;

export const featuredJobs = (n = 9) =>
  JOBS.filter((_, i) => i % 17 === 0).slice(0, n);

export const jobsByIndustry = (slug: string, n = 6) =>
  JOBS.filter((j) => j.industry === slug).slice(0, n);

export const relatedJobs = (job: Job, n = 3) =>
  JOBS.filter((j) => j.industry === job.industry && j.slug !== job.slug).slice(0, n);

export const COUNTRIES = Array.from(new Set(JOBS.map((j) => j.country))).sort();
export const EXPERIENCE_LEVELS: Experience[] = ["Entry level", "Mid level", "Senior", "Lead / Director"];
export const EMPLOYMENT_TYPES: EmploymentType[] = ["Full-time", "Part-time", "Contract", "Temporary"];
export const WORK_MODES: WorkMode[] = ["On-site", "Hybrid", "Remote"];
