import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogPosts as posts } from "./blogs";

const Blog = () => {
  const navigate = useNavigate();

  return (
    <section id="blog" className="py-20 md:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
            Blog <span className="text-purple-500">Literario</span>
          </h2>
          <p className="text-zinc-500 uppercase text-[9px] md:text-xs tracking-[0.3em]">
            Micro-relatos y crónicas del universo Microcosmos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="group bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-purple-500/40 transition-all backdrop-blur-sm"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
                  {post.date}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight mb-4 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">
                  Leer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
