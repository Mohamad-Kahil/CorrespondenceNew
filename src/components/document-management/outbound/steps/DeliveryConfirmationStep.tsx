import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Upload } from "lucide-react";

interface DeliveryConfirmationStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function DeliveryConfirmationStep({
  documentData,
  updateDocumentData,
  onNext,
}: DeliveryConfirmationStepProps) {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      updateDocumentData({ deliveryFormUploaded: true });
    }, 2000);
  };

  const handleSubmit = () => {
    if (!isUploaded) {
      setError(
        t("uploadDeliveryFormFirst") ||
          "Please upload the signed delivery form first",
      );
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("deliveryConfirmation") || "Delivery Confirmation"}
      </h2>

      <p className="text-muted-foreground">
        {t("deliveryConfirmationInstructions") ||
          "Once delivered, upload the signed delivery form to confirm receipt."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {!isUploaded ? (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                {t("dragAndDropOrClick") ||
                  "Drag and drop your file here, or click to browse"}
              </p>
              <Button
                variant="outline"
                onClick={handleFileUpload}
                disabled={isUploading}
              >
                {isUploading
                  ? t("uploading") || "Uploading..."
                  : t("uploadDeliveryForm") || "Upload Delivery Form"}
              </Button>
            </div>
          </div>
        ) : (
          <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30">
            <AlertTitle className="text-green-800 dark:text-green-300">
              {t("deliveryFormUploaded") || "Delivery Form Uploaded"}
            </AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              {t("deliveryFormUploadedDesc") ||
                "The delivery form has been successfully uploaded and attached to the document record."}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!isUploaded}>
          {t("continue") || "Continue"}
        </Button>
      </div>
    </div>
  );
}
