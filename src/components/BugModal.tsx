
import { Bug, BugPriority, BugStatus } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Circle, Clock, Flag, Info, Tag, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AvatarPlaceholder } from "./ui/avatar-placeholder";
import { useState } from "react";

interface BugModalProps {
  bug: Bug | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus: (bugId: string, status: BugStatus) => Promise<boolean>;
}

export function BugModal({ bug, open, onClose, onUpdateStatus }: BugModalProps) {
  const [updating, setUpdating] = useState(false);

  if (!bug) return null;

  const priorityColors = {
    [BugPriority.LOW]: "bg-blue-100 text-blue-800",
    [BugPriority.MEDIUM]: "bg-warning text-white",
    [BugPriority.HIGH]: "bg-red-500 text-white",
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const handleStatusUpdate = async () => {
    if (!bug) return;
    
    const newStatus = bug.status === BugStatus.IN_PROGRESS 
      ? BugStatus.COMPLETED 
      : BugStatus.IN_PROGRESS;
    
    setUpdating(true);
    await onUpdateStatus(bug.id, newStatus);
    setUpdating(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
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
                  priorityColors[bug.priority]
                )}
              >
                <Flag className="h-3.5 w-3.5 mr-1" />
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
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Due: {formatDate(bug.dueDate)}</span>
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
