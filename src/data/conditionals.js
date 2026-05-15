// Mixed Conditionals data — three types, each with Learn/Quiz/Build.
//
// Pedagogical structure:
//   1. Foundation — quick refresher of pure 2nd/3rd conditionals (the building
//      blocks of mixed). Many C1 students rush mixed before nailing the basics.
//   2. Past → Present — past cause, present result. Most common mixed form.
//   3. Present → Past — present trait/state, past consequence. Subtler.
//
// Same shape as connectors.js: families → items / quiz / build.

export const conditionalTypes = [
  {
    id: "foundation",
    name: "Foundation: 2nd & 3rd",
    hint: "The building blocks of mixed conditionals",
    accent: "#16A085",
    intro:
      "Before mixing, you need the pure forms cold. A mixed conditional is just one half from a 2nd and one half from a 3rd. Master these first.",
    items: [
      {
        word: "Second Conditional",
        use: "Unreal or hypothetical situation in the present or future. Both halves stay in the present timeframe.",
        example: "If I had more time, I would learn Japanese. (I don't have time now, and I'm not learning it.)",
      },
      {
        word: "Structure: 2nd",
        use: "If + past simple, would / could / might + base form. Use 'were' for all persons in formal English ('If I were you…').",
        example: "If she knew the truth, she would be furious.",
      },
      {
        word: "Third Conditional",
        use: "Unreal situation in the past — a regret or a counterfactual about something that didn't happen.",
        example:
          "If I had studied harder, I would have passed the exam. (I didn't study, so I didn't pass.)",
      },
      {
        word: "Structure: 3rd",
        use: "If + past perfect, would / could / might + have + past participle. Both halves refer to the past.",
        example: "If they had left earlier, they could have caught the train.",
      },
      {
        word: "The hinge: when to mix",
        use: "Mix when cause and effect happen at different times. Past cause + present effect, or present trait + past effect.",
        example:
          "If I had taken the job (past), I would be living in Berlin now (present). → that's a Mixed Conditional.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "If I ___ more money, I would buy a house.",
        opts: ["had", "have had", "would have", "had had"],
        key: "had",
        exp: "Second conditional — present unreal. 'If + past simple' = had.",
      },
      {
        type: "blank",
        sent: "If they had arrived on time, they ___ the opening speech.",
        opts: [
          "would see",
          "would have seen",
          "saw",
          "had seen",
        ],
        key: "would have seen",
        exp: "Third conditional — past unreal. 'Would have + past participle'.",
      },
      {
        type: "blank",
        sent: "If she ___ the meeting yesterday, she would know the agenda.",
        opts: [
          "attended",
          "had attended",
          "would attend",
          "attends",
        ],
        key: "had attended",
        exp: "Mixed: past cause (didn't attend) → present effect (doesn't know). Use 'had + pp' in the if-clause.",
      },
      {
        type: "mcq",
        sent: "Which sentence is a pure third conditional?",
        opts: [
          "If I had known, I would have called you.",
          "If I knew, I would call you.",
          "If I had known, I would tell you now.",
        ],
        ans: "If I had known, I would have called you.",
        exp: "Both halves in the past — pure 3rd conditional.",
      },
      {
        type: "mcq",
        sent: "Which is a pure SECOND conditional?",
        opts: [
          "If I won the lottery, I would travel the world.",
          "If I had won the lottery, I would have travelled.",
          "If I won the lottery, I would have travelled.",
        ],
        ans: "If I won the lottery, I would travel the world.",
        exp: "Past simple + would + base = pure 2nd conditional (present unreal).",
      },
      {
        type: "blank",
        sent: "If I ___ you, I would accept the offer.",
        opts: ["am", "was", "were", "would be"],
        key: "were",
        exp: "Formal English uses 'were' for all persons in the 2nd conditional ('If I were you…').",
      },
    ],
    build: [
      {
        sent: "Build a pure 2nd conditional (present unreal).",
        words: [
          "If",
          "I",
          "knew",
          "the",
          "answer,",
          "I",
          "would",
          "tell",
          "you.",
        ],
        ans: "If I knew the answer, I would tell you.",
      },
      {
        sent: "Build a pure 3rd conditional (past unreal).",
        words: [
          "If",
          "she",
          "had",
          "called,",
          "I",
          "would",
          "have",
          "answered.",
        ],
        ans: "If she had called, I would have answered.",
      },
      {
        sent: "Use 'were' in a formal 2nd conditional.",
        words: [
          "If",
          "I",
          "were",
          "you,",
          "I",
          "would",
          "accept.",
        ],
        ans: "If I were you, I would accept.",
      },
      {
        sent: "Build a 3rd conditional with 'could have'.",
        words: [
          "If",
          "they",
          "had",
          "left",
          "earlier,",
          "they",
          "could",
          "have",
          "caught",
          "the",
          "train.",
        ],
        ans:
          "If they had left earlier, they could have caught the train.",
      },
    ],
  },

  {
    id: "past-to-present",
    name: "Past → Present",
    hint: "Past cause, present result",
    accent: "#D35400",
    intro:
      "Use this when something didn't happen (or did happen) in the past, and the consequence shows up in your present life. This is the most common mixed form — think 'past regret with current effect'.",
    items: [
      {
        word: "The structure",
        use: "If + past perfect, would / could / might + base form.",
        example:
          "If I had taken that job offer, I would live in Berlin now.",
      },
      {
        word: "When to use it",
        use: "When you regret (or are glad about) a past action whose impact is felt today. The 'now' clue is the marker.",
        example:
          "If she had studied medicine, she would be a doctor today.",
      },
      {
        word: "Time markers",
        use: "Words like 'now', 'today', 'currently' in the result clause are tell-tale signs of past→present mixing.",
        example:
          "If I hadn't met you, I wouldn't be this happy now.",
      },
      {
        word: "Negative form",
        use:
          "Often used to express gratitude for a past action: 'If X hadn't happened, I wouldn't be where I am.'",
        example:
          "If my parents hadn't emigrated, I wouldn't be living in Spain.",
      },
      {
        word: "With 'could' and 'might'",
        use:
          "Swap 'would' for 'could' (ability) or 'might' (possibility) to soften the certainty of the result.",
        example:
          "If I had saved more, I could afford a house now.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "If I ___ Spanish at school, I would speak it fluently now.",
        opts: [
          "studied",
          "had studied",
          "would study",
          "have studied",
        ],
        key: "had studied",
        exp: "Past action affects present ability — 'had + past participle' in the if-clause.",
      },
      {
        type: "blank",
        sent:
          "If they had invested in solar back in 2010, they ___ a fortune today.",
        opts: [
          "had",
          "would have had",
          "would have",
          "have",
        ],
        key: "would have",
        exp: "Past investment → present wealth. 'would + base form'.",
      },
      {
        type: "blank",
        sent: "If she ___ that promotion, she wouldn't be looking for a new job now.",
        opts: [
          "got",
          "had got",
          "would get",
          "would have got",
        ],
        key: "had got",
        exp: "Past missed promotion → present job hunt. Past perfect in the if-clause.",
      },
      {
        type: "mcq",
        sent: "Which is a CORRECT Past → Present mixed conditional?",
        opts: [
          "If I had taken the job, I would be richer now.",
          "If I took the job, I would be richer now.",
          "If I had taken the job, I would have been richer now.",
        ],
        ans: "If I had taken the job, I would be richer now.",
        exp:
          "Past perfect (if-clause) + would + base form + 'now' = past→present mixed.",
      },
      {
        type: "blank",
        sent: "If we hadn't moved to London, we ___ in a much smaller flat today.",
        opts: [
          "live",
          "would live",
          "would have lived",
          "lived",
        ],
        key: "would live",
        exp: "Past relocation → present housing. 'would + base form'.",
      },
      {
        type: "mcq",
        sent:
          "Spot the time markers signalling Past → Present mixing:",
        opts: [
          "now, today, currently",
          "yesterday, last year",
          "tomorrow, soon",
        ],
        ans: "now, today, currently",
        exp:
          "Present-time markers in the result clause point to past→present mixing.",
      },
    ],
    build: [
      {
        sent: "Past cause, present result — use 'had + pp' and 'would + base'.",
        words: [
          "If",
          "I",
          "had",
          "saved",
          "more,",
          "I",
          "would",
          "own",
          "a",
          "house",
          "now.",
        ],
        ans:
          "If I had saved more, I would own a house now.",
      },
      {
        sent: "Express present gratitude for a past event.",
        words: [
          "If",
          "we",
          "hadn't",
          "met,",
          "I",
          "wouldn't",
          "be",
          "this",
          "happy",
          "today.",
        ],
        ans:
          "If we hadn't met, I wouldn't be this happy today.",
      },
      {
        sent: "Use 'could' for ability in the present.",
        words: [
          "If",
          "she",
          "had",
          "learned",
          "to",
          "code,",
          "she",
          "could",
          "work",
          "remotely",
          "now.",
        ],
        ans:
          "If she had learned to code, she could work remotely now.",
      },
      {
        sent: "Use 'might' to soften the present outcome.",
        words: [
          "If",
          "he",
          "had",
          "trained",
          "harder,",
          "he",
          "might",
          "be",
          "a",
          "champion",
          "today.",
        ],
        ans:
          "If he had trained harder, he might be a champion today.",
      },
    ],
  },

  {
    id: "present-to-past",
    name: "Present → Past",
    hint: "Present trait, past consequence",
    accent: "#7D3C98",
    intro:
      "Use this when something about who you are now (or always have been) explains why a past event went the way it did. Subtler than past→present, but very C1.",
    items: [
      {
        word: "The structure",
        use: "If + past simple, would / could / might + have + past participle.",
        example:
          "If she weren't so shy, she would have spoken up at the meeting yesterday.",
      },
      {
        word: "When to use it",
        use:
          "When a permanent or current trait, ability or situation caused a specific past event to unfold the way it did.",
        example:
          "If I knew French, I would have understood the film last night.",
      },
      {
        word: "General truths in the if-clause",
        use:
          "The if-clause describes a present-day reality — personality, skill, location, preference. The main clause describes a past consequence.",
        example:
          "If he didn't smoke, he wouldn't have got sick last winter.",
      },
      {
        word: "Distinguishing from 3rd conditional",
        use:
          "Pure 3rd: 'If he had smoked less, he wouldn't have got sick.' (past habit). Mixed: 'If he didn't smoke, he wouldn't have got sick.' (current habit).",
        example:
          "Mixed = the if-clause is a general/present truth, not a past one.",
      },
      {
        word: "With 'were' for all persons",
        use:
          "In formal English, use 'were' instead of 'was' in the if-clause for all persons — same rule as the 2nd conditional.",
        example:
          "If he were more responsible, he wouldn't have lost the contract.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "If I ___ how to swim, I would have helped her in the river.",
        opts: [
          "had known",
          "knew",
          "know",
          "would know",
        ],
        key: "knew",
        exp:
          "Present trait (I don't swim) → past consequence (couldn't help). Past simple in if-clause.",
      },
      {
        type: "blank",
        sent: "If she weren't so disorganised, she ___ the deadline last week.",
        opts: [
          "would meet",
          "had met",
          "would have met",
          "met",
        ],
        key: "would have met",
        exp: "Present trait → past consequence. 'Would have + past participle' in the result.",
      },
      {
        type: "blank",
        sent:
          "If he ___ vegetarian, he would have enjoyed the barbecue.",
        opts: [
          "weren't",
          "hadn't been",
          "isn't",
          "wouldn't be",
        ],
        key: "weren't",
        exp: "Permanent trait (he IS vegetarian) → past consequence (didn't enjoy). Use 'weren't' in formal English.",
      },
      {
        type: "mcq",
        sent: "Which is Present → Past mixed?",
        opts: [
          "If I were taller, I would have made the team last year.",
          "If I had been taller, I would have made the team last year.",
          "If I were taller, I would make the team.",
        ],
        ans: "If I were taller, I would have made the team last year.",
        exp:
          "Present trait (height now) + past consequence (last year's team) = mixed.",
      },
      {
        type: "blank",
        sent: "If they ___ in Madrid, they would have come to the wedding.",
        opts: [
          "lived",
          "had lived",
          "live",
          "would live",
        ],
        key: "lived",
        exp:
          "Present situation (where they live now) → past missed event. Past simple in if-clause.",
      },
      {
        type: "mcq",
        sent:
          "Spot the difference. Which one says it's still her job today?",
        opts: [
          "If she weren't a journalist, she wouldn't have asked those questions.",
          "If she hadn't been a journalist, she wouldn't have asked those questions.",
        ],
        ans:
          "If she weren't a journalist, she wouldn't have asked those questions.",
        exp:
          "Mixed: 'weren't' (present truth — still a journalist). 3rd: 'hadn't been' (past situation, no longer applies).",
      },
    ],
    build: [
      {
        sent: "Present trait, past consequence — use past simple + 'would have'.",
        words: [
          "If",
          "I",
          "weren't",
          "so",
          "shy,",
          "I",
          "would",
          "have",
          "introduced",
          "myself.",
        ],
        ans:
          "If I weren't so shy, I would have introduced myself.",
      },
      {
        sent: "Build a Present → Past mixed about skills.",
        words: [
          "If",
          "he",
          "spoke",
          "Italian,",
          "he",
          "would",
          "have",
          "understood",
          "the",
          "opera.",
        ],
        ans:
          "If he spoke Italian, he would have understood the opera.",
      },
      {
        sent: "Use 'could have' for a missed ability.",
        words: [
          "If",
          "she",
          "lived",
          "closer,",
          "she",
          "could",
          "have",
          "joined",
          "us.",
        ],
        ans:
          "If she lived closer, she could have joined us.",
      },
      {
        sent: "Use 'might have' to soften the past outcome.",
        words: [
          "If",
          "I",
          "were",
          "more",
          "patient,",
          "I",
          "might",
          "have",
          "finished",
          "the",
          "puzzle.",
        ],
        ans:
          "If I were more patient, I might have finished the puzzle.",
      },
    ],
  },
];
