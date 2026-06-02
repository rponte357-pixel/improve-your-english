// C1 exam preparation guide — content for the "Guía C1" bubble.
//
// Adapted from the user's own "Guía C1: Aprobado Seguro" study material.
// Seven exam-task sections, each with:
//   • tip   — a short coaching tip ("truco") in Spanish
//   • groups — one or more labelled groups of useful structures, each
//              structure being { en, es } (English phrase + Spanish gloss)
//
// The { en, es } shape deliberately matches the vocabulary word shape
// ({ en, es, example? }) so structures can be sent straight into the
// user's custom lists with no transformation.

export const GUIA_C1_TARGET_LIST_NAME = "C1 Guide structures";

export const GUIA_C1_SECTIONS = [
  {
    id: "essay",
    skill: "writing",
    label: "Essay",
    tip: "Structure: neutral intro → pros → cons → conclusion with your opinion. Always work in grammatical inversions.",
    groups: [
      {
        label: "Estructuras",
        items: [
          { en: "It is widely acknowledged that...", es: "Está ampliamente reconocido que..." },
          { en: "Not only is it a matter of... but it also involves...", es: "No solo es cuestión de... sino que también involucra..." },
          { en: "Be that as it may, we cannot ignore...", es: "Sea como fuere, no podemos ignorar..." },
          { en: "The benefits clearly outweigh the drawbacks.", es: "Los beneficios superan claramente a los inconvenientes." },
        ],
      },
    ],
  },
  {
    id: "complaint",
    skill: "writing",
    label: "Complaint",
    tip: "Put yourself in the manager's shoes. Be extremely polite and offer concrete solutions.",
    groups: [
      {
        label: "Estructuras",
        items: [
          { en: "I am writing to formally apologize for the subpar conditions...", es: "Le escribo para disculparme formalmente por las condiciones deficientes..." },
          { en: "It was with great concern that I learned about...", es: "Fue con gran preocupación que me enteré de..." },
          { en: "To rectify this situation, we are taking immediate action.", es: "Para rectificar esta situación, estamos tomando medidas inmediatas." },
          { en: "As a gesture of goodwill, we offer you a full refund.", es: "Como gesto de buena voluntad, le ofrecemos un reembolso completo." },
        ],
      },
    ],
  },
  {
    id: "report",
    skill: "writing",
    label: "Report",
    tip: "Use objective subheadings. This is the most formal text of all — no exclamations or emotional language.",
    groups: [
      {
        label: "Estructuras",
        items: [
          { en: "The purpose of this report is to outline...", es: "El propósito de este informe es describir..." },
          { en: "As a rule, the vast majority of respondents stated...", es: "Por norma general, la gran mayoría de encuestados afirmó..." },
          { en: "Accordingly, it is highly recommended that...", es: "En consecuencia, se recomienda encarecidamente que..." },
          { en: "Under no circumstances should we ignore these findings.", es: "Bajo ninguna circunstancia debemos ignorar estos hallazgos." },
        ],
      },
    ],
  },
  {
    id: "article",
    skill: "writing",
    label: "Article",
    tip: "A title is a must! Use a style that grabs the reader. Rhetorical questions and vivid language work well here.",
    groups: [
      {
        label: "Estructuras",
        items: [
          { en: "Have you ever wondered whether...?", es: "¿Te has preguntado alguna vez si...?" },
          { en: "Picture this: a world where...", es: "Imagina esto: un mundo donde..." },
          { en: "Food for thought: is it truly worth the risk?", es: "Algo en lo que pensar: ¿vale realmente la pena el riesgo?" },
          { en: "Against all odds, it turns out that...", es: "Contra todo pronóstico, resulta que..." },
        ],
      },
    ],
  },
  {
    id: "email",
    skill: "writing",
    label: "Email",
    tip: "Decide if it's for a boss (formal) or a friend (informal). Don't mix the two registers.",
    groups: [
      {
        label: "Formal",
        items: [
          { en: "I would be most grateful if you could provide...", es: "Le estaría muy agradecido si pudiera proporcionar..." },
          { en: "I look forward to hearing from you.", es: "Espero noticias suyas." },
        ],
      },
      {
        label: "Informal",
        items: [
          { en: "I'm just dropping you a line to...", es: "Solo te escribo unas líneas para..." },
          { en: "You won't believe what happened!", es: "¡No te creerás lo que pasó!" },
        ],
      },
    ],
  },
  {
    id: "mediation",
    skill: "writing",
    label: "Mediation",
    tip: "Summarise and adapt. For a graph, describe trends; for houses or plans, pick the best option for the reader.",
    groups: [
      {
        label: "Estructuras",
        items: [
          { en: "On the plus side, [Option A] offers...", es: "Por la parte positiva, la opción A ofrece..." },
          { en: "In contrast, a significant shift is visible in...", es: "Por el contrario, se ve un cambio significativo en..." },
          { en: "Broadly speaking, millennials are paying more for rent.", es: "A grandes rasgos, los millennials pagan más de alquiler." },
          { en: "Down the line, this could be a major setback.", es: "A la larga, esto podría ser un gran contratiempo." },
        ],
      },
    ],
  },
  {
    id: "monologue",
    skill: "speaking",
    label: "Monólogo",
    tip: "The Umbrella technique: split your monologue into three blocks (Social, Economic, Environmental). Whatever the topic, cover the social impact then the economic one and you'll sound like an expert — the examiner will see structure.",
    tricks: [
      {
        title: "🪞 Trick 1: The Umbrella",
        body: "Mentally split your monologue into three blocks: Social, Economic and Environmental/Technological. Whatever the topic (tourism, social media, fashion, work), your speech will sound organised and expert.",
      },
      {
        title: "🦖 Trick 4: Bury the basic words",
        body: "Banned words: good, bad, important, think, problem. Swap them: good → beneficial/advantageous · bad → detrimental/subpar · important → paramount/crucial · I think → from my standpoint · problem → obstacle/setback.",
      },
    ],
    groups: [
      {
        label: "Para empezar con fuerza",
        items: [
          { en: "To kick things off, I'd like to highlight that...", es: "Para empezar, me gustaría destacar que..." },
          { en: "This is a highly controversial issue that has sparked intense debate lately.", es: "Este es un tema muy controvertido que ha desatado un intenso debate últimamente." },
          { en: "When analyzing this, it is paramount to consider the underlying factors.", es: "Al analizar esto, es primordial considerar los factores subyacentes." },
        ],
      },
      {
        label: "Para ganar tiempo (Blank Mind)",
        items: [
          { en: "To put it another way...", es: "Dicho de otra manera..." },
          { en: "What I'm trying to get at is...", es: "A lo que intento llegar es a..." },
          { en: "That's a rather complex question, but from my standpoint...", es: "Esa es una pregunta bastante compleja, pero desde mi punto de vista..." },
        ],
      },
      {
        label: "Para concluir",
        items: [
          { en: "In a nutshell, what we are looking at is...", es: "En pocas palabras, a lo que nos enfrentamos es a..." },
          { en: "All things considered, it seems evident that...", es: "Teniendo todo en cuenta, parece evidente que..." },
        ],
      },
    ],
  },
  {
    id: "dialogue",
    skill: "speaking",
    label: "Diálogo",
    tip: "Ping-Pong: don't hog the floor or just say 'Yes, I agree'. The golden rule: throw out your idea + add a C1 linker + pass the ball to your partner. E.g. '...and that's why technology is paramount. Don't you think it's a double-edged sword?'",
    tricks: [
      {
        title: "🔄 Trick 2: Ping-Pong",
        body: "In the debate, the #1 mistake is hogging the floor or just saying 'Yes, I agree'. Throw out your idea + a C1 linker + pass the ball: '...Don't you think it's a double-edged sword, [name]?'",
      },
      {
        title: "🗣️ Trick 3: Intonation & body language",
        body: "C1 English is musical: avoid a flat, monotone delivery. Raise your pitch on the key words ('It is ABSOLUTELY paramount...'). Look at the examiners, smile and gesture. Confidence boosts your 'Fluency' mark.",
      },
    ],
    groups: [
      {
        label: "Para interactuar y rebatir",
        items: [
          { en: "I see where you're coming from, but we cannot ignore that...", es: "Entiendo por dónde vas, pero no podemos ignorar que..." },
          { en: "You've hit the nail on the head, though I'd also argue that...", es: "Has dado en el clavo, aunque yo también argumentaría que..." },
          { en: "I'm afraid I have to respectfully disagree with you on that point because...", es: "Me temo que tengo que discrepar respetuosamente contigo en ese punto porque..." },
        ],
      },
      {
        label: "Para pasar la pelota",
        items: [
          { en: "Don't you think it's a double-edged sword?", es: "¿No crees que es un arma de doble filo?" },
          { en: "What's your take on this?", es: "¿Cuál es tu opinión sobre esto?" },
        ],
      },
    ],
  },
];

