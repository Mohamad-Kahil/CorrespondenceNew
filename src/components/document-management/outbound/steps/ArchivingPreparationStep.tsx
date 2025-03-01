import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Upload } from "lucide-react";

interface ArchivingPreparationStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function ArchivingPreparationStep({
  documentData,
  updateDocumentData,
  onNext,
}: ArchivingPreparationStepProps) {
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
      updateDocumentData({ documentScanned: true });
    }, 2000);
  };

  const handleSubmit = () => {
    if (!isUploaded) {
      setError(t("uploadDocumentFirst") || "Please upload the document first");
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("archivingPreparation") || "Archiving Preparation"}
      </h2>

      <p className="text-muted-foreground">
        {t("archivingPreparationInstructions") ||
          "Scan the signed document and upload the file here."}
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
                  : t("uploadDocument") || "Upload Document"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-4">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-green-800 dark:text-green-300 font-medium">
                  {t("documentUploaded") || "Document Uploaded"}
                </h3>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  {t("documentUploadedDesc") ||
                    "The document has been successfully uploaded and is ready for archiving."}
                </p>
              </div>
            </div>
          </div>
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
