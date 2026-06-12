import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, BookOpen, User, LogOut, Clock, CheckCircle, Truck, Package, PenLine, ChevronRight, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { books } from "../data/books";

interface Order {
  id: string;
  book_id: string;
  book_title: string;
  book_price: string;
  status: string;
  payment_status: string;
  user_address: string;
  user_city: string;
  created_at: string;
}

interface CommunityPost {
  id: string;
  title: string;
  status: string;
  payment_status: string;
  created_at: string;
}

const statusLabel: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:   { label: "Pendiente pago", color: "text-amber-400", icon: <Clock size={14} /> },
  confirmed: { label: "Confirmado",     color: "text-blue-400",  icon: <CheckCircle size={14} /> },
  shipped:   { label: "En camino",      color: "text-purple-400",icon: <Truck size={14} /> },
  delivered: { label: "Entregado",      color: "text-green-400", icon: <Package size={14} /> },
};

// ─── ORDER FORM ──────────────────────────────────────────────────────────────
const OrderForm = ({ bookId, onClose }: { bookId: string; onClose: () => void }) => {
  const { user } = useAuth();
  const book = books.find(b => b.id === bookId);
  const [form, setForm] = useState({ name: user?.user_metadata?.full_name || "", phone: "", address: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (!book) return null;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const { error: err } = await supabase.from("book_orders").insert({
      user_id: user!.id,
      user_name: form.name,
      user_email: user!.email,
      user_phone: form.phone,
      user_address: form.address,
      user_city: form.city,
      book_id: book.id,
      book_title: book.title,
      book_price: book.price,
      status: "pending",
      payment_status: "pending",
    });
    setLoading(false);
    if (err) { setError("Error al guardar el pedido. Intenta de nuevo."); return; }
    setDone(true);
  };

  if (done) return (
    <div className="text-center py-8 space-y-4">
      <CheckCircle size={48} className="text-green-400 mx-auto" />
      <h3 className="text-xl font-black text-white uppercase">¡Pedido registrado!</h3>
      <p className="text-zinc-400 text-sm max-w-xs mx-auto">
        Te contactaremos al correo <span className="text-purple-400">{user?.email}</span> con los datos de pago.
        El costo de envío lo pagas al recibir el libro en casa.
      </p>
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 text-left text-sm space-y-1">
        <p className="text-zinc-400">También puedes pagar por:</p>
        <p className="text-white font-bold">📲 WhatsApp: <a href="https://wa.me/573000000000?text=Hola%2C+quiero+pagar+mi+pedido+de+{book.title}" className="text-purple-400 underline" target="_blank" rel="noreferrer">Escríbenos aquí</a></p>
        <p className="text-zinc-400 text-xs mt-2">Nequi · Bancolombia · Tarjeta de crédito</p>
      </div>
      <button onClick={onClose} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest transition-all">
        Listo
      </button>
    </div>
  );

  return (
    <form onSubmit={handleOrder} className="space-y-4">
      <div className="flex gap-4 items-center bg-zinc-900 rounded-2xl p-4">
        <img src={book.image} alt={book.title} className="w-16 h-20 object-cover rounded-xl" />
        <div>
          <p className="text-white font-black uppercase text-sm leading-tight">{book.title}</p>
          <p className="text-zinc-400 text-xs">{book.author}</p>
          <p className="text-purple-400 font-black mt-1">{book.price}</p>
          <p className="text-zinc-500 text-xs mt-1">+ envío (pago al recibir)</p>
        </div>
      </div>
      {[
        { key: "name",    label: "Nombre completo",      type: "text",  placeholder: "Como aparece en el ID" },
        { key: "phone",   label: "Teléfono / WhatsApp",  type: "tel",   placeholder: "Ej: 3001234567" },
        { key: "address", label: "Dirección de envío",   type: "text",  placeholder: "Calle, número, apartamento..." },
        { key: "city",    label: "Ciudad",               type: "text",  placeholder: "Medellín, Bogotá, etc." },
      ].map(f => (
        <div key={f.key}>
          <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest block mb-1">{f.label}</label>
          <input
            type={f.type}
            placeholder={f.placeholder}
            value={(form as any)[f.key]}
            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/60 transition-colors"
            required
          />
        </div>
      ))}
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        Confirmar pedido
      </button>
      <p className="text-zinc-600 text-xs text-center">
        Pagas el libro ahora · El envío lo pagas cuando llegue a tu casa
      </p>
    </form>
  );
};

// ─── WRITE BLOG FORM ─────────────────────────────────────────────────────────
const WriteBlogForm = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", content: "", author_name: user?.user_metadata?.full_name || "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    let image_url = "";

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `community/${user!.id}-${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("blog-images").upload(path, imageFile);
      if (uploadErr) { setError("Error subiendo la imagen. Intenta con otra imagen."); setLoading(false); return; }
      const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(path);
      image_url = urlData.publicUrl;
    }

    const { error: err } = await supabase.from("community_posts").insert({
      user_id: user!.id,
      author_name: form.author_name,
      author_email: user!.email,
      title: form.title,
      content: form.content,
      image_url,
      status: "pending",
      payment_status: "pending",
    });

    setLoading(false);
    if (err) { setError("Error guardando la publicación. Intenta de nuevo."); return; }
    setDone(true);
  };

  if (done) return (
    <div className="text-center py-8 space-y-4">
      <PenLine size={48} className="text-purple-400 mx-auto" />
      <h3 className="text-xl font-black text-white uppercase">¡Texto enviado!</h3>
      <p className="text-zinc-400 text-sm max-w-xs mx-auto">
        Tu publicación está en revisión. Para que aparezca en el blog, completa el pago de <span className="text-white font-bold">$1 USD / $10.000 COP</span>.
      </p>
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 text-left text-sm space-y-1">
        <p className="text-zinc-400">Paga y se publica en 24h:</p>
        <p className="text-white font-bold">📲 WhatsApp: <a href={`https://wa.me/573000000000?text=Hola%2C+quiero+pagar+mi+publicaci%C3%B3n+en+el+blog+Microcosmos.+T%C3%ADtulo%3A+${encodeURIComponent(form.title)}`} className="text-purple-400 underline" target="_blank" rel="noreferrer">Escríbenos aquí</a></p>
        <p className="text-zinc-400 text-xs mt-2">Nequi · Bancolombia · Tarjeta de crédito</p>
      </div>
      <button onClick={onClose} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest transition-all">
        Entendido
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-purple-900/20 border border-purple-500/20 rounded-2xl p-4 text-sm space-y-1">
        <p className="text-purple-300 font-bold">💜 Publicación en el Blog Literario</p>
        <p className="text-zinc-400">Costo: <span className="text-white font-bold">$1 USD / $10.000 COP</span> por publicación</p>
        <p className="text-zinc-500 text-xs">Tu texto aparecerá con tu nombre, la fecha y sección de comentarios.</p>
      </div>

      <div>
        <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest block mb-1">Nombre de autor</label>
        <input
          value={form.author_name}
          onChange={e => setForm(p => ({ ...p, author_name: e.target.value }))}
          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/60 transition-colors"
          placeholder="Como quieres que aparezca en el blog"
          required
        />
      </div>

      <div>
        <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest block mb-1">Título</label>
        <input
          value={form.title}
          onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/60 transition-colors"
          placeholder="El título de tu relato o crónica"
          required
        />
      </div>

      <div>
        <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest block mb-1">Tu texto</label>
        <textarea
          value={form.content}
          onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
          rows={8}
          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
          placeholder="Escribe aquí tu relato, cuento, crónica o reflexión..."
          required
        />
      </div>

      <div>
        <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest block mb-2">Imagen (opcional)</label>
        <label className="flex items-center gap-3 cursor-pointer bg-zinc-900 border border-dashed border-white/20 rounded-xl px-4 py-4 hover:border-purple-500/40 transition-colors">
          <ImageIcon size={20} className="text-zinc-500" />
          <span className="text-zinc-500 text-sm">{imageFile ? imageFile.name : "Sube una imagen para tu post"}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </label>
        {imagePreview && (
          <img src={imagePreview} alt="preview" className="mt-2 w-full h-40 object-cover rounded-xl" />
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        Enviar texto y pagar
      </button>
    </form>
  );
};

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
const UserDashboard = () => {
  const { user, signOut, isDashboardOpen, closeDashboard } = useAuth();
  const [tab, setTab] = useState<"orders" | "catalog" | "blog">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [orderingBookId, setOrderingBookId] = useState<string | null>(null);
  const [writingBlog, setWritingBlog] = useState(false);

  useEffect(() => {
    if (!isDashboardOpen || !user) return;
    const fetchData = async () => {
      setLoadingData(true);
      const [{ data: od }, { data: pd }] = await Promise.all([
        supabase.from("book_orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("community_posts").select("id,title,status,payment_status,created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      setOrders(od || []);
      setPosts(pd || []);
      setLoadingData(false);
    };
    fetchData();
  }, [isDashboardOpen, user]);

  if (!isDashboardOpen || !user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Lector";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-start justify-end"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
        onClick={closeDashboard}
      >
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg h-full bg-zinc-950 border-l border-white/10 flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-black text-white uppercase">
                {displayName[0]}
              </div>
              <div>
                <p className="text-white font-black text-sm">{displayName}</p>
                <p className="text-zinc-500 text-xs">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={signOut}
                className="flex items-center gap-1 text-zinc-500 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <LogOut size={14} /> Salir
              </button>
              <button onClick={closeDashboard} className="ml-2 text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-3 border-b border-white/10 shrink-0">
            {([
              { id: "orders",  label: "Mis pedidos", icon: <ShoppingBag size={14} /> },
              { id: "catalog", label: "Catálogo",    icon: <BookOpen size={14} /> },
              { id: "blog",    label: "Blog",         icon: <PenLine size={14} /> },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setOrderingBookId(null); setWritingBlog(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  tab === t.id ? "bg-purple-600 text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">

            {/* ORDERS TAB */}
            {tab === "orders" && (
              <div className="space-y-4">
                <h3 className="text-white font-black uppercase text-xs tracking-widest text-zinc-500">Historial de compras</h3>
                {loadingData && <div className="flex justify-center py-10"><Loader2 size={24} className="animate-spin text-purple-400" /></div>}
                {!loadingData && orders.length === 0 && (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag size={40} className="text-zinc-700 mx-auto" />
                    <p className="text-zinc-500 text-sm">Aún no tienes pedidos.</p>
                    <button
                      onClick={() => setTab("catalog")}
                      className="text-purple-400 text-xs font-bold uppercase tracking-widest hover:text-purple-300 transition-colors flex items-center gap-1 mx-auto"
                    >
                      Ver catálogo <ChevronRight size={14} />
                    </button>
                  </div>
                )}
                {orders.map(order => {
                  const s = statusLabel[order.status] || statusLabel.pending;
                  return (
                    <div key={order.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-white font-black text-sm leading-tight">{order.book_title}</p>
                        <span className={`flex items-center gap-1 text-xs font-bold ${s.color} shrink-0`}>
                          {s.icon} {s.label}
                        </span>
                      </div>
                      <p className="text-purple-400 font-black text-sm">{order.book_price}</p>
                      <p className="text-zinc-500 text-xs">{order.user_city} · {new Date(order.created_at).toLocaleDateString("es-CO")}</p>
                      {order.payment_status === "pending" && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs">
                          <AlertCircle size={12} /> Pendiente de pago — contáctanos por WhatsApp
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* CATALOG TAB */}
            {tab === "catalog" && !orderingBookId && (
              <div className="space-y-4">
                <h3 className="text-zinc-500 font-black uppercase text-xs tracking-widest">Nuestro catálogo</h3>
                {books.map(book => (
                  <div key={book.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-4 flex gap-4">
                    <img src={book.image} alt={book.title} className="w-16 h-20 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-black text-sm uppercase leading-tight line-clamp-2">{book.title}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{book.author}</p>
                      <p className="text-purple-400 font-black text-sm mt-1">{book.price}</p>
                      <p className="text-zinc-600 text-xs">+ envío (pago al recibir)</p>
                    </div>
                    <button
                      onClick={() => setOrderingBookId(book.id)}
                      className="shrink-0 self-center bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg font-black uppercase text-xs tracking-widest transition-all"
                    >
                      Comprar
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tab === "catalog" && orderingBookId && (
              <div className="space-y-4">
                <button
                  onClick={() => setOrderingBookId(null)}
                  className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-1"
                >
                  ← Volver al catálogo
                </button>
                <OrderForm bookId={orderingBookId} onClose={() => setOrderingBookId(null)} />
              </div>
            )}

            {/* BLOG TAB */}
            {tab === "blog" && !writingBlog && (
              <div className="space-y-6">
                {/* Inspirational CTA */}
                <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 p-6 space-y-3"
                  style={{ background: "linear-gradient(135deg, rgba(88,28,135,0.3) 0%, rgba(0,0,0,0.8) 100%)" }}>
                  <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ background: "radial-gradient(circle at 80% 20%, rgba(168,85,247,0.5) 0%, transparent 60%)" }} />
                  <p className="text-purple-300 text-[10px] font-black uppercase tracking-[0.4em]">Blog Literario</p>
                  <h3 className="text-white font-black text-2xl uppercase leading-tight">
                    Tu voz<br/>merece ser<br/>leída.
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Cada gran escritor empezó con una primera publicación. Hoy es tu turno.
                    Comparte tu relato, tu crónica, tu poema —y que el mundo lo descubra.
                  </p>
                  <p className="text-zinc-500 text-xs">
                    Tu texto aparece en nuestra sección de blog con tu nombre, la fecha, comentarios y botones para compartirlo en redes.
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-purple-300 font-black text-sm">$1 USD · $10.000 COP</span>
                    <button
                      onClick={() => setWritingBlog(true)}
                      className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center gap-2"
                      style={{ boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}
                    >
                      <PenLine size={14} /> Publicar ahora
                    </button>
                  </div>
                </div>

                {/* User's posts */}
                {posts.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-zinc-500 font-black uppercase text-xs tracking-widest">Mis publicaciones</h3>
                    {posts.map(post => (
                      <div key={post.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-4">
                        <p className="text-white font-black text-sm">{post.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-zinc-500 text-xs">{new Date(post.created_at).toLocaleDateString("es-CO")}</p>
                          <span className={`text-xs font-bold ${
                            post.status === "published" ? "text-green-400" :
                            post.payment_status === "pending" ? "text-amber-400" : "text-zinc-400"
                          }`}>
                            {post.status === "published" ? "✓ Publicado" :
                             post.payment_status === "pending" ? "⏳ Pendiente pago" : "En revisión"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "blog" && writingBlog && (
              <div className="space-y-4">
                <button
                  onClick={() => setWritingBlog(false)}
                  className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-1"
                >
                  ← Volver
                </button>
                <WriteBlogForm onClose={() => setWritingBlog(false)} />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserDashboard;
