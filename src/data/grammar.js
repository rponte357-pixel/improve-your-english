// ─── Grammar — Foundations (A1/A2) ──────────────────────────────────
//
// Pedagogical structure for each unit:
//   { id, level, name, name_es, icon, color,
//     concept:     short Spanish paragraph
//     form:        rules table (afirmativa/negativa/interrogativa or similar)
//     uses:        when to use, with subcases
//     examples:    [{en, es, note?}]
//     warning:     common Spanish-speaker mistakes (gold!)
//     exercises:   [{type, ...}]
//   }
//
// Exercises engine: 4 types supported
//   • fill_blank   → "I ___ Spanish" with answer "am"
//   • transform    → "She works → ___"  (negative)
//   • multiple_choice → 1 question, 3-4 options
//   • word_order   → ["am", "I", "Spanish"] → "I am Spanish"
//
// This file holds the 3 pilot units of r91. The other 34 units will be
// added in later sessions (r92 + r93) once the pedagogical structure
// is validated.

// ─── Curriculum index (37 units total, A1 + A2) ─────────────────────
// This catalogue lists ALL planned units so the UI can show the full
// roadmap and grey out the ones that aren't programmed yet.

export const GRAMMAR_CURRICULUM = {
  A1: [
    { id: "to-be",                name: "Verb To Be",                  name_es: "El verbo To Be",                 icon: "🟰" },
    { id: "subject-pronouns",     name: "Subject Pronouns",            name_es: "Pronombres de sujeto",           icon: "👥" },
    { id: "possessive-adjectives", name: "Possessive Adjectives",      name_es: "Adjetivos posesivos",            icon: "🏷️" },
    { id: "articles",             name: "Articles",                    name_es: "Artículos",                      icon: "📰" },
    { id: "demonstratives",       name: "Demonstratives",              name_es: "Demostrativos",                  icon: "👉" },
    { id: "plural-nouns",         name: "Plural Nouns",                name_es: "Plurales",                       icon: "➕" },
    { id: "there-is-are",         name: "There is / There are",        name_es: "Hay (there is/are)",             icon: "📍" },
    { id: "have-got",             name: "Have Got",                    name_es: "Tener (have got)",               icon: "✋" },
    { id: "present-simple",       name: "Present Simple",              name_es: "Presente simple",                icon: "🔄" },
    { id: "adverbs-frequency",    name: "Adverbs of Frequency",        name_es: "Adverbios de frecuencia",        icon: "📊" },
    { id: "prep-time",            name: "Prepositions of Time",        name_es: "Preposiciones de tiempo",        icon: "🕐" },
    { id: "prep-place",           name: "Prepositions of Place",       name_es: "Preposiciones de lugar",         icon: "📌" },
    { id: "can",                  name: "Can / Can't",                 name_es: "Can / Can't",                    icon: "💪" },
    { id: "imperatives",          name: "Imperatives",                 name_es: "Imperativo",                     icon: "❗" },
    { id: "present-continuous",   name: "Present Continuous",          name_es: "Presente continuo",              icon: "▶️" },
    { id: "simple-vs-continuous", name: "Simple vs Continuous",        name_es: "Simple vs continuo",             icon: "⚖️" },
    { id: "question-words",       name: "Question Words",              name_es: "Palabras interrogativas",        icon: "❓" },
  ],
  A2: [
    { id: "past-simple-regular",  name: "Past Simple (Regular)",       name_es: "Pasado simple regular",          icon: "⏪" },
    { id: "past-simple-irregular", name: "Past Simple (Irregular)",    name_es: "Pasado simple irregular",        icon: "⏮️" },
    { id: "past-time-expressions", name: "Past Time Expressions",      name_es: "Expresiones de tiempo pasado",   icon: "📅" },
    { id: "past-continuous",      name: "Past Continuous",             name_es: "Pasado continuo",                icon: "⏯️" },
    { id: "past-simple-vs-continuous", name: "Past Simple vs Continuous", name_es: "Past Simple vs Continuous", icon: "🔀" },
    { id: "countable-uncountable", name: "Countable & Uncountable",    name_es: "Contables e incontables",        icon: "🧮" },
    { id: "quantifiers",          name: "Quantifiers",                 name_es: "Cuantificadores",                icon: "📦" },
    { id: "comparatives",         name: "Comparatives",                name_es: "Comparativos",                   icon: "📈" },
    { id: "superlatives",         name: "Superlatives",                name_es: "Superlativos",                   icon: "🏆" },
    { id: "going-to",             name: "Be Going To",                 name_es: "Be going to",                    icon: "🎯" },
    { id: "will",                 name: "Future with Will",            name_es: "Futuro con will",                icon: "🔮" },
    { id: "pres-cont-future",     name: "Present Continuous (Future)", name_es: "Presente continuo de futuro",    icon: "📆" },
    { id: "modals-must",          name: "Must / Have To",              name_es: "Must / Have to",                 icon: "🚦" },
    { id: "modals-should",        name: "Should / Shouldn't",          name_es: "Should",                         icon: "💡" },
    { id: "first-conditional",    name: "First Conditional",           name_es: "Primer condicional",             icon: "🔗" },
    { id: "present-perfect",      name: "Present Perfect",             name_es: "Presente perfecto",              icon: "✅" },
    { id: "perfect-vs-past",      name: "Perfect vs Past",             name_es: "Perfect vs Past",                icon: "🔄" },
    { id: "ever-never-just",      name: "Ever / Never / Just / Already / Yet", name_es: "Adverbios del perfecto", icon: "⏱️" },
    { id: "inf-gerund",           name: "Infinitive & Gerund",         name_es: "Infinitivo y gerundio",          icon: "🔀" },
    { id: "relatives",            name: "Relative Clauses",            name_es: "Oraciones de relativo",          icon: "🔗" },
    { id: "passive-basic",        name: "Passive Voice (Basic)",       name_es: "Pasiva básica",                  icon: "🔄" },
  ],
};

