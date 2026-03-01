import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeWrapper } from '@/app/providers/ThemeContext';
import { TooltipProvider } from '@/shared/ui/tooltip';
import ErrorBoundary from '@/shared/ui/ErrorBoundary';

export function Providers({ children }) {
    return (
        <Router>
            <ErrorBoundary>
                <ThemeWrapper>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </ThemeWrapper>
            </ErrorBoundary>
        </Router>
    );
}
