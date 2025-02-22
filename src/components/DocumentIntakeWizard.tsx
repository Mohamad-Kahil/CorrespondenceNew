import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import WizardStepIndicator from "./WizardStepIndicator";
import SenderDetailsForm from "./SenderDetailsForm";
import DocumentPreviewPanel from "./DocumentPreviewPanel";
import StorageLocationGrid from "./StorageLocationGrid";
import BarcodeGenerator from "./BarcodeGenerator";

interface DocumentIntakeWizardProps {
  onComplete?: (data: any) => void;
  initialStep?: number;
}

const DocumentIntakeWizard = ({
  onComplete = (data) => console.log("Wizard completed:", data),
  initialStep = 1,
}: DocumentIntakeWizardProps) => {
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
              Document Classification
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
                  Invoice
                </Button>
                <Button
                  variant="outline"
                  className="h-32 hover:bg-primary/10"
                  onClick={() => {
                    updateFormData("documentClass", "contract");
                    handleNext();
                  }}
                >
                  Contract
                </Button>
                <Button
                  variant="outline"
                  className="h-32 hover:bg-primary/10"
                  onClick={() => {
                    updateFormData("documentClass", "report");
                    handleNext();
                  }}
                >
                  Report
                </Button>
                <Button
                  variant="outline"
                  className="h-32 hover:bg-primary/10"
                  onClick={() => {
                    updateFormData("documentClass", "other");
                    handleNext();
                  }}
                >
                  Other
                </Button>
              </div>
            </div>
          </Card>
        );
      case 3:
        return (
          <DocumentPreviewPanel
            documentImage="https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?w=800&auto=format&fit=crop"
            ocrText="Sample OCR text for the scanned document will appear here."
          />
        );
      case 4:
        return (
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Document Metadata
            </h2>
            <div className="space-y-4">
              <Button
                onClick={() => {
                  updateFormData("metadata", { status: "processed" });
                  handleNext();
                }}
              >
                Continue
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
        {currentStep < 6 && <Button onClick={handleNext}>Skip</Button>}
      </div>
    </div>
  );
};

export default DocumentIntakeWizard;
