// Word Building — word families built from a productive root.
//
// Each root groups its derivatives by part of speech, the way the
// teaching notes describe: verbs, nouns, adjectives, adverbs, negatives,
// and related words. Every entry has the English word, a Spanish gloss,
// and (where useful) an example sentence and the affix that formed it.
//
// This is the data layer only. The page (pages/WordBuilding.jsx) renders
// a root picker + the family, colour-coded by category, and lets the
// user save any word to their custom lists (reusing saveWordToList from
// readingRoom.js).
//
// Categories use stable keys so the UI can colour + label them:
//   verb · noun · adjective · adverb · negative · related
//
// Entry shape: { en, es, example?, affix? }

export const WB_TARGET_LIST_NAME = "Word Building words";

// ─── Concepts (the "what is a noun/verb/…" theory) ───────────────────
//
// Reference content for the Concepts tab. Explanations in Spanish (to
// understand the grammar), examples and affixes in English. One entry
// per word type, in teaching order.
//
// Entry shape:
//   { key, label, labelEs, concept (string[]), answers (string[]),
//     affixes: [{ affix, example }], examples (string[]) }

export const WB_CONCEPTS = [
  {
    key: "noun",
    label: "Nouns",
    labelEs: "sustantivos",
    concept: ["Nombran personas, objetos, ideas, procesos y emociones."],
    answers: ["What is it?", "Who is it?"],
    affixes: [
      { affix: "-tion", example: "creation" },
      { affix: "-er / -or", example: "creator" },
      { affix: "-ity", example: "creativity" },
      { affix: "-ment", example: "development" },
      { affix: "-ness", example: "happiness" },
    ],
    examples: [
      "Creativity is essential in design.",
      "The creator launched the platform.",
      "The creation of the website took months.",
    ],
  },
  {
    key: "verb",
    label: "Verbs",
    labelEs: "verbos",
    concept: ["Expresan acciones, procesos y estados."],
    answers: ["What happens?", "What does someone do?"],
    affixes: [
      { affix: "re-", example: "recreate" },
      { affix: "-ify", example: "simplify" },
      { affix: "-ise / -ize", example: "organise" },
      { affix: "en-", example: "enable" },
    ],
    examples: [
      "She created a new app.",
      "The artist recreated the painting.",
      "He tends to overreact in stressful situations.",
    ],
  },
  {
    key: "adjective",
    label: "Adjectives",
    labelEs: "adjetivos",
    concept: ["Describen personas, objetos y situaciones."],
    answers: ["What is it like?"],
    affixes: [
      { affix: "-ive", example: "creative" },
      { affix: "-al", example: "educational" },
      { affix: "-ous", example: "dangerous" },
      { affix: "-ful", example: "helpful" },
      { affix: "-less", example: "useless" },
    ],
    examples: [
      "She is very creative.",
      "This tool is extremely helpful.",
      "It was a dangerous decision.",
    ],
  },
  {
    key: "adverb",
    label: "Adverbs",
    labelEs: "adverbios",
    concept: [
      "Modifican verbos, adjetivos y otros adverbios.",
      "Explican cómo, cuándo, dónde o con qué intensidad.",
    ],
    answers: ["How?"],
    affixes: [
      { affix: "-ly", example: "creatively" },
    ],
    examples: [
      "She solved the problem creatively.",
      "Drive carefully.",
      "Technology evolves rapidly.",
    ],
  },
  {
    key: "negative",
    label: "Negatives",
    labelEs: "negativos",
    concept: ["Cambian el significado a su opuesto, ausencia o negación."],
    answers: [],
    affixes: [
      { affix: "un-", example: "unhappy" },
      { affix: "dis-", example: "disconnect" },
      { affix: "in-", example: "inactive" },
      { affix: "im-", example: "impossible" },
      { affix: "ir-", example: "irresponsible" },
      { affix: "non-", example: "nonverbal" },
    ],
    examples: [
      "His explanation was unclear.",
      "That behaviour is unacceptable.",
      "The connection became unstable.",
    ],
  },
  {
    key: "related",
    label: "Related words",
    labelEs: "relacionadas",
    concept: [
      "Son palabras de la misma familia léxica.",
      "Ayudan a ampliar vocabulario, reconocer patrones e inferir significados.",
    ],
    answers: [],
    affixes: [],
    examples: [
      "She acted professionally.",
      "The interaction was positive.",
      "He is actively learning English.",
    ],
  },
];

export function getConcept(key) {
  return WB_CONCEPTS.find((c) => c.key === key) || null;
}

// Category metadata (order = display order). The page maps these to
// colours; keeping it here keeps data and labels in one place.
export const WB_CATEGORIES = [
  { key: "verb",      label: "Verbs" },
  { key: "noun",      label: "Nouns" },
  { key: "adjective", label: "Adjectives" },
  { key: "adverb",    label: "Adverbs" },
  { key: "negative",  label: "Negatives" },
  { key: "related",   label: "Related words" },
];

