import React from "react";
import { cn } from "@/lib/utils";

interface WizardStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
}

export function WizardStepIndicator({
  currentStep,
  totalSteps,
  stepTitles = [],
}: WizardStepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={stepNumber}
              className="flex flex-col items-center relative"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {stepNumber}
              </div>
              {stepTitles[index] && (
                <span
                  className={cn(
                    "text-xs mt-1 text-center max-w-[80px] absolute -bottom-6",
                    isActive || isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {stepTitles[index]}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 h-1 bg-muted w-full rounded-full" />
        <div
          className="absolute top-0 h-1 bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />
      </div>
      <div className="h-8" /> {/* Spacer for step titles */}
    </div>
  );
}
