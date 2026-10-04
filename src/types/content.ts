export interface NavItem {
  label: string;
  href: string;
}

export interface PracticeArea {
  eyebrow: string;
  title: string;
  copy: string;
  capabilities: string[];
}

export interface Principle {
  id: string;
  title: string;
  desc: string;
}

export interface UsefulLink {
  title: string;
  desc: string;
  url: string;
  category: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  readTime: string;
  summary: string;
  author: string;
  tags: string[];
  keyTakeaways: string[];
  contentParagraphs: string[];
}

export interface SiteContent {
  general: {
    brandName: string;
    brandSubtitle: string;
    lawyerName: string;
    barAssociation: string;
    phone: string;
    email: string;
    addressPremise: string;
    regulatoryNotice: string;
  };
  whatsapp: {
    phoneNumber: string;
    defaultMessage: string;
    tooltipText: string;
  };
  navigation: {
    items: NavItem[];
  };
  hero: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
  practiceFocus: {
    sectionTitle: string;
    sectionDescription: string;
    areas: PracticeArea[];
  };
  aboutPrinciples: {
    sectionTitle: string;
    paragraphs: string[];
    principlesLabel: string;
    principles: Principle[];
  };
  usefulLinks: {
    sectionTitle: string;
    sectionDescription: string;
    links: UsefulLink[];
  };
  articlesSection: {
    homeTitle: string;
    viewAllLabel: string;
    pageTitle: string;
    pageDescription: string;
    categories: string[];
    articles: ArticleItem[];
  };
}
