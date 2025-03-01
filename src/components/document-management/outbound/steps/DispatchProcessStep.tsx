import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface DispatchProcessStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function DispatchProcessStep({
  documentData,
  updateDocumentData,
  onNext,
}: DispatchProcessStepProps) {
  const { t } = useLanguage();
  const [dispatchNotes, setDispatchNotes] = useState(
    documentData.dispatchNotes || "",
  );
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!isConfirmed) {
      setError(
        t("confirmPreparationFirst") ||
          "Please confirm that the document has been prepared for dispatch",
      );
      return;
    }

    updateDocumentData({
      dispatchNotes,
      dispatchConfirmed: isConfirmed,
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("dispatchProcess") || "Dispatch Process"}
      </h2>

      <p className="text-muted-foreground">
        {t("dispatchProcessInstructions") ||
          "Prepare the document for dispatch (e.g., place in an envelope or security bag). Select the delivery method and provide any tracking numbers if available."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium">
            {t("dispatchDetails") || "Dispatch Details"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {t("recipient") || "Recipient"}:
              </p>
              <p className="font-medium">{documentData.recipientName}</p>
              <p className="text-sm">{documentData.recipientOrganization}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t("deliveryMethod") || "Delivery Method"}:
              </p>
              <p className="font-medium">
                {t(documentData.deliveryMethod) || documentData.deliveryMethod}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("deliveryAddress") || "Delivery Address"}:
            </p>
            <p className="whitespace-pre-line">
              {documentData.deliveryAddress}
            </p>
          </div>
          {documentData.specialInstructions && (
            <div>
              <p className="text-sm text-muted-foreground">
                {t("specialInstructions") || "Special Instructions"}:
              </p>
              <p className="whitespace-pre-line">
                {documentData.specialInstructions}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dispatchNotes">
            {t("dispatchNotes") || "Dispatch Notes"}
          </Label>
          <Textarea
            id="dispatchNotes"
            value={dispatchNotes}
            onChange={(e) => setDispatchNotes(e.target.value)}
            placeholder={
              t("enterDispatchNotes") ||
              "Enter any notes about the dispatch process"
            }
            rows={3}
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="confirmPreparation"
            checked={isConfirmed}
            onCheckedChange={(checked) => {
              setIsConfirmed(checked as boolean);
              if (checked) setError("");
            }}
          />
          <Label
            htmlFor="confirmPreparation"
            className="text-sm font-normal cursor-pointer"
          >
            {t("confirmPreparation") ||
              "I confirm that the document has been prepared for dispatch according to security protocols"}
          </Label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>{t("continue") || "Continue"}</Button>
      </div>
    </div>
  );
}
