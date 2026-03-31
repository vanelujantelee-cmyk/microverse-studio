import { Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z" />
  </svg>
);

const Footer = () => (
  <footer className="border-t border-border py-12 px-4">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <img src={logo} alt="Microcosmos Editorial" className="h-8" />

      <div className="flex items-center gap-5">
        <a href="https://www.facebook.com/MicrocosmosEditorial" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Facebook size={20} />
        </a>
        <a href="https://www.instagram.com/microcosmoseditorial/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Instagram size={20} />
        </a>
        <a href="https://www.tiktok.com/@microcosmos64?lang=es" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <TikTokIcon />
        </a>
      </div>

      <p className="text-sm text-muted-foreground">© 2026 Editorial Microcosmos - Medellín, Colombia</p>
    </div>
  </footer>
);

export default Footer;
