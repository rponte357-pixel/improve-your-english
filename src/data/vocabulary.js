// Vocabulary data — EOI exam preparation, organised by theme and level.
//
// 460 words across 4 thematic blocks (as of r21). Block 1 (Daily Life) has
// 300 words at B1/B2/C1. Block 2 (Identity & Science) now has 160 words:
// 80 at B2 (NEW in r21) and 80 at C1 (from r20). B1 and C2 of Block 2,
// plus all of Blocks 3-4, land in future rounds.
//
// ⚠️  CONTENT DISCLAIMER:
//   • Block 1 (Daily Life): vocabulary generated based on standard EOI exam
//     syllabuses (Cambridge, BBC English, CEFR descriptors). Examples are
//     short and didactic in style.
//   • Block 2 C1 (Identity & Science): examples crafted in the style of
//     real EOI Andalucía certification exams (convocatoria extraordinaria
//     2024/2025, NIVEL C1 INGLÉS). Longer, journalistic register, drawing
//     on actual exam reading passages for tone and structure.
//   • Block 2 B2 (Identity & Science): examples crafted in the style of
//     real EOI Andalucía certification exams (convocatoria ordinaria
//     2024/2025, NIVEL B2 INGLÉS). Shorter, more accessible register —
//     "lifestyle journalism" tone (think Guardian Wellbeing section),
//     8-15 words per example, simpler subordinate clauses than C1.
//   • All Block 2 EOI-style examples are NEW compositions inspired by
//     the exam style — NOT extracted verbatim from any single exam paper.
//
//   ALL content should be reviewed by a certified EOI teacher before being
//   used as preparation for the official exam.
//
// To edit an item: find it below by its English word and update the
// `en`, `es`, or `example` fields. The UI picks up changes automatically.
//
// Format of each item:
//   en       — English word or expression (the headword)
//   es       — Spanish translation
//   example  — One example sentence in English (varies by level/block:
//                Block 1     ≈ 6-10 words
//                Block 2 B2  ≈ 8-15 words, EOI lifestyle-journalism style
//                Block 2 C1  ≈ 12-20 words, EOI editorial-journalism style)

// ────────────────────────────────────────────────────────────────────
// Thematic blocks — group related themes for the BlockSelector UI.
// Each block has its own colour palette (used for the bubble gradient
// and for the particle colours when the bubble "crashes").
// ────────────────────────────────────────────────────────────────────
export const BLOCKS = {
  daily: {
    id: "daily",
    name: "Daily Life",
    eyebrow: "Block 1",
    icon: "🌍",
    themeIds: ["cities", "relationships", "goingout", "play", "trends"],
    // The 5 themes in Daily Life cover everyday topics. C2 isn't pedagogically
    // sensible for "going out" or "sports", so this block stops at C1.
    levels: ["B1", "B2", "C1"],
    // Gradient for the block bubble in the selector. Mirrors the look of the
    // existing Vocabulary bubble in the Hub (navy/teal feel).
    gradientFrom: "#4ECDC4",
    gradientTo:   "#2A9D90",
    // Particle palette used for the crash animation. The first colour is the
    // most prominent; tints/shades help the burst feel rich rather than flat.
    particleColors: ["#4ECDC4", "#7AE0D8", "#2A9D90", "#F8F4EE", "#A8E8E0"],
  },
  identity: {
    id: "identity",
    name: "Identity & Science",
    eyebrow: "Block 2",
    icon: "🧠",
    themeIds: ["culture", "science", "nature", "health"],
    levels: ["B1", "B2", "C1", "C2"],
    gradientFrom: "#9B59B6",
    gradientTo:   "#5E2A7C",
    particleColors: ["#9B59B6", "#B47BC9", "#5E2A7C", "#F8F4EE", "#D7B3E8"],
  },
  politics: {
    id: "politics",
    name: "Politics & History",
    eyebrow: "Block 3",
    icon: "⚖️",
    themeIds: ["politics", "conflict", "history", "news"],
    levels: ["B1", "B2", "C1", "C2"],
    gradientFrom: "#C0392B",
    gradientTo:   "#7B1F15",
    particleColors: ["#C0392B", "#E06154", "#7B1F15", "#F8F4EE", "#F0B5AE"],
  },
  economy: {
    id: "economy",
    name: "Economy & Challenges",
    eyebrow: "Block 4",
    icon: "💼",
    themeIds: ["work", "business", "danger"],
    levels: ["B1", "B2", "C1", "C2"],
    gradientFrom: "#F39C12",
    gradientTo:   "#985E04",
    particleColors: ["#F39C12", "#F5B547", "#985E04", "#F8F4EE", "#F8D9A4"],
  },
};

// Helper: given a theme id, find which block it belongs to.
export function getBlockForTheme(themeId) {
  for (const block of Object.values(BLOCKS)) {
    if (block.themeIds.includes(themeId)) return block;
  }
  return null;
}

