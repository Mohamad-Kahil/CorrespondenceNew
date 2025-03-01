import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Printer } from "lucide-react";

interface PhysicalArchivingStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function PhysicalArchivingStep({
  documentData,
  updateDocumentData,
  onNext,
}: PhysicalArchivingStepProps) {
  const { t } = useLanguage();
  const [isPrinted, setIsPrinted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState("");

  const handlePrintBarcode = () => {
    // In a real app, this would trigger a print dialog
    console.log("Printing barcode for", documentData.trackingNumber);
    setIsPrinted(true);
  };

  const handleConfirm = () => {
    if (!isPrinted) {
      setError(t("printBarcodeFirst") || "Please print the barcode first");
      return;
    }

    setIsConfirmed(true);
    updateDocumentData({ physicalArchivingComplete: true });
  };

  const handleSubmit = () => {
    if (!isConfirmed) {
      setError(t("confirmArchivingFirst") || "Please confirm archiving first");
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("physicalArchiving") || "Physical Archiving"}
      </h2>

      <p className="text-muted-foreground">
        {t("physicalArchivingInstructions") ||
          `A barcode has been generated for tracking number ${documentData.trackingNumber}. Please print it, attach it to the document, and place the document in the selected storage location. Confirm when complete.`}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div className="border rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
          <div className="bg-black text-white px-4 py-2 text-center w-64 font-mono">
            {documentData.trackingNumber}
          </div>
          <div className="h-16 w-64 bg-black"></div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handlePrintBarcode}
            disabled={isPrinted}
          >
            <Printer className="h-4 w-4" />
            {t("printBarcode") || "Print Barcode"}
          </Button>
        </div>

        {isPrinted && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-4">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="text-green-800 dark:text-green-300 font-medium">
                  {t("barcodePrinted") || "Barcode Printed"}
                </h3>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  {t("attachBarcodeInstructions") ||
                    "Please attach the printed barcode to the document and place it in the selected storage location."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start space-x-2">
          <Button
            variant={isConfirmed ? "default" : "outline"}
            className="gap-2"
            onClick={handleConfirm}
            disabled={!isPrinted || isConfirmed}
          >
            <CheckCircle2 className="h-4 w-4" />
            {t("confirmArchiving") || "Confirm Archiving"}
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!isConfirmed}>
          {t("continue") || "Continue"}
        </Button>
      </div>
    </div>
  );
}
