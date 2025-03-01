import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface DocumentProcessingStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function DocumentProcessingStep({
  documentData,
  updateDocumentData,
  onNext,
}: DocumentProcessingStepProps) {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [ocrText, setOcrText] = useState(documentData.ocrText || "");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Mock OCR text
  const mockOcrText = `CONFIDENTIAL

MEMORANDUM

To: Department of Operations
From: Ministry of Defense
Date: October 15, 2023
Subject: Security Protocol Update

This document outlines the updated security protocols for all government facilities effective November 1, 2023. Please ensure all staff are briefed on these changes.

1. Access Control Updates
2. Surveillance System Enhancements
3. Emergency Response Procedures
4. Classified Document Handling

Please acknowledge receipt by October 20, 2023.

Regards,
Director of Security`;

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate file upload and OCR processing
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      setOcrText(mockOcrText);
    }, 2000);
  };

  const handleVerify = () => {
    if (!ocrText.trim()) {
      setError(t("ocrTextRequired") || "OCR text is required");
      return;
    }

    setIsVerified(true);
    updateDocumentData({ ocrText });
  };

  const handleSubmit = () => {
    if (!isVerified) {
      setError(t("verifyOcrFirst") || "Please verify the OCR text first");
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("documentProcessing") || "Document Processing"}
      </h2>

      <p className="text-muted-foreground">
        {t("documentProcessingInstructions") ||
          "Please scan the document using a high-resolution scanner and upload the file here."}
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="ocrText">
                {t("ocrExtractedText") || "OCR Extracted Text"}
              </Label>
              {!isVerified && (
                <Button variant="outline" size="sm" onClick={handleVerify}>
                  {t("verifyText") || "Verify Text"}
                </Button>
              )}
            </div>
            <Textarea
              id="ocrText"
              value={ocrText}
              onChange={(e) => {
                setOcrText(e.target.value);
                setIsVerified(false);
              }}
              rows={10}
              className="font-mono text-sm"
              placeholder={
                t("ocrTextWillAppearHere") || "OCR text will appear here"
              }
            />

            {isVerified && (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30">
                <AlertTitle className="text-green-800 dark:text-green-300">
                  {t("textVerified") || "Text Verified"}
                </AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  {t("ocrTextVerified") ||
                    "The OCR text has been verified and is ready for processing."}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!isVerified}>
          {t("continue") || "Continue"}
        </Button>
      </div>
    </div>
  );
}
