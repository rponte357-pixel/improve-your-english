// Modal Deduction data — three "families" organised pedagogically:
//   1. Present deduction — modals for current situations
//   2. Past deduction — modals + have + past participle
//   3. Negative deduction — can't / couldn't have, with the typical pitfalls
//
// Splitting by tense (present vs past) is the cleanest division for a learner
// because the structures are physically different. The negative family pulls
// out the common "mustn't vs can't" confusion, which is a classic C1 trap.

export const modalFamilies = [
  {
    id: "present",
    name: "Present Deduction",
    hint: "Drawing conclusions about now",
    accent: "#16A085",
    intro:
      "Use these modals when you reason about a present situation. The certainty scale runs from 'must' (near-certain) to 'might/may/could' (possible).",
    items: [
      {
        word: "Must (be / do)",
        use: "Strong deduction — you're sure based on evidence. About 95% certain.",
        example:
          "Her lights are on and her car's outside — she must be home.",
      },
      {
        word: "Can't (be / do)",
        use: "Strong negative deduction — you're sure it's NOT true. Never use 'mustn't' for deduction.",
        example:
          "He can't be the thief — he was with me all evening.",
      },
      {
        word: "Could / Might / May (be)",
        use: "Tentative — about 40-60% sure. All three are roughly interchangeable for present deduction.",
        example:
          "It might be raining tomorrow. I'm not sure.",
      },
      {
        word: "Should / Ought to (be)",
        use: "Expectation based on logic — what's reasonable to assume.",
        example:
          "The train should be here by now. (it usually arrives on time)",
      },
      {
        word: "Common pitfall: mustn't vs can't",
        use:
          "'Mustn't' = prohibition (you're not allowed). 'Can't' = deduction (it's impossible). Never mix them.",
        example:
          "You mustn't smoke here. (rule) — He can't be French; he doesn't speak the language. (deduction)",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent:
          "Look at all those people queueing. The restaurant ___ be excellent.",
        opts: ["must", "can't", "mustn't", "should"],
        key: "must",
        exp:
          "Strong positive deduction from evidence (the queue) → 'must'.",
      },
      {
        type: "blank",
        sent:
          "She speaks fluent Mandarin and Cantonese. She ___ be a complete beginner.",
        opts: ["mustn't", "can't", "might not", "shouldn't"],
        key: "can't",
        exp:
          "Strong negative deduction. 'Mustn't' would mean she's forbidden — wrong here.",
      },
      {
        type: "blank",
        sent:
          "I'm not sure where my keys are. They ___ be in the kitchen.",
        opts: ["must", "can't", "might", "should"],
        key: "might",
        exp:
          "Tentative deduction — you're guessing, not sure.",
      },
      {
        type: "mcq",
        sent:
          "Which sentence is CORRECT?",
        opts: [
          "He must be the new manager — I've never seen him before.",
          "He mustn't be the new manager — I've never seen him before.",
        ],
        ans:
          "He must be the new manager — I've never seen him before.",
        exp:
          "Positive deduction with evidence (someone new) → 'must'.",
      },
      {
        type: "blank",
        sent:
          "The package was sent on Monday. It ___ arrive today or tomorrow.",
        opts: ["should", "must", "can't", "might not"],
        key: "should",
        exp:
          "Logical expectation based on normal delivery times → 'should'.",
      },
      {
        type: "mcq",
        sent:
          "Which one expresses PROHIBITION (not deduction)?",
        opts: [
          "You mustn't tell anyone about this.",
          "You can't be serious!",
          "You might be right.",
        ],
        ans:
          "You mustn't tell anyone about this.",
        exp:
          "'Mustn't' = you're forbidden. 'Can't' for deduction, 'might' for tentative deduction.",
      },
    ],
    build: [
      {
        sent: "Use 'must' for strong positive deduction.",
        words: [
          "She",
          "must",
          "be",
          "exhausted",
          "after",
          "that",
          "marathon.",
        ],
        ans: "She must be exhausted after that marathon.",
      },
      {
        sent: "Use 'can't' for strong negative deduction.",
        words: [
          "He",
          "can't",
          "be",
          "at",
          "work;",
          "his",
          "car",
          "is",
          "in",
          "the",
          "driveway.",
        ],
        ans:
          "He can't be at work; his car is in the driveway.",
      },
      {
        sent: "Use 'might' to express possibility.",
        words: [
          "They",
          "might",
          "be",
          "stuck",
          "in",
          "traffic.",
        ],
        ans: "They might be stuck in traffic.",
      },
      {
        sent: "Use 'should' for logical expectation.",
        words: [
          "The",
          "results",
          "should",
          "be",
          "ready",
          "by",
          "tomorrow.",
        ],
        ans: "The results should be ready by tomorrow.",
      },
    ],
  },

  {
    id: "past",
    name: "Past Deduction",
    hint: "Drawing conclusions about what happened",
    accent: "#C0392B",
    intro:
      "To deduce about the past, take the present modal and add 'have + past participle'. The certainty scale stays the same.",
    items: [
      {
        word: "Must have + past participle",
        use:
          "Strong deduction about a past event. You're sure based on evidence available now.",
        example:
          "The grass is wet — it must have rained during the night.",
      },
      {
        word: "Might / May / Could have + past participle",
        use:
          "Tentative past deduction. All three work; 'could have' often implies a possibility considered later.",
        example:
          "I can't find my wallet. I might have left it at the café.",
      },
      {
        word: "Should / Ought to have + past participle",
        use:
          "Expectation about the past — what you assumed would happen. Often used with a hint of surprise.",
        example:
          "The package should have arrived yesterday. (but apparently didn't)",
      },
      {
        word: "Structure reminder",
        use:
          "Modal NEVER changes form. The 'have' stays as 'have' (not 'had'). The main verb is always past participle.",
        example:
          "She must have left already. (not 'must had left' or 'must have leave')",
      },
      {
        word: "Contracted forms in speech",
        use:
          "'Must've', 'might've', 'should've' — common in spoken English. Written 'must of' is a frequent error you'll see online; it's wrong.",
        example:
          "He must've forgotten our appointment. (✓) — He must of forgotten… (✗)",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent:
          "The window is broken and the jewellery is gone. Someone ___ broken in last night.",
        opts: [
          "must have",
          "should have",
          "might not have",
          "can't have",
        ],
        key: "must have",
        exp: "Strong deduction with clear evidence → 'must have + past participle'.",
      },
      {
        type: "blank",
        sent:
          "I can't find my phone. I ___ left it in the taxi.",
        opts: [
          "must have",
          "might have",
          "can't have",
          "should have",
        ],
        key: "might have",
        exp:
          "Tentative guess about the past → 'might have + past participle'.",
      },
      {
        type: "blank",
        sent:
          "She got the job! She ___ done well in the interview.",
        opts: [
          "must have",
          "can't have",
          "might not have",
          "shouldn't have",
        ],
        key: "must have",
        exp:
          "Strong positive deduction from a known outcome.",
      },
      {
        type: "mcq",
        sent: "Which sentence is grammatically CORRECT?",
        opts: [
          "He must have forgotten the meeting.",
          "He must had forgotten the meeting.",
          "He must has forgotten the meeting.",
        ],
        ans: "He must have forgotten the meeting.",
        exp:
          "Modal + have + past participle. Never 'had' or 'has' after a modal.",
      },
      {
        type: "blank",
        sent:
          "The parcel ___ arrived by now — I sent it three weeks ago!",
        opts: [
          "should have",
          "must have",
          "can have",
          "might have",
        ],
        key: "should have",
        exp:
          "Past expectation that didn't happen → 'should have + past participle'.",
      },
      {
        type: "mcq",
        sent: "Which spelling is correct?",
        opts: [
          "He must've called while I was out.",
          "He must of called while I was out.",
        ],
        ans: "He must've called while I was out.",
        exp:
          "'Must've' is the contraction of 'must have'. 'Must of' is a common mishearing — always wrong in writing.",
      },
    ],
    build: [
      {
        sent: "Use 'must have' for strong past deduction.",
        words: [
          "They",
          "must",
          "have",
          "left",
          "very",
          "early.",
        ],
        ans: "They must have left very early.",
      },
      {
        sent: "Use 'might have' for tentative guessing.",
        words: [
          "I",
          "might",
          "have",
          "left",
          "the",
          "lights",
          "on.",
        ],
        ans: "I might have left the lights on.",
      },
      {
        sent: "Use 'should have' for unmet expectation.",
        words: [
          "The",
          "train",
          "should",
          "have",
          "arrived",
          "by",
          "now.",
        ],
        ans: "The train should have arrived by now.",
      },
      {
        sent: "Use 'could have' to suggest a possibility.",
        words: [
          "She",
          "could",
          "have",
          "missed",
          "the",
          "announcement.",
        ],
        ans: "She could have missed the announcement.",
      },
    ],
  },

  {
    id: "negative",
    name: "Negative Deduction",
    hint: "'Can't have', 'couldn't have' and the pitfalls",
    accent: "#5B2C6F",
    intro:
      "Negative deduction has its own quirks. 'Mustn't' is never used for deduction — that's the most common C1 mistake. Get this family right and your speech sounds noticeably more native.",
    items: [
      {
        word: "Can't have + past participle",
        use:
          "Strong negative past deduction — you're sure it didn't happen.",
        example:
          "She can't have seen me — I was hiding behind the door.",
      },
      {
        word: "Couldn't have + past participle",
        use:
          "Identical meaning to 'can't have' in this context. Slightly more formal.",
        example:
          "He couldn't have been the burglar; he was abroad that week.",
      },
      {
        word: "Might / May not have + past participle",
        use:
          "Tentative negative — 'perhaps not'.",
        example:
          "They might not have received our message.",
      },
      {
        word: "The classic trap: mustn't have",
        use:
          "'Mustn't' is for prohibition, not deduction. For 'I'm sure they didn't', say 'can't have' or 'couldn't have' — never 'mustn't have'.",
        example:
          "✗ She mustn't have seen us. → ✓ She can't have seen us.",
      },
      {
        word: "Shouldn't have + past participle",
        use:
          "Two meanings depending on context: (1) past expectation unmet — 'I'm surprised it happened'. (2) regret/criticism — 'it was a bad idea'.",
        example:
          "You shouldn't have spent so much money on me! (criticism / surprise at the gift)",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "She ___ stolen the money — she was with me the whole time.",
        opts: [
          "mustn't have",
          "can't have",
          "shouldn't have",
          "might not have",
        ],
        key: "can't have",
        exp:
          "Strong negative past deduction. 'Mustn't have' is wrong — that would be a prohibition.",
      },
      {
        type: "blank",
        sent: "I told him at 9, but he hasn't replied. He ___ seen the message.",
        opts: [
          "can't have",
          "might not have",
          "mustn't have",
          "shouldn't have",
        ],
        key: "might not have",
        exp:
          "Tentative — maybe he hasn't seen it yet.",
      },
      {
        type: "mcq",
        sent: "Which sentence is INCORRECT for deduction?",
        opts: [
          "She can't have left without saying goodbye.",
          "She couldn't have left without saying goodbye.",
          "She mustn't have left without saying goodbye.",
        ],
        ans: "She mustn't have left without saying goodbye.",
        exp:
          "'Mustn't have' is never used for deduction. Use 'can't have' or 'couldn't have'.",
      },
      {
        type: "blank",
        sent: "He looks furious. He ___ liked my email.",
        opts: [
          "can't have",
          "must have",
          "shouldn't have",
          "may have",
        ],
        key: "can't have",
        exp:
          "Strong negative deduction from his angry expression.",
      },
      {
        type: "mcq",
        sent:
          "'You shouldn't have done that!' can express…",
        opts: [
          "criticism, but also surprise / gratitude at a generous act",
          "a future prohibition",
          "a deduction about who did it",
        ],
        ans:
          "criticism, but also surprise / gratitude at a generous act",
        exp:
          "Context decides: 'You shouldn't have spent so much on me!' is often warm, not critical.",
      },
      {
        type: "blank",
        sent:
          "The light was off when I got home, so my flatmate ___ been there.",
        opts: [
          "couldn't have",
          "shouldn't have",
          "mustn't have",
          "may not",
        ],
        key: "couldn't have",
        exp:
          "Strong negative deduction. 'Couldn't have' and 'can't have' both work; 'mustn't have' is wrong.",
      },
    ],
    build: [
      {
        sent: "Use 'can't have' for strong negative past deduction.",
        words: [
          "He",
          "can't",
          "have",
          "finished",
          "the",
          "report",
          "already.",
        ],
        ans:
          "He can't have finished the report already.",
      },
      {
        sent: "Use 'couldn't have' (more formal alternative).",
        words: [
          "She",
          "couldn't",
          "have",
          "known",
          "about",
          "the",
          "party.",
        ],
        ans:
          "She couldn't have known about the party.",
      },
      {
        sent: "Use 'might not have' for tentative negative.",
        words: [
          "They",
          "might",
          "not",
          "have",
          "received",
          "the",
          "invitation.",
        ],
        ans:
          "They might not have received the invitation.",
      },
      {
        sent:
          "Use 'shouldn't have' (warm surprise at a generous act).",
        words: [
          "Oh,",
          "you",
          "shouldn't",
          "have",
          "bought",
          "me",
          "flowers!",
        ],
        ans:
          "Oh, you shouldn't have bought me flowers!",
      },
    ],
  },
];
