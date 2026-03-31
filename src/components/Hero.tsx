import { motion } from "framer-motion";

const Hero = () => (
  <section
    id="home"
    className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
  >
    {/* Background glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

    <div className="relative z-10 text-center max-w-3xl">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold leading-tight"
      >
        Tus historias merecen{" "}
        <span className="text-gradient bg-[length:200%_200%] animate-gradient-shift">
          un universo propio
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-6 text-lg text-muted-foreground"
      >
        Editorial Microcosmos: Edición, diseño y distribución profesional en Colombia.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a
          href="#catalogo"
          className="rounded-2xl bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-accent-hover transition-all hover:scale-105"
        >
          Ver Catálogo
        </a>
        <a
          href="#contacto"
          className="rounded-2xl border border-border px-8 py-3 font-semibold text-foreground hover:bg-surface transition-all hover:scale-105"
        >
          Enviar Manuscrito
        </a>
      </motion.div>
    </div>
  </section>
);

export default Hero;
