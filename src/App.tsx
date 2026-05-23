import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Pricing } from "./pages/Pricing";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import { ScrollToTop } from "./pages/ScrollToTop";
import { AdminDashboard } from "./pages/dashboard/Admin";
import { CustomerDashboard } from "./pages/dashboard/Customer";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Dashboard Routes */}
        <Route path="dashboard/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="queue" element={<AdminDashboard />} />
          <Route path="services" element={<AdminDashboard />} />
          <Route path="stats" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
        </Route>

        <Route path="dashboard/customer" element={<DashboardLayout role="customer" />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="queue" element={<CustomerDashboard />} />
          <Route path="search" element={<CustomerDashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
