
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
  userID: number; // Updated to match backend's "userID"
  name: string;
  email: string;
  password?: string; // Optional, as it might not always be needed
  role: string;
}

export interface Project {
  projectId: number; // Updated to match backend's "projectId"
  name: string;
  description: string;
  startDate: string; // Assuming backend sends this as a string
  projectManager: User; // Nested object for the project manager
}

export interface Bug {
  bugId: number; // Updated to match backend's "bugId"
  title: string;
  category: string; // Added to match backend's "category"
  description: string;
  priority: string; // Updated to match backend's "priority" (e.g., "HIGH", "MEDIUM", "LOW")
  status: string; // Updated to match backend's "status" (e.g., "IN_PROGRESS", "RESOLVED")
  resolvedDate: string | null; // Nullable field
  due: string; // Updated to match backend's "due"
  assignedTo: User; // Nested object for the assigned developer
  createdBy: User; // Nested object for the creator
  project: Project; // Nested object for the project
}

// UI helper types
export enum DueDateStatus {
  OVERDUE = "OVERDUE",
  DUE_SOON = "DUE_SOON",
  UPCOMING = "UPCOMING",
}