export const WORD_ROOTS = [
  {
    id: "act",
    root: "act",
    idea: 'la idea de "hacer / actuar"',
    families: {
      verb: [
        { en: "act", es: "actuar", example: "She acted professionally." },
        { en: "react", es: "reaccionar", example: "He reacted calmly to the news.", affix: "re-" },
        { en: "enact", es: "promulgar / representar", example: "The government enacted a new law.", affix: "en-" },
      ],
      noun: [
        { en: "action", es: "acción", affix: "-ion" },
        { en: "actor", es: "actor", affix: "-or" },
        { en: "activity", es: "actividad", affix: "-ity" },
        { en: "interaction", es: "interacción", affix: "inter- + -ion" },
      ],
      adjective: [
        { en: "active", es: "activo", affix: "-ive" },
        { en: "reactive", es: "reactivo", affix: "re- + -ive" },
      ],
      adverb: [
        { en: "actively", es: "activamente", affix: "-ly" },
      ],
      negative: [
        { en: "inactive", es: "inactivo", affix: "in-" },
        { en: "inaction", es: "inacción", affix: "in-" },
      ],
      related: [
        { en: "react", es: "reaccionar" },
        { en: "interaction", es: "interacción" },
        { en: "transaction", es: "transacción" },
      ],
    },
  },
  {
    id: "create",
    root: "create",
    idea: 'la idea de "producir / originar algo"',
    families: {
      verb: [
        { en: "create", es: "crear", example: "She created a new app." },
        { en: "recreate", es: "recrear", example: "The artist recreated the painting.", affix: "re-" },
      ],
      noun: [
        { en: "creation", es: "creación", affix: "-ion" },
        { en: "creator", es: "creador/a", affix: "-or" },
        { en: "creativity", es: "creatividad", affix: "-ity" },
      ],
      adjective: [
        { en: "creative", es: "creativo", affix: "-ive" },
      ],
      adverb: [
        { en: "creatively", es: "de forma creativa", affix: "-ly" },
      ],
      negative: [
        { en: "uncreative", es: "poco creativo", affix: "un-" },
      ],
      related: [
        { en: "procreate", es: "procrear" },
        { en: "recreation", es: "recreo / ocio" },
      ],
    },
  },
  {
    id: "connect",
    root: "connect",
    idea: 'la idea de "unir / enlazar"',
    families: {
      verb: [
        { en: "connect", es: "conectar", example: "Connect the cable to the port." },
        { en: "reconnect", es: "reconectar", affix: "re-" },
      ],
      noun: [
        { en: "connection", es: "conexión", affix: "-ion" },
        { en: "connector", es: "conector", affix: "-or" },
        { en: "connectivity", es: "conectividad", affix: "-ivity" },
      ],
      adjective: [
        { en: "connected", es: "conectado", affix: "-ed" },
        { en: "connective", es: "conectivo", affix: "-ive" },
      ],
      adverb: [
        { en: "connectedly", es: "de forma conectada", affix: "-ly" },
      ],
      negative: [
        { en: "disconnect", es: "desconectar", affix: "dis-" },
        { en: "disconnected", es: "desconectado", affix: "dis-" },
        { en: "unconnected", es: "no relacionado", affix: "un-" },
      ],
      related: [
        { en: "interconnect", es: "interconectar" },
        { en: "disconnection", es: "desconexión" },
      ],
    },
  },
  {
    id: "decide",
    root: "decide",
    idea: 'la idea de "resolver / tomar una decisión"',
    families: {
      verb: [
        { en: "decide", es: "decidir", example: "They decided to leave early." },
      ],
      noun: [
        { en: "decision", es: "decisión", affix: "-sion" },
        { en: "decisiveness", es: "determinación", affix: "-ness" },
      ],
      adjective: [
        { en: "decisive", es: "decisivo / resuelto", affix: "-ive" },
        { en: "decided", es: "decidido", affix: "-ed" },
      ],
      adverb: [
        { en: "decisively", es: "de forma decisiva", affix: "-ly" },
      ],
      negative: [
        { en: "indecisive", es: "indeciso", affix: "in-" },
        { en: "undecided", es: "indeciso / sin decidir", affix: "un-" },
        { en: "indecision", es: "indecisión", affix: "in-" },
      ],
      related: [
        { en: "decisive factor", es: "factor decisivo" },
      ],
    },
  },
  {
    id: "construct",
    root: "construct",
    idea: 'la idea de "edificar / montar"',
    families: {
      verb: [
        { en: "construct", es: "construir", example: "They constructed a bridge." },
        { en: "reconstruct", es: "reconstruir", affix: "re-" },
      ],
      noun: [
        { en: "construction", es: "construcción", affix: "-ion" },
        { en: "constructor", es: "constructor", affix: "-or" },
      ],
      adjective: [
        { en: "constructive", es: "constructivo", affix: "-ive" },
      ],
      adverb: [
        { en: "constructively", es: "de forma constructiva", affix: "-ly" },
      ],
      negative: [
        { en: "deconstruct", es: "deconstruir", affix: "de-" },
        { en: "unconstructive", es: "poco constructivo", affix: "un-" },
      ],
      related: [
        { en: "infrastructure", es: "infraestructura" },
        { en: "reconstruction", es: "reconstrucción" },
      ],
    },
  },
  {
    id: "employ",
    root: "employ",
    idea: 'la idea de "dar trabajo / usar"',
    families: {
      verb: [
        { en: "employ", es: "emplear / contratar", example: "The firm employs 200 people." },
      ],
      noun: [
        { en: "employment", es: "empleo", affix: "-ment" },
        { en: "employer", es: "empleador/a", affix: "-er" },
        { en: "employee", es: "empleado/a", affix: "-ee" },
      ],
      adjective: [
        { en: "employable", es: "empleable", affix: "-able" },
      ],
      adverb: [
        { en: "employably", es: "de forma empleable", affix: "-ly" },
      ],
      negative: [
        { en: "unemployed", es: "desempleado", affix: "un-" },
        { en: "unemployment", es: "desempleo", affix: "un-" },
      ],
      related: [
        { en: "self-employed", es: "autónomo" },
        { en: "deployment", es: "despliegue" },
      ],
    },
  },
  {
    id: "respond",
    root: "respond",
    idea: 'la idea de "contestar / reaccionar"',
    families: {
      verb: [
        { en: "respond", es: "responder", example: "She responded to the email quickly." },
      ],
      noun: [
        { en: "response", es: "respuesta", affix: "-se" },
        { en: "respondent", es: "encuestado/a", affix: "-ent" },
        { en: "responsibility", es: "responsabilidad", affix: "-ibility" },
      ],
      adjective: [
        { en: "responsive", es: "receptivo / que responde", affix: "-ive" },
        { en: "responsible", es: "responsable", affix: "-ible" },
      ],
      adverb: [
        { en: "responsively", es: "de forma receptiva", affix: "-ly" },
        { en: "responsibly", es: "responsablemente", affix: "-ly" },
      ],
      negative: [
        { en: "unresponsive", es: "que no responde", affix: "un-" },
        { en: "irresponsible", es: "irresponsable", affix: "ir-" },
      ],
      related: [
        { en: "correspond", es: "corresponder" },
        { en: "correspondence", es: "correspondencia" },
      ],
    },
  },
  {
    id: "appear",
    root: "appear",
    idea: 'la idea de "mostrarse / surgir"',
    families: {
      verb: [
        { en: "appear", es: "aparecer / parecer", example: "A rainbow appeared after the rain." },
      ],
      noun: [
        { en: "appearance", es: "apariencia / aparición", affix: "-ance" },
      ],
      adjective: [
        { en: "apparent", es: "aparente / evidente", affix: "-ent" },
      ],
      adverb: [
        { en: "apparently", es: "aparentemente", affix: "-ly" },
      ],
      negative: [
        { en: "disappear", es: "desaparecer", affix: "dis-" },
        { en: "disappearance", es: "desaparición", affix: "dis-" },
      ],
      related: [
        { en: "reappear", es: "reaparecer" },
        { en: "transparent", es: "transparente" },
      ],
    },
  },
  {
    id: "form",
    root: "form",
    idea: 'la idea de "dar forma / estructura"',
    families: {
      verb: [
        { en: "form", es: "formar", example: "They formed a committee." },
        { en: "transform", es: "transformar", affix: "trans-" },
        { en: "reform", es: "reformar", affix: "re-" },
      ],
      noun: [
        { en: "formation", es: "formación", affix: "-ation" },
        { en: "format", es: "formato" },
        { en: "transformation", es: "transformación", affix: "trans- + -ation" },
      ],
      adjective: [
        { en: "formal", es: "formal", affix: "-al" },
        { en: "formative", es: "formativo", affix: "-ative" },
      ],
      adverb: [
        { en: "formally", es: "formalmente", affix: "-ly" },
      ],
      negative: [
        { en: "informal", es: "informal", affix: "in-" },
        { en: "deform", es: "deformar", affix: "de-" },
        { en: "malformed", es: "malformado", affix: "mal-" },
      ],
      related: [
        { en: "uniform", es: "uniforme" },
        { en: "conform", es: "ajustarse / cumplir" },
      ],
    },
  },
  {
    id: "press",
    root: "press",
    idea: 'la idea de "apretar / ejercer fuerza"',
    families: {
      verb: [
        { en: "press", es: "presionar / pulsar", example: "Press the button to start." },
        { en: "express", es: "expresar", affix: "ex-" },
        { en: "compress", es: "comprimir", affix: "com-" },
      ],
      noun: [
        { en: "pressure", es: "presión", affix: "-ure" },
        { en: "expression", es: "expresión", affix: "ex- + -ion" },
        { en: "depression", es: "depresión", affix: "de- + -ion" },
      ],
      adjective: [
        { en: "pressing", es: "apremiante", affix: "-ing" },
        { en: "expressive", es: "expresivo", affix: "ex- + -ive" },
      ],
      adverb: [
        { en: "expressively", es: "de forma expresiva", affix: "-ly" },
      ],
      negative: [
        { en: "depress", es: "deprimir", affix: "de-" },
        { en: "suppress", es: "reprimir / suprimir", affix: "sup-" },
      ],
      related: [
        { en: "impress", es: "impresionar" },
        { en: "impression", es: "impresión" },
      ],
    },
  },
  {
    id: "port",
    root: "port",
    idea: 'la idea de "llevar / transportar"',
    families: {
      verb: [
        { en: "transport", es: "transportar", example: "They transport goods by sea.", affix: "trans-" },
        { en: "export", es: "exportar", affix: "ex-" },
        { en: "import", es: "importar", affix: "im-" },
        { en: "deport", es: "deportar", affix: "de-" },
      ],
      noun: [
        { en: "transport", es: "transporte" },
        { en: "porter", es: "mozo / portero", affix: "-er" },
        { en: "portfolio", es: "cartera / portafolio" },
        { en: "exportation", es: "exportación", affix: "ex- + -ation" },
      ],
      adjective: [
        { en: "portable", es: "portátil", affix: "-able" },
        { en: "transportable", es: "transportable", affix: "trans- + -able" },
      ],
      adverb: [
        { en: "portably", es: "de forma portátil", affix: "-ly" },
      ],
      negative: [
        { en: "non-transferable", es: "intransferible", affix: "non-" },
      ],
      related: [
        { en: "report", es: "informar / informe" },
        { en: "support", es: "apoyar / apoyo" },
      ],
    },
  },
  {
    id: "struct",
    root: "struct",
    idea: 'la idea de "construir / disponer en orden"',
    families: {
      verb: [
        { en: "structure", es: "estructurar" },
        { en: "instruct", es: "instruir", affix: "in-" },
        { en: "obstruct", es: "obstruir", affix: "ob-" },
      ],
      noun: [
        { en: "structure", es: "estructura" },
        { en: "instruction", es: "instrucción", affix: "in- + -ion" },
        { en: "instructor", es: "instructor", affix: "in- + -or" },
        { en: "obstruction", es: "obstrucción", affix: "ob- + -ion" },
      ],
      adjective: [
        { en: "structural", es: "estructural", affix: "-al" },
        { en: "instructive", es: "instructivo", affix: "in- + -ive" },
      ],
      adverb: [
        { en: "structurally", es: "estructuralmente", affix: "-ally" },
      ],
      negative: [
        { en: "unstructured", es: "sin estructura", affix: "un-" },
      ],
      related: [
        { en: "construct", es: "construir" },
        { en: "infrastructure", es: "infraestructura" },
      ],
    },
  },
  {
    id: "dict",
    root: "dict",
    idea: 'la idea de "decir / declarar"',
    families: {
      verb: [
        { en: "predict", es: "predecir", example: "Experts predict a rise in prices.", affix: "pre-" },
        { en: "dictate", es: "dictar", affix: "-ate" },
        { en: "contradict", es: "contradecir", affix: "contra-" },
      ],
      noun: [
        { en: "prediction", es: "predicción", affix: "pre- + -ion" },
        { en: "dictation", es: "dictado", affix: "-ation" },
        { en: "dictionary", es: "diccionario", affix: "-ionary" },
        { en: "contradiction", es: "contradicción", affix: "contra- + -ion" },
      ],
      adjective: [
        { en: "predictable", es: "predecible", affix: "pre- + -able" },
        { en: "contradictory", es: "contradictorio", affix: "contra- + -ory" },
      ],
      adverb: [
        { en: "predictably", es: "de forma predecible", affix: "pre- + -ably" },
      ],
      negative: [
        { en: "unpredictable", es: "impredecible", affix: "un-" },
      ],
      related: [
        { en: "verdict", es: "veredicto" },
        { en: "dictator", es: "dictador" },
      ],
    },
  },
  {
    id: "duct",
    root: "duct",
    idea: 'la idea de "conducir / guiar"',
    families: {
      verb: [
        { en: "conduct", es: "conducir / llevar a cabo", example: "They conducted a survey.", affix: "con-" },
        { en: "produce", es: "producir", affix: "pro-" },
        { en: "reduce", es: "reducir", affix: "re-" },
        { en: "introduce", es: "presentar / introducir", affix: "intro-" },
      ],
      noun: [
        { en: "conductor", es: "director / revisor", affix: "con- + -or" },
        { en: "production", es: "producción", affix: "pro- + -tion" },
        { en: "reduction", es: "reducción", affix: "re- + -tion" },
        { en: "introduction", es: "introducción", affix: "intro- + -tion" },
      ],
      adjective: [
        { en: "productive", es: "productivo", affix: "pro- + -ive" },
        { en: "conductive", es: "conductor (material)", affix: "con- + -ive" },
      ],
      adverb: [
        { en: "productively", es: "de forma productiva", affix: "-ly" },
      ],
      negative: [
        { en: "unproductive", es: "improductivo", affix: "un-" },
        { en: "counterproductive", es: "contraproducente", affix: "counter-" },
      ],
      related: [
        { en: "educate", es: "educar" },
        { en: "aqueduct", es: "acueducto" },
      ],
    },
  },
  {
    id: "vert",
    root: "vert",
    idea: 'la idea de "girar / dar la vuelta"',
    families: {
      verb: [
        { en: "convert", es: "convertir", example: "They converted the loft into a flat.", affix: "con-" },
        { en: "reverse", es: "invertir / dar marcha atrás", affix: "re-" },
        { en: "divert", es: "desviar", affix: "di-" },
      ],
      noun: [
        { en: "conversion", es: "conversión", affix: "con- + -sion" },
        { en: "version", es: "versión", affix: "-sion" },
        { en: "diversion", es: "desvío / distracción", affix: "di- + -sion" },
      ],
      adjective: [
        { en: "versatile", es: "versátil", affix: "-atile" },
        { en: "reversible", es: "reversible", affix: "re- + -ible" },
      ],
      adverb: [
        { en: "conversely", es: "a la inversa", affix: "-ly" },
      ],
      negative: [
        { en: "irreversible", es: "irreversible", affix: "ir-" },
      ],
      related: [
        { en: "advertise", es: "anunciar" },
        { en: "anniversary", es: "aniversario" },
      ],
    },
  },
  {
    id: "ject",
    root: "ject",
    idea: 'la idea de "lanzar / arrojar"',
    families: {
      verb: [
        { en: "reject", es: "rechazar", example: "The committee rejected the proposal.", affix: "re-" },
        { en: "inject", es: "inyectar", affix: "in-" },
        { en: "eject", es: "expulsar", affix: "e-" },
        { en: "project", es: "proyectar", affix: "pro-" },
      ],
      noun: [
        { en: "rejection", es: "rechazo", affix: "re- + -ion" },
        { en: "injection", es: "inyección", affix: "in- + -ion" },
        { en: "projection", es: "proyección", affix: "pro- + -ion" },
        { en: "object", es: "objeto", affix: "ob-" },
      ],
      adjective: [
        { en: "objective", es: "objetivo", affix: "ob- + -ive" },
        { en: "subjective", es: "subjetivo", affix: "sub- + -ive" },
      ],
      adverb: [
        { en: "objectively", es: "objetivamente", affix: "-ly" },
      ],
      negative: [
        { en: "unobjectionable", es: "irreprochable", affix: "un-" },
      ],
      related: [
        { en: "subject", es: "sujeto / tema" },
        { en: "trajectory", es: "trayectoria" },
      ],
    },
  },
  {
    id: "tract",
    root: "tract",
    idea: 'la idea de "tirar / arrastrar"',
    families: {
      verb: [
        { en: "attract", es: "atraer", example: "The festival attracts thousands.", affix: "at-" },
        { en: "extract", es: "extraer", affix: "ex-" },
        { en: "distract", es: "distraer", affix: "dis-" },
        { en: "subtract", es: "restar", affix: "sub-" },
      ],
      noun: [
        { en: "attraction", es: "atracción", affix: "at- + -ion" },
        { en: "extraction", es: "extracción", affix: "ex- + -ion" },
        { en: "distraction", es: "distracción", affix: "dis- + -ion" },
        { en: "contract", es: "contrato", affix: "con-" },
      ],
      adjective: [
        { en: "attractive", es: "atractivo", affix: "at- + -ive" },
        { en: "abstract", es: "abstracto", affix: "abs-" },
      ],
      adverb: [
        { en: "attractively", es: "de forma atractiva", affix: "-ly" },
      ],
      negative: [
        { en: "unattractive", es: "poco atractivo", affix: "un-" },
      ],
      related: [
        { en: "tractor", es: "tractor" },
        { en: "trace", es: "rastro / rastrear" },
      ],
    },
  },
  {
    id: "script",
    root: "script",
    idea: 'la idea de "escribir"',
    families: {
      verb: [
        { en: "describe", es: "describir", example: "She described the scene in detail.", affix: "de-" },
        { en: "prescribe", es: "recetar / prescribir", affix: "pre-" },
        { en: "subscribe", es: "suscribirse", affix: "sub-" },
      ],
      noun: [
        { en: "description", es: "descripción", affix: "de- + -tion" },
        { en: "prescription", es: "receta médica", affix: "pre- + -tion" },
        { en: "subscription", es: "suscripción", affix: "sub- + -tion" },
        { en: "manuscript", es: "manuscrito", affix: "manu-" },
      ],
      adjective: [
        { en: "descriptive", es: "descriptivo", affix: "de- + -ive" },
      ],
      adverb: [
        { en: "descriptively", es: "de forma descriptiva", affix: "-ly" },
      ],
      negative: [
        { en: "nondescript", es: "anodino / sin rasgos", affix: "non-" },
      ],
      related: [
        { en: "script", es: "guion" },
        { en: "transcript", es: "transcripción" },
      ],
    },
  },
  {
    id: "spect",
    root: "spect",
    idea: 'la idea de "mirar / observar"',
    families: {
      verb: [
        { en: "inspect", es: "inspeccionar", example: "Officials inspected the building.", affix: "in-" },
        { en: "respect", es: "respetar", affix: "re-" },
        { en: "suspect", es: "sospechar", affix: "su-" },
      ],
      noun: [
        { en: "inspection", es: "inspección", affix: "in- + -ion" },
        { en: "inspector", es: "inspector", affix: "in- + -or" },
        { en: "spectator", es: "espectador", affix: "-ator" },
        { en: "perspective", es: "perspectiva", affix: "per- + -ive" },
      ],
      adjective: [
        { en: "respectful", es: "respetuoso", affix: "re- + -ful" },
        { en: "spectacular", es: "espectacular", affix: "-acular" },
      ],
      adverb: [
        { en: "respectfully", es: "respetuosamente", affix: "-ly" },
      ],
      negative: [
        { en: "disrespectful", es: "irrespetuoso", affix: "dis-" },
      ],
      related: [
        { en: "spectacle", es: "espectáculo" },
        { en: "prospect", es: "perspectiva / posibilidad" },
      ],
    },
  },
  {
    id: "miss",
    root: "miss",
    idea: 'la idea de "enviar / soltar"',
    families: {
      verb: [
        { en: "submit", es: "entregar / presentar", example: "Please submit your application.", affix: "sub-" },
        { en: "permit", es: "permitir", affix: "per-" },
        { en: "transmit", es: "transmitir", affix: "trans-" },
        { en: "dismiss", es: "despedir / descartar", affix: "dis-" },
      ],
      noun: [
        { en: "mission", es: "misión", affix: "-ion" },
        { en: "permission", es: "permiso", affix: "per- + -ion" },
        { en: "submission", es: "entrega / presentación", affix: "sub- + -ion" },
        { en: "transmission", es: "transmisión", affix: "trans- + -ion" },
      ],
      adjective: [
        { en: "permissive", es: "permisivo", affix: "per- + -ive" },
        { en: "missionary", es: "misionero", affix: "-ionary" },
      ],
      adverb: [
        { en: "permissively", es: "de forma permisiva", affix: "-ly" },
      ],
      negative: [
        { en: "impermissible", es: "inadmisible", affix: "im-" },
      ],
      related: [
        { en: "promise", es: "prometer / promesa" },
        { en: "compromise", es: "compromiso / ceder" },
      ],
    },
  },
  {
    id: "fer",
    root: "fer",
    idea: 'la idea de "llevar / aportar"',
    families: {
      verb: [
        { en: "transfer", es: "transferir", example: "She transferred the funds.", affix: "trans-" },
        { en: "refer", es: "referir / remitir", affix: "re-" },
        { en: "offer", es: "ofrecer", affix: "of-" },
        { en: "prefer", es: "preferir", affix: "pre-" },
      ],
      noun: [
        { en: "transfer", es: "transferencia" },
        { en: "reference", es: "referencia", affix: "re- + -ence" },
        { en: "preference", es: "preferencia", affix: "pre- + -ence" },
        { en: "conference", es: "conferencia", affix: "con- + -ence" },
      ],
      adjective: [
        { en: "preferable", es: "preferible", affix: "pre- + -able" },
        { en: "different", es: "diferente", affix: "dif- + -ent" },
      ],
      adverb: [
        { en: "preferably", es: "preferiblemente", affix: "-ably" },
      ],
      negative: [
        { en: "indifferent", es: "indiferente", affix: "in-" },
        { en: "non-transferable", es: "intransferible", affix: "non-" },
      ],
      related: [
        { en: "fertile", es: "fértil" },
        { en: "infer", es: "inferir / deducir" },
      ],
    },
  },
  {
    id: "cept",
    root: "cept",
    idea: 'la idea de "tomar / recibir"',
    families: {
      verb: [
        { en: "accept", es: "aceptar", example: "They accepted the offer.", affix: "ac-" },
        { en: "receive", es: "recibir", affix: "re-" },
        { en: "except", es: "exceptuar", affix: "ex-" },
      ],
      noun: [
        { en: "acceptance", es: "aceptación", affix: "ac- + -ance" },
        { en: "reception", es: "recepción", affix: "re- + -tion" },
        { en: "exception", es: "excepción", affix: "ex- + -tion" },
        { en: "concept", es: "concepto", affix: "con-" },
      ],
      adjective: [
        { en: "acceptable", es: "aceptable", affix: "ac- + -able" },
        { en: "exceptional", es: "excepcional", affix: "ex- + -al" },
      ],
      adverb: [
        { en: "exceptionally", es: "excepcionalmente", affix: "-ly" },
      ],
      negative: [
        { en: "unacceptable", es: "inaceptable", affix: "un-" },
      ],
      related: [
        { en: "capture", es: "capturar" },
        { en: "perceive", es: "percibir" },
      ],
    },
  },
  {
    id: "pose",
    root: "pose",
    idea: 'la idea de "poner / colocar"',
    families: {
      verb: [
        { en: "propose", es: "proponer", example: "He proposed a new plan.", affix: "pro-" },
        { en: "compose", es: "componer", affix: "com-" },
        { en: "expose", es: "exponer", affix: "ex-" },
        { en: "impose", es: "imponer", affix: "im-" },
      ],
      noun: [
        { en: "proposal", es: "propuesta", affix: "pro- + -al" },
        { en: "composition", es: "composición", affix: "com- + -ition" },
        { en: "exposure", es: "exposición", affix: "ex- + -ure" },
        { en: "purpose", es: "propósito" },
      ],
      adjective: [
        { en: "composed", es: "sereno / compuesto", affix: "-ed" },
        { en: "purposeful", es: "decidido", affix: "-ful" },
      ],
      adverb: [
        { en: "purposefully", es: "con determinación", affix: "-ly" },
      ],
      negative: [
        { en: "purposeless", es: "sin sentido", affix: "-less" },
      ],
      related: [
        { en: "position", es: "posición" },
        { en: "opposite", es: "opuesto" },
      ],
    },
  },
  {
    id: "voc",
    root: "voc",
    idea: 'la idea de "voz / llamar"',
    families: {
      verb: [
        { en: "advocate", es: "abogar por", affix: "ad- + -ate" },
        { en: "provoke", es: "provocar", affix: "pro-" },
        { en: "evoke", es: "evocar", affix: "e-" },
      ],
      noun: [
        { en: "vocabulary", es: "vocabulario", affix: "-abulary" },
        { en: "vocation", es: "vocación", affix: "-ation" },
        { en: "advocate", es: "defensor / abogado", affix: "ad- + -ate" },
        { en: "provocation", es: "provocación", affix: "pro- + -ation" },
      ],
      adjective: [
        { en: "vocal", es: "vocal / ruidoso", affix: "-al" },
        { en: "provocative", es: "provocador", affix: "pro- + -ative" },
      ],
      adverb: [
        { en: "vocally", es: "en voz alta", affix: "-ly" },
      ],
      negative: [
        { en: "unprovoked", es: "no provocado", affix: "un-" },
      ],
      related: [
        { en: "voice", es: "voz" },
        { en: "vowel", es: "vocal (letra)" },
      ],
    },
  },
  {
    id: "vent",
    root: "vent",
    idea: 'la idea de "venir / llegar"',
    families: {
      verb: [
        { en: "prevent", es: "prevenir / evitar", example: "Vaccines prevent disease.", affix: "pre-" },
        { en: "invent", es: "inventar", affix: "in-" },
        { en: "intervene", es: "intervenir", affix: "inter-" },
      ],
      noun: [
        { en: "event", es: "evento", affix: "e-" },
        { en: "invention", es: "invención", affix: "in- + -tion" },
        { en: "prevention", es: "prevención", affix: "pre- + -tion" },
        { en: "adventure", es: "aventura", affix: "ad- + -ure" },
      ],
      adjective: [
        { en: "inventive", es: "inventivo", affix: "in- + -ive" },
        { en: "preventive", es: "preventivo", affix: "pre- + -ive" },
      ],
      adverb: [
        { en: "inventively", es: "de forma inventiva", affix: "-ly" },
      ],
      negative: [
        { en: "uneventful", es: "sin incidentes", affix: "un-" },
      ],
      related: [
        { en: "convention", es: "convención" },
        { en: "avenue", es: "avenida" },
      ],
    },
  },
  {
    id: "tend",
    root: "tend",
    idea: 'la idea de "estirar / tender hacia"',
    families: {
      verb: [
        { en: "extend", es: "extender", example: "They extended the deadline.", affix: "ex-" },
        { en: "attend", es: "asistir / atender", affix: "at-" },
        { en: "pretend", es: "fingir", affix: "pre-" },
      ],
      noun: [
        { en: "extension", es: "extensión", affix: "ex- + -sion" },
        { en: "attention", es: "atención", affix: "at- + -tion" },
        { en: "tendency", es: "tendencia", affix: "-ency" },
        { en: "intention", es: "intención", affix: "in- + -tion" },
      ],
      adjective: [
        { en: "attentive", es: "atento", affix: "at- + -ive" },
        { en: "extensive", es: "extenso", affix: "ex- + -ive" },
      ],
      adverb: [
        { en: "attentively", es: "atentamente", affix: "-ly" },
      ],
      negative: [
        { en: "inattentive", es: "desatento", affix: "in-" },
        { en: "unintentional", es: "involuntario", affix: "un-" },
      ],
      related: [
        { en: "tension", es: "tensión" },
        { en: "tent", es: "tienda de campaña" },
      ],
    },
  },
  {
    id: "ceive",
    root: "ceive",
    idea: 'la idea de "tomar / captar"',
    families: {
      verb: [
        { en: "receive", es: "recibir", example: "I received your message.", affix: "re-" },
        { en: "perceive", es: "percibir", affix: "per-" },
        { en: "deceive", es: "engañar", affix: "de-" },
        { en: "conceive", es: "concebir", affix: "con-" },
      ],
      noun: [
        { en: "perception", es: "percepción", affix: "per- + -tion" },
        { en: "deception", es: "engaño", affix: "de- + -tion" },
        { en: "receipt", es: "recibo", affix: "re-" },
        { en: "conception", es: "concepción", affix: "con- + -tion" },
      ],
      adjective: [
        { en: "perceptive", es: "perspicaz", affix: "per- + -ive" },
        { en: "deceptive", es: "engañoso", affix: "de- + -ive" },
      ],
      adverb: [
        { en: "deceptively", es: "de forma engañosa", affix: "-ly" },
      ],
      negative: [
        { en: "imperceptible", es: "imperceptible", affix: "im-" },
      ],
      related: [
        { en: "receiver", es: "receptor" },
        { en: "concept", es: "concepto" },
      ],
    },
  },
  {
    id: "sent",
    root: "sent",
    idea: 'la idea de "sentir / percibir"',
    families: {
      verb: [
        { en: "consent", es: "consentir", affix: "con-" },
        { en: "resent", es: "resentirse", affix: "re-" },
      ],
      noun: [
        { en: "sentiment", es: "sentimiento", affix: "-iment" },
        { en: "consent", es: "consentimiento", affix: "con-" },
        { en: "sensation", es: "sensación", affix: "-ation" },
        { en: "consensus", es: "consenso", affix: "con-" },
      ],
      adjective: [
        { en: "sentimental", es: "sentimental", affix: "-al" },
        { en: "sensitive", es: "sensible", affix: "-itive" },
      ],
      adverb: [
        { en: "sensitively", es: "con sensibilidad", affix: "-ly" },
      ],
      negative: [
        { en: "insensitive", es: "insensible", affix: "in-" },
        { en: "nonsense", es: "tontería / sinsentido", affix: "non-" },
      ],
      related: [
        { en: "sense", es: "sentido" },
        { en: "resentment", es: "resentimiento" },
      ],
    },
  },
  {
    id: "mot",
    root: "mot",
    idea: 'la idea de "mover"',
    families: {
      verb: [
        { en: "promote", es: "promover / ascender", example: "She was promoted last year.", affix: "pro-" },
        { en: "motivate", es: "motivar", affix: "-ivate" },
        { en: "remove", es: "quitar / eliminar", affix: "re-" },
      ],
      noun: [
        { en: "motion", es: "movimiento", affix: "-ion" },
        { en: "motive", es: "motivo", affix: "-ive" },
        { en: "promotion", es: "ascenso / promoción", affix: "pro- + -tion" },
        { en: "emotion", es: "emoción", affix: "e- + -tion" },
      ],
      adjective: [
        { en: "emotional", es: "emocional", affix: "e- + -al" },
        { en: "motivational", es: "motivacional", affix: "-al" },
      ],
      adverb: [
        { en: "emotionally", es: "emocionalmente", affix: "-ly" },
      ],
      negative: [
        { en: "unmotivated", es: "desmotivado", affix: "un-" },
        { en: "motionless", es: "inmóvil", affix: "-less" },
      ],
      related: [
        { en: "movement", es: "movimiento" },
        { en: "automobile", es: "automóvil" },
      ],
    },
  },
  {
    id: "sist",
    root: "sist",
    idea: 'la idea de "estar / mantenerse firme"',
    families: {
      verb: [
        { en: "insist", es: "insistir", example: "He insisted on paying.", affix: "in-" },
        { en: "resist", es: "resistir", affix: "re-" },
        { en: "consist", es: "consistir / constar", affix: "con-" },
        { en: "assist", es: "ayudar / asistir", affix: "as-" },
      ],
      noun: [
        { en: "resistance", es: "resistencia", affix: "re- + -ance" },
        { en: "assistance", es: "ayuda / asistencia", affix: "as- + -ance" },
        { en: "assistant", es: "asistente", affix: "as- + -ant" },
        { en: "consistency", es: "coherencia / consistencia", affix: "con- + -ency" },
      ],
      adjective: [
        { en: "consistent", es: "coherente / constante", affix: "con- + -ent" },
        { en: "resistant", es: "resistente", affix: "re- + -ant" },
      ],
      adverb: [
        { en: "consistently", es: "de forma constante", affix: "-ly" },
      ],
      negative: [
        { en: "inconsistent", es: "incoherente", affix: "in-" },
        { en: "irresistible", es: "irresistible", affix: "ir-" },
      ],
      related: [
        { en: "persist", es: "persistir" },
        { en: "exist", es: "existir" },
      ],
    },
  },
  {
    id: "duce",
    root: "duce",
    idea: 'la idea de "guiar / llevar"',
    families: {
      verb: [
        { en: "produce", es: "producir", example: "The factory produces cars.", affix: "pro-" },
        { en: "reduce", es: "reducir", affix: "re-" },
        { en: "induce", es: "inducir", affix: "in-" },
      ],
      noun: [
        { en: "producer", es: "productor", affix: "pro- + -er" },
        { en: "product", es: "producto", affix: "pro-" },
        { en: "reduction", es: "reducción", affix: "re- + -tion" },
      ],
      adjective: [
        { en: "reducible", es: "reducible", affix: "re- + -ible" },
        { en: "productive", es: "productivo", affix: "pro- + -ive" },
      ],
      adverb: [
        { en: "productively", es: "de forma productiva", affix: "-ly" },
      ],
      negative: [
        { en: "irreducible", es: "irreducible", affix: "ir-" },
      ],
      related: [
        { en: "induction", es: "inducción" },
        { en: "seduce", es: "seducir" },
      ],
    },
  },
  {
    id: "claim",
    root: "claim",
    idea: 'la idea de "gritar / proclamar"',
    families: {
      verb: [
        { en: "claim", es: "afirmar / reclamar", example: "He claimed he was innocent." },
        { en: "exclaim", es: "exclamar", affix: "ex-" },
        { en: "proclaim", es: "proclamar", affix: "pro-" },
        { en: "reclaim", es: "reclamar / recuperar", affix: "re-" },
      ],
      noun: [
        { en: "claim", es: "afirmación / reclamación" },
        { en: "exclamation", es: "exclamación", affix: "ex- + -ation" },
        { en: "proclamation", es: "proclamación", affix: "pro- + -ation" },
      ],
      adjective: [
        { en: "exclamatory", es: "exclamativo", affix: "ex- + -atory" },
      ],
      adverb: [
        { en: "reportedly", es: "supuestamente" },
      ],
      negative: [
        { en: "unclaimed", es: "no reclamado", affix: "un-" },
      ],
      related: [
        { en: "claimant", es: "demandante" },
        { en: "disclaim", es: "negar / rechazar" },
      ],
    },
  },
  {
    id: "serve",
    root: "serve",
    idea: 'la idea de "servir / guardar"',
    families: {
      verb: [
        { en: "serve", es: "servir", example: "This restaurant serves tapas." },
        { en: "preserve", es: "preservar", affix: "pre-" },
        { en: "observe", es: "observar", affix: "ob-" },
        { en: "reserve", es: "reservar", affix: "re-" },
      ],
      noun: [
        { en: "service", es: "servicio", affix: "-ice" },
        { en: "observation", es: "observación", affix: "ob- + -ation" },
        { en: "reservation", es: "reserva", affix: "re- + -ation" },
        { en: "preservation", es: "preservación", affix: "pre- + -ation" },
      ],
      adjective: [
        { en: "observant", es: "observador", affix: "ob- + -ant" },
        { en: "conservative", es: "conservador", affix: "con- + -ative" },
      ],
      adverb: [
        { en: "observably", es: "de forma observable", affix: "-ly" },
      ],
      negative: [
        { en: "unobservant", es: "poco observador", affix: "un-" },
      ],
      related: [
        { en: "server", es: "servidor / camarero" },
        { en: "deserve", es: "merecer" },
      ],
    },
  },
  {
    id: "sign",
    root: "sign",
    idea: 'la idea de "marca / señal"',
    families: {
      verb: [
        { en: "sign", es: "firmar / señalar", example: "Please sign here." },
        { en: "design", es: "diseñar", affix: "de-" },
        { en: "assign", es: "asignar", affix: "as-" },
        { en: "resign", es: "dimitir", affix: "re-" },
      ],
      noun: [
        { en: "signal", es: "señal", affix: "-al" },
        { en: "signature", es: "firma", affix: "-ature" },
        { en: "design", es: "diseño", affix: "de-" },
        { en: "assignment", es: "tarea / asignación", affix: "as- + -ment" },
      ],
      adjective: [
        { en: "significant", es: "significativo", affix: "-ificant" },
        { en: "designated", es: "designado", affix: "de- + -ated" },
      ],
      adverb: [
        { en: "significantly", es: "significativamente", affix: "-ly" },
      ],
      negative: [
        { en: "insignificant", es: "insignificante", affix: "in-" },
      ],
      related: [
        { en: "signify", es: "significar" },
        { en: "designer", es: "diseñador" },
      ],
    },
  },
  {
    id: "vis",
    root: "vis",
    idea: 'la idea de "ver"',
    families: {
      verb: [
        { en: "visit", es: "visitar", example: "We visited the museum.", affix: "-it" },
        { en: "revise", es: "revisar / repasar", affix: "re-" },
        { en: "supervise", es: "supervisar", affix: "super-" },
      ],
      noun: [
        { en: "vision", es: "visión", affix: "-ion" },
        { en: "television", es: "televisión", affix: "tele-" },
        { en: "revision", es: "revisión / repaso", affix: "re- + -ion" },
        { en: "supervision", es: "supervisión", affix: "super- + -ion" },
      ],
      adjective: [
        { en: "visible", es: "visible", affix: "-ible" },
        { en: "visual", es: "visual", affix: "-ual" },
      ],
      adverb: [
        { en: "visibly", es: "visiblemente", affix: "-ibly" },
      ],
      negative: [
        { en: "invisible", es: "invisible", affix: "in-" },
      ],
      related: [
        { en: "visa", es: "visado" },
        { en: "advise", es: "aconsejar" },
      ],
    },
  },
  {
    id: "cred",
    root: "cred",
    idea: 'la idea de "creer / confiar"',
    families: {
      verb: [
        { en: "credit", es: "acreditar / dar crédito", affix: "-it" },
        { en: "accredit", es: "acreditar", affix: "ac-" },
        { en: "discredit", es: "desacreditar", affix: "dis-" },
      ],
      noun: [
        { en: "credit", es: "crédito" },
        { en: "credibility", es: "credibilidad", affix: "-ibility" },
        { en: "credential", es: "credencial", affix: "-ential" },
      ],
      adjective: [
        { en: "credible", es: "creíble", affix: "-ible" },
        { en: "incredible", es: "increíble", affix: "in-" },
      ],
      adverb: [
        { en: "incredibly", es: "increíblemente", affix: "-ibly" },
      ],
      negative: [
        { en: "incredible", es: "increíble", affix: "in-" },
        { en: "discredited", es: "desacreditado", affix: "dis-" },
      ],
      related: [
        { en: "credentials", es: "credenciales" },
        { en: "creed", es: "credo" },
      ],
    },
  },
  {
    id: "grad",
    root: "grad",
    idea: 'la idea de "paso / grado"',
    families: {
      verb: [
        { en: "graduate", es: "graduarse", example: "She graduated in May.", affix: "-uate" },
        { en: "upgrade", es: "mejorar / actualizar", affix: "up-" },
        { en: "degrade", es: "degradar", affix: "de-" },
      ],
      noun: [
        { en: "grade", es: "nota / grado" },
        { en: "graduate", es: "graduado/a", affix: "-uate" },
        { en: "graduation", es: "graduación", affix: "-uation" },
        { en: "gradient", es: "pendiente / gradiente", affix: "-ient" },
      ],
      adjective: [
        { en: "gradual", es: "gradual", affix: "-ual" },
        { en: "graded", es: "graduado / por niveles", affix: "-ed" },
      ],
      adverb: [
        { en: "gradually", es: "gradualmente", affix: "-ly" },
      ],
      negative: [
        { en: "downgrade", es: "degradar / bajar de categoría", affix: "down-" },
      ],
      related: [
        { en: "degree", es: "título / grado" },
        { en: "progress", es: "progreso" },
      ],
    },
  },
  {
    id: "fic",
    root: "fic",
    idea: 'la idea de "hacer / producir"',
    families: {
      verb: [
        { en: "clarify", es: "aclarar", affix: "-ify" },
        { en: "justify", es: "justificar", affix: "-ify" },
        { en: "simplify", es: "simplificar", affix: "-ify" },
      ],
      noun: [
        { en: "efficiency", es: "eficiencia", affix: "ef- + -iency" },
        { en: "difficulty", es: "dificultad", affix: "-ulty" },
        { en: "qualification", es: "cualificación", affix: "-ation" },
      ],
      adjective: [
        { en: "efficient", es: "eficiente", affix: "ef- + -ient" },
        { en: "beneficial", es: "beneficioso", affix: "-ial" },
        { en: "artificial", es: "artificial", affix: "-ial" },
      ],
      adverb: [
        { en: "efficiently", es: "de forma eficiente", affix: "-ly" },
      ],
      negative: [
        { en: "inefficient", es: "ineficiente", affix: "in-" },
        { en: "difficult", es: "difícil", affix: "dif-" },
      ],
      related: [
        { en: "factory", es: "fábrica" },
        { en: "fiction", es: "ficción" },
      ],
    },
  },
  {
    id: "pel",
    root: "pel",
    idea: 'la idea de "empujar / impulsar"',
    families: {
      verb: [
        { en: "compel", es: "obligar", affix: "com-" },
        { en: "expel", es: "expulsar", affix: "ex-" },
        { en: "propel", es: "propulsar", affix: "pro-" },
      ],
      noun: [
        { en: "compulsion", es: "compulsión", affix: "com- + -sion" },
        { en: "expulsion", es: "expulsión", affix: "ex- + -sion" },
        { en: "propeller", es: "hélice", affix: "pro- + -er" },
      ],
      adjective: [
        { en: "compelling", es: "convincente", affix: "com- + -ing" },
        { en: "compulsive", es: "compulsivo", affix: "com- + -ive" },
      ],
      adverb: [
        { en: "compulsively", es: "de forma compulsiva", affix: "-ly" },
      ],
      negative: [
        { en: "repel", es: "repeler", affix: "re-" },
      ],
      related: [
        { en: "pulse", es: "pulso" },
        { en: "impulse", es: "impulso" },
      ],
    },
  },
  {
    id: "cap",
    root: "cap",
    idea: 'la idea de "cabeza / tomar"',
    families: {
      verb: [
        { en: "capture", es: "capturar", example: "The photo captured the moment.", affix: "-ture" },
        { en: "captivate", es: "cautivar", affix: "-ivate" },
      ],
      noun: [
        { en: "capacity", es: "capacidad", affix: "-acity" },
        { en: "capital", es: "capital", affix: "-ital" },
        { en: "caption", es: "pie de foto / subtítulo", affix: "-tion" },
        { en: "captive", es: "cautivo", affix: "-tive" },
      ],
      adjective: [
        { en: "capable", es: "capaz", affix: "-able" },
        { en: "captivating", es: "cautivador", affix: "-ating" },
      ],
      adverb: [
        { en: "capably", es: "de forma competente", affix: "-ably" },
      ],
      negative: [
        { en: "incapable", es: "incapaz", affix: "in-" },
      ],
      related: [
        { en: "capacity", es: "capacidad" },
        { en: "escape", es: "escapar" },
      ],
    },
  },
  {
    id: "loc",
    root: "loc",
    idea: 'la idea de "lugar"',
    families: {
      verb: [
        { en: "locate", es: "localizar / ubicar", affix: "-ate" },
        { en: "relocate", es: "reubicar", affix: "re-" },
        { en: "allocate", es: "asignar", affix: "al-" },
      ],
      noun: [
        { en: "location", es: "ubicación", affix: "-ation" },
        { en: "locality", es: "localidad", affix: "-ality" },
        { en: "allocation", es: "asignación", affix: "al- + -ation" },
      ],
      adjective: [
        { en: "local", es: "local", affix: "-al" },
        { en: "localized", es: "localizado", affix: "-ized" },
      ],
      adverb: [
        { en: "locally", es: "localmente", affix: "-ly" },
      ],
      negative: [
        { en: "dislocate", es: "dislocar", affix: "dis-" },
      ],
      related: [
        { en: "locate", es: "localizar" },
        { en: "locomotive", es: "locomotora" },
      ],
    },
  },
  {
    id: "man",
    root: "man",
    idea: 'la idea de "mano"',
    families: {
      verb: [
        { en: "manage", es: "gestionar / lograr", example: "She manages a large team.", affix: "-age" },
        { en: "manufacture", es: "fabricar", affix: "-ufacture" },
        { en: "manipulate", es: "manipular", affix: "-ipulate" },
      ],
      noun: [
        { en: "manager", es: "gerente", affix: "-ager" },
        { en: "management", es: "gestión", affix: "-agement" },
        { en: "manual", es: "manual", affix: "-ual" },
        { en: "manuscript", es: "manuscrito", affix: "-uscript" },
      ],
      adjective: [
        { en: "manual", es: "manual", affix: "-ual" },
        { en: "manageable", es: "manejable", affix: "-ageable" },
      ],
      adverb: [
        { en: "manually", es: "manualmente", affix: "-ly" },
      ],
      negative: [
        { en: "unmanageable", es: "inmanejable", affix: "un-" },
      ],
      related: [
        { en: "manner", es: "manera" },
        { en: "maintain", es: "mantener" },
      ],
    },
  },
  {
    id: "sequ",
    root: "sequ",
    idea: 'la idea de "seguir"',
    families: {
      verb: [
        { en: "pursue", es: "perseguir / proseguir", affix: "pur-" },
        { en: "execute", es: "ejecutar", affix: "ex-" },
      ],
      noun: [
        { en: "sequence", es: "secuencia", affix: "-ence" },
        { en: "consequence", es: "consecuencia", affix: "con- + -ence" },
        { en: "sequel", es: "secuela / continuación", affix: "-el" },
      ],
      adjective: [
        { en: "subsequent", es: "posterior", affix: "sub- + -ent" },
        { en: "consecutive", es: "consecutivo", affix: "con- + -utive" },
      ],
      adverb: [
        { en: "subsequently", es: "posteriormente", affix: "-ly" },
        { en: "consequently", es: "en consecuencia", affix: "-ly" },
      ],
      negative: [
        { en: "inconsequential", es: "intrascendente", affix: "in-" },
      ],
      related: [
        { en: "sequence", es: "secuencia" },
        { en: "second", es: "segundo" },
      ],
    },
  },
  {
    id: "cur",
    root: "cur",
    idea: 'la idea de "correr / fluir"',
    families: {
      verb: [
        { en: "occur", es: "ocurrir", affix: "oc-" },
        { en: "recur", es: "repetirse", affix: "re-" },
      ],
      noun: [
        { en: "current", es: "corriente", affix: "-ent" },
        { en: "currency", es: "moneda / divisa", affix: "-ency" },
        { en: "occurrence", es: "suceso", affix: "oc- + -ence" },
        { en: "curriculum", es: "plan de estudios", affix: "-iculum" },
      ],
      adjective: [
        { en: "current", es: "actual", affix: "-ent" },
        { en: "concurrent", es: "simultáneo", affix: "con- + -ent" },
      ],
      adverb: [
        { en: "currently", es: "actualmente", affix: "-ly" },
      ],
      negative: [
        { en: "non-recurring", es: "no recurrente", affix: "non-" },
      ],
      related: [
        { en: "course", es: "curso" },
        { en: "excursion", es: "excursión" },
      ],
    },
  },
  {
    id: "sol",
    root: "sol",
    idea: 'la idea de "solo / resolver"',
    families: {
      verb: [
        { en: "solve", es: "resolver", example: "She solved the problem quickly." },
        { en: "resolve", es: "resolver / decidir", affix: "re-" },
        { en: "dissolve", es: "disolver", affix: "dis-" },
      ],
      noun: [
        { en: "solution", es: "solución", affix: "-ution" },
        { en: "resolution", es: "resolución", affix: "re- + -ution" },
        { en: "solitude", es: "soledad", affix: "-itude" },
      ],
      adjective: [
        { en: "solid", es: "sólido", affix: "-id" },
        { en: "soluble", es: "soluble", affix: "-uble" },
      ],
      adverb: [
        { en: "solely", es: "únicamente", affix: "-ly" },
      ],
      negative: [
        { en: "unsolved", es: "sin resolver", affix: "un-" },
        { en: "insoluble", es: "insoluble", affix: "in-" },
      ],
      related: [
        { en: "solo", es: "solo" },
        { en: "solitary", es: "solitario" },
      ],
    },
  },
  {
    id: "vac",
    root: "vac",
    idea: 'la idea de "vacío"',
    families: {
      verb: [
        { en: "vacate", es: "desalojar", affix: "-ate" },
        { en: "evacuate", es: "evacuar", affix: "e-" },
      ],
      noun: [
        { en: "vacancy", es: "vacante", affix: "-ancy" },
        { en: "vacation", es: "vacaciones", affix: "-ation" },
        { en: "vacuum", es: "vacío", affix: "-uum" },
        { en: "evacuation", es: "evacuación", affix: "e- + -ation" },
      ],
      adjective: [
        { en: "vacant", es: "vacante / libre", affix: "-ant" },
        { en: "vacuous", es: "vacuo / vacío", affix: "-uous" },
      ],
      adverb: [
        { en: "vacantly", es: "con la mirada perdida", affix: "-ly" },
      ],
      negative: [
        { en: "non-vacant", es: "ocupado", affix: "non-" },
      ],
      related: [
        { en: "void", es: "vacío / nulo" },
        { en: "avoid", es: "evitar" },
      ],
    },
  },
  {
    id: "test",
    root: "test",
    idea: 'la idea de "atestiguar / probar"',
    families: {
      verb: [
        { en: "test", es: "probar / examinar", example: "They tested the new system." },
        { en: "protest", es: "protestar", affix: "pro-" },
        { en: "contest", es: "impugnar / competir", affix: "con-" },
      ],
      noun: [
        { en: "testimony", es: "testimonio", affix: "-imony" },
        { en: "protest", es: "protesta", affix: "pro-" },
        { en: "contest", es: "concurso", affix: "con-" },
        { en: "testament", es: "testamento", affix: "-ament" },
      ],
      adjective: [
        { en: "testable", es: "comprobable", affix: "-able" },
      ],
      adverb: [
        { en: "ostensibly", es: "aparentemente" },
      ],
      negative: [
        { en: "untested", es: "no probado", affix: "un-" },
      ],
      related: [
        { en: "testify", es: "testificar" },
        { en: "detest", es: "detestar" },
      ],
    },
  },
  {
    id: "nov",
    root: "nov",
    idea: 'la idea de "nuevo"',
    families: {
      verb: [
        { en: "renovate", es: "renovar", affix: "re- + -ate" },
        { en: "innovate", es: "innovar", affix: "in- + -ate" },
      ],
      noun: [
        { en: "novelty", es: "novedad", affix: "-elty" },
        { en: "innovation", es: "innovación", affix: "in- + -ation" },
        { en: "renovation", es: "renovación", affix: "re- + -ation" },
        { en: "novice", es: "principiante", affix: "-ice" },
      ],
      adjective: [
        { en: "novel", es: "novedoso", affix: "-el" },
        { en: "innovative", es: "innovador", affix: "in- + -ative" },
      ],
      adverb: [
        { en: "innovatively", es: "de forma innovadora", affix: "-ly" },
      ],
      negative: [
        { en: "uninnovative", es: "poco innovador", affix: "un-" },
      ],
      related: [
        { en: "novel", es: "novela" },
        { en: "renew", es: "renovar" },
      ],
    },
  },
];

