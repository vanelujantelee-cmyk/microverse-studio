import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Heart, Sparkles, Ghost, Scale, Coffee } from "lucide-react";

const equipo = [
  {
    nombre: "Luis Torres",
    cargo: "Director Editorial & Head Hunter Literario",
    bio: "Lector voraz, escritor de raza y el arquitecto detrás de cada manuscrito en Microcosmos. Trilingüe y trotamundos, Luis coordina el pulso creativo de la editorial. Si tu obra sobrevive a su ojo clínico, estás en buenas manos.",
    datoCurioso: "Actualmente vive obsesionado con la literatura visceral y el cine de horror. Si ves que te mira fijo, está imaginando cómo convertir tu trama en una pesadilla hermosa.",
    icon: <Ghost className="text-purple-500" />,
    img: "/portadas/luis.jpg"
  },
  {
    nombre: "María Camila Arias",
    cargo: "Gerente General & Master of Print",
    bio: "Graduada en Estudios Literarios de la UNAB. Es la mente maestra detrás de la estética Microcosmos: portadas que enamoran, maquetación impecable y una distribución que no deja libro atrás. Su fuerte es transformar papel en arte.",
    datoCurioso: "Lectora empedernida de romance y fantasía. Confiesa un amor profundo por las novelas gráficas LGBTIQ+. Si el libro se siente bien en tus manos, es gracias a ella.",
    icon: <Heart className="text-pink-500" />,
    img: "/portadas/mariacamila.jpg"
  },
  {
    nombre: "Leidy Santamaría",
    cargo: "Chief Magic Officer & Marketing Strategist",
    bio: "Profesional en creación de negocios y la encargada de que el mundo sepa quién eres. Leidy no solo planea estrategias, impulsa sueños. Es la experta en hacer que las métricas y la magia editorial se den la mano.",
    datoCurioso: "De pequeña era tan original que no decía Leidy, sino 'Leiden'. Ahora ya sabe hablar, pero sigue inventando formas revolucionarias de posicionar tu marca.",
    icon: <Sparkles className="text-yellow-400" />,
    img: "/portadas/leidy.jpg"
  },
  {
    nombre: "José Miguel Sánchez",
    cargo: "Gestor de Obras Inéditas & Primer Filtro",
    bio: "Profesional en Estudios Literarios y el guardián de la puerta. Es el encargado de analizar cada manuscrito antes de que llegue al Editor en Jefe. Si tu historia tiene alma, José Miguel será el primero en descubrirla.",
    datoCurioso: "Su actividad favorita es dormir (soñar es parte del proceso creativo, dice). Planea conquistar el cine y la televisión; aprovechando que se ve como un galán de alto calibre.",
    icon: <Coffee className="text-blue-400" />,
    img: "/portadas/josemiguel.jpg"
  },
  {
    nombre: "Samantha Arias",
    cargo: "Directora de Comunicaciones & Storyteller",
    bio: "Comunicadora Social y Periodista con kilometraje en radio y televisión. Es la voz de Microcosmos, encargada de organizar talleres, entrevistas y de que la comunicación entre autor y editorial fluya como la seda.",
    datoCurioso: "De niña se tragó un hilo de tres metros. Literalmente. Casi termina en cirugía, pero sobrevivió para contarnos historias (y para alejarse de los carretes de costura).",
    icon: <Mail className="text-green-400" />,
    img: "/portadas/samantha.jpg"
  },
  {
    nombre: "Victoria Tobar",
    cargo: "Legal Department Director & IP Expert",
    bio: "Abogada de la Universidad de los Andes con especialización en Gestión Editorial. Es el escudo legal de nuestros autores: experta en derechos de autor, contratos blindados y protección de la propiedad intelectual.",
    datoCurioso: "Es un ser solar. Ama el calor extremo y puede quedarse bajo el sol hasta que su piel emita calor propio. Básicamente, es una batería humana legal.",
    icon: <Scale className="text-orange-400" />,
    img: "/portadas/victoria.jpg"
  }
];

const Equipo = () => {
  return (
    <section id="equipo" className="py-16 md:py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-4"
          >
            Nuestro <span className="text-purple-500">Equipo</span>
          </motion.h2>
          <p className="text-gray-500 uppercase text-[9px] md:text-xs tracking-[0.3em]">
            Las mentes detrás del universo Microcosmos
          </p>
        </div>

        {/* Grid Responsive: 1 columna en móvil, 2 en tablet, 3 en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {equipo.map((persona, i) => (
            <motion.div 
              key={persona.nombre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-zinc-900/40 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 hover:border-purple-500/30 transition-all backdrop-blur-sm"
            >
              <div className="relative mb-6 md:mb-8">
                {/* Imagen ajustada para no ser gigante en móvil */}
                <div className="w-full aspect-square md:h-80 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-2xl border border-white/5">
                  <img 
                    src={persona.img} 
                    alt={persona.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop"; }}
                  />
                </div>
                {/* Ícono flotante más pequeño en móvil */}
                <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-black p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10 shadow-xl">
                  {persona.icon}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-1">{persona.nombre}</h3>
              <p className="text-purple-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">{persona.cargo}</p>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                {persona.bio}
              </p>

              <div className="pt-5 border-t border-white/5">
                <p className="text-[9px] md:text-[10px] text-gray-500 italic leading-snug">
                  <span className="text-white font-bold not-italic">DATO CURIOSO:</span> {persona.datoCurioso}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipo;