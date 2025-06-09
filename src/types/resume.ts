export interface SocialNetwork {
  network: string;
  username: string;
}

export interface Skill {
  label: string;
  details: string;
}

export interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  location: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  area: string;
  degree: string;
  start_date: string;
  end_date: string;
  location: string;
  summary?: string;
  highlights?: string[];
}

export interface Publication {
  title: string;
  authors: string[];
  url?: string;
  doi?: string;
  journal: string;
  date: string;
}

export interface Project {
  name: string;
  date: string;
  summary: string;
  highlights: string[];
}

export interface Resume {
  cv: {
    name: string;
    location: string;
    email: string;
    phone: string;
    social_networks: SocialNetwork[];
    sections: {
      about_me: string[];
      skills: Skill[];
      experience: Experience[];
      education: Education[];
      selected_patents_and_publications: Publication[];
      projects: Project[];
    };
  };
}
