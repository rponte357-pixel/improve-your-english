// Reading Room — library of public-domain texts with curated glossaries.
//
// Why curated glossaries (not a live dictionary API):
//   Looking up arbitrary words EN→ES reliably needs an external
//   translation API (cost, rate limits, offline failure). For the
//   initial Reading Room we instead ship a hand-picked glossary per
//   text: ~15-25 of the trickier words, each with a Spanish gloss and
//   part of speech. Tapping a glossary word shows its meaning and lets
//   the reader save it to a personal list. Tapping a non-glossary word
//   shows a gentle "not in glossary yet" note. This is fully offline,
//   predictable, and good enough for example texts. A live API can be
//   added later without changing the reader UI.
//
// All texts here are PUBLIC DOMAIN:
//   • Aesop's Fables — ancient, translations long out of copyright.
//   • The Gift of the Magi — O. Henry (d. 1910), public domain.
//   • The Tell-Tale Heart — Edgar Allan Poe (d. 1849), public domain.
//
// Text shape:
//   {
//     id, title, author, kind, level ("B1"|"B2"|"C1"|"C2"),
//     estMinutes, wordCount,
//     paragraphs: [ "….", "….", … ],   // plain text, one per paragraph
//     glossary: { "word": { es, pos }, … }  // keys lowercased
//   }
//
// The reader tokenises each paragraph and matches lowercased words
// against the glossary keys (stripping surrounding punctuation).

export const READING_LEVELS = ["B1", "B2", "C1", "C2"];

// localStorage keys for Reading Room state (kept separate from vocab).
export const READING_PROGRESS_KEY = "iye:reading:progress"; // { [textId]: {pct, lastParagraph, updatedAt} }
export const READING_STREAK_KEY   = "iye:reading:streak";   // { count, lastReadDate }
export const READING_SAVED_KEY    = "iye:reading:saved";    // count of words saved from reading