// ─── Pure helpers ────────────────────────────────────────────────────

export function getRoot(id) {
  return WORD_ROOTS.find((r) => r.id === id) || null;
}

// Count total derived words across all categories of a root (for meta).
export function familySize(root) {
  if (!root || !root.families) return 0;
  return Object.values(root.families).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );
}

// Return the categories of a root that actually have entries, in the
// canonical WB_CATEGORIES order, as [{key, label, words}].
export function familyByCategory(root) {
  if (!root || !root.families) return [];
  return WB_CATEGORIES
    .map((c) => ({ key: c.key, label: c.label, words: root.families[c.key] || [] }))
    .filter((c) => c.words.length > 0);
}

// ─── Categorize game ─────────────────────────────────────────────────
//
// The Categorize game asks "is this a noun / verb / adjective / adverb?".
// Only those four categories have a single clean part of speech, so we
// build the question pool from verb/noun/adjective/adverb entries across
// all roots (skipping negatives and related, which don't map cleanly).
// Each item: { en, es, type, root }.

export const WB_GAME_TYPES = ["verb", "noun", "adjective", "adverb"];

export function getCategorizePool() {
  const pool = [];
  for (const r of WORD_ROOTS) {
    for (const type of WB_GAME_TYPES) {
      const words = r.families[type] || [];
      for (const w of words) {
        pool.push({ en: w.en, es: w.es, type, root: r.root });
      }
    }
  }
  return pool;
}

