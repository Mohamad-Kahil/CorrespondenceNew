import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import WizardStepIndicator from "../WizardStepIndicator";
import RecipientDetailsForm from "./RecipientDetailsForm";
import DeliveryNoteForm from "./DeliveryNoteForm";
import DocumentSelectionPanel from "./DocumentSelectionPanel";
import BarcodeGenerator from "../BarcodeGenerator";
import DeliveryConfirmation from "./DeliveryConfirmation";

interface DispatchWizardProps {
  onComplete?: (data: any) => void;
  initialStep?: number;
}

const getSteps = (t: (key: string) => string) => [
  { id: 1, name: t("recipientDetails") },
  { id: 2, name: t("documentSelection") },
  { id: 3, name: t("deliveryNote") },
  { id: 4, name: t("generateBarcode") },
  { id: 5, name: t("deliveryConfirmation") },
  { id: 6, name: t("archive") },
];

const DispatchWizard = ({
  onComplete = (data) => console.log("Wizard completed:", data),
  initialStep = 1,
}: DispatchWizardProps) => {
  const { t } = useLanguage();
  const steps = getSteps(t);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<any>({
    recipientDetails: {},
    selectedDocument: null,
    deliveryNote: {},
    barcode: "",
    archiveLocation: null,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
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
          <RecipientDetailsForm
            onSubmit={(data) => {
              updateFormData("recipientDetails", data);
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <DocumentSelectionPanel
            onDocumentSelect={(document) => {
              updateFormData("selectedDocument", document);
              handleNext();
            }}
          />
        );
      case 3:
        return (
          <DeliveryNoteForm
            onSubmit={(data) => {
              updateFormData("deliveryNote", data);
              handleNext();
            }}
          />
        );
      case 4:
        return (
          <div className="flex justify-center">
            <BarcodeGenerator
              documentId="DISP-2024-001"
              onGenerate={() => {
                updateFormData("barcode", "DISP-2024-001");
                handleNext();
              }}
            />
          </div>
        );
      case 5:
        return (
          <DeliveryConfirmation
            onConfirm={(data) => {
              updateFormData("deliveryConfirmation", data);
              handleNext();
            }}
          />
        );
      case 6:
        return (
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("archive")}
            </h2>
            <Button onClick={() => onComplete(formData)}>
              {t("completeDispatch")}
            </Button>
          </Card>
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

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          {t("back")}
        </Button>
        {currentStep < steps.length && (
          <Button onClick={handleNext}>{t("skip")}</Button>
        )}
      </div>
    </div>
  );
};

export default DispatchWizard;
