import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom"; // IMPORTANTE: Para que funcione el link interno

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z" />
  </svg>
);

const Footer = () => (
  <footer className="border-t border-white/10 py-16 md:py-12 px-6 bg-[#0a0a0a]">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-8 text-center md:text-left">
      
      {/* Logo o Nombre - Estética Microcosmos */}
      <div className="text-sm font-black uppercase tracking-[0.4em] text-white md:text-base italic">
        Microcosmos <span className="text-[#a855f7] not-italic">Editorial</span>
      </div>

      {/* Redes Sociales con tus links oficiales */}
      <div className="flex items-center gap-10 md:gap-8">
        <a 
          href="https://www.facebook.com/MicrocosmosEditorial" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-[#a855f7] transition-all duration-300 transform hover:scale-110"
        >
          <Facebook size={22} />
        </a>
        <a 
          href="https://www.instagram.com/microcosmoseditorial/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-[#a855f7] transition-all duration-300 transform hover:scale-110"
        >
          <Instagram size={22} />
        </a>
        <a 
          href="https://www.tiktok.com/@microcosmos64?lang=es" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-[#a855f7] transition-all duration-300 transform hover:scale-110"
        >
          <TikTokIcon />
        </a>
      </div>

      {/* Copyright y Link Legal */}
      <div className="flex flex-col gap-2 items-center md:items-end">
        <p className="text-[10px] md:text-xs text-gray-500 font-sans uppercase tracking-widest opacity-60">
          © 2026 Editorial Microcosmos — Medellín, Colombia
        </p>
        
        {/* LINK PARA GOOGLE MERCHANT CENTER */}
        <Link 
          to="/devoluciones" 
          className="text-[9px] md:text-[10px] text-zinc-600 hover:text-[#a855f7] uppercase tracking-[0.2em] transition-colors duration-300"
        >
          Política de Devoluciones
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;