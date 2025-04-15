
import { useState, useEffect } from "react";
import { Bug, BugStatus, Project } from "@/types";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/KanbanBoard";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

interface ProjectDetailProps {
  project: Project;
  onBackToProjects: () => void;
}

export function ProjectDetail({ project, onBackToProjects }: ProjectDetailProps) {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        setLoading(true);
        // Replace with actual API call to get bugs for the project
        const data = await api.getProjectBugs(project.projectId.toString(), "ALL");
        setBugs(data);
      } catch (error) {
        console.error("Error fetching bugs:", error);
        toast({
          title: "Error",
          description: "Failed to load bugs for this project",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, [project.projectId, toast]);

  const handleAssignDeveloper = async (bugId: number, developerId: number) => {
    try {
      toast({
        title: "Assigning developer...",
        description: "Please wait while we assign the developer",
      });
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setBugs(prevBugs => 
        prevBugs.map(bug => 
          bug.bugId === bugId 
            ? { 
                ...bug, 
                assignedTo: {
                  ...bug.assignedTo,
                  userID: developerId
                },
                status: BugStatus.IN_PROGRESS
              } 
            : bug
        )
      );
      
      toast({
        title: "Success",
        description: "Developer assigned successfully",
      });
      
    } catch (error) {
      console.error("Error assigning developer:", error);
      toast({
        title: "Error",
        description: "Failed to assign developer",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/4 xl:w-1/5">
        <Button 
          variant="ghost" 
          className="mb-4 p-0 h-auto" 
          onClick={onBackToProjects}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Projects</span>
        </Button>
        
        <ProjectSidebar project={project} bugCount={bugs.length} />
      </div>
      
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{project.name}</h1>
        <KanbanBoard 
          bugs={bugs} 
          loading={loading} 
          onAssignDeveloper={handleAssignDeveloper}
        />
      </div>
    </div>
  );
}
