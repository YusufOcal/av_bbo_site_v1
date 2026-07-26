export const navItems = [
  { label: "About", href: "/about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Method", href: "#method" },
  { label: "Matters", href: "#matters" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" }
] as const;

export const heroStats = [
  { value: "18+", label: "Years advising decision makers" },
  { value: "32", label: "Cross-border jurisdictions" },
  { value: "4", label: "Core advisory practices" }
] as const;

export const practiceAreas = [
  {
    eyebrow: "01",
    title: "Corporate & M&A",
    copy: "Transaction architecture, governance, shareholder relations, investment rounds, and board-level commercial judgment.",
    capabilities: ["Transaction Structuring", "Cross-Border M&A", "Shareholder Governance", "Venture & Investment Rounds"]
  },
  {
    eyebrow: "02",
    title: "Dispute Resolution",
    copy: "High-stakes commercial disputes, interim measures, settlement strategy, and litigation decisions shaped around business consequence.",
    capabilities: ["Commercial Litigation", "Interim Relief & Injunctions", "Board & Shareholder Conflicts", "Settlement Negotiation"]
  },
  {
    eyebrow: "03",
    title: "Technology & Data",
    copy: "Platform contracts, privacy programs, data transfers, regulatory risk, and practical operating policies for fast-moving teams.",
    capabilities: ["Data Protection & GDPR", "SaaS & Enterprise Contracts", "Regulatory Compliance", "Vendor Risk Frameworks"]
  },
  {
    eyebrow: "04",
    title: "Employment & Mobility",
    copy: "Executive employment, workforce design, incentives, internal investigations, and immigration strategy for specialist talent.",
    capabilities: ["Executive Contracts & Severance", "Incentive & Option Plans", "Internal Investigations", "Global Mobility Strategy"]
  }
] as const;

export const methodSteps = [
  "Map the commercial objective before the legal theory.",
  "Reduce complex risk into clear decision paths.",
  "Keep partners close to the work when stakes are highest."
] as const;

export const selectedMatters = [
  {
    type: "Acquisition counsel",
    title: "Advised a private investor group on a confidential multi-stage acquisition.",
    detail: "Structuring, diligence, negotiation strategy, and closing coordination across local and international stakeholders."
  },
  {
    type: "Dispute strategy",
    title: "Designed a settlement and interim relief approach for a board-sensitive commercial conflict.",
    detail: "Evidence review, risk scenarios, executive reporting, and negotiation sequencing."
  },
  {
    type: "Technology operations",
    title: "Built a data and vendor contract framework for a regulated digital service.",
    detail: "Privacy controls, processor terms, incident duties, product workflow review, and internal playbooks."
  }
] as const;

export const principles = [
  {
    id: "I",
    title: "Measured communication",
    desc: "We speak with absolute precision. No dense legal jargon—just clear paths and calculated advice for decision makers."
  },
  {
    id: "II",
    title: "Commercially literate drafting",
    desc: "Contracts designed around transaction dynamics. We draft to facilitate commerce, protect assets, and eliminate friction."
  },
  {
    id: "III",
    title: "Partner-led judgment",
    desc: "The partners who advise you are the ones executing the work. Senior counsel remains close when stakes are highest."
  },
  {
    id: "IV",
    title: "Confidential execution",
    desc: "Absolute discretion in sensitive mandates. We operate with strict confidentiality protocols across all jurisdictions."
  }
] as const;

export const articles = [
  {
    date: "October 2024",
    category: "Corporate & M&A",
    title: "Structuring Cross-Border Joint Ventures: Risk Mitigation & Governance Controls",
    readTime: "6 min read",
    summary: "An operational briefing on shareholder deadlock resolution, drag-along mechanisms, and jurisdiction selection for international investments."
  },
  {
    date: "August 2024",
    category: "Technology & Data",
    title: "EU AI Act Compliance for Enterprise Platforms: Operating Duties & Vendor Liabilities",
    readTime: "8 min read",
    summary: "Key compliance checkpoints for platform providers, data processing duties, and model risk categorization."
  },
  {
    date: "May 2024",
    category: "Dispute Strategy",
    title: "Interim Injunction Strategy in High-Stakes Commercial Conflicts",
    readTime: "5 min read",
    summary: "Evaluating early evidentiary preservation, asset freezing orders, and board reporting protocols before filing formal litigation."
  }
] as const;
