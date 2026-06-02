// ─── Useful Expressions — Functional Language ──────────────────────
// Communicative formulae organised by function, not by theme. Three
// blocks now (r87):
//   • Foundations Phrases  — 12 functions × A1/A2 (everyday survival).
//   • Intermediate Phrases — 10 functions × B1/B2 (opinion, nuance,
//     argumentation — what a B1+ learner actually needs).
//   • Advanced Phrases     — 10 functions × C1/C2 (register, hedging,
//     idiomaticity, eloquence — for proficient speakers).
// Each expression follows the shape {en, es, context} so existing
// Vocabulary practice modes (Flashcards/Quiz/Matching) work unchanged.
//
// Total ~640 expressions. Content by editorial criterion — please
// review and adjust as the native expert.

export const USEFUL_FUNCTIONS = {
  greetings: {
    name: "Greetings & Farewells",
    es: "Saludos y despedidas",
    icon: "👋",
    color: "#F59E0B",
    levels: {
      A1: [
        { en: "Hello!",                       es: "¡Hola!",                              context: "Saludo neutro" },
        { en: "Hi!",                          es: "¡Hola!",                              context: "Saludo informal" },
        { en: "Good morning.",                es: "Buenos días.",                        context: "Hasta mediodía" },
        { en: "Good afternoon.",              es: "Buenas tardes.",                      context: "Tarde" },
        { en: "Good evening.",                es: "Buenas noches (al llegar).",          context: "Al anochecer, al saludar" },
        { en: "Goodbye.",                     es: "Adiós.",                              context: "Despedida neutra" },
        { en: "Bye!",                         es: "¡Adiós!",                             context: "Informal" },
        { en: "See you later.",               es: "Hasta luego.",                        context: "Despedida amistosa" },
        { en: "See you tomorrow.",            es: "Hasta mañana.",                       context: "Si te vas a ver pronto" },
        { en: "Good night.",                  es: "Buenas noches (al irse).",            context: "Al despedirse / al dormir" },
        { en: "How are you?",                 es: "¿Cómo estás?",                        context: "Pregunta de cortesía" },
        { en: "I'm fine, thanks.",            es: "Bien, gracias.",                      context: "Respuesta cortés" },
      ],
      A2: [
        { en: "Hi there!",                    es: "¡Hola, qué tal!",                     context: "Informal, cercano" },
        { en: "How's it going?",              es: "¿Qué tal?",                           context: "Informal" },
        { en: "How are you doing?",           es: "¿Cómo te va?",                        context: "Amistoso" },
        { en: "Long time no see!",            es: "¡Cuánto tiempo sin verte!",           context: "Al reencontrarte" },
        { en: "Nice to see you again.",       es: "Me alegro de verte otra vez.",        context: "Reencuentro cordial" },
        { en: "Take care.",                   es: "Cuídate.",                            context: "Despedida cálida" },
        { en: "Have a nice day.",             es: "Que tengas un buen día.",             context: "Despedida amable" },
        { en: "Have a good weekend.",         es: "Buen fin de semana.",                 context: "Despedida antes del finde" },
        { en: "See you around.",              es: "Nos vemos por ahí.",                  context: "Informal, sin fecha" },
        { en: "Catch you later.",             es: "Hasta luego.",                        context: "Muy informal" },
        { en: "I have to go now.",            es: "Tengo que irme ya.",                  context: "Excusa para despedirse" },
        { en: "It was nice talking to you.",  es: "Encantado de hablar contigo.",        context: "Despedida educada" },
      ],
    },
  },

  introducing: {
    name: "Introducing Yourself",
    es: "Presentarse",
    icon: "🙋",
    color: "#EC4899",
    levels: {
      A1: [
        { en: "My name is Anna.",             es: "Me llamo Anna.",                       context: "Presentación básica" },
        { en: "I'm Anna.",                    es: "Soy Anna.",                            context: "Forma corta" },
        { en: "What's your name?",            es: "¿Cómo te llamas?",                     context: "Preguntar el nombre" },
        { en: "Nice to meet you.",            es: "Encantado de conocerte.",              context: "Al conocer a alguien" },
        { en: "Nice to meet you too.",        es: "Encantado yo también.",                context: "Respuesta a 'Nice to meet you'" },
        { en: "This is my friend, John.",     es: "Este es mi amigo, John.",              context: "Presentar a otra persona" },
        { en: "I'm from Spain.",              es: "Soy de España.",                       context: "Origen" },
        { en: "I'm Spanish.",                 es: "Soy español/a.",                       context: "Nacionalidad" },
        { en: "I'm 25 years old.",            es: "Tengo 25 años.",                       context: "Edad" },
        { en: "I'm a student.",               es: "Soy estudiante.",                      context: "Ocupación" },
      ],
      A2: [
        { en: "Let me introduce myself.",          es: "Permíteme presentarme.",                       context: "Inicio formal" },
        { en: "I'd like to introduce you to Sara.", es: "Me gustaría presentarte a Sara.",            context: "Presentación formal" },
        { en: "How do you do?",                    es: "Encantado de conocerle.",                      context: "Muy formal, primera vez" },
        { en: "Pleased to meet you.",              es: "Es un placer conocerte.",                      context: "Cordial-formal" },
        { en: "Where are you from?",               es: "¿De dónde eres?",                              context: "Preguntar origen" },
        { en: "I was born in Madrid.",             es: "Nací en Madrid.",                              context: "Lugar de nacimiento" },
        { en: "I live in Barcelona.",              es: "Vivo en Barcelona.",                           context: "Lugar de residencia" },
        { en: "I work as a teacher.",              es: "Trabajo como profesor/a.",                     context: "Profesión detallada" },
        { en: "I'm studying engineering.",         es: "Estoy estudiando ingeniería.",                 context: "Estudios actuales" },
        { en: "I'm here on holiday.",              es: "Estoy aquí de vacaciones.",                    context: "Motivo de la visita" },
      ],
    },
  },

  personalInfo: {
    name: "Personal Information",
    es: "Información personal",
    icon: "📋",
    color: "#A855F7",
    levels: {
      A1: [
        { en: "What's your phone number?",        es: "¿Cuál es tu número de teléfono?",              context: "Pedir el teléfono" },
        { en: "My phone number is...",            es: "Mi número de teléfono es...",                  context: "Dar el teléfono" },
        { en: "What's your address?",             es: "¿Cuál es tu dirección?",                       context: "Pedir dirección" },
        { en: "I live at 25 Park Street.",        es: "Vivo en Park Street, 25.",                     context: "Dar dirección" },
        { en: "What's your email?",               es: "¿Cuál es tu email?",                           context: "Pedir email" },
        { en: "How old are you?",                 es: "¿Cuántos años tienes?",                        context: "Preguntar edad" },
        { en: "Do you have any brothers?",        es: "¿Tienes hermanos?",                            context: "Familia" },
        { en: "Yes, I have one brother.",         es: "Sí, tengo un hermano.",                        context: "Respuesta" },
        { en: "No, I don't.",                     es: "No, no tengo.",                                context: "Respuesta negativa" },
      ],
      A2: [
        { en: "Could you spell that, please?",       es: "¿Podrías deletreármelo, por favor?",        context: "Para apuntar bien un nombre" },
        { en: "Could you repeat that?",              es: "¿Podrías repetirlo?",                       context: "Pedir repetición" },
        { en: "What's your date of birth?",          es: "¿Cuál es tu fecha de nacimiento?",          context: "Formularios, registros" },
        { en: "I was born on the 12th of May.",      es: "Nací el 12 de mayo.",                       context: "Dar fecha de nacimiento" },
        { en: "What's your marital status?",         es: "¿Cuál es tu estado civil?",                 context: "Formal / formularios" },
        { en: "I'm single.",                         es: "Estoy soltero/a.",                          context: "Respuesta" },
        { en: "I'm married.",                        es: "Estoy casado/a.",                           context: "Respuesta" },
        { en: "Are you on social media?",            es: "¿Estás en redes sociales?",                 context: "Contacto moderno" },
        { en: "Can I have your number?",             es: "¿Me das tu número?",                        context: "Forma educada" },
        { en: "What's your zip code?",               es: "¿Cuál es tu código postal?",                context: "Formularios" },
      ],
    },
  },

  time: {
    name: "Asking & Telling the Time",
    es: "La hora",
    icon: "🕐",
    color: "#3B82F6",
    levels: {
      A1: [
        { en: "What time is it?",                 es: "¿Qué hora es?",                                context: "Pregunta básica" },
        { en: "It's three o'clock.",              es: "Son las tres en punto.",                       context: "Hora exacta" },
        { en: "It's half past two.",              es: "Son las dos y media.",                         context: "Y media" },
        { en: "It's quarter past five.",          es: "Son las cinco y cuarto.",                      context: "Y cuarto" },
        { en: "It's quarter to nine.",            es: "Son las nueve menos cuarto.",                  context: "Menos cuarto" },
        { en: "It's ten past four.",              es: "Son las cuatro y diez.",                       context: "Minutos pasados" },
        { en: "It's twenty to seven.",            es: "Son las siete menos veinte.",                  context: "Minutos antes" },
        { en: "It's noon.",                       es: "Es mediodía.",                                 context: "12:00" },
        { en: "It's midnight.",                   es: "Es medianoche.",                               context: "00:00" },
        { en: "It's early.",                      es: "Es temprano.",                                 context: "Comentario" },
      ],
      A2: [
        { en: "Excuse me, do you have the time?",     es: "Perdona, ¿tienes hora?",                   context: "Pedir hora educadamente" },
        { en: "Could you tell me the time, please?",  es: "¿Podrías decirme la hora, por favor?",     context: "Más formal" },
        { en: "Sorry, I don't have a watch.",         es: "Perdona, no llevo reloj.",                 context: "No saber la hora" },
        { en: "It's almost ten.",                     es: "Son casi las diez.",                       context: "Aproximado" },
        { en: "It's just gone five.",                 es: "Acaban de dar las cinco.",                 context: "Acaba de pasar" },
        { en: "What time does it start?",             es: "¿A qué hora empieza?",                     context: "Eventos" },
        { en: "What time does it finish?",            es: "¿A qué hora termina?",                     context: "Eventos" },
        { en: "I'm running late.",                    es: "Voy con retraso.",                         context: "Avisar que llegas tarde" },
        { en: "We have plenty of time.",              es: "Tenemos tiempo de sobra.",                 context: "Tranquilizar" },
        { en: "We'd better hurry.",                   es: "Mejor nos damos prisa.",                   context: "Apremiar" },
      ],
    },
  },

  routines: {
    name: "Daily Routines",
    es: "Rutinas diarias",
    icon: "⏰",
    color: "#14B8A6",
    levels: {
      A1: [
        { en: "I wake up at seven.",                 es: "Me despierto a las siete.",                 context: "Rutina matinal" },
        { en: "I have breakfast at eight.",          es: "Desayuno a las ocho.",                      context: "Desayuno" },
        { en: "I go to work at nine.",               es: "Voy a trabajar a las nueve.",               context: "Comienzo del día" },
        { en: "I have lunch at two.",                es: "Como a las dos.",                           context: "Comida" },
        { en: "I finish work at six.",               es: "Termino de trabajar a las seis.",           context: "Fin de la jornada" },
        { en: "I watch TV in the evening.",          es: "Veo la tele por la tarde.",                 context: "Tarde-noche" },
        { en: "I go to bed at eleven.",              es: "Me acuesto a las once.",                    context: "Acostarse" },
        { en: "I always brush my teeth.",            es: "Siempre me cepillo los dientes.",           context: "Hábito diario" },
        { en: "I take a shower every morning.",      es: "Me ducho todas las mañanas.",               context: "Higiene diaria" },
        { en: "I usually walk to work.",             es: "Normalmente voy a trabajar andando.",       context: "Frecuencia + medio" },
      ],
      A2: [
        { en: "What time do you usually wake up?",       es: "¿A qué hora sueles despertarte?",       context: "Preguntar rutina" },
        { en: "What do you do in the morning?",          es: "¿Qué haces por la mañana?",             context: "Rutina general" },
        { en: "On weekdays I get up early.",              es: "Entre semana me levanto temprano.",     context: "Contraste semana/finde" },
        { en: "On weekends I sleep in.",                  es: "Los fines de semana duermo hasta tarde.", context: "Cambios de fin de semana" },
        { en: "I rarely eat breakfast.",                  es: "Casi nunca desayuno.",                  context: "Frecuencia baja" },
        { en: "I sometimes work from home.",              es: "A veces trabajo desde casa.",           context: "Frecuencia media" },
        { en: "I always go for a run before work.",       es: "Siempre salgo a correr antes del trabajo.", context: "Hábito + secuencia" },
        { en: "After dinner I usually read.",             es: "Después de cenar normalmente leo.",     context: "Secuencia + frecuencia" },
        { en: "Twice a week I go to the gym.",            es: "Dos veces a la semana voy al gimnasio.", context: "Frecuencia precisa" },
        { en: "I'm a morning person.",                    es: "Soy una persona madrugadora.",          context: "Describirse" },
      ],
    },
  },

  preferences: {
    name: "Likes & Preferences",
    es: "Gustos y preferencias",
    icon: "❤️",
    color: "#EF4444",
    levels: {
      A1: [
        { en: "I like pizza.",                       es: "Me gusta la pizza.",                        context: "Gusto positivo" },
        { en: "I don't like fish.",                  es: "No me gusta el pescado.",                   context: "Gusto negativo" },
        { en: "I love chocolate.",                   es: "Me encanta el chocolate.",                  context: "Gusto fuerte" },
        { en: "I hate Mondays.",                     es: "Odio los lunes.",                           context: "Disgusto fuerte" },
        { en: "Do you like coffee?",                 es: "¿Te gusta el café?",                        context: "Preguntar gustos" },
        { en: "Yes, I do.",                          es: "Sí.",                                       context: "Respuesta positiva" },
        { en: "No, I don't.",                        es: "No.",                                       context: "Respuesta negativa" },
        { en: "I like reading.",                     es: "Me gusta leer.",                            context: "Like + -ing" },
        { en: "My favourite colour is blue.",        es: "Mi color favorito es el azul.",             context: "Favoritos" },
        { en: "I prefer tea.",                       es: "Prefiero el té.",                           context: "Preferencia" },
      ],
      A2: [
        { en: "On weekends, I prefer to relax.",         es: "Los fines de semana, prefiero relajarme.", context: "Preferencia contextual" },
        { en: "I'd rather stay at home.",                 es: "Preferiría quedarme en casa.",          context: "Preferencia condicional" },
        { en: "I'm really into photography.",             es: "Me entusiasma la fotografía.",          context: "Afición intensa" },
        { en: "I can't stand horror films.",              es: "No soporto las películas de terror.",   context: "Rechazo fuerte" },
        { en: "I'm not a big fan of jazz.",               es: "No soy muy fan del jazz.",              context: "Rechazo suave" },
        { en: "It's not really my thing.",                es: "No es muy lo mío.",                     context: "Eufemismo para 'no me gusta'" },
        { en: "What kind of music do you like?",          es: "¿Qué tipo de música te gusta?",         context: "Preguntar género" },
        { en: "I quite like classical music.",            es: "Me gusta bastante la música clásica.",  context: "Gusto moderado" },
        { en: "I'd love to try sushi someday.",           es: "Me encantaría probar sushi algún día.", context: "Deseo futuro" },
        { en: "I don't mind walking.",                    es: "No me importa caminar.",                context: "Aceptar opciones" },
      ],
    },
  },

  ordering: {
    name: "Ordering Food",
    es: "En el restaurante",
    icon: "🍽️",
    color: "#F97316",
    levels: {
      A1: [
        { en: "A table for two, please.",            es: "Una mesa para dos, por favor.",             context: "Llegar al restaurante" },
        { en: "The menu, please.",                   es: "La carta, por favor.",                      context: "Pedir la carta" },
        { en: "I'd like a coffee, please.",          es: "Quiero un café, por favor.",                context: "Pedir bebida" },
        { en: "I'll have the chicken.",              es: "Tomaré el pollo.",                          context: "Pedir comida" },
        { en: "Water, please.",                      es: "Agua, por favor.",                          context: "Pedir agua" },
        { en: "With ice, please.",                   es: "Con hielo, por favor.",                     context: "Especificar bebida" },
        { en: "How much is it?",                     es: "¿Cuánto es?",                               context: "Precio" },
        { en: "The bill, please.",                   es: "La cuenta, por favor.",                     context: "Pedir cuenta" },
        { en: "Thank you very much.",                es: "Muchas gracias.",                           context: "Agradecimiento" },
        { en: "It's delicious!",                     es: "¡Está buenísimo!",                          context: "Elogiar la comida" },
      ],
      A2: [
        { en: "Could we see the menu, please?",         es: "¿Podríamos ver la carta, por favor?",   context: "Pedir carta educadamente" },
        { en: "What do you recommend?",                 es: "¿Qué nos recomienda?",                  context: "Pedir recomendación" },
        { en: "What's the soup of the day?",            es: "¿Cuál es la sopa del día?",             context: "Plato del día" },
        { en: "Is this dish spicy?",                    es: "¿Este plato pica?",                     context: "Preguntar por picante" },
        { en: "I'm allergic to nuts.",                  es: "Soy alérgico/a a los frutos secos.",    context: "Avisar de alergias" },
        { en: "I'm a vegetarian.",                      es: "Soy vegetariano/a.",                    context: "Dieta" },
        { en: "Could I have the bill, please?",         es: "¿Me trae la cuenta, por favor?",        context: "Pedir cuenta formal" },
        { en: "Is service included?",                   es: "¿La propina está incluida?",            context: "Servicio/propina" },
        { en: "Can I pay by card?",                     es: "¿Puedo pagar con tarjeta?",             context: "Forma de pago" },
        { en: "Keep the change.",                       es: "Quédese con el cambio.",                context: "Propina" },
      ],
    },
  },

  shopping: {
    name: "Shopping",
    es: "De compras",
    icon: "🛍️",
    color: "#8B5CF6",
    levels: {
      A1: [
        { en: "How much is this?",                   es: "¿Cuánto cuesta esto?",                      context: "Precio" },
        { en: "It's too expensive.",                 es: "Es demasiado caro.",                        context: "Reaccionar al precio" },
        { en: "I'll take it.",                       es: "Me lo llevo.",                              context: "Decidir comprar" },
        { en: "Do you have this in blue?",           es: "¿Tienes esto en azul?",                     context: "Pedir color" },
        { en: "What size?",                          es: "¿Qué talla?",                               context: "Talla" },
        { en: "Size medium, please.",                es: "Talla mediana, por favor.",                 context: "Decir talla" },
        { en: "Can I try it on?",                    es: "¿Puedo probármelo?",                        context: "Ropa" },
        { en: "Where's the changing room?",          es: "¿Dónde está el probador?",                  context: "Probador" },
        { en: "I'm just looking, thanks.",           es: "Solo estoy mirando, gracias.",              context: "Rechazar ayuda" },
        { en: "Cash or card?",                       es: "¿Efectivo o tarjeta?",                      context: "Forma de pago" },
      ],
      A2: [
        { en: "Do you have a smaller size?",            es: "¿Tienen una talla más pequeña?",        context: "Cambio de talla" },
        { en: "Could I get a receipt, please?",         es: "¿Me da el ticket, por favor?",          context: "Pedir ticket" },
        { en: "Is there a discount?",                   es: "¿Hay descuento?",                       context: "Precio" },
        { en: "Are these on sale?",                     es: "¿Estos están de rebajas?",              context: "Rebajas" },
        { en: "Can I exchange this?",                   es: "¿Puedo cambiar esto?",                  context: "Cambio" },
        { en: "Can I get a refund?",                    es: "¿Me pueden devolver el dinero?",        context: "Devolución" },
        { en: "What time do you close?",                es: "¿A qué hora cierran?",                  context: "Horarios" },
        { en: "Do you accept credit cards?",             es: "¿Aceptan tarjetas de crédito?",        context: "Pago" },
        { en: "I'll think about it.",                   es: "Me lo voy a pensar.",                   context: "No decidirse" },
        { en: "Could you gift-wrap it?",                es: "¿Me lo envuelve para regalo?",          context: "Regalo" },
      ],
    },
  },

  directions: {
    name: "Asking for Directions",
    es: "Pedir direcciones",
    icon: "🗺️",
    color: "#10B981",
    levels: {
      A1: [
        { en: "Excuse me.",                          es: "Perdone.",                                  context: "Llamar la atención" },
        { en: "Where is the bank?",                  es: "¿Dónde está el banco?",                     context: "Localización" },
        { en: "Where is the bathroom?",              es: "¿Dónde está el baño?",                      context: "Baño" },
        { en: "Turn left.",                          es: "Gira a la izquierda.",                      context: "Dar dirección" },
        { en: "Turn right.",                         es: "Gira a la derecha.",                        context: "Dar dirección" },
        { en: "Go straight on.",                     es: "Sigue recto.",                              context: "Dar dirección" },
        { en: "It's near here.",                     es: "Está cerca de aquí.",                       context: "Distancia" },
        { en: "It's far.",                           es: "Está lejos.",                               context: "Distancia" },
        { en: "Thank you very much.",                es: "Muchas gracias.",                           context: "Agradecer ayuda" },
        { en: "On the left.",                        es: "A la izquierda.",                           context: "Localización" },
      ],
      A2: [
        { en: "Could you tell me how to get to the station?", es: "¿Podrías decirme cómo llegar a la estación?", context: "Pregunta educada completa" },
        { en: "Is it far from here?",                          es: "¿Está lejos de aquí?",            context: "Distancia" },
        { en: "How long does it take?",                        es: "¿Cuánto se tarda?",               context: "Tiempo de trayecto" },
        { en: "It's about five minutes on foot.",              es: "Está a unos cinco minutos andando.", context: "Distancia con tiempo" },
        { en: "Take the second street on the right.",          es: "Toma la segunda calle a la derecha.", context: "Direcciones detalladas" },
        { en: "It's opposite the post office.",                es: "Está enfrente de la oficina de correos.", context: "Referencia local" },
        { en: "It's next to the supermarket.",                 es: "Está al lado del supermercado.",  context: "Referencia local" },
        { en: "You can't miss it.",                            es: "No tiene pérdida.",               context: "Tranquilizar" },
        { en: "I'm afraid I'm lost.",                          es: "Me temo que estoy perdido/a.",    context: "Pedir ayuda" },
        { en: "Sorry, I'm not from here.",                     es: "Perdón, no soy de aquí.",         context: "No poder ayudar" },
      ],
    },
  },

  weather: {
    name: "Talking about the Weather",
    es: "Hablar del clima",
    icon: "☀️",
    color: "#FCD34D",
    levels: {
      A1: [
        { en: "It's sunny.",                         es: "Hace sol.",                                 context: "Tiempo" },
        { en: "It's raining.",                       es: "Está lloviendo.",                           context: "Tiempo presente" },
        { en: "It's cold.",                          es: "Hace frío.",                                context: "Temperatura" },
        { en: "It's hot.",                           es: "Hace calor.",                               context: "Temperatura" },
        { en: "It's windy.",                         es: "Hace viento.",                              context: "Tiempo" },
        { en: "It's cloudy.",                        es: "Está nublado.",                             context: "Tiempo" },
        { en: "What's the weather like?",            es: "¿Qué tiempo hace?",                         context: "Pregunta" },
        { en: "I like sunny days.",                  es: "Me gustan los días soleados.",              context: "Preferencia" },
        { en: "Take an umbrella.",                   es: "Coge un paraguas.",                         context: "Consejo" },
        { en: "It's a beautiful day.",               es: "Hace un día precioso.",                     context: "Comentario positivo" },
      ],
      A2: [
        { en: "It's freezing out there!",                es: "¡Hace un frío que pela!",              context: "Frío extremo" },
        { en: "It's boiling today.",                     es: "Hace un calor sofocante hoy.",         context: "Calor extremo" },
        { en: "It's pouring with rain.",                 es: "Está lloviendo a cántaros.",           context: "Lluvia fuerte" },
        { en: "It looks like rain.",                     es: "Parece que va a llover.",              context: "Predicción visual" },
        { en: "What's the forecast?",                    es: "¿Cuál es la previsión?",               context: "Pronóstico" },
        { en: "It's going to clear up.",                 es: "Va a despejar.",                       context: "Predicción positiva" },
        { en: "There's a storm coming.",                 es: "Se acerca una tormenta.",              context: "Advertencia" },
        { en: "It's quite mild today.",                  es: "Hace bastante buen tiempo hoy.",       context: "Tiempo templado" },
        { en: "I love this weather.",                    es: "Me encanta este tiempo.",              context: "Opinión positiva" },
        { en: "I can't stand the heat.",                 es: "No aguanto el calor.",                 context: "Opinión negativa" },
      ],
    },
  },

  past: {
    name: "Talking about the Past",
    es: "Hablar del pasado",
    icon: "📅",
    color: "#6366F1",
    levels: {
      A1: [
        { en: "Yesterday I went to the cinema.",     es: "Ayer fui al cine.",                         context: "Acción pasada simple" },
        { en: "Last week I visited my parents.",     es: "La semana pasada visité a mis padres.",     context: "Pasado con expresión de tiempo" },
        { en: "I was at home.",                      es: "Estuve en casa.",                           context: "Pasado de 'to be'" },
        { en: "It was great.",                       es: "Fue genial.",                               context: "Valoración pasada" },
        { en: "We had a good time.",                 es: "Lo pasamos bien.",                          context: "Resumen positivo" },
        { en: "Did you like it?",                    es: "¿Te gustó?",                                context: "Pregunta pasada" },
        { en: "Yes, I did.",                         es: "Sí.",                                       context: "Respuesta corta positiva" },
        { en: "No, I didn't.",                       es: "No.",                                       context: "Respuesta corta negativa" },
        { en: "I saw a film.",                       es: "Vi una película.",                          context: "Acción concreta" },
        { en: "What did you do yesterday?",          es: "¿Qué hiciste ayer?",                        context: "Pregunta abierta" },
      ],
      A2: [
        { en: "Last summer we went to Italy.",            es: "El verano pasado fuimos a Italia.",   context: "Viaje pasado" },
        { en: "How was your weekend?",                    es: "¿Qué tal el fin de semana?",          context: "Pregunta cordial" },
        { en: "It was amazing!",                          es: "¡Fue increíble!",                     context: "Reacción positiva" },
        { en: "It was a bit boring, actually.",           es: "Fue un poco aburrido, la verdad.",    context: "Reacción honesta" },
        { en: "I had a wonderful time.",                  es: "Lo pasé maravillosamente.",           context: "Valoración positiva" },
        { en: "We stayed in a lovely hotel.",             es: "Nos alojamos en un hotel encantador.", context: "Alojamiento" },
        { en: "I met an old friend yesterday.",           es: "Ayer me encontré con un viejo amigo.", context: "Reencuentro" },
        { en: "I've never been to Japan.",                es: "Nunca he estado en Japón.",           context: "Experiencia (Present Perfect)" },
        { en: "Have you ever tried sushi?",               es: "¿Has probado el sushi alguna vez?",   context: "Experiencia pregunta" },
        { en: "It happened a long time ago.",             es: "Pasó hace mucho tiempo.",             context: "Pasado lejano" },
      ],
    },
  },

  future: {
    name: "Talking about the Future",
    es: "Hablar del futuro",
    icon: "✈️",
    color: "#06B6D4",
    levels: {
      A1: [
        { en: "I'm going to visit London.",          es: "Voy a visitar Londres.",                    context: "Plan futuro" },
        { en: "Tomorrow I'm going to work.",         es: "Mañana voy a trabajar.",                    context: "Plan inmediato" },
        { en: "What are you going to do?",           es: "¿Qué vas a hacer?",                         context: "Pregunta sobre planes" },
        { en: "See you tomorrow.",                   es: "Hasta mañana.",                             context: "Futuro próximo" },
        { en: "See you next week.",                  es: "Hasta la semana que viene.",                context: "Futuro" },
        { en: "I'll call you later.",                es: "Te llamo luego.",                           context: "Decisión espontánea" },
        { en: "I'll see.",                           es: "Ya veré.",                                  context: "Decisión pendiente" },
        { en: "Maybe next time.",                    es: "Quizá la próxima.",                         context: "Posibilidad futura" },
        { en: "Soon.",                               es: "Pronto.",                                   context: "Tiempo vago futuro" },
        { en: "Have a good trip!",                   es: "¡Buen viaje!",                              context: "Despedida antes de viajar" },
      ],
      A2: [
        { en: "I'm going on holiday next month.",        es: "Me voy de vacaciones el mes que viene.", context: "Plan vacacional" },
        { en: "What are you doing this weekend?",        es: "¿Qué haces este fin de semana?",       context: "Plan inmediato (Pres. Cont.)" },
        { en: "I'm meeting Sara at six.",                es: "He quedado con Sara a las seis.",      context: "Cita concertada" },
        { en: "I think it will rain.",                   es: "Creo que va a llover.",                context: "Predicción con 'will'" },
        { en: "I probably won't be there.",              es: "Probablemente no estaré allí.",        context: "Predicción negativa" },
        { en: "I'm thinking of moving abroad.",          es: "Estoy pensando en mudarme al extranjero.", context: "Plan en consideración" },
        { en: "We're planning a trip to Greece.",        es: "Estamos planeando un viaje a Grecia.", context: "Plan en marcha" },
        { en: "I'll let you know.",                      es: "Ya te aviso.",                         context: "Confirmación pendiente" },
        { en: "Looking forward to it!",                  es: "¡Tengo muchas ganas!",                 context: "Anticipación positiva" },
        { en: "Fingers crossed!",                        es: "¡Crucemos los dedos!",                 context: "Buena suerte futura" },
      ],
    },
  },
};

