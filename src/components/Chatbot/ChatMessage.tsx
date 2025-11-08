import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "mb-3 p-3 rounded-2xl max-w-[85%] whitespace-pre-line break-words",
        role === "user"
          ? "bg-primary text-primary-foreground ml-auto rounded-br-sm"
          : "bg-muted text-foreground mr-auto rounded-bl-sm"
      )}
    >
      {content}
    </div>
  );
}
