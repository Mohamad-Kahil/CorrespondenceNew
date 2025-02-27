import React from "react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";

interface AccessLevelTabProps {
  employee: any;
}

export function AccessLevelTab({ employee }: AccessLevelTabProps) {
  const { accessLevel } = employee;

  // Function to get badge color based on security clearance level
  const getSecurityBadgeColor = (level: number) => {
    switch (level) {
      case 5:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case 4:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case 3:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case 2:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case 1:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "";
    }
  };

  // Function to get badge color based on authorization level
  const getAuthBadgeColor = (level: string) => {
    switch (level) {
      case "Top Secret":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Secret":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Confidential":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Restricted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Unclassified":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Access Level</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Security Clearance
            </h4>
            <Badge
              className={getSecurityBadgeColor(accessLevel.securityClearance)}
            >
              Level {accessLevel.securityClearance}
            </Badge>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Authorization Level
            </h4>
            <Badge
              className={getAuthBadgeColor(accessLevel.authorizationLevel)}
            >
              {accessLevel.authorizationLevel}
            </Badge>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Last Access Review
            </h4>
            <p>{accessLevel.lastAccessReview}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            System Roles
          </h4>
          <div className="flex flex-wrap gap-2">
            {accessLevel.systemRoles.map((role: string, index: number) => (
              <Badge key={index} variant="secondary">
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