// ─── INTERMEDIATE FUNCTIONS (B1/B2) ──────────────────────────────
// Functions a B1+ learner actually uses: expressing opinions with
// nuance, agreeing/disagreeing politely, making suggestions, telling
// stories, giving advice, comparing options, expressing complex
// emotions. Not "Hello!" any more.

export const INTERMEDIATE_FUNCTIONS = {
  opinions: {
    name: "Expressing Opinions",
    es: "Expresar opiniones",
    icon: "💭",
    color: "#6366F1",
    levels: {
      B1: [
        { en: "In my opinion, it's a good idea.",        es: "En mi opinión, es una buena idea.",          context: "Opinión personal directa" },
        { en: "I think we should try.",                  es: "Creo que deberíamos intentarlo.",            context: "Opinión + sugerencia" },
        { en: "I believe it's the right thing to do.",   es: "Creo que es lo correcto.",                   context: "Convicción moral" },
        { en: "Personally, I prefer this one.",          es: "Personalmente, prefiero este.",              context: "Preferencia personal" },
        { en: "If you ask me, it's too expensive.",      es: "Si me lo preguntas, es demasiado caro.",     context: "Opinión informal" },
        { en: "From my point of view, it's fair.",       es: "Desde mi punto de vista, es justo.",         context: "Opinión razonada" },
        { en: "I'd say it's worth it.",                  es: "Yo diría que vale la pena.",                 context: "Opinión suavizada" },
        { en: "It seems to me that...",                  es: "Me parece que...",                           context: "Opinión tentativa" },
        { en: "What do you think about it?",             es: "¿Qué piensas al respecto?",                  context: "Pedir opinión" },
        { en: "How do you feel about that?",             es: "¿Qué te parece?",                            context: "Pedir reacción emocional" },
      ],
      B2: [
        { en: "I'd argue that the data supports it.",          es: "Yo argumentaría que los datos lo respaldan.",   context: "Opinión argumentada" },
        { en: "As far as I'm concerned, it's settled.",        es: "Por lo que a mí respecta, está zanjado.",       context: "Cerrar un tema con énfasis" },
        { en: "I'm of the opinion that we should wait.",       es: "Soy de la opinión de que deberíamos esperar.",  context: "Opinión formal" },
        { en: "If I'm being honest, I have my doubts.",        es: "Si te soy sincero, tengo mis dudas.",           context: "Opinión franca con prudencia" },
        { en: "Strictly speaking, that's not accurate.",       es: "Estrictamente hablando, eso no es exacto.",     context: "Corrección matizada" },
        { en: "It's debatable whether it's worth it.",         es: "Es discutible si vale la pena.",                context: "Reconocer controversia" },
        { en: "I'm inclined to think it'll work.",             es: "Me inclino a pensar que funcionará.",           context: "Opinión cautelosa" },
        { en: "There's no question that it's improved.",       es: "No hay duda de que ha mejorado.",               context: "Afirmación enfática" },
        { en: "I have mixed feelings about it.",               es: "Tengo sentimientos encontrados al respecto.",   context: "Ambigüedad reconocida" },
        { en: "It's open to interpretation.",                  es: "Está abierto a interpretación.",                context: "Reconocer subjetividad" },
      ],
    },
  },

  agreeing: {
    name: "Agreeing & Disagreeing",
    es: "Acuerdo y desacuerdo",
    icon: "🤝",
    color: "#10B981",
    levels: {
      B1: [
        { en: "I agree with you.",                       es: "Estoy de acuerdo contigo.",                  context: "Acuerdo directo" },
        { en: "That's exactly what I think.",            es: "Eso es exactamente lo que pienso.",          context: "Acuerdo enfático" },
        { en: "You're absolutely right.",                es: "Tienes toda la razón.",                      context: "Acuerdo total" },
        { en: "I see your point.",                       es: "Veo tu punto de vista.",                     context: "Reconocer postura" },
        { en: "I don't agree.",                          es: "No estoy de acuerdo.",                       context: "Desacuerdo simple" },
        { en: "I'm afraid I disagree.",                  es: "Me temo que no estoy de acuerdo.",           context: "Desacuerdo educado" },
        { en: "That's not how I see it.",                es: "Yo no lo veo así.",                          context: "Desacuerdo suavizado" },
        { en: "I'm not so sure about that.",             es: "No estoy tan seguro de eso.",                context: "Duda + desacuerdo" },
        { en: "Yes, but on the other hand...",           es: "Sí, pero por otro lado...",                  context: "Contraargumentar" },
        { en: "It depends.",                             es: "Depende.",                                   context: "Ni acuerdo ni desacuerdo" },
      ],
      B2: [
        { en: "I couldn't agree more.",                       es: "No podría estar más de acuerdo.",              context: "Acuerdo enfático máximo" },
        { en: "You've got a point there.",                    es: "Ahí tienes razón.",                            context: "Conceder un punto" },
        { en: "I see where you're coming from, but...",       es: "Entiendo por dónde vas, pero...",              context: "Empatía + desacuerdo" },
        { en: "I beg to differ.",                             es: "Permíteme discrepar.",                         context: "Desacuerdo formal" },
        { en: "With all due respect, I disagree.",            es: "Con todo el respeto, no estoy de acuerdo.",    context: "Desacuerdo muy educado" },
        { en: "That's debatable.",                            es: "Eso es discutible.",                           context: "Cuestionar afirmación" },
        { en: "I'm not entirely convinced.",                  es: "No estoy del todo convencido.",                context: "Reservas" },
        { en: "We'll have to agree to disagree.",             es: "Tendremos que estar de acuerdo en discrepar.", context: "Cerrar discusión sin solución" },
        { en: "Up to a point, yes.",                          es: "Hasta cierto punto, sí.",                      context: "Acuerdo parcial" },
        { en: "There's some truth in that, but...",           es: "Hay algo de verdad en eso, pero...",           context: "Reconocer + contraargumentar" },
      ],
    },
  },

  suggestions: {
    name: "Making Suggestions",
    es: "Hacer sugerencias",
    icon: "💡",
    color: "#F59E0B",
    levels: {
      B1: [
        { en: "Why don't we go to the cinema?",          es: "¿Por qué no vamos al cine?",                 context: "Sugerencia informal" },
        { en: "How about Italian food?",                 es: "¿Qué tal comida italiana?",                  context: "Sugerencia con opción" },
        { en: "Shall we leave now?",                     es: "¿Nos vamos ya?",                             context: "Sugerencia directa" },
        { en: "Let's try a different one.",              es: "Probemos uno distinto.",                     context: "Proposición inclusiva" },
        { en: "What about meeting on Friday?",           es: "¿Y si quedamos el viernes?",                 context: "Sugerencia + propuesta" },
        { en: "We could share a taxi.",                  es: "Podríamos compartir un taxi.",               context: "Sugerencia cautelosa" },
        { en: "That sounds great.",                      es: "Suena genial.",                              context: "Aceptar sugerencia" },
        { en: "Sounds like a plan.",                     es: "Me parece un buen plan.",                    context: "Aceptar entusiastamente" },
        { en: "I'd rather not, thanks.",                 es: "Preferiría no, gracias.",                    context: "Rechazo educado" },
        { en: "Maybe another time.",                     es: "Quizás en otra ocasión.",                    context: "Rechazo amable" },
      ],
      B2: [
        { en: "It might be worth considering...",             es: "Podría merecer la pena considerar...",         context: "Sugerencia formal" },
        { en: "Have you thought about doing it differently?", es: "¿Has pensado en hacerlo de otra manera?",      context: "Sugerencia indirecta" },
        { en: "If you don't mind my suggesting it...",        es: "Si no te importa que lo sugiera...",           context: "Sugerencia muy educada" },
        { en: "One option would be to delay.",                es: "Una opción sería retrasarlo.",                 context: "Proponer alternativa" },
        { en: "I'd suggest we put it off until Monday.",      es: "Sugeriría que lo pospusiéramos hasta el lunes.", context: "Sugerencia formal con verbo" },
        { en: "It wouldn't hurt to try.",                     es: "No estaría de más intentarlo.",                context: "Animar a probar" },
        { en: "That's a fantastic idea!",                     es: "¡Es una idea fantástica!",                     context: "Aceptación entusiasta" },
        { en: "I'm afraid that won't work for me.",           es: "Me temo que eso no me funciona.",              context: "Rechazo educado" },
        { en: "Could we possibly do it later?",               es: "¿Podríamos quizás hacerlo más tarde?",         context: "Contrapropuesta cortés" },
        { en: "I'll think about it and get back to you.",     es: "Lo pensaré y te diré algo.",                   context: "Posponer decisión" },
      ],
    },
  },

  speculating: {
    name: "Speculating",
    es: "Especular y deducir",
    icon: "🤔",
    color: "#A855F7",
    levels: {
      B1: [
        { en: "It might rain later.",                    es: "Podría llover más tarde.",                   context: "Posibilidad neutra" },
        { en: "She may be at home.",                     es: "Puede que esté en casa.",                    context: "Suposición" },
        { en: "He could be right.",                      es: "Podría tener razón.",                        context: "Posibilidad razonable" },
        { en: "It must be after ten.",                   es: "Deben ser más de las diez.",                 context: "Deducción casi cierta" },
        { en: "It can't be true.",                       es: "No puede ser verdad.",                       context: "Imposibilidad" },
        { en: "Maybe they forgot.",                      es: "Quizá se olvidaron.",                        context: "Posibilidad informal" },
        { en: "Perhaps it's a misunderstanding.",        es: "Quizá sea un malentendido.",                 context: "Posibilidad cautelosa" },
        { en: "I'm not sure, but...",                    es: "No estoy seguro, pero...",                   context: "Hipótesis con reserva" },
        { en: "I bet they're stuck in traffic.",         es: "Apuesto a que están en un atasco.",          context: "Conjetura informal" },
        { en: "I wonder if she's coming.",               es: "Me pregunto si vendrá.",                     context: "Especulación abierta" },
      ],
      B2: [
        { en: "She's bound to find out sooner or later.",     es: "Se enterará tarde o temprano, seguro.",       context: "Certeza futura" },
        { en: "He's likely to refuse.",                       es: "Es probable que rechace.",                    context: "Probabilidad" },
        { en: "It's highly unlikely they'll agree.",          es: "Es muy improbable que estén de acuerdo.",     context: "Probabilidad baja" },
        { en: "There's a good chance it'll snow.",            es: "Hay bastantes probabilidades de que nieve.",  context: "Probabilidad media-alta" },
        { en: "It's probably nothing.",                       es: "Probablemente no sea nada.",                  context: "Restar importancia especulativamente" },
        { en: "He must have left early.",                     es: "Debe haberse ido temprano.",                  context: "Deducción pasada" },
        { en: "She can't have forgotten.",                    es: "No puede haberse olvidado.",                  context: "Negar deducción pasada" },
        { en: "What if we're wrong?",                         es: "¿Y si estamos equivocados?",                  context: "Plantear hipótesis" },
        { en: "Chances are they're already there.",           es: "Lo más probable es que ya estén allí.",       context: "Probabilidad informal" },
        { en: "I have a hunch he knows.",                     es: "Tengo el pálpito de que lo sabe.",            context: "Intuición" },
      ],
    },
  },

  feelings: {
    name: "Expressing Feelings",
    es: "Expresar sentimientos",
    icon: "😟",
    color: "#EF4444",
    levels: {
      B1: [
        { en: "I'm really happy about it.",              es: "Estoy muy contento por ello.",               context: "Alegría intensa" },
        { en: "I'm a bit worried.",                      es: "Estoy un poco preocupado.",                  context: "Preocupación leve" },
        { en: "That's frustrating.",                     es: "Es frustrante.",                             context: "Reaccionar a algo molesto" },
        { en: "I feel sorry for her.",                   es: "Lo siento por ella.",                        context: "Empatía / pena" },
        { en: "I'm relieved to hear that.",              es: "Es un alivio oír eso.",                      context: "Alivio" },
        { en: "I'm a little disappointed.",              es: "Estoy un poco decepcionado.",                context: "Decepción suave" },
        { en: "It made me really angry.",                es: "Me enfadó mucho.",                           context: "Enfado pasado" },
        { en: "I'm so excited!",                         es: "¡Estoy emocionadísimo!",                     context: "Entusiasmo intenso" },
        { en: "I'm proud of you.",                       es: "Estoy orgulloso de ti.",                     context: "Orgullo hacia otro" },
        { en: "That makes me nervous.",                  es: "Eso me pone nervioso.",                      context: "Nerviosismo causal" },
      ],
      B2: [
        { en: "I'm absolutely thrilled.",                     es: "Estoy absolutamente emocionado.",              context: "Entusiasmo formal" },
        { en: "I'm over the moon.",                           es: "Estoy en una nube.",                           context: "Alegría coloquial" },
        { en: "It drives me mad when people are late.",       es: "Me saca de quicio que la gente llegue tarde.", context: "Irritación específica" },
        { en: "I'm fed up with this situation.",              es: "Estoy harto de esta situación.",               context: "Hartazgo" },
        { en: "I'm at my wit's end.",                         es: "No sé qué hacer ya.",                          context: "Desesperación" },
        { en: "I feel torn between two options.",             es: "Estoy entre dos opciones.",                    context: "Dilema emocional" },
        { en: "I'm gutted, to be honest.",                    es: "Estoy hecho polvo, la verdad.",                context: "Decepción coloquial" },
        { en: "It warms my heart.",                           es: "Me reconforta el corazón.",                    context: "Emoción tierna" },
        { en: "I'm completely overwhelmed.",                  es: "Estoy completamente abrumado.",                context: "Sobrecarga emocional" },
        { en: "I couldn't be more grateful.",                 es: "No podría estar más agradecido.",              context: "Gratitud máxima" },
      ],
    },
  },

  apologising: {
    name: "Apologising & Forgiving",
    es: "Disculparse y perdonar",
    icon: "🙏",
    color: "#EC4899",
    levels: {
      B1: [
        { en: "I'm really sorry.",                       es: "Lo siento mucho.",                           context: "Disculpa sincera" },
        { en: "I apologise for the mistake.",            es: "Pido disculpas por el error.",               context: "Disculpa formal corta" },
        { en: "It was my fault.",                        es: "Fue culpa mía.",                             context: "Aceptar responsabilidad" },
        { en: "I didn't mean to.",                       es: "No fue mi intención.",                       context: "Explicar falta de intención" },
        { en: "I should have called you.",               es: "Debería haberte llamado.",                   context: "Reconocer omisión" },
        { en: "Don't worry about it.",                   es: "No te preocupes.",                           context: "Disculpa aceptada" },
        { en: "It's all right.",                         es: "No pasa nada.",                              context: "Quitar importancia" },
        { en: "These things happen.",                    es: "Estas cosas pasan.",                         context: "Restar importancia" },
        { en: "Apology accepted.",                       es: "Disculpa aceptada.",                         context: "Aceptación formal" },
        { en: "I forgive you.",                          es: "Te perdono.",                                context: "Perdón explícito" },
      ],
      B2: [
        { en: "Please accept my sincere apologies.",          es: "Por favor, acepta mis sinceras disculpas.",    context: "Disculpa muy formal" },
        { en: "I take full responsibility for what happened.", es: "Asumo toda la responsabilidad de lo ocurrido.", context: "Responsabilidad total" },
        { en: "I owe you an apology.",                        es: "Te debo una disculpa.",                        context: "Reconocer deuda moral" },
        { en: "It won't happen again.",                       es: "No volverá a pasar.",                          context: "Compromiso futuro" },
        { en: "I deeply regret my actions.",                  es: "Lamento profundamente lo que hice.",           context: "Arrepentimiento formal" },
        { en: "How can I make it up to you?",                 es: "¿Cómo puedo compensarte?",                     context: "Ofrecer reparación" },
        { en: "Let's put it behind us.",                      es: "Dejémoslo atrás.",                             context: "Cerrar el asunto" },
        { en: "No hard feelings.",                            es: "Sin rencor.",                                  context: "Sin resentimiento" },
        { en: "Water under the bridge.",                      es: "Agua pasada.",                                 context: "Olvidar lo ocurrido" },
        { en: "I appreciate the apology.",                    es: "Agradezco la disculpa.",                       context: "Reconocer el gesto" },
      ],
    },
  },

  comparing: {
    name: "Comparing & Contrasting",
    es: "Comparar y contrastar",
    icon: "⚖️",
    color: "#14B8A6",
    levels: {
      B1: [
        { en: "This one is better than that one.",       es: "Este es mejor que aquel.",                   context: "Comparativo simple" },
        { en: "It's similar to the previous one.",       es: "Se parece al anterior.",                     context: "Similitud" },
        { en: "It's different from what I expected.",    es: "Es distinto de lo que esperaba.",            context: "Diferencia con expectativa" },
        { en: "They have a lot in common.",              es: "Tienen mucho en común.",                     context: "Puntos compartidos" },
        { en: "On the other hand, it's cheaper.",        es: "Por otro lado, es más barato.",              context: "Contraste introductorio" },
        { en: "Compared to last year, sales are up.",    es: "Comparado con el año pasado, las ventas suben.", context: "Comparación con referencia" },
        { en: "Both options have their advantages.",     es: "Ambas opciones tienen sus ventajas.",        context: "Reconocer pros mutuos" },
        { en: "Neither is perfect.",                     es: "Ninguno es perfecto.",                       context: "Limitación mutua" },
        { en: "There's a big difference between them.",  es: "Hay una gran diferencia entre ellos.",       context: "Diferencia evidente" },
        { en: "It's not the same as before.",            es: "No es lo mismo que antes.",                  context: "Cambio temporal" },
      ],
      B2: [
        { en: "Whereas the first option is cheap, the second is faster.", es: "Mientras que la primera opción es barata, la segunda es más rápida.", context: "Contraste formal" },
        { en: "Unlike the others, this one is durable.",     es: "A diferencia de los otros, este es duradero.",  context: "Diferencia destacada" },
        { en: "By comparison, ours is more affordable.",     es: "En comparación, el nuestro es más asequible.",  context: "Marcador comparativo" },
        { en: "In contrast to last year, demand has dropped.", es: "En contraste con el año pasado, la demanda ha caído.", context: "Contraste numérico" },
        { en: "On one hand it's quick; on the other, it's risky.", es: "Por un lado es rápido; por otro, es arriesgado.", context: "Contraste doble" },
        { en: "There's no comparison.",                       es: "No hay comparación.",                          context: "Diferencia abismal" },
        { en: "It's a far cry from what was promised.",       es: "Dista mucho de lo prometido.",                 context: "Diferencia entre expectativa y realidad" },
        { en: "They couldn't be more different.",             es: "No podrían ser más distintos.",                context: "Oposición total" },
        { en: "It pales in comparison.",                      es: "Palidece en comparación.",                     context: "Diferencia muy desfavorable" },
        { en: "All things considered, the second is better.", es: "Considerándolo todo, el segundo es mejor.",    context: "Conclusión equilibrada" },
      ],
    },
  },

  storytelling: {
    name: "Telling a Story",
    es: "Contar una anécdota",
    icon: "📖",
    color: "#F97316",
    levels: {
      B1: [
        { en: "Let me tell you what happened.",          es: "Déjame contarte lo que pasó.",               context: "Inicio de anécdota" },
        { en: "It was a few years ago.",                 es: "Fue hace unos años.",                        context: "Contextualizar en el tiempo" },
        { en: "At first, I didn't notice.",              es: "Al principio, no me di cuenta.",             context: "Inicio temporal" },
        { en: "Then suddenly, the lights went out.",     es: "Y de repente, se fueron las luces.",         context: "Acción inesperada" },
        { en: "Meanwhile, my brother was sleeping.",     es: "Mientras tanto, mi hermano dormía.",         context: "Acción simultánea" },
        { en: "After that, things got worse.",           es: "Después de eso, las cosas empeoraron.",      context: "Secuencia narrativa" },
        { en: "In the end, everything worked out.",      es: "Al final, todo salió bien.",                 context: "Conclusión positiva" },
        { en: "I'll never forget that day.",             es: "Nunca olvidaré ese día.",                    context: "Cierre emotivo" },
        { en: "You wouldn't believe what happened next.", es: "No te creerías lo que pasó después.",       context: "Suspense" },
        { en: "Anyway, that's the story.",               es: "En fin, esa es la historia.",                context: "Cierre informal" },
      ],
      B2: [
        { en: "You won't believe what happened to me yesterday.", es: "No te vas a creer lo que me pasó ayer.",      context: "Inicio enganche" },
        { en: "To cut a long story short, we got lost.",         es: "Para resumir, nos perdimos.",                  context: "Resumir narración" },
        { en: "It all started when...",                          es: "Todo empezó cuando...",                        context: "Inicio dramático" },
        { en: "Out of the blue, he called me.",                  es: "De la nada, me llamó.",                        context: "Suceso inesperado" },
        { en: "Before I knew it, we were lost.",                 es: "Antes de darme cuenta, estábamos perdidos.",   context: "Sorpresa temporal" },
        { en: "Little did I know what was about to happen.",     es: "Poco sabía yo lo que estaba a punto de pasar.", context: "Anticipación dramática" },
        { en: "To my surprise, he was already there.",           es: "Para mi sorpresa, ya estaba allí.",            context: "Reacción inesperada" },
        { en: "As luck would have it, we missed the train.",     es: "Para nuestra suerte, perdimos el tren.",       context: "Ironía irónica" },
        { en: "It turned out to be a misunderstanding.",         es: "Resultó ser un malentendido.",                 context: "Resolución" },
        { en: "And the rest, as they say, is history.",          es: "Y lo demás, como suele decirse, es historia.", context: "Cierre clásico" },
      ],
    },
  },

  advice: {
    name: "Giving Advice",
    es: "Dar consejos",
    icon: "🎯",
    color: "#8B5CF6",
    levels: {
      B1: [
        { en: "You should see a doctor.",                es: "Deberías ir al médico.",                     context: "Consejo directo" },
        { en: "You shouldn't work so hard.",             es: "No deberías trabajar tanto.",                context: "Consejo negativo" },
        { en: "Why don't you take a break?",             es: "¿Por qué no te tomas un descanso?",          context: "Consejo en pregunta" },
        { en: "If I were you, I'd accept.",              es: "Yo que tú, aceptaría.",                      context: "Consejo personalizado" },
        { en: "You'd better hurry up.",                  es: "Más vale que te des prisa.",                 context: "Consejo apremiante" },
        { en: "It's worth trying.",                      es: "Vale la pena intentarlo.",                   context: "Animar a actuar" },
        { en: "Have you tried calling her?",             es: "¿Has probado a llamarla?",                   context: "Sugerencia indirecta" },
        { en: "I'd recommend the seafood.",              es: "Te recomiendo el marisco.",                  context: "Recomendación" },
        { en: "Take my advice and rest.",                es: "Hazme caso y descansa.",                     context: "Insistir en consejo" },
        { en: "It's up to you, but I'd think twice.",    es: "Tú decides, pero yo lo pensaría dos veces.", context: "Consejo + libertad" },
      ],
      B2: [
        { en: "If I were in your shoes, I'd talk to her.",       es: "Si estuviera en tu lugar, hablaría con ella.",  context: "Empatía + consejo" },
        { en: "It might be a good idea to wait.",                es: "Podría ser buena idea esperar.",                context: "Consejo suavizado" },
        { en: "Have you ever considered changing jobs?",         es: "¿Has considerado cambiar de trabajo?",          context: "Sugerencia profunda" },
        { en: "You'd be better off sleeping on it.",             es: "Te iría mejor consultarlo con la almohada.",    context: "Posponer decisión" },
        { en: "I'd think twice before doing that.",              es: "Yo me lo pensaría dos veces antes de hacer eso.", context: "Advertencia" },
        { en: "Whatever you do, don't sign anything yet.",       es: "Hagas lo que hagas, no firmes nada todavía.",   context: "Advertencia enfática" },
        { en: "Take it from someone who's been there.",          es: "Hazme caso, hablo por experiencia.",            context: "Consejo con autoridad" },
        { en: "My advice would be to go with your gut.",         es: "Mi consejo sería que te fíes de tu instinto.",  context: "Consejo formal" },
        { en: "There's no harm in asking.",                      es: "No pierdes nada por preguntar.",                context: "Animar a actuar" },
        { en: "I'd steer clear of that if I were you.",          es: "Yo de ti, me mantendría alejado de eso.",       context: "Advertencia + sugerencia" },
      ],
    },
  },

  habits: {
    name: "Habits & Changes",
    es: "Hábitos y cambios",
    icon: "⏳",
    color: "#06B6D4",
    levels: {
      B1: [
        { en: "I used to smoke, but I stopped.",         es: "Antes fumaba, pero lo dejé.",                context: "Hábito pasado abandonado" },
        { en: "I'm used to working long hours.",         es: "Estoy acostumbrado a trabajar muchas horas.", context: "Hábito presente normalizado" },
        { en: "I'm getting used to it.",                 es: "Me estoy acostumbrando.",                    context: "Proceso de adaptación" },
        { en: "When I was a child, we lived in the country.", es: "Cuando era niño, vivíamos en el campo.", context: "Hábito de infancia" },
        { en: "I never used to like coffee.",            es: "Antes no me gustaba el café.",               context: "Hábito negativo pasado" },
        { en: "She's changed a lot.",                    es: "Ha cambiado mucho.",                         context: "Cambio personal" },
        { en: "It's not what it used to be.",            es: "Ya no es lo que era.",                       context: "Cambio en algo familiar" },
        { en: "Things have changed since then.",         es: "Las cosas han cambiado desde entonces.",     context: "Cambio temporal" },
        { en: "I tend to wake up early.",                es: "Suelo despertarme temprano.",                context: "Tendencia presente" },
        { en: "Every now and then, I have a coffee.",    es: "De vez en cuando, tomo un café.",            context: "Frecuencia baja" },
      ],
      B2: [
        { en: "I would always spend my summers at the beach.",   es: "Solía pasar siempre los veranos en la playa.",  context: "Hábito repetido pasado" },
        { en: "It's becoming more and more common.",             es: "Cada vez es más común.",                        context: "Cambio gradual" },
        { en: "He's not the man he used to be.",                 es: "Ya no es el hombre que era.",                   context: "Cambio personal radical" },
        { en: "I've grown accustomed to it.",                    es: "Me he acostumbrado.",                           context: "Adaptación completada" },
        { en: "Old habits die hard.",                            es: "Las viejas costumbres no mueren.",              context: "Dificultad de cambio" },
        { en: "I make a point of exercising daily.",             es: "Me esfuerzo en hacer ejercicio a diario.",      context: "Hábito consciente" },
        { en: "I find it hard to break the habit.",              es: "Me cuesta quitarme la costumbre.",              context: "Lucha contra hábito" },
        { en: "Over the years, things have evolved.",            es: "Con los años, las cosas han evolucionado.",     context: "Evolución temporal" },
        { en: "I've come to enjoy it.",                          es: "He llegado a disfrutarlo.",                     context: "Cambio de actitud gradual" },
        { en: "It's water off a duck's back to me now.",         es: "Ya me resbala.",                                context: "Indiferencia adquirida" },
      ],
    },
  },
};

