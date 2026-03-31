import { motion } from "framer-motion";
import { BookOpen, Layout, PenTool, Megaphone } from "lucide-react";

const services = [
  { icon: BookOpen, title: "Edición Literaria", desc: "Corrección de estilo y ritmo narrativo." },
  { icon: Layout, title: "Maquetación Pro", desc: "Diseño de interiores para impresión y digital." },
  { icon: PenTool, title: "Diseño de Portadas", desc: "Arte conceptual que vende." },
  { icon: Megaphone, title: "Marketing Editorial", desc: "Publicidad y lanzamiento de booktrailers." },
];

const Servicios = () => (
  <section id="servicios" className="py-24 px-4">
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-4"
      >
        Nuestros <span className="text-gradient">Servicios</span>
      </motion.h2>
      <p className="text-center text-muted-foreground mb-12">
        Todo lo que necesitas para llevar tu obra del manuscrito al lector.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group rounded-2xl bg-surface border border-border p-8 text-center transition-shadow duration-300 hover:glow-shadow-hover"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <s.icon size={28} />
            </div>
            <h3 className="text-lg font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Servicios;
