import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AuthModal = () => {
  const { isAuthOpen, closeAuth, signIn, signUp, user, openDashboard } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isAuthOpen) return null;

  const reset = () => {
    setError(""); setSuccess(""); setName(""); setEmail(""); setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message === "Invalid login credentials"
          ? "Correo o contraseña incorrectos."
          : error.message);
      } else {
        closeAuth();
        openDashboard();
      }
    } else {
      if (!name.trim()) { setError("Ingresa tu nombre."); setLoading(false); return; }
      const { error } = await signUp(email, password, name);
      if (error) {
        setError(error.message.includes("already registered")
          ? "Este correo ya tiene una cuenta."
          : error.message);
      } else {
        setSuccess("¡Cuenta creada! Revisa tu correo para confirmar y luego inicia sesión.");
        setMode("login");
        setName(""); setPassword("");
      }
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
        onClick={closeAuth}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8 relative"
          style={{ boxShadow: "0 0 80px rgba(168,85,247,0.2)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Glow decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

          <button
            onClick={closeAuth}
            className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-8">
            <p className="text-purple-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
              Microcosmos Editorial
            </p>
            <h2 className="text-3xl font-black uppercase text-white">
              {mode === "login" ? "Bienvenido" : "Únete"}
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              {mode === "login"
                ? "Inicia sesión para comprar y escribir en el blog."
                : "Crea tu cuenta y sé parte de la comunidad."}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 mb-6">
            {(["login", "register"] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); reset(); }}
                className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  mode === m
                    ? "bg-purple-600 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {m === "login" ? "Iniciar sesión" : "Crear cuenta"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 pl-10 pr-10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-400 text-xs bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 mt-2"
              style={{ boxShadow: "0 0 24px rgba(168,85,247,0.3)" }}
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          <p className="text-zinc-600 text-xs text-center mt-6">
            Al registrarte aceptas que tu información sea usada únicamente para gestionar tus compras y publicaciones.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
