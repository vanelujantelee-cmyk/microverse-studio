import React from "react";
import { motion } from "framer-motion";
import { Link as LinkIcon, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const tiposObra = ["Novela", "Cuento", "Poesía", "Ensayo", "No ficción", "Otro"];

const Contacto = () => {
  return (
    <section id="contacto" className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-2xl">
        {/* Título de la sección */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-12 uppercase italic tracking-tighter"
        >
          <span className="text-white">Envía tu</span> <span className="text-purple-500">Obra</span>
        </motion.h2>

        <motion.form
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);

            try {
              const response = await fetch("https://formspree.io/f/maqlbywz", {
                method: "POST",
                body: formData,
                headers: {
                  'Accept': 'application/json'
                }
              });

              if (response.ok) {
                alert("¡Propuesta enviada con éxito a Microcosmos! Revisaremos tu enlace pronto.");
                form.reset();
              } else {
                const data = await response.json() as { error?: string };
                alert(data.error || "Error al enviar. Intenta de nuevo.");
              }
            } catch (error) {
              alert("Hubo un problema de conexión. Intenta de nuevo, Luis.");
            }
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 p-8 md:p-12 shadow-2xl backdrop-blur-sm"
        >
          {/* Nombre */}
          <div>
            <label className="mb-2 block text-[10px] font-black uppercase text-purple-500 tracking-widest">Nombre del Autor</label>
            <Input 
              name="nombre" 
              placeholder="Tu nombre artístico o real" 
              className="rounded-2xl bg-black/50 border-white/10 text-white h-12 focus:border-purple-500 transition-all" 
              required 
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-[10px] font-black uppercase text-purple-500 tracking-widest">Correo de Contacto</label>
            <Input 
              name="email" 
              type="email" 
              placeholder="editorial@ejemplo.com" 
              className="rounded-2xl bg-black/50 border-white/10 text-white h-12 focus:border-purple-500 transition-all" 
              required 
            />
          </div>

          {/* Tipo de obra */}
          <div>
            <label className="mb-2 block text-[10px] font-black uppercase text-purple-500 tracking-widest">Género Literario</label>
            <div className="relative">
              <select 
                name="tipo_obra" 
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-purple-500 transition-all appearance-none"
                required
              >
                <option value="" className="bg-zinc-900">Selecciona el género</option>
                {tiposObra.map((t) => (
                  <option key={t} value={t} className="bg-zinc-900">{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sinopsis */}
          <div>
            <label className="mb-2 block text-[10px] font-black uppercase text-purple-500 tracking-widest">Breve Sinopsis</label>
            <Textarea 
              name="sinopsis" 
              placeholder="¿De qué trata tu historia?" 
              rows={4} 
              className="rounded-2xl bg-black/50 border-white/10 text-white focus:border-purple-500 transition-all resize-none" 
              required 
            />
          </div>

          {/* Link al Manuscrito */}
          <div className="p-6 bg-purple-500/5 rounded-3xl border border-purple-500/10">
            <label className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase text-purple-500 tracking-widest">
              <LinkIcon size={14} /> Link del Manuscrito (Drive / Dropbox)
            </label>
            <Input 
              name="link_manuscrito" 
              type="url" 
              placeholder="https://drive.google.com/..." 
              className="rounded-xl bg-black/60 border-white/10 text-white h-12 focus:border-purple-500 transition-all mb-2" 
              required 
            />
            <p className="text-[9px] text-gray-500 uppercase italic leading-tight">
              * Asegúrate de que el enlace sea público para que podamos leerlo.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 rounded-full bg-white py-5 font-black text-black uppercase text-[10px] tracking-[0.4em] hover:bg-purple-500 hover:text-white transition-all hover:scale-[1.02] active:scale-95 shadow-xl group"
          >
            Enviar a Microcosmos <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contacto;