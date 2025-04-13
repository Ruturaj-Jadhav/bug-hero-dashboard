
import { Bug, BugPriority, BugStatus } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Circle, Clock, Flag, Info, Tag, User, Triangle, Square, AlertCircle } from "lucide-react";
import { format, isPast, isToday, addDays, isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AvatarPlaceholder } from "./ui/avatar-placeholder";
import { useState } from "react";
import { getPriorityColor } from "@/utils/priorities";

interface BugModalProps {
  bug: Bug | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus: (bugId: string, status: BugStatus) => Promise<boolean>;
}

export function BugModal({ bug, open, onClose, onUpdateStatus }: BugModalProps) {
  const [updating, setUpdating] = useState(false);

  if (!bug) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const getDueDateStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    
    if (isPast(due)) {
      return {
        label: "Overdue",
        className: "text-red-600 font-medium",
        icon: <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
      };
    } else if (isToday(due)) {
      return {
        label: "Due today",
        className: "text-amber-600 font-medium",
        icon: <Clock className="h-4 w-4 text-amber-600 mr-2" />
      };
    } else if (isBefore(due, addDays(now, 2))) {
      return {
        label: "Due soon",
        className: "text-amber-500 font-medium",
        icon: <Clock className="h-4 w-4 text-amber-500 mr-2" />
      };
    } else {
      return {
        label: "Upcoming",
        className: "text-gray-500",
        icon: <Calendar className="h-4 w-4 text-gray-400 mr-2" />
      };
    }
  };

  const getPriorityIcon = (priority: BugPriority) => {
    switch (priority) {
      case BugPriority.HIGH:
        return <Triangle className="h-3.5 w-3.5 mr-1 fill-current" />;
      case BugPriority.MEDIUM:
        return <Square className="h-3.5 w-3.5 mr-1" />;
      case BugPriority.LOW:
        return <Circle className="h-3.5 w-3.5 mr-1" />;
      default:
        return <Circle className="h-3.5 w-3.5 mr-1" />;
    }
  };

  const dueDateStatus = getDueDateStatus(bug.dueDate);

  const handleStatusUpdate = async () => {
    if (!bug) return;
    
    const newStatus = bug.status === BugStatus.IN_PROGRESS 
      ? BugStatus.COMPLETED 
      : BugStatus.IN_PROGRESS;
    
    setUpdating(true);
    await onUpdateStatus(bug.id, newStatus);
    setUpdating(false);
  };

  // Handle keyboard shortcut for closing and status update
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleStatusUpdate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[550px]"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{bug.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">{bug.description}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary"
                className={cn(
                  "rounded-full px-2.5 py-0.5",
                  getPriorityColor(bug.priority)
                )}
              >
                {getPriorityIcon(bug.priority)}
                {bug.priority} Priority
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                Status: 
                <span className={bug.status === BugStatus.COMPLETED ? "text-green-600 font-medium ml-1" : "text-blue-600 font-medium ml-1"}>
                  {bug.status === BugStatus.COMPLETED ? "Completed" : "In Progress"}
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Assigned: {formatDate(bug.assignedDate)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={dueDateStatus.className}>
                {dueDateStatus.icon}
                <span className="text-sm">{dueDateStatus.label}: {formatDate(bug.dueDate)}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">Reported by:</span>
            </div>
            
            <div className="flex items-center gap-2 pl-6">
              {bug.createdBy.avatar ? (
                <img 
                  src={bug.createdBy.avatar} 
                  alt={bug.createdBy.name} 
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <AvatarPlaceholder name={bug.createdBy.name} className="h-6 w-6 text-xs" />
              )}
              <span className="text-sm">{bug.createdBy.name}</span>
              <span className="text-xs text-gray-500">({bug.createdBy.email})</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          <div className="text-xs text-gray-400 hidden md:block">
            Tip: Press Esc to close, Ctrl+Enter to update status
          </div>
          
          <Button 
            variant={bug.status === BugStatus.COMPLETED ? "outline" : "default"}
            onClick={handleStatusUpdate}
            disabled={updating}
            className={bug.status === BugStatus.COMPLETED ? "bg-white hover:bg-gray-100" : ""}
          >
            {updating ? (
              <span className="flex items-center">
                <Circle className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </span>
            ) : bug.status === BugStatus.COMPLETED ? (
              <span className="flex items-center">
                <Circle className="mr-2 h-4 w-4" />
                Mark as In Progress
              </span>
            ) : (
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Completed
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
