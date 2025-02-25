import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssessTaskComponentProps {
  value: {
    understanding: string;
    reasonings: string[];
    conclusion: string;
    decision: "approve" | "reject" | "reconsider";
  };
  onChange: (value: {
    understanding: string;
    reasonings: string[];
    conclusion: string;
    decision: "approve" | "reject" | "reconsider";
  }) => void;
}

export function AssessTaskComponent({
  value,
  onChange,
}: AssessTaskComponentProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Understanding</Label>
        <Textarea
          value={value.understanding}
          onChange={(e) =>
            onChange({ ...value, understanding: e.target.value })
          }
          placeholder="Describe your understanding..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Conclusion</Label>
        <Textarea
          value={value.conclusion}
          onChange={(e) => onChange({ ...value, conclusion: e.target.value })}
          placeholder="Enter your conclusion..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Decision</Label>
        <Select
          value={value.decision}
          onValueChange={(decision: "approve" | "reject" | "reconsider") =>
            onChange({ ...value, decision })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select decision" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approve">Approve</SelectItem>
            <SelectItem value="reject">Reject</SelectItem>
            <SelectItem value="reconsider">Needs Reconsideration</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
