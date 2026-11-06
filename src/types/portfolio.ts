export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  availability: string;
  tagline: string;
  bioParagraphs: string[];
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
  portrait: {
    base: string;
    revealOverlay?: string;
  };
  metrics: {
    label: string;
    value: string | number;
  }[];
}

export interface SkillItem {
  name: string;
  level: number; // 1 to 100
  icon?: string;
  experienceYears?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  fullDescription: string;
  image: string;
  tags: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  stats?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image?: string;
  link?: string;
  tag?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description?: string;
  badge?: string;
}
