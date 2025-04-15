
import { Bug } from "@/types";
import { BugCard } from "./BugCard";

interface BugListProps {
  bugs: Bug[];
  onBugSelect: (bug: Bug) => void;
}

export function BugList({ bugs, onBugSelect }: BugListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bugs.map((bug) => (
        <BugCard
          key={bug.bugId}
          bug={bug}
          onClick={() => onBugSelect(bug)}
        />
      ))}
    </div>
  );
}
