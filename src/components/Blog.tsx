import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "5 claves para escribir tu primera novela",
    excerpt: "Descubre los secretos que todo escritor principiante necesita conocer antes de enfrentarse a la página en blanco.",
    date: "15 Mar 2026",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
  },
  {
    title: "El auge de la ciencia ficción en Colombia",
    excerpt: "Exploramos cómo los autores colombianos están redefiniendo el género con voces únicas y perspectivas locales.",
    date: "8 Mar 2026",
    image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=400&h=250&fit=crop",
  },
  {
    title: "Guía completa de autoedición 2026",
    excerpt: "Todo lo que necesitas saber sobre ISBN, derechos de autor y distribución en el mercado hispanohablante.",
    date: "1 Mar 2026",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
  },
];

const Blog = () => (
  <section id="blog" className="py-24 px-4 bg-surface/30">
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-4"
      >
        <span className="text-gradient">Blog</span> Literario
      </motion.h2>
      <p className="text-center text-muted-foreground mb-12">
        Noticias, consejos y tendencias del mundo editorial.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-2xl bg-surface border border-border overflow-hidden transition-shadow duration-300 hover:glow-shadow-hover"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-6">
              <span className="text-xs text-muted-foreground">{p.date}</span>
              <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent-hover transition-colors cursor-pointer">
                Leer más <ArrowRight size={14} />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
