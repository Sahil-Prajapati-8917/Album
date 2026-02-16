import React from 'react'
import { Check } from 'lucide-react'

const CreateSteps = ({ steps, currentStep }) => {
    return (
        <div className="mb-10">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors ${currentStep > step.id
                                    ? 'bg-primary text-primary-foreground'
                                    : currentStep === step.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                }`}>
                                {currentStep > step.id ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </div>
                            <div className="hidden sm:block">
                                <p className={`text-sm font-medium leading-none ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                    {step.title}
                                </p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-1 mx-4 h-px bg-border" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default CreateSteps
