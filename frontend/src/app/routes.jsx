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
import Settings from '../features/user/pages/Settings';
import HelpCenter from '../features/user/pages/HelpCenter';
import NotFound from '../pages/NotFound';
import ZoomParallaxDemo from '../pages/ZoomParallaxDemo';
import VisualBookDemo from '../pages/VisualBookDemo';
import AdminPasswordPage from '../features/admin/pages/AdminPasswordPage';
import MasterAdminDashboard from '../features/admin/pages/MasterAdminDashboard';
import ProtectedAdminRoute from '../features/admin/components/ProtectedAdminRoute';

import AdminOverview from '../features/admin/components/dashboard/AdminOverview';
import AdminAnalytics from '../features/admin/components/dashboard/AdminAnalytics';
import AdminAlbums from '../features/admin/components/dashboard/AdminAlbums';
import AdminUsers from '../features/admin/components/dashboard/AdminUsers';
import AdminModeration from '../features/admin/components/dashboard/AdminModeration';
import AdminRoles from '../features/admin/components/dashboard/AdminRoles';
import AdminSettings from '../features/admin/components/dashboard/AdminSettings';
import AdminHelp from '../features/admin/components/dashboard/AdminHelp';

// Components
import VisualBookViewer from '../features/album/components/VisualBookViewer';
import LumaSpinDemo from '../components/ui/luma-spin-demo';

// Policy Pages
import PrivacyPolicy from '../pages/PrivacyPolicy';
import RefundPolicy from '../pages/RefundPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/test-loader" element={<LumaSpinDemo />} />
            {/* Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPasswordPage />} />
            <Route element={<ProtectedAdminRoute />}>
                <Route path="/admin/dashboard" element={<MasterAdminDashboard />}>
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<AdminOverview />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="albums" element={<AdminAlbums />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="moderation" element={<AdminModeration />} />
                    <Route path="roles" element={<AdminRoles />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="help" element={<AdminHelp />} />
                </Route>
            </Route>

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
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
