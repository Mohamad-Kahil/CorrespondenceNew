import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import WizardStepIndicator from "./WizardStepIndicator";
import SenderDetailsForm from "./SenderDetailsForm";
import DocumentPreviewPanel from "./DocumentPreviewPanel";
import StorageLocationGrid from "./StorageLocationGrid";
import BarcodeGenerator from "./BarcodeGenerator";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface DocumentIntakeWizardProps {
  onComplete?: (data: any) => void;
  initialStep?: number;
}

const DocumentIntakeWizard = ({
  onComplete = (data) => console.log("Wizard completed:", data),
  initialStep = 1,
}: DocumentIntakeWizardProps) => {
  const { t, language } = useLanguage();

  const steps = [
    { id: 1, name: t("senderDetails") },
    { id: 2, name: t("documentClassification") },
    { id: 3, name: t("scanDocument") },
    { id: 4, name: t("metadata") },
    { id: 5, name: t("generateBarcode") },
    { id: 6, name: t("storageLocation") },
  ];

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<any>({
    senderDetails: {},
    documentClass: "",
    documentImage: "",
    metadata: {},
    barcode: "",
    storageLocation: null,
  });

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateFormData = (step: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [step]: data,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SenderDetailsForm
            onSubmit={(data) => {
              updateFormData("senderDetails", data);
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("documentClassification")}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-32 hover:bg-primary/10"
                  onClick={() => {
                    updateFormData("documentClass", "invoice");
                    handleNext();
                  }}
                >
                  {t("invoice")}
                </Button>
                <Button
                  variant="outline"
                  className="h-32 hover:bg-primary/10"
                  onClick={() => {
                    updateFormData("documentClass", "contract");
                    handleNext();
                  }}
                >
                  {t("contract")}
                </Button>
                <Button
                  variant="outline"
                  className="h-32 hover:bg-primary/10"
                  onClick={() => {
                    updateFormData("documentClass", "report");
                    handleNext();
                  }}
                >
                  {t("report")}
                </Button>
                <Button
                  variant="outline"
                  className="h-32 hover:bg-primary/10"
                  onClick={() => {
                    updateFormData("documentClass", "other");
                    handleNext();
                  }}
                >
                  {t("other")}
                </Button>
              </div>
            </div>
          </Card>
        );
      case 3:
        return (
          <DocumentPreviewPanel
            documentImage="https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?w=800&auto=format&fit=crop"
            ocrText={t("documentPreviewText")}
          />
        );
      case 4:
        return (
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("documentMetadata")}
            </h2>
            <div className="space-y-4">
              <Button
                onClick={() => {
                  updateFormData("metadata", { status: "processed" });
                  handleNext();
                }}
              >
                {t("continue")}
              </Button>
            </div>
          </Card>
        );
      case 5:
        return (
          <div className="flex justify-center">
            <BarcodeGenerator
              documentId="DOC-2024-001"
              onGenerate={() => {
                updateFormData("barcode", "DOC-2024-001");
                handleNext();
              }}
            />
          </div>
        );
      case 6:
        return (
          <StorageLocationGrid
            onLocationSelect={(location) => {
              updateFormData("storageLocation", location);
              handleNext();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <WizardStepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      <div className="mt-8">{renderStepContent()}</div>

      <div
        className={cn(
          "flex justify-between mt-6",
          language === "ar" && "flex-row-reverse",
        )}
      >
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className={cn(language === "ar" && "flex-row-reverse gap-2")}
        >
          {t("back")}
        </Button>
        {currentStep < 6 && (
          <Button
            onClick={handleNext}
            className={cn(language === "ar" && "flex-row-reverse gap-2")}
          >
            {t("skip")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentIntakeWizard;
