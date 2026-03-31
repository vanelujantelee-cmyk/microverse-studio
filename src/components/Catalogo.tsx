import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const genres = ["Todos", "Terror", "Distopía", "Poesía", "Ciencia Ficción"];

const books = [
  { id: 1, title: "Ecos del Abismo", author: "Camila Ríos", price: "$45.000", genre: "Terror", nuevo: true, cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop" },
  { id: 2, title: "Cenizas del Mañana", author: "Andrés Lozano", price: "$52.000", genre: "Distopía", nuevo: true, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop" },
  { id: 3, title: "Versos de Neón", author: "Lucía Vargas", price: "$38.000", genre: "Poesía", nuevo: false, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop" },
  { id: 4, title: "Órbita Rota", author: "Miguel Torres", price: "$49.000", genre: "Ciencia Ficción", nuevo: true, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop" },
  { id: 5, title: "La Sombra que Habla", author: "Diana Mejía", price: "$42.000", genre: "Terror", nuevo: false, cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=400&fit=crop" },
  { id: 6, title: "Futuro Imperfecto", author: "Sebastián Cano", price: "$55.000", genre: "Distopía", nuevo: false, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop" },
];

const Catalogo = () => {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? books : books.filter((b) => b.genre === filter);

  return (
    <section id="catalogo" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Nuestro <span className="text-gradient">Catálogo</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-10">Descubre las voces que están transformando la literatura colombiana.</p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`rounded-2xl px-5 py-2 text-sm font-semibold transition-all ${
                filter === g
                  ? "bg-primary text-primary-foreground glow-shadow"
                  : "bg-surface text-foreground/70 hover:bg-muted"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl bg-surface border border-border overflow-hidden transition-shadow duration-300 hover:glow-shadow-hover"
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {book.nuevo && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-none">
                    Nuevo
                  </Badge>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{book.price}</span>
                  <a
                    href={`https://wa.me/573001234567?text=Hola, quiero comprar "${book.title}"`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-accent-hover transition-colors"
                  >
                    <MessageCircle size={16} />
                    Comprar
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
