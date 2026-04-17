import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/api";
import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="font-medium text-foreground">Ask your report</p>
          <p className="text-sm text-muted-foreground">What would you like to understand better?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        return (
          <div key={msg.id} className={cn("flex gap-3 max-w-[85%]", isUser ? "ml-auto flex-row-reverse" : "")}>
            <div className={cn("shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
              isUser ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground border-primary"
            )}>
              {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div className={cn("rounded-2xl px-4 py-3 text-sm md:text-base leading-relaxed whitespace-pre-wrap",
              isUser ? "bg-secondary text-secondary-foreground rounded-tr-none" : "bg-white border rounded-tl-none shadow-sm"
            )}>
              {msg.content}
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
