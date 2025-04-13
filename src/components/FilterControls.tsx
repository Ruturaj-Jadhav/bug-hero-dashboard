
import { useState } from "react";
import { BugPriority, BugStatus } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp, Filter } from "lucide-react";

interface FilterControlsProps {
  onFilterChange: (filters: {
    status: BugStatus | "ALL";
    priority: BugPriority | "ALL";
    sort: "dueDate-asc" | "dueDate-desc";
  }) => void;
}

export function FilterControls({ onFilterChange }: FilterControlsProps) {
  const [filters, setFilters] = useState({
    status: "ALL" as BugStatus | "ALL",
    priority: "ALL" as BugPriority | "ALL",
    sort: "dueDate-asc" as "dueDate-asc" | "dueDate-desc",
  });

  const updateFilters = (key: keyof typeof filters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleSortOrder = () => {
    const newSortOrder = filters.sort === "dueDate-asc" ? "dueDate-desc" : "dueDate-asc";
    updateFilters("sort", newSortOrder);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Select
          value={filters.status}
          onValueChange={(value) => updateFilters("status", value)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value={BugStatus.IN_PROGRESS}>In Progress</SelectItem>
            <SelectItem value={BugStatus.COMPLETED}>Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.priority}
          onValueChange={(value) => updateFilters("priority", value)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Priorities</SelectItem>
            <SelectItem value={BugPriority.LOW}>Low</SelectItem>
            <SelectItem value={BugPriority.MEDIUM}>Medium</SelectItem>
            <SelectItem value={BugPriority.HIGH}>High</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleSortOrder}
          className="flex items-center gap-1"
        >
          Due Date
          {filters.sort === "dueDate-asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}
