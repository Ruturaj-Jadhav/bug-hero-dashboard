
export enum BugStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum BugPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface User {
  userID: number; 
  name: string;
  email: string;
  password?: string; 
  role: string;
}

export interface Project {
  projectId: number;
  name: string;
  description: string;
  startDate: string;
  projectManager: User;
  bugCount?: number; // Added for tester dashboard
  createdDate?: string; // Added for tester dashboard
}

export interface Bug {
  bugId: number;
  title: string;
  category: string;
  description: string;
  priority: string;
  status: string;
  resolvedDate: string | null;
  due: string;
  assignedTo: User;
  createdBy: User;
  project: Project;
  screenshot?: string; // Added for tester dashboard
}

// UI helper types
export enum DueDateStatus {
  OVERDUE = "OVERDUE",
  DUE_SOON = "DUE_SOON",
  UPCOMING = "UPCOMING",
}
