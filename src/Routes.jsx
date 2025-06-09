import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import SuperAdminDashboard from "pages/super-admin-dashboard";
import LiveCheckInDashboard from "pages/live-check-in-dashboard";
import QrCodeScannerInterface from "pages/qr-code-scanner-interface";
import ClientPortalDashboard from "pages/client-portal-dashboard";
import EventManagementInterface from "pages/event-management-interface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<SuperAdminDashboard />} />
          <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="/live-check-in-dashboard" element={<LiveCheckInDashboard />} />
          <Route path="/qr-code-scanner-interface" element={<QrCodeScannerInterface />} />
          <Route path="/client-portal-dashboard" element={<ClientPortalDashboard />} />
          <Route path="/event-management-interface" element={<EventManagementInterface />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;