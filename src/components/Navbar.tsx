
import { User } from "@/types";
import { LogOut, UserCircle } from "lucide-react";
import { AvatarPlaceholder } from "./ui/avatar-placeholder";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  user: User | null;
  loading: boolean;
}

export function Navbar({ user, loading }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-primary">Developer Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {loading ? (
          <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md"></div>
        ) : user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <AvatarPlaceholder name={user.name} />
              )}
              <span className="font-medium hidden md:inline">{user.name}</span>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UserCircle className="h-8 w-8" />
            <span>Guest User</span>
          </div>
        )}
      </div>
    </nav>
  );
}
