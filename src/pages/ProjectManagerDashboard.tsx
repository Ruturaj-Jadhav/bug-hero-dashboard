
import { useState } from "react";
import { ProjectList } from "@/components/ProjectList";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Project } from "@/types";
import { useProjects } from "@/hooks/useProjects";

// Dummy manager user for testing
const dummyManager = {
  userID: 2,
  name: "Alex Johnson",
  email: "alex@example.com",
  role: "manager"
};

export default function ProjectManagerDashboard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects, loading } = useProjects(dummyManager.userID.toString());

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        user={dummyManager}
        loading={false} 
        focusMode={false}
        onToggleFocusMode={() => {}} 
      />
      
      <main className="flex-1 pt-16 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {selectedProject ? (
            <ProjectDetail 
              project={selectedProject} 
              onBackToProjects={handleBackToProjects}
            />
          ) : (
            <div className="space-y-6">
              <header className="mt-6">
                <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                <p className="mt-2 text-gray-600">
                  Select a project to view and manage bugs
                </p>
              </header>
              <ProjectList 
                projects={projects}
                loading={loading}
                onSelectProject={handleSelectProject}
              />
            </div>
          )}
        </div>
      </main>
      
      <Toaster />
    </div>
  );
}