export const READING_TEXTS = [
  {
    id: "aesop-selection",
    title: "Aesop's Fables (selection)",
    author: "Aesop",
    kind: "fables",
    level: "B1",
    estMinutes: 5,
    wordCount: 1200,
    paragraphs: [
      "The Hare and the Tortoise. A Hare was making fun of the Tortoise one day for being so slow. \"Do you ever get anywhere?\" he asked with a mocking laugh. \"Yes,\" replied the Tortoise, \"and I get there sooner than you think. I will run you a race and prove it.\"",
      "The Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he agreed. So the Fox, who had consented to act as judge, marked the distance and started the runners off.",
      "The Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up.",
      "The Tortoise meanwhile kept going slowly but steadily, and, after a time, passed the place where the Hare was sleeping. But the Hare slept on very peacefully; and when at last he did wake up, the Tortoise was near the goal. The Hare now ran his swiftest, but he could not overtake the Tortoise in time.",
      "The moral of the story: slow and steady wins the race.",
    ],
    glossary: {
      "hare":      { es: "liebre", pos: "noun" },
      "tortoise":  { es: "tortuga", pos: "noun" },
      "mocking":   { es: "burlón / de burla", pos: "adjective" },
      "race":      { es: "carrera", pos: "noun" },
      "amused":    { es: "divertido / entretenido", pos: "adjective" },
      "consented": { es: "accedió / consintió", pos: "verb" },
      "judge":     { es: "juez", pos: "noun" },
      "ridiculous":{ es: "ridículo", pos: "adjective" },
      "nap":       { es: "siesta", pos: "noun" },
      "steadily":  { es: "de forma constante", pos: "adverb" },
      "goal":      { es: "meta", pos: "noun" },
      "swiftest":  { es: "lo más rápido", pos: "adjective" },
      "overtake":  { es: "adelantar / alcanzar", pos: "verb" },
      "moral":     { es: "moraleja", pos: "noun" },
      "steady":    { es: "constante / firme", pos: "adjective" },
    },
  },

  {
    id: "gift-of-the-magi",
    title: "The Gift of the Magi",
    author: "O. Henry",
    kind: "short story",
    level: "B2",
    estMinutes: 8,
    wordCount: 2100,
    paragraphs: [
      "One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one's cheeks burned with the silent imputation of parsimony that such close dealing implied.",
      "Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas. There was clearly nothing to do but flop down on the shabby little couch and howl. So Della did it.",
      "While the mistress of the home is gradually subsiding from the first stage to the second, take a look at the home. A furnished flat at eight dollars per week. It did not exactly beggar description, but it certainly had that word on the lookout for the mendicancy squad.",
      "Della finished her cry and attended to her cheeks with the powder rag. She stood by the window and looked out dully at a grey cat walking a grey fence in a grey backyard. Tomorrow would be Christmas Day, and she had only one dollar and eighty-seven cents with which to buy a present for her husband.",
      "She had been saving every penny she could for months, with this result. Twenty dollars a week doesn't go far. Expenses had been greater than she had calculated. They always are. Only one dollar and eighty-seven cents to buy a present for her beloved.",
    ],
    glossary: {
      "pennies":     { es: "centavos", pos: "noun" },
      "bulldozing":  { es: "intimidando / presionando", pos: "verb" },
      "grocer":      { es: "tendero", pos: "noun" },
      "butcher":     { es: "carnicero", pos: "noun" },
      "cheeks":      { es: "mejillas", pos: "noun" },
      "imputation":  { es: "acusación / imputación", pos: "noun" },
      "parsimony":   { es: "tacañería / parsimonia", pos: "noun" },
      "implied":     { es: "implicaba / daba a entender", pos: "verb" },
      "flop":        { es: "dejarse caer", pos: "verb" },
      "shabby":      { es: "raído / cutre", pos: "adjective" },
      "couch":       { es: "sofá", pos: "noun" },
      "howl":        { es: "aullar / sollozar", pos: "verb" },
      "mistress":    { es: "señora (de la casa)", pos: "noun" },
      "subsiding":   { es: "calmándose / disminuyendo", pos: "verb" },
      "furnished":   { es: "amueblado", pos: "adjective" },
      "flat":        { es: "piso / apartamento", pos: "noun" },
      "beggar":      { es: "mendigo / desafiar (description)", pos: "noun" },
      "mendicancy":  { es: "mendicidad", pos: "noun" },
      "dully":       { es: "sin ánimo / con apatía", pos: "adverb" },
      "fence":       { es: "valla", pos: "noun" },
      "beloved":     { es: "amado / querido", pos: "noun" },
    },
  },

  {
    id: "tell-tale-heart",
    title: "The Tell-Tale Heart",
    author: "Edgar Allan Poe",
    kind: "short story",
    level: "C1",
    estMinutes: 11,
    wordCount: 2900,
    paragraphs: [
      "True! nervous, very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses, not destroyed, not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad?",
      "It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man. He had never wronged me. He had never given me insult. For his gold I had no desire. I think it was his eye!",
      "Now this is the point. You fancy me mad. Madmen know nothing. But you should have seen me. You should have seen how wisely I proceeded, with what caution, with what foresight, with what dissimulation I went to work!",
      "I was never kinder to the old man than during the whole week before I killed him. And every night, about midnight, I turned the latch of his door and opened it, oh so gently! And then, when I had made an opening sufficient for my head, I put in a dark lantern, all closed, so that no light shone out.",
    ],
    glossary: {
      "dreadfully":   { es: "terriblemente", pos: "adverb" },
      "mad":          { es: "loco", pos: "adjective" },
      "disease":      { es: "enfermedad", pos: "noun" },
      "sharpened":    { es: "agudizó / afiló", pos: "verb" },
      "senses":       { es: "sentidos", pos: "noun" },
      "dulled":       { es: "embotó / atenuó", pos: "verb" },
      "acute":        { es: "agudo", pos: "adjective" },
      "conceived":    { es: "concebida", pos: "verb" },
      "haunted":      { es: "atormentaba / perseguía", pos: "verb" },
      "wronged":      { es: "agravió / hizo daño", pos: "verb" },
      "insult":       { es: "insulto", pos: "noun" },
      "fancy":        { es: "imaginar / creer", pos: "verb" },
      "wisely":       { es: "sabiamente", pos: "adverb" },
      "caution":      { es: "cautela", pos: "noun" },
      "foresight":    { es: "previsión", pos: "noun" },
      "dissimulation":{ es: "disimulo", pos: "noun" },
      "latch":        { es: "pestillo", pos: "noun" },
      "gently":       { es: "suavemente", pos: "adverb" },
      "lantern":      { es: "linterna / farol", pos: "noun" },
      "shone":        { es: "brillaba", pos: "verb" },
    },
  },

  {
    id: "ant-and-grasshopper",
    title: "The Ant and the Grasshopper",
    author: "Aesop",
    kind: "fable",
    level: "B1",
    estMinutes: 4,
    wordCount: 900,
    paragraphs: [
      "In a field one summer's day a Grasshopper was hopping about, chirping and singing to its heart's content. An Ant passed by, bearing along with great effort an ear of corn he was taking to the nest.",
      "\"Why not come and chat with me,\" said the Grasshopper, \"instead of toiling and moiling in that way?\" \"I am helping to lay up food for the winter,\" said the Ant, \"and recommend you to do the same.\"",
      "\"Why bother about winter?\" said the Grasshopper; \"we have got plenty of food at present.\" But the Ant went on its way and continued its toil.",
      "When the winter came the Grasshopper had no food, and found itself dying of hunger, while it saw the ants distributing every day corn and grain from the stores they had collected in the summer.",
      "Then the Grasshopper knew it is best to prepare for the days of need.",
    ],
    glossary: {
      "grasshopper": { es: "saltamontes", pos: "noun" },
      "hopping":     { es: "saltando", pos: "verb" },
      "chirping":    { es: "cantando (insectos)", pos: "verb" },
      "ant":         { es: "hormiga", pos: "noun" },
      "bearing":     { es: "cargando / llevando", pos: "verb" },
      "effort":      { es: "esfuerzo", pos: "noun" },
      "ear":         { es: "espiga (de maíz)", pos: "noun" },
      "nest":        { es: "nido / hormiguero", pos: "noun" },
      "toiling":     { es: "trabajando duro", pos: "verb" },
      "moiling":     { es: "afanándose", pos: "verb" },
      "winter":      { es: "invierno", pos: "noun" },
      "bother":      { es: "molestarse / preocuparse", pos: "verb" },
      "plenty":      { es: "abundancia", pos: "noun" },
      "toil":        { es: "labor / faena", pos: "noun" },
      "hunger":      { es: "hambre", pos: "noun" },
      "grain":       { es: "grano", pos: "noun" },
      "stores":      { es: "reservas / provisiones", pos: "noun" },
      "need":        { es: "necesidad", pos: "noun" },
    },
  },

  {
    id: "story-of-an-hour",
    title: "The Story of an Hour",
    author: "Kate Chopin",
    kind: "short story",
    level: "B2",
    estMinutes: 7,
    wordCount: 1000,
    paragraphs: [
      "Knowing that Mrs. Mallard was afflicted with a heart trouble, great care was taken to break to her as gently as possible the news of her husband's death. It was her sister Josephine who told her, in broken sentences, veiled hints that revealed in half concealing.",
      "She did not hear the story as many women have heard the same, with a paralyzed inability to accept its significance. She wept at once, with sudden, wild abandonment, in her sister's arms. When the storm of grief had spent itself she went away to her room alone. She would have no one follow her.",
      "There stood, facing the open window, a comfortable, roomy armchair. Into this she sank, pressed down by a physical exhaustion that haunted her body and seemed to reach into her soul.",
      "She could see in the open square before her house the tops of trees that were all aquiver with the new spring life. The delicious breath of rain was in the air. She was young, with a fair, calm face, whose lines bespoke repression and even a certain strength.",
      "There was something coming to her and she was waiting for it, fearfully. What was it? She did not know; it was too subtle and elusive to name. But she felt it, creeping out of the sky, reaching toward her through the sounds, the scents, the colour that filled the air.",
    ],
    glossary: {
      "afflicted":   { es: "aquejada / afectada", pos: "verb" },
      "gently":      { es: "con delicadeza", pos: "adverb" },
      "veiled":      { es: "veladas / encubiertas", pos: "adjective" },
      "hints":       { es: "indirectas / pistas", pos: "noun" },
      "concealing":  { es: "ocultando", pos: "verb" },
      "paralyzed":   { es: "paralizada", pos: "adjective" },
      "wept":        { es: "lloró", pos: "verb" },
      "abandonment": { es: "desenfreno / abandono", pos: "noun" },
      "grief":       { es: "duelo / pena", pos: "noun" },
      "roomy":       { es: "amplio / espacioso", pos: "adjective" },
      "armchair":    { es: "sillón", pos: "noun" },
      "sank":        { es: "se hundió", pos: "verb" },
      "exhaustion":  { es: "agotamiento", pos: "noun" },
      "haunted":     { es: "atormentaba", pos: "verb" },
      "soul":        { es: "alma", pos: "noun" },
      "aquiver":     { es: "temblorosos", pos: "adjective" },
      "breath":      { es: "aliento / soplo", pos: "noun" },
      "bespoke":     { es: "revelaban / denotaban", pos: "verb" },
      "repression":  { es: "represión", pos: "noun" },
      "elusive":     { es: "esquivo / escurridizo", pos: "adjective" },
      "creeping":    { es: "deslizándose", pos: "verb" },
      "scents":      { es: "aromas", pos: "noun" },
    },
  },

  {
    id: "happy-prince",
    title: "The Happy Prince (opening)",
    author: "Oscar Wilde",
    kind: "short story",
    level: "C1",
    estMinutes: 9,
    wordCount: 1400,
    paragraphs: [
      "High above the city, on a tall column, stood the statue of the Happy Prince. He was gilded all over with thin leaves of fine gold, for eyes he had two bright sapphires, and a large red ruby glowed on his sword-hilt.",
      "He was very much admired indeed. \"He is as beautiful as a weathercock,\" remarked one of the Town Councillors who wished to gain a reputation for having artistic tastes; \"only not quite so useful,\" he added, fearing lest people should think him unpractical, which he really was not.",
      "\"Why can't you be like the Happy Prince?\" asked a sensible mother of her little boy who was crying for the moon. \"The Happy Prince never dreams of crying for anything.\" \"I am glad there is some one in the world who is quite happy,\" muttered a disappointed man as he gazed at the wonderful statue.",
      "One night there flew over the city a little Swallow. His friends had gone away to Egypt six weeks before, but he had stayed behind, for he was in love with the most beautiful Reed. He had met her early in the spring as he was flying down the river after a big yellow moth.",
      "All day long he flew, and at night-time he arrived at the city. \"Where shall I put up?\" he said; \"I hope the town has made preparations.\" Then he saw the statue on the tall column. \"I will put up there,\" he cried; \"it is a fine position, with plenty of fresh air.\"",
    ],
    glossary: {
      "column":      { es: "columna", pos: "noun" },
      "statue":      { es: "estatua", pos: "noun" },
      "gilded":      { es: "dorado / bañado en oro", pos: "verb" },
      "sapphires":   { es: "zafiros", pos: "noun" },
      "ruby":        { es: "rubí", pos: "noun" },
      "glowed":      { es: "resplandecía", pos: "verb" },
      "hilt":        { es: "empuñadura", pos: "noun" },
      "admired":     { es: "admirado", pos: "verb" },
      "weathercock": { es: "veleta", pos: "noun" },
      "councillors": { es: "concejales", pos: "noun" },
      "reputation":  { es: "reputación", pos: "noun" },
      "lest":        { es: "no sea que / para que no", pos: "conjunction" },
      "unpractical": { es: "poco práctico", pos: "adjective" },
      "sensible":    { es: "sensato / con sentido común", pos: "adjective" },
      "muttered":    { es: "murmuró", pos: "verb" },
      "disappointed":{ es: "decepcionado", pos: "adjective" },
      "gazed":       { es: "contempló", pos: "verb" },
      "swallow":     { es: "golondrina", pos: "noun" },
      "reed":        { es: "junco / caña", pos: "noun" },
      "moth":        { es: "polilla", pos: "noun" },
    },
  },

  {
    id: "heart-of-darkness",
    title: "Heart of Darkness (opening)",
    author: "Joseph Conrad",
    kind: "novella excerpt",
    level: "C2",
    estMinutes: 12,
    wordCount: 3200,
    paragraphs: [
      "The Nellie, a cruising yawl, swung to her anchor without a flutter of the sails, and was at rest. The flood had made, the wind was nearly calm, and being bound down the river, the only thing for it was to come to and wait for the turn of the tide.",
      "The sea-reach of the Thames stretched before us like the beginning of an interminable waterway. In the offing the sea and the sky were welded together without a joint, and in the luminous space the tanned sails of the barges seemed to stand still in red clusters of canvas sharply peaked, with gleams of varnished spirits.",
      "A haze rested on the low shores that ran out to sea in vanishing flatness. The air was dark above Gravesend, and farther back still seemed condensed into a mournful gloom, brooding motionless over the biggest, and the greatest, town on earth.",
      "The director of companies was our captain and our host. We four affectionately watched his back as he stood in the bows looking to seaward. On the whole river there was nothing that looked half so nautical. He resembled a pilot, which to a seaman is trustworthiness personified.",
      "Between us there was, as I have already said somewhere, the bond of the sea. Besides holding our hearts together through long periods of separation, it had the effect of making us tolerant of each other's yarns, and even convictions.",
    ],
    glossary: {
      "yawl":          { es: "balandro (tipo de velero)", pos: "noun" },
      "anchor":        { es: "ancla", pos: "noun" },
      "flutter":       { es: "aleteo / agitación", pos: "noun" },
      "flood":         { es: "marea creciente", pos: "noun" },
      "bound":         { es: "rumbo a / con destino a", pos: "adjective" },
      "tide":          { es: "marea", pos: "noun" },
      "interminable":  { es: "interminable", pos: "adjective" },
      "offing":        { es: "alta mar (a la vista)", pos: "noun" },
      "welded":        { es: "soldados / fundidos", pos: "verb" },
      "tanned":        { es: "curtidas / bronceadas", pos: "adjective" },
      "barges":        { es: "barcazas", pos: "noun" },
      "clusters":      { es: "racimos / grupos", pos: "noun" },
      "canvas":        { es: "lona", pos: "noun" },
      "varnished":     { es: "barnizado", pos: "adjective" },
      "haze":          { es: "neblina / bruma", pos: "noun" },
      "shores":        { es: "orillas / costas", pos: "noun" },
      "vanishing":     { es: "que se desvanece", pos: "adjective" },
      "mournful":      { es: "lúgubre / triste", pos: "adjective" },
      "gloom":         { es: "penumbra / tristeza", pos: "noun" },
      "brooding":      { es: "cerniéndose / meditabundo", pos: "verb" },
      "motionless":    { es: "inmóvil", pos: "adjective" },
      "bows":          { es: "proa", pos: "noun" },
      "nautical":      { es: "náutico", pos: "adjective" },
      "resembled":     { es: "se parecía a", pos: "verb" },
      "trustworthiness": { es: "fiabilidad", pos: "noun" },
      "bond":          { es: "vínculo / lazo", pos: "noun" },
      "yarns":         { es: "relatos / batallitas", pos: "noun" },
      "convictions":   { es: "convicciones", pos: "noun" },
    },
  },
];

