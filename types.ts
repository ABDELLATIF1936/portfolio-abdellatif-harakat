
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Network' | 'Systems' | 'Security' | 'Dev' | 'Soft';
  level: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  courses: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Professor' | 'Student' | 'Project Lead' | 'Peer';
  content: string;
  institution?: string;
  projectContext?: string;
}

// Added missing Certification interface
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  about: string;
  email: string;
  linkedin: string;
  github: string;
  projects: Project[];
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  testimonials: Testimonial[];
  // Added certifications field to PortfolioData
  certifications: Certification[];
}
