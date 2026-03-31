import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Inicio", anchor: "#home" },
  { name: "Catálogo", anchor: "#catalogo" },
  { name: "Servicios", anchor: "#servicios" },
  { name: "Blog", anchor: "#blog" },
  { name: "Nosotros", anchor: "#nosotros" },
  { name: "Contáctanos", anchor: "#contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass glow-shadow" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home">
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground md:text-base">
            Microcosmos Editorial
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.anchor}
              href={l.anchor}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-2xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-accent-hover transition-colors"
          >
            Publicar Ahora
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass border-t border-border px-4 pb-4"
        >
          {links.map((l) => (
            <a
              key={l.anchor}
              href={l.anchor}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm text-foreground/80 hover:text-foreground border-b border-border"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block rounded-2xl bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground"
          >
            Publicar Ahora
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