// ─── Pure helpers ────────────────────────────────────────────────────

// Strip surrounding punctuation and lowercase a token for glossary
// matching. Keeps internal apostrophes/hyphens (e.g. "tell-tale").
export function normalizeToken(raw) {
  if (raw == null) return "";
  return String(raw)
    .toLowerCase()
    .replace(/^[^a-zà-ÿ0-9]+/i, "")
    .replace(/[^a-zà-ÿ0-9]+$/i, "");
}

// Look up a token in a text's glossary. Returns {en, es, pos} or null.
export function lookupGlossary(text, rawToken) {
  if (!text || !text.glossary) return null;
  const key = normalizeToken(rawToken);
  if (!key) return null;
  const hit = text.glossary[key];
  if (!hit) return null;
  return { en: key, es: hit.es, pos: hit.pos || null };
}

// Get a text by id.
export function getReadingText(id) {
  return READING_TEXTS.find((t) => t.id === id) || null;
}

// Filter texts by level ("all" returns everything).
export function getTextsByLevel(level) {
  if (!level || level === "all") return READING_TEXTS.slice();
  return READING_TEXTS.filter((t) => t.level === level);
}

// Count how many glossary words a text has (for the card meta).
export function glossarySize(text) {
  return text && text.glossary ? Object.keys(text.glossary).length : 0;
}

