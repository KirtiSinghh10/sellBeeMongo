import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ListingDetail from "@/pages/ListingDetail";
import EditProfile from "@/pages/EditProfile";



import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Marketplace from "./pages/Marketplace";
import Auction from "./pages/Auction";
import AddListing from "./pages/AddListing";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ForgotPassword from "@/pages/ForgotPassword";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/users/edit" element={<EditProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/listing/:id" element={<ListingDetail />} />

      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
