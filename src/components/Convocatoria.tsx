import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Mic2, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Convocatoria: React.FC = () => {
  const [showTallerModal, setShowTallerModal] = useState(false);
  const [showLecturasModal, setShowLecturasModal] = useState(false);
  const navigate = useNavigate();

  const formTallerLink = "https://forms.gle/Rm8CUucMUowtgBVL7";
  const formLecturasLink = "https://docs.google.com/forms/d/e/1FAIpQLSdRzMPMNGfBQq5WCGCfQ0RoGA4WwDM3cjhMfSWG7eFXiiEB6g/viewform?usp=dialog";

  return (
    <section className="w-full bg-black text-white py-24 px-6 overflow-hidden border-y border-zinc-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4 uppercase"
          >
            APOYO AL <span className="text-purple-500">AUTOR</span>
          </motion.h2>
          <p className="text-zinc-500 italic text-sm md:text-lg max-w-2xl mx-auto">
            En Microcosmos no solo editamos libros, cultivamos sueños.
          </p>
        </div>

        {/* Grid de 3 Botones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Concursos — navega a página propia */}
          <div className="group bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-purple-500 transition-all duration-500 shadow-xl text-center">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform inline-block">🏆</div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">Concursos</h3>
            <p className="text-zinc-400 text-[10px] leading-relaxed mb-6 uppercase tracking-tighter">Convocatoria Trimestral de Novela: Mayo 2026.</p>
            <button
              onClick={() => navigate('/convocatoria')}
              className="w-full bg-white text-black font-black py-4 rounded-2xl text-[10px] tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all uppercase"
            >
              Bases Completas
            </button>
          </div>

          {/* Talleres */}
          <div className="group bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-purple-500 transition-all duration-500 shadow-xl text-center">
            <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform inline-block">✨</div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">Talleres</h3>
            <p className="text-zinc-400 text-[10px] leading-relaxed mb-6 uppercase tracking-tighter">Narrativa transgresora y minimalismo literario.</p>
            <button 
              onClick={() => setShowTallerModal(true)} 
              className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl text-[10px] tracking-[0.2em] hover:bg-purple-700 transition-all uppercase"
            >
              Registrarme
            </button>
          </div>

          {/* Lecturas en Vivo */}
          <div className="group bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-purple-500 transition-all duration-500 shadow-xl text-center">
            <div className="text-4xl mb-4 group-hover:animate-pulse transition-transform inline-block">🎤</div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">Lecturas</h3>
            <p className="text-zinc-400 text-[10px] leading-relaxed mb-6 uppercase tracking-tighter">¿Quieres que editemos tu texto en vivo?</p>
            <button 
              onClick={() => setShowLecturasModal(true)}
              className="w-full bg-zinc-800 text-white font-black py-4 rounded-2xl text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase"
            >
              Postular Texto
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PARA TALLERES */}
      <AnimatePresence>
        {showTallerModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTallerModal(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-zinc-950 border border-purple-500/30 p-10 rounded-[2.5rem] max-w-xl w-full shadow-2xl text-center">
              <button onClick={() => setShowTallerModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={24} /></button>
              <div className="inline-flex p-4 bg-purple-500/10 rounded-full text-purple-500 mb-6"><Sparkles size={32} /></div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Taller de <span className="text-purple-500">Corrección</span></h3>
              <p className="text-gray-400 mb-8 leading-relaxed">Aprende a pulir tus textos bajo estándares profesionales. Viernes o Sábados — 7:00 PM.</p>
              <a href={formTallerLink} target="_blank" rel="noreferrer" className="w-full inline-block bg-purple-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-purple-500 transition-all">Registrarme Ahora</a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL PARA LECTURAS EN VIVO */}
      <AnimatePresence>
        {showLecturasModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowLecturasModal(false)} 
              className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="relative bg-zinc-950 border border-purple-500/30 p-10 rounded-[2.5rem] max-w-xl w-full shadow-2xl text-center"
            >
              <button onClick={() => setShowLecturasModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <div className="inline-flex p-4 bg-purple-500/10 rounded-full text-purple-500 mb-6">
                <Mic2 size={32} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Lecturas <span className="text-purple-500">en Vivo</span></h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Todos los <span className="text-white font-bold underline">miércoles</span> leemos un capítulo o un cuento de nuestros autores y lo <span className="text-white font-bold">editamos en vivo</span>. ¡Una oportunidad única para ver el proceso editorial desde adentro!
              </p>
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-purple-400 font-bold uppercase mb-1">Cita Semanal</p>
                  <p className="text-sm font-bold text-white uppercase tracking-widest">Miércoles de Edición Directa</p>
                </div>
              </div>
              <a 
                href={formLecturasLink} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full inline-flex items-center justify-center gap-3 bg-zinc-100 text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all hover:scale-[1.02]"
              >
                <MessageCircle size={20} /> Enviar mi texto para lectura
              </a>
              <p className="mt-6 text-[10px] text-gray-600 uppercase font-medium">Sujeto a selección según cronograma semanal</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Convocatoria;
