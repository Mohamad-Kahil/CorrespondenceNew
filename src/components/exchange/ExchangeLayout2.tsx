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
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  AlertCircle,
} from "lucide-react";

// Define notification types
type NotificationType = "task" | "workflow" | "system" | "security";
type NotificationSubtype =
  | "taskAssignment"
  | "taskDueReminder"
  | "taskCompletion"
  | "taskReassignment"
  | "taskEscalation"
  | "workflowStageUpdate"
  | "approvalRequest"
  | "approvalRejection"
  | "workflowCompletion"
  | "systemAlert"
  | "securityAlert";

interface Notification {
  id: number;
  type: NotificationType;
  subtype: NotificationSubtype;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  relatedId?: string;
  sender?: string;
  actionRequired?: boolean;
  isOverdue?: boolean;
}

// Mock notifications
const notifications: Notification[] = [
  {
    id: 1,
    type: "task",
    subtype: "taskAssignment",
    title: "New Task Assignment",
    content:
      "You've been assigned to draft a response to Budget Approval by Ahmed Al-Sabah.",
    date: "2024-06-01T10:30:00",
    isRead: false,
    relatedId: "task-123",
    sender: "Ahmed Al-Sabah",
    actionRequired: true,
  },
  {
    id: 2,
    type: "task",
    subtype: "taskDueReminder",
    title: "Task Due Soon",
    content: "Reminder: Document Review due in 2 hours.",
    date: "2024-06-01T09:15:00",
    isRead: false,
    relatedId: "task-124",
    actionRequired: true,
    isOverdue: true,
  },
  {
    id: 3,
    type: "task",
    subtype: "taskCompletion",
    title: "Task Completed",
    content: "Task completed: Reply to Security Protocol Update sent.",
    date: "2024-05-31T16:45:00",
    isRead: true,
    relatedId: "task-125",
  },
  {
    id: 4,
    type: "task",
    subtype: "taskReassignment",
    title: "Task Reassigned",
    content: "Annual Budget Review reassigned to Fatima Al-Rashid.",
    date: "2024-05-31T14:20:00",
    isRead: true,
    relatedId: "task-126",
  },
  {
    id: 5,
    type: "task",
    subtype: "taskEscalation",
    title: "Task Escalated",
    content:
      "Security Clearance Request overdue by 24 hours, escalated to Mohammed Al-Khalid.",
    date: "2024-05-31T11:10:00",
    isRead: false,
    relatedId: "task-127",
    actionRequired: true,
    isOverdue: true,
  },
  {
    id: 7,
    type: "workflow",
    subtype: "workflowStageUpdate",
    title: "Workflow Stage Updated",
    content: "Document Approval workflow has moved to Review stage.",
    date: "2024-05-30T15:45:00",
    isRead: false,
    relatedId: "workflow-129",
  },
  {
    id: 8,
    type: "workflow",
    subtype: "approvalRequest",
    title: "Approval Requested",
    content:
      "Your approval is requested for International Cooperation Agreement.",
    date: "2024-05-30T14:20:00",
    isRead: false,
    relatedId: "doc-130",
    actionRequired: true,
  },
  {
    id: 9,
    type: "workflow",
    subtype: "approvalRejection",
    title: "Document Rejected",
    content:
      "Budget Proposal was rejected by Finance Department. Requires revision.",
    date: "2024-05-30T11:15:00",
    isRead: true,
    relatedId: "doc-131",
    actionRequired: true,
  },
  {
    id: 10,
    type: "workflow",
    subtype: "workflowCompletion",
    title: "Workflow Completed",
    content:
      "Employee Onboarding workflow for Nasser Al-Ahmed has been completed.",
    date: "2024-05-29T17:30:00",
    isRead: true,
    relatedId: "workflow-132",
  },
  {
    id: 11,
    type: "system",
    subtype: "systemAlert",
    title: "System Maintenance",
    content: "System maintenance scheduled for 03/07/24, 2:00 AM.",
    date: "2024-05-29T10:00:00",
    isRead: false,
  },
  {
    id: 12,
    type: "security",
    subtype: "securityAlert",
    title: "Security Alert",
    content: "Unrecognized login attempt detected for your account.",
    date: "2024-05-29T09:15:00",
    isRead: false,
    actionRequired: true,
  },
  // New mixed date notifications
  {
    id: 13,
    type: "task",
    subtype: "taskAssignment",
    title: "New Project Assignment",
    content: "You've been assigned to lead the new IT infrastructure project.",
    date: "2024-06-02T08:30:00",
    isRead: false,
    relatedId: "task-133",
    sender: "Mohammed Al-Khalid",
    actionRequired: true,
  },
  {
    id: 14,
    type: "workflow",
    subtype: "approvalRequest",
    title: "Budget Approval Needed",
    content: "Please review and approve the Q3 budget proposal.",
    date: "2024-06-02T09:45:00",
    isRead: false,
    relatedId: "doc-134",
    actionRequired: true,
  },
  {
    id: 15,
    type: "task",
    subtype: "taskDueReminder",
    title: "Presentation Due Tomorrow",
    content: "Reminder: Your quarterly presentation is due tomorrow at 10 AM.",
    date: "2024-06-01T15:20:00",
    isRead: false,
    relatedId: "task-135",
    actionRequired: true,
    isOverdue: true,
  },
  {
    id: 16,
    type: "workflow",
    subtype: "workflowStageUpdate",
    title: "Contract Review Updated",
    content: "The vendor contract review has moved to legal department.",
    date: "2024-05-31T13:10:00",
    isRead: false,
    relatedId: "workflow-136",
  },
  {
    id: 17,
    type: "task",
    subtype: "taskCompletion",
    title: "Training Completed",
    content: "Your team has completed the required security training.",
    date: "2024-05-30T11:25:00",
    isRead: true,
    relatedId: "task-137",
  },
];

