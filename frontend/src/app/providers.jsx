import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeWrapper } from '../contexts/ThemeContext';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }) {
    return (
        <Router>
            <ThemeWrapper>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </ThemeWrapper>
        </Router>
    );
}
