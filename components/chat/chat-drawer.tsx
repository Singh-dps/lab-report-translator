"use client";

import { useState } from "react";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import type { ChatMessage } from "@/types/api";
import { MessageSquare, X } from "lucide-react";

interface ChatDrawerProps {
  messages: ChatMessage[];
  reportId: string;
}

export function ChatDrawer({ messages: initialMessages, reportId }: ChatDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  
  const handleSendMessage = async (content: string) => {
    const tempId = Math.random().toString();
    const newMsg: ChatMessage = {
      id: tempId,
      role: "user",
      content,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);
    
    try {
      const res = await fetch(`/api/reports/${reportId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      
      const data = await res.json();
      setMessages(prev => [...prev, data.message]);
    } catch (err) {
      console.error("Chat error:", err);
      // Ideally show a toast error here
    }
  };

  return (
    <>
      {/* Mobile trigger FAB */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-all"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Desktop sidebar / Mobile drawer */}
      <div className={`
        fixed inset-y-0 right-0 z-50 flex flex-col bg-gray-50/50 backdrop-blur-xl border-l shadow-2xl transition-transform duration-300 ease-in-out
        w-full md:w-[400px] lg:w-[450px]
        ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
      `}>
        <div className="h-14 border-b flex items-center justify-between px-4 bg-white/50">
          <div className="flex items-center gap-2 font-medium">
            <MessageSquare className="w-4 h-4 text-primary" />
            Ask your report
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <MessageList messages={messages} />
        
        {messages.length === 0 && (
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => handleSendMessage("What should I ask my doctor?")} className="text-xs bg-white border rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors shadow-sm text-muted-foreground hover:text-foreground">
                What should I ask my doctor?
              </button>
              <button onClick={() => handleSendMessage("Is anything concerning?")} className="text-xs bg-white border rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors shadow-sm text-muted-foreground hover:text-foreground">
                Is anything concerning?
              </button>
            </div>
          </div>
        )}
        
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </>
  );
}
