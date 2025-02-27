import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { User, Calendar, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import { Workflow } from "./types";

interface WorkflowDetailDialogProps {
  workflow: Workflow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkflowDetailDialog({
  workflow,
  open,
  onOpenChange,
}: WorkflowDetailDialogProps) {
  const { t } = useLanguage();

  if (!workflow) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{workflow.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge
              variant={
                workflow.status === "completed"
                  ? "default"
                  : workflow.status === "paused"
                    ? "secondary"
                    : "outline"
              }
            >
              {t(workflow.status)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t("owner")}:</span>
              <span>{workflow.owner}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t("startDate")}:</span>
              <span>{workflow.startDate}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t("overallProgress")}
              </span>
              <span>{workflow.progress}%</span>
            </div>
            <Progress value={workflow.progress} />
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-medium">{t("description")}</h3>
            <p className="text-sm text-muted-foreground">
              {workflow.description || t("noDescription")}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">{t("workflowSteps")}</h3>
            {workflow.steps?.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted/50 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "in_progress"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                    }`}
                  >
                    {step.status === "completed" && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                    {step.status === "in_progress" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{step.name}</p>
                    {step.assignee && (
                      <p className="text-sm text-muted-foreground">
                        {t("assignee")}: {step.assignee}
                      </p>
                    )}
                  </div>
                </div>
                <Badge
                  variant={
                    step.status === "completed"
                      ? "default"
                      : step.status === "in_progress"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {t(step.status)}
                </Badge>
              </div>
            ))}
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
