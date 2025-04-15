import axios from "axios";
import { Bug, BugPriority, BugStatus, Project, User } from "@/types";

// Simulate API latency
const simulateApiLatency = () => new Promise(resolve => setTimeout(resolve, 500));

// Mock data for projects
const mockProjects: Project[] = [
  {
    projectId: 1,
    name: "E-commerce Platform",
    description: "Online shopping platform with user account management",
    startDate: "2023-01-15",
    projectManager: {
      userID: 2,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "manager"
    },
    bugCount: 12,
    createdDate: "2023-01-15"
  },
  {
    projectId: 2,
    name: "Mobile Banking App",
    description: "Secure banking application for smartphones",
    startDate: "2023-03-10",
    projectManager: {
      userID: 3,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "manager"
    },
    bugCount: 8,
    createdDate: "2023-03-10"
  },
  {
    projectId: 3,
    name: "HR Management System",
    description: "Employee management and payroll system",
    startDate: "2023-05-20",
    projectManager: {
      userID: 2,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "manager"
    },
    bugCount: 5,
    createdDate: "2023-05-20"
  }
];

// Mock developer user
const mockDeveloper: User = {
  userID: 4,
  name: "Mike Chen",
  email: "mike@example.com",
  role: "developer"
};

// Mock tester user
const mockTester: User = {
  userID: 1,
  name: "Jane Smith",
  email: "jane@example.com",
  role: "tester"
};

// Mock developers for assignment
const mockDevelopers: User[] = [
  {
    userID: 4,
    name: "Mike Chen",
    email: "mike@example.com",
    role: "developer"
  },
  {
    userID: 5,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "developer"
  },
  {
    userID: 6,
    name: "David Johnson",
    email: "david@example.com",
    role: "developer"
  }
];

// Mock bugs data
const mockBugs: Bug[] = [
  {
    bugId: 1,
    title: "Checkout process fails at payment step",
    category: "Functionality",
    description: "When users enter payment information and click 'Pay Now', the system shows an error and payment fails.",
    priority: BugPriority.HIGH,
    status: BugStatus.IN_PROGRESS,
    resolvedDate: null,
    due: "2023-07-25",
    assignedTo: mockDeveloper,
    createdBy: mockTester,
    project: mockProjects[0],
    screenshot: "/screenshot1.png"
  },
  {
    bugId: 2,
    title: "Product images not loading in search results",
    category: "UI",
    description: "Product images appear as broken links in search results page.",
    priority: BugPriority.MEDIUM,
    status: BugStatus.TO_DO,
    resolvedDate: null,
    due: "2023-07-30",
    assignedTo: mockDeveloper,
    createdBy: mockTester,
    project: mockProjects[0]
  },
  {
    bugId: 3,
    title: "Login fails with valid credentials",
    category: "Authentication",
    description: "Users with valid credentials cannot log in. System shows generic error message.",
    priority: BugPriority.HIGH,
    status: BugStatus.COMPLETED,
    resolvedDate: "2023-07-18",
    due: "2023-07-20",
    assignedTo: mockDeveloper,
    createdBy: mockTester,
    project: mockProjects[1]
  },
  {
    bugId: 4,
    title: "Transaction history shows incorrect dates",
    category: "Data",
    description: "The dates shown in transaction history are off by one day.",
    priority: BugPriority.LOW,
    status: BugStatus.TO_DO,
    resolvedDate: null,
    due: "2023-08-05",
    assignedTo: mockDeveloper,
    createdBy: mockTester,
    project: mockProjects[1]
  },
  {
    bugId: 5,
    title: "Employee reports generate empty PDFs",
    category: "Functionality",
    description: "When generating employee reports as PDF, the file is created but contains no data.",
    priority: BugPriority.MEDIUM,
    status: BugStatus.IN_PROGRESS,
    resolvedDate: null,
    due: "2023-07-28",
    assignedTo: mockDeveloper,
    createdBy: mockTester,
    project: mockProjects[2]
  }
];

const api = {
  // Get projects assigned to a tester
  getAssignedProjects: async (testerId: string) => {
    await simulateApiLatency();
    // In a real app, this would filter projects based on testerId
    return mockProjects;
  },
  
  // Get bugs for a specific project created by a tester
  getProjectBugs: async (projectId: string, testerId: string) => {
    await simulateApiLatency();
    
    // If testerId is "ALL", return all bugs for the project
    if (testerId === "ALL") {
      return mockBugs.filter(bug => bug.project.projectId.toString() === projectId);
    }
    
    // Filter bugs by project ID and tester ID
    return mockBugs.filter(
      (bug) => 
        bug.project.projectId.toString() === projectId && 
        bug.createdBy.userID.toString() === testerId
    );
  },
  
  // Submit a new bug
  submitBug: async (projectId: string, bugData: Partial<Bug>) => {
    await simulateApiLatency();
    
    // In a real app, this would send a POST request to the server
    console.log("Submitting bug:", { projectId, bugData });
    
    // Return mock data
    const newBug: Bug = {
      bugId: mockBugs.length + 1,
      title: bugData.title || "New Bug",
      category: bugData.category || "Functionality",
      description: bugData.description || "",
      priority: bugData.priority || BugPriority.MEDIUM,
      status: BugStatus.TO_DO,
      resolvedDate: null,
      due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      assignedTo: mockDeveloper,
      createdBy: mockTester,
      project: mockProjects.find(p => p.projectId.toString() === projectId) || mockProjects[0],
      screenshot: bugData.screenshot
    };
    
    mockBugs.push(newBug);
    return newBug;
  },
  
  // Get bug details
  getBugDetails: async (bugId: string) => {
    await simulateApiLatency();
    
    const bug = mockBugs.find(b => b.bugId.toString() === bugId);
    if (!bug) {
      throw new Error("Bug not found");
    }
    
    return bug;
  },
  
  // Update bug status (used in developer dashboard)
  updateBugStatus: async (bugId: string, status: BugStatus) => {
    await simulateApiLatency();
    
    const bug = mockBugs.find(b => b.bugId.toString() === bugId);
    if (!bug) {
      throw new Error("Bug not found");
    }
    
    bug.status = status;
    if (status === BugStatus.COMPLETED) {
      bug.resolvedDate = new Date().toISOString().split('T')[0];
    } else {
      bug.resolvedDate = null;
    }
    
    return bug;
  },
  
  // Get all developers for assignment dropdown
  getDevelopers: async () => {
    await simulateApiLatency();
    return mockDevelopers;
  },
  
  // Assign a bug to a developer (used in project manager dashboard)
  assignBugToDeveloper: async (bugId: string, developerId: string) => {
    await simulateApiLatency();
    
    const bug = mockBugs.find(b => b.bugId.toString() === bugId);
    if (!bug) {
      throw new Error("Bug not found");
    }
    
    const developer = mockDevelopers.find(d => d.userID.toString() === developerId);
    if (!developer) {
      throw new Error("Developer not found");
    }
    
    bug.assignedTo = developer;
    bug.status = BugStatus.IN_PROGRESS;
    
    return bug;
  }
};

export default api;
