
import { Bug, BugStatus } from "@/types";
import { BugCard } from "./BugCard";

interface BugListProps {
  bugs: Bug[];
  onBugSelect: (bug: Bug) => void;
}

export function BugList({ bugs, onBugSelect }: BugListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bugs.map((bug) => (
        <div key={bug.bugId} onClick={() => onBugSelect(bug)} className="cursor-pointer">
          <BugCard
            bug={bug}
            status={bug.status as BugStatus}
            onAssignDeveloper={() => {}} // Provide an empty function as it's not used in this context
          />
        </div>
      ))}
    </div>
  );
}
