// Advanced Clauses — five families covering clause-level grammar for C1.
// Same shape as connectors.js / modals.js.

export const clauseFamilies = [
  {
    id: "relative",
    name: "Relative Clauses",
    hint: "Defining vs non-defining",
    accent: "#1F618D",
    intro:
      "Relative clauses add information about a noun. The big C1 distinction is defining (no commas, no 'which' for people) vs non-defining (commas required, more formal).",
    items: [
      {
        word: "Defining relative clause",
        use: "Identifies which one we're talking about. No commas. 'That' or 'who/which' both work.",
        example: "The student who/that won the prize is from Madrid.",
      },
      {
        word: "Non-defining relative clause",
        use: "Adds extra (non-essential) information. Commas required. 'That' is NOT allowed.",
        example: "My brother, who lives in Paris, is a chef.",
      },
      {
        word: "Whose (for possession)",
        use: "Replaces 'his/her/its/their' inside a relative clause. Works for people and things.",
        example: "The author whose book won the prize is here today.",
      },
      {
        word: "Prepositions: formal vs informal",
        use: "Formal: preposition before 'which/whom'. Informal: preposition at the end with 'that/who'.",
        example: "The man to whom I spoke (formal). / The man (who/that) I spoke to (informal).",
      },
      {
        word: "Common pitfall: that vs which",
        use: "In defining clauses both work. In non-defining clauses, ONLY 'which' is correct. 'That' is wrong after a comma.",
        example: "✓ The film, which we saw yesterday, was brilliant. ✗ The film, that we saw yesterday, was brilliant.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "The woman ___ called you is my mother.",
        opts: ["who", "which", "whose", "whom"],
        key: "who",
        hint: "Person + subject of the clause.",
        exp: "'Who' is for people as the subject of the relative clause. 'Which' is for things; 'whose' shows possession.",
      },
      {
        type: "mcq",
        sent: "Pick the correctly punctuated non-defining clause:",
        opts: [
          "My sister, who lives in Berlin, is visiting next week.",
          "My sister that lives in Berlin is visiting next week.",
          "My sister, that lives in Berlin, is visiting next week.",
        ],
        ans: "My sister, who lives in Berlin, is visiting next week.",
        exp: "Non-defining clauses need commas AND can't use 'that' — only 'who' or 'which'.",
      },
      {
        type: "blank",
        sent: "The novelist ___ work I admire is giving a talk tonight.",
        opts: ["who", "whose", "which", "whom"],
        key: "whose",
        hint: "Possession ('his work / her work').",
        exp: "'Whose' replaces a possessive pronoun (his/her work). Works for people and things.",
      },
      {
        type: "mcq",
        sent: "Which is the formal version of 'The colleague I worked with last year'?",
        opts: [
          "The colleague with whom I worked last year.",
          "The colleague whom I worked with last year.",
          "The colleague which I worked with last year.",
        ],
        ans: "The colleague with whom I worked last year.",
        exp: "Formal: preposition moves to the front, before 'whom'. The other versions are valid but informal.",
      },
      {
        type: "blank",
        sent: "This is the village ___ I grew up.",
        opts: ["where", "which", "who", "whose"],
        key: "where",
        hint: "Place adverb — equivalent to 'in which'.",
        exp: "'Where' = 'in which' for places. Both 'in which I grew up' and 'where I grew up' are correct.",
      },
      {
        type: "mcq",
        sent: "Which sentence is INCORRECT?",
        opts: [
          "The book, that I read last week, was excellent.",
          "The book that I read last week was excellent.",
          "The book, which I read last week, was excellent.",
        ],
        ans: "The book, that I read last week, was excellent.",
        exp: "'That' is never allowed after a comma. Non-defining clauses use 'which' or 'who'.",
      },
    ],
    build: [
      {
        sent: "Build a defining relative clause (no commas).",
        words: ["The", "man", "who", "called", "you", "is", "outside."],
        ans: "The man who called you is outside.",
      },
      {
        sent: "Build a non-defining relative clause (with commas).",
        words: ["My", "neighbour,", "who", "is", "a", "doctor,", "helped", "us."],
        ans: "My neighbour, who is a doctor, helped us.",
      },
      {
        sent: "Use 'whose' for possession.",
        words: ["The", "artist", "whose", "paintings", "we", "saw", "is", "Spanish."],
        ans: "The artist whose paintings we saw is Spanish.",
      },
      {
        sent: "Build a formal relative with preposition first.",
        words: ["The", "person", "to", "whom", "I", "spoke", "was", "very", "helpful."],
        ans: "The person to whom I spoke was very helpful.",
      },
    ],
  },

  {
    id: "reduced",
    name: "Reduced Relative Clauses",
    hint: "Dropping who/which is + -ing or -ed",
    accent: "#7D3C98",
    intro:
      "Reduced relatives compress a full relative clause into a short participle phrase. They're a C1 hallmark: 'The man who is standing there' → 'The man standing there'. Used everywhere in formal and journalistic writing.",
    items: [
      {
        word: "-ing reduction (active)",
        use: "Replace 'who/which + be + -ing' with just the -ing form. The relative pronoun and 'be' disappear.",
        example: "The students who are waiting outside → The students waiting outside.",
      },
      {
        word: "-ed reduction (passive)",
        use: "Replace 'who/which + be + past participle' with just the past participle.",
        example: "The book which was written by Orwell → The book written by Orwell.",
      },
      {
        word: "Active verb without 'be'",
        use: "Active verbs that aren't continuous can also be reduced to -ing. 'Anyone who wants…' → 'Anyone wanting…'",
        example: "People who live near the airport complain. → People living near the airport complain.",
      },
      {
        word: "When you CAN'T reduce",
        use: "Don't reduce when the original uses a state verb in simple present or when the meaning changes. Also: don't reduce 'whose' clauses.",
        example: "The man who knows the answer → ✓ The man knowing the answer (rare, but acceptable). The man whose car is broken → CANNOT be reduced.",
      },
      {
        word: "Position of the reduced clause",
        use: "The reduced phrase follows the noun exactly like a full relative clause. No commas in defining cases.",
        example: "The painting hanging in the hall is a Picasso.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Reduce: 'The children who are playing in the garden'.",
        opts: [
          "The children playing in the garden",
          "The children played in the garden",
          "The children play in the garden",
        ],
        ans: "The children playing in the garden",
        exp: "Active continuous → drop 'who are', keep '-ing'. 'Played' would change the meaning to passive.",
      },
      {
        type: "mcq",
        sent: "Reduce: 'The novel which was published last year'.",
        opts: [
          "The novel publishing last year",
          "The novel published last year",
          "The novel publish last year",
        ],
        ans: "The novel published last year",
        exp: "Passive → drop 'which was', keep the past participle.",
      },
      {
        type: "blank",
        sent: "The flights ___ at gate 5 are delayed.",
        opts: ["leaving", "left", "leave", "to leave"],
        key: "leaving",
        hint: "Active continuous reduction.",
        exp: "Reduction of 'flights that are leaving' → 'flights leaving'.",
      },
      {
        type: "blank",
        sent: "Anyone ___ to apply must submit the form by Friday.",
        opts: ["wishing", "wished", "wishes", "wish"],
        key: "wishing",
        hint: "Active reduction of 'who wishes'.",
        exp: "'Anyone who wishes' → 'anyone wishing'. Active reduction, even without 'be'.",
      },
      {
        type: "mcq",
        sent: "Which sentence cannot be reduced?",
        opts: [
          "The man whose car was stolen called the police.",
          "The man who is standing at the door is my uncle.",
          "The package which was sent yesterday arrived today.",
        ],
        ans: "The man whose car was stolen called the police.",
        exp: "'Whose' clauses cannot be reduced. The others are standard active/passive reductions.",
      },
      {
        type: "mcq",
        sent: "Identify the correct reduction of 'The proposal that was rejected by the board':",
        opts: [
          "The proposal rejecting by the board",
          "The proposal rejected by the board",
          "The proposal being rejected by the board",
        ],
        ans: "The proposal rejected by the board",
        exp: "Passive → drop 'that was', keep past participle 'rejected'. 'Being rejected' would mean an action in progress.",
      },
    ],
    build: [
      {
        sent: "Reduce 'The woman who is waiting outside'.",
        words: ["The", "woman", "waiting", "outside."],
        ans: "The woman waiting outside.",
      },
      {
        sent: "Reduce 'The letters which were sent yesterday'.",
        words: ["The", "letters", "sent", "yesterday."],
        ans: "The letters sent yesterday.",
      },
      {
        sent: "Use an active reduction without 'be'.",
        words: ["People", "living", "in", "cities", "tend", "to", "earn", "more."],
        ans: "People living in cities tend to earn more.",
      },
      {
        sent: "Reduce a passive in a longer sentence.",
        words: ["The", "novel", "written", "by", "Atwood", "won", "the", "prize."],
        ans: "The novel written by Atwood won the prize.",
      },
    ],
  },

  {
    id: "participle",
    name: "Participle Clauses",
    hint: "-ing and -ed at the start of a sentence",
    accent: "#117864",
    intro:
      "Participle clauses are a sophisticated way to combine two ideas without 'and'/'because'/'when'. They're shorter, more formal, and very common in academic writing.",
    items: [
      {
        word: "Present participle (-ing) — simultaneous or cause",
        use: "Express two actions happening at the same time, or a reason. The subject of both clauses must be the same.",
        example: "Walking down the street, I bumped into Sarah. (= While I was walking…)",
      },
      {
        word: "Perfect participle (Having + pp) — sequence",
        use: "Express that one action happened before the other. Same subject required.",
        example: "Having finished my homework, I went out. (= After I had finished…)",
      },
      {
        word: "Past participle (-ed) — passive",
        use: "Reduces a passive clause. Often expresses cause or condition.",
        example: "Built in 1850, the bridge is still in use. (= Although it was built in 1850…)",
      },
      {
        word: "Negative participles",
        use: "Place 'not' before the participle. 'Not knowing what to say…'",
        example: "Not having received a reply, I called again.",
      },
      {
        word: "Critical pitfall: dangling participles",
        use: "The implicit subject of the participle MUST match the subject of the main clause. Otherwise it 'dangles' and the sentence becomes absurd or unclear.",
        example: "✗ Walking down the street, the rain started. (the rain was walking?) → ✓ As I was walking down the street, the rain started.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Combine: 'I was reading the report. I noticed an error.'",
        opts: [
          "Reading the report, I noticed an error.",
          "Read the report, I noticed an error.",
          "Having read the report, I noticed an error simultaneously.",
        ],
        ans: "Reading the report, I noticed an error.",
        exp: "Two simultaneous actions, same subject → present participle '-ing'.",
      },
      {
        type: "mcq",
        sent: "Combine: 'She had finished her degree. She moved to Madrid.'",
        opts: [
          "Finishing her degree, she moved to Madrid.",
          "Having finished her degree, she moved to Madrid.",
          "She finished her degree moved to Madrid.",
        ],
        ans: "Having finished her degree, she moved to Madrid.",
        exp: "One action before the other → perfect participle ('Having + past participle').",
      },
      {
        type: "blank",
        sent: "___ in 1923, this building has survived two earthquakes.",
        opts: ["Built", "Building", "Having built", "Build"],
        key: "Built",
        hint: "Passive reduction — 'It was built…'",
        exp: "Past participle starts a passive participle clause. 'Built in 1923' = 'which was built in 1923'.",
      },
      {
        type: "mcq",
        sent: "Which sentence has a DANGLING participle?",
        opts: [
          "Driving to work, the traffic was terrible.",
          "Driving to work, I noticed the traffic was terrible.",
          "Having driven to work, I felt exhausted.",
        ],
        ans: "Driving to work, the traffic was terrible.",
        exp: "'Driving' implies a person, but the main clause subject is 'the traffic' — the traffic was not driving. That's a dangling participle.",
      },
      {
        type: "blank",
        sent: "___ what to do, he asked his manager.",
        opts: ["Not knowing", "Don't knowing", "Knowing not", "No knowing"],
        key: "Not knowing",
        hint: "Negation before the participle.",
        exp: "'Not' precedes the participle: 'Not knowing what to do' = 'Because he didn't know what to do'.",
      },
      {
        type: "mcq",
        sent: "Which participle clause expresses a reason?",
        opts: [
          "Feeling tired, she went to bed early.",
          "Walking home, she met an old friend.",
          "Singing loudly, he washed the dishes.",
        ],
        ans: "Feeling tired, she went to bed early.",
        exp: "'Feeling tired' = 'Because she felt tired'. The other two express simultaneous actions, not cause.",
      },
    ],
    build: [
      {
        sent: "Use a present participle for simultaneity.",
        words: ["Walking", "home,", "she", "saw", "an", "accident."],
        ans: "Walking home, she saw an accident.",
      },
      {
        sent: "Use a perfect participle for a prior action.",
        words: ["Having", "lived", "abroad,", "he", "speaks", "three", "languages."],
        ans: "Having lived abroad, he speaks three languages.",
      },
      {
        sent: "Use a past participle for passive reduction.",
        words: ["Written", "in", "haste,", "the", "letter", "contained", "errors."],
        ans: "Written in haste, the letter contained errors.",
      },
      {
        sent: "Use a negative participle.",
        words: ["Not", "having", "studied,", "she", "failed", "the", "exam."],
        ans: "Not having studied, she failed the exam.",
      },
    ],
  },

  {
    id: "time",
    name: "Time Clauses",
    hint: "When / while / as soon as / by the time",
    accent: "#B7950B",
    intro:
      "Time clauses signal WHEN something happens relative to the main clause. The trap is the future: time clauses NEVER use 'will' — they use present forms instead.",
    items: [
      {
        word: "Future time clauses → present tense",
        use: "After 'when, before, after, as soon as, until, by the time' referring to the future, use present simple or present perfect. Never 'will'.",
        example: "I'll call you when I arrive. (NOT 'when I will arrive')",
      },
      {
        word: "By the time + present perfect",
        use: "'By the time' often takes present perfect in the time clause, with the main clause in future perfect or simple future.",
        example: "By the time you arrive, I will have finished cooking.",
      },
      {
        word: "While vs when",
        use: "'While' emphasises duration (two ongoing actions). 'When' often marks a precise point or a sequence.",
        example: "While I was reading, the phone rang. / When the phone rang, I was reading.",
      },
      {
        word: "As soon as / the moment / the minute",
        use: "All mean 'immediately when'. Common in formal storytelling and instructions.",
        example: "Call me the moment you hear any news.",
      },
      {
        word: "No sooner / Hardly (formal inversion)",
        use: "Bridges to your Inversion lesson: 'No sooner had I sat down than the phone rang.'",
        example: "Hardly had we arrived when it started to rain.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "I'll text you when I ___ at the airport.",
        opts: ["arrive", "will arrive", "am arriving", "would arrive"],
        key: "arrive",
        hint: "Future time clauses use present tense.",
        exp: "After 'when' for future, use present simple. 'Will' in a time clause is a classic mistake.",
      },
      {
        type: "blank",
        sent: "By the time we get there, the film ___.",
        opts: [
          "will have started",
          "will start",
          "has started",
          "starts",
        ],
        key: "will have started",
        hint: "Action completed before another future point.",
        exp: "'By the time' + present in time clause + future perfect in main clause to show completion before that point.",
      },
      {
        type: "mcq",
        sent: "Pick the correct version:",
        opts: [
          "As soon as he will finish, we'll go.",
          "As soon as he finishes, we'll go.",
          "As soon as he is finishing, we'll go.",
        ],
        ans: "As soon as he finishes, we'll go.",
        exp: "'As soon as' is a future time conjunction → present tense in the time clause.",
      },
      {
        type: "blank",
        sent: "___ I was reading, my brother was watching TV.",
        opts: ["While", "When", "Until", "By the time"],
        key: "While",
        hint: "Two simultaneous ongoing actions.",
        exp: "'While' emphasises that both actions were happening at the same time, for a duration.",
      },
      {
        type: "blank",
        sent: "Don't leave the room until I ___ back.",
        opts: ["come", "will come", "am coming", "had come"],
        key: "come",
        hint: "Future time clause with 'until'.",
        exp: "'Until' in a future context takes present simple. Same rule as 'when' and 'before'.",
      },
      {
        type: "mcq",
        sent: "Which sentence is correct?",
        opts: [
          "I'll see you after I will finish work.",
          "I'll see you after I finish work.",
          "I'll see you after I am finishing work.",
        ],
        ans: "I'll see you after I finish work.",
        exp: "'After' (time conjunction, future context) → present simple. No 'will' inside the time clause.",
      },
    ],
    build: [
      {
        sent: "Future time clause — no 'will' inside.",
        words: ["I'll", "call", "you", "when", "I", "get", "home."],
        ans: "I'll call you when I get home.",
      },
      {
        sent: "By the time + present perfect.",
        words: [
          "By", "the", "time", "she", "arrives,", "we", "will", "have", "left.",
        ],
        ans: "By the time she arrives, we will have left.",
      },
      {
        sent: "Use 'while' for two ongoing actions.",
        words: [
          "While", "I", "was", "cooking,", "the", "kids", "were", "playing.",
        ],
        ans: "While I was cooking, the kids were playing.",
      },
      {
        sent: "Use 'as soon as' for immediate sequence.",
        words: [
          "As", "soon", "as", "the", "bell", "rings,", "leave", "the", "building.",
        ],
        ans: "As soon as the bell rings, leave the building.",
      },
    ],
  },

  {
    id: "reason-result",
    name: "Reason & Result Clauses",
    hint: "Because, since, so that, such that",
    accent: "#A04000",
    intro:
      "These clauses link cause and effect explicitly. The C1 stretch is mastering the formal alternatives ('owing to', 'on account of', 'so + adj + that') beyond plain 'because'.",
    items: [
      {
        word: "Because / since / as (reason)",
        use: "All express reason. 'Because' is neutral. 'Since' and 'as' often signal information the listener already knows.",
        example: "Since you know the city, can you show us around?",
      },
      {
        word: "Owing to / due to / on account of",
        use: "Followed by a NOUN, not a clause. Very formal. 'Due to' was historically only adjectival but is now widely accepted.",
        example: "The flight was cancelled owing to bad weather.",
      },
      {
        word: "So + adj/adv + that (result)",
        use: "Express the result of an extreme degree. Inversion is possible for emphasis: 'So tired was I that I fell asleep.'",
        example: "She spoke so quickly that I couldn't follow.",
      },
      {
        word: "Such + (a/an) + noun + that",
        use: "Same idea as 'so… that' but with nouns instead of adjectives.",
        example: "It was such a boring film that we left.",
      },
      {
        word: "So that vs in order to (purpose vs result)",
        use: "'So that' can mean purpose ('in order to') OR result. Context disambiguates. 'So as to' is purpose only.",
        example: "Speak slowly so that everyone understands. (purpose) / He was tired, so that he went to bed early. (result)",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "The match was postponed ___ heavy rain.",
        opts: ["because of", "because", "since", "due"],
        key: "because of",
        hint: "Followed by a noun, not a clause.",
        exp: "'Because of' + noun. 'Because' would need a clause: 'because it was raining'.",
      },
      {
        type: "blank",
        sent: "She was ___ tired that she fell asleep on the sofa.",
        opts: ["so", "such", "such a", "very"],
        key: "so",
        hint: "Before an adjective.",
        exp: "'So + adjective + that': 'so tired that'. 'Such' would need a noun.",
      },
      {
        type: "blank",
        sent: "It was ___ boring lecture that half the students left.",
        opts: ["so", "such", "such a", "so a"],
        key: "such a",
        hint: "Before 'a + adjective + noun'.",
        exp: "'Such + a/an + adjective + noun + that': 'such a boring lecture'.",
      },
      {
        type: "mcq",
        sent: "Which sentence is correct?",
        opts: [
          "Owing to the weather was bad, the flight was cancelled.",
          "Owing to the bad weather, the flight was cancelled.",
          "Owing the weather was bad, the flight was cancelled.",
        ],
        ans: "Owing to the bad weather, the flight was cancelled.",
        exp: "'Owing to' takes a NOUN PHRASE, not a clause.",
      },
      {
        type: "blank",
        sent: "I'm leaving early ___ I can catch the last train.",
        opts: ["so that", "because", "owing to", "such that"],
        key: "so that",
        hint: "Purpose — in order to.",
        exp: "'So that' expresses purpose here ('in order to catch the train'). 'Because' would express reason but reverses the logic.",
      },
      {
        type: "mcq",
        sent: "Which inverted form is correct (for emphasis)?",
        opts: [
          "So tired was I that I went straight to bed.",
          "So I was tired that I went straight to bed.",
          "Such tired was I that I went straight to bed.",
        ],
        ans: "So tired was I that I went straight to bed.",
        exp: "Inversion with 'so + adj': 'So tired was I that…'. Connects directly to the Inversion lesson.",
      },
    ],
    build: [
      {
        sent: "Use 'because' for a direct reason.",
        words: [
          "I", "stayed", "home", "because", "I", "was", "feeling", "ill.",
        ],
        ans: "I stayed home because I was feeling ill.",
      },
      {
        sent: "Use 'owing to' + noun phrase.",
        words: [
          "Owing", "to", "the", "delay,", "we", "missed", "the", "connection.",
        ],
        ans: "Owing to the delay, we missed the connection.",
      },
      {
        sent: "Use 'so… that' with an adjective.",
        words: [
          "The", "speech", "was", "so", "long", "that", "people", "left.",
        ],
        ans: "The speech was so long that people left.",
      },
      {
        sent: "Use 'such a… that' with a noun.",
        words: [
          "It", "was", "such", "a", "loud", "party", "that", "the", "neighbours", "complained.",
        ],
        ans: "It was such a loud party that the neighbours complained.",
      },
    ],
  },
];
