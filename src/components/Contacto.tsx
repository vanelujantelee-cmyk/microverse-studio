import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const tiposObra = ["Novela", "Cuento", "Poesía", "Ensayo", "No ficción", "Otro"];

const Contacto = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((f: File) => {
    setFile(f);
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 200);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) simulateUpload(f);
    },
    [simulateUpload]
  );

  return (
    <section id="contacto" className="py-24 px-4 bg-surface/30">
      <div className="container mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          <span className="text-gradient">Contáctanos</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-12">
          ¿Tienes un manuscrito listo? Envíanos tu propuesta y haremos realidad tu libro.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5 rounded-2xl bg-surface border border-border p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Nombre completo</label>
            <Input placeholder="Tu nombre" className="rounded-2xl bg-background border-border" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Email</label>
            <Input type="email" placeholder="correo@ejemplo.com" className="rounded-2xl bg-background border-border" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Tipo de obra</label>
            <select className="w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
              <option value="">Selecciona una opción</option>
              {tiposObra.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Sinopsis</label>
            <Textarea placeholder="Cuéntanos de qué trata tu obra..." rows={4} className="rounded-2xl bg-background border-border" />
          </div>

          {/* Drag & Drop */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Sube tu manuscrito (PDF/Word)</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) simulateUpload(f);
                }}
              />
              {file ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-foreground">
                    <FileText size={20} className="text-primary" />
                    <span className="text-sm font-semibold">{file.name}</span>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null); setUploadProgress(0); }}>
                      <X size={16} className="text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(uploadProgress)}%</p>
                </div>
              ) : (
                <>
                  <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Arrastra tu archivo aquí o <span className="text-primary font-semibold">haz clic para seleccionar</span>
                  </p>
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary py-3 font-semibold text-primary-foreground hover:bg-accent-hover transition-all hover:scale-[1.02] animate-pulse"
          >
            Enviar propuesta
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contacto;
