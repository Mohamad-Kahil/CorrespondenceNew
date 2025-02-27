import React from "react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";

interface EducationTabProps {
  employee: any;
}

export function EducationTab({ employee }: EducationTabProps) {
  const { education } = employee;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Education</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Highest Degree
            </h4>
            <p>{education.highestDegree}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Institution
            </h4>
            <p>{education.institution}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Graduation Year
            </h4>
            <p>{education.graduationYear}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Major/Field of Study
            </h4>
            <p>{education.major}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Additional Certifications
          </h4>
          <div className="space-y-4">
            {education.additionalCertifications.map(
              (cert: any, index: number) => (
                <div key={index} className="bg-muted/50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">{cert.name}</h5>
                    <Badge variant="outline">{cert.year}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Issuer: {cert.issuer}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
