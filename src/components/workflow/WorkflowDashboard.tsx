import React from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, Activity, Clock, CheckCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { TaskList } from "./TaskList";
import { WorkflowList } from "./WorkflowList";
import { NewWorkflow } from "./NewWorkflow";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const getStats = (t: (key: string) => string) => [
  {
    label: t("activeWorkflows"),
    value: "12",
    icon: Activity,
    change: `+2 ${t("fromLastWeek")}`,
    color: "text-blue-500",
  },
  {
    label: t("pendingTasks"),
    value: "28",
    icon: Clock,
    change: `-5 ${t("fromLastWeek")}`,
    color: "text-yellow-500",
  },
  {
    label: t("completedTasks"),
    value: "145",
    icon: CheckCircle,
    change: `+18 ${t("thisMonth")}`,
    color: "text-green-500",
  },
];

export function WorkflowDashboard() {
  const { t, language } = useLanguage();
  return (
    <div className="p-6 space-y-6">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">
          {t("documentWorkflowSystem")}
        </h1>
        <p className="text-muted-foreground mt-2">{t("workflowDescription")}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getStats(t).map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold mt-2 text-foreground">
                  {stat.value}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </div>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <Progress value={65} className="mt-4" />
          </Card>
        ))}
      </div>

      <Tabs
        defaultValue="tasks"
        className="space-y-4"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <TabsList className="flex">
          <TabsTrigger value="tasks">
            {language === "ar" ? "المهام" : "Tasks"}
          </TabsTrigger>
          <TabsTrigger value="workflows">
            {language === "ar" ? "سير العمل" : "Workflows"}
          </TabsTrigger>
          <TabsTrigger value="new">
            {language === "ar" ? "سير عمل جديد" : "New Workflow"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="space-y-4">
          <TaskList />
        </TabsContent>
        <TabsContent value="workflows" className="space-y-4">
          <WorkflowList />
        </TabsContent>
        <TabsContent value="new">
          <NewWorkflow />
        </TabsContent>
      </Tabs>
    </div>
  );
}
