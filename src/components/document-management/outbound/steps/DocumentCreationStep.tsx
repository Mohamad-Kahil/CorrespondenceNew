import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentCreationStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function DocumentCreationStep({
  documentData,
  updateDocumentData,
  onNext,
}: DocumentCreationStepProps) {
  const { t } = useLanguage();
  const [title, setTitle] = useState(documentData.title || "");
  const [subject, setSubject] = useState(documentData.subject || "");
  const [content, setContent] = useState(documentData.content || "");
  const [secrecyLevel, setSecrecyLevel] = useState(
    documentData.secrecyLevel || "Public",
  );
  const [error, setError] = useState("");
  const [clearanceError, setClearanceError] = useState(false);

  // Mock user clearance level (in a real app, this would come from auth context)
  const userClearanceLevel = "Secret"; // Possible values: Public, Confidential, Secret, Top Secret

  const handleSubmit = () => {
    if (!title || !subject || !content) {
      setError(t("fillRequiredFields") || "Please fill all required fields");
      return;
    }

    // Check if user has sufficient clearance
    const clearanceLevels = {
      Public: 0,
      Confidential: 1,
      Secret: 2,
      "Top Secret": 3,
    };

    const documentLevel =
      clearanceLevels[secrecyLevel as keyof typeof clearanceLevels];
    const userLevel =
      clearanceLevels[userClearanceLevel as keyof typeof clearanceLevels];

    if (documentLevel > userLevel) {
      setClearanceError(true);
      return;
    }

    updateDocumentData({
      title,
      subject,
      content,
      secrecyLevel,
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("documentCreationAndAuthorization") ||
          "Document Creation and Authorization"}
      </h2>

      <p className="text-muted-foreground">
        {t("documentCreationInstructions") ||
          "Enter the document details: title, subject, and secrecy level."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {clearanceError && (
        <Alert
          variant="default"
          className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900/30 dark:text-amber-300"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {t("clearanceWarning") || "Clearance Warning"}
          </AlertTitle>
          <AlertDescription>
            {t("insufficientClearanceForCreation") ||
              "You do not have sufficient clearance to create a document with this secrecy level."}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="trackingNumber" className="text-muted-foreground">
            {t("outboundTrackingNumber") || "Outbound Tracking Number"}
          </Label>
          <Input
            id="trackingNumber"
            value={documentData.trackingNumber}
            disabled
            className="bg-muted/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="flex items-center">
            {t("documentTitle") || "Document Title"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("enterDocumentTitle") || "Enter document title"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="flex items-center">
            {t("subject") || "Subject"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t("enterSubject") || "Enter subject"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secrecyLevel" className="flex items-center">
            {t("secrecyLevel") || "Secrecy Level"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Select
            value={secrecyLevel}
            onValueChange={(value) => {
              setSecrecyLevel(value);
              setClearanceError(false);
            }}
          >
            <SelectTrigger id="secrecyLevel">
              <SelectValue
                placeholder={t("selectSecrecyLevel") || "Select secrecy level"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Public">{t("public") || "Public"}</SelectItem>
              <SelectItem value="Confidential">
                {t("confidential") || "Confidential"}
              </SelectItem>
              <SelectItem value="Secret">{t("secret") || "Secret"}</SelectItem>
              <SelectItem value="Top Secret">
                {t("topSecret") || "Top Secret"}
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground mt-1">
            {t("yourClearanceLevel") || "Your clearance level"}:{" "}
            {userClearanceLevel}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="flex items-center">
            {t("content") || "Content"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("enterDocumentContent") || "Enter document content"}
            rows={8}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={clearanceError}>
          {t("continue") || "Continue"}
        </Button>
      </div>
    </div>
  );
}