// ─── Pilot units (r91) — three units fully developed ────────────────

export const GRAMMAR_UNITS = {
  // ════════════════════════════════════════════════════════════════
  "to-be": {
    id: "to-be",
    level: "A1",
    name: "Verb To Be",
    name_es: "El verbo To Be",
    icon: "🟰",
    color: "#EC4899",
    concept: "El verbo 'to be' (ser/estar) es el más importante del inglés. Lo usamos para hablar de identidad, nacionalidad, edad, profesión, estado, lugar y muchas más cosas básicas. En español tenemos dos verbos (ser y estar), pero en inglés es uno solo.",
    form: {
      title: "Formas del presente de 'to be'",
      table: [
        { person: "I",         affirmative: "I am / I'm",         negative: "I am not / I'm not",          interrogative: "Am I?" },
        { person: "You",       affirmative: "You are / You're",   negative: "You are not / You aren't",    interrogative: "Are you?" },
        { person: "He/She/It", affirmative: "He is / He's",       negative: "He is not / He isn't",        interrogative: "Is he?" },
        { person: "We",        affirmative: "We are / We're",     negative: "We are not / We aren't",      interrogative: "Are we?" },
        { person: "They",      affirmative: "They are / They're", negative: "They are not / They aren't",  interrogative: "Are they?" },
      ],
      shortAnswers: [
        { question: "Are you tired?",  positive: "Yes, I am.",     negative: "No, I'm not." },
        { question: "Is she Spanish?", positive: "Yes, she is.",   negative: "No, she isn't." },
        { question: "Are they here?",  positive: "Yes, they are.", negative: "No, they aren't." },
      ],
    },
    uses: [
      { title: "Identidad y profesión",   note: "Quién o qué eres", example: "I am a teacher. / She is my sister." },
      { title: "Nacionalidad y origen",   note: "De dónde",         example: "We are from Spain. / He is Italian." },
      { title: "Edad",                    note: "Cuántos años",     example: "I am 25 years old." },
      { title: "Características",         note: "Cómo eres",        example: "She is tall. / The book is interesting." },
      { title: "Estado y emociones",      note: "Cómo estás",       example: "I am tired. / They are happy." },
      { title: "Ubicación",               note: "Dónde",            example: "We are at home. / The keys are on the table." },
    ],
    examples: [
      { en: "I am Spanish.",                  es: "Soy español/a." },
      { en: "She isn't a teacher.",           es: "Ella no es profesora." },
      { en: "Are you from Madrid?",           es: "¿Eres de Madrid?" },
      { en: "We are happy today.",            es: "Estamos contentos hoy." },
      { en: "He's 30 years old.",             es: "Tiene 30 años.", note: "Edad: en inglés se usa 'to be', no 'to have'" },
      { en: "It's cold in here.",             es: "Hace frío aquí.", note: "Para el clima: 'it is'" },
    ],
    warning: {
      title: "Errores típicos de hispanohablantes",
      items: [
        { wrong: "I have 25 years.",     right: "I am 25 years old.",     reason: "La edad se expresa con 'to be', no con 'have'." },
        { wrong: "She is hungry. / She has hungry.", right: "She is hungry.", reason: "Hambre, sed, calor, frío, sueño, miedo, prisa: en inglés se usa 'to be'." },
        { wrong: "I'm agree.",           right: "I agree.",                reason: "'Agree' es un verbo, no un adjetivo. No lleva 'to be'." },
        { wrong: "He is teacher.",       right: "He is a teacher.",        reason: "Las profesiones necesitan artículo 'a/an' en inglés." },
      ],
    },
    exercises: [
      // ── Letter Wheel (juego — primero, para enganchar) ──────────
      { type: "letter_wheel", level: "A1",
        prompt: "Forma las 3 conjugaciones del verbo 'to be' con estas letras:",
        letters: ["A", "E", "I", "M", "R", "S"],
        words: [
          { word: "AM",  hint: "Yo soy / estoy" },
          { word: "IS",  hint: "Él/ella es / está" },
          { word: "ARE", hint: "Nosotros/vosotros/ellos somos/sois/son" },
        ],
        explanation: "Las tres formas del presente de 'to be': AM (con I), IS (con he/she/it), ARE (con you/we/they)." },

      // ── Fill in the blank ───────────────────────────────────────
      { type: "fill_blank", level: "A1", prompt: "I ___ Spanish.",            answer: "am",   hint: "First person singular" },
      { type: "fill_blank", level: "A1", prompt: "She ___ a doctor.",         answer: "is",   hint: "Third person singular" },
      { type: "fill_blank", level: "A1", prompt: "We ___ from Madrid.",       answer: "are",  hint: "Plural" },
      { type: "fill_blank", level: "A1", prompt: "They ___ my friends.",      answer: "are",  hint: "Plural" },
      { type: "fill_blank", level: "A1", prompt: "It ___ very hot today.",    answer: "is",   hint: "Weather: it + verb" },

      // ── Multiple choice ─────────────────────────────────────────
      { type: "multiple_choice", level: "A1",
        prompt: "Choose the correct form: 'Anna ___ my sister.'",
        options: ["am", "is", "are", "be"],
        answer: "is",
        explanation: "'Anna' es tercera persona singular, así que usamos 'is'." },
      { type: "multiple_choice", level: "A1",
        prompt: "Which is correct?",
        options: ["I have 30 years.", "I am 30 years.", "I am 30 years old.", "I have 30 years old."],
        answer: "I am 30 years old.",
        explanation: "La edad en inglés se expresa siempre con 'to be' + número + 'years old'." },
      { type: "multiple_choice", level: "A1",
        prompt: "Make this negative: 'He is at home.'",
        options: ["He isn't at home.", "He don't at home.", "He not is at home.", "He no is at home."],
        answer: "He isn't at home.",
        explanation: "La negativa de 'to be' se hace añadiendo 'not' detrás: is not / isn't." },

      // ── Transform ───────────────────────────────────────────────
      { type: "transform", level: "A1",
        prompt: "Make this question:",
        source: "You are tired.",
        answer: "Are you tired?",
        explanation: "Para hacer una pregunta con 'to be', invertimos sujeto y verbo." },
      { type: "transform", level: "A1",
        prompt: "Make this negative:",
        source: "She is a nurse.",
        answer: "She isn't a nurse.",
        accept: ["She is not a nurse."],
        explanation: "Negativa: añadir 'not' detrás del verbo. La contracción es 'isn't'." },
      { type: "transform", level: "A1",
        prompt: "Give a short positive answer: 'Are they your friends?'",
        source: "Are they your friends?",
        answer: "Yes, they are.",
        explanation: "Las respuestas cortas con 'to be' repiten el verbo. No se contrae en respuestas afirmativas." },

      // ── Word order ──────────────────────────────────────────────
      { type: "word_order", level: "A1",
        prompt: "Order the words:",
        words: ["a", "teacher", "I", "am"],
        answer: "I am a teacher.",
        explanation: "Orden: sujeto + verbo + complemento." },
      { type: "word_order", level: "A1",
        prompt: "Order the words to make a question:",
        words: ["from", "Are", "Spain", "you", "?"],
        answer: "Are you from Spain?",
        explanation: "Pregunta con 'to be': verbo + sujeto + resto + signo de interrogación." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  "subject-pronouns": {
    id: "subject-pronouns",
    level: "A1",
    name: "Subject Pronouns",
    name_es: "Pronombres de sujeto",
    icon: "👥",
    color: "#3B82F6",
    concept: "Los pronombres de sujeto sustituyen al sustantivo que hace la acción del verbo. En inglés son obligatorios — no podemos omitirlos como en español. Si en español decimos 'soy de Madrid', en inglés tenemos que decir 'I am from Madrid'.",
    form: {
      title: "Los 7 pronombres de sujeto",
      table: [
        { person: "1ª singular",         pronoun: "I",     spanish: "yo",                       example: "I am a student." },
        { person: "2ª singular y plural", pronoun: "you",  spanish: "tú / usted / vosotros/as", example: "You are kind." },
        { person: "3ª singular masc.",   pronoun: "he",    spanish: "él",                       example: "He is my brother." },
        { person: "3ª singular fem.",    pronoun: "she",   spanish: "ella",                     example: "She is my sister." },
        { person: "3ª singular cosa/animal", pronoun: "it", spanish: "(no se traduce)",         example: "It is hot today." },
        { person: "1ª plural",           pronoun: "we",    spanish: "nosotros/as",              example: "We are friends." },
        { person: "3ª plural",           pronoun: "they",  spanish: "ellos/as",                 example: "They are happy." },
      ],
    },
    uses: [
      { title: "'You' sirve para tú, usted, vosotros y ustedes", note: "El inglés no distingue entre singular/plural ni formal/informal en 2ª persona.", example: "You are my friend. / You are my friends." },
      { title: "'It' para cosas, animales y conceptos abstractos", note: "Cuando hablamos del clima, la hora o algo impersonal usamos 'it'.", example: "It is Monday. / It is raining. / It is interesting." },
      { title: "'I' siempre con mayúscula", note: "Es el único pronombre que se escribe siempre con mayúscula, incluso en medio de la frase.", example: "When I am tired, I sleep." },
    ],
    examples: [
      { en: "I work in a bank.",          es: "Trabajo en un banco." },
      { en: "You are very nice.",         es: "Eres muy amable." },
      { en: "He is from Italy.",          es: "Es de Italia." },
      { en: "She likes coffee.",          es: "Le gusta el café." },
      { en: "It is cold today.",          es: "Hace frío hoy.", note: "'It' para el tiempo: no se traduce" },
      { en: "We live in Madrid.",         es: "Vivimos en Madrid." },
      { en: "They are studying English.", es: "Están estudiando inglés." },
    ],
    warning: {
      title: "Errores típicos de hispanohablantes",
      items: [
        { wrong: "Is my brother.",        right: "He is my brother.",            reason: "En español omitimos el sujeto ('Es mi hermano'), pero en inglés es obligatorio." },
        { wrong: "i am a student.",       right: "I am a student.",              reason: "'I' siempre se escribe con mayúscula, esté donde esté en la frase." },
        { wrong: "He is raining.",        right: "It is raining.",               reason: "Para el clima, la hora y cosas impersonales se usa 'it', nunca 'he' o 'she'." },
        { wrong: "Anna is my sister. Is very nice.", right: "Anna is my sister. She is very nice.", reason: "Aunque se sobreentienda, hay que repetir el pronombre en cada frase." },
      ],
    },
    exercises: [
      { type: "fill_blank", level: "A1", prompt: "Maria is from Spain. ___ is a doctor.",          answer: "She", hint: "Tercera persona femenina" },
      { type: "fill_blank", level: "A1", prompt: "My brother and I are tall. ___ play basketball.", answer: "We",  hint: "Nosotros" },
      { type: "fill_blank", level: "A1", prompt: "The book is on the table. ___ is mine.",         answer: "It",  hint: "Objeto, no persona" },
      { type: "fill_blank", level: "A1", prompt: "John and Sarah are married. ___ have two kids.", answer: "They", hint: "Ellos" },

      { type: "multiple_choice", level: "A1",
        prompt: "Choose the correct pronoun: '___ is raining.'",
        options: ["He", "She", "It", "They"],
        answer: "It",
        explanation: "Para el clima en inglés siempre se usa 'it'." },
      { type: "multiple_choice", level: "A1",
        prompt: "Which pronoun replaces 'my mother and my aunt'?",
        options: ["She", "We", "They", "You"],
        answer: "They",
        explanation: "Dos personas en tercera persona → 'they' (ellas)." },
      { type: "multiple_choice", level: "A1",
        prompt: "Which sentence is correct?",
        options: ["am tired.", "I am tired.", "i am tired.", "Am I tired."],
        answer: "I am tired.",
        explanation: "El sujeto 'I' es obligatorio y siempre va con mayúscula." },

      { type: "transform", level: "A1",
        prompt: "Replace the subject with a pronoun: 'Anna and David are my friends.'",
        source: "Anna and David are my friends.",
        answer: "They are my friends.",
        explanation: "Dos personas → 'they'." },
      { type: "transform", level: "A1",
        prompt: "Replace the subject with a pronoun: 'The cat is on the sofa.'",
        source: "The cat is on the sofa.",
        answer: "It is on the sofa.",
        accept: ["It's on the sofa."],
        explanation: "Para animales (o cosas) usamos 'it'." },

      { type: "word_order", level: "A1",
        prompt: "Order the words:",
        words: ["from", "are", "We", "Spain"],
        answer: "We are from Spain.",
        explanation: "Sujeto + verbo + complemento." },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  "possessive-adjectives": {
    id: "possessive-adjectives",
    level: "A1",
    name: "Possessive Adjectives",
    name_es: "Adjetivos posesivos",
    icon: "🏷️",
    color: "#A855F7",
    concept: "Los adjetivos posesivos indican a quién pertenece algo. Van siempre delante del sustantivo y NO cambian con el género ni con el número del sustantivo, sino con el del POSEEDOR. Esto es muy distinto al español, donde 'mi casa' y 'mis casas' cambian, o donde decimos 'su' tanto para él como para ella.",
    form: {
      title: "Los adjetivos posesivos",
      table: [
        { pronoun: "I",     adjective: "my",    spanish: "mi/mis",          example: "my book / my books" },
        { pronoun: "You",   adjective: "your",  spanish: "tu/tus, su/sus",  example: "your house / your houses" },
        { pronoun: "He",    adjective: "his",   spanish: "su/sus (de él)",  example: "his car / his cars" },
        { pronoun: "She",   adjective: "her",   spanish: "su/sus (de ella)", example: "her bag / her bags" },
        { pronoun: "It",    adjective: "its",   spanish: "su/sus (de ello)", example: "The dog and its bone." },
        { pronoun: "We",    adjective: "our",   spanish: "nuestro/a/os/as", example: "our family" },
        { pronoun: "They",  adjective: "their", spanish: "su/sus (de ellos)", example: "their parents" },
      ],
    },
    uses: [
      { title: "Posesión", note: "Decir de quién es algo.", example: "This is my phone." },
      { title: "Familia y relaciones", note: "Para hablar de gente cercana.", example: "Her mother is a doctor." },
      { title: "Partes del cuerpo", note: "En inglés se usa adjetivo posesivo, no artículo como en español.", example: "I wash my hands." },
      { title: "Posesión genérica con 'its'", note: "Para cosas, lugares y animales.", example: "The city is famous for its food." },
    ],
    examples: [
      { en: "This is my car.",                es: "Este es mi coche." },
      { en: "What's your name?",              es: "¿Cómo te llamas?", note: "Literalmente: ¿cuál es tu nombre?" },
      { en: "His brother is very tall.",      es: "Su hermano (de él) es muy alto." },
      { en: "Her dress is beautiful.",        es: "Su vestido (de ella) es precioso." },
      { en: "Our house is small.",            es: "Nuestra casa es pequeña." },
      { en: "Their children are at school.",  es: "Sus hijos (de ellos) están en el colegio." },
      { en: "I brush my teeth every day.",    es: "Me cepillo los dientes todos los días.", note: "Partes del cuerpo: 'my', no 'the'" },
    ],
    warning: {
      title: "Errores típicos de hispanohablantes",
      items: [
        { wrong: "My car is red. My cars are red.", right: "My car is red. (singular) — My cars are red. (plural)", reason: "'My' no cambia con el plural: en español 'mi' → 'mis', pero en inglés 'my' siempre es 'my'." },
        { wrong: "She is here with his husband.", right: "She is here with her husband.", reason: "El posesivo concuerda con el POSEEDOR, no con lo poseído. Si la dueña es mujer, es 'her', aunque 'husband' sea masculino." },
        { wrong: "I have pain in the leg.", right: "I have pain in my leg.", reason: "Para partes del cuerpo se usa adjetivo posesivo en inglés, no el artículo." },
        { wrong: "Your's car is nice.",    right: "Your car is nice.",       reason: "'Your' nunca lleva apóstrofe. 'Yours' (con 's' y SIN apóstrofe) es pronombre, no adjetivo." },
      ],
    },
    exercises: [
      { type: "fill_blank", level: "A1", prompt: "I have a dog. ___ name is Max.",                answer: "Its",  hint: "Posesivo de 'it'. Sí, con mayúscula al inicio." },
      { type: "fill_blank", level: "A1", prompt: "Maria is my friend. ___ husband is from France.", answer: "Her",  hint: "Posesivo de 'she'" },
      { type: "fill_blank", level: "A1", prompt: "John lives with ___ parents.",                 answer: "his",   hint: "Posesivo de 'he'" },
      { type: "fill_blank", level: "A1", prompt: "We love ___ new flat.",                        answer: "our",   hint: "Posesivo de 'we'" },
      { type: "fill_blank", level: "A1", prompt: "Anna and David are here with ___ kids.",       answer: "their", hint: "Posesivo de 'they'" },

      { type: "multiple_choice", level: "A1",
        prompt: "Which sentence is correct?",
        options: ["My cars are red.", "Mys cars are red.", "Mine cars are red.", "Me cars are red."],
        answer: "My cars are red.",
        explanation: "'My' no cambia con el plural — es siempre 'my', con o sin 's'." },
      { type: "multiple_choice", level: "A1",
        prompt: "Anna is here with ___ boyfriend.",
        options: ["his", "her", "their", "its"],
        answer: "her",
        explanation: "Anna es la dueña, así que usamos 'her' aunque 'boyfriend' sea masculino." },
      { type: "multiple_choice", level: "A1",
        prompt: "Choose the correct option: 'I wash ___ hands before eating.'",
        options: ["the", "my", "mine", "me"],
        answer: "my",
        explanation: "En inglés las partes del cuerpo van con adjetivo posesivo, no con artículo." },

      { type: "transform", level: "A1",
        prompt: "Complete with the correct possessive: 'This is _____ book. (I)'",
        source: "This is _____ book. (I)",
        answer: "This is my book.",
        explanation: "'I' → 'my'." },
      { type: "transform", level: "A1",
        prompt: "Complete with the correct possessive: 'They are eating _____ dinner. (they)'",
        source: "They are eating _____ dinner. (they)",
        answer: "They are eating their dinner.",
        explanation: "'They' → 'their'." },

      { type: "word_order", level: "A1",
        prompt: "Order the words:",
        words: ["red", "is", "Her", "dress"],
        answer: "Her dress is red.",
        explanation: "Posesivo + sustantivo + verbo + adjetivo." },
      { type: "word_order", level: "A1",
        prompt: "Order the words to make a question:",
        words: ["name", "your", "What's", "?"],
        answer: "What's your name?",
        explanation: "Pregunta con 'what': what + verbo + posesivo + sustantivo." },
    ],
  },
};

// ─── Helpers ────────────────────────────────────────────────────────

export const FOUNDATIONS_GRAMMAR_BLOCK = {
  id: "foundations-grammar",
  name: "Foundations Grammar",
  subtitle: "Essential structures",
  description: "Verb to be, pronombres, posesivos, presente, pasado, futuro, condicionales, comparativos, modales y más.",
  icon: "📚",
  levels: ["A1", "A2"],
  gradientFrom: "#FB923C",
  gradientTo:   "#EA580C",
};

export function getUnitsByLevel(level) {
  return GRAMMAR_CURRICULUM[level] || [];
}

export function isUnitAvailable(unitId) {
  return !!GRAMMAR_UNITS[unitId];
}

export function getUnit(unitId) {
  return GRAMMAR_UNITS[unitId] || null;
}

export function getAvailableUnitsCount() {
  return Object.keys(GRAMMAR_UNITS).length;
}

export function getTotalUnitsCount() {
  return GRAMMAR_CURRICULUM.A1.length + GRAMMAR_CURRICULUM.A2.length;
}
