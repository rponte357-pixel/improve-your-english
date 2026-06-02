// ─── Tutor route logic ──────────────────────────────────────────────
// The "brain" of the tutor. Given (level, goal, time), it returns a
// personalised study path: an ordered list of steps that point at the
// tools the app already has. Built modularly so adding a new tool/topic
// later (e.g. make/do, mixed conditionals…) means adding a step object
// to TOOLS and slotting it into the relevant routes — no rewrites.
//
// Levels: a1, a2, b1b2, c1, unsure
// Goals:  exam_c1, conversation, base, vocabulary
// Time:   t10, t20, t45

export const LEVELS = [
  { id: "a1",     label: "Empiezo de cero", hint: "A1" },
  { id: "a2",     label: "Sé lo básico",     hint: "A2" },
  { id: "b1b2",   label: "Intermedio",       hint: "B1-B2" },
  { id: "c1",     label: "Avanzado",         hint: "C1+" },
  { id: "unsure", label: "No estoy seguro",  hint: null, soft: true },
];

export const GOALS = [
  { id: "exam_c1",     label: "Aprobar el examen C1" },
  { id: "conversation", label: "Conversación y fluidez" },
  { id: "base",         label: "Base general desde cero" },
  { id: "vocabulary",   label: "Vocabulario y comprensión" },
];

export const TIMES = [
  { id: "t10", label: "10 minutos",  dose: "una cosa al día" },
  { id: "t20", label: "20–30 minutos", dose: "dos cosas al día" },
  { id: "t45", label: "45 min o más",  dose: "sesión completa" },
];

// ── The tool catalogue (modular pieces) ──
// Each tool has an id, a short label, an icon, the route in the app, and
// a default tip. Add new tools here without touching the routes below.
const TOOLS = {
  vocab:        { id: "vocab",       label: "Vocabulary",      icon: "📚", route: "/vocabulary",    accent: "#EC4899" },
  foundations:  { id: "foundations", label: "Foundations (A1-A2)", icon: "🌱", route: "/vocabulary", accent: "#E76F89" },
  foundationsGrammar: { id: "foundationsGrammar", label: "Foundations Grammar", icon: "📐", route: "/grammar/foundations", accent: "#EA580C" },
  usefulExpr:   { id: "usefulExpr",  label: "Useful Expressions", icon: "💬", route: "/useful-expressions", accent: "#EA580C" },
  reading:      { id: "reading",     label: "Reading Room",    icon: "📖", route: "/reading",       accent: "#14B8A6" },
  wordBuild:    { id: "wordBuild",   label: "Word Building",   icon: "🧩", route: "/word-building", accent: "#A855F7" },
  phrases:      { id: "phrases",     label: "Phrases",         icon: "💬", route: "/phrases",       accent: "#F97316" },
  pron:         { id: "pron",        label: "Pronunciation",   icon: "🔊", route: "/pronunciation", accent: "#3B82F6" },
  grammar:      { id: "grammar",     label: "Grammar",         icon: "📐", route: "/grammar",       accent: "#84CC16" },
  guiaC1:       { id: "guiaC1",      label: "Guía C1",         icon: "🎯", route: "/guia-c1",       accent: "#EAB308" },
  games:        { id: "games",       label: "Games",           icon: "🎮", route: "/games",         accent: "#06B6D4" },
};

// Helper to build a step (a line in the route) from a tool + custom tip.
function step(toolId, tip) {
  const t = TOOLS[toolId];
  return { ...t, tip };
}

// ── The routes ─────────────────────────────────────────────────────
// Indexed by level → goal. Each entry returns an array of steps in
// order. The time dose (how much per day) is appended separately.

