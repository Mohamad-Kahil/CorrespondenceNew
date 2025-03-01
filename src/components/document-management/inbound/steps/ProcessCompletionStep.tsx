import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface ProcessCompletionStepProps {
  documentData: any;
  onReset: () => void;
}

export function ProcessCompletionStep({
  documentData,
  onReset,
}: ProcessCompletionStepProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-center">
          {t("inboundProcessComplete") || "The inbound process is complete!"}
        </h2>
        <p className="text-muted-foreground text-center mt-2 max-w-md">
          {t("documentStoredAt") || "Document has been stored at"}{" "}
          <span className="font-mono font-medium">
            {documentData.storageAddress}
          </span>
        </p>

        <div className="mt-8 space-y-4 w-full max-w-md">
          <h3 className="font-medium">
            {t("documentSummary") || "Document Summary"}:
          </h3>
          <div className="bg-muted/50 p-4 rounded-md space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("trackingNumber") || "Tracking Number"}:
              </span>
              <span className="font-medium">{documentData.trackingNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("senderName") || "Sender's Name"}:
              </span>
              <span>{documentData.senderName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("organization") || "Organization"}:
              </span>
              <span>{documentData.organization}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("secrecyLevel") || "Secrecy Level"}:
              </span>
              <span>{documentData.secrecyLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("department") || "Department"}:
              </span>
              <span>{documentData.department}</span>
            </div>
          </div>
        </div>

        <Button onClick={onReset} className="mt-8">
          {t("processNewDocument") || "Process New Document"}
        </Button>
      </div>
    </div>
  );
}
