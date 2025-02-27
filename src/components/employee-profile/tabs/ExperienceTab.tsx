import React from "react";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";

interface ExperienceTabProps {
  employee: any;
}

export function ExperienceTab({ employee }: ExperienceTabProps) {
  const { experience } = employee;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Experience</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Current Position
            </h4>
            <p>{experience.currentPosition}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Department
            </h4>
            <p>{experience.department}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Hire Date
            </h4>
            <p>{experience.hireDate}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Employment Type
            </h4>
            <p>{experience.employmentType}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Manager
            </h4>
            <p>{experience.manager || "None (Top Level)"}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Previous Experience
          </h4>
          <div className="space-y-4">
            {experience.previousExperience.map((exp: any, index: number) => (
              <div key={index} className="bg-muted/50 p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <h5 className="font-medium">{exp.title}</h5>
                  <p className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <p className="text-sm font-medium mt-1">{exp.company}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {exp.duties}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
