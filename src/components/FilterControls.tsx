
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
import { ArrowDown, ArrowUp, Filter, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  
  // For expanded/collapsed filter panel
  const [expanded, setExpanded] = useState(false);

  const updateFilters = (key: keyof typeof filters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleSortOrder = () => {
    const newSortOrder = filters.sort === "dueDate-asc" ? "dueDate-desc" : "dueDate-asc";
    updateFilters("sort", newSortOrder);
  };
  
  // Quick filter presets
  const applyPresetFilter = (preset: string) => {
    let newFilters = { ...filters };
    
    switch (preset) {
      case "high-priority":
        newFilters = { ...filters, priority: BugPriority.HIGH };
        break;
      case "completed":
        newFilters = { ...filters, status: BugStatus.COMPLETED };
        break;
      case "in-progress":
        newFilters = { ...filters, status: BugStatus.IN_PROGRESS };
        break;
      case "reset":
        newFilters = { 
          status: "ALL", 
          priority: "ALL", 
          sort: "dueDate-asc" 
        };
        break;
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filters:</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-7"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
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
      
      {expanded && (
        <Card className="mt-3 p-3 animate-fade-in">
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
