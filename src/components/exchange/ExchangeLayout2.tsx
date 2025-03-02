import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { messages } from "./data";
import { Message } from "./types";
import { ReplyDialog } from "./ReplyDialog";
import { NewEmailDialog } from "./NewEmailDialog";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Trash,
  Archive,
  Reply,
  Forward,
  Mail,
  Check,
  X,
  MessageSquare,
} from "lucide-react";

export function ExchangeLayout2() {
  const { t, language, dir } = useLanguage();
  const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState<boolean>(false);
  const [newEmailDialogOpen, setNewEmailDialogOpen] = useState<boolean>(false);
  const [replyType, setReplyType] = useState<"reply" | "replyAll" | "forward">(
    "reply",
  );

  // Filter messages by folder, department and priority
  const filteredMessages = messages.filter((message) => {
    const folderMatch = message.folder === selectedFolder;
    const departmentMatch =
      !selectedDepartment || message.department === selectedDepartment;
    const priorityMatch =
      !selectedPriority || message.priority === selectedPriority;
    const searchMatch =
      !searchQuery ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());

    return folderMatch && departmentMatch && priorityMatch && searchMatch;
  });

  // Mock departments
  const departments = [
    { id: "hr", name: "HR", nameAr: "الموارد البشرية", color: "#3366FF" },
    { id: "it", name: "IT", nameAr: "تقنية المعلومات", color: "#9933FF" },
    { id: "sales", name: "Sales", nameAr: "المبيعات", color: "#FFFF33" },
    { id: "marketing", name: "Marketing", nameAr: "التسويق", color: "#00CCCC" },
    { id: "finance", name: "Finance", nameAr: "المالية", color: "#666666" },
  ];

  // Priorities
  const priorities = [
    { id: "high", name: "High", nameAr: "عالية", color: "#FF3333" },
    { id: "medium", name: "Medium", nameAr: "متوسطة", color: "#FF9900" },
    { id: "low", name: "Low", nameAr: "منخفضة", color: "#33CC33" },
  ];

  // Format date based on how recent it is
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Same day - show time only
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString(language === "ar" ? "ar-EG" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    // Within the last week - show day name
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (date > oneWeekAgo) {
      return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
        weekday: "long",
      });
    }

    // Older - show date in MM/DD/YY format
    return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
      case "عالية":
        return "#FF3333";
      case "medium":
      case "متوسطة":
        return "#FF9900";
      case "low":
      case "منخفضة":
        return "#33CC33";
      default:
        return "#33CC33";
    }
  };

  // Toggle message selection
  const toggleMessageSelection = (messageId: number) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter((id) => id !== messageId));
    } else {
      setSelectedMessages([...selectedMessages, messageId]);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (
    action: "delete" | "archive" | "read" | "unread",
  ) => {
    // In a real app, this would update the messages in the database
    console.log(`Performing ${action} on messages:`, selectedMessages);
    setSelectedMessages([]);
    setIsSelectMode(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b flex justify-between items-center bg-card">
        <h1 className="text-xl font-semibold">{t("documentExchangeSystem")}</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSelectMode(!isSelectMode)}
          >
            {isSelectMode ? t("cancel") : t("select")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              language === "ar" ? (
                <ChevronLeft />
              ) : (
                <ChevronRight />
              )
            ) : language === "ar" ? (
              <ChevronRight />
            ) : (
              <ChevronLeft />
            )}
          </Button>
        </div>
      </header>

      <div
        className="flex flex-1 overflow-hidden"
        style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      >
        {/* Sidebar */}
        <div
          className={`border-${language === "ar" ? "l" : "r"} bg-muted flex flex-col transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}
        >
          {/* Search */}
          <div className="p-4">
            <Button
              className="w-full mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              onClick={() => setNewEmailDialogOpen(true)}
            >
              {t("newEmail")}
            </Button>

            {!sidebarCollapsed && (
              <div className="relative">
                <Search
                  className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`}
                />
                <Input
                  placeholder={t("searchMessages")}
                  className={`${language === "ar" ? "pr-10" : "pl-10"} bg-background border-border`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Folders */}
          <div className="flex-1 overflow-auto">
            <div className="p-2">
              {["inbox", "sent", "archive", "drafts", "trash"].map((folder) => (
                <Button
                  key={folder}
                  variant={selectedFolder === folder ? "default" : "ghost"}
                  className={`w-full justify-${language === "ar" ? "end" : "start"} mb-1 ${sidebarCollapsed ? "px-0 justify-center" : ""}`}
                  onClick={() => {
                    setSelectedFolder(folder);
                    setSelectedMessage(null);
                    setSelectedDepartment(null);
                    setSelectedPriority(null);
                  }}
                >
                  {folder === "inbox" && <Mail className="h-4 w-4 mx-2" />}
                  {folder === "sent" && <Forward className="h-4 w-4 mx-2" />}
                  {folder === "archive" && <Archive className="h-4 w-4 mx-2" />}
                  {folder === "drafts" && <Mail className="h-4 w-4 mx-2" />}
                  {folder === "trash" && <Trash className="h-4 w-4 mx-2" />}
                  {!sidebarCollapsed && t(folder)}
                </Button>
              ))}
            </div>

            {/* Departments */}
            {!sidebarCollapsed && (
              <div className="px-2">
                <Separator className="my-2" />
                <p className="text-sm font-medium px-2 py-1 text-muted-foreground">
                  {t("department")}
                </p>
                <div className="space-y-4 p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {departments.map((dept) => (
                      <Button
                        key={dept.id}
                        variant={
                          selectedDepartment === dept.id ? "default" : "outline"
                        }
                        size="sm"
                        className="flex items-center gap-1 w-full justify-start"
                        onClick={() => {
                          setSelectedDepartment(
                            selectedDepartment === dept.id ? null : dept.id,
                          );
                          setSelectedMessage(null);
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: dept.color }}
                        />
                        <span>
                          {language === "ar" ? dept.nameAr : dept.name}
                        </span>
                      </Button>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2 text-muted-foreground">
                      {t("priority")}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {priorities.map((priority) => (
                        <Button
                          key={priority.id}
                          variant={
                            selectedPriority === priority.id
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="flex items-center gap-1 w-full justify-start"
                          onClick={() => {
                            setSelectedPriority(
                              selectedPriority === priority.id
                                ? null
                                : priority.id,
                            );
                            setSelectedMessage(null);
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: priority.color }}
                          />
                          <span>
                            {language === "ar"
                              ? priority.nameAr
                              : priority.name}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom padding */}
          <div className="p-2"></div>
        </div>

        {/* Email List and Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email List */}
          <div
            className={`${selectedMessage ? "w-2/5" : "w-full"} border-${language === "ar" ? "l" : "r"} overflow-auto`}
          >
            {/* Email List Header */}
            <div className="p-4 border-b flex justify-between items-center bg-card">
              <h2 className="font-medium flex items-center gap-2">
                {t(selectedFolder)}
                {selectedDepartment && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: departments.find(
                          (d) => d.id === selectedDepartment,
                        )?.color,
                      }}
                    />
                    {language === "ar"
                      ? departments.find((d) => d.id === selectedDepartment)
                          ?.nameAr
                      : departments.find((d) => d.id === selectedDepartment)
                          ?.name}
                  </Badge>
                )}
                {selectedPriority && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: priorities.find(
                          (p) => p.id === selectedPriority,
                        )?.color,
                      }}
                    />
                    {language === "ar"
                      ? priorities.find((p) => p.id === selectedPriority)
                          ?.nameAr
                      : priorities.find((p) => p.id === selectedPriority)?.name}
                  </Badge>
                )}
              </h2>

              {isSelectMode && selectedMessages.length > 0 && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBulkAction("delete")}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    {t("delete")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBulkAction("archive")}
                  >
                    <Archive className="h-4 w-4 mr-1" />
                    {t("archive")}
                  </Button>
                </div>
              )}
            </div>

            {/* Email List */}
            <div className="divide-y">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  {t("noMessages")}
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 hover:bg-muted/50 cursor-pointer ${selectedMessage?.id === message.id ? "bg-muted" : ""}`}
                    onClick={() => {
                      if (isSelectMode) {
                        toggleMessageSelection(message.id);
                      } else {
                        setSelectedMessage(message);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div
                        className={`text-sm font-medium ${language === "ar" ? "text-right" : "text-left"}`}
                      >
                        {/* Department and Priority */}
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/70">
                            {message.department || "General"}
                          </span>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: getPriorityColor(
                                message.priority || "low",
                              ),
                            }}
                          />
                        </div>
                      </div>

                      {/* Selection Checkbox or Date */}
                      <div
                        className={`text-xs text-muted-foreground ${language === "ar" ? "text-left" : "text-right"}`}
                      >
                        {isSelectMode ? (
                          <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                            {selectedMessages.includes(message.id) && (
                              <Check className="h-3 w-3" />
                            )}
                          </div>
                        ) : (
                          formatDate(message.date)
                        )}
                      </div>
                    </div>

                    {/* Sender and Subject */}
                    <div className="mt-1 flex justify-between">
                      <div className="font-semibold">{message.sender}</div>
                    </div>

                    {/* Subject */}
                    <div className="mt-1 font-medium text-foreground truncate">
                      {message.subject}
                    </div>

                    {/* Preview */}
                    <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {message.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Email Content */}
          {selectedMessage && (
            <div className="w-3/5 overflow-auto bg-background p-6">
              <div className="max-w-3xl mx-auto">
                {/* Email Header */}
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-4">
                    {selectedMessage.subject}
                  </h1>

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium">{selectedMessage.sender}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("to")}: {selectedMessage.recipient}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(selectedMessage.date).toLocaleString(
                        language === "ar" ? "ar-EG" : "en-US",
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mb-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyType("reply");
                        setReplyDialogOpen(true);
                      }}
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      {t("reply")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyType("replyAll");
                        setReplyDialogOpen(true);
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {t("replyAll") || "Reply All"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyType("forward");
                        setReplyDialogOpen(true);
                      }}
                    >
                      <Forward className="h-4 w-4 mr-1" />
                      {t("forward")}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4 mr-1" />
                      {t("archive")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      {t("delete")}
                    </Button>
                  </div>

                  <Separator className="my-4" />
                </div>

                {/* Email Content */}
                <div className="max-w-none text-foreground">
                  <p>{selectedMessage.content}</p>

                  {selectedMessage.hasDocument && (
                    <div className="mt-6 p-4 border rounded-lg">
                      <p className="font-medium">
                        {t("attachedDocument")}: {selectedMessage.documentName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedMessage.documentSize}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        {t("view")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ReplyDialog
        open={replyDialogOpen}
        onOpenChange={setReplyDialogOpen}
        message={selectedMessage}
        replyType={replyType}
      />
      <NewEmailDialog
        open={newEmailDialogOpen}
        onOpenChange={setNewEmailDialogOpen}
      />
    </div>
  );
}
