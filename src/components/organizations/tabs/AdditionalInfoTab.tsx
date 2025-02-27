import React from "react";
import { Card } from "../../ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AdditionalInfoTabProps {
  additionalInfo: any;
}

export function AdditionalInfoTab({ additionalInfo }: AdditionalInfoTabProps) {
  const { t } = useLanguage();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("additionalInformation") || "Additional Information"}
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("preferredLanguage") || "Preferred Language"}
          </h4>
          <p>{additionalInfo.preferredLanguage}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("timeZone") || "Time Zone"}
          </h4>
          <p>{additionalInfo.timeZone}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("businessHours") || "Business Hours"}
          </h4>
          <p>{additionalInfo.businessHours}</p>
        </div>

        <div className="col-span-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("notes") || "Notes"}
          </h4>
          <p className="mt-1 p-3 bg-muted/30 rounded-md">
            {additionalInfo.notes}
          </p>
        </div>
      </div>
    </Card>
  );
}
