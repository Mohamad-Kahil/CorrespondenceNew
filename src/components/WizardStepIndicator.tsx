import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Step {
  id: number;
  name: string;
  status?: "complete" | "current" | "upcoming";
}

interface WizardStepIndicatorProps {
  steps?: Step[];
  currentStep?: number;
  onStepClick?: (step: number) => void;
}

const WizardStepIndicator = ({
  steps = [],
  currentStep = 1,
  onStepClick = () => {},
}: WizardStepIndicatorProps) => {
  const { language } = useLanguage();

  const getStepStatus = (
    stepId: number,
  ): "complete" | "current" | "upcoming" => {
    if (stepId < currentStep) return "complete";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const updatedSteps = steps.map((step) => ({
    ...step,
    status: getStepStatus(step.id),
  }));

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border space-y-6">
      <Progress value={progressPercentage} className="h-2" />

      <div
        className={cn(
          "grid",
          `grid-cols-${steps.length}`,
          "gap-4",
          language === "ar" && "direction-rtl",
        )}
      >
        {updatedSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg transition-colors",
              step.status === "complete" && "text-primary hover:bg-primary/5",
              step.status === "current" && "text-primary hover:bg-primary/5",
              step.status === "upcoming" && "text-gray-400 hover:bg-gray-50",
            )}
          >
            <div className="relative mb-2">
              {step.status === "complete" ? (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
              ) : (
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step.status === "current"
                      ? "border-2 border-primary text-primary"
                      : "border-2 border-gray-200 text-gray-400",
                  )}
                >
                  {step.id}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-center">{step.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WizardStepIndicator;
