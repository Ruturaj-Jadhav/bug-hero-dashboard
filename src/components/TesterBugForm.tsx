
import { useState } from "react";
import { Bug, BugPriority } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle, Loader2 } from "lucide-react";

interface TesterBugFormProps {
  projectId: string;
  onSubmitBug: (bugData: Partial<Bug>) => Promise<void>;
  isLoading: boolean;
}

export function TesterBugForm({ projectId, onSubmitBug, isLoading }: TesterBugFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>(BugPriority.MEDIUM);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileUploaded(true);
      toast({
        title: "File uploaded",
        description: `File ${e.target.files[0].name} ready to submit with bug report`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const bugData: Partial<Bug> = {
        title,
        description,
        priority,
        // In a real app we would handle the file upload here
      };
      
      await onSubmitBug(bugData);
      
      // Reset form
      setTitle("");
      setDescription("");
      setPriority(BugPriority.MEDIUM);
      setFile(null);
      setFileUploaded(false);
      
    } catch (error) {
      console.error("Error submitting bug:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Report a New Bug</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Bug Title</Label>
            <Input
              id="title"
              placeholder="Enter a concise bug title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the bug in detail. Include steps to reproduce."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={setPriority}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={BugPriority.LOW}>Low</SelectItem>
                <SelectItem value={BugPriority.MEDIUM}>Medium</SelectItem>
                <SelectItem value={BugPriority.HIGH}>High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="screenshot">Screenshot (optional)</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("screenshot")?.click()}
                className="w-full"
                disabled={isSubmitting || fileUploaded}
              >
                {fileUploaded ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    File Uploaded
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Screenshot
                  </>
                )}
              </Button>
              <input
                id="screenshot"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              {fileUploaded && (
                <Button
                  type="button"
                  variant="outline"
                  className="px-2 py-0"
                  onClick={() => {
                    setFile(null);
                    setFileUploaded(false);
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
            {file && (
              <p className="text-sm text-gray-500 truncate">{file.name}</p>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Bug"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
