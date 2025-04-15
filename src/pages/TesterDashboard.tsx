
import { useState, useEffect } from "react";
import { User, Project, Bug, BugPriority, BugStatus } from "@/types";
import { useProjects } from "@/hooks/useProjects";
import { useBugs } from "@/hooks/useBugs";
import { Sidebar } from "@/components/Sidebar";
import { TesterBugForm } from "@/components/TesterBugForm";
import { BugList } from "@/components/BugList";
import { BugModal } from "@/components/BugModal";
import { Toaster } from "@/components/ui/toaster";
import { FilterControls } from "@/components/FilterControls";
import { EmptyState } from "@/components/EmptyState";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";

// Dummy user for testing
const dummyUser: User = {
  userID: 1,
  name: "Jane Smith",
  email: "jane.smith@example.com",
  role: "tester",
};

export default function TesterDashboard() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const { toast } = useToast();

  const { projects, loading: projectsLoading } = useProjects(dummyUser.userID.toString());
  const { bugs, loading: bugsLoading } = useBugs(selectedProjectId, dummyUser.userID.toString());

  // Handle project selection
  const handleProjectSelect = (projectId: number) => {
    console.log("Selected project:", projectId);
    setSelectedProjectId(projectId.toString());
  };

  // Handle bug selection for modal
  const handleBugSelect = (bug: Bug) => {
    setSelectedBug(bug);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBug(null);
  };

  // Handle form submission
  const handleSubmitBug = async (bugData: Partial<Bug>) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast({
        title: "Bug submitted",
        description: "The bug has been successfully submitted.",
      });
      
      // In a real app, we would refresh the bugs list here
      
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting the bug.",
        variant: "destructive",
      });
      console.error("Error submitting bug:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter bugs based on search and filters
  const filteredBugs = bugs.filter((bug) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(bug.status);

    // Priority filter
    const matchesPriority =
      priorityFilter.length === 0 || priorityFilter.includes(bug.priority);

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Toggle focus mode
  const handleToggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  // Handle updating status (not actually used by tester but needed for the BugModal props)
  const handleUpdateStatus = async (bugId: string, status: string): Promise<boolean> => {
    return Promise.resolve(false); // Testers cannot update status
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        user={dummyUser} 
        loading={loading}
        focusMode={focusMode}
        onToggleFocusMode={handleToggleFocusMode}
      />
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar
          projects={projects}
          loading={projectsLoading}
          selectedProjectId={selectedProjectId ? parseInt(selectedProjectId) : null}
          onSelectProject={handleProjectSelect}
        />

        {/* Main content */}
        <main className={`flex-1 p-4 md:p-6 ${focusMode ? 'md:ml-0' : 'md:ml-64'} transition-all duration-300`}>
          <div className="max-w-6xl mx-auto space-y-6">
            {selectedProjectId ? (
              <>
                {/* Bug submission form */}
                <TesterBugForm 
                  projectId={selectedProjectId} 
                  onSubmitBug={handleSubmitBug} 
                  isLoading={loading}
                />

                {/* Filter controls */}
                <FilterControls
                  searchTerm={searchTerm}
                  onSearchChange={(value) => setSearchTerm(value)}
                  statusFilter={statusFilter}
                  onStatusFilterChange={(values) => setStatusFilter(values)}
                  priorityFilter={priorityFilter}
                  onPriorityFilterChange={(values) => setPriorityFilter(values)}
                />

                {/* Bug list */}
                {bugsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="h-48 bg-gray-200 animate-pulse rounded-xl"></div>
                    ))}
                  </div>
                ) : filteredBugs.length > 0 ? (
                  <BugList bugs={filteredBugs} onBugSelect={handleBugSelect} />
                ) : (
                  <EmptyState
                    title="No bugs found"
                    description={
                      searchTerm || statusFilter.length > 0 || priorityFilter.length > 0
                        ? "Try adjusting your filters"
                        : "No bugs created for this project yet"
                    }
                    icon="bug"
                  />
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-[50vh]">
                <EmptyState
                  title="Select a project"
                  description="Please select a project from the sidebar to view bugs"
                  icon="folder"
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Bug detail modal */}
      <BugModal
        bug={selectedBug}
        open={modalOpen}
        onClose={handleCloseModal}
        onUpdateStatus={handleUpdateStatus}
      />

      <Toaster />
    </div>
  );
}
