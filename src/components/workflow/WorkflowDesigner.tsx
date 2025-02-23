import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Plus, Save, Settings2, Link2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface GridPosition {
  row: number;
  col: number;
}

interface Task {
  id: string;
  title: string;
  type:
    | "start"
    | "comment"
    | "report"
    | "assess"
    | "decision"
    | "generate_reply"
    | "deliver"
    | "terminate"
    | "escalate";
  assignee?: string;
  dueDate?: string;
  description?: string;
  nextTasks: string[];
  position: GridPosition;
}

interface WorkflowDesign {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  startTaskId?: string;
}

export function WorkflowDesigner() {
  const { t } = useLanguage();
  const [workflow, setWorkflow] = useState<WorkflowDesign>({
    id: "new",
    name: "",
    description: "",
    tasks: [],
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingTask, setConnectingTask] = useState<Task | null>(null);
  const [gridRows, setGridRows] = useState(4);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const getNextAvailablePosition = (): GridPosition => {
    const occupiedPositions = workflow.tasks.map((t) => t.position);
    const middleCol = 2; // Middle column (0-based index)

    // Find the first empty position in the middle column
    let row = 0;
    while (
      occupiedPositions.some((p) => p.row === row && p.col === middleCol)
    ) {
      row++;
    }

    // If we're using the third-to-last row, add another row
    if (row >= gridRows - 2) {
      setGridRows((prev) => prev + 1);
    }

    return { row, col: middleCol };
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: `task-${workflow.tasks.length + 1}`,
      title: `Task ${workflow.tasks.length + 1}`,
      type: "start",
      nextTasks: [],
      position: getNextAvailablePosition(),
    };
    setWorkflow((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
    setSelectedTask(newTask);
    setIsTaskDialogOpen(true);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setWorkflow((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    }));
    setIsTaskDialogOpen(false);
  };

  const handleTaskDelete = (taskId: string) => {
    setWorkflow((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== taskId),
    }));
  };

  const handleConnect = (task: Task) => {
    if (!isConnecting) {
      setIsConnecting(true);
      setConnectingTask(task);
    } else if (connectingTask && connectingTask.id !== task.id) {
      setWorkflow((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === connectingTask.id
            ? { ...t, nextTasks: [...t.nextTasks, task.id] }
            : t,
        ),
      }));
      setIsConnecting(false);
      setConnectingTask(null);
    }
  };

  const handleSave = () => {
    console.log("Saving workflow:", workflow);
  };

  return (
    <div className="p-6 space-y-6">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {t("workflowDesigner")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("workflowDesignerDesc")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsConnecting(!isConnecting)}
              className={cn(
                "gap-2",
                isConnecting && "bg-primary/10 text-primary",
              )}
            >
              <Link2 className="h-4 w-4" />
              {isConnecting ? t("connecting") : t("connect")}
            </Button>
            <Button onClick={handleAddTask} className="gap-2">
              <Plus className="h-4 w-4" />
              {t("addTask")}
            </Button>
            <Button onClick={handleSave} variant="default" className="gap-2">
              <Save className="h-4 w-4" />
              {t("saveWorkflow")}
            </Button>
          </div>
        </div>
      </header>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">{t("workflowName")}</Label>
              <Input
                value={workflow.name}
                onChange={(e) =>
                  setWorkflow((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={t("enterWorkflowName")}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">
                {t("workflowDescription")}
              </Label>
              <Textarea
                value={workflow.description}
                onChange={(e) =>
                  setWorkflow((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder={t("enterWorkflowDescription")}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="grid grid-cols-5 gap-4" style={{ minHeight: "600px" }}>
          {Array.from({ length: gridRows }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className={cn(
                  "h-24 border border-dashed border-border/50 rounded-lg",
                  "transition-all duration-200",
                  draggedTask && "hover:border-primary hover:border-solid",
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add(
                    "border-primary",
                    "border-solid",
                  );
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove(
                    "border-primary",
                    "border-solid",
                  );
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggedTask) {
                    const updatedTask = {
                      ...draggedTask,
                      position: { row, col },
                    };
                    handleTaskUpdate(updatedTask);
                    setDraggedTask(null);
                  }
                }}
              >
                {workflow.tasks.map((task) =>
                  task.position.row === row && task.position.col === col ? (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => setDraggedTask(task)}
                      onDragEnd={() => setDraggedTask(null)}
                      className={cn(
                        "p-4 rounded-lg border shadow-sm bg-card transition-all w-4/5 mx-auto",
                        "hover:shadow-md hover:border-primary/50 cursor-move",
                        isConnecting &&
                          !connectingTask &&
                          "cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-background hover:ring-offset-2",
                        isConnecting &&
                          connectingTask?.id !== task.id &&
                          "cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-background hover:ring-offset-2",
                        connectingTask?.id === task.id &&
                          "ring-2 ring-primary ring-offset-background ring-offset-2",
                      )}
                      onClick={() => isConnecting && handleConnect(task)}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-medium text-foreground">
                            {task.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(task.type)}
                            {task.assignee && ` • ${task.assignee}`}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTask(task);
                              setIsTaskDialogOpen(true);
                            }}
                          >
                            <Settings2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskDelete(task.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            )),
          )}
        </div>
      </Card>

      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {selectedTask ? t("editTask") : t("newTask")}
            </DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">{t("taskTitle")}</Label>
                <Input
                  value={selectedTask.title}
                  onChange={(e) =>
                    setSelectedTask((prev) =>
                      prev ? { ...prev, title: e.target.value } : null,
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">{t("taskType")}</Label>
                <Select
                  value={selectedTask.type}
                  onValueChange={(value: Task["type"]) =>
                    setSelectedTask((prev) =>
                      prev ? { ...prev, type: value } : null,
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">{t("start")}</SelectItem>
                    <SelectItem value="comment">{t("comment")}</SelectItem>
                    <SelectItem value="report">{t("report")}</SelectItem>
                    <SelectItem value="assess">{t("assess")}</SelectItem>
                    <SelectItem value="decision">{t("decision")}</SelectItem>
                    <SelectItem value="generate_reply">
                      {t("generateReply")}
                    </SelectItem>
                    <SelectItem value="deliver">{t("deliver")}</SelectItem>
                    <SelectItem value="terminate">{t("terminate")}</SelectItem>
                    <SelectItem value="escalate">{t("escalate")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">{t("assignee")}</Label>
                <Select
                  value={selectedTask.assignee || ""}
                  onValueChange={(value) =>
                    setSelectedTask((prev) =>
                      prev ? { ...prev, assignee: value } : null,
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectAssignee")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">{t("user")} 1</SelectItem>
                    <SelectItem value="user2">{t("user")} 2</SelectItem>
                    <SelectItem value="user3">{t("user")} 3</SelectItem>
                    <SelectItem value="user4">{t("user")} 4</SelectItem>
                    <SelectItem value="user5">{t("user")} 5</SelectItem>
                    <SelectItem value="manager">{t("manager")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">{t("dueDate")}</Label>
                <Input
                  type="date"
                  value={selectedTask.dueDate || ""}
                  onChange={(e) =>
                    setSelectedTask((prev) =>
                      prev ? { ...prev, dueDate: e.target.value } : null,
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">{t("description")}</Label>
                <Textarea
                  value={selectedTask.description || ""}
                  onChange={(e) =>
                    setSelectedTask((prev) =>
                      prev ? { ...prev, description: e.target.value } : null,
                    )
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsTaskDialogOpen(false)}
                >
                  {t("cancel")}
                </Button>
                <Button
                  onClick={() => selectedTask && handleTaskUpdate(selectedTask)}
                >
                  {t("save")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
