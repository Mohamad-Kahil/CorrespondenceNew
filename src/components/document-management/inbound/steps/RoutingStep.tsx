import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoutingStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function RoutingStep({
  documentData,
  updateDocumentData,
  onNext,
}: RoutingStepProps) {
  const { t } = useLanguage();
  const [department, setDepartment] = useState(documentData.department || "");
  const [error, setError] = useState("");

  // Mock departments
  const departments = [
    "HR",
    "Finance",
    "Operations",
    "Legal",
    "IT",
    "Executive",
    "Communications",
    "Security",
  ];

  const handleSubmit = () => {
    if (!department) {
      setError(t("selectDepartment") || "Please select a department");
      return;
    }

    updateDocumentData({ department });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("routingToResponsibleDepartment") ||
          "Routing to Responsible Department"}
      </h2>

      <p className="text-muted-foreground">
        {t("routingInstructions") ||
          "Based on the document's markings, select the responsible department from the provided list."}
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
          <Label htmlFor="department" className="flex items-center">
            {t("responsibleDepartment") || "Responsible Department"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Select
            value={department}
            onValueChange={(value) => {
              setDepartment(value);
              setError("");
            }}
          >
            <SelectTrigger id="department">
              <SelectValue
                placeholder={t("selectDepartment") || "Select department"}
              />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {t(dept) || dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>{t("continue") || "Continue"}</Button>
      </div>
    </div>
  );
}
