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

const workflows: Workflow[] = [
  {
    id: "1",
    name: "Document Review Process",
    status: "active",
    progress: 65,
    startDate: "2024-03-15",
    owner: "John Doe",
    description: "Standard document review workflow for legal documents.",
    steps: [
      {
        name: "Initial Review",
        status: "completed",
        assignee: "Jane Smith",
      },
      {
        name: "Legal Assessment",
        status: "in_progress",
        assignee: "John Doe",
      },
      {
        name: "Final Approval",
        status: "pending",
        assignee: "Mike Johnson",
      },
    ],
  },
  {
    id: "2",
    name: "Contract Approval",
    status: "completed",
    progress: 100,
    startDate: "2024-03-10",
    owner: "Jane Smith",
    description: "Contract approval workflow for vendor agreements.",
    steps: [
      {
        name: "Draft Review",
        status: "completed",
        assignee: "John Doe",
      },
      {
        name: "Legal Review",
        status: "completed",
        assignee: "Sarah Wilson",
      },
      {
        name: "Executive Approval",
        status: "completed",
        assignee: "Mike Johnson",
      },
    ],
  },
];

export function WorkflowList() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(
    null,
  );

  return (
    <>
      <div className="space-y-4">
        {workflows.map((workflow) => (
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
