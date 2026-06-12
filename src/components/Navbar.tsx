import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronRight, User, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ── Space orbit SVG icon ─────────────────────────────── */
const OrbitIcon = ({ open }: { open: boolean }) => (
  <motion.svg
    width="28" height="28" viewBox="0 0 28 28" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    {open ? (
      /* X to close */
      <>
        <motion.line x1="6" y1="6" x2="22" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
        <motion.line x1="22" y1="6" x2="6" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.05 }} />
      </>
    ) : (
      /* Planet with rings */
      <>
        {/* Planet core */}
        <circle cx="14" cy="14" r="4.5" fill="white" />
        {/* Outer ring ellipse */}
        <ellipse cx="14" cy="14" rx="10" ry="4" stroke="rgba(168,85,247,0.9)" strokeWidth="1.5" fill="none" />
        {/* Small orbit dot */}
        <circle cx="24" cy="14" r="1.5" fill="#a855f7" />
        {/* Inner orbit */}
        <ellipse cx="14" cy="14" rx="6.5" ry="2.5" stroke="rgba(168,85,247,0.4)" strokeWidth="1" fill="none" />
      </>
    )}
  </motion.svg>
);

const links = [
  { name: "Inicio", isAnchor: true, anchor: "#home", path: "/" },
  { name: "Catálogo", isAnchor: true, anchor: "#catalogo", path: "/" },
  { name: "Imprenta", isAnchor: false, path: "/imprenta.html", isExternal: true },
  { name: "Servicios", isAnchor: false, path: "/servicios" },
  { name: "Equipo", isAnchor: true, anchor: "#equipo", path: "/" },
  { name: "Blog", isAnchor: false, path: "/blog-comunidad" },
  { name: "Contacto", isAnchor: true, anchor: "#contacto", path: "/" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, openAuth, openDashboard } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  const handleNavClick = (l: typeof links[0]) => {
    setOpen(false);
    if (l.isAnchor) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(l.anchor!)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        setTimeout(() => {
          document.querySelector(l.anchor!)?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-gradient-to-r from-purple-700 via-purple-400 to-violet-500 origin-left"
      />

      {/* Logo — top left, always visible */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-5 md:left-8 z-[190]"
      >
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl border border-white/10 group-hover:border-purple-500/60 transition-all duration-500 group-hover:rotate-3 transform">
            <img src="/portadas/logo.jpg" alt="Microcosmos Editorial" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-white">Microcosmos</span>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-purple-500 italic">Editorial</span>
          </div>
        </Link>
      </motion.div>

      {/* Login / User button — top right, left of orbit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 right-20 md:right-24 z-[200]"
      >
        <button
          onClick={() => user ? openDashboard() : openAuth()}
          className="h-12 px-4 rounded-full flex items-center gap-2 transition-all duration-300 font-black uppercase text-[10px] tracking-widest"
          style={{
            background: user ? "rgba(88,28,135,0.7)" : "rgba(0,0,0,0.6)",
            border: "1px solid rgba(168,85,247,0.4)",
            backdropFilter: "blur(12px)",
            color: user ? "#e9d5ff" : "rgba(255,255,255,0.7)",
            boxShadow: user ? "0 0 20px rgba(168,85,247,0.3)" : "none",
          }}
        >
          {user ? (
            <>
              <User size={14} />
              <span className="hidden md:inline">{user.user_metadata?.full_name?.split(" ")[0] || "Mi cuenta"}</span>
            </>
          ) : (
            <>
              <LogIn size={14} />
              <span className="hidden md:inline">Ingresar</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Floating orbit button — top right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-5 md:right-8 z-[200] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: open
            ? "rgba(88,28,135,0.95)"
            : "rgba(0,0,0,0.6)",
          border: "1px solid rgba(168,85,247,0.4)",
          backdropFilter: "blur(12px)",
          boxShadow: open
            ? "0 0 32px rgba(168,85,247,0.5), 0 0 60px rgba(168,85,247,0.2)"
            : "0 0 20px rgba(168,85,247,0.2)",
        }}
        whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(168,85,247,0.5)" }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        <OrbitIcon open={open} />
      </motion.button>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[180] flex flex-col justify-center items-start px-10 md:px-24"
            style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Background nebula glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div style={{
                position: "absolute", top: "20%", right: "10%",
                width: "40vw", height: "40vw", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(88,28,135,0.18) 0%, transparent 70%)",
                filter: "blur(60px)",
              }} />
              <div style={{
                position: "absolute", bottom: "10%", left: "5%",
                width: "30vw", height: "30vw", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
                filter: "blur(80px)",
              }} />
            </div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-purple-500/60 text-[10px] font-black uppercase tracking-[0.5em] mb-10"
            >
              Navegar
            </motion.p>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 w-full">
              {links.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.isAnchor ? (
                    <button
                      onClick={() => handleNavClick(l)}
                      className="group flex items-center gap-4 py-3 w-full text-left"
                    >
                      <span className="text-purple-500/40 text-xs font-black w-6 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-black uppercase italic tracking-tight text-white/70 group-hover:text-white transition-all duration-200"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
                      >
                        {l.name}
                      </span>
                      <ChevronRight size={20} className="text-purple-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    </button>
                  ) : (l as any).isExternal ? (
                    <a
                      href={l.path}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 py-3 w-full"
                    >
                      <span className="text-amber-500/50 text-xs font-black w-6 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-black uppercase italic tracking-tight text-amber-400/80 group-hover:text-amber-300 transition-all duration-200"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
                      >
                        {l.name}
                      </span>
                      <span className="text-amber-500/50 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-200 ml-1">↗</span>
                    </a>
                  ) : (
                    <Link
                      to={l.path}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 py-3 w-full"
                    >
                      <span className="text-purple-500/40 text-xs font-black w-6 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-black uppercase italic tracking-tight text-white/70 group-hover:text-white transition-all duration-200"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
                      >
                        {l.name}
                      </span>
                      <ChevronRight size={20} className="text-purple-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Autores link */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + links.length * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/autores"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 py-3 w-full mt-4 border-t border-purple-500/20"
                >
                  <span className="text-purple-500/40 text-xs font-black w-6">★</span>
                  <span
                    className="font-black uppercase italic tracking-tight text-purple-400 group-hover:text-purple-300 transition-all duration-200"
                    style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1 }}
                  >
                    Acceso Autores
                  </span>
                  <ChevronRight size={18} className="text-purple-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              </motion.div>
            </nav>

            {/* CTA at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12"
            >
              <button
                onClick={() => handleNavClick({ name: "Contacto", isAnchor: true, anchor: "#contacto", path: "/" })}
                className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
                style={{ boxShadow: "0 0 30px rgba(168,85,247,0.3)" }}
              >
                Publicar ahora
                <ChevronRight size={16} />
              </button>
            </motion.div>

            {/* Orbit particles decoration */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: i % 2 === 0 ? 2 : 1,
                  height: i % 2 === 0 ? 2 : 1,
                  right: `${15 + i * 8}%`,
                  top: `${20 + i * 12}%`,
                  background: i % 2 === 0 ? "#a855f7" : "#7c3aed",
                }}
                animate={{ y: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