export const VOCAB_THEMES = {
  cities: {
    name: "Cities & Urban Life",
    icon: "🏙️",
    color: "#4ECDC4",
    levels: {
      B1: [
        { en: "Suburb",            es: "Suburbio / Barrio residencial", example: "Many families prefer to live in a quiet suburb." },
        { en: "Crowded",           es: "Atestado / Lleno de gente",     example: "The city center is always crowded." },
        { en: "Public transport",  es: "Transporte público",            example: "I use public transport every day." },
        { en: "Traffic jam",       es: "Atasco de tráfico",             example: "We got stuck in a traffic jam." },
        { en: "City center",       es: "Centro de la ciudad",           example: "All shops are in the city center." },
        { en: "Noisy",             es: "Ruidoso",                       example: "This area is too noisy at night." },
        { en: "Skyscraper",        es: "Rascacielos",                   example: "New York has impressive skyscrapers." },
        { en: "Local residents",   es: "Residentes locales",            example: "Local residents are protesting." },
        { en: "Pedestrian",        es: "Peatón",                        example: "This is a pedestrian street." },
        { en: "Safe neighborhood", es: "Barrio seguro",                 example: "It's a safe neighborhood for families." },
        { en: "Block of flats",    es: "Bloque de pisos",               example: "She lives in a tall block of flats." },
        { en: "Town hall",         es: "Ayuntamiento",                  example: "We met outside the town hall." },
        { en: "Library",           es: "Biblioteca",                    example: "The public library opens at nine." },
        { en: "Bus stop",          es: "Parada de autobús",             example: "I'll wait for you at the bus stop." },
        { en: "Underground",       es: "Metro",                         example: "Take the underground to save time." },
        { en: "Pavement",          es: "Acera",                         example: "Don't cycle on the pavement." },
        { en: "Roundabout",        es: "Rotonda",                       example: "Turn left at the next roundabout." },
        { en: "Outskirts",         es: "Afueras",                       example: "They built a new mall on the outskirts." },
        { en: "Pollution",         es: "Contaminación",                 example: "Air pollution is bad downtown." },
        { en: "Rubbish bin",       es: "Cubo de basura",                example: "Please throw it in the rubbish bin." },
      ],
      B2: [
        { en: "Commute",           es: "Desplazarse al trabajo",            example: "My commute is very long." },
        { en: "Pedestrian zone",   es: "Zona peatonal",                     example: "The main street is now a pedestrian zone." },
        { en: "Rush hour",         es: "Hora punta",                        example: "Avoid traveling during rush hour." },
        { en: "Urban sprawl",      es: "Expansión urbana descontrolada",    example: "Urban sprawl is destroying the countryside." },
        { en: "Slum",              es: "Barrio marginal",                   example: "Many people live in slums." },
        { en: "Cost of living",    es: "Coste de vida",                     example: "The cost of living is very high." },
        { en: "Green spaces",      es: "Zonas verdes",                      example: "The city needs more green spaces." },
        { en: "Cycle lane",        es: "Carril bici",                       example: "They built new cycle lanes." },
        { en: "Overcrowding",      es: "Hacinamiento",                      example: "Overcrowding is a serious issue." },
        { en: "Housing market",    es: "Mercado de la vivienda",            example: "The housing market is competitive." },
        { en: "Run-down",          es: "Deteriorado / Venido a menos",      example: "The building looks rather run-down." },
        { en: "High-rise",         es: "Edificio de gran altura",           example: "The skyline is full of high-rises." },
        { en: "Detached house",    es: "Casa unifamiliar",                  example: "They moved into a lovely detached house." },
        { en: "Semi-detached",     es: "Casa pareada",                      example: "We bought a semi-detached on the edge of town." },
        { en: "Estate agent",      es: "Agente inmobiliario",               example: "The estate agent showed us six flats." },
        { en: "Tenant",            es: "Inquilino",                         example: "Tenants must pay rent in advance." },
        { en: "Landlord",          es: "Casero / Arrendador",               example: "Her landlord raised the rent again." },
        { en: "Mortgage",          es: "Hipoteca",                          example: "They're still paying off their mortgage." },
        { en: "Council tax",       es: "Impuesto municipal",                example: "Council tax went up this year." },
        { en: "Vandalism",         es: "Vandalismo",                        example: "The park suffered from constant vandalism." },
      ],
      C1: [
        { en: "Gentrification",          es: "Gentrificación",             example: "Gentrification changed the neighborhood." },
        { en: "Congestion charge",       es: "Tasa por congestión",        example: "London introduced a congestion charge." },
        { en: "Amenities",               es: "Comodidades / Servicios",    example: "The area has excellent amenities." },
        { en: "Affordable housing",      es: "Vivienda asequible",         example: "There is a lack of affordable housing." },
        { en: "Concrete jungle",         es: "Jungla de asfalto",          example: "This city feels like a concrete jungle." },
        { en: "Bustling",                es: "Bullicioso",                 example: "The market is bustling with activity." },
        { en: "Urban decay",             es: "Deterioro urbano",           example: "The district suffers from urban decay." },
        { en: "Infrastructure",          es: "Infraestructuras",           example: "The city needs better infrastructure." },
        { en: "Commuter belt",           es: "Ciudad dormitorio",          example: "He lives in the commuter belt." },
        { en: "Shirk responsibilities",  es: "Eludir responsabilidades",   example: "Councils often shirk responsibilities." },
        { en: "Sprawling metropolis",    es: "Metrópolis enorme",          example: "Mexico City is a sprawling metropolis." },
        { en: "Tightly-knit community",  es: "Comunidad muy unida",        example: "It used to be a tightly-knit community." },
        { en: "No-go area",              es: "Zona conflictiva",           example: "That used to be a no-go area at night." },
        { en: "Up-and-coming",           es: "Emergente / De moda",        example: "Shoreditch is an up-and-coming district." },
        { en: "Soaring property prices", es: "Precios disparados",         example: "Soaring property prices push locals out." },
        { en: "Eyesore",                 es: "Adefesio / Mancha visual",   example: "That tower block is a real eyesore." },
        { en: "Revitalise an area",      es: "Revitalizar una zona",       example: "The plan aims to revitalise the area." },
        { en: "Mixed-use development",   es: "Desarrollo de uso mixto",    example: "The development includes flats and shops." },
        { en: "Carbon footprint",        es: "Huella de carbono",          example: "Cycling reduces your carbon footprint." },
        { en: "Pedestrianisation",       es: "Peatonalización",            example: "Pedestrianisation transformed the old quarter." },
      ],
    },
  },

  relationships: {
    name: "Relationships & People",
    icon: "👥",
    color: "#E74C3C",
    levels: {
      B1: [
        { en: "Close friend",         es: "Amigo íntimo",                 example: "Anna is my closest friend." },
        { en: "Get on well with",     es: "Llevarse bien con",            example: "I get on well with my neighbours." },
        { en: "Argue",                es: "Discutir",                     example: "They argue about silly things." },
        { en: "Make up",              es: "Reconciliarse",                example: "They argued but soon made up." },
        { en: "Trust",                es: "Confianza / Confiar",          example: "I trust my brother completely." },
        { en: "Honest",               es: "Honesto / Sincero",            example: "Please be honest with me." },
        { en: "Lie",                  es: "Mentir / Mentira",             example: "Don't lie to your parents." },
        { en: "Polite",               es: "Educado / Cortés",             example: "She's always polite to everyone." },
        { en: "Rude",                 es: "Maleducado",                   example: "It's rude to interrupt people." },
        { en: "Shy",                  es: "Tímido",                       example: "He was shy as a child." },
        { en: "Sociable",             es: "Sociable",                     example: "Maria is very sociable and outgoing." },
        { en: "Couple",               es: "Pareja",                       example: "They make a lovely couple." },
        { en: "Single",               es: "Soltero/a",                    example: "I've been single for two years." },
        { en: "Married",              es: "Casado/a",                     example: "They've been married for ten years." },
        { en: "Divorced",             es: "Divorciado/a",                 example: "My aunt is recently divorced." },
        { en: "Childhood friend",     es: "Amigo de la infancia",         example: "We've been childhood friends since school." },
        { en: "Acquaintance",         es: "Conocido",                     example: "He's an acquaintance, not a friend." },
        { en: "Get along",            es: "Llevarse bien",                example: "Do you get along with your sister?" },
        { en: "Have a lot in common", es: "Tener mucho en común",         example: "We have a lot in common." },
        { en: "Miss someone",         es: "Echar de menos a alguien",     example: "I really miss my grandparents." },
      ],
      B2: [
        { en: "Fall out with",          es: "Pelearse / Romper con",          example: "She fell out with her best friend." },
        { en: "Get over someone",       es: "Superar a alguien",              example: "It took him a year to get over her." },
        { en: "Have a soft spot for",   es: "Tener cariño especial por",      example: "I have a soft spot for my niece." },
        { en: "Have a crush on",        es: "Estar colado/a por",             example: "She had a crush on her teacher." },
        { en: "Settle down",            es: "Sentar la cabeza / Asentarse",   example: "He's ready to settle down and start a family." },
        { en: "Tie the knot",           es: "Casarse (informal)",             example: "They're finally tying the knot in June." },
        { en: "Get on someone's nerves",es: "Sacar de quicio",                example: "His habits really get on my nerves." },
        { en: "Look up to",             es: "Admirar",                        example: "I really look up to my older sister." },
        { en: "Take after",             es: "Parecerse a (familiar)",         example: "She takes after her father." },
        { en: "Bring up",               es: "Criar / Educar",                 example: "She was brought up by her grandparents." },
        { en: "Loyal",                  es: "Leal / Fiel",                    example: "He's a loyal and reliable friend." },
        { en: "Trustworthy",            es: "De fiar",                        example: "She's the most trustworthy colleague I know." },
        { en: "Selfish",                es: "Egoísta",                        example: "It was a selfish thing to do." },
        { en: "Stubborn",               es: "Terco / Tozudo",                 example: "My father is incredibly stubborn." },
        { en: "Easy-going",             es: "Tranquilo / De trato fácil",     example: "He's an easy-going colleague." },
        { en: "Bond",                   es: "Vínculo / Lazo",                 example: "They share a special bond." },
        { en: "Quarrel",                es: "Pelea / Reñir",                  example: "They had a silly quarrel about nothing." },
        { en: "Make peace",             es: "Hacer las paces",                example: "They finally made peace after years." },
        { en: "Stand by someone",       es: "Apoyar a alguien",               example: "She stood by him through hard times." },
        { en: "Drift apart",            es: "Distanciarse poco a poco",       example: "Old friends sometimes drift apart over the years." },
      ],
      C1: [
        { en: "Whirlwind romance",     es: "Romance vertiginoso",            example: "They had a whirlwind romance and married in weeks." },
        { en: "Hit it off",            es: "Hacer buenas migas",             example: "We hit it off the moment we met." },
        { en: "Burn bridges",          es: "Quemar puentes",                 example: "Try not to burn bridges when you leave a job." },
        { en: "On the rocks",          es: "En crisis (relación)",           example: "Their marriage has been on the rocks for months." },
        { en: "Estranged",             es: "Distanciado/a",                  example: "He's been estranged from his family for years." },
        { en: "Cold-hearted",          es: "Despiadado / Sin sentimientos",  example: "Her cold-hearted reply hurt everyone." },
        { en: "Strike up a friendship",es: "Entablar amistad",               example: "We struck up a friendship on the bus." },
        { en: "Inseparable",           es: "Inseparables",                   example: "Those two have been inseparable since college." },
        { en: "A shoulder to cry on",  es: "Un hombro en el que llorar",     example: "She was always a shoulder to cry on." },
        { en: "Toxic relationship",    es: "Relación tóxica",                example: "Leaving a toxic relationship takes courage." },
        { en: "Gaslighting",           es: "Manipulación psicológica",       example: "Gaslighting is a form of emotional abuse." },
        { en: "Hold a grudge",         es: "Guardar rencor",                 example: "He still holds a grudge against me." },
        { en: "Patch things up",       es: "Arreglar las cosas",             example: "We managed to patch things up over coffee." },
        { en: "Kindred spirit",        es: "Un alma gemela",                 example: "I found a kindred spirit in my new flatmate." },
        { en: "Fair-weather friend",   es: "Amigo de las buenas",            example: "Don't trust him — he's a fair-weather friend." },
        { en: "Confide in someone",    es: "Confiarse a alguien",            example: "She confides in her sister about everything." },
        { en: "Domineering",           es: "Dominante / Avasallador",        example: "His domineering mother controls every decision." },
        { en: "Reconciliation",        es: "Reconciliación",                 example: "A full reconciliation took years to achieve." },
        { en: "Set someone up with",   es: "Presentar a alguien (cita)",     example: "My friend set me up with her colleague." },
        { en: "Affectionate",          es: "Cariñoso / Afectuoso",           example: "He's a very affectionate grandfather." },
      ],
    },
  },

  goingout: {
    name: "Going Out & Free Time",
    icon: "🌃",
    color: "#9B59B6",
    levels: {
      B1: [
        { en: "Go out",          es: "Salir",                       example: "Let's go out for dinner tonight." },
        { en: "Cinema",          es: "Cine",                        example: "We're going to the cinema later." },
        { en: "Concert",         es: "Concierto",                   example: "I bought tickets for the concert." },
        { en: "Restaurant",      es: "Restaurante",                 example: "This restaurant has great pizza." },
        { en: "Café",            es: "Cafetería",                   example: "Let's meet at the café on the corner." },
        { en: "Hang out",        es: "Pasar el rato",               example: "We hang out at the park on weekends." },
        { en: "Party",           es: "Fiesta",                      example: "There's a party at Tom's house." },
        { en: "Birthday",        es: "Cumpleaños",                  example: "It's my birthday next Saturday." },
        { en: "Invite",          es: "Invitar",                     example: "She invited me to her wedding." },
        { en: "Theatre",         es: "Teatro",                      example: "We saw a play at the theatre." },
        { en: "Museum",          es: "Museo",                       example: "The museum is free on Sundays." },
        { en: "Exhibition",      es: "Exposición",                  example: "There's a new art exhibition downtown." },
        { en: "Pub",             es: "Pub / Bar",                   example: "We met at the local pub." },
        { en: "Booking",         es: "Reserva",                     example: "I made a booking for eight o'clock." },
        { en: "Menu",            es: "Carta / Menú",                example: "Could I see the menu, please?" },
        { en: "Tip",             es: "Propina",                     example: "We left a generous tip." },
        { en: "Take-away",       es: "Comida para llevar",          example: "We ordered a Chinese take-away." },
        { en: "Picnic",          es: "Picnic",                      example: "Let's have a picnic in the park." },
        { en: "Walk the dog",    es: "Pasear al perro",             example: "I walk the dog every morning." },
        { en: "Stay in",         es: "Quedarse en casa",            example: "I'd rather stay in tonight." },
      ],
      B2: [
        { en: "Live music",       es: "Música en vivo",              example: "This pub has live music on Fridays." },
        { en: "Night out",        es: "Noche de fiesta",             example: "We're planning a big night out." },
        { en: "Sold out",         es: "Agotado",                     example: "The concert was completely sold out." },
        { en: "Box office",       es: "Taquilla",                    example: "Tickets are available at the box office." },
        { en: "Encore",           es: "Bis",                         example: "The band played a fantastic encore." },
        { en: "Pull a sickie",    es: "Hacer pellas (en el trabajo)",example: "He pulled a sickie to go to the festival." },
        { en: "Splash out on",    es: "Gastar mucho en",             example: "We splashed out on a fancy dinner." },
        { en: "Treat yourself",   es: "Darse un capricho",           example: "Go ahead, treat yourself for once." },
        { en: "Catch up",         es: "Ponerse al día",              example: "We caught up over coffee yesterday." },
        { en: "Knees-up",         es: "Fiestón (informal)",          example: "We had a proper knees-up at the wedding." },
        { en: "Foodie",           es: "Aficionado a la gastronomía", example: "She's a real foodie." },
        { en: "Stand-up comedy",  es: "Monólogo cómico",             example: "He performs stand-up comedy at weekends." },
        { en: "Stream a film",    es: "Ver una peli en streaming",   example: "We streamed a film instead of going out." },
        { en: "Binge-watch",      es: "Maratonear una serie",        example: "I binge-watched the whole series in two days." },
        { en: "Get into",         es: "Aficionarse a",               example: "I've recently got into pottery." },
        { en: "Hobby",            es: "Afición / Pasatiempo",        example: "Cycling is her main hobby." },
        { en: "Festival",         es: "Festival",                    example: "Glastonbury is the biggest music festival." },
        { en: "Crowded venue",    es: "Local lleno",                 example: "The venue was so crowded we couldn't move." },
        { en: "Have a blast",     es: "Pasarlo en grande",           example: "We had a blast at the party last night." },
        { en: "Eat out",          es: "Comer fuera",                 example: "We eat out twice a week." },
      ],
      C1: [
        { en: "Off the beaten track",   es: "Fuera de los caminos trillados",  example: "We found a restaurant off the beaten track." },
        { en: "Hidden gem",             es: "Una joya escondida",              example: "That little bookshop is a hidden gem." },
        { en: "Paint the town red",     es: "Salir de fiesta a tope",          example: "After exams we painted the town red." },
        { en: "Night owl",              es: "Persona nocturna",                example: "I've always been a night owl." },
        { en: "Early bird",             es: "Madrugador/a",                    example: "She's an early bird; she's in bed by ten." },
        { en: "Let one's hair down",    es: "Soltarse la melena / Relajarse",  example: "It's the weekend — let your hair down!" },
        { en: "Vibrant nightlife",      es: "Vida nocturna animada",           example: "Berlin is famous for its vibrant nightlife." },
        { en: "Mingle",                 es: "Mezclarse / Alternar",            example: "Try to mingle at the networking event." },
        { en: "Make small talk",        es: "Dar charla / Charla trivial",     example: "I find it hard to make small talk." },
        { en: "Strike up a conversation",es:"Entablar conversación",           example: "He struck up a conversation with the bartender." },
        { en: "Wine and dine",          es: "Agasajar con cena y vino",        example: "The company wined and dined the new client." },
        { en: "Pay through the nose",   es: "Pagar un ojo de la cara",         example: "We paid through the nose for those tickets." },
        { en: "Blowout meal",           es: "Comilona",                        example: "We had a real blowout meal for our anniversary." },
        { en: "Tipsy",                  es: "Achispado/a",                     example: "After two glasses she was already tipsy." },
        { en: "Hungover",               es: "Con resaca",                      example: "I was completely hungover on Sunday." },
        { en: "Cultural buff",          es: "Aficionado a la cultura",         example: "He's a real cultural buff." },
        { en: "Highbrow",               es: "Intelectual / Refinado",          example: "She prefers highbrow entertainment to reality TV." },
        { en: "Lowbrow",                es: "Vulgar / Popular",                example: "It's lowbrow humour, but I enjoy it." },
        { en: "Wind down",              es: "Relajarse tras un día",           example: "I wind down with a book before bed." },
        { en: "Cabin fever",            es: "Síndrome de la cabaña",           example: "After a week indoors I got cabin fever." },
      ],
    },
  },

  play: {
    name: "Sports & Games",
    icon: "⚽",
    color: "#F39C12",
    levels: {
      B1: [
        { en: "Football",        es: "Fútbol",                       example: "He plays football every Saturday." },
        { en: "Basketball",      es: "Baloncesto",                   example: "Basketball is popular in the US." },
        { en: "Tennis",          es: "Tenis",                        example: "She's been playing tennis since she was six." },
        { en: "Swimming",        es: "Natación",                     example: "Swimming is great exercise." },
        { en: "Cycling",         es: "Ciclismo",                     example: "Cycling to work saves money." },
        { en: "Running",         es: "Correr",                       example: "I go running before breakfast." },
        { en: "Match",           es: "Partido",                      example: "The match starts at three." },
        { en: "Team",            es: "Equipo",                       example: "She's the captain of our team." },
        { en: "Score",           es: "Marcador / Marcar",            example: "Who scored the first goal?" },
        { en: "Win",             es: "Ganar",                        example: "We won by two points." },
        { en: "Lose",            es: "Perder",                       example: "Nobody likes to lose." },
        { en: "Draw",            es: "Empate / Empatar",             example: "The match ended in a draw." },
        { en: "Gym",             es: "Gimnasio",                     example: "I go to the gym three times a week." },
        { en: "Coach",           es: "Entrenador",                   example: "Our coach is very demanding." },
        { en: "Referee",         es: "Árbitro",                      example: "The referee gave him a yellow card." },
        { en: "Pitch",           es: "Campo de juego",               example: "The football pitch needs new grass." },
        { en: "Court",           es: "Pista / Cancha",               example: "The tennis court was wet after the rain." },
        { en: "Board game",      es: "Juego de mesa",                example: "We played board games all evening." },
        { en: "Cards",           es: "Cartas / Naipes",              example: "Shall we play cards after dinner?" },
        { en: "Video game",      es: "Videojuego",                   example: "He spends hours playing video games." },
      ],
      B2: [
        { en: "Take up a sport",  es: "Empezar a practicar un deporte", example: "He took up tennis at forty." },
        { en: "Get into shape",   es: "Ponerse en forma",               example: "I want to get into shape this summer." },
        { en: "Out of shape",     es: "Fuera de forma",                 example: "I'm completely out of shape these days." },
        { en: "Beat a record",    es: "Batir un récord",                example: "She beat the European record." },
        { en: "Pull a muscle",    es: "Sufrir un tirón muscular",       example: "I pulled a muscle during training." },
        { en: "Warm up",          es: "Calentar (antes de hacer ejercicio)", example: "Always warm up before exercise." },
        { en: "Work out",         es: "Entrenar",                       example: "She works out at the gym every morning." },
        { en: "Lap",              es: "Vuelta (a la pista)",            example: "He completed twenty laps in the pool." },
        { en: "Penalty",          es: "Penalti / Sanción",              example: "He missed the penalty in the final minute." },
        { en: "Tournament",       es: "Torneo",                         example: "The tournament starts next weekend." },
        { en: "Underdog",         es: "Equipo no favorito",             example: "The underdog won against all odds." },
        { en: "Upset victory",    es: "Victoria sorpresa",              example: "It was the upset victory of the season." },
        { en: "Sportsmanship",    es: "Deportividad",                   example: "He showed great sportsmanship after losing." },
        { en: "Fair play",        es: "Juego limpio",                   example: "Fair play matters more than winning." },
        { en: "Train hard",       es: "Entrenar duro",                  example: "You have to train hard to compete." },
        { en: "Defeat",           es: "Derrota",                        example: "It was a painful defeat for the team." },
        { en: "Stadium",          es: "Estadio",                        example: "The stadium holds 80,000 spectators." },
        { en: "Spectator",        es: "Espectador",                     example: "Spectators cheered throughout the match." },
        { en: "Squad",            es: "Plantilla / Equipo",             example: "He joined the national squad last year." },
        { en: "Knockout stage",   es: "Fase eliminatoria",              example: "Spain reached the knockout stage." },
      ],
      C1: [
        { en: "Sedentary lifestyle",   es: "Estilo de vida sedentario",       example: "A sedentary lifestyle leads to health issues." },
        { en: "Stamina",               es: "Resistencia física",              example: "Marathon runners need incredible stamina." },
        { en: "Endurance",             es: "Aguante / Resistencia",           example: "Cycling builds endurance over time." },
        { en: "Peak fitness",          es: "Máxima forma física",             example: "She's in peak fitness for the Olympics." },
        { en: "Burn out",              es: "Quemarse / Agotamiento",          example: "Many athletes burn out before thirty." },
        { en: "Hit the gym",           es: "Ir al gimnasio (informal)",       example: "I hit the gym five times a week." },
        { en: "Level playing field",   es: "Igualdad de condiciones",         example: "Doping ruins the level playing field." },
        { en: "Outperform",            es: "Superar el rendimiento",          example: "She outperformed everyone in the trials." },
        { en: "Clean sweep",           es: "Triunfo absoluto / Pleno",        example: "The home team made a clean sweep." },
        { en: "Below the belt",        es: "Golpe bajo (figurado)",           example: "That comment was below the belt." },
        { en: "Throw in the towel",    es: "Tirar la toalla",                 example: "He refused to throw in the towel." },
        { en: "Go the extra mile",     es: "Hacer un esfuerzo adicional",     example: "Champions always go the extra mile." },
        { en: "Doping",                es: "Dopaje",                          example: "Several athletes were caught doping." },
        { en: "Concede a goal",        es: "Encajar un gol",                  example: "They conceded a goal in injury time." },
        { en: "Spectator sport",       es: "Deporte de espectáculo",          example: "Boxing is a popular spectator sport." },
        { en: "Esports",               es: "Deportes electrónicos",           example: "Esports tournaments fill huge arenas." },
        { en: "Sponsorship deal",      es: "Acuerdo de patrocinio",           example: "She signed a major sponsorship deal." },
        { en: "Comeback",              es: "Regreso / Remontada",             example: "His comeback after injury was inspiring." },
        { en: "Adrenaline rush",       es: "Subidón de adrenalina",           example: "Skydiving gives you an adrenaline rush." },
        { en: "Take it on the chin",   es: "Encajar bien una derrota",        example: "He took the defeat on the chin." },
      ],
    },
  },

  trends: {
    name: "Trends & Consumption",
    icon: "📈",
    color: "#1ABC9C",
    levels: {
      B1: [
        { en: "Buy",            es: "Comprar",                         example: "I'm going to buy a new phone." },
        { en: "Sell",           es: "Vender",                          example: "They sell fresh bread every morning." },
        { en: "Cheap",          es: "Barato",                          example: "These shoes were really cheap." },
        { en: "Expensive",      es: "Caro",                            example: "This restaurant is too expensive." },
        { en: "Price",          es: "Precio",                          example: "What's the price of this jacket?" },
        { en: "Discount",       es: "Descuento",                       example: "Students get a discount." },
        { en: "Sale",           es: "Rebajas",                         example: "Everything is on sale this week." },
        { en: "Brand",          es: "Marca",                           example: "I prefer this brand of coffee." },
        { en: "Customer",       es: "Cliente",                         example: "The customer is always right." },
        { en: "Shop online",    es: "Comprar por internet",            example: "I prefer to shop online." },
        { en: "Receipt",        es: "Recibo / Ticket",                 example: "Keep the receipt in case you return it." },
        { en: "Refund",         es: "Reembolso",                       example: "Can I have a refund, please?" },
        { en: "Cash",           es: "Efectivo",                        example: "I'll pay in cash." },
        { en: "Credit card",    es: "Tarjeta de crédito",              example: "Do you accept credit cards?" },
        { en: "Save money",     es: "Ahorrar dinero",                  example: "I'm saving money for a trip." },
        { en: "Waste money",    es: "Malgastar dinero",                example: "Don't waste money on rubbish." },
        { en: "Fashionable",    es: "De moda",                         example: "Those trainers are very fashionable." },
        { en: "Out of fashion", es: "Pasado de moda",                  example: "Bell-bottoms are out of fashion again." },
        { en: "Advertisement",  es: "Anuncio",                         example: "I saw the advertisement on TV." },
        { en: "Bargain",        es: "Ganga",                           example: "Five euros for this jacket — what a bargain!" },
      ],
      B2: [
        { en: "Trend",            es: "Tendencia",                      example: "There's a growing trend towards healthy food." },
        { en: "Trendy",           es: "A la moda",                      example: "Sustainable clothes are very trendy now." },
        { en: "Mainstream",       es: "Convencional / Mayoritario",     example: "That singer has gone mainstream." },
        { en: "Niche market",     es: "Mercado especializado",          example: "Vegan cosmetics are a growing niche market." },
        { en: "Splash out",       es: "Gastar generosamente",           example: "We splashed out on a new sofa." },
        { en: "Save up for",      es: "Ahorrar para",                   example: "She's saving up for a new car." },
        { en: "Tight budget",     es: "Presupuesto ajustado",           example: "We're on a very tight budget." },
        { en: "Cost a fortune",   es: "Costar una fortuna",             example: "That handbag costs a fortune." },
        { en: "Window shopping",  es: "Ir de escaparates",              example: "We went window shopping for hours." },
        { en: "Brand loyalty",    es: "Fidelidad a la marca",           example: "He has strong brand loyalty to Apple." },
        { en: "Consumer",         es: "Consumidor",                     example: "Today's consumers want sustainable products." },
        { en: "Demand",           es: "Demanda",                        example: "Demand for electric cars is rising." },
        { en: "Supply",           es: "Oferta / Suministro",            example: "Supply hasn't kept up with demand." },
        { en: "Recession",        es: "Recesión",                       example: "Spending always falls during a recession." },
        { en: "Inflation",        es: "Inflación",                      example: "Inflation hit a 30-year high." },
        { en: "Counterfeit",      es: "Falsificación",                  example: "Those bags are counterfeit, not real Gucci." },
        { en: "Spend a fortune",  es: "Gastar una fortuna",             example: "She spends a fortune on cosmetics." },
        { en: "Pocket money",     es: "Paga semanal",                   example: "Kids learn money skills from pocket money." },
        { en: "Black Friday",     es: "Black Friday / Viernes Negro",   example: "Black Friday sales start tomorrow." },
        { en: "Impulse buy",      es: "Compra impulsiva",               example: "These shoes were a total impulse buy." },
      ],
      C1: [
        { en: "Conspicuous consumption", es: "Consumo ostentoso",              example: "Luxury cars are pure conspicuous consumption." },
        { en: "Throwaway culture",       es: "Cultura del usar y tirar",       example: "Throwaway culture is destroying the planet." },
        { en: "Fast fashion",            es: "Moda rápida",                    example: "Fast fashion has a huge environmental cost." },
        { en: "Greenwashing",            es: "Lavado verde / Ecopostureo",     example: "Many brands are guilty of greenwashing." },
        { en: "Sustainability",          es: "Sostenibilidad",                 example: "Sustainability is the new luxury." },
        { en: "Carbon-neutral",          es: "Neutro en carbono",              example: "The company aims to be carbon-neutral by 2030." },
        { en: "Influencer marketing",    es: "Marketing de influencers",       example: "Influencer marketing now dominates ad budgets." },
        { en: "Word-of-mouth",           es: "Boca a boca",                    example: "Word-of-mouth is still the best advertising." },
        { en: "Tighten one's belt",      es: "Apretarse el cinturón",          example: "We've had to tighten our belts this year." },
        { en: "Break the bank",          es: "Romper la banca / Costar caro",  example: "A weekend in Paris needn't break the bank." },
        { en: "Living beyond one's means",es:"Vivir por encima de las posibilidades", example: "Many young people live beyond their means." },
        { en: "Disposable income",       es: "Ingresos disponibles",           example: "Retirees often have less disposable income." },
        { en: "Backlash",                es: "Reacción negativa",              example: "The campaign provoked a fierce backlash." },
        { en: "Cancel culture",          es: "Cultura de la cancelación",      example: "Cancel culture has redefined celebrity scandals." },
        { en: "Viral",                   es: "Viral",                          example: "The video went viral overnight." },
        { en: "Bandwagon effect",        es: "Efecto manada",                  example: "Crypto's rise showed the bandwagon effect." },
        { en: "Planned obsolescence",    es: "Obsolescencia programada",       example: "Planned obsolescence forces us to keep buying." },
        { en: "Sweatshop",               es: "Taller de explotación",          example: "Cheap fashion often relies on sweatshops." },
        { en: "Ethical consumer",        es: "Consumidor ético",               example: "Ethical consumers research every purchase." },
        { en: "Boycott",                 es: "Boicot",                         example: "Activists called for a boycott of the brand." },
      ],
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // Block 2 placeholders — Identity & Science
  // Content lands in round 20. Until then these render as "Coming soon".
  // ──────────────────────────────────────────────────────────────────
  culture: {
    name: "Culture & Identity",
    icon: "🎭",
    color: "#9B59B6",
    levels: {
      B1: [],
      B2: [
        { en: "Cultural heritage",      es: "Patrimonio cultural",                   example: "The festival is an important part of the town's cultural heritage." },
        { en: "Cultural shock",         es: "Choque cultural",                       example: "Moving to Japan gave him a real cultural shock at first." },
        { en: "To blend in",            es: "Integrarse / Mezclarse",                example: "He's been trying hard to blend in since he moved to Madrid." },
        { en: "Mother tongue",          es: "Lengua materna",                        example: "She speaks three languages, but Spanish is still her mother tongue." },
        { en: "Open-minded",            es: "De mente abierta",                      example: "Travelling abroad has made her much more open-minded about other cultures." },
        { en: "To feel at home",        es: "Sentirse como en casa",                 example: "After two years in Berlin, I finally feel at home here." },
        { en: "Custom",                 es: "Costumbre",                             example: "Removing your shoes before entering a house is a common custom in Japan." },
        { en: "To make a fresh start",  es: "Empezar de cero",                       example: "She moved to Barcelona hoping to make a fresh start after the divorce." },
        { en: "Sense of belonging",     es: "Sentido de pertenencia",                example: "Joining the local choir gave him a real sense of belonging." },
        { en: "Mixed-race",             es: "Mestizo / De raza mixta",               example: "More and more mixed-race families are visible in television advertising today." },
        { en: "Stereotype",             es: "Estereotipo",                           example: "The film unfortunately reinforces an old stereotype about teenage girls." },
        { en: "To get along with",      es: "Llevarse bien con",                     example: "She gets along really well with her flatmates from different countries." },
        { en: "Generation gap",         es: "Brecha generacional",                   example: "There's a clear generation gap between my parents and my grandparents." },
        { en: "Native speaker",         es: "Hablante nativo",                       example: "Practising with a native speaker is the best way to improve pronunciation." },
        { en: "To value diversity",     es: "Valorar la diversidad",                 example: "Modern companies say they value diversity but often fail to show it." },
        { en: "Lifestyle",              es: "Estilo de vida",                        example: "Living by the coast has completely changed her family's lifestyle." },
        { en: "To stand out",           es: "Destacar",                              example: "His unusual sense of humour really makes him stand out at work." },
        { en: "Cultural background",    es: "Trasfondo cultural",                    example: "Her cultural background gave her a fresh perspective on the project." },
        { en: "To get used to",         es: "Acostumbrarse a",                       example: "It took her months to get used to the British weather." },
        { en: "Way of life",            es: "Modo de vida",                          example: "Slow travel has become a popular way of life among young people." },
      ],
      C1: [
        { en: "Cultural appropriation",   es: "Apropiación cultural",                          example: "The brand faced backlash for what critics described as blatant cultural appropriation." },
        { en: "Melting pot",              es: "Crisol de culturas",                            example: "New York has long been seen as the ultimate melting pot of immigrant communities." },
        { en: "To preserve traditions",   es: "Preservar las tradiciones",                     example: "Younger generations are increasingly reluctant to preserve traditions they consider outdated." },
        { en: "Alienation",               es: "Alienación / Aislamiento cultural",             example: "Many expatriates report a deep sense of alienation despite years spent abroad." },
        { en: "Deep-rooted",              es: "Profundamente arraigado",                       example: "The festival reflects deep-rooted beliefs that have shaped the region for centuries." },
        { en: "Social cohesion",          es: "Cohesión social",                               example: "Politicians warn that rising inequality is gradually eroding social cohesion." },
        { en: "To fit the mold",          es: "Ajustarse al molde",                            example: "She refused to fit the mold her conservative family had prepared for her." },
        { en: "Biculturalism",            es: "Biculturalismo",                                example: "Biculturalism, once seen as a disadvantage, is now considered a valuable asset." },
        { en: "To pass down",             es: "Transmitir de generación en generación",        example: "Recipes are passed down from mother to daughter as a form of cultural heritage." },
        { en: "Shunned by society",       es: "Marginado por la sociedad",                     example: "Whistleblowers are too often shunned by society rather than celebrated for their courage." },
        { en: "To lose one's identity",   es: "Perder la propia identidad",                    example: "Many immigrants fear losing their identity while adapting to a foreign culture." },
        { en: "Intercultural dialogue",   es: "Diálogo intercultural",                         example: "The initiative aims to foster intercultural dialogue in schools across the region." },
        { en: "Social mores",             es: "Costumbres / Normas morales",                   example: "The novel offers a sharp critique of the social mores of Victorian England." },
        { en: "To uproot oneself",        es: "Desarraigarse",                                 example: "Few people are willing to uproot themselves entirely for a job opportunity." },
        { en: "Secular society",          es: "Sociedad laica",                                example: "France has long prided itself on being one of Europe's most resolutely secular societies." },
        { en: "To be steeped in history", es: "Estar impregnado de historia",                  example: "The old quarter of the city is utterly steeped in history at every corner." },
        { en: "Common misconception",     es: "Idea falsa común",                              example: "It's a common misconception that bats are blind, when in fact most see perfectly well." },
        { en: "To ostracize",             es: "Marginar / Excluir socialmente",                example: "Members who broke the code of silence were ostracized by the entire community." },
        { en: "Assimilation",             es: "Asimilación cultural",                          example: "Forced assimilation has historically caused indigenous languages to vanish within generations." },
        { en: "A sense of pride",         es: "Sentido del orgullo",                           example: "Watching her daughter graduate filled her with an overwhelming sense of pride." },
      ],
      C2: [],
    },
  },
  science: {
    name: "Science & Research",
    icon: "🔬",
    color: "#9B59B6",
    levels: {
      B1: [],
      B2: [
        { en: "Breakthrough",            es: "Avance crucial",                       example: "Scientists hope the new vaccine will be a breakthrough in cancer treatment." },
        { en: "To carry out a study",    es: "Realizar un estudio",                  example: "The university is carrying out a study on student sleep habits." },
        { en: "Findings",                es: "Resultados / Hallazgos",               example: "The findings of the report came as a surprise to many experts." },
        { en: "Scientific evidence",     es: "Evidencia científica",                 example: "There is strong scientific evidence that walking improves overall mood." },
        { en: "To discover",             es: "Descubrir",                            example: "Researchers have discovered a new species of frog in the Amazon." },
        { en: "Side effect",             es: "Efecto secundario",                    example: "The medicine works well but has some minor side effects." },
        { en: "Lab experiment",          es: "Experimento de laboratorio",           example: "The students designed a simple lab experiment to test their hypothesis." },
        { en: "Research team",           es: "Equipo de investigación",              example: "A research team from Oxford has published an interesting paper this month." },
        { en: "Cure",                    es: "Cura",                                 example: "Doctors are still searching for a cure for the common cold." },
        { en: "Outcome",                 es: "Resultado",                            example: "The outcome of the experiment will be announced next week." },
        { en: "To test",                 es: "Probar / Comprobar",                   example: "Engineers are testing the new electric car on different surfaces." },
        { en: "Trial and error",         es: "Prueba y error",                       example: "She learnt to bake mostly through trial and error at home." },
        { en: "To make progress",        es: "Hacer progresos",                      example: "Researchers are making real progress in understanding climate patterns." },
        { en: "Brain power",             es: "Capacidad mental",                     example: "Solving puzzles is a fun way to keep your brain power sharp." },
        { en: "To prove",                es: "Demostrar",                            example: "Recent studies have proved that small habits really do make a difference." },
        { en: "Research paper",          es: "Artículo de investigación",            example: "She published her first research paper while still at university." },
        { en: "Sample",                  es: "Muestra",                              example: "The doctor took a blood sample to check her vitamin levels." },
        { en: "Hi-tech",                 es: "De alta tecnología",                   example: "The hospital has invested heavily in new hi-tech equipment." },
        { en: "To analyse data",         es: "Analizar datos",                       example: "Scientists are analysing the data collected during last year's expedition." },
        { en: "Discovery",               es: "Descubrimiento",                       example: "The discovery of penicillin changed modern medicine forever." },
      ],
      C1: [
        { en: "Cutting-edge technology",         es: "Tecnología de vanguardia",                  example: "Researchers rely on cutting-edge technology to push the boundaries of medical science." },
        { en: "Clinical trials",                 es: "Ensayos clínicos",                          example: "The drug must complete three phases of clinical trials before reaching the market." },
        { en: "Ethical dilemma",                 es: "Dilema ético",                              example: "Gene editing in embryos poses an ethical dilemma that scientists cannot ignore." },
        { en: "To carry out research",           es: "Llevar a cabo una investigación",           example: "The team has been carrying out research on artificial intelligence for over a decade." },
        { en: "Empirical data",                  es: "Datos empíricos",                           example: "Any scientific theory must ultimately rest on solid empirical data, not speculation." },
        { en: "Peer-reviewed",                   es: "Revisado por pares",                        example: "Only peer-reviewed studies are considered reliable sources in academic circles." },
        { en: "To debunk a myth",                es: "Desmentir un mito",                         example: "The documentary set out to debunk the myth that vaccines cause more harm than good." },
        { en: "Flawed methodology",              es: "Metodología defectuosa",                    example: "Critics dismissed the report on the grounds of its deeply flawed methodology." },
        { en: "Genetically modified organisms",  es: "Organismos modificados genéticamente",      example: "The debate over genetically modified organisms remains as polarised as ever in Europe." },
        { en: "Surgical precision",              es: "Precisión quirúrgica",                      example: "The new laser performs the operation with almost unimaginable surgical precision." },
        { en: "To spark controversy",            es: "Desencadenar polémica",                     example: "Her findings sparked controversy among scientists who had long defended the old theory." },
        { en: "To reach a deadlock",             es: "Llegar a un callejón sin salida",           example: "Negotiations between research teams reached a deadlock over data sharing rights." },
        { en: "Pioneering study",                es: "Estudio pionero",                           example: "A pioneering study at MIT has shed new light on how memories are stored." },
        { en: "Adverse reactions",               es: "Reacciones adversas",                       example: "A small percentage of patients reported adverse reactions to the experimental drug." },
        { en: "To gather intelligence",          es: "Recopilar información",                     example: "Marine biologists are gathering intelligence on coral reefs to track climate damage." },
        { en: "Plagiarism",                      es: "Plagio",                                    example: "The researcher was stripped of his title after evidence of plagiarism surfaced." },
        { en: "To test a hypothesis",            es: "Someter a prueba una hipótesis",            example: "Scientists designed a series of experiments to test the hypothesis under controlled conditions." },
        { en: "Technological leap",              es: "Salto tecnológico",                         example: "The invention of the transistor represented a technological leap of the highest order." },
        { en: "To stem from",                    es: "Derivar de / Tener su origen en",           example: "Many modern infectious diseases stem from prolonged contact with wild animal populations." },
        { en: "Unforeseen consequences",         es: "Consecuencias imprevistas",                 example: "Releasing the species had unforeseen consequences for the local ecosystem within months." },
      ],
      C2: [],
    },
  },
  nature: {
    name: "Nature & Nurture",
    icon: "🌱",
    color: "#9B59B6",
    levels: {
      B1: [],
      B2: [
        { en: "Endangered species",         es: "Especies en peligro",                example: "Pandas remain one of the world's most famous endangered species." },
        { en: "Climate change",             es: "Cambio climático",                   example: "Many young people are worried about the effects of climate change." },
        { en: "Global warming",             es: "Calentamiento global",               example: "Global warming is causing sea levels to rise faster than predicted." },
        { en: "Pollution",                  es: "Contaminación",                      example: "Pollution in big cities has become a serious health problem." },
        { en: "Wildlife",                   es: "Vida salvaje / Fauna",               example: "The new national park aims to protect local wildlife." },
        { en: "Recycling",                  es: "Reciclaje",                          example: "Recycling at home is one of the easiest ways to help the planet." },
        { en: "To take after",              es: "Parecerse a (familia)",              example: "She really takes after her mother in both looks and personality." },
        { en: "Habit",                      es: "Hábito",                             example: "Reading before bed has become a relaxing habit for me." },
        { en: "To raise a child",           es: "Criar a un hijo",                    example: "Many parents struggle to raise a child in the digital age." },
        { en: "Eco-friendly",               es: "Respetuoso con el medio ambiente",   example: "More families are choosing eco-friendly products for their daily routines." },
        { en: "To run in the family",       es: "Venir de familia",                   example: "Musical talent definitely runs in their family." },
        { en: "Natural habitat",            es: "Hábitat natural",                    example: "Many animals struggle to survive outside their natural habitat." },
        { en: "Green energy",               es: "Energía verde",                      example: "Spain has invested heavily in green energy over the last decade." },
        { en: "Upbringing",                 es: "Educación / Crianza",                example: "His upbringing in the countryside taught him to value simple things." },
        { en: "Carbon footprint",           es: "Huella de carbono",                  example: "Eating less meat is a good way to reduce your carbon footprint." },
        { en: "To go green",                es: "Hacerse ecológico",                  example: "Many small businesses are trying to go green this year." },
        { en: "Genes",                      es: "Genes",                              example: "Scientists believe many illnesses are linked to our genes." },
        { en: "Personality trait",          es: "Rasgo de personalidad",              example: "Patience is probably her most attractive personality trait." },
        { en: "To plant trees",             es: "Plantar árboles",                    example: "The local school plants trees every spring as part of a project." },
        { en: "Single-use plastic",         es: "Plástico de un solo uso",            example: "Several countries have banned single-use plastic bags entirely." },
      ],
      C1: [
        { en: "Biodiversity loss",              es: "Pérdida de biodiversidad",                       example: "Biodiversity loss is accelerating faster than at any other point in recorded history." },
        { en: "Environmental awareness",        es: "Conciencia medioambiental",                      example: "Schools have a crucial role to play in raising environmental awareness from an early age." },
        { en: "To nurture talent",              es: "Nutrir / Fomentar el talento",                   example: "The foundation was created to nurture talent among young musicians from low-income families." },
        { en: "Hereditary traits",              es: "Rasgos hereditarios",                            example: "Studies show that certain hereditary traits skip generations before resurfacing unexpectedly." },
        { en: "Ecological disaster",            es: "Desastre ecológico",                             example: "The oil spill turned out to be one of the worst ecological disasters of the decade." },
        { en: "Nature vs Nurture debate",       es: "Debate entre lo innato y lo adquirido",          example: "The Nature vs Nurture debate continues to divide psychologists despite mountains of research." },
        { en: "Depletion of natural resources", es: "Agotamiento de los recursos naturales",          example: "The depletion of natural resources threatens to undermine economic growth in many regions." },
        { en: "Sustainable development",        es: "Desarrollo sostenible",                          example: "Sustainable development requires balancing economic ambitions with the wellbeing of future generations." },
        { en: "Predisposed to",                 es: "Predispuesto a",                                 example: "Children of asthma sufferers are statistically predisposed to developing respiratory conditions themselves." },
        { en: "Greenwashing",                   es: "Lavado de imagen verde",                         example: "Consumers are growing weary of greenwashing tactics by corporations claiming to be eco-friendly." },
        { en: "Behavioral genetics",            es: "Genética conductual",                            example: "Behavioral genetics seeks to determine how much of personality is inherited from our parents." },
        { en: "Maternal instinct",              es: "Instinto maternal",                              example: "Whether maternal instinct is biological or socially constructed remains hotly contested by researchers." },
        { en: "Environmental footprint",        es: "Huella medioambiental",                          example: "Every flight you take leaves an environmental footprint that takes decades to offset." },
        { en: "To poach",                       es: "Cazar furtivamente",                             example: "Poaching elephants for their ivory has pushed the species to the brink of extinction." },
        { en: "To offset carbon emissions",     es: "Compensar las emisiones de carbono",             example: "The company plants thousands of trees each year to offset its carbon emissions." },
        { en: "Cognitive development",          es: "Desarrollo cognitivo",                           example: "Early exposure to language plays a fundamental role in a child's cognitive development." },
        { en: "Social conditioning",            es: "Condicionamiento social",                        example: "Much of what we call common sense is in fact the product of social conditioning." },
        { en: "Renewable resources",            es: "Recursos renovables",                            example: "Investment in renewable resources has grown sharply since the climate accords were signed." },
        { en: "To adapt to the surroundings",   es: "Adaptarse al entorno",                           example: "Polar bears have adapted to their surroundings over thousands of years of harsh evolution." },
        { en: "Environmental degradation",      es: "Degradación ambiental",                          example: "Decades of environmental degradation have left the river ecosystem on the verge of collapse." },
      ],
      C2: [],
    },
  },
  health: {
    name: "Health & Illness",
    icon: "🏥",
    color: "#9B59B6",
    levels: {
      B1: [],
      B2: [
        { en: "Get over an illness",           es: "Superar una enfermedad",                example: "It took her almost two months to fully get over the flu." },
        { en: "To stay fit",                   es: "Mantenerse en forma",                   example: "Cycling to work is a great way to stay fit and save money." },
        { en: "Symptoms",                      es: "Síntomas",                              example: "If your symptoms get worse, you should call the doctor straight away." },
        { en: "Healthy diet",                  es: "Dieta saludable",                       example: "Doctors agree that a healthy diet is the basis of good health." },
        { en: "To work out",                   es: "Hacer ejercicio",                       example: "He tries to work out three times a week after work." },
        { en: "Painkiller",                    es: "Analgésico",                            example: "She took a painkiller because of her terrible headache." },
        { en: "To put on weight",              es: "Engordar",                              example: "Many people put on weight over the Christmas holidays." },
        { en: "To lose weight",                es: "Perder peso",                           example: "He's been trying to lose weight by eating less sugar." },
        { en: "Common cold",                   es: "Resfriado común",                       example: "There's still no real cure for the common cold." },
        { en: "Side effect",                   es: "Efecto secundario",                     example: "Drowsiness is the most common side effect of this medicine." },
        { en: "To feel sick",                  es: "Sentirse mal / con náuseas",            example: "I started feeling sick during the long bus journey." },
        { en: "Check-up",                      es: "Revisión médica",                       example: "It's a good idea to have a check-up at least once a year." },
        { en: "Stress-related",                es: "Relacionado con el estrés",             example: "Many of her health problems turned out to be stress-related." },
        { en: "To get vaccinated",             es: "Vacunarse",                             example: "Doctors recommend getting vaccinated against the flu every autumn." },
        { en: "Wellbeing",                     es: "Bienestar",                             example: "Companies are paying more attention to the wellbeing of their staff." },
        { en: "To recover from",               es: "Recuperarse de",                        example: "She's still recovering from the surgery she had last month." },
        { en: "Mental health",                 es: "Salud mental",                          example: "Talking to friends regularly is great for your mental health." },
        { en: "To suffer from",                es: "Padecer / Sufrir",                      example: "He has been suffering from chronic back pain for years." },
        { en: "Balanced lifestyle",            es: "Estilo de vida equilibrado",            example: "A balanced lifestyle is more effective than any short diet." },
        { en: "To make an appointment",        es: "Pedir cita",                            example: "I'll make an appointment with the dentist for next Friday." },
      ],
      C1: [
        { en: "Burnout syndrome",                 es: "Síndrome de estar quemado",                        example: "Long working hours have contributed to a sharp rise in burnout syndrome among professionals." },
        { en: "Chronic ailment",                  es: "Dolencia crónica",                                 example: "She has been battling a chronic ailment that has gradually limited her mobility over the years." },
        { en: "Healthcare system",                es: "Sistema sanitario",                                example: "Critics argue that the healthcare system can no longer cope with an ageing population." },
        { en: "Mental well-being",                es: "Bienestar mental",                                 example: "Employers are starting to take mental well-being as seriously as physical health." },
        { en: "Under the weather",                es: "Sentirse indispuesto",                             example: "She's been feeling rather under the weather since coming back from her business trip." },
        { en: "To alleviate pain",                es: "Aliviar el dolor",                                 example: "Doctors prescribed mild medication to alleviate the pain without causing drowsiness." },
        { en: "Medical breakthrough",             es: "Avance médico revolucionario",                     example: "A genuine medical breakthrough could transform the lives of millions of patients with Alzheimer's." },
        { en: "Preventive medicine",              es: "Medicina preventiva",                              example: "Investing in preventive medicine ultimately saves the healthcare system enormous amounts of money." },
        { en: "To contract a disease",            es: "Contraer una enfermedad",                          example: "Travellers are advised to take precautions to avoid contracting tropical diseases abroad." },
        { en: "To take a heavy toll on health",   es: "Pasar factura a la salud",                         example: "The relentless pressure of the job had taken a heavy toll on her health over time." },
        { en: "Psychosomatic illness",            es: "Enfermedad psicosomática",                         example: "Doctors increasingly recognise that stress can trigger genuine psychosomatic illness in vulnerable patients." },
        { en: "To trigger an allergic reaction",  es: "Desencadenar una reacción alérgica",               example: "Even trace amounts of peanut can trigger a severe allergic reaction in some children." },
        { en: "Malnutrition",                     es: "Malnutrición",                                     example: "Despite the country's economic growth, malnutrition still affects nearly a quarter of children." },
        { en: "Splitting headache",               es: "Dolor de cabeza insoportable",                     example: "She woke up with a splitting headache that no amount of painkillers could shift." },
        { en: "As fit as a fiddle",               es: "En perfecta forma física",                         example: "At eighty-five, my grandfather is still as fit as a fiddle and runs every morning." },
        { en: "To administer first aid",          es: "Administrar primeros auxilios",                    example: "Bystanders managed to administer first aid before the ambulance arrived at the scene." },
        { en: "Sedentary toll",                   es: "Coste del sedentarismo",                           example: "The sedentary toll of office work is becoming a major concern for occupational health experts." },
        { en: "To come down with",                es: "Caer enfermo de",                                  example: "Half the office came down with the flu just before the Christmas holidays began." },
        { en: "Inpatient / Outpatient",           es: "Paciente ingresado / Paciente ambulatorio",        example: "The procedure can be performed on either an inpatient or outpatient basis, depending on circumstances." },
        { en: "To build up resistance",           es: "Desarrollar resistencia",                          example: "Overuse of antibiotics allows bacteria to build up resistance to the drugs we depend on." },
      ],
      C2: [],
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // Block 3 placeholders — Politics & History
  // ──────────────────────────────────────────────────────────────────
  politics: {
    name: "Politics",
    icon: "🏛️",
    color: "#C0392B",
    levels: { B1: [], B2: [], C1: [], C2: [] },
  },
  conflict: {
    name: "Conflict & Resolution",
    icon: "⚔️",
    color: "#C0392B",
    levels: { B1: [], B2: [], C1: [], C2: [] },
  },
  history: {
    name: "History",
    icon: "📜",
    color: "#C0392B",
    levels: { B1: [], B2: [], C1: [], C2: [] },
  },
  news: {
    name: "News & the Media",
    icon: "📰",
    color: "#C0392B",
    levels: { B1: [], B2: [], C1: [], C2: [] },
  },

  // ──────────────────────────────────────────────────────────────────
  // Block 4 placeholders — Economy & Challenges
  // ──────────────────────────────────────────────────────────────────
  work: {
    name: "Work",
    icon: "🛠️",
    color: "#F39C12",
    levels: { B1: [], B2: [], C1: [], C2: [] },
  },
  business: {
    name: "Business & Economics",
    icon: "📊",
    color: "#F39C12",
    levels: { B1: [], B2: [], C1: [], C2: [] },
  },
  danger: {
    name: "Danger & Risk",
    icon: "⚠️",
    color: "#F39C12",
    levels: { B1: [], B2: [], C1: [], C2: [] },
  },
};

// Helper: get a list of all themes that have at least one word.
export function getAvailableThemes() {
  return Object.entries(VOCAB_THEMES)
    .filter(([_, t]) => Object.values(t.levels).some((arr) => arr.length > 0))
    .map(([id]) => id);
}

// Helper: is a specific (theme, level) combination available?
export function hasContent(themeId, level) {
  const theme = VOCAB_THEMES[themeId];
  if (!theme) return false;
  return (theme.levels[level] || []).length > 0;
}

// Helper: get the total word count for the whole database.
export function getTotalWordCount() {
  let total = 0;
  for (const theme of Object.values(VOCAB_THEMES)) {
    for (const level of Object.values(theme.levels)) {
      total += level.length;
    }
  }
  return total;
}