// The four exam skills, in display order. Writing & Speaking have
// content; Listening & Reading are coming soon.
export const GUIA_C1_SKILLS = [
  { id: "writing",   label: "Writing",   icon: "✍️", available: true },
  { id: "speaking",  label: "Speaking",  icon: "🗣️", available: true },
  { id: "listening", label: "Listening", icon: "🎧", available: false },
  { id: "reading",   label: "Reading",   icon: "📖", available: false },
];

// Sections belonging to a given skill, in order.
export function getSectionsBySkill(skillId) {
  return GUIA_C1_SECTIONS.filter((s) => s.skill === skillId);
}

// Flat list of every structure, handy for "save all" or counting.
export function getAllStructures() {
  const out = [];
  for (const section of GUIA_C1_SECTIONS) {
    for (const group of section.groups) {
      for (const item of group.items) out.push(item);
    }
  }
  return out;
}

// ─── Saving structures into the user's custom lists ──────────────────
//
// Writes directly and atomically to localStorage (read → mutate → write
// once) rather than going through the useCustomLists hook. This mirrors
// the approach used by the Paste & import wizard and avoids a React
// stale-closure bug when creating a list and adding words in the same
// tick.
//
// All saved structures go into a single dedicated list named
// GUIA_C1_TARGET_LIST_NAME, created on first save. Returns a summary so
// the UI can show a toast: { ok, added, skipped, listId, listName }.

