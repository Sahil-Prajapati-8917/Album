import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeWrapper } from '../contexts/ThemeContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from '../components/ErrorBoundary';

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
