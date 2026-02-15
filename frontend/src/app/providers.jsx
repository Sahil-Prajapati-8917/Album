import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }) {
    return (
        <Router>
            <ThemeProvider>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </ThemeProvider>
        </Router>
    );
}