// ─── ADVANCED FUNCTIONS (C1/C2) ──────────────────────────────────
// Functions a C1+ speaker uses to add register, nuance and elegance.
// At this level the learner already speaks fluently — what they need
// is precision, idiomaticity, and command of formal/academic register.

export const ADVANCED_FUNCTIONS = {
  hedging: {
    name: "Hedging & Softening",
    es: "Matizar y suavizar",
    icon: "🎩",
    color: "#6366F1",
    levels: {
      C1: [
        { en: "It could be argued that the policy is flawed.",     es: "Cabría argumentar que la política es deficiente.",       context: "Crítica suavizada" },
        { en: "I'd hesitate to say it's the only option.",         es: "Me costaría afirmar que es la única opción.",            context: "Cautela ante afirmación absoluta" },
        { en: "There's a sense in which both are correct.",        es: "En cierto sentido, ambas son correctas.",                context: "Reconocer multiplicidad" },
        { en: "I'm somewhat inclined to disagree.",                es: "Me inclino más bien a discrepar.",                       context: "Desacuerdo matizado" },
        { en: "It would seem that things are improving.",          es: "Diría uno que las cosas están mejorando.",               context: "Conclusión cautelosa" },
        { en: "Not to put too fine a point on it, he's wrong.",    es: "Sin entrar en sutilezas, está equivocado.",              context: "Crítica directa con cortesía formal" },
        { en: "I wouldn't go so far as to call it a disaster.",    es: "No llegaría tan lejos como para llamarlo un desastre.",  context: "Atenuar valoración extrema" },
        { en: "There's a degree of truth in that.",                es: "Hay parte de razón en eso.",                             context: "Acuerdo parcial elegante" },
        { en: "I tend to think we underestimate the risk.",        es: "Tiendo a pensar que subestimamos el riesgo.",            context: "Opinión presentada como tendencia" },
        { en: "It's not entirely clear-cut.",                      es: "No está del todo claro.",                                context: "Reconocer complejidad" },
      ],
      C2: [
        { en: "One might venture to suggest that the data is misleading.", es: "Uno podría aventurarse a sugerir que los datos son engañosos.", context: "Crítica académica muy matizada" },
        { en: "I'd be loath to commit to a definitive answer.",            es: "Me resistiría a comprometerme con una respuesta definitiva.",    context: "Reserva extrema" },
        { en: "There's something to be said for the opposing view.",       es: "Algo se puede decir a favor de la postura contraria.",            context: "Reconocer mérito en lo opuesto" },
        { en: "I'm of two minds on the matter.",                           es: "Estoy dividido al respecto.",                                     context: "Ambivalencia personal" },
        { en: "Were I pressed, I'd say it's unlikely.",                    es: "Si me obligaran a pronunciarme, diría que es improbable.",        context: "Cautela formal-literaria" },
        { en: "It strikes me as somewhat premature.",                      es: "Me parece, en cierto modo, prematuro.",                          context: "Juicio suavizado" },
        { en: "I'd refrain from drawing firm conclusions.",                es: "Me abstendría de extraer conclusiones firmes.",                   context: "Prudencia conclusiva" },
        { en: "The evidence is, at best, suggestive.",                     es: "Las pruebas son, como mucho, indicativas.",                       context: "Restar peso a evidencia" },
        { en: "I'd prefer not to speculate on motives.",                   es: "Preferiría no especular sobre motivos.",                          context: "Eludir juicio personal" },
        { en: "There are nuances that bear consideration.",                es: "Hay matices que merecen consideración.",                          context: "Llamar a la prudencia" },
      ],
    },
  },

  emphatic: {
    name: "Emphatic Statements",
    es: "Afirmaciones enfáticas",
    icon: "🎯",
    color: "#EF4444",
    levels: {
      C1: [
        { en: "The fact of the matter is that we're behind schedule.", es: "La cuestión es que vamos con retraso.",                  context: "Enfatizar realidad innegable" },
        { en: "Make no mistake, this is serious.",                     es: "Que no quepa duda, esto es serio.",                       context: "Advertencia enfática" },
        { en: "What I can say with certainty is that we tried.",       es: "Lo que sí puedo afirmar con certeza es que lo intentamos.", context: "Afirmar con seguridad" },
        { en: "There's no denying it was a mistake.",                  es: "No se puede negar que fue un error.",                     context: "Aceptación enfática" },
        { en: "It goes without saying that quality matters.",          es: "Ni que decir tiene que la calidad importa.",              context: "Lo obvio reafirmado" },
        { en: "I cannot stress enough how important this is.",         es: "No puedo enfatizar suficientemente lo importante que es esto.", context: "Énfasis máximo" },
        { en: "Quite simply, we have no alternative.",                 es: "Sencillamente, no tenemos alternativa.",                  context: "Conclusión rotunda" },
        { en: "Let me be perfectly clear about this.",                 es: "Permítanme ser absolutamente claro sobre esto.",          context: "Anunciar precisión formal" },
        { en: "Above all, we must remain calm.",                       es: "Sobre todo, debemos mantener la calma.",                  context: "Prioridad absoluta" },
        { en: "Without a shadow of a doubt, she's the best.",          es: "Sin sombra de duda, ella es la mejor.",                   context: "Certeza absoluta" },
      ],
      C2: [
        { en: "I cannot overemphasise the gravity of the situation.",       es: "No puedo sobrestimar la gravedad de la situación.",          context: "Énfasis formal" },
        { en: "It bears repeating: this must not happen again.",            es: "Conviene repetirlo: esto no debe volver a ocurrir.",          context: "Reiteración solemne" },
        { en: "By no stretch of the imagination is that acceptable.",       es: "Por ningún concepto resulta eso aceptable.",                  context: "Rechazo enfático absoluto" },
        { en: "Suffice it to say, the outcome was unsatisfactory.",         es: "Baste decir que el resultado fue insatisfactorio.",           context: "Resumir con énfasis" },
        { en: "I dare say nothing of the sort was intended.",               es: "Me atrevería a decir que nada de eso se pretendía.",           context: "Afirmar con cortesía formal" },
        { en: "There can be no two ways about it.",                         es: "No hay dos maneras de verlo.",                                 context: "Certeza inapelable" },
        { en: "It is no exaggeration to say this is unprecedented.",        es: "No es exagerado decir que esto no tiene precedentes.",        context: "Énfasis con respaldo" },
        { en: "I'll go on record to say we were misled.",                   es: "Lo digo abiertamente: nos engañaron.",                        context: "Declaración pública" },
        { en: "On no account should this be repeated.",                     es: "Bajo ningún concepto debe repetirse esto.",                   context: "Prohibición enfática" },
        { en: "It cannot be stated too forcefully that we object.",         es: "No se puede afirmar con suficiente fuerza que nos oponemos.", context: "Énfasis institucional" },
      ],
    },
  },

  conclusions: {
    name: "Tentative Conclusions",
    es: "Conclusiones tentativas",
    icon: "🤔",
    color: "#A855F7",
    levels: {
      C1: [
        { en: "All things considered, the result is positive.",     es: "Considerándolo todo, el resultado es positivo.",          context: "Conclusión sopesada" },
        { en: "On balance, I'd say it's worth the effort.",         es: "En conjunto, diría que vale la pena el esfuerzo.",        context: "Conclusión ponderada" },
        { en: "In the final analysis, what matters is the outcome.", es: "En última instancia, lo que importa es el resultado.",    context: "Cierre analítico" },
        { en: "Taking everything into account, we should proceed.",  es: "Teniendo todo en cuenta, deberíamos proceder.",          context: "Decisión razonada" },
        { en: "Weighing the pros and cons, it's a sound choice.",    es: "Sopesando los pros y los contras, es una opción acertada.", context: "Análisis comparativo concluyente" },
        { en: "At the end of the day, results speak for themselves.", es: "A fin de cuentas, los resultados hablan por sí solos.",  context: "Cierre práctico" },
        { en: "Looking at the big picture, things are improving.",    es: "Mirando el panorama general, las cosas mejoran.",         context: "Visión global" },
        { en: "When all is said and done, it's a worthwhile project.", es: "Al fin y al cabo, es un proyecto que merece la pena.",   context: "Cierre evaluativo" },
        { en: "On the whole, the response has been favourable.",      es: "En general, la respuesta ha sido favorable.",             context: "Resumen valorativo" },
        { en: "By and large, we're on the right track.",              es: "En líneas generales, vamos por buen camino.",             context: "Conclusión confiada" },
      ],
      C2: [
        { en: "On reflection, I'd posit that the strategy is flawed.",     es: "Tras reflexionar, postularía que la estrategia es deficiente.", context: "Conclusión académica" },
        { en: "All things being equal, the outcome would have differed.", es: "En igualdad de condiciones, el resultado habría sido distinto.", context: "Conclusión hipotética formal" },
        { en: "Upon careful consideration, the merits outweigh the risks.", es: "Tras una cuidadosa consideración, los méritos superan a los riesgos.", context: "Veredicto razonado" },
        { en: "In light of the foregoing, our position is justified.",    es: "A la luz de lo anterior, nuestra postura está justificada.",      context: "Conclusión jurídico-formal" },
        { en: "It would be remiss not to acknowledge the limitations.",   es: "Sería un descuido no reconocer las limitaciones.",                 context: "Reconocer en cierre" },
        { en: "The evidence, taken as a whole, points to one conclusion.", es: "Las pruebas, en su conjunto, apuntan a una sola conclusión.",   context: "Síntesis probatoria" },
        { en: "Notwithstanding the caveats, the case is compelling.",     es: "Pese a las salvedades, el argumento es convincente.",              context: "Conclusión a pesar de reservas" },
        { en: "On closer inspection, the discrepancies are minor.",       es: "Mirando más de cerca, las discrepancias son menores.",             context: "Conclusión tras examen detallado" },
        { en: "In the grand scheme of things, this is a setback, not a defeat.", es: "En el gran esquema de las cosas, esto es un revés, no una derrota.", context: "Perspectiva ampliada" },
        { en: "To sum up the argument, the proposal merits serious consideration.", es: "Para resumir el argumento, la propuesta merece una consideración seria.", context: "Cierre académico" },
      ],
    },
  },

  argumentation: {
    name: "Formal Argumentation",
    es: "Argumentación formal",
    icon: "⚖️",
    color: "#F59E0B",
    levels: {
      C1: [
        { en: "In light of the evidence, we must reconsider.",        es: "A la luz de las pruebas, debemos reconsiderar.",         context: "Argumentación basada en datos" },
        { en: "The case can be made that timing was crucial.",        es: "Cabe argumentar que el momento fue crucial.",            context: "Plantear argumento" },
        { en: "It stands to reason that demand will rise.",           es: "Es lógico pensar que la demanda subirá.",                context: "Razonamiento natural" },
        { en: "This raises the question of accountability.",          es: "Esto plantea la cuestión de la rendición de cuentas.",   context: "Sacar tema implícito" },
        { en: "It follows logically that we must intervene.",         es: "Se sigue lógicamente que debemos intervenir.",           context: "Deducción argumentativa" },
        { en: "Given the circumstances, the decision is reasonable.", es: "Dadas las circunstancias, la decisión es razonable.",   context: "Justificación contextual" },
        { en: "The premise is sound, but the conclusion isn't.",      es: "La premisa es sólida, pero la conclusión no lo es.",     context: "Crítica argumentativa" },
        { en: "Let me put forward a different perspective.",          es: "Permíteme proponer una perspectiva diferente.",          context: "Introducir contraargumento" },
        { en: "There's a strong argument for revisiting the policy.",  es: "Hay un sólido argumento para revisar la política.",     context: "Defender postura" },
        { en: "Bear with me while I lay out my reasoning.",            es: "Ten paciencia mientras expongo mi razonamiento.",       context: "Pedir atención argumentativa" },
      ],
      C2: [
        { en: "The corollary of this premise is far-reaching.",                  es: "El corolario de esta premisa es de gran alcance.",                 context: "Consecuencia lógica avanzada" },
        { en: "I should like to draw your attention to a salient point.",        es: "Me gustaría llamar su atención sobre un punto destacado.",         context: "Formal académico" },
        { en: "This view is predicated on a questionable assumption.",           es: "Esta visión se sustenta en una suposición cuestionable.",          context: "Crítica de premisa" },
        { en: "It would be disingenuous to ignore the counterevidence.",         es: "Sería poco honesto ignorar las pruebas contrarias.",               context: "Acusación argumentativa cortés" },
        { en: "The crux of the matter lies in our definition of progress.",      es: "El meollo del asunto reside en cómo definimos el progreso.",       context: "Identificar punto crítico" },
        { en: "One must distinguish correlation from causation here.",           es: "Uno debe distinguir correlación de causalidad aquí.",              context: "Precisión metodológica" },
        { en: "The proposition rests on the unproven assumption that...",        es: "La propuesta se apoya en la suposición no probada de que...",     context: "Cuestionar fundamento" },
        { en: "I would advance the thesis that markets self-correct.",           es: "Me atrevería a postular la tesis de que los mercados se autorregulan.", context: "Postulado académico" },
        { en: "This line of reasoning, while compelling, has its limitations.",  es: "Esta línea de razonamiento, aunque convincente, tiene sus limitaciones.", context: "Reconocer fortaleza y debilidad" },
        { en: "The argument, taken to its logical conclusion, becomes untenable.", es: "El argumento, llevado a su conclusión lógica, se vuelve insostenible.", context: "Refutación por reducción al absurdo" },
      ],
    },
  },

  reformulating: {
    name: "Reformulating",
    es: "Reformular y aclarar",
    icon: "🪞",
    color: "#14B8A6",
    levels: {
      C1: [
        { en: "To put it another way, we're running out of time.",  es: "Dicho de otra manera, se nos acaba el tiempo.",          context: "Reformular para claridad" },
        { en: "What I meant to say was that the data is incomplete.", es: "Lo que quería decir es que los datos están incompletos.", context: "Corregir / aclarar" },
        { en: "Let me rephrase that.",                              es: "Déjame reformularlo.",                                   context: "Anunciar reformulación" },
        { en: "In other words, we need a fresh approach.",          es: "En otras palabras, necesitamos un enfoque nuevo.",       context: "Equivalente simplificado" },
        { en: "What I'm getting at is the issue of trust.",         es: "A lo que voy es a la cuestión de la confianza.",         context: "Llegar al punto" },
        { en: "If I may clarify, that's not exactly what I said.",   es: "Si me permites aclarar, no es exactamente lo que dije.", context: "Aclarar malinterpretación" },
        { en: "Let me put that differently.",                       es: "Déjame plantearlo de otra forma.",                       context: "Re-explicar" },
        { en: "To be more precise, sales fell by 12%.",             es: "Para ser más exacto, las ventas cayeron un 12%.",        context: "Añadir precisión" },
        { en: "By that I mean we should reconsider our strategy.",  es: "Con eso quiero decir que deberíamos reconsiderar nuestra estrategia.", context: "Aclarar referente" },
        { en: "Or rather, the problem is more complex than that.",  es: "O más bien, el problema es más complejo que eso.",       context: "Auto-corrección elegante" },
      ],
      C2: [
        { en: "To frame it more precisely, the variables are interdependent.",   es: "Para enmarcarlo con mayor precisión, las variables son interdependientes.", context: "Reformular con precisión técnica" },
        { en: "If I may rephrase the argument...",                                es: "Si se me permite reformular el argumento...",                              context: "Reformulación formal" },
        { en: "What I'm driving at is the underlying assumption.",                es: "A lo que apunto es a la suposición subyacente.",                            context: "Identificar el núcleo" },
        { en: "Allow me to put it in starker terms.",                             es: "Permíteme expresarlo en términos más crudos.",                              context: "Replantear con dureza" },
        { en: "Stripped of jargon, the proposal amounts to deregulation.",        es: "Despojada del lenguaje técnico, la propuesta equivale a desregulación.",    context: "Traducir argumento" },
        { en: "To borrow a phrase, it's the elephant in the room.",               es: "Por usar una expresión, es el elefante en la habitación.",                  context: "Reformular con cita / idiomatismo" },
        { en: "What this boils down to is a question of trust.",                  es: "Lo que esto se reduce, en esencia, es a una cuestión de confianza.",        context: "Reducir al núcleo" },
        { en: "Cast in those terms, the issue takes on new meaning.",             es: "Planteado en esos términos, el asunto cobra un nuevo significado.",         context: "Reformular cambiando perspectiva" },
        { en: "I'd rephrase the question itself: are we asking the right thing?", es: "Yo replantearía la propia pregunta: ¿estamos preguntando lo correcto?",     context: "Cuestionar el planteamiento" },
        { en: "To couch it in more diplomatic terms, they're being evasive.",     es: "Por expresarlo en términos más diplomáticos, están siendo evasivos.",       context: "Suavizar / matizar crítica" },
      ],
    },
  },

  idiomatic: {
    name: "Idiomatic Expressions",
    es: "Expresiones idiomáticas",
    icon: "🎭",
    color: "#EC4899",
    levels: {
      C1: [
        { en: "It's a double-edged sword.",                       es: "Es un arma de doble filo.",                              context: "Algo con ventajas e inconvenientes" },
        { en: "He's beating around the bush.",                    es: "Está dando rodeos.",                                     context: "No ir al grano" },
        { en: "Let's not jump to conclusions.",                   es: "No saquemos conclusiones precipitadas.",                 context: "Pedir cautela" },
        { en: "She hit the nail on the head.",                    es: "Dio en el clavo.",                                       context: "Acertar plenamente" },
        { en: "We're on the same page.",                          es: "Estamos en sintonía.",                                   context: "Coincidir en algo" },
        { en: "It's not rocket science.",                         es: "No es ninguna ciencia espacial.",                        context: "Algo no tan difícil" },
        { en: "Let's call a spade a spade.",                      es: "Llamemos a las cosas por su nombre.",                    context: "Hablar con franqueza" },
        { en: "He's playing devil's advocate.",                   es: "Está haciendo de abogado del diablo.",                   context: "Defender postura contraria a propósito" },
        { en: "It's a blessing in disguise.",                     es: "Es una bendición disfrazada.",                           context: "Algo malo que resulta bueno" },
        { en: "We're cutting corners.",                           es: "Estamos haciendo chapuzas para ahorrar.",                context: "Hacer algo a la ligera para ir más rápido" },
      ],
      C2: [
        { en: "We're flogging a dead horse.",                          es: "Estamos arando en el mar.",                              context: "Insistir en algo inútil" },
        { en: "That's a horse of a different colour.",                 es: "Eso es harina de otro costal.",                          context: "Asunto completamente distinto" },
        { en: "He's the proverbial fly in the ointment.",              es: "Es la mosca en la sopa.",                                context: "El problema que estropea todo" },
        { en: "They threw the baby out with the bathwater.",           es: "Tiraron el grano junto con la paja.",                    context: "Descartar lo bueno con lo malo" },
        { en: "It's pie in the sky.",                                  es: "Son castillos en el aire.",                              context: "Plan poco realista" },
        { en: "He has an axe to grind.",                               es: "Tiene un asunto pendiente / agenda oculta.",             context: "Motivación personal interesada" },
        { en: "We're between a rock and a hard place.",                es: "Estamos entre la espada y la pared.",                    context: "Dilema sin buena salida" },
        { en: "It's the tip of the iceberg.",                          es: "Es la punta del iceberg.",                               context: "Parte visible de algo mayor" },
        { en: "She's burning the candle at both ends.",                es: "Está quemando la vela por los dos extremos.",            context: "Excederse en esfuerzo" },
        { en: "Let's not throw the baby out with the bathwater.",      es: "No tiremos al niño con el agua sucia.",                  context: "Conservar lo valioso al descartar" },
      ],
    },
  },

  diplomatic: {
    name: "Diplomatic Disagreement",
    es: "Discrepancia diplomática",
    icon: "💼",
    color: "#8B5CF6",
    levels: {
      C1: [
        { en: "With respect, I'm not entirely convinced.",           es: "Con todo respeto, no estoy del todo convencido.",       context: "Discrepar formalmente" },
        { en: "I can see merit in both views.",                      es: "Veo mérito en ambas posturas.",                         context: "Reconocer lados antes de discrepar" },
        { en: "I appreciate your point, but I see it differently.",  es: "Aprecio tu punto, pero lo veo de otra forma.",          context: "Validar y discrepar" },
        { en: "Forgive me for saying so, but...",                    es: "Perdona que lo diga, pero...",                          context: "Disculparse antes de discrepar" },
        { en: "I'd respectfully challenge that assumption.",         es: "Cuestionaría respetuosamente esa suposición.",          context: "Refutar con educación" },
        { en: "Perhaps we should look at this differently.",         es: "Quizás deberíamos verlo de otra manera.",               context: "Sugerir cambio de enfoque" },
        { en: "I'm not sure I share your optimism.",                 es: "No sé si comparto tu optimismo.",                       context: "Discrepar sobre evaluación" },
        { en: "That's certainly one way of looking at it.",          es: "Esa es ciertamente una forma de verlo.",                context: "Conceder sin compartir" },
        { en: "Couldn't we approach this from another angle?",       es: "¿No podríamos abordar esto desde otro ángulo?",         context: "Proponer alternativa indirecta" },
        { en: "I take your point, but consider this...",             es: "Acepto tu punto, pero considera esto...",               context: "Validar y contraargumentar" },
      ],
      C2: [
        { en: "While I appreciate your reasoning, I find it less than persuasive.", es: "Aunque agradezco tu razonamiento, no me resulta persuasivo.", context: "Rechazo formal cortés" },
        { en: "I'm afraid I must take issue with that characterisation.",          es: "Me temo que debo discrepar de esa caracterización.",         context: "Objetar formalmente" },
        { en: "With all due respect, the analysis seems flawed.",                  es: "Con todo el debido respeto, el análisis parece deficiente.",  context: "Crítica formal" },
        { en: "I hesitate to disagree, but the evidence suggests otherwise.",      es: "Me cuesta discrepar, pero las pruebas indican lo contrario.", context: "Discrepar a regañadientes" },
        { en: "I'd venture to suggest a more nuanced reading.",                    es: "Me atrevería a sugerir una lectura más matizada.",            context: "Proponer interpretación alternativa" },
        { en: "I'm inclined to take a more cautious view.",                        es: "Me inclino a adoptar una postura más cautelosa.",             context: "Discrepar por prudencia" },
        { en: "Forgive my candour, but I find that conclusion questionable.",      es: "Perdona la franqueza, pero esa conclusión me parece cuestionable.", context: "Disculparse por crítica directa" },
        { en: "I'd be remiss not to point out the counterevidence.",               es: "Sería un descuido no señalar las pruebas en contra.",         context: "Justificar discrepancia" },
        { en: "While I see the appeal of that view, I remain unpersuaded.",        es: "Aunque entiendo el atractivo de esa visión, sigo sin convencerme.", context: "Reconocer y no ceder" },
        { en: "Allow me to offer a contrasting perspective.",                      es: "Permíteme ofrecer una perspectiva contrastante.",             context: "Introducir desacuerdo elegante" },
      ],
    },
  },

  distinctions: {
    name: "Subtle Distinctions",
    es: "Distinciones sutiles",
    icon: "🔍",
    color: "#10B981",
    levels: {
      C1: [
        { en: "There's a fine line between confidence and arrogance.",  es: "Hay una línea muy fina entre la confianza y la arrogancia.",  context: "Distinguir matiz delicado" },
        { en: "It's not so much a flaw as a feature.",                 es: "No es tanto un defecto como una característica.",               context: "Replantear matizando" },
        { en: "The difference is subtle but significant.",             es: "La diferencia es sutil pero significativa.",                    context: "Resaltar matiz importante" },
        { en: "It's a matter of degree rather than of kind.",          es: "Es una cuestión de grado, no de naturaleza.",                   context: "Distinción cualitativa vs cuantitativa" },
        { en: "These are two sides of the same coin.",                 es: "Son dos caras de la misma moneda.",                             context: "Mostrar conexión profunda" },
        { en: "It's not about what, but how.",                         es: "No es cuestión de qué, sino de cómo.",                          context: "Cambiar el foco" },
        { en: "There's a world of difference between them.",           es: "Hay un mundo de diferencia entre ellos.",                       context: "Énfasis en la diferencia" },
        { en: "It boils down to intent, not outcome.",                 es: "Se reduce a la intención, no al resultado.",                    context: "Desplazar criterio" },
        { en: "Strictly speaking, they're not the same thing.",        es: "En sentido estricto, no son lo mismo.",                         context: "Precisar conceptos" },
        { en: "The distinction matters more than it might seem.",      es: "La distinción importa más de lo que podría parecer.",           context: "Defender importancia del matiz" },
      ],
      C2: [
        { en: "What appears to be agreement masks a deeper divergence.",     es: "Lo que parece acuerdo enmascara una divergencia más profunda.", context: "Identificar diferencia oculta" },
        { en: "The line between persuasion and manipulation is razor-thin.", es: "La línea entre persuasión y manipulación es finísima.",          context: "Distinción ética sutil" },
        { en: "It's a question of nuance rather than substance.",            es: "Es una cuestión de matiz más que de contenido.",                 context: "Restar peso a la diferencia" },
        { en: "The terms are often conflated but shouldn't be.",             es: "Los términos suelen confundirse, pero no debería ser así.",      context: "Corrección terminológica" },
        { en: "There's an important distinction to be drawn here.",          es: "Hay una distinción importante que cabe hacer aquí.",             context: "Llamar atención al matiz" },
        { en: "The devil, as they say, is in the detail.",                   es: "El diablo, como suele decirse, está en los detalles.",           context: "Idiomático culto sobre matices" },
        { en: "We must be careful not to elide these concepts.",             es: "Debemos cuidarnos de no fusionar estos conceptos.",              context: "Precisión académica" },
        { en: "It's a difference that makes all the difference.",            es: "Es una diferencia que marca toda la diferencia.",                context: "Realzar importancia del matiz" },
        { en: "The two are related but by no means synonymous.",             es: "Ambos están relacionados, pero en absoluto son sinónimos.",      context: "Aclarar parentesco con límite" },
        { en: "One must guard against conflating means with ends.",          es: "Hay que evitar confundir medios con fines.",                     context: "Distinción filosófica" },
      ],
    },
  },

  conversation: {
    name: "Sophisticated Fillers",
    es: "Conectores conversacionales",
    icon: "🗣️",
    color: "#06B6D4",
    levels: {
      C1: [
        { en: "Now that you mention it, I do recall something.",   es: "Ahora que lo dices, sí recuerdo algo.",                  context: "Recordar al hilo de la conversación" },
        { en: "If I may interject...",                             es: "Si se me permite intervenir...",                         context: "Pedir turno con cortesía" },
        { en: "Speaking of which, have you heard the news?",       es: "Hablando de eso, ¿te has enterado?",                     context: "Cambiar al hilo natural" },
        { en: "By the way, I meant to ask you about that.",        es: "Por cierto, quería preguntarte sobre eso.",              context: "Introducir tema lateral" },
        { en: "While we're on the subject of work...",             es: "Ya que estamos hablando del trabajo...",                 context: "Aprovechar tema actual" },
        { en: "That reminds me of something similar.",             es: "Eso me recuerda algo parecido.",                         context: "Asociación temática" },
        { en: "As I was about to say,...",                         es: "Como iba a decir,...",                                   context: "Retomar tras interrupción" },
        { en: "Come to think of it, that's an interesting point.", es: "Ahora que lo pienso, es un punto interesante.",          context: "Reconsiderar sobre la marcha" },
        { en: "Funnily enough, I was thinking the same.",          es: "Curiosamente, estaba pensando lo mismo.",                context: "Coincidencia comentada" },
        { en: "Be that as it may, we should move on.",             es: "Sea como fuere, deberíamos seguir.",                     context: "Cerrar tema y avanzar" },
      ],
      C2: [
        { en: "If you'll indulge me for a moment...",                       es: "Si me lo permites un momento...",                            context: "Pedir paciencia formal" },
        { en: "Pardon the digression, but it's relevant.",                  es: "Perdona la digresión, pero viene a cuento.",                 context: "Anunciar inciso relevante" },
        { en: "I take the liberty of changing the subject.",                es: "Me tomo la libertad de cambiar de tema.",                   context: "Cambio de tema cortés" },
        { en: "Without wishing to belabour the point,...",                  es: "Sin querer insistir en el tema,...",                        context: "Disculparse por repetir" },
        { en: "At the risk of stating the obvious,...",                     es: "A riesgo de decir lo obvio,...",                            context: "Mencionar lo evidente" },
        { en: "Permit me a brief aside.",                                   es: "Permíteme un breve inciso.",                                context: "Anunciar paréntesis" },
        { en: "Lest I forget, there's one more thing.",                     es: "No vaya a olvidarlo: hay una cosa más.",                    context: "Añadir punto antes de olvidar" },
        { en: "By way of preamble, let me say this:",                       es: "A modo de preámbulo, déjame decir lo siguiente:",            context: "Introducción solemne" },
        { en: "I'd be remiss not to mention the broader context.",          es: "Sería un descuido no mencionar el contexto más amplio.",     context: "Justificar inciso necesario" },
        { en: "If I might be permitted to elaborate...",                    es: "Si se me permite extenderme...",                            context: "Pedir espacio para desarrollar" },
      ],
    },
  },

  praise: {
    name: "Eloquent Praise & Criticism",
    es: "Elogio y crítica con estilo",
    icon: "🎨",
    color: "#F97316",
    levels: {
      C1: [
        { en: "It's nothing short of remarkable.",               es: "Es sencillamente notable.",                             context: "Elogio enfático" },
        { en: "It leaves a lot to be desired.",                  es: "Deja mucho que desear.",                                context: "Crítica suave pero clara" },
        { en: "She has an exceptional gift for storytelling.",   es: "Tiene un don excepcional para contar historias.",       context: "Elogio de talento" },
        { en: "It falls short of the mark.",                     es: "No da la talla.",                                       context: "Crítica de insuficiencia" },
        { en: "His work is second to none.",                     es: "Su trabajo no tiene rival.",                            context: "Elogio supremo" },
        { en: "It's mediocre at best.",                          es: "Es mediocre, en el mejor de los casos.",                context: "Crítica con concesión mínima" },
        { en: "The performance was nothing short of stunning.",  es: "La actuación fue sencillamente asombrosa.",             context: "Elogio enfático de actuación" },
        { en: "It's far from satisfactory.",                     es: "Dista mucho de ser satisfactorio.",                     context: "Crítica formal" },
        { en: "She really brought the role to life.",            es: "Realmente dio vida al papel.",                          context: "Elogio interpretativo" },
        { en: "It's a far cry from his earlier work.",           es: "Dista mucho de su trabajo anterior.",                   context: "Comparación desfavorable" },
      ],
      C2: [
        { en: "It's an unequivocal triumph of craftsmanship.",            es: "Es un triunfo inequívoco de la artesanía.",                  context: "Elogio absoluto formal" },
        { en: "Sadly, it's emblematic of a wider malaise.",               es: "Lamentablemente, es emblemático de un malestar más amplio.", context: "Crítica con implicación social" },
        { en: "Her prose is luminous and unflinchingly honest.",          es: "Su prosa es luminosa y honesta sin concesiones.",            context: "Elogio literario" },
        { en: "It's a textbook case of style over substance.",            es: "Es un caso de manual de forma sobre contenido.",             context: "Crítica de superficialidad" },
        { en: "The film is a tour de force from start to finish.",        es: "La película es un tour de force de principio a fin.",        context: "Elogio cinematográfico" },
        { en: "It strains credulity to call this art.",                   es: "Cuesta dar crédito a que llamen a esto arte.",               context: "Crítica devastadora educada" },
        { en: "Few writers can hold a candle to her command of language.", es: "Pocos escritores pueden compararse a su dominio del lenguaje.", context: "Elogio comparativo extremo" },
        { en: "The execution is woefully inadequate.",                    es: "La ejecución es lamentablemente inadecuada.",                context: "Crítica formal severa" },
        { en: "His mastery of the form is nothing short of breathtaking.", es: "Su dominio de la forma es sencillamente sobrecogedor.",     context: "Elogio cumbre" },
        { en: "It's a work that rewards close attention.",                es: "Es una obra que recompensa la atención detallada.",          context: "Elogio académico de obra exigente" },
      ],
    },
  },
};

