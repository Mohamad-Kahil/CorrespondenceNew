import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { WizardStepIndicator } from "../shared/WizardStepIndicator";
import { DocumentCreationStep } from "./steps/DocumentCreationStep";
import { RecipientFormStep } from "./steps/RecipientFormStep";
import { ArchivingPreparationStep } from "./steps/ArchivingPreparationStep";
import { PhysicalStorageStep } from "../shared/PhysicalStorageStep";
import { DispatchProcessStep } from "./steps/DispatchProcessStep";
import { DeliveryConfirmationStep } from "./steps/DeliveryConfirmationStep";
import { ProcessCompletionStep } from "./steps/ProcessCompletionStep";

export function OutboundDocumentWizard() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentData, setDocumentData] = useState<any>({
    trackingNumber: `OUT-${new Date().toISOString().slice(0, 10)}-${Math.floor(
      Math.random() * 1000,
    )
      .toString()
      .padStart(3, "0")}`,
    storageAddress: "",
  });

  const totalSteps = 7;

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

  const updateDocumentData = (newData: any) => {
    setDocumentData({ ...documentData, ...newData });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DocumentCreationStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <RecipientFormStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <ArchivingPreparationStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <PhysicalStorageStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
            processType="outbound"
          />
        );
      case 5:
        return (
          <DispatchProcessStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 6:
        return (
          <DeliveryConfirmationStep
            documentData={documentData}
            updateDocumentData={updateDocumentData}
            onNext={handleNext}
          />
        );
      case 7:
        return (
          <ProcessCompletionStep
            documentData={documentData}
            onReset={() => {
              setCurrentStep(1);
              setDocumentData({
                trackingNumber: `OUT-${new Date().toISOString().slice(0, 10)}-${Math.floor(
                  Math.random() * 1000,
                )
                  .toString()
                  .padStart(3, "0")}`,
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
    "Document Creation",
    "Recipient Form",
    "Archiving Preparation",
    "Physical Storage",
    "Dispatch Process",
    "Delivery Confirmation",
    "Process Completion",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <WizardStepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
      />

      <Card className="p-4 overflow-hidden">
        <div className="overflow-y-auto">{renderStep()}</div>

        {currentStep !== 1 && currentStep !== totalSteps && (
          <div className="flex justify-between mt-4 pt-3 border-t">
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
