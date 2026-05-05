import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Rocket, ShieldCheck, Printer, MessageCircle, X, CheckCircle2, Sparkles } from "lucide-react";

const serviciosDetallados = [
  {
    id: "diagnostico",
    title: "Diagnóstico Literario",
    icon: <BookOpen className="w-8 h-8" />,
    shortDesc: "Radiografía profunda de tu manuscrito por editores profesionales.",
    longDesc: "No enviamos una opinión, entregamos una hoja de ruta. Tu obra será sometida a un escaneo técnico para identificar su verdadero potencial comercial y literario.",
    puntos: [
      "Informe de lectura profesional (Mapa de Trama)",
      "Corrección ortotipográfica y gramatical completa",
      "Análisis de curva de atención y ritmo narrativo",
      "Detección de inconsistencias lógicas en el universo",
      "Evaluación de 'Marketability' (Potencial de venta)",
      "Sugerencias de reestructuración de capítulos",
      "Entrevista 1 a 1 con el editor para feedback directo"
    ]
  },
  {
    id: "incubadora",
    title: "Incubadora de Autores",
    icon: <Rocket className="w-8 h-8" />,
    shortDesc: "Acompañamiento creativo desde la idea hasta el borrador final.",
    longDesc: "El gimnasio de alto rendimiento para escritores. Si tu historia está estancada o quieres empezar con el pie derecho, aquí es donde la pulimos hasta que brille.",
    puntos: [
      "Mentorías de estructura (Inicio, Nudo y Desenlace)",
      "Clínica de Personajes: Arquetipos, voz y evolución",
      "Sesiones de 'Ghostwriting' y co-creación creativa",
      "Técnicas de desbloqueo narrativo personalizadas",
      "Ejercicios de estilo para encontrar tu voz propia",
      "Seguimiento semanal de metas de escritura",
      "Acceso a la comunidad privada de autores Microcosmos"
    ]
  },
  {
    id: "apoyo",
    title: "Apoyo Continuo & Gestión",
    icon: <ShieldCheck className="w-8 h-8" />,
    shortDesc: "La infraestructura legal y técnica que tu libro necesita.",
    longDesc: "Nosotros nos encargamos del 'trabajo sucio' y burocrático para que tú no dejes de escribir. Tu libro estará protegido y listo para las grandes ligas.",
    puntos: [
      "Gestión de ISBN ante la Cámara del Libro",
      "Trámite de Depósito Legal (Biblioteca Nacional)",
      "Registro de Derechos de Autor (Protección Legal)",
      "Talleres avanzados: 'Anatomía del Golpe' y más",
      "Curaduría técnica para concursos nacionales",
      "Asesoría en contratos de edición y distribución",
      "Diseño de biografía y kit de prensa para el autor"
    ]
  }
];

const preciosImprenta = [
  { cantidad: "1-25 libros", precio: "$60.000 c/u" },
  { cantidad: "25-50 libros", precio: "$55.000 c/u" },
  { cantidad: "50-75 libros", precio: "$50.000 c/u" },
  { cantidad: "75-100 libros", precio: "$45.000 c/u" }
];

