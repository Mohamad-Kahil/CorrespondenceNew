import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface MetadataStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function MetadataStep({
  documentData,
  updateDocumentData,
  onNext,
}: MetadataStepProps) {
  const { t } = useLanguage();
  const [title, setTitle] = useState(documentData.title || "");
  const [subject, setSubject] = useState(documentData.subject || "");
  const [keywords, setKeywords] = useState(documentData.keywords || "");
  const [description, setDescription] = useState(
    documentData.description || "",
  );
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title || !subject) {
      setError(t("fillRequiredFields") || "Please fill all required fields");
      return;
    }

    updateDocumentData({
      title,
      subject,
      keywords,
      description,
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("metadataCreation") || "Metadata Creation and Digital Archiving"}
      </h2>

      <p className="text-muted-foreground">
        {t("metadataInstructions") ||
          "Enter the document metadata: title, subject, keywords, and any additional fields."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
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
          <Label htmlFor="keywords">{t("keywords") || "Keywords"}</Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={
              t("enterKeywords") || "Enter keywords (comma separated)"
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            {t("description") || "Description"}
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("enterDescription") || "Enter description"}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>{t("continue") || "Continue"}</Button>
      </div>
    </div>
  );
}
