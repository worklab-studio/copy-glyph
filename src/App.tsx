import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
// Temporarily removed problematic imports
// import Index from "./pages/Index";  
// import NotFound from "./pages/NotFound";
// import IconsDemo from "./app/demo/icons/page";

console.log('App.tsx: Starting to load...');

const queryClient = new QueryClient();

const App = () => {
  console.log('App: Rendering component');
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<div>Simple Test Working!</div>} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;