// ─── Block definitions ──────────────────────────────────────────────
// Two blocks shown on the Useful Expressions entry. Each block has its
// own functions, level set, and visual identity.

export const FOUNDATIONS_PHRASES_BLOCK = {
  id: "foundations-phrases",
  name: "Foundations Phrases",
  subtitle: "Everyday survival",
  description: "Saludos, presentarse, la hora, rutinas, gustos, restaurante, compras, direcciones, clima, pasado, futuro.",
  icon: "💬",
  source: "USEFUL_FUNCTIONS",
  functionIds: [
    "greetings", "introducing", "personalInfo", "time",
    "routines", "preferences", "ordering", "shopping",
    "directions", "weather", "past", "future",
  ],
  levels: ["A1", "A2"],
  gradientFrom: "#FB923C",
  gradientTo:   "#EA580C",
};

export const INTERMEDIATE_PHRASES_BLOCK = {
  id: "intermediate-phrases",
  name: "Intermediate Phrases",
  subtitle: "Opinion, nuance, argumentation",
  description: "Opiniones, acuerdo/desacuerdo, sugerencias, especular, sentimientos, disculpas, comparar, contar anécdotas, consejos, hábitos.",
  icon: "🗣️",
  source: "INTERMEDIATE_FUNCTIONS",
  functionIds: [
    "opinions", "agreeing", "suggestions", "speculating", "feelings",
    "apologising", "comparing", "storytelling", "advice", "habits",
  ],
  levels: ["B1", "B2"],
  gradientFrom: "#A78BFA",
  gradientTo:   "#7C3AED",
};

