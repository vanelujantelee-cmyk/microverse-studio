import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Index from "./pages/Index";
import ReturnPolicy from "./components/ReturnPolicy";
import Catalogo from "./components/Catalogo";
import Servicios from "./components/Servicios";
import Contacto from "./components/Contacto";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Equipo from "./components/Equipo";
import Blog from "./components/Blog";
import Chatbot from "./components/Chatbot";
import BookDetail from "./components/BookDetail";
import Convocatoria from "./components/Convocatoria";
import BasesConvocatoria from "./components/BasesConvocatoria";
import BlogPost from "./components/BlogPost";

// --- COMPONENTE DE TRANSICIÓN SUAVE ---
const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
    transition={{ 
      duration: 0.9, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <main className="bg-black overflow-x-hidden">
            <Index /> 

            <SectionWrapper>
              <Convocatoria />
            </SectionWrapper>

            <SectionWrapper>
              <Catalogo />
            </SectionWrapper>

            <SectionWrapper>
              <Servicios />
            </SectionWrapper>

            <SectionWrapper>
              <Equipo />
            </SectionWrapper>

            <SectionWrapper>
              <Blog />
            </SectionWrapper>

            <SectionWrapper>
              <Contacto />
            </SectionWrapper>
          </main>
        } />

        {/* PÁGINAS INDIVIDUALES */}
        <Route path="/libro/:id" element={<BookDetail />} />
        <Route path="/convocatoria" element={<BasesConvocatoria />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* RUTA PARA GOOGLE MERCHANT */}
        <Route path="/devoluciones" element={<ReturnPolicy />} /> 
      </Routes>
      
      <Chatbot /> 
      <Footer />

      {/* MÉTRICAS DE VERCEL */}
      <Analytics /> 
    </BrowserRouter>
  );
}

export default App;
