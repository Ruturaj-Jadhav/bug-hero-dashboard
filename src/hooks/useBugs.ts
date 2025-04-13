
import { useState, useEffect } from 'react';
import { Bug, BugStatus } from '@/types';
import api from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useBugs = (projectId: string | null, developerId: string) => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Fetch bugs for the selected project
  useEffect(() => {
    const fetchBugs = async () => {
      if (!projectId) {
        setBugs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await api.getProjectBugs(projectId, developerId);
        setBugs(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch bugs'));
        console.error('Error fetching bugs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, [projectId, developerId]);

  // Update bug status
  const updateBugStatus = async (bugId: string, status: BugStatus) => {
    try {
      const updatedBug = await api.updateBugStatus(bugId, status);
      
      setBugs((prevBugs) =>
        prevBugs.map((bug) => (bug.id === bugId ? updatedBug : bug))
      );
      
      toast({
        title: "Status updated",
        description: `Bug has been marked as ${status === BugStatus.COMPLETED ? 'completed' : 'in progress'}.`,
        variant: "default",
      });
      
      return true;
    } catch (err) {
      console.error('Error updating bug status:', err);
      
      toast({
        title: "Update failed",
        description: "There was a problem updating the bug status.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  return { bugs, loading, error, updateBugStatus };
};
