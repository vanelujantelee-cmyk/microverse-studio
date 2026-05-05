import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const links = [
  { name: "Inicio", anchor: "#home" },
  { name: "Catálogo", anchor: "#catalogo" },
  { name: "Servicios", anchor: "#servicios" },
  { name: "Equipo", anchor: "#Equipo" },
  { name: "Blog", anchor: "#blog" },
  { name: "Contacto", anchor: "#contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        
        {/* LOGO ACTUALIZADO */}
        <a href="#home" className="flex items-center gap-4 group z-[110]">
          <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-xl border border-white/10 group-hover:border-purple-500/50 transition-all duration-500 transform group-hover:rotate-3">
            <img 
              src="/portadas/logo.jpg" 
              alt="Microcosmos Editorial Logo" 
              className="w-full h-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-black uppercase tracking-[0.3em] leading-none text-white">
              Microcosmos
            </span>
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] text-purple-500 italic">
              Editorial
            </span>
          </div>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.anchor}
              href={l.anchor}
              className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all relative group"
            >
              {l.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-500 transition-all group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contacto"
            className="ml-4 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
          >
            Publicar ahora
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="lg:hidden text-white p-2 z-[110] transition-transform active:scale-90"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-screen bg-black z-[100] flex flex-col justify-center p-8 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((l, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  key={l.anchor}
                  href={l.anchor}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-white/5 py-6 text-2xl font-black uppercase tracking-tighter text-white/80 hover:text-purple-500"
                >
                  {l.name}
                  <ChevronRight size={24} className="text-purple-500" />
                </motion.a>
              ))}
              
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                className="mt-8 w-full bg-purple-600 text-white py-6 rounded-2xl text-center text-xs font-black uppercase tracking-[0.3em]"
              >
                Empezar proyecto
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;