const ROUTES = {
  // A1 — material is limited; we're honest and give a sensible starting path.
  a1: {
    _default: [
      step("foundations", "Empieza por los 8 temas básicos: Identity, Daily Life, Home, Free Time, Food, Nature, Past, Future. Nivel A1."),
      step("foundationsGrammar", "La gramática esencial A1: el verbo to be, presente, pronombres, posesivos, plurales."),
      step("usefulExpr",  "Aprende fórmulas comunicativas A1 para presentarte, saludar, pedir cosas, contar tu día."),
      step("pron",        "Los sonidos clave del inglés desde el principio."),
      step("reading",     "Cuando te sientas con base, prueba textos muy fáciles."),
    ],
  },

  a2: {
    exam_c1: [
      step("foundations", "Consolida el vocabulario A2 — los 8 temas fundacionales."),
      step("foundationsGrammar", "Asienta la gramática A2: pasados, futuros, comparativos, modales, condicionales, present perfect."),
      step("usefulExpr",  "Domina las 12 funciones comunicativas A2 — clave para fluidez."),
      step("wordBuild",   "Cuando consolides A2, empieza con la teoría (Concepts)."),
      step("reading",     "Lecturas sencillas para acostumbrar el ojo."),
      step("guiaC1",      "El examen C1 está lejos — primero llega a B1. La Guía C1 te espera más adelante."),
    ],
    conversation: [
      step("foundations", "Vocabulario A2 en los 8 temas fundacionales."),
      step("usefulExpr",  "Fórmulas comunicativas A2 — frases listas para usar al conversar."),
      step("pron",        "Trabaja sonidos y ritmo."),
      step("reading",     "Lecturas cortas para incorporar expresiones."),
    ],
    base: [
      step("foundations", "Los 8 temas fundacionales — A1 y A2."),
      step("foundationsGrammar", "Gramática fundamental: de cero hasta primer condicional y present perfect."),
      step("usefulExpr",  "Las 12 funciones comunicativas básicas."),
      step("pron",        "Pronunciación desde el principio."),
      step("wordBuild",   "Introducción a familias de palabras (Concepts)."),
    ],
    vocabulary: [
      step("foundations", "Vocabulario A2 intensivo por temas."),
      step("usefulExpr",  "Frases hechas A2 — directas al uso."),
      step("reading",     "Reading Room con textos sencillos."),
    ],
  },

  b1b2: {
    exam_c1: [
      step("guiaC1",    "Empieza por Writing (la destreza con más estructura), luego Speaking."),
      step("vocab",     "Vocabulary temático para ganar precisión."),
      step("wordBuild", "Las 48 raíces — clave para deducir palabras nuevas en el examen."),
      step("reading",   "Reading Room para acostumbrar el cerebro a textos densos."),
      step("games",     "Connector Combat e Inversions — repaso jugando."),
    ],
    conversation: [
      step("vocab",   "Vocabulary temático para ampliar registro."),
      step("phrases", "Frases idiomáticas y colocaciones."),
      step("pron",    "Pronunciación: ritmo y entonación."),
      step("reading", "Reading Room para incorporar formas naturales."),
      step("guiaC1",  "Aunque no vayas al examen, la sección Speaking de la Guía C1 sirve mucho."),
    ],
    base: [
      step("vocab",     "Vocabulary temático."),
      step("wordBuild", "Word Building para crecer en profundidad."),
      step("reading",   "Reading Room regular."),
      step("games",     "Games para fijar lo aprendido."),
    ],
    vocabulary: [
      step("wordBuild", "Las 48 raíces — para que cada raíz desbloquee decenas de palabras."),
      step("reading",   "Reading Room intensivo."),
      step("vocab",     "Vocabulary temático complementario."),
    ],
  },

  c1: {
    exam_c1: [
      step("guiaC1",     "Guía C1 a fondo — todas las destrezas."),
      step("wordBuild",  "Word Building completo — afinar matices."),
      step("usefulExpr", "Advanced Phrases — registro formal, hedging, idiomatismo: clave para Speaking y Writing C1."),
      step("games",      "Connector Combat: registro formal en escrito."),
      step("reading",    "Reading Room con textos exigentes."),
    ],
    _default: [
      step("wordBuild",  "Word Building avanzado — matices y registro."),
      step("usefulExpr", "Advanced Phrases — elegancia conversacional y argumentativa."),
      step("reading",    "Reading Room con textos exigentes."),
      step("games",      "Games — registro, conectores, inversiones."),
      step("pron",       "Pronunciation para perfeccionar."),
    ],
  },

  // "No estoy seguro" → sugiere B1-B2 como base segura.
  unsure: {
    _default: [
      step("vocab",     "Empieza por vocabulario temático — es la base más versátil."),
      step("wordBuild", "Word Building te dirá rápido si estás cómoda con familias de palabras."),
      step("reading",   "Reading Room te ayudará a calibrar tu nivel real."),
    ],
  },
};

// ── Public API ──
export function buildPath({ level, goal, time }) {
  const byLevel = ROUTES[level] || ROUTES.unsure;
  const steps = byLevel[goal] || byLevel._default || ROUTES.unsure._default;
  const t = TIMES.find((x) => x.id === time) || TIMES[1];
  const lvlLabel = (LEVELS.find((x) => x.id === level) || {}).hint;
  const goalLabel = (GOALS.find((x) => x.id === goal) || {}).label;

  // A friendly intro line for the result screen.
  const introLevel = level === "unsure"
    ? "Empezaremos con una base segura"
    : `Para tu nivel ${lvlLabel || ""}`;
  const introGoal = goal ? `, enfocado en ${goalLabel.toLowerCase()}` : "";
  const intro = `${introLevel}${introGoal}. ${t.dose.charAt(0).toUpperCase() + t.dose.slice(1)}.`;

  return { steps, intro, levelLabel: lvlLabel, goalLabel, timeLabel: t.label, timeDose: t.dose };
}

// ── Persistence ──
// Remember the user's answers (and whether they've seen the onboarding).
export const TUTOR_STATE_KEY = "iye:tutor:state";

export function getTutorState() {
  try {
    const raw = window.localStorage.getItem(TUTOR_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveTutorState(state) {
  try {
    window.localStorage.setItem(TUTOR_STATE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function hasSeenOnboarding() {
  const s = getTutorState();
  return !!(s && s.seen);
}
