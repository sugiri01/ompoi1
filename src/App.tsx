import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Prices from "./pages/Prices";
import News from "./pages/News";
import Analysis from "./pages/Analysis";
import Calculator from "./pages/Calculator";
import Marketplace from "./pages/Marketplace";
import Farm from "./pages/Farm";
import Processing from "./pages/Processing";
import Logistics from "./pages/Logistics";
import Finance from "./pages/Finance";
import ProductDetails from "./pages/ProductDetails";
import MarketOverview from "./pages/MarketOverview";
import QualityVerification from "./pages/QualityVerification";
import OrderTracking from "./pages/OrderTracking";
import RawCashew from "./pages/commodity/RawCashew";
import CashewKernels from "./pages/commodity/CashewKernels";
import CNSL from "./pages/commodity/CNSL";
import Byproducts from "./pages/commodity/Byproducts";
import SellerComparison from "./pages/SellerComparison";
import ApiAccess from "./pages/ApiAccess";
import Settings from "./pages/Settings";
import DirectTrading from "./pages/DirectTrading";
import ExportManagement from "./pages/ExportManagement";
import Procurement from "./pages/Procurement";
import Sourcing from "./pages/Sourcing";
import Inventory from "./pages/Inventory";
import Production from "./pages/Production";
import Sales from "./pages/Sales";
import B2B from "./pages/B2B";
import Distribution from "./pages/Distribution";
import Manufacturing from "./pages/Manufacturing";
import Ecommerce from "./pages/Ecommerce";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <div>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/prices" element={<ProtectedRoute><Prices /></ProtectedRoute>} />
            <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
            <Route path="/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
            <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
            <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
            <Route path="/market-overview" element={<ProtectedRoute><MarketOverview /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/quality-verification" element={<ProtectedRoute><QualityVerification /></ProtectedRoute>} />
            <Route path="/order/:orderId" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
            <Route path="/farm" element={<ProtectedRoute><Farm /></ProtectedRoute>} />
            <Route path="/processing" element={<ProtectedRoute><Processing /></ProtectedRoute>} />
            <Route path="/logistics" element={<ProtectedRoute><Logistics /></ProtectedRoute>} />
            <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/commodity/raw" element={<ProtectedRoute><RawCashew /></ProtectedRoute>} />
            <Route path="/commodity/kernels" element={<ProtectedRoute><CashewKernels /></ProtectedRoute>} />
            <Route path="/commodity/cnsl" element={<ProtectedRoute><CNSL /></ProtectedRoute>} />
            <Route path="/commodity/byproducts" element={<ProtectedRoute><Byproducts /></ProtectedRoute>} />
            <Route path="/compare" element={<ProtectedRoute><SellerComparison /></ProtectedRoute>} />
            <Route path="/developer/api" element={<ProtectedRoute><ApiAccess /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/direct-trading" element={<ProtectedRoute><DirectTrading /></ProtectedRoute>} />
            <Route path="/export" element={<ProtectedRoute><ExportManagement /></ProtectedRoute>} />
            <Route path="/procurement" element={<ProtectedRoute><Procurement /></ProtectedRoute>} />
            <Route path="/sourcing" element={<ProtectedRoute><Sourcing /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/production" element={<ProtectedRoute><Production /></ProtectedRoute>} />
            <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
            <Route path="/b2b" element={<ProtectedRoute><B2B /></ProtectedRoute>} />
            <Route path="/distribution" element={<ProtectedRoute><Distribution /></ProtectedRoute>} />
            <Route path="/manufacturing" element={<ProtectedRoute><Manufacturing /></ProtectedRoute>} />
            <Route path="/ecommerce" element={<ProtectedRoute><Ecommerce /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