// ─── Saving words to a personal list ─────────────────────────────────

// The list a saved reading word goes into by default.
export const READING_TARGET_LIST_NAME = "Reading Room words";

// Remembers the last list the user saved into, so the picker can
// pre-select it next time.
export const READING_LAST_LIST_KEY = "iye:reading:lastList";

const CUSTOM_LISTS_STORAGE_KEY = "iye:vocab:custom-lists";

function makeListIdLocal() {
  return "cl_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Save one word {en, es, pos?, example?} into a personal custom list.
// Mirrors saveStructuresToList in guiaC1.js: atomic read-modify-write to
// localStorage, find-or-create the target list, skip case-insensitive
// duplicates by `en`. Returns {ok, added, skipped, listName, error?}.
//
// `listName` lets the reader choose a destination; defaults to the
// Reading Room list.
export function saveWordToList(word, listName = READING_TARGET_LIST_NAME) {
  if (typeof window === "undefined" || !window.localStorage) {
    return { ok: false, error: "Storage unavailable", added: 0, skipped: 0 };
  }
  const en = (word && word.en ? String(word.en) : "").trim();
  if (!en) return { ok: false, error: "Nothing to save", added: 0, skipped: 0 };

  let lists;
  try {
    const raw = window.localStorage.getItem(CUSTOM_LISTS_STORAGE_KEY);
    lists = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(lists)) lists = [];
  } catch {
    lists = [];
  }

  const now = Date.now();
  let target = lists.find((l) => l && l.name === listName);
  if (!target) {
    target = { id: makeListIdLocal(), name: listName, createdAt: now, updatedAt: now, words: [] };
    lists.push(target);
  }
  if (!Array.isArray(target.words)) target.words = [];

  const dup = target.words.some(
    (w) => w && w.en && w.en.toLowerCase() === en.toLowerCase()
  );
  if (dup) {
    return { ok: true, added: 0, skipped: 1, listName, duplicate: true };
  }

  const entry = { en, es: word.es ? String(word.es).trim() : "" };
  if (word.pos) entry.partOfSpeech = String(word.pos);
  if (word.example) entry.example = String(word.example);
  target.words.push(entry);
  target.updatedAt = now;

  try {
    window.localStorage.setItem(CUSTOM_LISTS_STORAGE_KEY, JSON.stringify(lists));
  } catch {
    return { ok: false, error: "Could not save", added: 0, skipped: 0 };
  }
  return { ok: true, added: 1, skipped: 0, listName };
}

