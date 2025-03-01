import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Plus, Save, Settings2, Link2, X, Upload } from "lucide-react";
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

interface TaskRecord {
  id: string;
  taskType: string;
  taskTitle: string;
  gridRow: number;
  gridColumn: number;
  department: string;
  assignee1: string;
  assignee2: string;
  escalateTo: string;
  predecessor1: string | null;
  predecessor2: string | null;
  predecessorLogic: "AND" | "OR";
  duration: number | null;
  startDate: string | null;
  edDate: string | null;
  description: string;
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
  department?: string;
  assignee?: string;
  assignee2?: string;
  escalateTo?: string;
  duration?: number;
  startDate?: string;
  dueDate?: string;
  description?: string;
  predecessors: string[];
  predecessorLogic?: "AND" | "OR";
  position: GridPosition;
}

interface WorkflowDesign {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  startTaskId?: string;
}

import workflow1Data from "@/data/workflow1.json?raw";
import workflow2Data from "@/data/workflow2.json?raw";

export function WorkflowDesigner() {
  const [taskRecords, setTaskRecords] = useState<TaskRecord[]>(() => {
    // Initialize with default start task
    const currentDate = new Date().toISOString().split("T")[0];
    return [
      {
        id: "task-1",
        taskType: "start",
        taskTitle: "Workflow Start",
        gridRow: 1,
        gridColumn: 3,
        department: "Department",
        assignee1: "Manager",
        assignee2: "",
        escalateTo: "",
        predecessor1: null,
        predecessor2: null,
        predecessorLogic: "OR",
        duration: null,
        startDate: currentDate,
        edDate: null,
        description: "This is the start of the workflow",
      },
    ];
  });
  const [showSummary, setShowSummary] = useState(false);
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
  const [gridRows, setGridRows] = useState(3);
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
    // Update task records when a task is updated
    const taskRecord: TaskRecord = {
      id: updatedTask.id,
      taskType: updatedTask.type,
      taskTitle: updatedTask.title,
      gridRow: updatedTask.position.row + 1,
      gridColumn: updatedTask.position.col + 1,
      department: updatedTask.department || "",
      assignee1: updatedTask.assignee || "",
      assignee2: updatedTask.assignee2 || "",
      escalateTo: updatedTask.escalateTo || "",
      predecessor1: updatedTask.predecessors[0] || null,
      predecessor2: updatedTask.predecessors[1] || null,
      predecessorLogic: updatedTask.predecessorLogic || "OR",
      duration: updatedTask.duration || null,
      startDate: updatedTask.startDate || null,
      edDate: updatedTask.dueDate || null,
      description: updatedTask.description || "",
    };

    setTaskRecords((prev) => {
      const index = prev.findIndex((r) => r.id === taskRecord.id);
      if (index >= 0) {
        // Update existing record
        const newRecords = [...prev];
        newRecords[index] = taskRecord;
        return newRecords;
      } else {
        // Add new record
        return [...prev, taskRecord];
      }
    });
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

  const handleLoadWorkflow = async (workflowId: string) => {
    const workflowData = JSON.parse(
      workflowId === "workflow1" ? workflow1Data : workflow2Data,
    );

    // Update workflow name and description
    setWorkflow((prev) => ({
      ...prev,
      name: workflowData.name,
      description: workflowData.description,
      tasks: workflowData.tasks.map((task) => ({
        id: task.id,
        title: task.taskTitle,
        type: task.taskType as Task["type"],
        department: task.department,
        assignee: task.assignee1,
        assignee2: task.assignee2,
        escalateTo: task.escalateTo,
        duration: task.duration,
        startDate: task.startDate,
        dueDate: task.edDate,
        description: task.description,
        predecessors: [task.predecessor1, task.predecessor2].filter(
          (p): p is string => p !== null,
        ),
        predecessorLogic: task.predecessorLogic as "AND" | "OR",
        position: {
          row: task.gridRow - 1,
          col: task.gridColumn - 1,
        },
      })),
    }));

    // Update task records
    setTaskRecords(workflowData.tasks);
  };

  const handleSave = () => {
    setShowSummary(true);
    console.log("Saving workflow:", workflow);
    console.log("Task records:", taskRecords);
  };

  return (
    <div className="p-6 space-y-6">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {t("workflowDesigner")}
            </h1>
          </div>
          <div className="flex gap-2">
            <Select onValueChange={(value) => handleLoadWorkflow(value)}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Load Workflow Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workflow1">
                  Document Approval Workflow
                </SelectItem>
                <SelectItem value="workflow2">
                  Employee Onboarding Workflow
                </SelectItem>
              </SelectContent>
            </Select>
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
                          "p-3 rounded-lg border shadow-sm transition-all w-4/5 mx-auto mt-5",
                          "hover:shadow-md cursor-move h-[80px] overflow-hidden",
                          // Task type-based background colors
                          task.type === "start" &&
                            "bg-blue-100 border-blue-300 dark:bg-blue-900/50 dark:border-blue-700",
                          task.type === "comment" &&
                            "bg-gray-100 border-gray-300 dark:bg-gray-900/50 dark:border-gray-700",
                          task.type === "report" &&
                            "bg-purple-100 border-purple-300 dark:bg-purple-900/50 dark:border-purple-700",
                          task.type === "assess" &&
                            "bg-green-100 border-green-300 dark:bg-green-900/50 dark:border-green-700",
                          task.type === "decision" &&
                            "bg-pink-100 border-pink-300 dark:bg-pink-900/50 dark:border-pink-700",
                          task.type === "generate_reply" &&
                            "bg-indigo-100 border-indigo-300 dark:bg-indigo-900/50 dark:border-indigo-700",
                          task.type === "deliver" &&
                            "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/50 dark:border-yellow-700",
                          task.type === "terminate" &&
                            "bg-red-100 border-red-300 dark:bg-red-900/50 dark:border-red-700",
                          task.type === "escalate" &&
                            "bg-orange-100 border-orange-300 dark:bg-orange-900/50 dark:border-orange-700",
                        )}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3
                              className={cn(
                                "font-medium",
                                // Task type-based text colors
                                task.type === "start" &&
                                  "text-blue-700 dark:text-blue-300",
                                task.type === "comment" &&
                                  "text-gray-700 dark:text-gray-300",
                                task.type === "report" &&
                                  "text-purple-700 dark:text-purple-300",
                                task.type === "assess" &&
                                  "text-green-700 dark:text-green-300",
                                task.type === "decision" &&
                                  "text-pink-700 dark:text-pink-300",
                                task.type === "generate_reply" &&
                                  "text-indigo-700 dark:text-indigo-300",
                                task.type === "deliver" &&
                                  "text-yellow-700 dark:text-yellow-300",
                                task.type === "terminate" &&
                                  "text-red-700 dark:text-red-300",
                                task.type === "escalate" &&
                                  "text-orange-700 dark:text-orange-300",
                              )}
                            >
                              {task.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {t(task.type)}
                              {task.assignee && ` • ${task.assignee}`}
                              {task.department && ` • ${t(task.department)}`}
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
                <div>
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
                <div>
                  <Label>{t("department")}</Label>
                  <Select
                    value={selectedTask.department || ""}
                    onValueChange={(value) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, department: value } : null,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectDepartment")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">{t("hr")}</SelectItem>
                      <SelectItem value="finance">{t("finance")}</SelectItem>
                      <SelectItem value="it">{t("it")}</SelectItem>
                      <SelectItem value="legal">{t("legal")}</SelectItem>
                      <SelectItem value="operations">
                        {t("operations")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
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

                {/* Third Row */}
                {selectedTask.type !== "start" && (
                  <>
                    <div className="space-y-2">
                      <Label>Predecessor 1</Label>
                      <Select
                        value={selectedTask.predecessors[0] || ""}
                        onValueChange={(value) => {
                          const newPreds = [
                            ...(selectedTask.predecessors || []),
                          ];
                          newPreds[0] = value;
                          setSelectedTask((prev) =>
                            prev ? { ...prev, predecessors: newPreds } : null,
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
                    <div className="space-y-2">
                      <Label>Predecessor 2</Label>
                      <Select
                        value={selectedTask.predecessors[1] || ""}
                        onValueChange={(value) => {
                          const newPreds = [
                            ...(selectedTask.predecessors || []),
                          ];
                          newPreds[1] = value;
                          setSelectedTask((prev) =>
                            prev ? { ...prev, predecessors: newPreds } : null,
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
                    <div className="space-y-2">
                      <Label>Predecessor Logic</Label>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedTask((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  predecessorLogic:
                                    prev.predecessorLogic === "AND"
                                      ? "OR"
                                      : "AND",
                                }
                              : null,
                          );
                        }}
                      >
                        {selectedTask.predecessorLogic || "AND"}
                      </Button>
                    </div>
                  </>
                )}

                {/* Fourth Row */}
                <div className="space-y-2">
                  <Label>Task Duration (days)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={selectedTask.duration || ""}
                    onChange={(e) =>
                      setSelectedTask((prev) =>
                        prev
                          ? { ...prev, duration: parseInt(e.target.value) }
                          : null,
                      )
                    }
                    placeholder="Enter days"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={selectedTask.startDate || ""}
                    onChange={(e) =>
                      setSelectedTask((prev) =>
                        prev ? { ...prev, startDate: e.target.value } : null,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>E.D. Date</Label>
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

                <div className="col-span-3 space-y-2">
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

      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-[80vw] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Workflow Tasks Summary</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 border border-border">Task Type</th>
                  <th className="p-2 border border-border">Title</th>
                  <th className="p-2 border border-border">Row</th>
                  <th className="p-2 border border-border">Column</th>
                  <th className="p-2 border border-border">Department</th>
                  <th className="p-2 border border-border">Assignee 1</th>
                  <th className="p-2 border border-border">Assignee 2</th>
                  <th className="p-2 border border-border">Escalate To</th>
                  <th className="p-2 border border-border">Predecessor 1</th>
                  <th className="p-2 border border-border">Predecessor 2</th>
                  <th className="p-2 border border-border">Logic</th>
                  <th className="p-2 border border-border">Duration</th>
                  <th className="p-2 border border-border">Start Date</th>
                  <th className="p-2 border border-border">E.D. Date</th>
                  <th className="p-2 border border-border">Description</th>
                </tr>
              </thead>
              <tbody>
                {taskRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="p-2 border border-border">
                      {record.taskType}
                    </td>
                    <td className="p-2 border border-border">
                      {record.taskTitle}
                    </td>
                    <td className="p-2 border border-border">
                      {record.gridRow}
                    </td>
                    <td className="p-2 border border-border">
                      {record.gridColumn}
                    </td>
                    <td className="p-2 border border-border">
                      {record.department}
                    </td>
                    <td className="p-2 border border-border">
                      {record.assignee1}
                    </td>
                    <td className="p-2 border border-border">
                      {record.assignee2}
                    </td>
                    <td className="p-2 border border-border">
                      {record.escalateTo}
                    </td>
                    <td className="p-2 border border-border">
                      {record.predecessor1 || "-"}
                    </td>
                    <td className="p-2 border border-border">
                      {record.predecessor2 || "-"}
                    </td>
                    <td className="p-2 border border-border">
                      {record.predecessorLogic}
                    </td>
                    <td className="p-2 border border-border">
                      {record.duration || "-"}
                    </td>
                    <td className="p-2 border border-border">
                      {record.startDate || "-"}
                    </td>
                    <td className="p-2 border border-border">
                      {record.edDate || "-"}
                    </td>
                    <td className="p-2 border border-border">
                      {record.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowSummary(false)}>{t("close")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
