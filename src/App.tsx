import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Pricing } from "./pages/Pricing";
import { AdminDashboard } from "./pages/dashboard/Admin";
import { About } from "./pages/About";
import { Gallery } from "./pages/Gallery";

// Placeholder Components for missing pages
const CustomerDashboard = () => <div className="py-20 text-center flex flex-col items-center justify-center min-h-[60vh]"><h1 className="text-4xl font-bold mb-4 font-display uppercase tracking-tight">Customer Dashboard</h1><p className="text-slate-500 font-medium font-mono italic">Welcome to ANTRIIN. Your queue features will appear here shortly.</p></div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="faq" element={<div className="py-40 text-center min-h-screen flex items-center justify-center"><h1 className="text-5xl font-display font-bold uppercase tracking-tighter">Help Center & FAQ</h1></div>} />
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
