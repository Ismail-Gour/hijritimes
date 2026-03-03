import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HijriProvider } from "@/contexts/HijriContext";
import Index from "./pages/Index";
import KnowAboutHijri from "./pages/KnowAboutHijri";
import HijriMonths from "./pages/HijriMonths";
import PrayerTimes from "./pages/PrayerTimes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HijriProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/know-about-hijri" element={<KnowAboutHijri />} />
            <Route path="/hijri-months" element={<HijriMonths />} />
            <Route path="/prayer-times" element={<PrayerTimes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HijriProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
