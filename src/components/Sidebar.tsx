
import { Project } from "@/types";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  projects: Project[];
  loading: boolean;
  selectedProjectId: number | null;
  onSelectProject: (projectId: number) => void;
}

export function Sidebar({
  projects,
  loading,
  selectedProjectId,
  onSelectProject,
}: SidebarProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-20 z-40 md:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      )}

      {/* Sidebar content */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 w-64 bg-gray-50 border-r border-gray-200 transition-transform duration-300 ease-in-out z-30",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Assigned Projects</h2>
          
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 animate-pulse rounded-md"></div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.projectId}>
                  <button
                    onClick={() => {
                      console.log("Selected project:", project.projectId);
                      onSelectProject(project.projectId);
                      if (isMobile) setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors",
                      selectedProjectId === project.projectId
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200"
                    )}
                  >
                    <span className="block font-medium truncate">{project.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
