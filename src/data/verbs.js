// Advanced Verb Structures — five families covering gerund/infinitive,
// causatives, reporting verbs, verb patterns, and complex object.

export const verbFamilies = [
  {
    id: "gerund-infinitive",
    name: "Gerund vs Infinitive",
    hint: "-ing vs to-infinitive after verbs",
    accent: "#2E86AB",
    intro:
      "Some verbs take -ing, some take to-infinitive, some take both. The choice often CHANGES the meaning. C1 separates students who memorise patterns from those who guess.",
    items: [
      {
        word: "Verbs followed by -ing (gerund)",
        use: "enjoy, avoid, finish, mind, suggest, consider, recommend, deny, admit, postpone, miss, give up.",
        example: "She enjoys reading at night. (NOT 'to read')",
      },
      {
        word: "Verbs followed by to-infinitive",
        use: "want, decide, hope, plan, refuse, manage, agree, offer, promise, expect, learn, fail.",
        example: "He decided to leave early. (NOT 'leaving')",
      },
      {
        word: "Verbs with both — same meaning",
        use: "begin, start, continue, prefer, hate, love, like — both forms are acceptable with little difference.",
        example: "It started raining / It started to rain.",
      },
      {
        word: "Verbs with both — DIFFERENT meaning",
        use: "remember, forget, stop, try, regret, mean — the choice changes the meaning significantly.",
        example: "I stopped smoking (quit). / I stopped to smoke (paused to smoke). 'Remember to lock the door' (future action) vs 'I remember locking the door' (past memory).",
      },
      {
        word: "After prepositions: always -ing",
        use: "Any verb after a preposition takes -ing form. No exceptions.",
        example: "I'm interested in learning Italian. / She's good at solving puzzles.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "He avoided ___ her in the corridor.",
        opts: ["meeting", "to meet", "meet", "met"],
        key: "meeting",
        hint: "'Avoid' takes -ing.",
        exp: "'Avoid' is a gerund-only verb. 'To meet' is wrong.",
      },
      {
        type: "blank",
        sent: "She decided ___ for the position despite the long commute.",
        opts: ["to apply", "applying", "apply", "applied"],
        key: "to apply",
        hint: "'Decide' takes to-infinitive.",
        exp: "'Decide' is an infinitive-only verb. 'Applying' is wrong here.",
      },
      {
        type: "mcq",
        sent: "Which sentence means 'I quit smoking'?",
        opts: [
          "I stopped to smoke.",
          "I stopped smoking.",
          "Both mean the same.",
        ],
        ans: "I stopped smoking.",
        exp: "'Stop + -ing' = quit doing it. 'Stop + to-infinitive' = pause in order to do it.",
      },
      {
        type: "blank",
        sent: "Don't forget ___ the door when you leave.",
        opts: ["to lock", "locking", "lock", "locked"],
        key: "to lock",
        hint: "Future action — to-infinitive.",
        exp: "'Forget + to-infinitive' = remember to do (future). 'Forget + -ing' = no memory of having done it.",
      },
      {
        type: "blank",
        sent: "She's interested in ___ photography.",
        opts: ["studying", "to study", "study", "studied"],
        key: "studying",
        hint: "After a preposition.",
        exp: "After any preposition ('in', 'at', 'of'…), use -ing. 'To study' would be wrong here.",
      },
      {
        type: "mcq",
        sent: "Pick the correct meaning of 'I regret to inform you…'",
        opts: [
          "I'm sorry that I'm about to give bad news.",
          "I wish I hadn't given bad news in the past.",
          "I'm undecided about giving news.",
        ],
        ans: "I'm sorry that I'm about to give bad news.",
        exp: "'Regret + to-infinitive' = sorry to announce now. 'Regret + -ing' = sorry about a past action.",
      },
    ],
    build: [
      {
        sent: "Use gerund after 'enjoy'.",
        words: [
          "She", "enjoys", "swimming", "in", "the", "morning.",
        ],
        ans: "She enjoys swimming in the morning.",
      },
      {
        sent: "Use to-infinitive after 'manage'.",
        words: [
          "He", "managed", "to", "finish", "the", "report", "on", "time.",
        ],
        ans: "He managed to finish the report on time.",
      },
      {
        sent: "Use -ing after a preposition.",
        words: [
          "I'm", "good", "at", "solving", "complex", "problems.",
        ],
        ans: "I'm good at solving complex problems.",
      },
      {
        sent: "Use 'remember + to-infinitive' (future action).",
        words: [
          "Remember", "to", "call", "your", "mother", "tonight.",
        ],
        ans: "Remember to call your mother tonight.",
      },
    ],
  },

  {
    id: "causatives",
    name: "Causatives",
    hint: "Have / get / make / let someone do",
    accent: "#0E6655",
    intro:
      "Causative structures express that someone else does the action for you (or that you make someone do it). Different verbs require different patterns — easy to confuse.",
    items: [
      {
        word: "Have someone do (bare infinitive)",
        use: "Get someone to do something on your behalf. NO 'to' before the second verb.",
        example: "I had the mechanic fix my car. (NOT 'to fix')",
      },
      {
        word: "Get someone TO do (with 'to')",
        use: "Same meaning as 'have someone do' but requires 'to'. Slightly more informal.",
        example: "I got the mechanic to fix my car.",
      },
      {
        word: "Have/Get something done (passive)",
        use: "Pay or arrange for something to be done to your object. Object + past participle.",
        example: "I had my hair cut yesterday. (Someone cut it for me.) / I got my car serviced last week.",
      },
      {
        word: "Make someone do (force, bare infinitive)",
        use: "Force or compel — 'make' takes the bare infinitive in active. BUT 'be made to do' in passive (with 'to').",
        example: "She made him apologise. → He was made to apologise.",
      },
      {
        word: "Let someone do (permit, bare infinitive)",
        use: "Allow — 'let' takes the bare infinitive. In passive, use 'be allowed to' instead.",
        example: "She let me borrow her car. → I was allowed to borrow her car.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Pick the correct causative meaning 'someone cut my hair for me'.",
        opts: [
          "I cut my hair.",
          "I had my hair cut.",
          "I had cut my hair.",
        ],
        ans: "I had my hair cut.",
        exp: "Causative passive: have + object + past participle. 'I had my hair cut' = someone cut it for me.",
      },
      {
        type: "blank",
        sent: "She made him ___ the truth.",
        opts: ["tell", "to tell", "telling", "told"],
        key: "tell",
        hint: "'Make' takes the bare infinitive.",
        exp: "'Make + somebody + bare infinitive' (no 'to'). 'Made him to tell' is wrong.",
      },
      {
        type: "blank",
        sent: "I got the plumber ___ the leak.",
        opts: ["to fix", "fix", "fixing", "fixed"],
        key: "to fix",
        hint: "'Get' takes 'to + infinitive'.",
        exp: "'Get + somebody + to-infinitive'. Different from 'have', which takes bare infinitive.",
      },
      {
        type: "mcq",
        sent: "Which is the passive of 'They made him resign'?",
        opts: [
          "He was made resign.",
          "He was made to resign.",
          "He was made resigning.",
        ],
        ans: "He was made to resign.",
        exp: "In the passive, 'make' takes 'to' before the infinitive: 'was made to resign'. The bare infinitive only works in active voice.",
      },
      {
        type: "blank",
        sent: "We had our windows ___ last week.",
        opts: ["cleaned", "to clean", "clean", "cleaning"],
        key: "cleaned",
        hint: "Passive causative: have + object + past participle.",
        exp: "'Have + something + past participle' = someone did it for you. 'Cleaned' is the past participle.",
      },
      {
        type: "mcq",
        sent: "Which sentence uses 'let' correctly?",
        opts: [
          "My parents let me to stay out late.",
          "My parents let me stay out late.",
          "My parents let me staying out late.",
        ],
        ans: "My parents let me stay out late.",
        exp: "'Let' takes the bare infinitive: 'let me stay'. Never 'let to' or 'let -ing'.",
      },
    ],
    build: [
      {
        sent: "Use 'have + bare infinitive'.",
        words: [
          "I'll", "have", "my", "assistant", "send", "you", "the", "details.",
        ],
        ans: "I'll have my assistant send you the details.",
      },
      {
        sent: "Use causative passive (have + done).",
        words: [
          "She", "had", "her", "passport", "renewed", "last", "month.",
        ],
        ans: "She had her passport renewed last month.",
      },
      {
        sent: "Use 'make + bare infinitive'.",
        words: [
          "The", "teacher", "made", "us", "repeat", "the", "exercise.",
        ],
        ans: "The teacher made us repeat the exercise.",
      },
      {
        sent: "Use 'get + object + to-infinitive'.",
        words: [
          "I", "got", "him", "to", "admit", "his", "mistake.",
        ],
        ans: "I got him to admit his mistake.",
      },
    ],
  },

  {
    id: "reporting",
    name: "Reporting Verbs",
    hint: "Beyond 'say' and 'tell'",
    accent: "#7D6608",
    intro:
      "C1 candidates show range by varying their reporting verbs. Each reporting verb has its own grammatical pattern — getting the pattern wrong is the C1 trap.",
    items: [
      {
        word: "Verb + that-clause",
        use: "say, claim, admit, deny, suggest, mention, explain. 'That' is often optional.",
        example: "He admitted (that) he had lied.",
      },
      {
        word: "Verb + somebody + to-infinitive",
        use: "advise, ask, tell, warn, invite, persuade, encourage, remind, urge, order.",
        example: "She advised me to consult a lawyer.",
      },
      {
        word: "Verb + -ing",
        use: "suggest, deny, admit, recommend, propose. (Some overlap with 'verb + that'.)",
        example: "He denied stealing the money.",
      },
      {
        word: "Verb + preposition + -ing",
        use: "accuse OF, apologise FOR, congratulate ON, insist ON, blame FOR, thank FOR.",
        example: "She accused him of lying.",
      },
      {
        word: "The trap: 'suggest' patterns",
        use: "'Suggest' takes: that-clause, -ing, or noun. BUT NEVER 'suggest somebody to do'. That's a Spanish/French interference error.",
        example: "✗ He suggested me to take a break. → ✓ He suggested (that) I take a break. / He suggested taking a break.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Pick the correct sentence with 'suggest':",
        opts: [
          "He suggested me to go home.",
          "He suggested that I go home.",
          "He suggested me going home.",
        ],
        ans: "He suggested that I go home.",
        exp: "'Suggest' NEVER takes 'somebody to do'. Use 'that + subjunctive' or '-ing form'.",
      },
      {
        type: "blank",
        sent: "She advised me ___ the contract carefully.",
        opts: ["to read", "reading", "read", "that read"],
        key: "to read",
        hint: "'Advise' takes 'somebody to do'.",
        exp: "'Advise' follows the pattern: advise + somebody + to-infinitive.",
      },
      {
        type: "blank",
        sent: "He apologised ___ being late.",
        opts: ["for", "of", "to", "about"],
        key: "for",
        hint: "Apologise FOR.",
        exp: "Fixed combination: 'apologise FOR + -ing'. Common errors: 'apologise of/to/about'.",
      },
      {
        type: "blank",
        sent: "She accused him ___ stealing the documents.",
        opts: ["of", "for", "with", "about"],
        key: "of",
        hint: "Accuse OF.",
        exp: "Fixed combination: 'accuse + somebody + OF + -ing'. 'For' is a common error.",
      },
      {
        type: "mcq",
        sent: "Which sentence is WRONG?",
        opts: [
          "He denied taking the money.",
          "He denied that he had taken the money.",
          "He denied me to take the money.",
        ],
        ans: "He denied me to take the money.",
        exp: "'Deny' takes -ing or that-clause. Never 'deny + somebody + to'.",
      },
      {
        type: "blank",
        sent: "They congratulated her ___ winning the prize.",
        opts: ["on", "for", "to", "about"],
        key: "on",
        hint: "Congratulate ON.",
        exp: "Fixed combination: 'congratulate + somebody + ON + -ing/noun'.",
      },
    ],
    build: [
      {
        sent: "Reporting with 'advise + somebody + to-infinitive'.",
        words: [
          "The", "doctor", "advised", "me", "to", "rest", "for", "a", "week.",
        ],
        ans: "The doctor advised me to rest for a week.",
      },
      {
        sent: "Reporting with 'suggest + that-clause'.",
        words: [
          "He", "suggested", "that", "we", "leave", "early.",
        ],
        ans: "He suggested that we leave early.",
      },
      {
        sent: "Reporting with 'accuse + of + -ing'.",
        words: [
          "She", "accused", "him", "of", "cheating", "on", "the", "test.",
        ],
        ans: "She accused him of cheating on the test.",
      },
      {
        sent: "Reporting with 'apologise + for + -ing'.",
        words: [
          "I", "apologised", "for", "interrupting", "the", "meeting.",
        ],
        ans: "I apologised for interrupting the meeting.",
      },
    ],
  },

  {
    id: "verb-patterns",
    name: "Verb Patterns",
    hint: "Tricky combinations and complements",
    accent: "#922B21",
    intro:
      "Beyond reporting and causatives, English has many verb patterns that C1 candidates need to internalise. Each verb has its own preferred companions.",
    items: [
      {
        word: "Verb + object + bare infinitive",
        use: "see, hear, feel, watch, notice, let, make, help — perception and causation. Bare infinitive emphasises the whole action.",
        example: "I saw her cross the street. (whole action) / I saw her crossing the street. (in progress)",
      },
      {
        word: "Verb + object + -ing (perception in progress)",
        use: "Same perception verbs + -ing emphasise that the action is ongoing.",
        example: "I heard him singing in the shower for over an hour.",
      },
      {
        word: "Verb + preposition + object",
        use: "look AT, listen TO, depend ON, agree WITH, succeed IN, consist OF — fixed.",
        example: "Success depends on hard work.",
      },
      {
        word: "Verb + that-clause + subjunctive",
        use: "Mandative verbs (demand, insist, propose, require) trigger the subjunctive — see Formal English lesson.",
        example: "She demanded that he leave immediately.",
      },
      {
        word: "Help — special case",
        use: "'Help' can take 'to-infinitive' OR bare infinitive — both correct, bare is more common.",
        example: "She helped me (to) understand the problem.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Pick the version emphasising that the whole action was witnessed.",
        opts: [
          "I saw her cross the street.",
          "I saw her crossing the street.",
          "I saw her to cross the street.",
        ],
        ans: "I saw her cross the street.",
        exp: "Bare infinitive after perception verbs = the action seen in its entirety. '-ing' = in progress when seen.",
      },
      {
        type: "blank",
        sent: "Success depends ___ hard work and a bit of luck.",
        opts: ["on", "in", "of", "from"],
        key: "on",
        hint: "Fixed: depend ON.",
        exp: "'Depend on' is the fixed combination. 'Depend in/of/from' are all wrong.",
      },
      {
        type: "blank",
        sent: "We agreed ___ the new policy at the meeting.",
        opts: ["on", "with", "in", "to"],
        key: "on",
        hint: "Agree ON a topic.",
        exp: "'Agree on' = reach agreement about a topic. 'Agree with' = share someone's opinion. Different prepositions, different meanings.",
      },
      {
        type: "mcq",
        sent: "Which sentence is correct?",
        opts: [
          "She helped me carry the boxes.",
          "She helped me to carry the boxes.",
          "Both are correct.",
        ],
        ans: "Both are correct.",
        exp: "'Help' is one of the few verbs that accepts both bare infinitive and to-infinitive without a meaning change.",
      },
      {
        type: "blank",
        sent: "I heard her ___ in the next room for hours.",
        opts: ["singing", "to sing", "sing", "sung"],
        key: "singing",
        hint: "Ongoing action.",
        exp: "'For hours' shows the action was extended — use -ing for in-progress perception.",
      },
      {
        type: "mcq",
        sent: "Which sentence is INCORRECT?",
        opts: [
          "I made him to apologise.",
          "I had him apologise.",
          "I got him to apologise.",
        ],
        ans: "I made him to apologise.",
        exp: "'Make' takes a bare infinitive in active voice: 'made him apologise'. Adding 'to' is the most common causative mistake.",
      },
    ],
    build: [
      {
        sent: "Perception + bare infinitive.",
        words: [
          "I", "watched", "him", "score", "the", "winning", "goal.",
        ],
        ans: "I watched him score the winning goal.",
      },
      {
        sent: "Perception + -ing (ongoing).",
        words: [
          "She", "heard", "the", "kids", "laughing", "downstairs.",
        ],
        ans: "She heard the kids laughing downstairs.",
      },
      {
        sent: "Verb + fixed preposition.",
        words: [
          "The", "outcome", "depends", "on", "several", "factors.",
        ],
        ans: "The outcome depends on several factors.",
      },
      {
        sent: "Help + bare infinitive.",
        words: [
          "Can", "you", "help", "me", "move", "this", "table?",
        ],
        ans: "Can you help me move this table?",
      },
    ],
  },

  {
    id: "complex-object",
    name: "Complex Object",
    hint: "Verb + object + complement",
    accent: "#1F618D",
    intro:
      "Complex object: verb + object + complement (infinitive, -ing, adjective). It packs a lot of grammar into a small space. Mastering it makes your English flow like a native's.",
    items: [
      {
        word: "Verb + object + to-infinitive",
        use: "want, expect, ask, tell, allow, force, persuade, encourage. 'I want you to come.'",
        example: "I expect the team to deliver on time.",
      },
      {
        word: "Verb + object + bare infinitive",
        use: "Causatives (make, let, have) and perception verbs (see, hear, feel). 'I made him apologise.'",
        example: "She let me borrow her notes.",
      },
      {
        word: "Verb + object + -ing",
        use: "Perception verbs (see, hear, watch, feel) for ongoing actions. Also 'catch' and 'find'.",
        example: "I caught him cheating on the test.",
      },
      {
        word: "Verb + object + past participle",
        use: "Causative passive (have/get something done), or perception of a completed result.",
        example: "I want this report finished by tomorrow.",
      },
      {
        word: "Verb + object + adjective/noun",
        use: "Make, find, consider, declare, paint. The complement describes a state achieved.",
        example: "We painted the room blue. / They consider him a genius.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "I want you ___ honest with me.",
        opts: ["to be", "be", "being", "are"],
        key: "to be",
        hint: "'Want + object + to-infinitive'.",
        exp: "'Want' belongs to the 'verb + object + to-infinitive' family. 'Want you be' is a classic L2 error.",
      },
      {
        type: "blank",
        sent: "She caught the children ___ from the cookie jar.",
        opts: ["stealing", "to steal", "steal", "stolen"],
        key: "stealing",
        hint: "Caught in the act = -ing.",
        exp: "'Catch + somebody + -ing' = catch them in the act. The bare infinitive would be wrong.",
      },
      {
        type: "blank",
        sent: "We consider this proposal ___.",
        opts: ["unacceptable", "to be unacceptable", "be unacceptable", "is unacceptable"],
        key: "unacceptable",
        hint: "Consider + object + adjective.",
        exp: "Both 'consider X unacceptable' and 'consider X to be unacceptable' are correct. The shorter form is more common.",
      },
      {
        type: "blank",
        sent: "Can you have this letter ___ before noon?",
        opts: ["typed", "to type", "typing", "type"],
        key: "typed",
        hint: "Causative passive.",
        exp: "'Have + object + past participle' = causative passive. 'Have this letter typed' = arrange for it to be typed.",
      },
      {
        type: "mcq",
        sent: "Which sentence uses the complex object correctly?",
        opts: [
          "She let me to borrow her car.",
          "She let me borrow her car.",
          "She let me borrowing her car.",
        ],
        ans: "She let me borrow her car.",
        exp: "'Let' takes the bare infinitive: 'let me borrow'. Never 'let to' or 'let -ing'.",
      },
      {
        type: "blank",
        sent: "They declared the meeting ___.",
        opts: ["over", "to be over", "is over", "be over"],
        key: "over",
        hint: "Verb + object + adjective.",
        exp: "'Declared the meeting over' = announce it's over. The shorter form (without 'to be') is standard.",
      },
    ],
    build: [
      {
        sent: "Use 'expect + object + to-infinitive'.",
        words: [
          "I", "expect", "everyone", "to", "be", "punctual", "tomorrow.",
        ],
        ans: "I expect everyone to be punctual tomorrow.",
      },
      {
        sent: "Use 'catch + object + -ing'.",
        words: [
          "She", "caught", "him", "looking", "at", "her", "phone.",
        ],
        ans: "She caught him looking at her phone.",
      },
      {
        sent: "Use causative passive (have + object + past participle).",
        words: [
          "He", "had", "his", "suit", "tailored", "in", "London.",
        ],
        ans: "He had his suit tailored in London.",
      },
      {
        sent: "Use 'find + object + adjective'.",
        words: [
          "I", "found", "the", "film", "deeply", "moving.",
        ],
        ans: "I found the film deeply moving.",
      },
    ],
  },
];
