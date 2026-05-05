export interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  synopsis: string; 
  authorBio: string;
  image: string;
  previewPages?: string[];
  audioUrl?: string; // <-- NUEVO: ruta al audio del autor
}

export const books: Book[] = [
  {
    id: "ecos-de-un-manana-imposible",
    title: "Ecos de un mañana imposible",
    author: "Mauricio Caro",
    price: "60.000 COP",
    category: "Ficción",
    synopsis: "Esta antología nos sumerge en futuros donde la tecnología ya no nos sirve, sino que nos suplanta. Una advertencia necesaria sobre el destino de nuestra especie.",
    authorBio: "Mauricio Caro es un autor interesado en la convergencia entre ciencia, tecnología y narrativa especulativa.",
    image: "/portadas/ecos.jpg",
    previewPages: [
      "/portadas/page1.jpg",
      "/portadas/page2.jpg",
      "/portadas/page3.jpg",
      "/portadas/page4.jpg"
    ],
    // audioUrl: "/portadas/audio-ecos.mp3", // <-- descomenta y cambia el nombre cuando tengas el archivo
  },
  {
    id: "cartas-emily",
    title: "Cartas para Emily",
    author: "Daniel Beltrán",
    price: "60.000 COP",
    category: "Romance",
    synopsis: "Un nombre. Muchas cartas. Un solo amor. Emily.",
    authorBio: "Escritor colombiano, enamorado de las letras. Autor también de 'Relatos de un miserable', su obra más reciente es catalogada como una de las más románticas de nuestra era.",
    image: "/portadas/cartasportada.jpg",
    previewPages: [
      "/portadas/cartaspreview1.jpg",
      "/portadas/cartaspreview2.jpg",
      "/portadas/cartaspreview3.jpg",
      "/portadas/cartaspreview4.jpg",
      "/portadas/cartaspreview5.jpg",
      "/portadas/cartaspreview6.jpg"
    ],
    // audioUrl: "/portadas/audio-cartas.mp3",
  },
  {
    id: "lazos-sangre",
    title: "Lazos de Sangre",
    author: "Rosibet Oriana Medina",
    price: "60.000 COP",
    category: "Terror",
    synopsis: "Dicen que la sangre es mas espesa que el agua, construye lazos tan fuertes como cadenas de acero o tan frágiles como papel de arroz. La sangre nos define, nos clasifica, nos une, nos divide, nos bendice y nos maldice. ¿Duele más el compañero elegido desde el corazón o aquel que la sociedad dice que debes amar porque corre la misma sangre por sus venas?",
    authorBio: "Escritora venezolana graduada en letras, con una profunda sensibilidad para explorar las relaciones humanas y el suspenso.",
    image: "/portadas/lazosportada.jpg",
    previewPages: [
      "/portadas/lazospreview1.jpg",
      "/portadas/lazospreview2.jpg",
      "/portadas/lazospreview3.jpg",
      "/portadas/lazospreview4.jpg",
      "/portadas/lazospreview5.jpg",
      "/portadas/lazospreview6.jpg"
    ],
    // audioUrl: "/portadas/audio-lazos.mp3",
  },
  {
    id: "la-escultura",
    title: "La Escultura",
    author: "Pablo César",
    price: "70.000 COP",
    category: "Ficción",
    synopsis: "Un escultor da forma al mármol, revelando una figura desnuda y agonizante, esculpida con «el aliento de la vida». Una llama de alabastro emerge de su seno, una mujer que desafía la oscuridad.",
    authorBio: "Escritor colombiano que explora la bohemia, la angustia y el desafío artístico a través de la narrativa.",
    image: "/portadas/esculturaportada.jpg",
    previewPages: [
      "/portadas/esculturapreview1.jpg",
      "/portadas/esculturapreview2.jpg",
      "/portadas/esculturapreview3.jpg",
      "/portadas/esculturapreview4.jpg",
      "/portadas/esculturapreview5.jpg",
      "/portadas/esculturapreview6.jpg"
    ],
    // audioUrl: "/portadas/audio-escultura.mp3",
  },
  {
    id: "imilce-viento-luna",
    title: "Imilce y el viento de la luna",
    author: "Luis Alfredo Aarón",
    price: "60.000 COP",
    category: "Ficción",
    synopsis: "Existen libros que nos regresan al silencio del origen. Un viaje donde la historia se recupera en la memoria de quienes aún saben mirar el mundo con total asombro.",
    authorBio: "Escritor colombiano con una voz lírica capaz de rescatar la memoria y el asombro.",
    image: "/portadas/imilceportada.jpg",
    previewPages: [
      "/portadas/imilcepreview1.jpg",
      "/portadas/imilcepreview2.jpg",
      "/portadas/imilcepreview3.jpg",
      "/portadas/imilcepreview4.jpg",
      "/portadas/imilcepreview5.jpg",
      "/portadas/imilcepreview6.jpg"
    ],
    // audioUrl: "/portadas/audio-imilce.mp3",
  },
  {
    id: "puertas-abismo",
    title: "Puertas del Abismo",
    author: "Varios Autores",
    price: "75.000 COP",
    category: "Terror",
    synopsis: "Colección de los mejores relatos del concurso de terror 2025. Una selección que cruza el umbral de lo desconocido.",
    authorBio: "Antología que reúne a las voces más oscuras del 2025, incluyendo al ganador César Barrangou.",
    image: "/portadas/puertasportada.jpg",
    previewPages: [
      "/portadas/puertaspreview1.jpg",
      "/portadas/puertaspreview2.jpg",
      "/portadas/puertaspreview3.jpg",
      "/portadas/puertaspreview4.jpg",
      "/portadas/puertaspreview5.jpg",
      "/portadas/puertaspreview6.jpg"
    ],
    // audioUrl: "/portadas/audio-puertas.mp3",
  },
  {
    id: "mundo-entre-lineas",
    title: "Mundo entre líneas",
    author: "Niños de Turbaco",
    price: "60.000 COP",
    category: "Fábulas",
    synopsis: "Una colección de fábulas escritas por los niños de Turbaco, Bolívar. Sus sueños y visiones del mundo están plasmados entre estas páginas.",
    authorBio: "Pequeños soñadores de la región de Bolívar que transforman su entorno en magia literaria.",
    image: "/portadas/mundoportada.jpg",
    // audioUrl: "/portadas/audio-mundo.mp3",
  },
  {
    id: "juego-poder",
    title: "El juego del poder",
    author: "Benjamín Rodríguez",
    price: "60.000 COP",
    category: "Acción",
    synopsis: "Nada es lo que parece. El tiempo se agota. Revelaciones letales y un experimento mortal donde cada segundo cuenta.",
    authorBio: "Escritor colombiano maestro del suspense y la narrativa de alta tensión.",
    image: "/portadas/juegoportada.jpg",
    previewPages: [
      "/portadas/juegopreview1.jpg",
      "/portadas/juegopreview2.jpg",
      "/portadas/juegopreview3.jpg",
      "/portadas/juegopreview4.jpg",
      "/portadas/juegopreview5.jpg",
      "/portadas/juegopreview6.jpg"
    ],
    // audioUrl: "/portadas/audio-juego.mp3",
  },
  {
    id: "halia",
    title: "Halia",
    author: "Sabrina Cárdenas",
    price: "60.000 COP",
    category: "Terror",
    synopsis: "Un listón negro, un túnel bajo la cama y secretos que sollozan en los pasillos de una institución donde la realidad se desmorona al igual que la mente de Halia.",
    authorBio: "Escritora mexicana que profundiza en el terror psicológico, la locura y los deseos oscuros.",
    image: "/portadas/haliaportada.jpg",
    previewPages: [
      "/portadas/haliapreview1.jpg",
      "/portadas/haliapreview2.jpg",
      "/portadas/haliapreview3.jpg",
      "/portadas/haliapreview4.jpg",
      "/portadas/haliapreview5.jpg",
      "/portadas/haliapreview6.jpg"
    ],
    audioUrl: "/portadas/audio-halia.mp3",
  },
  {
    id: "placentera-disrupcion",
    title: "Placentera disrupción",
    author: "Naomi",
    price: "70.000 COP",
    category: "Ficción",
    synopsis: "Elliot se ve tentado a poner a prueba los límites de su sentido común ante una figura intrigante. Una propuesta que podría ser el inicio de una Placentera Disrupción.",
    authorBio: "Escritora con una mirada aguda sobre la monotonía y las motivaciones desconocidas del ser.",
    image: "/portadas/placenteraportada.jpg",
    // audioUrl: "/portadas/audio-placentera.mp3",
  },
  {
    id: "relatos-miserable",
    title: "Relatos de un miserable",
    author: "Daniel Beltrán",
    price: "60.000 COP",
    category: "Misterio",
    synopsis: "Una exploración cruda y profunda de las verdades que preferimos callar. Historias mínimas que revelan universos infinitos.",
    authorBio: "Escritor colombiano, también autor de 'Cartas para Emily', conocido por su pluma versátil y emocional.",
    image: "/portadas/relatosportada.jpg",
    previewPages: [
      "/portadas/relatospreview1.jpg",
      "/portadas/relatospreview2.jpg",
      "/portadas/relatospreview3.jpg",
      "/portadas/relatospreview4.jpg",
      "/portadas/relatospreview5.jpg"
    ],
    // audioUrl: "/portadas/audio-relatos.mp3",
  },
  {
    id: "cuentos-vida-misma",
    title: "Cuentos de la vida misma",
    author: "Joel Salazar",
    price: "60.000 COP",
    category: "Ficción",
    synopsis: "Amor. Miedo. Olvido. Fantasmas que nos habitan y posesiones falsas. Un viaje íntimo por emociones universales contado como una historia corta.",
    authorBio: "Escritor venezolano con una habilidad única para encontrar el asombro y la verdad en lo cotidiano.",
    image: "/portadas/cuentosportada.jpg",
    previewPages: [
      "/portadas/cuentospreview1.jpg",
      "/portadas/cuentospreview2.jpg",
      "/portadas/cuentospreview3.jpg",
      "/portadas/cuentospreview4.jpg",
      "/portadas/cuentospreview5.jpg",
      "/portadas/cuentospreview6.jpg"
    ],
    // audioUrl: "/portadas/audio-cuentos.mp3",
  }
];
