
import { BugPriority } from "@/types";

export const getPriorityColor = (priority: BugPriority) => {
  switch (priority) {
    case BugPriority.HIGH:
      return "bg-red-500 text-white";
    case BugPriority.MEDIUM:
      return "bg-warning text-white";
    case BugPriority.LOW:
      return "bg-blue-100 text-blue-800";
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
