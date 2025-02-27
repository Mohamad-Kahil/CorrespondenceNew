import React, { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { WorkflowDetailDialog } from "./WorkflowDetailDialog";

type Workflow = {
  id: string;
  name: string;
  status: "active" | "completed" | "paused";
  progress: number;
  startDate: string;
  owner: string;
  description?: string;
  steps?: {
    name: string;
    status: "completed" | "in_progress" | "pending";
    assignee?: string;
  }[];
};

interface WorkflowListProps {
  workflows: Workflow[];
}

export function WorkflowList({ workflows = [] }: WorkflowListProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(
    null,
  );

  // Convert saved workflow designs to display format
  const displayWorkflows = workflows.map((workflow) => ({
    id: workflow.id,
    name: workflow.name,
    status: "active" as const,
    progress: 0,
    startDate: new Date().toISOString().split("T")[0],
    owner: "Current User",
    description: workflow.description,
    steps: [],
  }));

  return (
    <>
      <div className="space-y-4">
        {displayWorkflows.map((workflow) => (
          <Card key={workflow.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{workflow.name}</h3>
                    <Badge
                      variant={
                        workflow.status === "completed"
                          ? "default"
                          : workflow.status === "paused"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {workflow.status.charAt(0).toUpperCase() +
                        workflow.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Started: {workflow.startDate} • Owner: {workflow.owner}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  View Details
                </Button>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{workflow.progress}%</span>
                </div>
                <Progress value={workflow.progress} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <WorkflowDetailDialog
        workflow={selectedWorkflow}
        open={selectedWorkflow !== null}
        onOpenChange={(open) => !open && setSelectedWorkflow(null)}
      />
    </>
  );
}
