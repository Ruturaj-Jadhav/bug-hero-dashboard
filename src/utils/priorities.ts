
import { BugPriority } from "@/types";

export const getPriorityColor = (priority: BugPriority) => {
  switch (priority) {
    case BugPriority.HIGH:
      return "bg-red-600 text-white";
    case BugPriority.MEDIUM:
      return "bg-amber-500 text-white";
    case BugPriority.LOW:
      return "bg-blue-200 text-blue-900";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getPriorityLabel = (priority: BugPriority) => {
  switch (priority) {
    case BugPriority.HIGH:
      return "High";
    case BugPriority.MEDIUM:
      return "Medium";
    case BugPriority.LOW:
      return "Low";
    default:
      return "Unknown";
  }
};

export const getPriorityIcon = (priority: BugPriority) => {
  switch (priority) {
    case BugPriority.HIGH:
      return "triangle";
    case BugPriority.MEDIUM:
      return "square";
    case BugPriority.LOW:
      return "circle";
    default:
      return "circle";
  }
};

export const getDueDateStatus = (dueDate: string): string => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return "text-red-600 font-medium";
  } else if (diffDays <= 2) {
    return "text-amber-600 font-medium";
  } else {
    return "text-gray-500";
  }
};