const Servicios = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isTallerOpen, setIsTallerOpen] = useState(false); // Nuevo estado para el taller
  const WHATSAPP_LINK = "https://wa.me/573114917441"; 
  const TALLER_LINK = "https://forms.gle/Rm8CUucMUowtgBVL7"; // Tu link de registro

  return (
    <section id="servicios" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-4 uppercase tracking-tighter italic">Ecosistema <span className="text-purple-500">Editorial</span></h2>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto uppercase text-xs tracking-[0.3em]">Transformamos manuscritos en legados literarios</p>

        {/* --- GRID DE SERVICIOS --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-24 text-left">
          {serviciosDetallados.map((s) => (
            <motion.div 
              key={s.id}
              layoutId={s.id}
              onClick={() => setSelectedId(s.id)}
              className="p-10 border border-white/10 bg-white/5 rounded-[2rem] cursor-pointer hover:border-purple-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
                <h3 className="text-2xl font-black mb-4 uppercase leading-none">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.shortDesc}</p>
              </div>
              <button className="mt-8 text-[10px] text-purple-400 font-black uppercase tracking-[0.2em] border-b border-purple-500/30 pb-1 self-start">Explorar Servicio +</button>
            </motion.div>
          ))}
        </div>

        {/* --- BOTÓN ESPECIAL TALLERES (Trigger para el Pop-up) --- */}
        <div className="mb-24">
            <button 
                onClick={() => setIsTallerOpen(true)}
                className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-2xl"
            >
                <Sparkles className="animate-pulse" />
                Registrarme en Talleres de los Sábados
            </button>
        </div>

        {/* --- SECCIÓN IMPRENTA --- */}
        <div className="max-w-5xl mx-auto p-12 border-2 border-white/10 bg-white/5 rounded-[3rem] text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Printer className="text-purple-500 w-8 h-8" />
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Manufactura de Élite</span>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter">Imprenta Bajo Demanda</h3>
            </div>
            <p className="text-gray-500 text-sm max-w-sm italic">"El autor conserva el 100% de los derechos. Calidad de librería desde un ejemplar."</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
            {preciosImprenta.map((p, i) => (
              <div key={i} className="p-6 border border-white/10 rounded-3xl bg-black/40 hover:border-purple-500/30 transition-colors">
                <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest">{p.cantidad}</div>
                <div className="text-2xl font-bold text-purple-400">{p.precio}</div>
              </div>
            ))}
          </div>

          <div className="bg-purple-600/10 p-8 rounded-[2rem] border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-black uppercase text-sm mb-1">Combo Autor Microcosmos</h4>
              <p className="text-xs text-gray-400">Maquetación + Portada + Separadores + Stickers: <span className="text-white font-bold">$200.000</span></p>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all flex items-center gap-3">
              <MessageCircle size={18} /> Cotizar Producción
            </a>
          </div>
        </div>

        {/* --- MODAL DETALLE SERVICIOS (EXISTENTE) --- */}
        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
              <motion.div layoutId={selectedId} className="relative bg-zinc-900 border border-white/20 p-10 md:p-16 rounded-[3rem] max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh] text-left">
                <button onClick={() => setSelectedId(null)} className="absolute top-10 right-10 text-gray-500 hover:text-white"><X size={32} /></button>
                <div className="text-purple-500 mb-8">{serviciosDetallados.find(s => s.id === selectedId)?.icon}</div>
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">{serviciosDetallados.find(s => s.id === selectedId)?.title}</h3>
                <p className="text-gray-300 text-xl leading-relaxed mb-10 font-light italic">"{serviciosDetallados.find(s => s.id === selectedId)?.longDesc}"</p>
                <div className="grid md:grid-cols-1 gap-4 mb-12">
                  {serviciosDetallados.find(s => s.id === selectedId)?.puntos.map((punto, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <CheckCircle2 className="text-purple-500 shrink-0" size={24} />
                      <span className="text-gray-300 font-medium">{punto}</span>
                    </div>
                  ))}
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform">
                  <MessageCircle size={24} /> Solicitar Cotización Personalizada
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- NUEVO MODAL PARA TALLERES --- */}
        <AnimatePresence>
          {isTallerOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsTallerOpen(false)} 
                className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }} 
                className="relative bg-zinc-950 border border-purple-500/30 p-10 rounded-[2.5rem] max-w-xl w-full shadow-[0_0_50px_rgba(168,85,247,0.15)] text-center"
              >
                <button onClick={() => setIsTallerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
                
                <div className="inline-flex p-4 bg-purple-500/10 rounded-full text-purple-500 mb-6">
                    <Sparkles size={32} />
                </div>
                
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Taller de <span className="text-purple-500">Corrección y Edición</span></h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Aprende a pulir tus textos bajo estándares editoriales profesionales. Descubre cómo transformar tus borradores en obras finales disruptivas.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-purple-400 font-bold uppercase mb-1">Horario Único</p>
                        <p className="text-sm font-bold text-white">Viernes 7:00 PM o Sábados 7:00 PM</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center">
                        <p className="text-sm font-bold text-white">Formato Virtual En Vivo</p>
                    </div>
                </div>

                <a 
                    href={TALLER_LINK} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full inline-flex items-center justify-center gap-3 bg-purple-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-purple-500 transition-all hover:scale-[1.02]"
                >
                  <CheckCircle2 size={20} /> Registrarme Ahora
                </a>
                
                <p className="mt-6 text-[10px] text-gray-600 uppercase font-medium">Link de registro único para ambas sesiones</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Servicios;