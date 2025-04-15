
import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Search, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { User } from "@/types";
import { AdminUserModal } from "@/components/AdminUserModal";
import { toast } from "sonner";

// Dummy admin user for testing
const dummyAdmin = {
  userID: 999,
  name: "Admin User",
  email: "admin@example.com",
  role: "admin"
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call to fetch users
        // Simulate API call for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock users data
        const mockUsers: User[] = [
          {
            userID: 1,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "tester"
          },
          {
            userID: 2,
            name: "Alex Johnson",
            email: "alex@example.com",
            role: "manager"
          },
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
            userID: 7,
            name: "Emily Rodriguez",
            email: "emily@example.com",
            role: "tester"
          }
        ];
        
        setUsers(mockUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // In a real app, this would be an API call to delete the user
        // Simulate API call for demo purposes
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setUsers(users.filter(user => user.userID !== userId));
        toast.success("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    }
  };

  const handleSaveUser = async (userData: Partial<User>) => {
    try {
      // In a real app, this would be an API call to create/update the user
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedUser) {
        // Update existing user
        setUsers(users.map(user => 
          user.userID === selectedUser.userID 
            ? { ...user, ...userData } 
            : user
        ));
        toast.success("User updated successfully");
      } else {
        // Create new user
        const newUser: User = {
          userID: Math.floor(Math.random() * 1000) + 10, // Generate a random ID
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "developer"
        };
        setUsers([...users, newUser]);
        toast.success("User created successfully");
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        user={dummyAdmin}
        loading={false} 
        focusMode={false}
        onToggleFocusMode={() => {}} 
      />
      
      <main className="flex-1 pt-16 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <UserCog className="h-8 w-8" />
                User Management
              </h1>
              <p className="mt-2 text-gray-600">
                Create, view, edit, and delete users in the system
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-9 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button onClick={handleAddUser} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </div>
          </header>
          
          <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
                <p className="mt-2 text-gray-500">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center">
                {searchTerm ? (
                  <p className="text-gray-500">No users match your search criteria</p>
                ) : (
                  <p className="text-gray-500">No users found. Add some users to get started.</p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.userID}>
                        <TableCell className="font-medium">{user.userID}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "developer" 
                              ? "bg-blue-100 text-blue-800" 
                              : user.role === "tester" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-purple-100 text-purple-800"
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditUser(user)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteUser(user.userID)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <AdminUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />
      
      <Toaster />
    </div>
  );
}
