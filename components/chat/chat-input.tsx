"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="relative flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="min-h-[52px] max-h-32 resize-none rounded-2xl pr-14 py-3.5 shadow-sm"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={!input.trim() || isLoading}
          className="absolute right-2 bottom-2 rounded-xl h-9 w-9 bg-primary"
        >
          <SendHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
