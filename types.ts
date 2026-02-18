
export type CategoryId = 
  | 'logo-design' 
  | 'flyers' 
  | 'icons' 
  | 'brochures' 
  | 'isometric' 
  | 'layout' 
  | 'social-media' 
  | 'id-cards' 
  | 'print-design' 
  | 'players' 
  | 'browsers'
  | 'infographics'
  | 'ui-design';

export interface CaseStudySection {
  heading: string;
  content: string;
}

export interface CaseStudy {
  overview: string;
  background: string;
  challenge: string;
  strategy: string;
  logoSystem: string;
  visualLanguage: string;
  applications: string;
  outcome: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  client?: string;
  tags: string[];
  caseStudy?: CaseStudy;
}

export interface PortfolioCategory {
  id: CategoryId;
  title: string;
  shortDescription: string;
  longDescription: string;
  items: PortfolioItem[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  experience: Experience[];
  education: Education[];
  skills: {
    design: string[];
    technical: string[];
  };
  awards: string[];
}

export interface PortfolioData {
  designerName: string;
  role: string;
  experienceYears: string;
  summary: string;
  categories: PortfolioCategory[];
  resume: ResumeData;
}

export type ViewMode = 'grid' | 'masonry' | 'large';
