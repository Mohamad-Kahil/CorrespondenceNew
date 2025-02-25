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
  assignee2?: string;
  escalateTo?: string;
  dueDate?: string;
  description?: string;
  predecessors: string[];
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
  const [workflow, setWorkflow] = useState<WorkflowDesign>(() => {
    const startTask: Task = {
      id: "task-1",
      title: "Start",
      type: "start",
      predecessors: [],
      position: { row: 0, col: 2 },
    };
    return {
      id: "new",
      name: "",
      description: "",
      tasks: [startTask],
      startTaskId: startTask.id,
    };
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
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
    const isFirstTask = workflow.tasks.length === 0;
    const newTask: Task = {
      id: `task-${workflow.tasks.length + 1}`,
      title: isFirstTask ? "Start" : `Task ${workflow.tasks.length + 1}`,
      type: isFirstTask ? "start" : "assess",
      predecessors: [],
      position: getNextAvailablePosition(),
      escalateTo: "manager", // Set default escalateTo value
    };
    setWorkflow((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
      startTaskId: isFirstTask ? newTask.id : prev.startTaskId,
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
      tasks: prev.tasks
        .filter((t) => t.id !== taskId)
        .map((t) => ({
          ...t,
          predecessors: t.predecessors.filter((p) => p !== taskId),
        })),
    }));
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
        <div className="relative">
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{
              width: "100%",
              height: `${gridRows * 120}px`,
              zIndex: 10,
            }}
          >
            {workflow.tasks.map((task) =>
              task.predecessors.map((predId) => {
                const predTask = workflow.tasks.find((t) => t.id === predId);
                if (!predTask) return null;

                // Calculate grid cell size
                const cellWidth =
                  document.querySelector(".grid")?.getBoundingClientRect()
                    .width / 5 || 200;
                const cellHeight = 120;
                const taskWidth = cellWidth * 0.8; // 80% of cell width
                const taskHeight = 80; // Fixed task height

                // Calculate center points
                const startCenterX = (predTask.position.col + 0.5) * cellWidth;
                const startCenterY = predTask.position.row * cellHeight + 60;
                const endCenterX = (task.position.col + 0.5) * cellWidth;
                const endCenterY = task.position.row * cellHeight + 60;

                // Calculate task box boundaries
                const startLeft = startCenterX - taskWidth / 2;
                const startRight = startCenterX + taskWidth / 2;
                const startTop = startCenterY - taskHeight / 2;
                const startBottom = startCenterY + taskHeight / 2;

                const endLeft = endCenterX - taskWidth / 2;
                const endRight = endCenterX + taskWidth / 2;
                const endTop = endCenterY - taskHeight / 2;
                const endBottom = endCenterY + taskHeight / 2;

                // Determine start and end points based on relative positions
                let startX, startY, endX, endY;

                // Determine start point (from predecessor)
                if (predTask.position.row < task.position.row) {
                  // If predecessor is above, start from bottom
                  startX = startCenterX;
                  startY = startBottom;
                } else if (predTask.position.row > task.position.row) {
                  // If predecessor is below, start from top
                  startX = startCenterX;
                  startY = startTop;
                } else {
                  // If on same row, start from left or right
                  if (predTask.position.col < task.position.col) {
                    startX = startRight;
                    startY = startCenterY;
                  } else {
                    startX = startLeft;
                    startY = startCenterY;
                  }
                }

                // Determine end point (to current task)
                if (predTask.position.row < task.position.row) {
                  // If predecessor is above, end at top
                  endX = endCenterX;
                  endY = endTop;
                } else if (predTask.position.row > task.position.row) {
                  // If predecessor is below, end at bottom
                  endX = endCenterX;
                  endY = endBottom;
                } else {
                  // If on same row, end at left or right
                  if (predTask.position.col < task.position.col) {
                    endX = endLeft;
                    endY = endCenterY;
                  } else {
                    endX = endRight;
                    endY = endCenterY;
                  }
                }

                // Calculate control points
                const midY = (startY + endY) / 2;

                return (
                  <path
                    key={`${predId}-${task.id}`}
                    d={`M ${startX} ${startY} C ${startX} ${midY} ${endX} ${midY} ${endX} ${endY}`}
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    fill="none"
                  />
                );
              }),
            )}
          </svg>

          <div
            className="grid grid-cols-5 relative"
            style={{ minHeight: `${gridRows * 120}px` }}
          >
            {Array.from({ length: gridRows }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className={cn(
                    "h-[120px]",
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
                          "p-3 rounded-lg border-[#0ea5e9] border shadow-sm bg-background transition-all w-4/5 mx-auto mt-5",
                          "hover:shadow-md hover:border-primary/50 cursor-move h-[80px] overflow-hidden",
                        )}
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
                            {task.type !== "start" && (
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
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null,
                  )}
                </div>
              )),
            )}
          </div>
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
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {/* First Row */}
                <div>
                  <Label>{t("taskType")}</Label>
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
                      {selectedTask.type === "start" ? (
                        <SelectItem value="start">{t("start")}</SelectItem>
                      ) : (
                        <>
                          <SelectItem value="comment">
                            {t("comment")}
                          </SelectItem>
                          <SelectItem value="report">{t("report")}</SelectItem>
                          <SelectItem value="assess">{t("assess")}</SelectItem>
                          <SelectItem value="decision">
                            {t("decision")}
                          </SelectItem>
                          <SelectItem value="generate_reply">
                            {t("generateReply")}
                          </SelectItem>
                          <SelectItem value="deliver">
                            {t("deliver")}
                          </SelectItem>
                          <SelectItem value="terminate">
                            {t("terminate")}
                          </SelectItem>
                          <SelectItem value="escalate">
                            {t("escalate")}
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label>{t("taskTitle")}</Label>
                  <Input
                    value={selectedTask.title}
                    onChange={(e) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, title: e.target.value } : null,
                      )
                    }
                  />
                </div>

                {/* Second Row */}
                <div className="space-y-2">
                  <Label>{t("assignee")} 1</Label>
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
                  <Label>{t("assignee")} 2</Label>
                  <Select
                    value={selectedTask.assignee2 || ""}
                    onValueChange={(value) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, assignee2: value } : null,
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
                  <Label>Escalate To</Label>
                  <Select
                    value={selectedTask.escalateTo || "manager"}
                    onValueChange={(value) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, escalateTo: value } : null,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="manager1">Manager 1</SelectItem>
                      <SelectItem value="manager2">Manager 2</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="director">Director</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedTask.type !== "start" && (
                  <div className="space-y-2">
                    <Label>{t("predecessors")}</Label>
                    <Select
                      value={selectedTask.predecessors[0] || ""}
                      onValueChange={(value) => {
                        setSelectedTask((prev) =>
                          prev ? { ...prev, predecessors: [value] } : null,
                        );
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select predecessor task" />
                      </SelectTrigger>
                      <SelectContent>
                        {workflow.tasks
                          .filter((t) => t.id !== selectedTask.id)
                          .map((task) => (
                            <SelectItem key={task.id} value={task.id}>
                              Task {task.id.split("-")[1]}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>{t("dueDate")}</Label>
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
                  <Label>{t("description")}</Label>
                  <Textarea
                    value={selectedTask.description || ""}
                    onChange={(e) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, description: e.target.value } : null,
                      )
                    }
                  />
                </div>
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
