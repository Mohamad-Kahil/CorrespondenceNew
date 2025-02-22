import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Message } from "./types";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  onMessageSelect: (message: Message) => void;
  selectedMessageId?: number;
}

export function MessageList({
  messages,
  onMessageSelect,
  selectedMessageId,
}: MessageListProps) {
  return (
    <div className="h-full flex flex-col border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages"
            className="pl-9 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => onMessageSelect(message)}
              className={cn(
                "w-full p-4 text-left",
                "hover:bg-muted/50",
                message.isUnread && "bg-primary/5",
                selectedMessageId === message.id && "bg-primary/10",
                "text-foreground",
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span
                  className={cn(
                    "font-medium",
                    message.isUnread ? "text-primary" : "text-foreground",
                  )}
                >
                  {message.subject}
                </span>
                <span className="text-xs text-muted-foreground">
                  {message.date}
                </span>
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {message.preview}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
