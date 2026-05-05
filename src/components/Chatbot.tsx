import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

const API_KEY = "AIzaSyCd8Nxms4_KTfeKj2Em4dyhdR65iovvRjg";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
const FORMS_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSeaPc-G8LqPj0Um-FEWwC37g3biIUOnq16swVjgu-bb9YNHaw/viewform";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([{ 
    role: "bot", 
    text: "El oráculo de Microcosmos está en línea. ¿Quieres PARTICIPAR o CONSULTAR?" 
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({ name: "", pin: "" });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const checkStatus = async (id: string) => {
    const { data, error } = await supabase.from('Manuscritos').select('status').eq('id', id).single();
    if (error || !data) return "No encontré ese código. Revisa que sea Nombre+PIN.";
    return `El estado es: "${data.status || "Recibido"}".`;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input;
    const cleanText = userText.toLowerCase().trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      let botResponse = "";
      if (step === 0 && cleanText.includes("consultar")) {
        botResponse = "Dime tu Código (Nombre + PIN).";
        setStep(10);
      } else if (step === 10) {
        botResponse = await checkStatus(userText);
        setStep(0);
      } else if (step === 0 && (cleanText.includes("participar") || cleanText.includes("manuscrito"))) {
        botResponse = "¿Tu nombre completo?";
        setStep(1);
      } else if (step === 1) {
        const firstName = userText.split(" ")[0].trim();
        setFormData({ ...formData, name: userText, pin: firstName });
        botResponse = `Clave de 4 números (PIN):`;
        setStep(2);
      } else if (step === 2) {
        const finalId = formData.pin + userText.trim(); 
        const { error: insertError } = await supabase.from('Manuscritos').insert([{ id: finalId, name: formData.name, status: "Esperando Manuscrito" }]);
        botResponse = insertError ? `Error: ${insertError.message}` : `Código: ${finalId}. Sube aquí: ${FORMS_LINK}`;
        setStep(0);
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: `Eres el Oráculo de Microcosmos. Responde breve: ${userText}` }] }] })
        });
        const result = await response.json();
        botResponse = result.candidates[0].content.parts[0].text;
      }
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Error en el éter." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] flex items-center font-sans">
      {!isOpen && (
  <button 
    onClick={() => setIsOpen(true)}
    className="bg-purple-600/40 backdrop-blur-md text-white/80 py-6 px-2 rounded-l-2xl shadow-2xl flex flex-col items-center gap-4 hover:bg-purple-600/60 transition-all border-y border-l border-white/10 group"
  >
    <span 
      className="font-black uppercase tracking-[0.3em] text-[9px] [writing-mode:vertical-lr] rotate-180 opacity-70 group-hover:opacity-100"
    >
      Obtén tu código
    </span>
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
    </svg>
  </button>

      )}

      {isOpen && (
        <div className="w-[90vw] md:w-[400px] h-[550px] bg-black border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex justify-between items-center text-white">
            <span className="text-[10px] font-black uppercase tracking-widest italic">Oráculo Microcosmos</span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white p-2">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-950/50 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[12px] ${m.role === 'bot' ? 'bg-zinc-900 text-purple-300' : 'bg-purple-600 text-white'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
              className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-2 text-white text-xs outline-none focus:border-purple-500" 
              placeholder="Habla con el oráculo..." 
            />
            <button onClick={handleSend} className="bg-purple-600 text-white p-2 px-4 rounded-xl">➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;