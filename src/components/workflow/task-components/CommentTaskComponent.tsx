import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CommentTaskComponentProps {
  value: {
    comment: string;
  };
  onChange: (value: { comment: string }) => void;
}

export function CommentTaskComponent({
  value,
  onChange,
}: CommentTaskComponentProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Comment</Label>
        <Textarea
          value={value.comment}
          onChange={(e) => onChange({ comment: e.target.value })}
          placeholder="Enter your comment..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