// Read the user's existing custom lists (id + name only) so the reader
// can offer them as save destinations.
export function getCustomListNames() {
  if (typeof window === "undefined" || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(CUSTOM_LISTS_STORAGE_KEY);
    const lists = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(lists)) return [];
    return lists
      .filter((l) => l && l.id && l.name)
      .map((l) => ({ id: l.id, name: l.name }));
  } catch {
    return [];
  }
}

// ─── Reading badges ──────────────────────────────────────────────────
//
// Badges are derived purely from existing reading data (finished texts,
// streak, words saved) — there's no separate "badge store" to keep in
// sync. computeBadges() reads the same localStorage keys the rest of the
// Reading Room uses and returns each badge with an `earned` flag.
//
// To detect "newly earned" badges (for the celebratory toast) we keep a
// small record of which badge ids were already awarded, in
// READING_BADGES_SEEN_KEY. getNewlyEarnedBadges() compares the current
// earned set against that record and updates it.

export const READING_BADGES_SEEN_KEY = "iye:reading:badgesSeen";

// Badge definitions. `test` receives a stats object and returns boolean.
export const READING_BADGES = [
  {
    id: "first-steps",
    icon: "🌱",
    name: "First Steps",
    desc: "Finish your first text",
    test: (s) => s.finishedCount >= 1,
  },
  {
    id: "bookworm",
    icon: "📚",
    name: "Bookworm",
    desc: "Finish 3 texts",
    test: (s) => s.finishedCount >= 3,
  },
  {
    id: "literary-master",
    icon: "🏆",
    name: "Literary Master",
    desc: "Finish 5 texts",
    test: (s) => s.finishedCount >= 5,
  },
  {
    id: "on-fire",
    icon: "🔥",
    name: "On Fire",
    desc: "Reach a 3-day reading streak",
    test: (s) => s.streak >= 3,
  },
  {
    id: "word-collector",
    icon: "💎",
    name: "Word Collector",
    desc: "Save 25 words from reading",
    test: (s) => s.wordsSaved >= 25,
  },
  {
    id: "level-up",
    icon: "🎓",
    name: "Level Up",
    desc: "Finish a text at every level (B1–C2)",
    test: (s) => READING_LEVELS.every((lvl) => s.finishedLevels.has(lvl)),
  },
];

