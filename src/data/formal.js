// Formal & Academic English — five families covering register, hedging,
// nominalisation, subjunctive, and academic style.

export const formalFamilies = [
  {
    id: "hedging",
    name: "Hedging",
    hint: "Softening claims with caution",
    accent: "#4A235A",
    intro:
      "Hedging is the art of NOT sounding too sure. C1 academic writing avoids 'is' in favour of 'may be', 'tends to be', 'appears to be'. Without hedging, claims sound naive or overconfident.",
    items: [
      {
        word: "Modal hedges: may / might / could",
        use: "Soften certainty. 'X is the cause' becomes 'X may be a contributing factor'.",
        example: "Stress may contribute to memory loss.",
      },
      {
        word: "Lexical hedges: tend to, appear to, seem to",
        use: "Verbs that signal a tendency rather than a fact.",
        example: "Younger participants tend to outperform older ones.",
      },
      {
        word: "Adverbial hedges: possibly, perhaps, arguably",
        use: "Adverbs that flag the writer's uncertainty without weakening the argument.",
        example: "This is arguably the most influential study of the decade.",
      },
      {
        word: "Distancing: It has been suggested that…",
        use: "Impersonal passive constructions distance the writer from the claim. Very academic.",
        example: "It has been suggested that diet plays a role.",
      },
      {
        word: "Approximation: approximately, roughly, in the region of",
        use: "Used with numbers and quantities when precision is unnecessary or unverifiable.",
        example: "Approximately 30% of respondents agreed.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Which is the MOST hedged version?",
        opts: [
          "Smoking causes lung cancer.",
          "Smoking may contribute to lung cancer.",
          "Smoking is linked to lung cancer.",
        ],
        ans: "Smoking may contribute to lung cancer.",
        exp: "'May contribute' is the most cautious — both modal hedge and lexical hedge.",
      },
      {
        type: "blank",
        sent: "The data ___ that the hypothesis is correct.",
        opts: ["suggest", "prove", "show definitely", "demonstrate clearly"],
        key: "suggest",
        hint: "Academic prose avoids 'prove'.",
        exp: "Academic writing prefers 'suggest' over 'prove' — 'prove' is reserved for mathematics and law.",
      },
      {
        type: "blank",
        sent: "It ___ that climate change is accelerating.",
        opts: ["appears", "is", "happens", "occurs"],
        key: "appears",
        hint: "Impersonal distancing.",
        exp: "'It appears that…' is a classic academic distancing structure. 'Is' would be too direct.",
      },
      {
        type: "mcq",
        sent: "Which sentence is INAPPROPRIATELY direct for academic writing?",
        opts: [
          "This study proves once and for all that diet matters.",
          "This study suggests that diet plays a significant role.",
          "The findings indicate a possible link.",
        ],
        ans: "This study proves once and for all that diet matters.",
        exp: "'Proves once and for all' is journalistic, not academic. Academic writing hedges.",
      },
      {
        type: "blank",
        sent: "There were ___ 500 participants in the survey.",
        opts: ["approximately", "exactly", "certainly", "absolutely"],
        key: "approximately",
        hint: "Soften the number.",
        exp: "'Approximately' is the standard academic hedge for an inexact figure.",
      },
      {
        type: "mcq",
        sent: "Pick the most appropriate hedge for a tentative conclusion:",
        opts: [
          "This proves that X is the only cause.",
          "Arguably, X is one of several contributing factors.",
          "Without doubt, X is responsible.",
        ],
        ans: "Arguably, X is one of several contributing factors.",
        exp: "'Arguably' + 'one of several' double-hedges, which is appropriate when evidence is partial.",
      },
    ],
    build: [
      {
        sent: "Hedge with a modal.",
        words: [
          "The", "results", "may", "indicate", "a", "broader", "trend.",
        ],
        ans: "The results may indicate a broader trend.",
      },
      {
        sent: "Hedge with 'tend to'.",
        words: [
          "Successful", "students", "tend", "to", "review", "their", "notes", "daily.",
        ],
        ans: "Successful students tend to review their notes daily.",
      },
      {
        sent: "Use impersonal distancing.",
        words: [
          "It", "has", "been", "suggested", "that", "diet", "affects", "mood.",
        ],
        ans: "It has been suggested that diet affects mood.",
      },
      {
        sent: "Use 'appears to be'.",
        words: [
          "The", "issue", "appears", "to", "be", "more", "complex", "than", "expected.",
        ],
        ans: "The issue appears to be more complex than expected.",
      },
    ],
  },

  {
    id: "nominalisation",
    name: "Nominalisation",
    hint: "Turning verbs into nouns",
    accent: "#0E6655",
    intro:
      "Nominalisation converts verbs and adjectives into nouns ('decide' → 'decision', 'happy' → 'happiness'). It packs information densely and creates the abstract, impersonal tone of academic prose.",
    items: [
      {
        word: "Verb → noun",
        use: "Most academic-sounding sentences are built around nominalised verbs.",
        example: "The government decided to act quickly. → The government's decision to act quickly was crucial.",
      },
      {
        word: "Adjective → noun",
        use: "Adjectives become abstract nouns with -ness, -ity, -ence, -y, etc.",
        example: "The data is reliable. → The reliability of the data is high.",
      },
      {
        word: "Common nominalisation endings",
        use: "-tion, -sion, -ment, -ance, -ence, -al, -ure for verbs; -ness, -ity, -ence, -hood for adjectives.",
        example: "investigate → investigation; arrive → arrival; analyse → analysis; complex → complexity.",
      },
      {
        word: "Why C1 writers nominalise",
        use: "Three reasons: density (more info per sentence), formality, and theme-development (you can make the noun the topic of the next sentence).",
        example: "The economy collapsed. The collapse triggered widespread protests.",
      },
      {
        word: "Don't over-nominalise",
        use: "Excessive nominalisation makes writing dense and bureaucratic. Mix nominalisations with active verbs.",
        example: "✗ The implementation of the modification was the result of the consideration of the committee. → ✓ The committee considered and modified the proposal.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Nominalise: 'The committee decided to investigate.'",
        opts: [
          "The committee's decision to investigate…",
          "The committee deciding to investigate…",
          "The committee, which decided to investigate…",
        ],
        ans: "The committee's decision to investigate…",
        exp: "'Decided' → noun 'decision'. The verb becomes a noun phrase.",
      },
      {
        type: "blank",
        sent: "The verb 'arrive' becomes the noun ___.",
        opts: ["arrival", "arriving", "arrivement", "arrivence"],
        key: "arrival",
        hint: "-al ending.",
        exp: "Standard nominalisation: 'arrive' → 'arrival'. '-ing' would be a gerund, not a nominalisation.",
      },
      {
        type: "blank",
        sent: "The adjective 'reliable' becomes the noun ___.",
        opts: ["reliability", "reliableness", "reliance", "reliancy"],
        key: "reliability",
        hint: "-ity ending.",
        exp: "Adjective → abstract noun with -ity: 'reliable' → 'reliability'.",
      },
      {
        type: "mcq",
        sent: "Which sentence is MORE academic?",
        opts: [
          "Globalisation has dramatically transformed local economies.",
          "Things are very different now because of globalisation.",
        ],
        ans: "Globalisation has dramatically transformed local economies.",
        exp: "First version uses the nominalised subject 'Globalisation' and the precise verb 'transformed' — academic prose.",
      },
      {
        type: "mcq",
        sent: "Which sentence is OVER-nominalised (and should be rewritten)?",
        opts: [
          "The analysis revealed a clear pattern.",
          "The implementation of the modification of the proposal led to the cancellation of the project.",
          "Researchers analysed the data and identified key trends.",
        ],
        ans: "The implementation of the modification of the proposal led to the cancellation of the project.",
        exp: "Five nominalisations in one sentence is bureaucratic mush. Mix in active verbs.",
      },
      {
        type: "blank",
        sent: "Nominalise 'analyse' as a noun: ___.",
        opts: ["analysis", "analysement", "analyzing", "analyseness"],
        key: "analysis",
        hint: "Irregular Greek origin.",
        exp: "'Analyse' → 'analysis' (Greek root, irregular). Plural: 'analyses'.",
      },
    ],
    build: [
      {
        sent: "Use a nominalised subject.",
        words: [
          "The", "introduction", "of", "the", "new", "policy", "caused", "widespread", "debate.",
        ],
        ans: "The introduction of the new policy caused widespread debate.",
      },
      {
        sent: "Use a nominalised abstract noun.",
        words: [
          "The", "complexity", "of", "the", "issue", "is", "often", "underestimated.",
        ],
        ans: "The complexity of the issue is often underestimated.",
      },
      {
        sent: "Use nominalisation to link two sentences.",
        words: [
          "Their", "decision", "to", "expand", "abroad", "proved", "highly", "profitable.",
        ],
        ans: "Their decision to expand abroad proved highly profitable.",
      },
      {
        sent: "Build with a nominalised result.",
        words: [
          "The", "discovery", "of", "the", "vaccine", "transformed", "modern", "medicine.",
        ],
        ans: "The discovery of the vaccine transformed modern medicine.",
      },
    ],
  },

  {
    id: "register",
    name: "Formal Register",
    hint: "Choosing the right level of formality",
    accent: "#7B241C",
    intro:
      "Register isn't just about hard words — it's about matching your language to the context. C1 writers can move fluidly between formal and informal, but they know NOT to mix the two.",
    items: [
      {
        word: "Phrasal verbs → Latinate verbs",
        use: "Formal writing prefers single-word verbs of Latin origin over phrasal verbs.",
        example: "find out → discover; put off → postpone; look into → investigate; bring up → raise.",
      },
      {
        word: "Avoid contractions",
        use: "Don't use 'don't', 'won't', 'I'm' in formal writing. Spell them out.",
        example: "✗ It doesn't fit. → ✓ It does not fit.",
      },
      {
        word: "Avoid intensifiers like 'really' and 'very'",
        use: "Replace with stronger single words.",
        example: "very tired → exhausted; really important → crucial; very small → minuscule.",
      },
      {
        word: "Avoid first-person 'I think' / 'In my opinion'",
        use: "Replace with impersonal alternatives: 'It can be argued that', 'It is widely accepted that'.",
        example: "I think this is a problem → It can be argued that this constitutes a problem.",
      },
      {
        word: "Avoid 'get' in formal writing",
        use: "'Get' is too informal. Replace with 'obtain', 'receive', 'become', 'reach'.",
        example: "He got the prize → He received the prize. / It's getting cold → It is becoming cold.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Which is the most FORMAL version?",
        opts: [
          "We need to find out what happened.",
          "We need to discover what happened.",
          "We need to ascertain what occurred.",
        ],
        ans: "We need to ascertain what occurred.",
        exp: "'Ascertain' is more formal than 'discover', and 'occurred' is more formal than 'happened'. Plus, no phrasal verb.",
      },
      {
        type: "blank",
        sent: "Replace 'put off' with a formal verb: 'The meeting was ___ until Friday.'",
        opts: ["postponed", "delayed", "stopped", "cancelled"],
        key: "postponed",
        hint: "Latinate single-word verb.",
        exp: "'Put off' = 'postpone' in formal register. 'Delayed' is acceptable but less precise.",
      },
      {
        type: "mcq",
        sent: "Which sentence is INAPPROPRIATELY informal?",
        opts: [
          "I really think this is a big issue and we should do something.",
          "This appears to be a significant issue that warrants action.",
          "The committee should consider intervention.",
        ],
        ans: "I really think this is a big issue and we should do something.",
        exp: "First-person 'I think', intensifier 'really', vague 'big issue', vague 'do something' — all informal red flags.",
      },
      {
        type: "blank",
        sent: "Replace 'get': 'It is hoped that he will ___ the scholarship.'",
        opts: ["obtain", "win", "have", "take"],
        key: "obtain",
        hint: "Formal substitute for 'get'.",
        exp: "'Obtain' is the formal academic equivalent of 'get'.",
      },
      {
        type: "mcq",
        sent: "Which contractions belong in formal writing?",
        opts: [
          "Don't, won't, it's, I'm.",
          "None of them — spell all contractions out in formal writing.",
          "Only 'it's' is acceptable.",
        ],
        ans: "None of them — spell all contractions out in formal writing.",
        exp: "Formal writing avoids all contractions. Write 'do not', 'will not', 'it is', 'I am'.",
      },
      {
        type: "blank",
        sent: "Replace 'very important' with a stronger word.",
        opts: ["crucial", "important-er", "really important", "much important"],
        key: "crucial",
        hint: "Single strong adjective.",
        exp: "'Crucial' replaces 'very important' with a single, more emphatic word. Same idea: 'paramount', 'essential', 'pivotal'.",
      },
    ],
    build: [
      {
        sent: "Formal — replace phrasal verb.",
        words: [
          "The", "committee", "will", "investigate", "the", "matter", "further.",
        ],
        ans: "The committee will investigate the matter further.",
      },
      {
        sent: "Formal — no contractions, no intensifiers.",
        words: [
          "The", "findings", "are", "crucial", "to", "our", "understanding.",
        ],
        ans: "The findings are crucial to our understanding.",
      },
      {
        sent: "Formal impersonal opinion.",
        words: [
          "It", "can", "be", "argued", "that", "the", "policy", "is", "ineffective.",
        ],
        ans: "It can be argued that the policy is ineffective.",
      },
      {
        sent: "Formal replacement for 'get'.",
        words: [
          "He", "obtained", "his", "doctorate", "from", "Cambridge.",
        ],
        ans: "He obtained his doctorate from Cambridge.",
      },
    ],
  },

  {
    id: "subjunctive",
    name: "Subjunctive",
    hint: "After demand, suggest, insist…",
    accent: "#1A5276",
    intro:
      "English keeps a small but distinct subjunctive mood — easy to miss but a clear C1 marker when used correctly. Most common after verbs of demand/suggestion ('I suggest he be on time'), and in fixed expressions ('Be that as it may…').",
    items: [
      {
        word: "Mandative subjunctive (base form)",
        use: "After verbs like demand, insist, suggest, require, propose, request + 'that' — use the BASE form for all persons.",
        example: "The board demanded that he resign immediately. (NOT 'resigns')",
      },
      {
        word: "Negative subjunctive",
        use: "Add 'not' BEFORE the base verb. No 'do/does/did'.",
        example: "She insisted that he not be informed. (NOT 'doesn't be informed')",
      },
      {
        word: "Were-subjunctive (formal conditional)",
        use: "Use 'were' for all persons in unreal conditionals: 'If I were you' (not 'was'). The base of the Inversion lesson's 'Were she here…' formula.",
        example: "If I were rich, I would travel constantly.",
      },
      {
        word: "Fixed subjunctive expressions",
        use: "Frozen phrases that preserve the subjunctive: 'be that as it may', 'so be it', 'come what may', 'God save the Queen'.",
        example: "Be that as it may, we must press on.",
      },
      {
        word: "Modern alternatives",
        use: "British English often uses 'should + base form' instead: 'It is essential that he should attend.' Both are correct; the bare subjunctive is more American/formal.",
        example: "It is essential that everyone (should) be present.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "The committee insists that the meeting ___ at 9 a.m.",
        opts: ["start", "starts", "started", "should start"],
        key: "start",
        hint: "Mandative subjunctive — base form.",
        exp: "After 'insist that', use the base form 'start' regardless of person. 'Should start' is also acceptable in BrE.",
      },
      {
        type: "blank",
        sent: "It is essential that she ___ the report by Friday.",
        opts: ["submits", "submit", "submitted", "would submit"],
        key: "submit",
        hint: "Subjunctive after 'It is essential that'.",
        exp: "'It is essential/crucial/vital that…' triggers the subjunctive: base form 'submit', no -s.",
      },
      {
        type: "mcq",
        sent: "Pick the correct negative subjunctive:",
        opts: [
          "She demanded that he not leave the building.",
          "She demanded that he doesn't leave the building.",
          "She demanded that he didn't leave the building.",
        ],
        ans: "She demanded that he not leave the building.",
        exp: "Negative subjunctive: 'not' before base form. No 'do/does/did' auxiliary.",
      },
      {
        type: "blank",
        sent: "If I ___ in your position, I would resign.",
        opts: ["were", "was", "am", "would be"],
        key: "were",
        hint: "Were-subjunctive for unreal conditionals.",
        exp: "Formal English uses 'were' for all persons in unreal conditionals. 'Was' is acceptable informally but not in C1 written register.",
      },
      {
        type: "blank",
        sent: "He proposed that the deadline ___ extended.",
        opts: ["be", "is", "was", "will be"],
        key: "be",
        hint: "Subjunctive of 'be'.",
        exp: "'Propose that' triggers the subjunctive. The subjunctive of 'be' is just 'be' (no conjugation).",
      },
      {
        type: "mcq",
        sent: "Which fixed expression uses the subjunctive?",
        opts: [
          "Be that as it may.",
          "What's up?",
          "By the way.",
        ],
        ans: "Be that as it may.",
        exp: "'Be that as it may' = 'Even if that is true'. Preserves the subjunctive 'be'.",
      },
    ],
    build: [
      {
        sent: "Subjunctive after 'demand'.",
        words: [
          "The", "judge", "demanded", "that", "the", "witness", "tell", "the", "truth.",
        ],
        ans: "The judge demanded that the witness tell the truth.",
      },
      {
        sent: "Subjunctive after 'essential'.",
        words: [
          "It", "is", "essential", "that", "everyone", "arrive", "on", "time.",
        ],
        ans: "It is essential that everyone arrive on time.",
      },
      {
        sent: "Negative subjunctive.",
        words: [
          "We", "request", "that", "you", "not", "disclose", "this", "information.",
        ],
        ans: "We request that you not disclose this information.",
      },
      {
        sent: "Were-subjunctive in a conditional.",
        words: [
          "If", "I", "were", "the", "manager,", "I", "would", "do", "things", "differently.",
        ],
        ans: "If I were the manager, I would do things differently.",
      },
    ],
  },

  {
    id: "academic-style",
    name: "Academic Style",
    hint: "Citing, qualifying, signposting",
    accent: "#5B2C6F",
    intro:
      "Academic style is more than vocabulary — it's the architecture of a careful argument. C1 academic writing references sources, qualifies claims, and signposts the reader through the structure.",
    items: [
      {
        word: "Referencing sources",
        use: "Attribute claims to their source explicitly with verbs of attribution: argues, claims, posits, contends, maintains, observes.",
        example: "Smith (2018) argues that the model is flawed.",
      },
      {
        word: "Signposting",
        use: "Use phrases that tell the reader where they are in your argument: 'firstly', 'turning now to', 'in conclusion', 'this raises the question of'.",
        example: "Turning now to the second hypothesis…",
      },
      {
        word: "Qualifying with 'although' and 'while'",
        use: "Concede a counterpoint before pushing your argument. Shows nuance.",
        example: "Although the data is limited, it suggests a trend worth investigating.",
      },
      {
        word: "Cautious generalisation",
        use: "Combine quantifiers with hedges: 'many', 'most', 'a significant proportion of' rather than 'all' or 'always'.",
        example: "A significant proportion of respondents reported satisfaction.",
      },
      {
        word: "Cohesive linking",
        use: "Use 'this', 'these', 'such' to refer back. The reader follows your thread, and you avoid repetition.",
        example: "The model has been criticised. This criticism centres on its assumptions.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Which sentence uses correct academic attribution?",
        opts: [
          "Some guy said the model doesn't work.",
          "Smith (2018) argues that the model is fundamentally flawed.",
          "Everybody knows the model doesn't work.",
        ],
        ans: "Smith (2018) argues that the model is fundamentally flawed.",
        exp: "Academic attribution = author + year + verb of attribution + claim.",
      },
      {
        type: "blank",
        sent: "___ the data is limited, the findings are nonetheless suggestive.",
        opts: ["Although", "Because", "If", "Since"],
        key: "Although",
        hint: "Concession.",
        exp: "'Although' concedes a limitation before asserting the value of the findings — a key academic move.",
      },
      {
        type: "mcq",
        sent: "Pick the best signposting phrase to start a new section:",
        opts: [
          "Now let's talk about the next thing.",
          "Turning now to the question of methodology…",
          "So next we'll look at methodology.",
        ],
        ans: "Turning now to the question of methodology…",
        exp: "'Turning now to' is a classic academic signpost. The other two are informal.",
      },
      {
        type: "blank",
        sent: "___ proportion of the respondents agreed with the proposal.",
        opts: ["A significant", "All the", "Every", "Nobody"],
        key: "A significant",
        hint: "Cautious generalisation.",
        exp: "'A significant proportion' is hedged. 'All the' and 'every' are too absolute for cautious academic writing.",
      },
      {
        type: "mcq",
        sent: "Which verb is BEST for attributing a strong, contested position?",
        opts: ["contends", "talks about", "says", "writes"],
        ans: "contends",
        exp: "'Contends' implies a strong, defended position. 'Says' and 'talks about' are too neutral/informal.",
      },
      {
        type: "mcq",
        sent: "Pick the most cohesive pair of sentences:",
        opts: [
          "The model has flaws. The model's flaws have been widely discussed.",
          "The model has flaws. These have been widely discussed.",
          "The model has flaws. People talk about the model's flaws a lot.",
        ],
        ans: "The model has flaws. These have been widely discussed.",
        exp: "'These' refers back without repetition — cohesive and concise.",
      },
    ],
    build: [
      {
        sent: "Cite a source academically.",
        words: [
          "Smith", "(2018)", "argues", "that", "the", "theory", "is", "outdated.",
        ],
        ans: "Smith (2018) argues that the theory is outdated.",
      },
      {
        sent: "Concede before asserting.",
        words: [
          "Although", "the", "sample", "is", "small,", "the", "findings", "are", "compelling.",
        ],
        ans: "Although the sample is small, the findings are compelling.",
      },
      {
        sent: "Signpost a transition.",
        words: [
          "Turning", "now", "to", "the", "question", "of", "implementation,", "several", "issues", "arise.",
        ],
        ans: "Turning now to the question of implementation, several issues arise.",
      },
      {
        sent: "Use 'this' for cohesion.",
        words: [
          "The", "study", "had", "methodological", "limitations.", "This", "weakens", "its", "conclusions.",
        ],
        ans: "The study had methodological limitations. This weakens its conclusions.",
      },
    ],
  },
];