export const ADVANCED_PHRASES_BLOCK = {
  id: "advanced-phrases",
  name: "Advanced Phrases",
  subtitle: "Register, nuance, eloquence",
  description: "Matizar, énfasis, conclusiones, argumentación formal, reformular, modismos, discrepar diplomáticamente, distinciones sutiles, conectores cultos, elogio y crítica.",
  icon: "🎓",
  source: "ADVANCED_FUNCTIONS",
  functionIds: [
    "hedging", "emphatic", "conclusions", "argumentation", "reformulating",
    "idiomatic", "diplomatic", "distinctions", "conversation", "praise",
  ],
  levels: ["C1", "C2"],
  gradientFrom: "#10B981",
  gradientTo:   "#047857",
};

// All blocks in order shown on the Useful Expressions hub.
export const USEFUL_BLOCKS = [
  FOUNDATIONS_PHRASES_BLOCK,
  INTERMEDIATE_PHRASES_BLOCK,
  ADVANCED_PHRASES_BLOCK,
];

// Back-compat: old code that imported USEFUL_EXPRESSIONS_BLOCK gets
// the Foundations Phrases block.
export const USEFUL_EXPRESSIONS_BLOCK = FOUNDATIONS_PHRASES_BLOCK;

// ── Helpers ──

// Resolve which function dictionary a block points at.
export function getBlockFunctions(block) {
  if (block.source === "INTERMEDIATE_FUNCTIONS") return INTERMEDIATE_FUNCTIONS;
  if (block.source === "ADVANCED_FUNCTIONS")     return ADVANCED_FUNCTIONS;
  return USEFUL_FUNCTIONS;
}

