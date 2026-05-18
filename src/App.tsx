import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import LegalPage from "./pages/LegalPage.tsx";
import LocalLanding from "./pages/LocalLanding.tsx";
import BlogIndex from "./pages/BlogIndex.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="/cookies-rabat" element={<LocalLanding />} />
          <Route path="/cookies-agdal" element={<LocalLanding />} />
          <Route path="/cookies-hay-riad" element={<LocalLanding />} />
          <Route path="/dattes-farcies-temara" element={<LocalLanding />} />
          <Route path="/dattes-mariage-rabat" element={<LocalLanding />} />
          <Route path="/coffrets-cadeaux-corporate-rabat" element={<LocalLanding />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
