export type Workflow = {
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
