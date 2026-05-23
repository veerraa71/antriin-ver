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
import { AdminQueues } from "./pages/dashboard/AdminQueues";
import { AdminServices } from "./pages/dashboard/AdminServices";
import { AdminStats } from "./pages/dashboard/AdminStats";
import { AdminSettings } from "./pages/dashboard/AdminSettings";
import { CustomerDashboard } from "./pages/dashboard/Customer";
import { CustomerQueue } from "./pages/dashboard/CustomerQueue";
import { CustomerServices } from "./pages/dashboard/CustomerServices";

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
          <Route path="queue" element={<AdminQueues />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="stats" element={<AdminStats />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="dashboard/customer" element={<DashboardLayout role="customer" />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="queue" element={<CustomerQueue />} />
          <Route path="search" element={<CustomerServices />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
