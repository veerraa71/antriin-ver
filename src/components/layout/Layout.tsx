import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "../Chatbot";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className={`flex-grow ${isHome ? "" : "pt-16"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
