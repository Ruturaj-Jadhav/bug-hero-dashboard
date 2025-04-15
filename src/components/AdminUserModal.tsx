
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "@/types";

interface AdminUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
  user: User | null;
}

export function AdminUserModal({ isOpen, onClose, onSave, user }: AdminUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("developer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens or user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else {
      setName("");
      setEmail("");
      setRole("developer");
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave({
        name,
        email,
        role
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {user ? "Edit User" : "Create User"}
          </DialogTitle>
          <DialogDescription>
            {user 
              ? "Make changes to the user's details below." 
              : "Fill in the details to create a new user."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <RadioGroup value={role} onValueChange={setRole}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="developer" id="developer" />
                  <Label htmlFor="developer">Developer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tester" id="tester" />
                  <Label htmlFor="tester">Tester</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manager" id="manager" />
                  <Label htmlFor="manager">Project Manager</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-x-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Saving...
                </span>
              ) : user ? "Update User" : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
