import React, { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { TaskDetailDialog } from "./TaskDetailDialog";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

type ActionType = "review" | "approve" | "comment" | "process";

type Task = {
  id: string;
  title: string;
  status: "pending" | "completed" | "overdue";
  dueDate: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  actionType: ActionType;
  description?: string;
  comments?: { author: string; text: string; date: string }[];
  document?: {
    name: string;
    size: string;
    type: string;
    url: string;
  };
};

const getActionColor = (action: ActionType): string => {
  switch (action) {
    case "review":
      return "text-blue-500";
    case "approve":
      return "text-green-500";
    case "comment":
      return "text-yellow-500";
    case "process":
      return "text-purple-500";
    default:
      return "text-gray-500";
  }
};

const tasks: Task[] = [
  {
    id: "1",
    title: "Review Document #123",
    status: "pending",
    dueDate: "2024-03-25",
    assignee: "John Doe",
    priority: "high",
    actionType: "review",
    description:
      "Please review the attached document for accuracy and completeness.",
    document: {
      name: "Contract-2024-001.pdf",
      size: "2.4 MB",
      type: "PDF Document",
      url: "#",
    },
    comments: [
      {
        author: "Jane Smith",
        text: "I've added some initial comments in section 2.",
        date: "2024-03-20",
      },
      {
        author: "John Doe",
        text: "Will review this afternoon.",
        date: "2024-03-21",
      },
    ],
  },
  {
    id: "2",
    title: "Approve Contract Draft",
    status: "completed",
    dueDate: "2024-03-20",
    assignee: "Jane Smith",
    priority: "medium",
    actionType: "approve",
    description: "Final review and approval needed for the contract draft.",
    document: {
      name: "Contract-Draft-V2.docx",
      size: "1.8 MB",
      type: "Word Document",
      url: "#",
    },
    comments: [
      {
        author: "Jane Smith",
        text: "Approved with minor changes.",
        date: "2024-03-19",
      },
    ],
  },
];

export function TaskList() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { t, language } = useLanguage();

  return (
    <>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <Badge
                    variant={
                      task.status === "completed"
                        ? "default"
                        : task.status === "overdue"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {task.status === "pending" && (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {task.status === "completed" && (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    {task.status === "overdue" && (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                  <span
                    className={`font-medium ${getActionColor(task.actionType)}`}
                  >
                    {task.actionType.charAt(0).toUpperCase() +
                      task.actionType.slice(1)}{" "}
                    Needed
                  </span>
                  <Badge variant="outline" className="capitalize">
                    {task.priority}
                  </Badge>
                  {task.document && (
                    <Badge variant="outline" className="gap-1">
                      <FileText className="w-3 h-3" />
                      {task.document.type}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Due: {task.dueDate} • Assigned to: {task.assignee}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTask(task)}
                className={cn("gap-2", language === "ar" && "flex-row-reverse")}
              >
                {t("viewDetails")}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <TaskDetailDialog
        task={selectedTask}
        open={selectedTask !== null}
        onOpenChange={(open) => !open && setSelectedTask(null)}
      />
    </>
  );
}
