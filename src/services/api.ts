
// // Dummy data for our bug tracking system
// import { Project, Bug, User, BugStatus, BugPriority } from "@/types";

// // Current user (the developer)
// const currentUser: User = {
//   id: "1",
//   name: "John Doe",
//   email: "john.doe@example.com",
//   avatar: null,
// };

// // Mock projects data
// const projects: Project[] = [
//   {
//     id: "1",
//     name: "E-commerce Platform",
//     description: "Online shopping platform with user accounts and payment processing",
//     assignedDevelopers: ["1"],
//   },
//   {
//     id: "2",
//     name: "CRM System",
//     description: "Customer relationship management system with analytics",
//     assignedDevelopers: ["1"],
//   },
//   {
//     id: "3",
//     name: "Mobile Banking App",
//     description: "Secure banking application for iOS and Android",
//     assignedDevelopers: ["1"],
//   },
//   {
//     id: "4",
//     name: "Content Management System",
//     description: "Enterprise CMS with workflow and publishing features",
//     assignedDevelopers: ["1"],
//   },
// ];

// // Mock bugs data
// const bugs: Bug[] = [
//   {
//     id: "101",
//     title: "Checkout process failing on payment submission",
//     description: "Users report that the checkout process fails when they submit payment details. Error appears after clicking 'Pay Now' button.",
//     projectId: "1",
//     status: BugStatus.IN_PROGRESS,
//     priority: BugPriority.HIGH,
//     assignedTo: "1",
//     createdBy: {
//       id: "2",
//       name: "Alice Smith",
//       email: "alice@example.com",
//       avatar: null,
//     },
//     assignedDate: "2023-03-15",
//     dueDate: "2023-03-20",
//   },
//   {
//     id: "102",
//     title: "Product images not loading on mobile devices",
//     description: "Product images fail to load when accessing the site from mobile browsers. Console shows 404 errors for image paths.",
//     projectId: "1",
//     status: BugStatus.IN_PROGRESS,
//     priority: BugPriority.MEDIUM,
//     assignedTo: "1",
//     createdBy: {
//       id: "3",
//       name: "Bob Johnson",
//       email: "bob@example.com",
//       avatar: null,
//     },
//     assignedDate: "2023-03-14",
//     dueDate: "2023-03-25",
//   },
//   {
//     id: "201",
//     title: "Customer search returns incorrect results",
//     description: "When searching for customers by name, the results include unrelated entries. Filter logic seems to be ignoring exact match rules.",
//     projectId: "2",
//     status: BugStatus.IN_PROGRESS,
//     priority: BugPriority.HIGH,
//     assignedTo: "1",
//     createdBy: {
//       id: "4",
//       name: "Carol Davis",
//       email: "carol@example.com",
//       avatar: null,
//     },
//     assignedDate: "2023-03-10",
//     dueDate: "2023-03-18",
//   },
//   {
//     id: "202",
//     title: "Analytics dashboard shows wrong monthly totals",
//     description: "The monthly sales totals on the analytics dashboard don't match the actual data. Calculations appear to be off by approximately 15%.",
//     projectId: "2",
//     status: BugStatus.COMPLETED,
//     priority: BugPriority.MEDIUM,
//     assignedTo: "1",
//     createdBy: {
//       id: "4",
//       name: "Carol Davis",
//       email: "carol@example.com",
//       avatar: null,
//     },
//     assignedDate: "2023-03-05",
//     dueDate: "2023-03-12",
//   },
//   {
//     id: "301",
//     title: "Transfer function times out for large amounts",
//     description: "When users attempt to transfer amounts over $10,000, the transaction times out and fails. No error message is displayed to the user.",
//     projectId: "3",
//     status: BugStatus.IN_PROGRESS,
//     priority: BugPriority.HIGH,
//     assignedTo: "1",
//     createdBy: {
//       id: "5",
//       name: "Dave Wilson",
//       email: "dave@example.com",
//       avatar: null,
//     },
//     assignedDate: "2023-03-14",
//     dueDate: "2023-03-21",
//   },
//   {
//     id: "302",
//     title: "Biometric login fails on certain Android devices",
//     description: "Users with Samsung Galaxy S21 devices report that the fingerprint login functionality fails consistently. The system falls back to PIN entry.",
//     projectId: "3",
//     status: BugStatus.IN_PROGRESS,
//     priority: BugPriority.LOW,
//     assignedTo: "1",
//     createdBy: {
//       id: "5",
//       name: "Dave Wilson",
//       email: "dave@example.com",
//       avatar: null,
//     },
//     assignedDate: "2023-03-12",
//     dueDate: "2023-03-22",
//   },
//   {
//     id: "401",
//     title: "Scheduled posts not publishing at set time",
//     description: "Content scheduled for automatic publishing is not going live at the specified time. Posts remain in 'scheduled' status until manually published.",
//     projectId: "4",
//     status: BugStatus.IN_PROGRESS,
//     priority: BugPriority.MEDIUM,
//     assignedTo: "1",
//     createdBy: {
//       id: "6",
//       name: "Eve Brown",
//       email: "eve@example.com",
//       avatar: null,
//     },
//     assignedDate: "2023-03-13",
//     dueDate: "2023-03-19",
//   },
//   {
//     id: "402",
//     title: "PDF exports missing text formatting",
//     description: "When exporting content as PDF, all text formatting (bold, italic, headers) is lost. The output contains only plain text with no styling.",
//     projectId: "4",
//     status: BugStatus.COMPLETED,
//     priority: BugPriority.LOW,
//     assignedTo: "1",
//     createdBy: {
//       id: "6",
//       name: "Eve Brown",
//       email: "eve@example.com",
//       avatar: null,
//     },
//     assignedDate: "2023-03-08",
//     dueDate: "2023-03-17",
//   },
// ];

