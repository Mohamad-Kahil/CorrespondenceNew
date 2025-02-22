import React from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Reply,
  Forward,
  Archive,
  Trash,
  Download,
  FileText,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Message } from "./types";

interface MessageViewProps {
  message?: Message | null;
}

export function MessageView({ message }: MessageViewProps) {
  if (!message) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a message to view
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            {message.subject}
          </h2>
          <div className="text-sm text-muted-foreground">
            From: {message.sender}
            <br />
            To: {message.recipient}
            <br />
            Date: {message.date}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Reply className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Forward className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Archive className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          <p className="text-foreground">{message.content}</p>

          {message.hasDocument && (
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {message.documentName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      PDF Document - {message.documentSize}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