// Deterministic-ish shuffle (Fisher–Yates) for building a quiz round.
// Pass a slice size to get N random questions.
export function buildCategorizeRound(size = 10, rng = Math.random) {
  const pool = getCategorizePool();
  const arr = pool.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(size, arr.length));
}

// ─── Discover game ───────────────────────────────────────────────────
//
// Show a root and a grid of words: some are real members of that root's
// family, others are decoys from OTHER roots. The player taps the ones
// that belong. A round picks one root, N of its real derivatives, and M
// decoys, all shuffled.
//
// Returns { root, idea, items: [{ en, belongs }] }.

// All derived words of a root, flattened to {en} (across every category).
function allWordsOfRoot(root) {
  const out = [];
  if (!root || !root.families) return out;
  for (const arr of Object.values(root.families)) {
    if (Array.isArray(arr)) for (const w of arr) out.push(w.en);
  }
  // de-dupe (some words appear in both their category and "related")
  return Array.from(new Set(out));
}

export function buildDiscoverRound(realCount = 5, decoyCount = 4, rng = Math.random) {
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const shuffle = (a) => {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const target = pick(WORD_ROOTS);
  const reals = shuffle(allWordsOfRoot(target)).slice(0, realCount);

  // Decoys: words from other roots that aren't in the target family.
  const realSet = new Set(reals.map((w) => w.toLowerCase()));
  const decoyPool = [];
  for (const r of WORD_ROOTS) {
    if (r.id === target.id) continue;
    for (const w of allWordsOfRoot(r)) {
      if (!realSet.has(w.toLowerCase())) decoyPool.push(w);
    }
  }
  const decoys = shuffle(Array.from(new Set(decoyPool))).slice(0, decoyCount);

  const items = shuffle([
    ...reals.map((en) => ({ en, belongs: true })),
    ...decoys.map((en) => ({ en, belongs: false })),
  ]);

  return { root: target.root, idea: target.idea, rootId: target.id, items };
}

// ─── Build game ──────────────────────────────────────────────────────
//
// Show the target word's meaning + which root it comes from, and ask the
// player to pick the affix that builds it. We use words that carry an
// `affix` field; the correct answer is that affix, and distractors are
// other affixes seen across the data.
//
// Returns rounds: [{ en, es, root, answer (affix), options (affix[]) }].

// Collect every distinct affix used anywhere (for distractors).
function allAffixes() {
  const set = new Set();
  for (const r of WORD_ROOTS) {
    for (const arr of Object.values(r.families)) {
      for (const w of arr) {
        if (w.affix) set.add(w.affix);
      }
    }
  }
  return Array.from(set);
}

// Words that have a single, simple affix (no "+" combos) make the
// clearest Build questions.
function buildableWords() {
  const out = [];
  for (const r of WORD_ROOTS) {
    for (const arr of Object.values(r.families)) {
      for (const w of arr) {
        if (w.affix && !w.affix.includes("+")) {
          out.push({ en: w.en, es: w.es, root: r.root, affix: w.affix });
        }
      }
    }
  }
  return out;
}

export function buildBuildRound(size = 10, rng = Math.random) {
  const shuffle = (a) => {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const words = shuffle(buildableWords()).slice(0, size);
  const affixPool = allAffixes();

  return words.map((w) => {
    // 3 distractor affixes different from the answer.
    const others = shuffle(affixPool.filter((a) => a !== w.affix)).slice(0, 3);
    const options = shuffle([w.affix, ...others]);
    return { en: w.en, es: w.es, root: w.root, answer: w.affix, options };
  });
}

// ─── Context game ────────────────────────────────────────────────────
//
// Fill-in-the-gap from real example sentences. We take words that have
// an `example` sentence containing that word, blank the word out, and
// offer it among 3 distractors drawn from the SAME root's family (so the
// choice is "which form fits?" — exactly the exam skill).
//
// Returns rounds: [{ sentence (with "___"), answer, options[], es, root }].

function wordEntriesWithExamples() {
  const out = [];
  for (const r of WORD_ROOTS) {
    for (const arr of Object.values(r.families)) {
      for (const w of arr) {
        if (w.example && w.example.toLowerCase().includes(w.en.toLowerCase())) {
          out.push({ en: w.en, es: w.es, example: w.example, rootId: r.id, root: r.root });
        }
      }
    }
  }
  return out;
}

// Make a gap by replacing the occurrence of the word — including common
// inflected forms (create→created/creates/creating) — with "___".
// Returns { sentence, shown } where `shown` is the exact surface form
// that was blanked (so the answer can match what's really in the text).
function gapSentence(sentence, word) {
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match the base word plus an optional common inflection suffix.
  const re = new RegExp(`\\b(${esc}(?:s|es|ed|d|ing|ied)?)\\b`, "i");
  const m = sentence.match(re);
  if (!m) return { sentence: sentence, shown: word };
  const shown = m[1];
  return { sentence: sentence.replace(shown, "___"), shown };
}

export function buildContextRound(size = 8, rng = Math.random) {
  const shuffle = (a) => {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const pool = shuffle(wordEntriesWithExamples()).slice(0, size);

  return pool.map((w) => {
    const root = WORD_ROOTS.find((r) => r.id === w.rootId);
    const { sentence, shown } = gapSentence(w.example, w.en);
    // distractors: other words from the same root (base forms)
    const family = [];
    for (const arr of Object.values(root.families)) {
      for (const x of arr) {
        if (x.en.toLowerCase() !== shown.toLowerCase() &&
            x.en.toLowerCase() !== w.en.toLowerCase()) {
          family.push(x.en);
        }
      }
    }
    const distractors = shuffle(Array.from(new Set(family))).slice(0, 3);
    const options = shuffle([shown, ...distractors]);
    return {
      sentence,
      answer: shown,
      options,
      es: w.es,
      root: w.root,
    };
  });
}

// ─── Best-score persistence ──────────────────────────────────────────
//
// One localStorage key holds best scores for all Word Building games:
//   { [gameId]: { best, total, updatedAt } }
// "best" is the highest number correct in a single round; "total" is the
// round length that best was achieved on (so we can show "8/10").

export const WB_SCORES_KEY = "iye:wb:scores";

export function getBestScore(gameId) {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(WB_SCORES_KEY);
    const all = raw ? JSON.parse(raw) : {};
    return all && all[gameId] ? all[gameId] : null;
  } catch {
    return null;
  }
}

// Record a finished round. Returns { best, total, isRecord } where
// isRecord is true if this round beat (or set) the stored best.
export function recordScore(gameId, score, total) {
  const prev = getBestScore(gameId);
  // Compare by ratio so rounds of different lengths compare fairly.
  const prevRatio = prev && prev.total ? prev.best / prev.total : -1;
  const thisRatio = total ? score / total : 0;
  const isRecord = thisRatio > prevRatio;

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const raw = window.localStorage.getItem(WB_SCORES_KEY);
      const all = raw ? JSON.parse(raw) : {};
      if (isRecord) {
        all[gameId] = { best: score, total, updatedAt: Date.now() };
        window.localStorage.setItem(WB_SCORES_KEY, JSON.stringify(all));
      }
    } catch {
      /* ignore */
    }
  }
  const best = isRecord ? { best: score, total } : prev;
  return { best, isRecord };
}
