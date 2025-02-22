import React from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, Activity, Clock, CheckCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { TaskList } from "./TaskList";
import { WorkflowList } from "./WorkflowList";
import { NewWorkflow } from "./NewWorkflow";

const stats = [
  {
    label: "Active Workflows",
    value: "12",
    icon: Activity,
    change: "+2 from last week",
    color: "text-blue-500",
  },
  {
    label: "Pending Tasks",
    value: "28",
    icon: Clock,
    change: "-5 from last week",
    color: "text-yellow-500",
  },
  {
    label: "Completed",
    value: "145",
    icon: CheckCircle,
    change: "+18 this month",
    color: "text-green-500",
  },
];

export function WorkflowDashboard() {
  return (
    <div className="p-6 space-y-6">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">Document Workflow System</h1>
        <p className="text-muted-foreground mt-2">
          Process and manage document workflows through our digital system
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
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

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="new">New Workflow</TabsTrigger>
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
