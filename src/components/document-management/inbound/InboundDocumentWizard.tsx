import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { WizardStepIndicator } from "../shared/WizardStepIndicator";
import { DocumentReceptionStep } from "./steps/DocumentReceptionStep";
import { SecrecyClassificationStep } from "./steps/SecrecyClassificationStep";
import { RoutingStep } from "./steps/RoutingStep";
import { DocumentProcessingStep } from "./steps/DocumentProcessingStep";
import { MetadataStep } from "./steps/MetadataStep";
import { PhysicalStorageStep } from "../shared/PhysicalStorageStep";
import { PhysicalArchivingStep } from "./steps/PhysicalArchivingStep";
import { ProcessCompletionStep } from "./steps/ProcessCompletionStep";

export function InboundDocumentWizard() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentData, setDocumentData] = useState<any>({
    trackingNumber: `IN-${new Date().toISOString().slice(0, 10)}-${Math.floor(
      Math.random() * 1000,
    )
      .toString()
      .padStart(3, "0")}`,
    securityClearanceRequired: false,
    storageAddress: "",
  });

  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkipToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const updateDocumentData = (newData: any) => {
    setDocumentData({ ...documentData, ...newData });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DocumentReceptionStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <SecrecyClassificationStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
            onSkipToStep={handleSkipToStep}
          />
        );
      case 3:
        return (
          <RoutingStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <DocumentProcessingStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <MetadataStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 6:
        return (
          <PhysicalStorageStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
            processType="inbound"
          />
        );
      case 7:
        return (
          <PhysicalArchivingStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 8:
        return (
          <ProcessCompletionStep
            documentData={documentData}
            onReset={() => {
              setCurrentStep(1);
              setDocumentData({
                trackingNumber: `IN-${new Date().toISOString().slice(0, 10)}-${Math.floor(
                  Math.random() * 1000,
                )
                  .toString()
                  .padStart(3, "0")}`,
                securityClearanceRequired: false,
                storageAddress: "",
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    t("documentReception") || "Document Reception",
    t("secrecyClassification") || "Secrecy Classification",
    t("routing") || "Routing",
    t("documentProcessing") || "Document Processing",
    t("metadata") || "Metadata",
    t("physicalStorage") || "Physical Storage",
    t("physicalArchiving") || "Physical Archiving",
    t("processCompletion") || "Process Completion",
  ];

  return (
    <div className="space-y-6">
      <WizardStepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
      />

      <Card className="p-6">
        {renderStep()}

        {currentStep !== 1 && currentStep !== totalSteps && (
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button variant="outline" onClick={handleBack}>
              {t("back") || "Back"}
            </Button>
            {/* Next button is handled within each step component */}
          </div>
        )}
      </Card>
    </div>
  );
}
