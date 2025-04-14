import { useState, useEffect, useMemo } from "react";
import { Bug, BugPriority, BugStatus, User, Project } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SearchBar } from "@/components/SearchBar";
import { FilterControls } from "@/components/FilterControls";
import { BugCard } from "@/components/BugCard";
import { BugModal } from "@/components/BugModal";
import { EmptyState } from "@/components/EmptyState";
import api from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function DeveloperDashboard() {
  // Current user (developer)
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  // Selected project and bugs
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [bugsLoading, setBugsLoading] = useState(false);

  // Search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "ALL" as BugStatus | "ALL",
    priority: "ALL" as BugPriority | "ALL",
    sort: "dueDate-asc" as "dueDate-asc" | "dueDate-desc",
  });

  // Focus mode
  const [focusMode, setFocusMode] = useState(false);

  // Load current user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await api.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUser();
  }, []);

  // Load projects
  useEffect(() => {
    const loadProjects = async () => {
      setProjectsLoading(true);
      try {
        const projectsData = await api.getAssignedProjects();
        
        setProjects(projectsData);
        console.log("Projects data:", projectsData);
        if (!selectedProjectId && projectsData.length > 0) {
          setSelectedProjectId(projectsData[0].projectId);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setProjectsLoading(false);
      }
    };

    loadProjects();
  }, [selectedProjectId]);

  // Load bugs for selected project
  useEffect(() => {
    const loadBugs = async () => {
      if (!selectedProjectId) return;
      setBugsLoading(true);
      try {
        const bugsData = await api.getProjectBugs(selectedProjectId);
        setBugs(bugsData);
      } catch (error) {
        console.error("Failed to load bugs:", error);
      } finally {
        setBugsLoading(false);
      }
    };

    loadBugs();
  }, [selectedProjectId]);

  // Handle project selection
  const handleSelectProject = (projectId: number) => {
    console.log("Clicked project ID:", projectId);
    setSelectedProjectId(projectId);
  };

  // Handle bug selection and modal
  const handleBugClick = (bug: Bug) => {
    setSelectedBug(bug); // Set the selected bug
    setModalOpen(true);  // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  const handleUpdateStatus = async (bugId: string, status: BugStatus) => {
    try {
      const updatedBug = await api.updateBugStatus(bugId, status); // Use the new API function
      setBugs((prevBugs) =>
        prevBugs.map((bug) => (bug.bugId === Number(bugId) ? updatedBug : bug))
      );
    } catch (error) {
      console.error("Failed to update bug status:", error);
    }
  };

  // Filter and sort bugs
  const filteredBugs = useMemo(() => {
    return bugs
      .filter((bug) => {
        // Search filter
        const matchesSearch = bug.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Status filter
        const matchesStatus =
          filters.status === "ALL" || bug.status === filters.status;

        // Priority filter
        const matchesPriority =
          filters.priority === "ALL" || bug.priority === filters.priority;

        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        // Sort by due date
        const dateA = new Date(a.due).getTime();
        const dateB = new Date(b.due).getTime();

        return filters.sort === "dueDate-asc" ? dateA - dateB : dateB - dateA;
      });
  }, [bugs, searchQuery, filters]);

  // Toggle focus mode
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  // Find the currently selected project
  const selectedProject = projects.find(
    (p) => p.projectId === selectedProjectId
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        loading={userLoading}
        focusMode={focusMode}
        onToggleFocusMode={toggleFocusMode}
      />

      <div className="pt-16 flex">
        {/* Sidebar - hidden in focus mode on mobile */}
        <div
          className={cn(
            focusMode
              ? "hidden md:block md:opacity-50 md:hover:opacity-100 transition-opacity"
              : "block"
          )}
        >
          <Sidebar
            projects={projects}
            loading={projectsLoading}
            selectedProjectId={selectedProjectId}
            onSelectProject={handleSelectProject}
          />
        </div>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 p-6 transition-all",
            focusMode ? "ml-0" : "ml-0 md:ml-64"
          )}
        >
          <div className="max-w-6xl mx-auto">
            {selectedProject ? (
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">
                  {selectedProject.name}
                </h1>
                <p className="text-gray-500 text-sm">
                  {selectedProject.description}
                </p>
              </div>
            ) : projectsLoading ? (
              <div className="mb-6">
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
              </div>
            ) : (
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">My Dashboard</h1>
                <p className="text-gray-500 text-sm">
                  Select a project to view bugs
                </p>
              </div>
            )}

            {/* Search and filters */}
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <SearchBar onSearch={setSearchQuery} />
                <FilterControls onFilterChange={setFilters} />
              </div>
            </div>

            {/* Bugs list */}
            {bugsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-2xl" />
                ))}
              </div>
            ) : filteredBugs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBugs.map((bug) => (
                  <BugCard
                    key={bug.bugId}
                    bug={bug}
                    onClick={() => handleBugClick(bug)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No bugs found"
                description="There are no bugs assigned to you in this project."
              />
            )}
          </div>
        </main>
      </div>

      {/* Bug modal */}
      <BugModal
        bug={selectedBug}
        open={modalOpen}
        onClose={handleCloseModal}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}