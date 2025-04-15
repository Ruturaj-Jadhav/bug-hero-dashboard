
import { Bug, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon = "bug", action }: EmptyStateProps) {
  const renderIcon = () => {
    switch (icon) {
      case "folder":
        return <Folder className="h-6 w-6 text-primary" />;
      case "bug":
      default:
        return <Bug className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}
