import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SecrecyClassificationStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
  onSkipToStep: (step: number) => void;
}

export function SecrecyClassificationStep({
  documentData,
  updateDocumentData,
  onNext,
  onSkipToStep,
}: SecrecyClassificationStepProps) {
  const { t } = useLanguage();
  const [secrecyLevel, setSecrecyLevel] = useState(
    documentData.secrecyLevel || "",
  );
  const [error, setError] = useState("");
  const [clearanceError, setClearanceError] = useState(false);

  // Mock user clearance level (in a real app, this would come from auth context)
  const userClearanceLevel = "Secret"; // Possible values: Public, Confidential, Secret, Top Secret

  const handleSubmit = () => {
    if (!secrecyLevel) {
      setError(t("selectSecrecyLevel") || "Please select a secrecy level");
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
      updateDocumentData({
        secrecyLevel,
        securityClearanceRequired: true,
      });
      return;
    }

    updateDocumentData({
      secrecyLevel,
      securityClearanceRequired: false,
    });

    onNext();
  };

  const handleEscalate = () => {
    // Skip to routing step (step 3)
    onSkipToStep(3);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("secrecyClassification") || "Secrecy Classification"}
      </h2>

      <p className="text-muted-foreground">
        {t("secrecyClassificationInstructions") ||
          "Please select the document's secrecy level."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {clearanceError && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {t("clearanceWarning") || "Clearance Warning"}
          </AlertTitle>
          <AlertDescription>
            {t("insufficientClearance") ||
              "This document requires higher clearance. Please escalate to authorized personnel."}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="secrecyLevel" className="flex items-center">
            {t("secrecyLevel") || "Secrecy Level"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Select
            value={secrecyLevel}
            onValueChange={(value) => {
              setSecrecyLevel(value);
              setError("");
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
        </div>

        <div className="text-sm text-muted-foreground">
          {t("yourClearanceLevel") || "Your clearance level"}:{" "}
          {userClearanceLevel}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {clearanceError && (
          <Button variant="outline" onClick={handleEscalate}>
            {t("escalateToResponsibleDepartment") ||
              "Escalate to Responsible Department"}
          </Button>
        )}
        <Button onClick={handleSubmit}>{t("continue") || "Continue"}</Button>
      </div>
    </div>
  );
}