const CUSTOM_LISTS_STORAGE_KEY = "iye:vocab:custom-lists";

function makeListIdLocal() {
  // Mirror customLists.makeListId() format (cl_<timestamp>_<rand>).
  return `cl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function saveStructuresToList(structures) {
  if (typeof window === "undefined" || !window.localStorage) {
    return { ok: false, error: "Storage unavailable", added: 0, skipped: 0 };
  }
  const items = Array.isArray(structures) ? structures : [structures];
  if (items.length === 0) {
    return { ok: false, error: "Nothing to save", added: 0, skipped: 0 };
  }

  let lists;
  try {
    const raw = window.localStorage.getItem(CUSTOM_LISTS_STORAGE_KEY);
    lists = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(lists)) lists = [];
  } catch {
    lists = [];
  }

  // Find or create the target list.
  let target = lists.find((l) => l && l.name === GUIA_C1_TARGET_LIST_NAME);
  const now = Date.now();
  if (!target) {
    target = {
      id: makeListIdLocal(),
      name: GUIA_C1_TARGET_LIST_NAME,
      createdAt: now,
      updatedAt: now,
      words: [],
    };
    lists.push(target);
  }
  if (!Array.isArray(target.words)) target.words = [];

  // Add each structure, skipping case-insensitive duplicates by `en`.
  let added = 0, skipped = 0;
  for (const it of items) {
    const en = (it && it.en ? String(it.en) : "").trim();
    if (!en) { skipped++; continue; }
    const dup = target.words.some(
      (w) => w && w.en && w.en.toLowerCase() === en.toLowerCase()
    );
    if (dup) { skipped++; continue; }
    target.words.push({
      en,
      es: it.es ? String(it.es).trim() : "",
    });
    added++;
  }
  target.updatedAt = now;

  try {
    window.localStorage.setItem(CUSTOM_LISTS_STORAGE_KEY, JSON.stringify(lists));
  } catch (e) {
    return { ok: false, error: "Could not save", added: 0, skipped: 0 };
  }

  return {
    ok: true,
    added,
    skipped,
    listId: target.id,
    listName: target.name,
  };
}
