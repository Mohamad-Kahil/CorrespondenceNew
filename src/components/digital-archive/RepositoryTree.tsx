import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  SECURITY_LEVELS,
  AUTHORIZATION_LEVELS,
} from "@/lib/constants/security";
import { Badge } from "../ui/badge";
import {
  ChevronRight,
  ChevronDown,
  FolderIcon,
  FileIcon,
  Plus,
  Search,
  FolderOpen,
  Shield,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
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
  securityLevel?: 1 | 2 | 3 | 4 | 5;
  authorizationLevel?: "T" | "S" | "C" | "R" | "U";
};

const mockData: RepositoryItem[] = [
  {
    id: "1",
    name: "ABC Company",
    type: "folder",
    securityLevel: 4,
    children: [
      {
        id: "1-1",
        name: "Inbound",
        type: "folder",
        securityLevel: 5,
        children: [
          {
            id: "1-1-1",
            name: "Business Letter.jpg",
            type: "document",
            documentType: "inbound",
            authorizationLevel: "T",
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
            authorizationLevel: "S",
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
        securityLevel: 4,
        children: [
          {
            id: "1-2-1",
            name: "Internal Memo.jpg",
            type: "document",
            documentType: "outbound",
            authorizationLevel: "C",
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
    securityLevel: 3,
    children: [
      {
        id: "2-1",
        name: "Inbound",
        type: "folder",
        securityLevel: 3,
        children: [],
      },
      {
        id: "2-2",
        name: "Outbound",
        type: "folder",
        securityLevel: 3,
        children: [
          {
            id: "2-2-1",
            name: "Response Letter.jpg",
            type: "document",
            documentType: "outbound",
            authorizationLevel: "R",
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
                item.type === "folder" &&
                  item.securityLevel &&
                  SECURITY_LEVELS[item.securityLevel].color,
                item.type === "folder" &&
                  item.securityLevel &&
                  SECURITY_LEVELS[item.securityLevel].borderColor,
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
              <span className="text-sm flex-1">{item.name}</span>
              {item.type === "folder" && item.securityLevel && (
                <Badge variant="outline" className="ml-2">
                  {item.securityLevel}
                </Badge>
              )}
              {item.type === "document" && item.authorizationLevel && (
                <Badge
                  variant="outline"
                  className={cn(
                    "ml-2",
                    AUTHORIZATION_LEVELS[item.authorizationLevel].badge,
                  )}
                >
                  {item.authorizationLevel}
                </Badge>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {item.type === "folder" && (
              <>
                <ContextMenuItem>
                  <Plus className="h-4 w-4 mr-2" />
                  {t("newFolder")}
                </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Shield className="h-4 w-4 mr-2" />
                    {t("securityLevel")}
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    {Object.entries(SECURITY_LEVELS).map(([level, config]) => (
                      <ContextMenuItem
                        key={level}
                        disabled={parseInt(level) < (item.securityLevel || 1)}
                        onClick={() => {
                          // Here you would update the security level in your backend
                          console.log(
                            `Setting security level ${level} for folder ${item.id}`,
                          );
                        }}
                      >
                        <div
                          className={`h-3 w-3 rounded-full ${config.color} mr-2`}
                        />
                        {config.label}
                      </ContextMenuItem>
                    ))}
                  </ContextMenuSubContent>
                </ContextMenuSub>
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
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Shield className="h-4 w-4 mr-2" />
                    {t("authorizationLevel")}
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    {Object.entries(AUTHORIZATION_LEVELS).map(
                      ([level, config]) => (
                        <ContextMenuItem
                          key={level}
                          onClick={() => {
                            // Here you would update the authorization level in your backend
                            console.log(
                              `Setting authorization level ${level} for document ${item.id}`,
                            );
                          }}
                        >
                          <Badge variant="outline" className={config.badge}>
                            {level}
                          </Badge>
                          <span className="ml-2">{config.label}</span>
                        </ContextMenuItem>
                      ),
                    )}
                  </ContextMenuSubContent>
                </ContextMenuSub>
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
