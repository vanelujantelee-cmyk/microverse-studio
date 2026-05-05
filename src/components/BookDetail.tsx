import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { books } from '../data/books';
import {
  ArrowLeft, ShoppingCart, User, BookOpen, X,
  Play, Pause, Volume2
} from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  const [showFlipbook, setShowFlipbook] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!book) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">Libro no encontrado</h2>
        <button onClick={() => navigate(-1)} className="text-purple-500 hover:underline flex items-center gap-2 uppercase text-xs tracking-widest">
          <ArrowLeft size={20} /> Volver
        </button>
      </div>
    );
  }

  const phoneNumber = "573114917441";
  const message = encodeURIComponent(`Hola Microcosmos. "${book.title}" de ${book.author} me interesa. ¿Cómo lo compro?`);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const val = Number(e.target.value);
    audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
    setProgress(val);
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const pages = book.previewPages || [];

  return (
    <div className="min-h-screen bg-black text-zinc-300">

      {/* Hero */}
      <div className="relative h-[45vh] overflow-hidden">
        <img src={book.image} alt={book.title} className="w-full h-full object-cover scale-110 blur-sm opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 max-w-6xl mx-auto">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest mb-6 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Volver al catálogo
          </button>
          <p className="text-purple-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">{book.category}</p>
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">{book.title}</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Columna izquierda */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspect-[2/3] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(168,85,247,0.2)] border border-white/5">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
              </motion.div>

              <div className="text-3xl font-mono text-white font-black">{book.price}</div>

              <button onClick={handleWhatsAppClick} className="w-full flex items-center justify-center gap-3 py-5 bg-white text-black font-black uppercase tracking-[0.15em] text-xs rounded-2xl hover:bg-purple-600 hover:text-white transition-all shadow-lg">
                <ShoppingCart size={18} /> Lo quiero ya
              </button>

              {pages.length > 0 && (
                <button
                  onClick={() => { setCurrentPage(0); setShowFlipbook(true); }}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-zinc-900 border border-zinc-700 text-white font-black uppercase tracking-[0.15em] text-xs rounded-2xl hover:border-purple-500 hover:text-purple-400 transition-all"
                >
                  <BookOpen size={18} /> Leer un fragmento
                </button>
              )}
            </div>
          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-8 space-y-14">

            <p className="text-2xl text-purple-400 font-black uppercase tracking-widest italic">{book.author}</p>

            <div>
              <h3 className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-xs mb-5 opacity-60">
                <BookOpen size={14} /> Sinopsis
              </h3>
              <p className="text-zinc-300 text-lg leading-relaxed font-light border-l-4 border-purple-500/30 pl-6">{book.synopsis}</p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-[2rem] p-8">
              <h3 className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-xs mb-5">
                <User size={14} /> Sobre el autor
              </h3>
              <p className="text-zinc-400 text-base italic leading-relaxed">{book.authorBio}</p>
            </div>

            {book.audioUrl && (
              <div className="bg-zinc-900/60 border border-purple-500/20 rounded-[2rem] p-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-6">🎙 El autor habla</h3>
                <audio ref={audioRef} src={book.audioUrl} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setPlaying(false)} />
                <div className="flex items-center gap-5">
                  <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white transition-all shrink-0 shadow-lg shadow-purple-900/40">
                    {playing ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
                  </button>
                  <div className="flex-1 space-y-2">
                    <input type="range" min={0} max={100} value={progress} onChange={handleSeek} className="w-full h-1 accent-purple-500 cursor-pointer" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  <Volume2 size={18} className="text-zinc-500 shrink-0" />
                </div>
              </div>
            )}

            <div className="pt-4 text-[10px] text-zinc-700 uppercase tracking-widest border-t border-zinc-900">
              Editorial Microcosmos — Medellín, Colombia
            </div>
          </div>
        </div>
      </div>

      {/* Modal Flipbook — grande y centrado */}
      <AnimatePresence>
        {showFlipbook && pages.length > 0 && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFlipbook(false)} className="absolute inset-0 bg-black/98 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative z-10 flex flex-col items-center px-4">

              <button onClick={() => setShowFlipbook(false)} className="absolute -top-14 right-0 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest">
                <X size={20} /> Cerrar
              </button>

              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-6 font-black">
                {book.title} — Fragmento
              </p>

              {/* @ts-ignore */}
              <HTMLFlipBook
                width={420}
                height={600}
                size="stretch"
                minWidth={280}
                maxWidth={500}
                minHeight={400}
                maxHeight={700}
                showCover={true}
                className="shadow-[0_0_80px_rgba(168,85,247,0.15)]"
                startPage={currentPage}
              >
                {pages.map((page, index) => (
                  <div key={index} className="bg-white w-full h-full">
                    <img src={page} alt={`Página ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </HTMLFlipBook>

              <p className="mt-6 text-zinc-600 text-[10px] uppercase tracking-widest">
                Arrastra las páginas para hojear
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default BookDetail;
