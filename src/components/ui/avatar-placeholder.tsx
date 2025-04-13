
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

  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white",
        className
      )}
    >
      {initials}
    </div>
  );
}
