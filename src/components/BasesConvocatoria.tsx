import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Users, BookOpen, Scale, CheckCircle2, Trophy } from 'lucide-react';

const BasesConvocatoria: React.FC = () => {
  const navigate = useNavigate();
  const formLink = "https://docs.google.com/forms/d/e/1FAIpQLSeaPc-G8LqPj0Um-FEWwC37g3biIUOnq16swVjgu-bb9YNHaw/viewform?usp=dialog";

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-zinc-900 py-24 px-6">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver
          </button>

          <motion.div {...fadeUp}>
            <p className="text-purple-500 font-bold tracking-[0.3em] text-xs uppercase mb-4">
              Edición Mayo 2026
            </p>
            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none mb-6">
              Convocatoria<br />
              <span className="text-purple-500">Trimestral</span><br />
              de Novela
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
              Editorial Microcosmos abre la recepción de manuscritos inéditos para su evaluación y posible incorporación al plan editorial del segundo semestre de 2026.
            </p>
          </motion.div>

          {/* CTA principal */}
          <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} className="mt-10">
            <a
              href={formLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-purple-600 text-white px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-purple-500 hover:scale-105 transition-all shadow-lg shadow-purple-900/40"
            >
              <Trophy size={20} />
              Quiero publicar gratis
            </a>
          </motion.div>
        </div>
      </div>

      {/* Cronograma */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.section {...fadeUp} className="mb-16">
          <SectionTitle icon={<Calendar size={20} />} title="1. Cronograma" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Apertura', date: '1 mayo 2026' },
              { label: 'Cierre', date: '15 julio 2026', note: '23:59 hora Colombia' },
              { label: 'Evaluación', date: '16 jul – 30 ago 2026' },
              { label: 'Resultados', date: 'Septiembre 2026' },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-5">
                <p className="text-[9px] text-purple-400 font-bold uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-white font-bold text-sm leading-snug">{item.date}</p>
                {item.note && <p className="text-zinc-500 text-[9px] mt-1 uppercase">{item.note}</p>}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Objeto */}
        <motion.section {...fadeUp} className="mb-16">
          <SectionTitle icon={<BookOpen size={20} />} title="2. Objeto y Alcance" />
          <p className="text-zinc-400 leading-relaxed mt-4">
            El propósito de esta convocatoria es identificar obras que demuestren <span className="text-white font-semibold">solidez técnica, unidad estructural y una propuesta narrativa con voz propia</span>, siguiendo los estándares de excelencia que rigen la industria editorial independiente.
          </p>
          <div className="mt-4 p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-zinc-400 text-sm">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">No se aceptan</p>
            Poemarios, ensayos críticos, reportajes periodísticos ni antologías de relatos.
          </div>
        </motion.section>

        {/* Requisitos */}
        <motion.section {...fadeUp} className="mb-16">
          <SectionTitle icon={<Users size={20} />} title="3. Requisitos de Participación" />
          <ul className="mt-6 space-y-3">
            {[
              'Autores de cualquier nacionalidad, sin restricción de residencia.',
              'La obra debe estar escrita originalmente en lengua castellana.',
              'Participación completamente gratuita — sin tarifa de inscripción.',
              'La obra debe ser estrictamente inédita (no publicada en físico, digital, plataformas de autoedición ni blogs personales).',
              'No debe estar comprometida con otra editorial ni pendiente de fallo en otros concursos.',
            ].map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Condiciones del manuscrito */}
        <motion.section {...fadeUp} className="mb-16">
          <SectionTitle icon={<FileText size={20} />} title="4. Condiciones del Manuscrito" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Formato', value: 'Archivo PDF' },
              { label: 'Tipografía', value: 'Times New Roman 12' },
              { label: 'Interlineado', value: 'Doble, páginas numeradas' },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
                <p className="text-[9px] text-purple-400 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-white font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
            El manuscrito debe estar <span className="text-white font-semibold">finalizado</span>, permitiendo una evaluación integral de su estructura.
          </p>
        </motion.section>

        {/* Declaración de autoría */}
        <motion.section {...fadeUp} className="mb-16">
          <SectionTitle icon={<Scale size={20} />} title="5. Declaración de Autoría y Uso de IA" />
          <div className="mt-6 space-y-4 text-zinc-400 text-sm leading-relaxed">
            <p>El autor debe adjuntar una <span className="text-white font-semibold">declaración jurada de autoría y originalidad</span>.</p>
            <div className="p-5 bg-purple-950/30 border border-purple-900/40 rounded-2xl">
              <p className="text-purple-300 text-xs font-bold uppercase tracking-widest mb-2">Política sobre Inteligencia Artificial</p>
              <p>Microcosmos adopta la política de transparencia del Ministerio de Cultura: el uso de herramientas de IA para la generación de contenido <span className="text-white font-semibold">debe ser declarado expresamente</span>. El autor garantiza que el resultado final es producto de su creación humana y exonera a la editorial de cualquier reclamación relacionada con derechos de autor.</p>
            </div>
          </div>
        </motion.section>

        {/* Criterios de evaluación */}
        <motion.section {...fadeUp} className="mb-16">
          <SectionTitle icon={<Trophy size={20} />} title="6. Criterios de Evaluación" />
          <p className="text-zinc-500 text-sm mt-2 mb-6">El comité editorial evaluará los manuscritos bajo los siguientes criterios:</p>
          <div className="space-y-4">
            {[
              { pct: '40%', label: 'Calidad Literaria', desc: 'Limpieza del lenguaje, dominio del ritmo narrativo y construcción de personajes.' },
              { pct: '30%', label: 'Coherencia Estructural', desc: 'Solidez del arco dramático y desarrollo de la trama.' },
              { pct: '30%', label: 'Viabilidad Editorial', desc: 'Originalidad de la propuesta y pertinencia dentro del catálogo actual.' },
            ].map((item) => (
              <div key={item.label} className="flex gap-5 items-start bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
                <span className="text-3xl font-black text-purple-500 shrink-0 w-16 text-center">{item.pct}</span>
                <div>
                  <p className="text-white font-bold uppercase tracking-wide text-xs mb-1">{item.label}</p>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Propiedad intelectual */}
        <motion.section {...fadeUp} className="mb-20">
          <SectionTitle icon={<Scale size={20} />} title="7. Propiedad Intelectual" />
          <div className="mt-4 text-zinc-400 text-sm leading-relaxed space-y-3">
            <p>Los <span className="text-white font-semibold">derechos de autor permanecerán siempre en poder del escritor</span>. En caso de selección, se procederá a la firma de un contrato editorial bajo los términos de ley vigentes.</p>
            <p className="text-zinc-500">Será causal de descalificación automática cualquier indicio de plagio, la presentación de obras ya publicadas o el incumplimiento de los formatos de entrega.</p>
          </div>
        </motion.section>

        {/* CTA final */}
        <motion.div {...fadeUp} className="text-center pb-16">
          <div className="inline-block p-px rounded-full bg-gradient-to-r from-purple-600 to-purple-400">
            <a
              href={formLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-black text-white px-12 py-6 rounded-full font-black text-sm tracking-widest uppercase hover:bg-purple-600 transition-all"
            >
              <Trophy size={20} />
              Quiero publicar gratis
            </a>
          </div>
          <p className="text-zinc-600 text-xs mt-4 uppercase tracking-widest">Convocatoria gratuita · Sin compromisos · Solo talento</p>
        </motion.div>
      </div>
    </div>
  );
};

// Componente auxiliar para los títulos de sección
const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
    <span className="text-purple-500">{icon}</span>
    <h2 className="text-white font-black uppercase tracking-widest text-sm">{title}</h2>
  </div>
);

export default BasesConvocatoria;
