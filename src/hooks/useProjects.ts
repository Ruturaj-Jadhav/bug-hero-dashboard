
import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/types';
import api from '@/services/api';

export const useProjects = (developerId: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getAssignedProjects(developerId);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, [developerId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
};
