
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { User } from "@/types";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: () => void;
  managerId: string;
}

export function CreateProjectModal({ isOpen, onClose, onProjectCreated, managerId }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedTesterId, setSelectedTesterId] = useState("");
  const [testers, setTesters] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTesters, setIsLoadingTesters] = useState(true);
  const { toast } = useToast();

  // Fetch testers when the modal opens
  useState(() => {
    const fetchTesters = async () => {
      try {
        setIsLoadingTesters(true);
        const fetchedTesters = await api.getTesters();
        setTesters(fetchedTesters);
      } catch (error) {
        console.error("Error fetching testers:", error);
        toast({
          title: "Error",
          description: "Failed to fetch testers. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingTesters(false);
      }
    };

    if (isOpen) {
      fetchTesters();
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName || !projectDescription || !selectedTesterId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await api.createProject({
        name: projectName,
        description: projectDescription,
        testerId: selectedTesterId,
        managerId
      });
      
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
      
      // Reset form and close modal
      setProjectName("");
      setProjectDescription("");
      setSelectedTesterId("");
      onProjectCreated();
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project to your dashboard and assign a tester.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectDescription">Description</Label>
            <Textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Brief description of the project"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="testerSelect">Assign Tester</Label>
            <Select 
              value={selectedTesterId} 
              onValueChange={setSelectedTesterId}
              disabled={isLoadingTesters}
            >
              <SelectTrigger id="testerSelect" className="w-full">
                <SelectValue placeholder="Select a tester" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingTesters ? (
                  <SelectItem value="loading" disabled>Loading testers...</SelectItem>
                ) : (
                  testers.map((tester) => (
                    <SelectItem key={tester.userID} value={tester.userID.toString()}>
                      {tester.name} ({tester.email})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
