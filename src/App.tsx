import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPage2 from "./components/blog/BlogPage2";
import BlogPage3 from "./components/blog/BlogPage3";
import BlogPage4 from "./components/blog/BlogPage4";
import BlogPage5 from "./components/blog/BlogPage5";
import Products from "./pages/Products";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogpage2" element={<BlogPage2 />} />
          <Route path="/blogpage3" element={<BlogPage3 />} />
          <Route path="/blogpage4" element={<BlogPage4 />} />
          <Route path="/blogpage5" element={<BlogPage5 />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
