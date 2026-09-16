// Curated professional photography (Unsplash). Replace ids with brand photography when available.
const U = "https://images.unsplash.com/photo-";

export function img(id: string, w = 1200, h?: number) {
  const crop = h ? `&h=${h}&fit=crop` : "&fit=crop";
  return `${U}${id}?auto=format&q=80&w=${w}${crop}`;
}

export const PHOTOS = {
  heroHome: "1600880292203-757bb62b4baf",
  heroJobs: "1497215728101-856f4ea42174",
  heroCandidates: "1573496359142-b8d87734a5a2",
  heroEmployers: "1560250097-0b93528c311a",
  heroIndustries: "1486406146926-c627a92ad1ab",
  heroResources: "1434030216411-0b793f4b4173",
  heroAbout: "1522071820081-009f0129c71c",
  heroContact: "1497366754035-f200968a6e72",

  teamMeeting: "1521737604893-d14cc237f11d",
  collaboration: "1531545514256-b1400bc00f31",
  interview: "1517245386807-bb43f82c33c4",
  handshake: "1521791136064-7986c2920216",
  officeSpace: "1497215842964-222b430dc094",
  discussion: "1552664730-d307ca884978",
  planning: "1454165804606-c3d57bc86b40",
  presenting: "1517048676732-d65bc937f952",
  laptopWork: "1542626991-cbc4e32524cc",
  learning: "1434030216411-0b793f4b4173",
  mentoring: "1573497019940-1c28c88b4f3e",
  onboarding: "1551836022-d5d88e9218df",
  workplaceCulture: "1519389950473-47ba0277781c",
  analytics: "1516321318423-f06f85e504b3",

  tech: "1531482615713-2afd69097998",
  tech2: "1487058792275-0ad4aaf24ca7",
  tech3: "1611974789855-9c2a0a7236a3",
  health: "1576091160399-112ba8d25d1d",
  health2: "1579684385127-1ef15d508118",
  health3: "1544725176-7c40e5a71c5e",
  finance: "1554224155-6726b3ff858f",
  finance2: "1504384308090-c894fdcc538d",
  finance3: "1553877522-43269d4ea984",
  engineering: "1581092160562-40aa08e78837",
  engineering2: "1581091226825-a6a2a5aee158",
  marketing: "1552581234-26160f608093",
  marketing2: "1557804506-669a67965ba0",
  sales: "1542744173-8e7e53415bb0",
  hr: "1573497019940-1c28c88b4f3e",
  construction: "1504307651254-35680f356dfd",
  construction2: "1541888946425-d81bb19240f5",
  logistics: "1566576912321-d58ddd7a6088",
  logistics2: "1553413077-190dd305871c",
  hospitality: "1566073771259-6a8506099945",
  hospitality2: "1551882547-ff40c63fe5fa",
  legal: "1589829545856-d10d557cf95f",
  legal2: "1436450412740-6b988f486c6b",
  education: "1523050854058-8df90110c9f1",
  education2: "1509062522246-3755977927d7",
} as const;

export const PORTRAITS = [
  "1494790108377-be9c29b29330",
  "1472099645785-5658abf4ff4e",
  "1438761681033-6461ffad8d80",
  "1507003211169-0a1dd7228f2d",
  "1560250097-0b93528c311a",
  "1573496359142-b8d87734a5a2",
  "1519345182560-3f2917c472ef",
  "1544005313-94ddf0286df2",
  "1500648767791-00dcc994a43e",
  "1534528741775-53994a69daeb",
  "1531123897727-8f129e1688ce",
  "1506794778202-cad84cf45f1d",
  "1531427186611-ecfd6d936c79",
  "1544723795-3fb6469f5b39",
  "1508214751196-bcfd4ca60f91",
  "1524504388940-b1c1722653e1",
];

export const portrait = (i: number, w = 160) =>
  img(PORTRAITS[i % PORTRAITS.length], w, w);
