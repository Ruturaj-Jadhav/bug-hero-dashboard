
import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistance } from "date-fns";
import { CalendarDays, Bug, User } from "lucide-react";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onSelectProject: (project: Project) => void;
}

export function ProjectList({ projects, loading, onSelectProject }: ProjectListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <Skeleton className="h-7 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-5 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-900">No projects found</h3>
        <p className="mt-2 text-gray-600">There are no projects assigned to you.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card 
          key={project.projectId}
          className="cursor-pointer hover:shadow-md transition-shadow hover:border-primary/20"
          onClick={() => onSelectProject(project)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <CardDescription>
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <CalendarDays className="h-4 w-4" />
                <span>Started {formatDistance(new Date(project.startDate), new Date(), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Bug className="h-4 w-4" />
                <span>{project.bugCount || 0} bugs reported</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-600 border-t pt-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Managed by {project.projectManager.name}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
