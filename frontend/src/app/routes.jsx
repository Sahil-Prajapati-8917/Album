import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Pages
import Landing from '../features/landing/Landing';
import Pricing from '../pages/Pricing';
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';
import Dashboard from '../features/user/pages/Dashboard';
import CreateNew from '../features/album/pages/CreateNew';
import AllPixfolio from '../features/album/pages/AllPixfolio';
import Recharge from '../features/user/pages/Recharge';
import Profile from '../features/user/pages/Profile';
import NotFound from '../pages/NotFound';
import ZoomParallaxDemo from '../pages/ZoomParallaxDemo';
import VisualBookDemo from '../pages/VisualBookDemo';

// Components
import VisualBookViewer from '../features/album/components/VisualBookViewer';
import LumaSpinDemo from '../components/ui/luma-spin-demo';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/test-loader" element={<LumaSpinDemo />} />
            {/* Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* Admin Redirect */}
            <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />

            {/* Standalone Routes (No Layout) */}
            <Route path="/viewer/:id" element={<VisualBookViewer />} />
            <Route path="/demo" element={<VisualBookDemo />} />

            {/* Public Routes with Main Layout */}
            <Route element={<MainLayout />}>
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/zoom-parallax-demo" element={<ZoomParallaxDemo />} />
            </Route>

            {/* Auth Routes (Standalone) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected/Dashboard Routes with Dashboard Layout */}
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateNew />} />
                <Route path="/all-pixfolio" element={<AllPixfolio />} />
                <Route path="/recharge" element={<Recharge />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
