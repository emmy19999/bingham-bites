import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import BottomNav from "@/components/layout/BottomNav";
import FluidBackground from "@/components/animations/FluidBackground";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerificationSuccess from "./pages/VerificationSuccess";
import Home from "./pages/Home";
import About from "./pages/About";
import CafeteriaDetail from "./pages/CafeteriaDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCafeterias from "./pages/admin/ManageCafeterias";
import ManageHostels from "./pages/admin/ManageHostels";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageUsers from "./pages/admin/ManageUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Toaster />
            <Sonner />
            <FluidBackground />
            <BrowserRouter>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/verified" element={<VerificationSuccess />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/cafeteria/:id" element={<ProtectedRoute><CafeteriaDetail /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/tracking/:id" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute requiredRole="cafeteria_admin"><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/cafeterias" element={<ProtectedRoute requiredRole="super_admin"><ManageCafeterias /></ProtectedRoute>} />
                  <Route path="/admin/hostels" element={<ProtectedRoute requiredRole="super_admin"><ManageHostels /></ProtectedRoute>} />
                  <Route path="/admin/orders" element={<ProtectedRoute requiredRole="cafeteria_admin"><ManageOrders /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute requiredRole="super_admin"><ManageUsers /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
              <BottomNav />
            </BrowserRouter>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