// // Simulated API service
// const api = {
//   // Get current user data
//   getCurrentUser: (): Promise<User> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(currentUser);
//       }, 500);
//     });
//   },

//   // Get projects assigned to developer
//   getAssignedProjects: (developerId: string): Promise<Project[]> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const assignedProjects = projects.filter((project) =>
//           project.assignedDevelopers.includes(developerId)
//         );
//         resolve(assignedProjects);
//       }, 800);
//     });
//   },

//   // Get bugs for a specific project assigned to developer
//   getProjectBugs: (
//     projectId: string,
//     developerId: string
//   ): Promise<Bug[]> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const filteredBugs = bugs.filter(
//           (bug) => bug.projectId === projectId && bug.assignedTo === developerId
//         );
//         resolve(filteredBugs);
//       }, 800);
//     });
//   },

//   // Update bug status
//   updateBugStatus: (
//     bugId: string,
//     status: BugStatus
//   ): Promise<Bug> => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const bugIndex = bugs.findIndex((bug) => bug.id === bugId);
        
//         if (bugIndex !== -1) {
//           bugs[bugIndex] = { ...bugs[bugIndex], status };
//           resolve(bugs[bugIndex]);
//         } else {
//           reject(new Error("Bug not found"));
//         }
//       }, 600);
//     });
//   },
// };

// export default api;
import { Project, Bug, User, BugStatus } from "@/types";
import axios from "axios";

// Current user (the developer)
const currentUser: User = {
  userID: 52, // Static developer ID as per the requirement
  name: "Charlie Brown",
  email: "charlie@dev.com",
  role: "DEVELOPER"
};

// Simulated API service
const api = {
  // Get current user data
  getCurrentUser: (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(currentUser);
      }, 500);
    });
  },

  // Get projects assigned to developer
  getAssignedProjects: async (): Promise<Project[]> => {
    try {
      const response = await axios.get(
        `http://localhost:8089/developer/projects/${currentUser.userID}`
      );
      return response.data; // Assuming the backend returns the correct structure
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Get bugs for a specific project assigned to developer
  getProjectBugs: async (projectId: number): Promise<Bug[]> => {
    try {
      const response = await axios.get(
        `http://localhost:8089/developer/${currentUser.userID}/projects/${projectId}/bugs`
      );
      return response.data; // Assuming the backend returns the correct structure
    } catch (error) {
      console.error("Error fetching bugs:", error);
      throw error;
    }
  },

  updateBugStatus: async (bugId: string, status: BugStatus): Promise<Bug> => {
    try {
      const response = await axios.get(
        `http://localhost:8089/developer/52/bugs/${bugId}/updateStatus`
      );
      return response.data; // Assuming the backend returns the updated bug
    } catch (error) {
      console.error("Error updating bug status:", error);
      throw error;
    }
  },
};

export default api;