import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { books } from "../data/books";

const genres = ["Todos", "Terror", "Thriller", "Romance", "Ficción", "Misterio", "Fábulas"];

const Catalogo = () => {
  const [filter, setFilter] = useState("Todos");
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filtered = filter === "Todos" ? books : books.filter((b) => b.category === filter);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="catalogo" className="py-24 bg-black overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-white mb-4">
            Nuestro <span className="text-purple-500">Catálogo</span>
          </h2>
          <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase font-bold">Voces Disruptivas</p>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-3 mb-16 justify-center">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === g
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-zinc-900 text-zinc-500 border border-white/5 hover:border-purple-500/50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* CARRUSEL */}
        <div className="relative group max-w-[1400px] mx-auto px-12">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-[40%] z-50 p-4 bg-purple-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-xl hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            {filtered.map((book) => (
              <motion.div
                key={book.id}
                layout
                className="min-w-[260px] md:min-w-[300px] max-w-[300px] snap-center flex-shrink-0 group/card"
              >
                <div className="relative aspect-[3/4.5] overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 group-hover/card:border-purple-500/50 transition-all duration-500 shadow-2xl">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-md">
                    <button
                      onClick={() => navigate(`/libro/${book.id}`)}
                      className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-purple-500 transition-all"
                    >
                      Explorar Obra
                    </button>
                  </div>
                </div>
                <div
                  className="mt-8 px-4 cursor-pointer"
                  onClick={() => navigate(`/libro/${book.id}`)}
                >
                  <span className="text-purple-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2 block">
                    {book.category}
                  </span>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight group-hover/card:text-purple-500 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1 italic">
                    por <span className="text-zinc-300">{book.author}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-[40%] z-50 p-4 bg-purple-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-xl hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
