
import { Bug, BugStatus } from "@/types";
import { KanbanColumn } from "@/components/KanbanColumn";
import { Skeleton } from "@/components/ui/skeleton";

interface KanbanBoardProps {
  bugs: Bug[];
  loading: boolean;
  onAssignDeveloper: (bugId: number, developerId: number) => void;
}

export function KanbanBoard({ bugs, loading, onAssignDeveloper }: KanbanBoardProps) {
  const todoItems = bugs.filter(bug => bug.status === BugStatus.TO_DO);
  const inProgressItems = bugs.filter(bug => bug.status === BugStatus.IN_PROGRESS);
  const completedItems = bugs.filter(bug => bug.status === BugStatus.COMPLETED);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border">
            <Skeleton className="h-7 w-2/3 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
      <KanbanColumn 
        title="To Do" 
        bugs={todoItems} 
        status={BugStatus.TO_DO}
        onAssignDeveloper={onAssignDeveloper}
      />
      
      <KanbanColumn 
        title="In Progress" 
        bugs={inProgressItems} 
        status={BugStatus.IN_PROGRESS}
        onAssignDeveloper={onAssignDeveloper}
      />
      
      <KanbanColumn 
        title="Completed" 
        bugs={completedItems} 
        status={BugStatus.COMPLETED}
        onAssignDeveloper={onAssignDeveloper}
      />
    </div>
  );
}
