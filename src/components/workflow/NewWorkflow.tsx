import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FileText, Paperclip, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";

interface NewWorkflowProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialDocument?: {
    name: string;
    content: any;
  };
}

export function NewWorkflow({
  open,
  onOpenChange,
  initialDocument,
}: NewWorkflowProps) {
  const [attachedDocument, setAttachedDocument] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleDocumentAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedDocument(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenChange) {
      onOpenChange(false);
    }
    navigate("/workflow");
  };

  const DialogWrapper = ({ children }: { children: React.ReactNode }) => {
    if (open !== undefined && onOpenChange) {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Workflow</DialogTitle>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      );
    }
    return <Card className="p-6">{children}</Card>;
  };

  return (
    <DialogWrapper>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Workflow Name</Label>
          <Input
            id="name"
            placeholder="Enter workflow name"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter workflow description"
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Workflow Type</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select workflow type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="document-review">Document Review</SelectItem>
              <SelectItem value="approval">Approval Process</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
              <SelectItem value="custom">Custom Workflow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Document Attachment</Label>
          {initialDocument ? (
            <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">
                  {initialDocument.name}
                </span>
              </div>
            </div>
          ) : attachedDocument ? (
            <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">
                  {attachedDocument.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setAttachedDocument(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md">
              <div className="text-center">
                <Paperclip className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                <label
                  htmlFor="document-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                >
                  <span>Attach Document</span>
                  <input
                    id="document-upload"
                    name="document-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentAttach}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignee">Initial Assignee</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="bob">Bob Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end space-x-2">
          {onOpenChange && (
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">Create Workflow</Button>
        </div>
      </form>
    </DialogWrapper>
  );
}
