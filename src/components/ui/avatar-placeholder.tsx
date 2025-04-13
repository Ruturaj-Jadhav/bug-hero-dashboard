
import { cn } from "@/lib/utils";

interface AvatarPlaceholderProps {
  name: string;
  className?: string;
}

export function AvatarPlaceholder({ name, className }: AvatarPlaceholderProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Generate a deterministic color based on the name
  const getColorFromName = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-rose-500",
      "bg-teal-500",
    ];
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    hash = Math.abs(hash);
    return colors[hash % colors.length];
  };

  const backgroundColor = getColorFromName(name);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full text-sm font-medium text-white",
        backgroundColor,
        className
      )}
      title={name}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
