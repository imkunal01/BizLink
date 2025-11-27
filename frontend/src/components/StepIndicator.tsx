import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;
        
        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1">
              {/* Circle */}
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isComplete
                      ? 'bg-gradient-to-r from-lime-400 to-teal-400 text-white'
                      : isCurrent
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isComplete ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-25" />
                )}
              </div>
              
              {/* Label */}
              <div className="mt-3 text-center">
                <p className={`text-sm ${isCurrent || isComplete ? 'text-black' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            
            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="flex-1 max-w-[100px] h-0.5 mx-4 mb-8">
                <div className={`h-full transition-all duration-300 ${
                  index < currentStep 
                    ? 'bg-gradient-to-r from-lime-400 to-teal-400' 
                    : 'bg-gray-200'
                }`} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
