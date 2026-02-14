import React from 'react'
import { CheckCircle } from 'lucide-react'

const CreateSteps = ({ steps, currentStep }) => {
    return (
        <div className="mb-16">
            <div className="flex items-center justify-between px-2">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex-1 flex flex-col items-center relative">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 z-10 ${currentStep > step.id
                            ? 'bg-gold border-gold text-white'
                            : currentStep === step.id
                                ? 'bg-background border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                : 'bg-muted/50 border-gold/10 text-gold/30'
                            }`}>
                            {currentStep > step.id ? (
                                <CheckCircle className="h-6 w-6" />
                            ) : (
                                <span className="text-sm font-bold font-serif">{index + 1}</span>
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                {step.title}
                            </p>
                            <p className="text-[8px] text-muted-foreground font-light hidden sm:block italic">{step.description}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`absolute top-6 left-[50%] w-full h-[1px] -z-0 transition-all duration-700 ${currentStep > step.id ? 'bg-gold' : 'bg-gold/10'
                                }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateSteps
