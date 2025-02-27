import React from "react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";

interface PerformanceSkillsTabProps {
  employee: any;
}

export function PerformanceSkillsTab({ employee }: PerformanceSkillsTabProps) {
  const { performanceAndSkills } = employee;

  // Function to get badge color based on performance rating
  const getRatingBadgeColor = (rating: string) => {
    if (rating.includes("Exceeds")) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    } else if (rating.includes("Meets")) {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    } else if (rating.includes("Needs")) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    } else {
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Performance & Skills</h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Performance Reviews
          </h4>
          <div className="space-y-4">
            {performanceAndSkills.performanceReviews.map(
              (review: any, index: number) => (
                <div key={index} className="bg-muted/50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">Review Date: {review.date}</h5>
                    <Badge className={getRatingBadgeColor(review.rating)}>
                      {review.rating}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {review.comments}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {performanceAndSkills.skills.map((skill: string, index: number) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Training Completed
          </h4>
          <div className="space-y-2">
            {performanceAndSkills.trainingCompleted.map(
              (training: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-muted/30 rounded-md"
                >
                  <span>{training.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {training.date}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
