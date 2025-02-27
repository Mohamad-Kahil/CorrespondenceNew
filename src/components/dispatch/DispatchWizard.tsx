import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import WizardStepIndicator from "../WizardStepIndicator";
import RecipientDetailsForm from "./RecipientDetailsForm";
import DeliveryNoteForm from "./DeliveryNoteForm";
import DocumentPreviewPanel from "../DocumentPreviewPanel";
import BarcodeGenerator from "../BarcodeGenerator";
import DeliveryConfirmation from "./DeliveryConfirmation";

interface DispatchWizardProps {
  onComplete?: (data: any) => void;
  initialStep?: number;
}

const steps = [
  { id: 1, name: "Recipient Details", status: "complete" as const },
  { id: 2, name: "Document Selection", status: "current" as const },
  { id: 3, name: "Delivery Note", status: "upcoming" as const },
  { id: 4, name: "Generate Barcode", status: "upcoming" as const },
  { id: 5, name: "Delivery Confirmation", status: "upcoming" as const },
  { id: 6, name: "Archive", status: "upcoming" as const },
];

const DispatchWizard = ({
  onComplete = (data) => console.log("Wizard completed:", data),
  initialStep = 1,
}: DispatchWizardProps) => {
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
          <DocumentPreviewPanel
            documentImage="https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?w=800&auto=format&fit=crop"
            ocrText="Sample document content will appear here."
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
              Archive Document
            </h2>
            <Button onClick={() => onComplete(formData)}>
              Complete Dispatch
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
          Back
        </Button>
        {currentStep < steps.length && (
          <Button onClick={handleNext}>Skip</Button>
        )}
      </div>
    </div>
  );
};

export default DispatchWizard;
