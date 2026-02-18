import React from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const CreateSteps = ({ steps, currentStep }) => {
    return (
        <div className="mb-10 relative">
            <div className="flex items-center justify-between relative px-2">
                {/* Background Line */}
                <div className="absolute top-4 left-0 w-full h-0.5 bg-muted -z-0" />

                {/* Animated Progress Line */}
                <motion.div
                    className="absolute top-4 left-0 h-0.5 bg-primary -z-0"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center relative z-10">
                        <motion.div
                            initial={false}
                            animate={{
                                backgroundColor: currentStep >= step.id ? "hsl(var(--primary))" : "hsl(var(--muted))",
                                color: currentStep >= step.id ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"
                            }}
                            className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors duration-300 border-4 border-background`}
                        >
                            {currentStep > step.id ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <span>{index + 1}</span>
                            )}
                        </motion.div>
                        <div className="mt-2 text-center">
                            <p className={`text-xs font-medium transition-colors duration-300 ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                {step.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateSteps
