import React, { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Inbox, Send, Archive, Trash, PenBox } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NewMessageDialog } from "./NewMessageDialog";

const folders = [
  { icon: Inbox, name: "Inbox", path: "inbox", count: 12 },
  { icon: Send, name: "Sent", path: "sent", count: 24 },
  { icon: PenBox, name: "Drafts", path: "drafts", count: 2 },
  { icon: Archive, name: "Archive", path: "archive", count: 45 },
  { icon: Trash, name: "Trash", path: "trash", count: 8 },
];

interface ExchangeSidebarProps {
  currentFolder: string;
}

export function ExchangeSidebar({ currentFolder }: ExchangeSidebarProps) {
  const [newMessageOpen, setNewMessageOpen] = useState(false);

  return (
    <div className="h-full bg-card border-r border-border p-4 flex flex-col gap-4">
      <Button
        className="w-full"
        size="lg"
        onClick={() => setNewMessageOpen(true)}
      >
        <PenBox className="mr-2 h-4 w-4" /> New Message
      </Button>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {folders.map((folder) => (
            <Button
              key={folder.path}
              variant={currentFolder === folder.path ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-between hover:text-primary",
                currentFolder === folder.path
                  ? "bg-secondary/50 text-primary font-medium"
                  : "text-foreground",
              )}
              asChild
            >
              <Link to={`/exchange/${folder.path}`}>
                <div className="flex items-center">
                  <folder.icon className="mr-2 h-4 w-4" />
                  {folder.name}
                </div>
                <span className="text-xs text-muted-foreground">
                  {folder.count}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <NewMessageDialog
        open={newMessageOpen}
        onOpenChange={setNewMessageOpen}
      />
    </div>
  );
}
