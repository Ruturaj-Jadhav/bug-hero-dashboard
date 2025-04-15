
import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Bug, User, Plus } from "lucide-react";
import { format } from "date-fns";

interface ProjectSidebarProps {
  project: Project;
  bugCount: number;
}

export function ProjectSidebar({ project, bugCount }: ProjectSidebarProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Project Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">ID</p>
          <p className="font-medium">{project.projectId}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Start Date</p>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <p className="font-medium">{format(new Date(project.startDate), 'MMMM d, yyyy')}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Project Manager</p>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <div>
              <p className="font-medium">{project.projectManager.name}</p>
              <p className="text-sm text-gray-500">{project.projectManager.email}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Total Bugs</p>
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4 text-primary" />
            <p className="font-medium">{bugCount}</p>
          </div>
        </div>
        
        <div className="pt-4">
          <Button className="w-full" onClick={() => alert("Add bug functionality would go here")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Bug
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
