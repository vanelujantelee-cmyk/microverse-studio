import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Send, User, Share2, Twitter, Facebook, Link2, Check } from "lucide-react";
import { blogPosts } from "./blogs";
import { supabase } from "../lib/supabaseClient";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!post) return;
    fetchLikes();
    fetchComments();
    // Revisar si ya dio like en esta sesión
    const localLikes = JSON.parse(localStorage.getItem("microcosmos_liked_v2") || "[]");
    setLiked(localLikes.includes(post.id));
  }, [post]);

  const fetchLikes = async () => {
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post!.id);
    setLikeCount(count || 0);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post!.id)
      .order("created_at", { ascending: false });
    setComments(data || []);
  };

  const toggleLike = async () => {
    if (!post) return;
    const localLikes: string[] = JSON.parse(localStorage.getItem("microcosmos_liked_v2") || "[]");

    if (liked) {
      // Quitar like — borra el más reciente de este post
      const { data } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", post.id)
        .limit(1);
      if (data && data.length > 0) {
        await supabase.from("likes").delete().eq("id", data[0].id);
      }
      const updated = localLikes.filter((x) => x !== post.id);
      localStorage.setItem("microcosmos_liked_v2", JSON.stringify(updated));
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
    } else {
      await supabase.from("likes").insert({ post_id: post.id });
      localStorage.setItem("microcosmos_liked_v2", JSON.stringify([...localLikes, post.id]));
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  const handleSendComment = async () => {
    if (!commentText.trim() || !post) return;
    setSending(true);
    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: post.id,
        text: commentText.trim(),
        author: authorName.trim() || "Lector Microcosmos",
      })
      .select()
      .single();
    if (!error && data) {
      setComments((prev) => [data, ...prev]);
      setCommentText("");
      setAuthorName("");
    }
    setSending(false);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Post no encontrado.</p>
          <button onClick={() => navigate("/")} className="text-purple-500 underline">Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero imagen */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs uppercase tracking-widest mb-6 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Volver
          </button>
          <p className="text-purple-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-3">
            {post.category} · {post.date}
          </p>
          <h1 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed italic font-light whitespace-pre-line border-l-4 border-purple-500/30 pl-6 mb-16">
            "{post.content}"
          </p>
        </motion.div>

        {/* Barra social */}
        <div className="border-t border-zinc-800 pt-10 mb-16">
          <div className="flex flex-wrap items-center gap-4">

            {/* Like */}
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all font-black text-sm ${
                liked
                  ? "bg-purple-600 border-purple-600 text-white scale-105"
                  : "border-zinc-700 text-zinc-400 hover:border-purple-500 hover:text-white"
              }`}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </button>

            {/* Compartir Twitter/X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-700 text-zinc-400 hover:border-white hover:text-white transition-all text-sm font-black"
            >
              <Twitter size={16} /> X
            </a>

            {/* Compartir Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-700 text-zinc-400 hover:border-blue-500 hover:text-blue-400 transition-all text-sm font-black"
            >
              <Facebook size={16} /> Facebook
            </a>

            {/* Copiar link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-700 text-zinc-400 hover:border-white hover:text-white transition-all text-sm font-black"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Link2 size={16} />}
              {copied ? "¡Copiado!" : "Copiar link"}
            </button>
          </div>
        </div>

        {/* Sección comentarios */}
        <div className="mb-20">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-8">
            Deja tu micro-relato
          </h3>

          {/* Formulario */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-[2rem] p-6 md:p-8 mb-10">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Tu nombre (opcional)"
              className="w-full bg-transparent border-b border-zinc-700 pb-3 mb-5 outline-none focus:border-purple-500 text-sm text-zinc-300 placeholder:text-zinc-600 transition-colors"
            />
            <div className="relative">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Deja tu huella..."
                className="w-full bg-transparent border-b border-zinc-700 pb-4 outline-none focus:border-purple-500 text-lg font-light resize-none text-zinc-200 placeholder:text-zinc-600 transition-colors"
                rows={3}
              />
              <button
                onClick={handleSendComment}
                disabled={sending || !commentText.trim()}
                className="absolute right-0 bottom-4 text-purple-500 hover:scale-110 active:scale-95 transition-transform disabled:opacity-30"
              >
                <Send size={24} />
              </button>
            </div>
          </div>

          {/* Lista comentarios */}
          <div className="space-y-5">
            {comments.length === 0 && (
              <p className="text-zinc-600 text-sm italic text-center py-8">Sé el primero en dejar tu huella.</p>
            )}
            {comments.map((c) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={c.id}
                className="border-l-2 border-purple-500/50 pl-6 py-4 bg-white/[0.02] rounded-r-2xl"
              >
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  <User size={12} />
                  <p className="text-[9px] font-black uppercase tracking-widest">{c.author}</p>
                  <span className="text-zinc-700 text-[9px]">·</span>
                  <p className="text-[9px] text-zinc-600">
                    {new Date(c.created_at).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <p className="text-zinc-300 text-base italic font-light leading-relaxed">"{c.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
