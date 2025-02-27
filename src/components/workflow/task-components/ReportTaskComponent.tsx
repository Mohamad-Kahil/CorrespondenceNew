import React from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface ReportTaskComponentProps {
  taskId?: string;
  onSubmit?: (report: { title: string; type: string; content: string }) => void;
}

export const ReportTaskComponent = ({
  taskId = "task-1",
  onSubmit = () => {},
}: ReportTaskComponentProps) => {
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, type, content });
  };

  return (
    <Card className="p-4 bg-card border border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Report Title</Label>
          <Input
            id="title"
            placeholder="Enter report title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Report Type</Label>
          <Select value={type} onValueChange={setType} required>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status Report</SelectItem>
              <SelectItem value="incident">Incident Report</SelectItem>
              <SelectItem value="summary">Summary Report</SelectItem>
              <SelectItem value="analysis">Analysis Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Report Content</Label>
          <Textarea
            id="content"
            placeholder="Enter report content here..."
            className="min-h-[200px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!title || !type || !content}>
            Submit Report
          </Button>
        </div>
      </form>
    </Card>
  );
};