export function ExchangeLayout2() {
  const { t, language, dir } = useLanguage();
  const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [notificationFilter, setNotificationFilter] = useState<
    "all" | "task" | "workflow" | "overdue" | "actionRequired"
  >("all");
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

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFolder !== "notifications") return false;

    if (notificationFilter === "task" && notification.type !== "task")
      return false;
    if (notificationFilter === "workflow" && notification.type !== "workflow")
      return false;
    if (notificationFilter === "overdue" && !notification.isOverdue)
      return false;
    if (notificationFilter === "actionRequired" && !notification.actionRequired)
      return false;

    const searchMatch =
      !searchQuery ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase());

    return searchMatch;
  });

  // Count messages by folder
  const countMessagesByFolder = (folder: string) => {
    return messages.filter((m) => m.folder === folder).length;
  };

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

  // Get notification icon
  const getNotificationIcon = (notification: Notification) => {
    switch (notification.subtype) {
      case "taskAssignment":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "taskDueReminder":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "taskCompletion":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "taskReassignment":
        return <UserPlus className="h-4 w-4 text-purple-500" />;
      case "taskEscalation":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "workflowStageUpdate":
        return <Forward className="h-4 w-4 text-cyan-500" />;
      case "approvalRequest":
        return <MessageSquare className="h-4 w-4 text-indigo-500" />;
      case "approvalRejection":
        return <X className="h-4 w-4 text-red-500" />;
      case "workflowCompletion":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "systemAlert":
        return <Bell className="h-4 w-4 text-amber-500" />;
      case "securityAlert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
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
              <Button
                key="notifications"
                variant={
                  selectedFolder === "notifications" ? "default" : "ghost"
                }
                className={`w-full justify-${language === "ar" ? "end" : "start"} mb-1 ${sidebarCollapsed ? "px-0 justify-center" : ""}`}
                onClick={() => {
                  setSelectedFolder("notifications");
                  setSelectedMessage(null);
                  setSelectedNotification(null);
                  setSelectedDepartment(null);
                  setSelectedPriority(null);
                  setNotificationFilter("all");
                }}
              >
                <Bell className="h-4 w-4 mx-2" />
                {!sidebarCollapsed && t("notifications")}
                <Badge className="ml-auto" variant="secondary">
                  {notifications.filter((n) => !n.isRead).length}
                </Badge>
              </Button>

              {["inbox", "sent", "archive", "drafts", "trash"].map((folder) => (
                <Button
                  key={folder}
                  variant={selectedFolder === folder ? "default" : "ghost"}
                  className={`w-full justify-${language === "ar" ? "end" : "start"} mb-1 ${sidebarCollapsed ? "px-0 justify-center" : ""}`}
                  onClick={() => {
                    setSelectedFolder(folder);
                    setSelectedMessage(null);
                    setSelectedNotification(null);
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
                  <Badge className="ml-auto" variant="secondary">
                    {countMessagesByFolder(folder)}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Departments and Filters */}
            {!sidebarCollapsed && (
              <div className="px-2">
                <Separator className="my-2" />

                {/* Show notification filters when notifications folder is selected */}
                {selectedFolder === "notifications" ? (
                  <div className="space-y-4 p-2">
                    <p className="text-sm font-medium mb-2 text-muted-foreground">
                      {t("notifications")}
                    </p>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant={
                          notificationFilter === "all" ? "default" : "outline"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setNotificationFilter("all")}
                      >
                        {t("all") || "All"}
                      </Button>
                      <Button
                        variant={
                          notificationFilter === "task" ? "default" : "outline"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setNotificationFilter("task")}
                      >
                        {t("taskNotifications")}
                      </Button>
                      <Button
                        variant={
                          notificationFilter === "workflow"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setNotificationFilter("workflow")}
                      >
                        {t("workflowNotifications")}
                      </Button>
                      <Button
                        variant={
                          notificationFilter === "overdue"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setNotificationFilter("overdue")}
                      >
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        {t("overdueTasks")}
                      </Button>
                      <Button
                        variant={
                          notificationFilter === "actionRequired"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setNotificationFilter("actionRequired")}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        {t("actionRequiredFilter")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Show department and priority filters for other folders */
                  <>
                    <p className="text-sm font-medium px-2 py-1 text-muted-foreground">
                      {t("department")}
                    </p>
                    <div className="space-y-4 p-2">
                      <div className="grid grid-cols-2 gap-2">
                        {departments.map((dept) => (
                          <Button
                            key={dept.id}
                            variant={
                              selectedDepartment === dept.id
                                ? "default"
                                : "outline"
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
                  </>
                )}
              </div>
            )}
          </div>

          {/* Bottom padding */}
          <div className="p-2"></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {selectedFolder === "notifications" ? (
            /* Notifications View */
            <div className="flex flex-1 overflow-hidden">
              {/* Notification List */}
              <div
                className={`${selectedNotification ? "w-2/5" : "w-full"} border-${language === "ar" ? "l" : "r"} overflow-auto`}
              >
                {/* Notification List Header */}
                <div className="p-4 border-b flex justify-between items-center bg-card">
                  <h2 className="font-medium flex items-center gap-2">
                    {t("notifications")}
                    {notificationFilter !== "all" && (
                      <Badge variant="outline">
                        {notificationFilter === "task"
                          ? t("taskNotifications")
                          : notificationFilter === "workflow"
                            ? t("workflowNotifications")
                            : notificationFilter === "overdue"
                              ? t("overdueTasks")
                              : t("actionRequiredFilter")}
                      </Badge>
                    )}
                  </h2>
                </div>

                {/* Notification List */}
                <div className="divide-y">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      {t("noMessages") || "No notifications found"}
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer ${selectedNotification?.id === notification.id ? "bg-muted" : ""} ${!notification.isRead ? "border-l-4 border-blue-500" : ""}`}
                        onClick={() => setSelectedNotification(notification)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {getNotificationIcon(notification)}
                            <span className="font-medium">
                              {notification.title}
                            </span>
                            {notification.actionRequired && (
                              <Badge variant="destructive" className="text-xs">
                                {t("actionRequired") || "Action Required"}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(notification.date)}
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {notification.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Notification Detail */}
              {selectedNotification && (
                <div className="w-3/5 overflow-auto bg-background p-6 border-l">
                  <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        {getNotificationIcon(selectedNotification)}
                        <h1 className="text-2xl font-bold">
                          {selectedNotification.title}
                        </h1>
                      </div>

                      <div className="flex justify-between items-start mb-4">
                        <div>
                          {selectedNotification.sender && (
                            <p className="font-medium">
                              {selectedNotification.sender}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {new Date(selectedNotification.date).toLocaleString(
                              language === "ar" ? "ar-EG" : "en-US",
                            )}
                          </p>
                        </div>
                        {selectedNotification.actionRequired && (
                          <Badge variant="destructive">
                            {t("actionRequired") || "Action Required"}
                          </Badge>
                        )}
                      </div>

                      <Separator className="my-4" />
                    </div>

                    <div className="max-w-none text-foreground">
                      <p className="text-lg mb-6">
                        {selectedNotification.content}
                      </p>

                      {selectedNotification.actionRequired && (
                        <div className="mt-6">
                          <Button className="mr-2">
                            {t("viewDetails") || "View Details"}
                          </Button>
                          <Button variant="outline">
                            {t("markAsRead") || "Mark as Read"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Email List and Content */
            <div className="flex flex-1 overflow-hidden">
              {/* Email List */}
              <div
                className={`${selectedMessage ? "w-2/5" : "w-full"} border-${language === "ar" ? "l" : "r"} overflow-auto`}
              >
                {/* Email List Header */}
                <div className="p-4 border-b flex justify-between items-center bg-card">
                  <h2 className="font-medium flex items-center gap-2">
                    {t(selectedFolder)}
                    {selectedDepartment && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
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
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
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
                          : priorities.find((p) => p.id === selectedPriority)
                              ?.name}
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
                        className={`p-4 hover:bg-muted/50 cursor-pointer ${selectedMessage?.id === message.id ? "bg-muted" : ""} border border-transparent`}
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
                <div className="w-3/5 overflow-auto bg-background p-6 border-l">
                  <div className="max-w-3xl mx-auto">
                    {/* Email Header */}
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold mb-4">
                        {selectedMessage.subject}
                      </h1>

                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-medium">
                            {selectedMessage.sender}
                          </p>
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
                            {t("attachedDocument")}:{" "}
                            {selectedMessage.documentName}
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
