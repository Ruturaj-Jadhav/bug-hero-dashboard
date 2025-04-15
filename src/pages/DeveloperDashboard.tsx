
import { useState, useEffect } from "react";
import { Bug, BugStatus, Project, User } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useBugs } from "@/hooks/useBugs";
import { useProjects } from "@/hooks/useProjects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Bug as BugIcon, CheckCircle, Circle, Code, ListChecks } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DeveloperDashboard() {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // Dummy user for testing
  const dummyUser: User = {
    userID: 4,
    name: "Mike Chen",
    email: "mike@example.com",
    role: "developer",
  };

  // Get assigned projects
  const { projects, loading: projectsLoading } = useProjects(dummyUser.userID.toString());
  
  // Get bugs for selected project
  const { bugs, loading: bugsLoading, updateBugStatus } = useBugs(
    selectedProject,
    dummyUser.userID.toString()
  );

  // Set the first project as selected when projects are loaded
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].projectId.toString());
    }
  }, [projects, selectedProject]);

  // Count bugs by status
  const pendingBugs = bugs.filter(bug => bug.status === BugStatus.PENDING);
  const inProgressBugs = bugs.filter(bug => bug.status === BugStatus.IN_PROGRESS);
  const completedBugs = bugs.filter(bug => bug.status === BugStatus.COMPLETED);

  // Handle bug status change
  const handleStatusChange = async (bugId: string, newStatus: BugStatus) => {
    const success = await updateBugStatus(bugId, newStatus);
    if (success) {
      toast({
        title: "Bug updated",
        description: `Bug status changed to ${newStatus}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Developer Dashboard</h1>
            <p className="text-gray-500">Welcome, {dummyUser.name}!</p>
          </div>
          
          {/* Project selector */}
          <div className="mt-4 md:mt-0 w-full md:w-72">
            <Select 
              value={selectedProject || ""}
              onValueChange={(value) => setSelectedProject(value)}
              disabled={projectsLoading || projects.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem 
                    key={project.projectId}
                    value={project.projectId.toString()}
                  >
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Bugs</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBugs.length}</div>
              <p className="text-xs text-gray-500">Bugs awaiting action</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Code className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressBugs.length}</div>
              <p className="text-xs text-gray-500">Bugs being worked on</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedBugs.length}</div>
              <p className="text-xs text-gray-500">Fixed and resolved bugs</p>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Bugs</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          {/* All bugs tab */}
          <TabsContent value="all">
            {renderBugList(bugs, handleStatusChange, bugsLoading)}
          </TabsContent>
          
          {/* Pending bugs tab */}
          <TabsContent value="pending">
            {renderBugList(pendingBugs, handleStatusChange, bugsLoading)}
          </TabsContent>
          
          {/* In progress bugs tab */}
          <TabsContent value="in-progress">
            {renderBugList(inProgressBugs, handleStatusChange, bugsLoading)}
          </TabsContent>
          
          {/* Completed bugs tab */}
          <TabsContent value="completed">
            {renderBugList(completedBugs, handleStatusChange, bugsLoading)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper function to render bug list
function renderBugList(
  bugs: Bug[], 
  handleStatusChange: (bugId: string, status: BugStatus) => Promise<void>, 
  loading: boolean
) {
  if (loading) {
    return <div className="p-12 text-center">Loading bugs...</div>;
  }
  
  if (bugs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <BugIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No bugs found</h3>
        <p className="mt-2 text-sm text-gray-500">There are no bugs in this category.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {bugs.map((bug) => (
        <Card key={bug.bugId} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">
                  {bug.title}
                </h3>
                <Badge
                  className={`
                    ${bug.status === BugStatus.PENDING ? 'bg-orange-100 text-orange-800' : ''}
                    ${bug.status === BugStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-800' : ''}
                    ${bug.status === BugStatus.COMPLETED ? 'bg-green-100 text-green-800' : ''}
                  `}
                >
                  {bug.status}
                </Badge>
              </div>
              <p className="text-gray-500 text-sm mb-3">{bug.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ListChecks className="h-3 w-3" />
                  Priority: {bug.priority}
                </span>
                <span>Reported on: {new Date(bug.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex flex-row md:flex-col justify-end items-center gap-2 border-t md:border-t-0 md:border-l border-gray-100">
              {bug.status !== BugStatus.IN_PROGRESS && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange(bug.bugId.toString(), BugStatus.IN_PROGRESS)}
                >
                  Mark In Progress
                </Button>
              )}
              
              {bug.status !== BugStatus.COMPLETED && (
                <Button
                  size="sm"
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleStatusChange(bug.bugId.toString(), BugStatus.COMPLETED)}
                >
                  Mark Completed
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
