export interface BioData {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  githubUrl: string;
  birthdate?: string;
}

export interface Project {
  title: string;
  desc: string;
  url: string;
}

export interface GuestbookMessage {
  id: string;
  author: string;
  message: string;
  timestamp: string;
}

export interface CommandDefinition {
  name: string;
  description: string;
  execute: (args: string[]) => string | React.ReactNode;
}
