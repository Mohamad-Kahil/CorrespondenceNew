import React from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

interface AssessTaskComponentProps {
  taskId?: string;
  onSubmit?: (assessment: { rating: string; notes: string }) => void;
}

export const AssessTaskComponent = ({
  taskId = "task-1",
  onSubmit = () => {},
}: AssessTaskComponentProps) => {
  const [rating, setRating] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, notes });
  };

  return (
    <Card className="p-4 bg-card border border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Assessment Rating</Label>
          <RadioGroup
            value={rating}
            onValueChange={setRating}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="approve" id="approve" />
              <Label htmlFor="approve" className="font-normal">
                Approve
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="approve-with-changes"
                id="approve-with-changes"
              />
              <Label htmlFor="approve-with-changes" className="font-normal">
                Approve with Changes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reject" id="reject" />
              <Label htmlFor="reject" className="font-normal">
                Reject
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Assessment Notes</Label>
          <Textarea
            id="notes"
            placeholder="Enter your assessment notes here..."
            className="min-h-[120px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!rating}>
            Submit Assessment
          </Button>
        </div>
      </form>
    </Card>
  );
};
