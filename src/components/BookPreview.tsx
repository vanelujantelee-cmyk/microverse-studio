import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookPreview = ({ pages }: { pages: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % pages.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + pages.length) % pages.length);

  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-[3/4] bg-zinc-900 rounded-lg overflow-hidden shadow-2xl border border-white/10">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={pages[currentIndex]}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
          alt={`Página ${currentIndex + 1}`}
        />
      </AnimatePresence>

      {/* Controles */}
      <div className="absolute inset-y-0 left-0 flex items-center p-2">
        <button onClick={prev} className="p-2 rounded-full bg-black/50 text-white hover:bg-primary transition-colors">
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center p-2">
        <button onClick={next} className="p-2 rounded-full bg-black/50 text-white hover:bg-primary transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Indicador de página */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-[10px] font-mono text-white tracking-widest uppercase">
        Página {currentIndex + 1} / {pages.length}
      </div>
    </div>
  );
};

export default BookPreview;