import { motion } from "framer-motion";
import { ArrowRight, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogPosts as posts } from "./blogs";
import { useAuth } from "../context/AuthContext";

const Blog = () => {
  const navigate = useNavigate();
  const { user, openAuth, openDashboard } = useAuth();

  return (
    <section id="blog" className="py-20 md:py-32 bg-black text-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* TÍTULO CON FIX PARA LA G */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[1.2] pb-10">
            BLO<span className="text-purple-500 inline-block pb-2">G</span> LITERARIO
          </h2>
          <p className="text-zinc-500 uppercase text-[10px] md:text-xs tracking-[0.4em] -mt-8">
            Micro-relatos y crónicas del universo Microcosmos
          </p>
        </div>

        {/* CTA para escribir en el blog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 relative rounded-3xl overflow-hidden border border-purple-500/30 p-8 text-center"
          style={{ background: "linear-gradient(135deg, rgba(88,28,135,0.25) 0%, rgba(0,0,0,0.9) 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.2) 0%, transparent 70%)" }} />
          <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] mb-3 relative">Comunidad Microcosmos</p>
          <h3 className="text-3xl md:text-5xl font-black uppercase text-white leading-tight mb-4 relative">
            Escribe.<br/><span className="text-purple-400">Publica.</span> Sé leído.
          </h3>
          <p className="text-zinc-400 text-base max-w-lg mx-auto mb-2 relative">
            Cada palabra que escribes tiene el poder de cambiar una vida. La nuestra cambió con la tuya.
            Publica tu relato, cuento o crónica en nuestro blog literario.
          </p>
          <p className="text-zinc-600 text-sm mb-6 relative">Solo $1 USD · $10.000 COP por publicación</p>
          <button
            onClick={() => { user ? openDashboard() : openAuth(); }}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95 relative"
            style={{ boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
          >
            <PenLine size={16} /> Quiero publicar
          </button>
        </motion.div>

        {/* GRID DE BLOGS: Forzado a 2 columnas en escritorio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="group bg-zinc-900/30 border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all flex flex-col h-full"
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold border border-white/10">
                  {post.date}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-4 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-base mb-8 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-purple-500">
                  Leer ahora <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;