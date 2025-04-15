
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
import { ArrowDown, ArrowUp, Filter, Eye, EyeOff, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string[];
  onStatusFilterChange: (values: string[]) => void;
  priorityFilter: string[];
  onPriorityFilterChange: (values: string[]) => void;
}

export function FilterControls({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  priorityFilter, 
  onPriorityFilterChange 
}: FilterControlsProps) {
  const [expanded, setExpanded] = useState(false);
  const [sort, setSort] = useState<"dueDate-asc" | "dueDate-desc">("dueDate-asc");

  const toggleSortOrder = () => {
    const newSortOrder = sort === "dueDate-asc" ? "dueDate-desc" : "dueDate-asc";
    setSort(newSortOrder);
  };
  
  // Quick filter presets
  const applyPresetFilter = (preset: string) => {
    switch (preset) {
      case "high-priority":
        onPriorityFilterChange([BugPriority.HIGH]);
        break;
      case "completed":
        onStatusFilterChange([BugStatus.COMPLETED]);
        break;
      case "in-progress":
        onStatusFilterChange([BugStatus.IN_PROGRESS]);
        break;
      case "to-do":
        onStatusFilterChange([BugStatus.TO_DO]);
        break;
      case "reset":
        onStatusFilterChange([]);
        onPriorityFilterChange([]);
        break;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search bugs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-7"
            onClick={() => setExpanded(!expanded)}
            title={expanded ? "Hide filters" : "Show filters"}
          >
            {expanded ? <EyeOff className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select
            value={statusFilter.length === 1 ? statusFilter[0] : "all-statuses"}
            onValueChange={(value) => {
              if (value === "all-statuses") {
                onStatusFilterChange([]);
              } else {
                onStatusFilterChange([value]);
              }
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-statuses">All Statuses</SelectItem>
              <SelectItem value={BugStatus.TO_DO}>To Do</SelectItem>
              <SelectItem value={BugStatus.IN_PROGRESS}>In Progress</SelectItem>
              <SelectItem value={BugStatus.COMPLETED}>Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priorityFilter.length === 1 ? priorityFilter[0] : "all-priorities"}
            onValueChange={(value) => {
              if (value === "all-priorities") {
                onPriorityFilterChange([]);
              } else {
                onPriorityFilterChange([value]);
              }
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-priorities">All Priorities</SelectItem>
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
            {sort === "dueDate-asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
      
      {expanded && (
        <Card className="mt-2 p-3 animate-in fade-in duration-200">
          <div className="text-sm mb-2">Quick filters:</div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => applyPresetFilter("high-priority")}
              className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            >
              High Priority
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => applyPresetFilter("in-progress")}
              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
            >
              In Progress
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => applyPresetFilter("completed")}
              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
            >
              Completed
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => applyPresetFilter("reset")}
            >
              Reset All
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
