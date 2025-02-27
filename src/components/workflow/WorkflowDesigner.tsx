import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function WorkflowDesigner() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Workflow Designer</h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <Card className="p-4">
            <h2 className="font-medium mb-4">Workflow Elements</h2>
            <div className="space-y-2">
              <div className="p-2 border rounded-md bg-muted/50 cursor-move">
                Approval Step
              </div>
              <div className="p-2 border rounded-md bg-muted/50 cursor-move">
                Review Step
              </div>
              <div className="p-2 border rounded-md bg-muted/50 cursor-move">
                Decision
              </div>
              <div className="p-2 border rounded-md bg-muted/50 cursor-move">
                Notification
              </div>
              <div className="p-2 border rounded-md bg-muted/50 cursor-move">
                Document Upload
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-3">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Design Canvas</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Undo
                </Button>
                <Button variant="outline" size="sm">
                  Redo
                </Button>
                <Button size="sm">Save Workflow</Button>
              </div>
            </div>

            <div className="h-[500px] border-2 border-dashed rounded-md p-4 bg-muted/20 flex items-center justify-center">
              <p className="text-muted-foreground">
                Drag workflow elements here to design your workflow
              </p>
            </div>
          </Card>

          <Card className="p-4 mt-4">
            <h2 className="font-medium mb-4">Workflow Properties</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workflow-name">Workflow Name</Label>
                <Input id="workflow-name" placeholder="Enter workflow name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workflow-description">Description</Label>
                <Input
                  id="workflow-description"
                  placeholder="Enter workflow description"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
