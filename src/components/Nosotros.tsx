import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const values = [
  { icon: Target, title: "Misión", text: "Democratizar la publicación literaria en Colombia, ofreciendo servicios editoriales de alta calidad que potencien la voz de cada autor." },
  { icon: Eye, title: "Visión", text: "Ser la editorial independiente líder en Latinoamérica, reconocida por descubrir nuevos talentos y transformar manuscritos en obras memorables." },
  { icon: Heart, title: "Valores", text: "Creatividad, excelencia, inclusión y pasión por las historias que merecen ser contadas." },
];

const Nosotros = () => (
  <section id="nosotros" className="py-24 px-4">
    <div className="container mx-auto max-w-4xl">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-4"
      >
        Sobre <span className="text-gradient">Nosotros</span>
      </motion.h2>
      <p className="text-center text-muted-foreground mb-12">
        Desde Medellín para el mundo, construimos puentes entre escritores y lectores.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl bg-surface border border-border p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <v.icon size={24} />
            </div>
            <h3 className="text-lg font-bold mb-3">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Nosotros;
