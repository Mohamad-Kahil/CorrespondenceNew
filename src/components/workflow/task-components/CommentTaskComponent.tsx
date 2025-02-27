import React from "react";
import { Card } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";

interface CommentTaskComponentProps {
  taskId?: string;
  initialComment?: string;
  onSubmit?: (comment: string) => void;
}

export const CommentTaskComponent = ({
  taskId = "task-1",
  initialComment = "",
  onSubmit = () => {},
}: CommentTaskComponentProps) => {
  const [comment, setComment] = React.useState(initialComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
  };

  return (
    <Card className="p-4 bg-card border border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="comment">Add Comment</Label>
          <Textarea
            id="comment"
            placeholder="Enter your comment here..."
            className="min-h-[120px] mt-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={!comment.trim()}>
            Submit Comment
          </Button>
        </div>
      </form>
    </Card>
  );
};
