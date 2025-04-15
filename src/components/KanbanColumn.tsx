
import { Bug, BugStatus } from "@/types";
import { BugCard } from "@/components/BugCard";

interface KanbanColumnProps {
  title: string;
  bugs: Bug[];
  status: BugStatus;
  onAssignDeveloper: (bugId: number, developerId: number) => void;
}

export function KanbanColumn({ title, bugs, status, onAssignDeveloper }: KanbanColumnProps) {
  let headerColor = "bg-gray-100";
  let headerTextColor = "text-gray-700";
  
  switch (status) {
    case BugStatus.TO_DO:
      headerColor = "bg-blue-50";
      headerTextColor = "text-blue-700";
      break;
    case BugStatus.IN_PROGRESS:
      headerColor = "bg-amber-50";
      headerTextColor = "text-amber-700";
      break;
    case BugStatus.COMPLETED:
      headerColor = "bg-green-50";
      headerTextColor = "text-green-700";
      break;
  }

  return (
    <div className="flex flex-col h-full min-w-[280px]">
      <div className={`rounded-t-xl px-4 py-3 ${headerColor}`}>
        <h3 className={`font-medium ${headerTextColor} flex items-center`}>
          {title}
          <span className="ml-2 bg-white text-gray-700 text-xs rounded-full px-2 py-0.5">
            {bugs.length}
          </span>
        </h3>
      </div>
      
      <div className="flex-1 bg-white rounded-b-xl border-t-0 border shadow-sm overflow-y-auto p-3 space-y-3 max-h-[calc(100vh-220px)]">
        {bugs.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No bugs in this column
          </div>
        ) : (
          bugs.map(bug => (
            <BugCard 
              key={bug.bugId} 
              bug={bug} 
              status={status}
              onAssignDeveloper={onAssignDeveloper}
            />
          ))
        )}
      </div>
    </div>
  );
}
