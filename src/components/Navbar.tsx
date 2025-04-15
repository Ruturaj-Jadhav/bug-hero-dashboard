
import { User } from "@/types";
import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder";
import { Button } from "@/components/ui/button";
import { CreditCard, Eye, EyeOff, LogOut, Search, Settings, UserCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface NavbarProps {
  user: User;
  loading?: boolean;
  focusMode?: boolean;
  onToggleFocusMode?: () => void;
}

export function Navbar({ user, loading = false, focusMode = false, onToggleFocusMode }: NavbarProps) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 h-16 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl flex items-center gap-2 text-primary">
            <span className="hidden md:inline">Bug Tracker</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onToggleFocusMode && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              title={focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
              onClick={onToggleFocusMode}
            >
              {focusMode ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center">
            <AvatarPlaceholder name={user.name} />
          </div>
        </div>
      </div>
    </header>
  );
}
