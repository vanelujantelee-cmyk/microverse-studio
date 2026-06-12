import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import UserDashboard from "./components/UserDashboard";
import Index from "./pages/Index";
import ReturnPolicy from "./components/ReturnPolicy";
import Catalogo from "./components/Catalogo";
import Contacto from "./components/Contacto";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Equipo from "./components/Equipo";
import Chatbot from "./components/Chatbot";
import BookDetail from "./components/BookDetail";
import Convocatoria from "./components/Convocatoria";
import BasesConvocatoria from "./components/BasesConvocatoria";
import BlogPost from "./components/BlogPost";
import BlogMain from "./components/BlogMain";
import AuthorPortal from "./AuthorPortal";
import AdminPortal from "./AdminPortal";
import ServiciosPage from "./pages/ServiciosPage";
import SectionDivider from "./components/SectionDivider";
import SecretSection from "./components/SecretSection";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(6px)",
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const SectionWrapper = ({
  children,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
}) => (
  <motion.div
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-8% 0px" }}
  >
    {children}
  </motion.div>
);

const PORTAL_ROUTES = ["/autores", "/admin"];

function AppLayout() {
  const { pathname } = useLocation();
  const isPortal = PORTAL_ROUTES.some(r => pathname.startsWith(r));

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      {!isPortal && <Navbar />}
      <Routes>
        <Route path="/" element={
          <main className="flex-1">
            <Index />
            <SectionDivider label="CATÁLOGO" sublabel="Voces Disruptivas" />
            <SectionWrapper direction="left"><Catalogo /></SectionWrapper>
            <SectionDivider label="CONVOCATORIA" sublabel="Abre tu obra al mundo" />
            <SectionWrapper direction="right"><Convocatoria /></SectionWrapper>
            <SectionDivider label="EQUIPO" sublabel="Quiénes somos" />
            <SectionWrapper direction="left"><Equipo /></SectionWrapper>
            <SectionDivider label="CONTACTO" sublabel="Envía tu manuscrito" />
            <SectionWrapper direction="right"><Contacto /></SectionWrapper>
          </main>
        } />
        <Route path="/blog-comunidad" element={<BlogMain />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/libro/:id" element={<BookDetail />} />
        <Route path="/convocatoria" element={<BasesConvocatoria />} />
        <Route path="/devoluciones" element={<ReturnPolicy />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/autores" element={<AuthorPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
      {!isPortal && <SecretSection />}
      {!isPortal && <Chatbot />}
      {!isPortal && <Footer />}
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppLayout />
        <AuthModal />
        <UserDashboard />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;