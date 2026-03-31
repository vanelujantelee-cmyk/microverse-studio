import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalogo from "@/components/Catalogo";
import Servicios from "@/components/Servicios";
import Blog from "@/components/Blog";
import Nosotros from "@/components/Nosotros";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <Hero />
    <Catalogo />
    <Servicios />
    <Blog />
    <Nosotros />
    <Contacto />
    <Footer />
  </div>
);

export default Index;
