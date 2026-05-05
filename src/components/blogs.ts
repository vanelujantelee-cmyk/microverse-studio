// Asegúrate de que la interfaz esté arriba o importada
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  likes: number;
  comments: number;
}

export const blogPosts: BlogPost[] = [ // <--- AQUÍ QUITÉ LA "s" SOBRANTE
  {
    id: "El-barril-de-ácido",
    title: "EL BARRIL DE ÁCIDO",
    excerpt: "Vamos a hundirnos hasta el fondo.",
    content: `Es inevitable detener el movimiento constante del dedo sobre la pantalla del celular. No importa si la batería está hirviendo, o la hora en que descendemos por el contenido: nunca es tarde para ver el meme del momento. Y de repente, uno se encuentra hablando en las cenas familiares sobre el vídeo de una niña que cae por las escaleras. O sobre el gato que canta ante la cámara. O de ese ladrón que fue detenido en una ciudad lejana y acribillado por una multitud furiosa. Uno puede tragar cualquier cosa desde que la conversación sea interesante. Así que las reuniones con familiares y amigos, se convierten más en una extensión del meme o de la noticia. La comida queda rebajada a una opinión fortuita, o pasajera. Una risa cómplice, porque todos entienden la referencia de la referencia, y a eso le llamamos comunicación.


Está claro que un exceso de información quema tanto como el jugo gástrico. Pero la carne no arde; esto es mucho peor. Es la estabilidad mental la que perece ante las horribles quemaduras que produce la sobre-conectividad. Estamos hablando de la melancolía por no tener un Like, o del desespero porque la foto de perfil no es popular entre los contactos. Y a eso le llamamos entretenimiento. Cuando la herida supura un pus verde y maloliente, es cuando no dejamos de bajar por el barril. Como un drogadicto que persigue al dragón, intentamos llegar al final de la sección de noticias sin lograrlo jamás. 


Y las cosas pueden empeorar. Si has estado el tiempo suficiente en las redes sociales, te vas a encontrar con niñas con cuerpo de modelo y caras de ángel (sin una sola marca de acné) dando instrucciones de cómo ser una mejor persona. “Todo comienza por verse mejor”, afirman algunas. “Hay que ser positivos” exclaman sin descaro. Luego ves el tutorial de maquillaje que puede taparlo todo, menos tus inseguridades. Paseas por un mar de recetas que jamás vas a preparar con tal de bajar la barriga que tanto te aflige. Verse al espejo es una tortura, y antes de levantarte de la cama regresas a esa red social que tiene consejos sobre cómo amarse, cómo sentirte mejor contigo mismo. Bajas y bajas hasta que encuentras la solución a la depresión y al aislamiento. Tú sigue viendo: a esto le llamamos realidad. 


Nos derretimos bajo el brillo de la pantalla en donde la felicidad es la idea reiterativa de un mundo perfecto. Quemamos nuestros últimos alientos viendo a esa estrella que resbala en una entrega de premios. Así, sonrientes, sin antidepresivos y atrapados en una realidad escuálida y a todo color, nos lanzamos al fondo del barril. Mientras nadamos, es posible encontrar uno que otro cadáver: ahora ves el perfil de un tipo que se traga una cubeta de huevos al desayuno y no prueba una pizca de azúcar en años. Otro dice que su crecimiento muscular es proporcional a su buen estado de ánimo, que no hay que preocuparse por la ansiedad o la soledad: todo se cura tragando huevo y haciendo pesas tres veces al día. Y a estas personas las seguimos porque nuestros sesos son una masa deforme que no emiten electricidad.


Esto es lo que nos queda: afrontar ser seguidores (no creadores), sin pensamientos propios y opiniones críticas que detonen el barril. Estamos estancados, pues alguien está a punto de poner la tapa. Pero todo está bien desde que un influencer nos diga que así es el mundo, y que con maquillaje, bailes extravagantes y mal hechos, podemos seguir adelante: tan solo debemos imitarlos. Así que vayan, métanse debajo de las cobijas y tengan un cargador a la mano. 


Lo importante es hundirse hasta el fondo.  
    
    
    Lo importante es hundirse hasta el fondo.`, // <--- CIERRA CON COMILLA INVERTIDA
    date: "2026-05-04",
    image: "/blog/miblog1.jpg", 
    category: "Crítica", 
    likes: 0,
    comments: 0
  },
  {
    id: "El-misterio-detrás-de-la-casa",
    title: "EL MISTERIO DETRÁS DE LA CASA",
    excerpt: "Por Lara Krieger",
    content: `En una gran ciudad, entre tantos habitantes, había una casa en los barrios aledaños de la que los más viejos hablaban en voz baja. Decían que nunca volvió a ser habitada después de una tragedia en la que una familia entera había perdido la vida en circunstancias dudosas.
Los vecinos evitaban pasar cerca. Algunos aseguraban escuchar ruidos extraños. Otros juraban haber visto sombras moverse detrás de las ventanas.
Aun así, una pareja de recién casados decidió comprarla.
Marco y Raquel no creían en esos rumores. O mejor dicho, Marco no creía en nada. Raquel, en cambio, era más cauta. Siempre le decía que no había que burlarse de lo que no se entiende.
Se instalaron. Ordenaron muebles, acomodaron la cocina, hicieron de a poco su vida. Durante semanas no ocurrió nada. La casa parecía, finalmente, una casa.
Hasta que empezaron los ruidos.
Primero leves. Pasos en la noche. Un crujido en la madera. Después, los platos que caían sin explicación. Puertas que se abrían solas. Algo que no terminaba de mostrarse, pero tampoco de ocultarse.
Una noche, cansado, Marco decidió quedarse despierto.
Se sentó en su sillón, frente a la puerta abierta, fumando en silencio. Pensó incluso en lo ridículo de la situación. Sonrió solo, imaginando llamar a “los cazafantasmas”.
Entonces ocurrió.
Una luz blanca, intensa, lo envolvió todo.
Marco entrecerró los ojos. Sintió el cuerpo rígido, como si no pudiera moverse. Y las vio.
Siluetas.
Personas que avanzaban lentamente hacia esa luz, como si la hubieran estado esperando desde hacía mucho tiempo.
Una tras otra.
En silencio.
Cuando la última estaba por atravesarla, se detuvo. Giró apenas hacia él.
—Gracias… Adiós.
Y desapareció.
La luz se desvaneció.
Marco no dijo nada. Nunca le contó a Raquel lo que había visto. Pero lo supo.
La casa, por fin, estaba en paz.
Y volvía a ser, otra vez, un hogar.

Lara Krieger`, // <--- CIERRA CON COMILLA INVERTIDA
    date: "2026-05-04",
    image: "/blog/casablog.jpg", 
    category: "Cuento", 
    likes: 9,
    comments: 0
  }
];