import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateToken, isAuthenticated } from '@/services/api';

const ProtectedAdminRoute = () => {
    const [isChecking, setIsChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            const hasToken = isAuthenticated();
            const hasAdminFlag = sessionStorage.getItem('isMasterAdmin') === 'true';

            if (!hasToken || !hasAdminFlag) {
                setIsValid(false);
                setIsChecking(false);
                return;
            }

            // Validate token is real and still valid with server
            try {
                const valid = await validateToken();
                setIsValid(valid);
            } catch (err) {
                setIsValid(false);
            }
            setIsChecking(false);
        };

        checkAdmin();
    }, []);

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isValid) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
