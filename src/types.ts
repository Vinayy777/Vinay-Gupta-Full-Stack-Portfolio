export interface MetricCard {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  details?: string;
}

export interface DeveloperProfile {
  name: string;
  role: string;
  title: string;
  tagline: string;
  headline: string;
  valueProposition: string;
  ctaTextPrimary: string;
  ctaTextSecondary: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  primaryTechStack: string[];
  experienceLevel: string;
  targetAudience: string;
  email: string;
  phone?: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  availability: string;
  stats: MetricCard[];
  education?: EducationItem[];
  certifications?: string[];
}

export interface TechSkill {
  name: string;
  level: string; // e.g. 'Expert' | 'Advanced' | 'Proficient'
  years: string;
  iconName: string;
  description: string;
  highlight?: boolean;
}

export interface TechStackCategory {
  category: 'Frontend' | 'Backend' | 'Database & DevOps' | 'Tools & Architecture';
  icon: string;
  summary: string;
  skills: TechSkill[];
}

export interface EngineeringChallenge {
  challenge: string;
  solution: string;
  impact: string;
}

export interface FeaturedProject {
  id: string;
  name: string;
  tagline: string;
  category: 'Full-Stack' | 'Cloud & Distributed' | 'DevOps & Pipeline' | 'Real-Time';
  problemStatement: string;
  technicalSolution: string;
  keyFeatures: string[];
  techStack: string[];
  engineeringChallenges: EngineeringChallenge[];
  metrics: { label: string; value: string }[];
  liveDemoUrl?: string;
  githubUrl?: string;
  architectureNotes?: string;
  image: string;
  videoUrl?: string;
  videoPoster?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Leadership';
  summary: string;
  quantifiableResults: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  relationship: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
