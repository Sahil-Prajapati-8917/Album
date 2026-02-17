import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
    const isMasterAdmin = sessionStorage.getItem('isMasterAdmin') === 'true';

    if (!isMasterAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
