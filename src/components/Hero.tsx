import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20">
      
      {/* --- VIDEO DE FONDO (Estrellas/Partículas) --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 pointer-events-none"
      >
        <source src="/videoplayback.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>

      {/* Capa de degradado para suavizar la integración del video con el fondo negro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-[1]" />

      {/* Luces de fondo sutiles (se mantienen detrás del contenido) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full z-[1]" />

      <div className="container mx-auto px-6 z-10 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 opacity-80">
            Editorial Independiente — Colombia
          </p>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter text-white leading-[0.85] mb-8 select-none">
            Creamos <br /> 
            <span 
              className="text-transparent stroke-white stroke-1 md:stroke-2"
              style={{ WebkitTextStroke: '1.5px white' }}
            >
              historias
            </span> <br />
            
            {/* EFECTO GLITCH */}
            <div className="relative inline-block group cursor-default">
              <motion.span
                className="relative z-10 text-purple-500 block"
                whileHover={{ scale: 1.02 }}
              >
                reales
              </motion.span>
              <span className="absolute top-0 left-0 w-full h-full text-[#ff00ff] opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1 z-0 mix-blend-screen pointer-events-none">
                reales
              </span>
              <span className="absolute top-0 left-0 w-full h-full text-[#00ffff] opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2 z-0 mix-blend-screen pointer-events-none">
                reales
              </span>
            </div>
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-xl font-medium italic mb-12 px-4 leading-relaxed">
            "Donde tus sueños se convierten en páginas. Viajemos juntos en la creación de tu próximo gran libro."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <a href="#contacto" className="group w-full md:w-auto bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-purple-600 hover:text-white transition-all duration-500 shadow-xl">
              Publicar ahora
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
            <a href="#catalogo" className="group w-full md:w-auto bg-zinc-900 text-white border border-white/10 px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:border-purple-500 transition-all duration-500">
              Comprar Libros
              <BookOpen size={18} className="group-hover:scale-110 transition-transform text-purple-500" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;