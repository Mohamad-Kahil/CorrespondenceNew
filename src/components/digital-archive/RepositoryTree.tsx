import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChevronDown,
  FolderIcon,
  FileIcon,
  Plus,
  Search,
  FolderOpen,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

type RepositoryItem = {
  id: string;
  name: string;
  type: "folder" | "document";
  children?: RepositoryItem[];
  documentType?: "inbound" | "outbound";
  metadata?: {
    date: string;
    sender?: string;
    recipient?: string;
    reference?: string;
  };
  imagePath?: string;
};

const mockData: RepositoryItem[] = [
  {
    id: "1",
    name: "ABC Company",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "Inbound",
        type: "folder",
        children: [
          {
            id: "1-1-1",
            name: "Business Letter.jpg",
            type: "document",
            documentType: "inbound",
            metadata: {
              date: "2024-03-25",
              sender: "ABC Company",
              reference: "BL-2024-001",
            },
            imagePath: "./Letter1.jpg",
          },
          {
            id: "1-1-2",
            name: "Formal Letter.jpg",
            type: "document",
            documentType: "inbound",
            metadata: {
              date: "2024-03-27",
              sender: "ABC Company",
              reference: "FL-2024-002",
            },
            imagePath: "./Letter2.jpg",
          },
        ],
      },
      {
        id: "1-2",
        name: "Outbound",
        type: "folder",
        children: [
          {
            id: "1-2-1",
            name: "Internal Memo.jpg",
            type: "document",
            documentType: "outbound",
            metadata: {
              date: "2024-03-26",
              recipient: "ABC Company",
              reference: "IM-2024-001",
            },
            imagePath: "./Letter3.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "XYZ Corporation",
    type: "folder",
    children: [
      {
        id: "2-1",
        name: "Inbound",
        type: "folder",
        children: [],
      },
      {
        id: "2-2",
        name: "Outbound",
        type: "folder",
        children: [
          {
            id: "2-2-1",
            name: "Response Letter.jpg",
            type: "document",
            documentType: "outbound",
            metadata: {
              date: "2024-03-29",
              recipient: "XYZ Corporation",
              reference: "RL-2024-001",
            },
            imagePath: "./Letter4.jpg",
          },
        ],
      },
    ],
  },
];

interface RepositoryTreeProps {
  onDocumentSelect: (document: RepositoryItem) => void;
}

export function RepositoryTree({ onDocumentSelect }: RepositoryTreeProps) {
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleExpand = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const renderItem = (item: RepositoryItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const isSelected = selectedItem === item.id;

    return (
      <div key={item.id} className="select-none">
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={cn(
                "flex items-center py-1 px-2 rounded-sm cursor-pointer",
                isSelected && "bg-primary/10",
                !isSelected && "hover:bg-muted/50",
              )}
              style={{ paddingLeft: `${level * 12 + 4}px` }}
              onClick={() => {
                setSelectedItem(item.id);
                if (item.type === "document") {
                  onDocumentSelect(item);
                }
              }}
            >
              {item.type === "folder" &&
              item.children &&
              item.children.length > 0 ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(item.id);
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              ) : (
                <span className="w-4" />
              )}
              {item.type === "folder" ? (
                isExpanded ? (
                  <FolderOpen className="h-4 w-4 text-primary mr-2" />
                ) : (
                  <FolderIcon className="h-4 w-4 text-primary mr-2" />
                )
              ) : (
                <FileIcon className="h-4 w-4 text-muted-foreground mr-2" />
              )}
              <span className="text-sm">{item.name}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {item.type === "folder" && (
              <>
                <ContextMenuItem>
                  <Plus className="h-4 w-4 mr-2" />
                  {t("newFolder")}
                </ContextMenuItem>
                {(item.name === "Inbound" || item.name === "Outbound") && (
                  <ContextMenuItem>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("uploadDocument")}
                  </ContextMenuItem>
                )}
              </>
            )}
            {item.type === "document" && (
              <>
                <ContextMenuItem>{t("view")}</ContextMenuItem>
                <ContextMenuItem>{t("forward")}</ContextMenuItem>
                <ContextMenuItem>{t("startWorkflow")}</ContextMenuItem>
                <ContextMenuItem>{t("createVersion")}</ContextMenuItem>
              </>
            )}
          </ContextMenuContent>
        </ContextMenu>
        {isExpanded && item.children && (
          <div className="ml-4">
            {item.children.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("searchArchive")} className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        {mockData.map((item) => renderItem(item))}
      </ScrollArea>
    </div>
  );
}
