import { Bug, BugPriority, BugStatus } from "@/types";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Flag, Square, Circle, Triangle } from "lucide-react";
import { format, isPast, isToday, addDays, isBefore } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarPlaceholder } from "./ui/avatar-placeholder";
import { getPriorityColor, getDueDateStatus } from "@/utils/priorities";

interface BugCardProps {
  bug: Bug;
  onClick: () => void;
}

export function BugCard({ bug, onClick }: BugCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  // Calculate due date status for visual indication
  const getDueDateStatusVisual = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);

    if (isPast(due)) {
      return "overdue";
    } else if (isToday(due) || isBefore(due, addDays(now, 2))) {
      return "soon";
    } else {
      return "upcoming";
    }
  };

  const dueDateStatus = getDueDateStatusVisual(bug.due);

  // Get priority icon
  const getPriorityIcon = () => {
    switch (bug.priority) {
      case "HIGH":
        return <Triangle className="h-3 w-3 mr-1 fill-current" />;
      case "MEDIUM":
        return <Square className="h-3 w-3 mr-1" />;
      case "LOW":
        return <Circle className="h-3 w-3 mr-1" />;
      default:
        return <Circle className="h-3 w-3 mr-1" />;
    }
  };

  // Card scaling based on priority
  const cardScale =
    bug.priority === "HIGH"
      ? "transform hover:scale-102 transition-all"
      : "";

  // Card border based on priority
  const cardBorder =
    bug.priority === "HIGH"
      ? "border-l-4 border-l-red-500"
      : bug.priority === "MEDIUM"
      ? "border-l-4 border-l-amber-400"
      : "";

  return (
    <Card
      className={cn(
        "hover:shadow-md transition-all cursor-pointer overflow-hidden",
        cardScale,
        cardBorder
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="text-base font-medium line-clamp-2">{bug.title}</h3>
          <Badge
            variant="secondary"
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              getPriorityColor(bug.priority)
            )}
          >
            {getPriorityIcon()}
            {bug.priority}
          </Badge>
        </div>

        <div
          className={cn(
            "flex items-center text-sm mt-4",
            getDueDateStatus(bug.due)
          )}
        >
          {dueDateStatus === "overdue" ? (
            <Clock className="h-3.5 w-3.5 mr-1 text-red-600" />
          ) : dueDateStatus === "soon" ? (
            <Calendar className="h-3.5 w-3.5 mr-1 text-amber-600" />
          ) : (
            <Calendar className="h-3.5 w-3.5 mr-1" />
          )}
          <span>
            {dueDateStatus === "overdue" && "Overdue: "}
            {dueDateStatus === "soon" && "Due soon: "}
            {formatDate(bug.due)}
          </span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <Badge variant={bug.status === "COMPLETED" ? "outline" : "default"}>
            {bug.status === "COMPLETED" ? "Completed" : "In Progress"}
          </Badge>

          <div className="flex-shrink-0">
            <AvatarPlaceholder
              name={bug.createdBy.name}
              className="h-6 w-6 text-xs opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
