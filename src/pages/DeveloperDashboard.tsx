import { useState, useEffect } from "react";
import { BugStatus, User } from "@/types";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

// Just creating a placeholder component for now
export default function DeveloperDashboard() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Dummy user for testing
  const dummyUser: User = {
    userID: 4,
    name: "Mike Chen",
    email: "mike@example.com",
    role: "developer",
  };

  useEffect(() => {
    toast({
      title: "Developer Dashboard",
      description: "This page is under construction.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>
      <p>Welcome, {dummyUser.name}!</p>
      <p className="text-gray-500 mt-4">
        This dashboard is under construction. Please check back later.
      </p>
    </div>
  );
}
