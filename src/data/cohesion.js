// Cohesion & Style — five families covering ellipsis, substitution, parallelism,
// comparisons, and discourse markers.

export const cohesionFamilies = [
  {
    id: "ellipsis",
    name: "Ellipsis",
    hint: "Leaving things out to avoid repetition",
    accent: "#5D4037",
    intro:
      "Ellipsis omits words the reader can recover from context. It's the opposite of repetition and a hallmark of fluent, polished writing. Used badly, it confuses; used well, it tightens prose dramatically.",
    items: [
      {
        word: "Verb phrase ellipsis (after auxiliaries)",
        use: "After auxiliary verbs, the main verb can disappear when it's identical to one already mentioned.",
        example: "She finished the project, and he did too. (= 'and he did finish it too')",
      },
      {
        word: "Ellipsis after 'to'",
        use: "After 'to', the verb can be omitted if context makes it clear. Common with want, mean, plan, hope, ought to.",
        example: "I haven't read the report, but I plan to. (= 'plan to read it')",
      },
      {
        word: "Ellipsis in coordinate clauses",
        use: "Drop repeated subjects and auxiliaries in 'and'/'but' clauses.",
        example: "She opened the door and (she) walked in. / He can swim and (he can) dive.",
      },
      {
        word: "Ellipsis in conditional and time clauses",
        use: "Drop the subject + 'be' in if-clauses, when-clauses, etc., when the subject matches the main clause.",
        example: "If (you are) in doubt, ask. / When (he is) ready, he'll call.",
      },
      {
        word: "Common pitfall",
        use: "Don't ellipt across different verb tenses. The omitted verb must match exactly in form.",
        example: "✓ She has finished, and he has too. ✗ She has finished, and he did too. (different tenses)",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Which is the natural elliptical version?",
        opts: [
          "Tom plays tennis and Lisa plays tennis too.",
          "Tom plays tennis and Lisa does too.",
          "Tom plays tennis and Lisa.",
        ],
        ans: "Tom plays tennis and Lisa does too.",
        exp: "The auxiliary 'does' substitutes for the verb phrase 'plays tennis' — clean and natural.",
      },
      {
        type: "blank",
        sent: "I haven't read the article, but I intend ___.",
        opts: ["to", "to read", "reading", "for it"],
        key: "to",
        hint: "Ellipsis after 'to'.",
        exp: "After 'intend to', the verb 'read it' is omitted because it's obvious from context.",
      },
      {
        type: "mcq",
        sent: "Which sentence has an ELLIPSIS error (mismatched tenses)?",
        opts: [
          "She has finished the report and he has too.",
          "She has finished the report and he did too.",
          "She has finished the report and so has he.",
        ],
        ans: "She has finished the report and he did too.",
        exp: "Present perfect ('has finished') can't be ellipted with past simple ('did'). Auxiliaries must match.",
      },
      {
        type: "blank",
        sent: "Call me when ___ ready.",
        opts: ["you're", "is", "they're", "to be"],
        key: "you're",
        hint: "Time clause with implied subject.",
        exp: "'When (you are) ready' — the subject + 'are' can be dropped if obvious. 'You're ready' is the full form.",
      },
      {
        type: "mcq",
        sent: "Which is the most elegant elliptical answer to 'Can you help me?'",
        opts: [
          "Yes, I can help you.",
          "Yes, I can.",
          "Yes.",
        ],
        ans: "Yes, I can.",
        exp: "Auxiliary ellipsis: 'I can (help you)'. The full phrase is redundant; 'Yes' alone is brusque.",
      },
      {
        type: "blank",
        sent: "She knows the answer, and so ___ I.",
        opts: ["do", "am", "have", "does"],
        key: "do",
        hint: "Match the original auxiliary.",
        exp: "'Knows' is present simple → 'do' as elliptical auxiliary. Connects to So/Neither in the Inversion lesson.",
      },
    ],
    build: [
      {
        sent: "Use ellipsis after 'to'.",
        words: [
          "I", "haven't", "called", "yet,", "but", "I", "plan", "to.",
        ],
        ans: "I haven't called yet, but I plan to.",
      },
      {
        sent: "Use coordinate ellipsis.",
        words: [
          "She", "opened", "the", "door", "and", "walked", "in.",
        ],
        ans: "She opened the door and walked in.",
      },
      {
        sent: "Use elliptical auxiliary.",
        words: [
          "Tom", "loves", "jazz", "and", "Lisa", "does", "too.",
        ],
        ans: "Tom loves jazz and Lisa does too.",
      },
      {
        sent: "Use ellipsis in a conditional.",
        words: [
          "If", "in", "doubt,", "consult", "a", "specialist.",
        ],
        ans: "If in doubt, consult a specialist.",
      },
    ],
  },

  {
    id: "substitution",
    name: "Substitution",
    hint: "One, do, so — avoiding repetition",
    accent: "#0E6655",
    intro:
      "Substitution replaces a word or phrase with a shorter substitute ('one', 'do', 'so', 'not') instead of dropping it entirely. Subtler than ellipsis, equally effective at decluttering writing.",
    items: [
      {
        word: "One / ones (for nouns)",
        use: "Substitutes a previously mentioned countable noun. 'I prefer the red one' (= the red shirt).",
        example: "I lost my umbrella. I need to buy a new one.",
      },
      {
        word: "Do / does / did (for verb phrases)",
        use: "'Do' substitutes a previously mentioned verb phrase. Common in British English.",
        example: "She speaks French better than her brother does. (= speaks French)",
      },
      {
        word: "So (positive content)",
        use: "Substitutes a whole clause after verbs like think, believe, hope, expect, suppose.",
        example: "Is it going to rain? — I think so. (= it's going to rain)",
      },
      {
        word: "Not (negative content)",
        use: "Substitutes a negative clause after the same verbs.",
        example: "Are you coming? — I hope not. (= I hope I'm not coming / it's not happening)",
      },
      {
        word: "Such (referring to a whole concept)",
        use: "'Such' refers back to a previously mentioned situation or characteristic.",
        example: "He told several lies. Such behaviour is unacceptable.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "I don't like this jacket. Can you show me a different ___?",
        opts: ["one", "ones", "it", "such"],
        key: "one",
        hint: "Singular countable substitute.",
        exp: "'One' substitutes a singular countable noun ('jacket'). 'Ones' would be plural.",
      },
      {
        type: "blank",
        sent: "Will it snow tomorrow? — I hope ___.",
        opts: ["not", "no", "don't", "isn't"],
        key: "not",
        hint: "Negative clausal substitute.",
        exp: "'Hope not' substitutes the negative clause 'I hope it won't snow'. 'I hope no' is wrong.",
      },
      {
        type: "blank",
        sent: "Did he pass the exam? — I think ___.",
        opts: ["so", "yes", "it", "such"],
        key: "so",
        hint: "Positive clausal substitute.",
        exp: "'So' substitutes the positive clause 'I think he did pass'. After believe/think/hope, 'so' replaces a positive clause.",
      },
      {
        type: "blank",
        sent: "She speaks Italian better than I ___.",
        opts: ["do", "am", "have", "make"],
        key: "do",
        hint: "Verb substitution.",
        exp: "'Do' substitutes 'speak Italian'. The auxiliary takes over the work of the main verb.",
      },
      {
        type: "blank",
        sent: "He kept interrupting everyone. ___ behaviour is rude.",
        opts: ["Such", "This", "Which", "What"],
        key: "Such",
        hint: "Refers to the previous situation.",
        exp: "'Such' refers back to the whole concept of 'interrupting everyone'. 'Such behaviour' = behaviour like that.",
      },
      {
        type: "mcq",
        sent: "Which is the most natural substitution?",
        opts: [
          "I prefer the blue shirt to the green shirt.",
          "I prefer the blue shirt to the green one.",
          "I prefer the blue shirt to the green it.",
        ],
        ans: "I prefer the blue shirt to the green one.",
        exp: "'One' substitutes 'shirt' to avoid repetition. Without substitution, the sentence reads clumsily.",
      },
    ],
    build: [
      {
        sent: "Substitute a noun with 'one'.",
        words: [
          "I'll", "take", "the", "blue", "one,", "please.",
        ],
        ans: "I'll take the blue one, please.",
      },
      {
        sent: "Substitute a clause with 'so'.",
        words: [
          "Will", "they", "agree?", "—", "I", "believe", "so.",
        ],
        ans: "Will they agree? — I believe so.",
      },
      {
        sent: "Substitute a verb phrase with 'do'.",
        words: [
          "She", "runs", "faster", "than", "I", "do.",
        ],
        ans: "She runs faster than I do.",
      },
      {
        sent: "Substitute a situation with 'such'.",
        words: [
          "Such", "an", "outcome", "was", "entirely", "predictable.",
        ],
        ans: "Such an outcome was entirely predictable.",
      },
    ],
  },

  {
    id: "parallel",
    name: "Parallel Structures",
    hint: "Symmetry in lists and comparisons",
    accent: "#0E4471",
    intro:
      "Parallelism means grammatical items in a list or comparison must have the same form. Breaking parallelism sounds clumsy and is a quick way to spot non-native writing.",
    items: [
      {
        word: "Parallel verb forms in lists",
        use: "If one item is -ing, all should be -ing. If one is to-infinitive, all should be.",
        example: "✓ She enjoys reading, writing, and painting. ✗ She enjoys reading, writing, and to paint.",
      },
      {
        word: "Parallel nouns / phrases",
        use: "Match noun phrases to noun phrases, verb phrases to verb phrases.",
        example: "✓ The job requires hard work, dedication, and patience. ✗ The job requires hard work, dedication, and to be patient.",
      },
      {
        word: "Parallel comparisons",
        use: "When comparing two things, the structures must match.",
        example: "✓ Reading a book is better than watching TV. ✗ Reading a book is better than to watch TV.",
      },
      {
        word: "Parallel paired connectors",
        use: "Both… and / Either… or / Neither… nor / Not only… but also — each connector must be followed by the same kind of element.",
        example: "✓ He is both intelligent and hard-working. ✗ He is both intelligent and works hard.",
      },
      {
        word: "Why C1 writers care",
        use: "Parallel structures aren't just grammar — they create rhythm and emphasis. Compare 'I came, I saw, I conquered' (parallel) to 'I came, I was seeing, and conquest happened' (broken).",
        example: "We will fight, we will resist, and we will prevail.",
      },
    ],
    quiz: [
      {
        type: "mcq",
        sent: "Which sentence is correctly parallel?",
        opts: [
          "She likes hiking, swimming, and to cycle.",
          "She likes hiking, swimming, and cycling.",
          "She likes to hike, swimming, and cycling.",
        ],
        ans: "She likes hiking, swimming, and cycling.",
        exp: "All three items are -ing forms. The other versions mix forms — breaking parallelism.",
      },
      {
        type: "mcq",
        sent: "Pick the parallel version:",
        opts: [
          "The job involves writing reports, dealing with clients, and to manage budgets.",
          "The job involves writing reports, dealing with clients, and managing budgets.",
          "The job involves write reports, deal with clients, and manage budgets.",
        ],
        ans: "The job involves writing reports, dealing with clients, and managing budgets.",
        exp: "All three -ing forms after 'involves'. Mixing 'to manage' breaks the parallelism.",
      },
      {
        type: "mcq",
        sent: "Which is correctly parallel with 'not only… but also'?",
        opts: [
          "He is not only smart but also works hard.",
          "He is not only smart but also hard-working.",
          "Not only he is smart but also hard-working.",
        ],
        ans: "He is not only smart but also hard-working.",
        exp: "'Not only X but also Y' requires X and Y to be the same kind of element. Adjective + adjective here.",
      },
      {
        type: "mcq",
        sent: "Spot the parallelism error:",
        opts: [
          "Reading is more enjoyable than watching TV.",
          "Reading is more enjoyable than to watch TV.",
          "It is more enjoyable to read than to watch TV.",
        ],
        ans: "Reading is more enjoyable than to watch TV.",
        exp: "'Reading' (-ing) vs 'to watch' (to-infinitive) — broken parallelism. Either use both -ing or both to-infinitive.",
      },
      {
        type: "mcq",
        sent: "Which list is parallel?",
        opts: [
          "The course covers reading, writing, and listening skills.",
          "The course covers reading, writing, and how to listen.",
          "The course covers to read, writing, and listening.",
        ],
        ans: "The course covers reading, writing, and listening skills.",
        exp: "Three -ing nouns ('reading, writing, listening'). The others mix forms.",
      },
      {
        type: "mcq",
        sent: "Which paired connector is correctly parallel?",
        opts: [
          "She is either at home or in the office.",
          "She is either at home or works in the office.",
          "Either she is at home or in the office.",
        ],
        ans: "She is either at home or in the office.",
        exp: "'Either… or' — both followed by prepositional phrases ('at home' / 'in the office'). Same kind of element.",
      },
    ],
    build: [
      {
        sent: "Parallel list of -ing forms.",
        words: [
          "She", "enjoys", "reading,", "writing,", "and", "travelling.",
        ],
        ans: "She enjoys reading, writing, and travelling.",
      },
      {
        sent: "Parallel paired structure (not only… but also).",
        words: [
          "He", "is", "not", "only", "creative", "but", "also", "disciplined.",
        ],
        ans: "He is not only creative but also disciplined.",
      },
      {
        sent: "Parallel comparison.",
        words: [
          "Walking", "is", "healthier", "than", "driving.",
        ],
        ans: "Walking is healthier than driving.",
      },
      {
        sent: "Parallel rhythm for emphasis.",
        words: [
          "We", "came,", "we", "saw,", "we", "conquered.",
        ],
        ans: "We came, we saw, we conquered.",
      },
    ],
  },

  {
    id: "comparisons",
    name: "Advanced Comparisons",
    hint: "The more… the more, far better, etc.",
    accent: "#A04000",
    intro:
      "C1 comparisons go beyond 'more' and 'than'. Mastering these structures lets you express subtle gradations of difference.",
    items: [
      {
        word: "The + comparative, the + comparative",
        use: "Two parallel changes — as one increases, so does the other.",
        example: "The more you read, the more you learn.",
      },
      {
        word: "Far / much / considerably + comparative",
        use: "Intensify a comparative. 'Much better', 'far worse', 'considerably more expensive'.",
        example: "This route is far quicker than the other one.",
      },
      {
        word: "Increasingly + adjective / verb",
        use: "Indicates a gradual change in one direction. Formal and academic.",
        example: "The situation is becoming increasingly complex.",
      },
      {
        word: "By far + superlative",
        use: "Reinforces a superlative — 'by far the best'.",
        example: "She is by far the most talented student in the class.",
      },
      {
        word: "Not nearly as / Nowhere near as",
        use: "Strong negative comparison.",
        example: "This year's results are nowhere near as good as last year's.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "The more you practise, ___ better you'll get.",
        opts: ["the", "more", "a", "much"],
        key: "the",
        hint: "Parallel 'the + comparative' structure.",
        exp: "'The more X, the more Y' is a fixed parallel structure. Both halves need 'the'.",
      },
      {
        type: "blank",
        sent: "This problem is ___ more difficult than I expected.",
        opts: ["far", "very", "really", "so"],
        key: "far",
        hint: "Intensifier before a comparative.",
        exp: "Use 'far/much/considerably' before comparatives. 'Very/really/so' work before adjectives, not before comparatives.",
      },
      {
        type: "blank",
        sent: "Cities are becoming ___ crowded.",
        opts: ["increasingly", "very", "more and more more", "much"],
        key: "increasingly",
        hint: "Gradual change.",
        exp: "'Increasingly' is the most formal way to express a gradual change. 'More and more' also works informally.",
      },
      {
        type: "blank",
        sent: "She is ___ the most experienced candidate.",
        opts: ["by far", "far", "much", "very"],
        key: "by far",
        hint: "Reinforces a superlative.",
        exp: "'By far' reinforces a superlative: 'by far the best/most/largest'. 'Much' works before comparatives only.",
      },
      {
        type: "mcq",
        sent: "Which is the strongest negative comparison?",
        opts: [
          "This is less good than last year's.",
          "This is nowhere near as good as last year's.",
          "This is not as good as last year's.",
        ],
        ans: "This is nowhere near as good as last year's.",
        exp: "'Nowhere near as' is the most emphatic of the three — used when the gap is huge.",
      },
      {
        type: "mcq",
        sent: "Pick the correct intensified comparative:",
        opts: [
          "She is much taller than her sister.",
          "She is very taller than her sister.",
          "She is so taller than her sister.",
        ],
        ans: "She is much taller than her sister.",
        exp: "Comparatives are intensified with 'much/far/considerably', not 'very/so' (those modify adjectives, not comparatives).",
      },
    ],
    build: [
      {
        sent: "Use 'The more… the more'.",
        words: [
          "The", "harder", "you", "work,", "the", "luckier", "you", "get.",
        ],
        ans: "The harder you work, the luckier you get.",
      },
      {
        sent: "Use 'far + comparative'.",
        words: [
          "This", "version", "is", "far", "better", "than", "the", "previous", "one.",
        ],
        ans: "This version is far better than the previous one.",
      },
      {
        sent: "Use 'increasingly + adjective'.",
        words: [
          "The", "task", "became", "increasingly", "difficult", "over", "time.",
        ],
        ans: "The task became increasingly difficult over time.",
      },
      {
        sent: "Use 'by far + superlative'.",
        words: [
          "This", "is", "by", "far", "the", "most", "interesting", "book", "I've", "read.",
        ],
        ans: "This is by far the most interesting book I've read.",
      },
    ],
  },

  {
    id: "discourse-markers",
    name: "Discourse Markers",
    hint: "Well, mind you, actually, indeed",
    accent: "#6C3483",
    intro:
      "Discourse markers don't add information — they manage the conversation: they soften, emphasise, hedge, contrast, or signal a shift. C1 speakers use them naturally; B2 speakers often don't.",
    items: [
      {
        word: "Well",
        use: "Buys time, signals a pause for thought, or softens a response that might be unexpected.",
        example: "Well, I'm not entirely sure, but I'd say yes.",
      },
      {
        word: "Mind you / Actually",
        use: "'Mind you' qualifies what you just said. 'Actually' corrects or surprises — often gentler than 'in fact'.",
        example: "He's quite arrogant. Mind you, he's also extremely talented. / I thought she was Spanish. Actually, she's Portuguese.",
      },
      {
        word: "Indeed / In fact",
        use: "'Indeed' confirms or intensifies. 'In fact' often introduces something more accurate or surprising than what was said.",
        example: "It was difficult. Indeed, it was the hardest thing I've ever done. / I thought he was lying. In fact, he was telling the truth.",
      },
      {
        word: "By the way / Incidentally",
        use: "Introduce a side topic — formal version is 'incidentally'.",
        example: "I'll bring the documents tomorrow. By the way, how's your mother?",
      },
      {
        word: "Anyway / In any case",
        use: "Returns to the main thread after a digression, or dismisses a previous point.",
        example: "I'm not sure he agrees, but anyway, we have to decide today.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "___, I never thought she'd accept the job.",
        opts: ["Frankly", "Frank", "By the way", "However"],
        key: "Frankly",
        hint: "Adverb expressing honesty.",
        exp: "'Frankly' signals you're being candid. 'However' contrasts; 'by the way' introduces a side topic.",
      },
      {
        type: "blank",
        sent: "He's grumpy in the mornings. ___, he's a good colleague overall.",
        opts: ["Mind you", "Actually", "However then", "On the contrary"],
        key: "Mind you",
        hint: "Qualifying the previous claim.",
        exp: "'Mind you' adds a softening qualification. 'Actually' would correct rather than qualify.",
      },
      {
        type: "blank",
        sent: "I thought she was British. ___, she's Australian.",
        opts: ["Actually", "Anyway", "Indeed", "By the way"],
        key: "Actually",
        hint: "Correcting a previous assumption.",
        exp: "'Actually' politely corrects. 'In fact' would also work here.",
      },
      {
        type: "blank",
        sent: "The meeting was tough. ___, it was a complete disaster.",
        opts: ["Indeed", "Actually", "Anyway", "By the way"],
        key: "Indeed",
        hint: "Intensifying the previous claim.",
        exp: "'Indeed' confirms and intensifies. 'Actually' or 'in fact' might suggest a correction instead.",
      },
      {
        type: "mcq",
        sent: "Which discourse marker is most appropriate to return to the main topic after a digression?",
        opts: ["Anyway", "Indeed", "Actually", "Mind you"],
        ans: "Anyway",
        exp: "'Anyway' is the standard way to come back to the main thread. 'In any case' is its formal equivalent.",
      },
      {
        type: "mcq",
        sent: "Pick the most NATURAL way to soften a tentative answer.",
        opts: [
          "Well, I'm not entirely sure, but…",
          "Listen, I don't know, but…",
          "Honestly, no idea, but…",
        ],
        ans: "Well, I'm not entirely sure, but…",
        exp: "'Well' + 'not entirely sure' is the classic polite hedge. The others are too blunt.",
      },
    ],
    build: [
      {
        sent: "Use 'Mind you' to qualify.",
        words: [
          "It", "was", "expensive.", "Mind", "you,", "the", "quality", "was", "excellent.",
        ],
        ans: "It was expensive. Mind you, the quality was excellent.",
      },
      {
        sent: "Use 'Actually' to correct.",
        words: [
          "I", "thought", "he", "was", "joking.", "Actually,", "he", "was", "serious.",
        ],
        ans: "I thought he was joking. Actually, he was serious.",
      },
      {
        sent: "Use 'By the way' to introduce a side topic.",
        words: [
          "I'll", "see", "you", "tomorrow.", "By", "the", "way,", "happy", "birthday!",
        ],
        ans: "I'll see you tomorrow. By the way, happy birthday!",
      },
      {
        sent: "Use 'Anyway' to return to the topic.",
        words: [
          "Anyway,", "as", "I", "was", "saying,", "the", "deadline", "is", "Friday.",
        ],
        ans: "Anyway, as I was saying, the deadline is Friday.",
      },
    ],
  },
];
