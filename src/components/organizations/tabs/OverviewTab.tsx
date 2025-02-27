import React from "react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface OverviewTabProps {
  organization: any;
}

export function OverviewTab({ organization }: OverviewTabProps) {
  const { t } = useLanguage();

  // Function to get security badge color based on classification
  const getSecurityBadgeColor = (classification: string) => {
    switch (classification) {
      case "Top Secret":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Secret":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Confidential":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Restricted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("organizationOverview") || "Organization Overview"}
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("organizationId") || "Organization ID"}
          </h4>
          <p>{organization.id}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("organizationName") || "Organization Name"}
          </h4>
          <p>{organization.name}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("shortName") || "Short Name"}
          </h4>
          <p>{organization.shortName}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("organizationType") || "Organization Type"}
          </h4>
          <p>{organization.type}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("region") || "Region"}
          </h4>
          <p>{organization.region}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("parentOrganization") || "Parent Organization"}
          </h4>
          <p>{organization.parentOrganization || t("none") || "None"}</p>
        </div>

        <div className="col-span-2">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            {t("securityClassification") || "Security Classification"}
          </h4>
          <Badge
            className={getSecurityBadgeColor(
              organization.securityClassification,
            )}
          >
            {organization.securityClassification}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
