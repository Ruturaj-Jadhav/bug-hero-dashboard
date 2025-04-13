
export enum BugStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum BugPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  assignedDevelopers: string[];
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: BugStatus;
  priority: BugPriority;
  assignedTo: string;
  createdBy: User;
  assignedDate: string;
  dueDate: string;
}
