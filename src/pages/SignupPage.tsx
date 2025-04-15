
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Developer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to register the user
      // Simulate signup for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Account created successfully");
      // Redirect to login page after successful signup
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Select Role</Label>
              <RadioGroup value={role} onValueChange={setRole} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Developer" id="developer" />
                  <Label htmlFor="developer">Developer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Tester" id="tester" />
                  <Label htmlFor="tester">Tester</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Project Manager" id="project-manager" />
                  <Label htmlFor="project-manager">Project Manager</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-x-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-x-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </span>
              )}
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
