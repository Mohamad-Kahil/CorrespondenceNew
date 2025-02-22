import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  FileText,
  Download,
} from "lucide-react";

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

interface TaskDetailDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
}: TaskDetailDialogProps) {
  const { t } = useLanguage();

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {task.title}
            <span
              className={`text-sm font-medium ${getActionColor(task.actionType)}`}
            >
              {t(task.actionType)}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge
              variant={
                task.status === "completed"
                  ? "default"
                  : task.status === "overdue"
                    ? "destructive"
                    : "secondary"
              }
            >
              {task.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
              {task.status === "completed" && (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              {task.status === "overdue" && (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {t(task.status)}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {t(task.priority)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t("assignee")}:</span>
              <span>{task.assignee}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t("dueDate")}:</span>
              <span>{task.dueDate}</span>
            </div>
          </div>

          {task.document && (
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {task.document.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {task.document.type} - {task.document.size}
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

          <Separator />

          <div className="space-y-2">
            <h3 className="font-medium">{t("description")}</h3>
            <p className="text-sm text-muted-foreground">
              {task.description || t("noDescription")}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">{t("comments")}</h3>
            {task.comments?.map((comment, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            )) || (
              <p className="text-sm text-muted-foreground">{t("noComments")}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("close")}
            </Button>
            <Button>{t("updateStatus")}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
