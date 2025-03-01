import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DocumentReceptionStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function DocumentReceptionStep({
  documentData,
  updateDocumentData,
  onNext,
}: DocumentReceptionStepProps) {
  const { t } = useLanguage();
  const [senderName, setSenderName] = useState(documentData.senderName || "");
  const [organization, setOrganization] = useState(
    documentData.organization || "",
  );
  const [dateReceived, setDateReceived] = useState(
    documentData.dateReceived || new Date().toISOString().split("T")[0],
  );
  const [externalTrackingNumber, setExternalTrackingNumber] = useState(
    documentData.externalTrackingNumber || "",
  );
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!senderName || !organization || !dateReceived) {
      setError(t("fillRequiredFields") || "Please fill all required fields");
      return;
    }

    updateDocumentData({
      senderName,
      organization,
      dateReceived,
      externalTrackingNumber,
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("documentReception") || "Document Reception"}
      </h2>

      <p className="text-muted-foreground">
        {t("documentReceptionInstructions") ||
          "Please enter the details of the received document: sender's name, organization, date received, and any external tracking numbers."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="trackingNumber" className="text-muted-foreground">
            {t("inboundTrackingNumber") || "Inbound Tracking Number"}
          </Label>
          <Input
            id="trackingNumber"
            value={documentData.trackingNumber}
            disabled
            className="bg-muted/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="senderName" className="flex items-center">
            {t("senderName") || "Sender's Name"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="senderName"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder={t("enterSenderName") || "Enter sender's name"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization" className="flex items-center">
            {t("organization") || "Organization"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder={t("enterOrganization") || "Enter organization"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateReceived" className="flex items-center">
            {t("dateReceived") || "Date Received"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="dateReceived"
            type="date"
            value={dateReceived}
            onChange={(e) => setDateReceived(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="externalTrackingNumber">
            {t("externalTrackingNumber") || "External Tracking Number"}
          </Label>
          <Input
            id="externalTrackingNumber"
            value={externalTrackingNumber}
            onChange={(e) => setExternalTrackingNumber(e.target.value)}
            placeholder={
              t("enterExternalTrackingNumber") ||
              "Enter external tracking number (if any)"
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>{t("continue") || "Continue"}</Button>
      </div>
    </div>
  );
}
