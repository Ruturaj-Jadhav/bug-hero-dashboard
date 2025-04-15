
import { useState } from "react";
import { Bug, BugStatus, BugPriority } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown, Clock, User, Calendar, Check } from "lucide-react";
import { getPriorityColor } from "@/utils/priorities";
import { AvatarPlaceholder } from "./ui/avatar-placeholder";

interface BugCardProps {
  bug: Bug;
  status: BugStatus;
  onAssignDeveloper: (bugId: number, developerId: number) => void;
}

export function BugCard({ bug, status, onAssignDeveloper }: BugCardProps) {
  const [isAssigning, setIsAssigning] = useState(false);
  
  // Mock developers for the dropdown
  const mockDevelopers = [
    { userID: 4, name: "Mike Chen", email: "mike@example.com" },
    { userID: 5, name: "Sarah Wilson", email: "sarah@example.com" },
    { userID: 6, name: "David Johnson", email: "david@example.com" }
  ];
  
  const handleAssignDeveloper = (developerId: number) => {
    setIsAssigning(true);
    onAssignDeveloper(bug.bugId, developerId);
    setTimeout(() => setIsAssigning(false), 1000);
  };
  
  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-base font-medium line-clamp-2">{bug.title}</h3>
          <Badge className={getPriorityColor(bug.priority)}>
            {bug.priority}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {bug.description}
        </p>
        
        <div className="text-xs text-gray-500 mb-4 flex items-center">
          <User className="h-3 w-3 mr-1" />
          <span>Created by {bug.createdBy.name}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Due: {formatDate(bug.due)}</span>
          </div>
          
          {status === BugStatus.TO_DO && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs"
                  disabled={isAssigning}
                >
                  Assign
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  {mockDevelopers.map(dev => (
                    <DropdownMenuItem 
                      key={dev.userID}
                      onClick={() => handleAssignDeveloper(dev.userID)}
                    >
                      <div className="flex items-center">
                        <AvatarPlaceholder 
                          name={dev.name} 
                          className="h-5 w-5 mr-2 text-xs" 
                        />
                        <span>{dev.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {status === BugStatus.IN_PROGRESS && (
            <div className="flex items-center space-x-2">
              <AvatarPlaceholder 
                name={bug.assignedTo?.name || ""} 
                className="h-6 w-6 text-xs" 
              />
              <span className="text-xs">{bug.assignedTo?.name}</span>
            </div>
          )}
          
          {status === BugStatus.COMPLETED && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>Completed: {formatDate(bug.resolvedDate)}</span>
            </div>
          )}
        </div>
        
        {status === BugStatus.COMPLETED && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center text-xs text-green-600">
            <Check className="h-3 w-3 mr-1" />
            <span>Resolved by {bug.assignedTo?.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
