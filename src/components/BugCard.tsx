
import { Bug, BugPriority } from "@/types";
import { cn } from "@/lib/utils";
import { Calendar, Flag } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface BugCardProps {
  bug: Bug;
  onClick: () => void;
}

export function BugCard({ bug, onClick }: BugCardProps) {
  const priorityColors = {
    [BugPriority.LOW]: "bg-blue-100 text-blue-800",
    [BugPriority.MEDIUM]: "bg-warning text-white",
    [BugPriority.HIGH]: "bg-red-500 text-white",
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start gap-2 mb-3">
        <h3 className="text-base font-medium line-clamp-2">{bug.title}</h3>
        <Badge 
          variant="secondary"
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            priorityColors[bug.priority]
          )}
        >
          <Flag className="h-3 w-3 mr-1" />
          {bug.priority}
        </Badge>
      </div>

      <div className="flex items-center text-gray-500 text-sm mt-4">
        <Calendar className="h-3.5 w-3.5 mr-1" />
        <span>Due: {formatDate(bug.dueDate)}</span>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <Badge variant={bug.status === "COMPLETED" ? "outline" : "default"}>
          {bug.status === "COMPLETED" ? "Completed" : "In Progress"}
        </Badge>
      </div>
    </div>
  );
}
