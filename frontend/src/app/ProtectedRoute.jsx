import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, validateToken } from '../services/api';

const ProtectedRoute = () => {
    const [isChecking, setIsChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Quick check: is there a token at all?
            if (!isAuthenticated()) {
                setIsValid(false);
                setIsChecking(false);
                return;
            }

            // Server-side validation: is the token actually valid?
            try {
                const valid = await validateToken();
                setIsValid(valid);
            } catch (err) {
                setIsValid(false);
            }
            setIsChecking(false);
        };

        checkAuth();
    }, []);

    // Show a loading spinner while checking
    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isValid) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
