
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to authenticate the user
      // Simulate login for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if credentials match a mock user (in a real app, this would be server-side)
      if (email === "admin@example.com" && password === "password") {
        toast.success("Login successful");
        navigate("/admin");
      } else if (email === "manager@example.com" && password === "password") {
        toast.success("Login successful");
        navigate("/manager");
      } else if (email === "developer@example.com" && password === "password") {
        toast.success("Login successful");
        navigate("/dashboard");
      } else if (email === "tester@example.com" && password === "password") {
        toast.success("Login successful");
        navigate("/tester");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
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
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-x-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center gap-x-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </span>
              )}
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