// Gather the stats badges are based on, from localStorage.
export function getBadgeStats() {
  const empty = { finishedCount: 0, streak: 0, wordsSaved: 0, finishedLevels: new Set() };
  if (typeof window === "undefined" || !window.localStorage) return empty;

  let progress = {};
  try {
    const raw = window.localStorage.getItem(READING_PROGRESS_KEY);
    progress = raw ? JSON.parse(raw) : {};
    if (!progress || typeof progress !== "object") progress = {};
  } catch {
    progress = {};
  }

  const finishedIds = Object.keys(progress).filter(
    (id) => progress[id] && progress[id].pct >= 100
  );
  const finishedLevels = new Set();
  for (const id of finishedIds) {
    const t = getReadingText(id);
    if (t && t.level) finishedLevels.add(t.level);
  }

  let streak = 0;
  try {
    const raw = window.localStorage.getItem(READING_STREAK_KEY);
    const s = raw ? JSON.parse(raw) : null;
    streak = s && s.count ? s.count : 0;
  } catch { streak = 0; }

  let wordsSaved = 0;
  try {
    const raw = window.localStorage.getItem(READING_SAVED_KEY);
    wordsSaved = raw ? JSON.parse(raw) : 0;
    if (typeof wordsSaved !== "number") wordsSaved = 0;
  } catch { wordsSaved = 0; }

  return { finishedCount: finishedIds.length, streak, wordsSaved, finishedLevels };
}

// Return all badges with an `earned` flag, based on current stats.
export function computeBadges() {
  const stats = getBadgeStats();
  return READING_BADGES.map((b) => ({
    id: b.id,
    icon: b.icon,
    name: b.name,
    desc: b.desc,
    earned: !!b.test(stats),
  }));
}

// Compare currently-earned badges against the "seen" record. Returns
// the list of badges earned since last check (for the toast), and
// updates the seen record so each badge only celebrates once.
export function getNewlyEarnedBadges() {
  const earned = computeBadges().filter((b) => b.earned).map((b) => b.id);
  let seen = [];
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const raw = window.localStorage.getItem(READING_BADGES_SEEN_KEY);
      seen = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(seen)) seen = [];
    } catch { seen = []; }
  }
  const newIds = earned.filter((id) => !seen.includes(id));
  if (newIds.length && typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(READING_BADGES_SEEN_KEY, JSON.stringify(earned));
    } catch { /* ignore */ }
  }
  // Return full badge objects for the newly earned ids.
  return READING_BADGES.filter((b) => newIds.includes(b.id));
}
