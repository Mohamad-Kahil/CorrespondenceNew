import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ReportTaskComponentProps {
  value: {
    comment: string;
    attachments: string[];
  };
  onChange: (value: { comment: string; attachments: string[] }) => void;
}

export function ReportTaskComponent({
  value,
  onChange,
}: ReportTaskComponentProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Report Details</Label>
        <Textarea
          value={value.comment}
          onChange={(e) => onChange({ ...value, comment: e.target.value })}
          placeholder="Enter report details..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