// Find a function by id across ALL dictionaries (useful when we only
// have an id and don't yet know which block it belongs to).
export function findFunctionById(id) {
  if (USEFUL_FUNCTIONS[id])       return { fn: USEFUL_FUNCTIONS[id],       block: FOUNDATIONS_PHRASES_BLOCK };
  if (INTERMEDIATE_FUNCTIONS[id]) return { fn: INTERMEDIATE_FUNCTIONS[id], block: INTERMEDIATE_PHRASES_BLOCK };
  if (ADVANCED_FUNCTIONS[id])     return { fn: ADVANCED_FUNCTIONS[id],     block: ADVANCED_PHRASES_BLOCK };
  return null;
}

export function getFunctionsCount() {
  return Object.keys(USEFUL_FUNCTIONS).length
       + Object.keys(INTERMEDIATE_FUNCTIONS).length
       + Object.keys(ADVANCED_FUNCTIONS).length;
}

export function getTotalExpressionsCount() {
  let n = 0;
  for (const dict of [USEFUL_FUNCTIONS, INTERMEDIATE_FUNCTIONS, ADVANCED_FUNCTIONS]) {
    for (const fn of Object.values(dict)) {
      for (const lvl of Object.values(fn.levels)) {
        n += lvl.length;
      }
    }
  }
  return n;
}

export function hasExpressions(functionId, level) {
  const hit = findFunctionById(functionId);
  if (!hit) return false;
  const arr = hit.fn.levels[level];
  return Array.isArray(arr) && arr.length > 0;
}
