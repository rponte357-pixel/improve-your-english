// Cleft Sentences data — three "families" by structure:
//
//   1. It-Clefts — focus a noun phrase ("It was John who…")
//   2. Wh-Clefts — focus an action or thing using what/all/the thing
//   3. Time/Place Clefts — "It wasn't until…", "It was only when…"
//
// The split mirrors how clefts are typically taught: by which structure
// you're using, not by the type of element being emphasised.

export const cleftFamilies = [
  {
    id: "it-clefts",
    name: "It-Clefts",
    hint: "Focusing on a noun, person or thing",
    accent: "#1F618D",
    intro:
      "It-clefts put a single element under the spotlight by promoting it to the position right after 'It is/was'. Use them to single out the WHO, WHAT or WHEN that matters most.",
    items: [
      {
        word: "It is/was + X + that…",
        use:
          "The most common cleft. Promotes any noun phrase, time expression or place. Use 'who' instead of 'that' when X is a person.",
        example:
          "It was Sarah who solved the problem, not Mark.",
      },
      {
        word: "Emphasising contrast",
        use:
          "It-clefts often signal a correction or contrast — 'it was X, not Y'. The rest of the sentence (after 'that/who') is treated as already known.",
        example:
          "It was the noise that woke me up, not the alarm.",
      },
      {
        word: "Negative form",
        use:
          "Negate by saying 'It wasn't X who/that…'. Common for refuting an assumption.",
        example:
          "It wasn't the budget that delayed the project; it was the management.",
      },
      {
        word: "With time and place",
        use:
          "Time and place expressions become the focus naturally. Use 'that' (or 'when'/'where' optionally).",
        example:
          "It was in Berlin that we first met.",
      },
      {
        word: "Common pitfall: agreement",
        use:
          "Even when the focused noun is plural, the verb after 'It' stays singular: 'It is the students who…' (not 'are').",
        example:
          "It is my parents who deserve the credit, not me.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "She forgot her keys, not her phone. Rewrite with an it-cleft:",
        opts: [
          "It was her keys that she forgot, not her phone.",
          "It were her keys that she forgot, not her phone.",
          "What she forgot was her keys, not her phone.",
        ],
        ans: "It was her keys that she forgot, not her phone.",
        exp:
          "Singular 'was' after 'It', even though 'keys' is plural. The third option is a what-cleft (valid, but not an it-cleft).",
      },
      {
        type: "blank",
        sent: "It was John ___ called you yesterday, not Peter.",
        opts: ["who", "which", "where", "what"],
        key: "who",
        exp: "When the focused element is a person, use 'who' (or 'that').",
      },
      {
        type: "blank",
        sent: "It ___ in 1969 that humans first landed on the moon.",
        opts: ["was", "were", "is", "had been"],
        key: "was",
        exp:
          "Singular 'was' after 'It' is fixed regardless of what follows.",
      },
      {
        type: "mcq",
        sent: "Which sentence is correctly formed?",
        opts: [
          "It was my brother who organised the surprise.",
          "It is my brother that organised the surprise yesterday.",
          "It were my brothers who organised the surprise.",
        ],
        ans: "It was my brother who organised the surprise.",
        exp:
          "Past tense ('organised' in the relative clause) requires 'was'. 'Were' is wrong with 'It'.",
      },
      {
        type: "blank",
        sent: "It wasn't the heat ___ exhausted us; it was the humidity.",
        opts: ["that", "what", "which", "who"],
        key: "that",
        exp:
          "'That' connects the focused element to the rest of the sentence in an it-cleft. 'What' would start a different structure.",
      },
      {
        type: "mcq",
        sent: "Pick the it-cleft (not a what-cleft):",
        opts: [
          "It was the silence that disturbed me most.",
          "What disturbed me most was the silence.",
          "The silence — that's what disturbed me.",
        ],
        ans: "It was the silence that disturbed me most.",
        exp:
          "It-clefts begin with 'It is/was'. The other two are wh-cleft and resumptive structures.",
      },
    ],
    build: [
      {
        sent: "Build an it-cleft focusing on a person.",
        words: [
          "It",
          "was",
          "Maria",
          "who",
          "discovered",
          "the",
          "error.",
        ],
        ans: "It was Maria who discovered the error.",
      },
      {
        sent: "Build an it-cleft focusing on a time.",
        words: [
          "It",
          "was",
          "in",
          "1989",
          "that",
          "the",
          "wall",
          "fell.",
        ],
        ans: "It was in 1989 that the wall fell.",
      },
      {
        sent: "Build a negative it-cleft.",
        words: [
          "It",
          "wasn't",
          "the",
          "price",
          "that",
          "bothered",
          "him,",
          "but",
          "the",
          "attitude.",
        ],
        ans:
          "It wasn't the price that bothered him, but the attitude.",
      },
      {
        sent: "Build an it-cleft focusing on a place.",
        words: [
          "It",
          "was",
          "in",
          "Lisbon",
          "where",
          "they",
          "got",
          "married.",
        ],
        ans: "It was in Lisbon where they got married.",
      },
    ],
  },

  {
    id: "wh-clefts",
    name: "Wh-Clefts",
    hint: "Focusing actions and things with what / all",
    accent: "#7D3C98",
    intro:
      "Wh-clefts (also called pseudo-clefts) put a clause headed by 'what', 'all' or 'the thing' before a copular verb to defer the focus to the END of the sentence. Use them to build up suspense or emphasise a final reveal.",
    items: [
      {
        word: "What + clause + is/was + X",
        use:
          "The classic wh-cleft. 'What I need is a holiday.' The focus (X) lands at the end — typical of spoken emphasis.",
        example:
          "What annoys me most is his constant interruptions.",
      },
      {
        word: "All + clause + is/was + X",
        use:
          "Stronger than 'what'. Implies 'this and nothing else'. Often combined with infinitive: 'All I want is to rest.'",
        example:
          "All she said was that she'd think about it.",
      },
      {
        word: "The thing/reason/place + clause",
        use:
          "Slightly more conversational. Replace 'what' with 'the thing/reason/place that…' to keep the same structure.",
        example:
          "The thing I love about her is her honesty.",
      },
      {
        word: "Verb agreement",
        use:
          "The verb after the wh-clause agrees with the FOCUSED element at the end, not with 'what'. 'What I need are some answers.'",
        example:
          "What he wants are guarantees, not promises.",
      },
      {
        word: "With do — emphasising an action",
        use:
          "Use 'do' as a placeholder to focus on an action. 'What I did was call her immediately.' (no 'to' before 'call').",
        example:
          "What he did was apologise and leave the room.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent:
          "I hate the way he interrupts everyone. Rewrite as a what-cleft:",
        opts: [
          "What I hate is the way he interrupts everyone.",
          "It is the way he interrupts everyone what I hate.",
          "All I hate the way he interrupts everyone.",
        ],
        ans:
          "What I hate is the way he interrupts everyone.",
        exp:
          "Structure: What + clause + is + focus.",
      },
      {
        type: "blank",
        sent: "All she wanted ___ a moment of peace.",
        opts: ["was", "were", "had", "did"],
        key: "was",
        exp:
          "Singular focused element ('a moment of peace') → 'was'.",
      },
      {
        type: "blank",
        sent: "What he ___ was call the police immediately.",
        opts: ["did", "made", "had", "was"],
        key: "did",
        exp:
          "Use 'do' as a placeholder to focus on the action. 'What he did was + bare infinitive'.",
      },
      {
        type: "mcq",
        sent: "Which sentence has CORRECT agreement?",
        opts: [
          "What I need are some answers.",
          "What I need is some answers.",
          "What I needs are some answers.",
        ],
        ans: "What I need are some answers.",
        exp:
          "The verb agrees with the focus at the end ('some answers' — plural).",
      },
      {
        type: "blank",
        sent: "___ I'm worried about is the cost of the project.",
        opts: ["What", "That", "Which", "All"],
        key: "What",
        exp:
          "'What' introduces the clause. 'All' would also work but adds the meaning 'only this'.",
      },
      {
        type: "mcq",
        sent: "Pick the most natural way to emphasise the action 'apologise':",
        opts: [
          "What he did was apologise.",
          "What he did was apologised.",
          "What he did was to apologise.",
        ],
        ans: "What he did was apologise.",
        exp:
          "After 'What X did was', use the BARE infinitive (no 'to', no -ed).",
      },
    ],
    build: [
      {
        sent: "Build a what-cleft with a noun focus.",
        words: [
          "What",
          "I",
          "need",
          "is",
          "a",
          "long",
          "holiday.",
        ],
        ans: "What I need is a long holiday.",
      },
      {
        sent: "Build an all-cleft.",
        words: [
          "All",
          "she",
          "wanted",
          "was",
          "a",
          "quiet",
          "evening.",
        ],
        ans: "All she wanted was a quiet evening.",
      },
      {
        sent: "Build a what-cleft focusing on an action (use bare infinitive).",
        words: [
          "What",
          "he",
          "did",
          "was",
          "call",
          "the",
          "manager.",
        ],
        ans: "What he did was call the manager.",
      },
      {
        sent: "Use 'The thing' instead of 'what'.",
        words: [
          "The",
          "thing",
          "I",
          "miss",
          "most",
          "is",
          "the",
          "weather.",
        ],
        ans: "The thing I miss most is the weather.",
      },
    ],
  },

  {
    id: "time-place",
    name: "Time & Place Clefts",
    hint: "It wasn't until… / It was only when…",
    accent: "#B9770E",
    intro:
      "These clefts mark the precise moment or condition under which something happened. They're a C1 staple in storytelling and formal writing because they build dramatic timing.",
    items: [
      {
        word: "It wasn't until + X + that…",
        use:
          "Emphasises that something happened LATER than expected. The 'until' clause is the trigger; the main result follows 'that'.",
        example:
          "It wasn't until I left home that I appreciated my parents.",
      },
      {
        word: "It was only when + X + that…",
        use:
          "Very similar to 'wasn't until'. Stresses the realisation or trigger moment.",
        example:
          "It was only when she apologised that he calmed down.",
      },
      {
        word: "It was not until / Not until + inversion",
        use:
          "Formal variant: 'Not until X did + S + V'. The auxiliary inverts (see Inversion lesson). Common in formal writing.",
        example:
          "Not until midnight did the storm finally stop.",
      },
      {
        word: "Common pitfall: the main verb",
        use:
          "After 'that' (or in the inverted version), keep the verb AFFIRMATIVE — never repeat 'not'. The negation is already inside 'wasn't until'.",
        example:
          "✗ It wasn't until 6 pm that the meeting didn't end. → ✓ It wasn't until 6 pm that the meeting ended.",
      },
      {
        word: "Tense match",
        use:
          "Both halves usually go in the past simple. Use past perfect in the 'until' clause only if you're emphasising an event prior to the result.",
        example:
          "It was only after he had left that I realised I had his keys.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent:
          "The CEO decided to resign only after the scandal broke. Rewrite with 'It wasn't until':",
        opts: [
          "It wasn't until the scandal broke that the CEO decided to resign.",
          "It wasn't until the scandal that broke the CEO decided to resign.",
          "It wasn't the scandal broke until the CEO decided to resign.",
        ],
        ans:
          "It wasn't until the scandal broke that the CEO decided to resign.",
        exp:
          "Structure: It wasn't until + [trigger] + that + [main result].",
      },
      {
        type: "blank",
        sent: "It wasn't until I read the contract twice ___ I noticed the error.",
        opts: ["that", "when", "which", "what"],
        key: "that",
        exp:
          "After the 'until' clause, the main result is introduced with 'that'.",
      },
      {
        type: "mcq",
        sent:
          "Which sentence has the CORRECT polarity?",
        opts: [
          "It wasn't until midnight that he arrived.",
          "It wasn't until midnight that he didn't arrive.",
          "It was until midnight that he didn't arrive.",
        ],
        ans: "It wasn't until midnight that he arrived.",
        exp:
          "Keep the main verb affirmative — the negation lives in 'wasn't until'.",
      },
      {
        type: "blank",
        sent: "___ the alarm went off did everyone realise the building was on fire.",
        opts: [
          "Not until",
          "Until not",
          "It wasn't",
          "Only when",
        ],
        key: "Not until",
        exp:
          "'Not until' triggers inversion: 'did everyone realise' (auxiliary before subject).",
      },
      {
        type: "blank",
        sent: "It was only ___ she saw the photos that she believed me.",
        opts: ["when", "until", "where", "what"],
        key: "when",
        exp: "'It was only when…' marks the trigger moment.",
      },
      {
        type: "mcq",
        sent:
          "Which is the formal inverted version of 'It wasn't until the rain stopped that we left'?",
        opts: [
          "Not until the rain stopped did we leave.",
          "Not until the rain stopped we left.",
          "Until the rain didn't stop did we leave.",
        ],
        ans: "Not until the rain stopped did we leave.",
        exp:
          "After 'Not until + clause', invert: aux ('did') + subject + base form.",
      },
    ],
    build: [
      {
        sent: "Use 'It wasn't until…'",
        words: [
          "It",
          "wasn't",
          "until",
          "she",
          "spoke",
          "that",
          "I",
          "recognised",
          "her.",
        ],
        ans:
          "It wasn't until she spoke that I recognised her.",
      },
      {
        sent: "Use 'It was only when…'",
        words: [
          "It",
          "was",
          "only",
          "when",
          "he",
          "apologised",
          "that",
          "she",
          "smiled.",
        ],
        ans:
          "It was only when he apologised that she smiled.",
      },
      {
        sent: "Use the formal inverted form: 'Not until… did…'",
        words: [
          "Not",
          "until",
          "midnight",
          "did",
          "the",
          "guests",
          "leave.",
        ],
        ans: "Not until midnight did the guests leave.",
      },
      {
        sent: "Build with past perfect in the 'until' clause.",
        words: [
          "It",
          "wasn't",
          "until",
          "I",
          "had",
          "read",
          "the",
          "report",
          "that",
          "I",
          "understood",
          "the",
          "problem.",
        ],
        ans:
          "It wasn't until I had read the report that I understood the problem.",
      },
    ],
  },
];
