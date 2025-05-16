
import React from "react";
import { StepType } from "@/types/appointment";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  steps: { id: StepType; label: string }[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10",
                currentStep > index
                  ? "bg-booking-primary text-white"
                  : currentStep === index
                  ? "bg-booking-primary text-white ring-4 ring-booking-accent/30"
                  : "bg-booking-light text-booking-gray"
              )}
            >
              {index + 1}
            </div>
            <span className={cn(
              "text-xs mt-1 hidden sm:block",
              currentStep >= index ? "text-booking-primary font-medium" : "text-booking-gray"
            )}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-4 left-8 h-0.5 w-[calc(100%-2rem)]",
                  currentStep > index ? "bg-booking-primary" : "bg-booking-light"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
