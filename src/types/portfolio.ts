// ============================================
// Project — Case-study storytelling structure
// ============================================
export interface Project {
  id: number;
  title: string;
  subtitle: string;
  whatIDid: string[];
  techStack: string[];
  features: string[];
  results: string[];
  images?: string[];
  imageUrl?: string;
  uiPreviewUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  year: string;
  // English translation fields
  subtitleEn?: string;
  whatIDidEn?: string[];
  featuresEn?: string[];
  resultsEn?: string[];
}

// ============================================
// Skill — Categorized, no levels
// ============================================
export interface Skill {
  name: string;
  category: string;
  iconUrl?: string;
}

// ============================================
// Experience — Year-anchored timeline
// ============================================
export interface Experience {
  id: number;
  year: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  imageUrl?: string;
  location?: string;
}

// ============================================
// Certificate
// ============================================
export interface Certificate {
  id: number;
  title: string;
  organization: string;
  year: string;
  imageUrl?: string;
  skills?: string[];
  credentialUrl?: string;
}

// ============================================
// Navigation
// ============================================
export interface NavItem {
  name: string;
  href: string;
}

// ============================================
// OtherSkillItem — Design, Tools & Other Capabilities
// ============================================
export interface OtherSkillItem {
  id: number;
  title: string;
  category: string;          // e.g. 'Design', 'Tools', 'Presentation'
  description: string;
  descriptionEn?: string;
  tools: string[];           // software / tech used
  images?: string[];
  year: string;
}
