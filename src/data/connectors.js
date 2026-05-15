// Connectors lesson data — same shape as inversion.js but with one
// theory style: each family lists its connectors with a usage note and
// an example. Quiz mixes MCQ + fill-blank. Build uses word tiles.

export const connectorFamilies = [
  {
    id: "contrast",
    name: "Contrast",
    hint: "Showing opposition between ideas",
    accent: "#C0392B",
    intro:
      "Use these to mark a contrast or opposition between two ideas. Typical of formal essays, op-eds and academic writing.",
    items: [
      {
        word: "Nevertheless",
        use: "Strong contrast. Goes at the start of a sentence, followed by a comma. Synonymous with 'however' but more formal.",
        example:
          "The proposal was widely criticised. Nevertheless, the committee approved it.",
      },
      {
        word: "Nonetheless",
        use: "Virtually identical to 'nevertheless'. Slightly more emphatic; ideal in writing.",
        example:
          "The evidence was inconclusive. Nonetheless, the jury reached a verdict.",
      },
      {
        word: "Conversely",
        use: "Introduces an opposite idea — useful for comparing two opposite cases.",
        example:
          "Northern regions saw heavy rainfall. Conversely, the south experienced drought.",
      },
      {
        word: "Albeit",
        use: "Means 'although' but is followed by an adjective or phrase, not a clause.",
        example: "She accepted the offer, albeit reluctantly.",
      },
      {
        word: "On the contrary",
        use: "Used to reject a previous statement and assert the opposite.",
        example:
          "He doesn't dislike his job — on the contrary, he finds it deeply fulfilling.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent:
          "The technology is extremely expensive. ___, it has the potential to save thousands of lives.",
        opts: ["Moreover", "Nonetheless", "Consequently", "Likewise"],
        key: "Nonetheless",
        exp: "Contrast: the cost is bad, the potential is good — 'Nonetheless' marks the contrast.",
      },
      {
        type: "blank",
        sent:
          "Most students prefer working in groups. ___, a small minority thrive in solitude.",
        opts: ["Conversely", "Therefore", "Likewise", "Hence"],
        key: "Conversely",
        exp: "Two opposite cases (group vs solitary) — 'Conversely' marks the opposition.",
      },
      {
        type: "blank",
        sent: "She agreed to help, ___ with some reservations.",
        opts: ["albeit", "however", "whereas", "moreover"],
        key: "albeit",
        exp: "'Albeit' is followed by a phrase ('with some reservations'), not a clause.",
      },
      {
        type: "mcq",
        sent: "Which sentence uses 'on the contrary' correctly?",
        opts: [
          "I love the city. On the contrary, it's noisy.",
          "I don't hate the city. On the contrary, I love it.",
        ],
        ans: "I don't hate the city. On the contrary, I love it.",
        exp: "'On the contrary' rejects a previous (often negative) statement.",
      },
      {
        type: "blank",
        sent:
          "The project was delivered on time. ___, the budget was exceeded by 20%.",
        opts: ["Nevertheless", "Furthermore", "Hence", "Likewise"],
        key: "Nevertheless",
        exp: "Positive (on time) contrasts with negative (over budget) — 'Nevertheless'.",
      },
      {
        type: "mcq",
        sent: "Pick the correctly punctuated sentence with 'albeit'.",
        opts: [
          "She finished the marathon, albeit slowly.",
          "She finished the marathon, albeit she was slow.",
        ],
        ans: "She finished the marathon, albeit slowly.",
        exp: "'Albeit' takes an adjective/phrase, not a full clause.",
      },
    ],
    build: [
      {
        sent: "Use 'Nevertheless' to link these two ideas.",
        words: [
          "The",
          "proposal",
          "was",
          "controversial.",
          "Nevertheless,",
          "it",
          "passed.",
        ],
        ans: "The proposal was controversial. Nevertheless, it passed.",
      },
      {
        sent: "Use 'Conversely' to contrast the two trends.",
        words: [
          "Exports",
          "rose",
          "sharply.",
          "Conversely,",
          "imports",
          "declined.",
        ],
        ans: "Exports rose sharply. Conversely, imports declined.",
      },
      {
        sent: "Use 'albeit' to add a qualifying phrase.",
        words: ["He", "accepted", "the", "deal,", "albeit", "reluctantly."],
        ans: "He accepted the deal, albeit reluctantly.",
      },
      {
        sent: "Use 'On the contrary' to reject the assumption.",
        words: [
          "She",
          "isn't",
          "shy.",
          "On",
          "the",
          "contrary,",
          "she",
          "loves",
          "public",
          "speaking.",
        ],
        ans:
          "She isn't shy. On the contrary, she loves public speaking.",
      },
    ],
  },

  {
    id: "addition",
    name: "Addition",
    hint: "Adding extra information",
    accent: "#27AE60",
    intro:
      "These connectors add a related idea to the previous one. They're staples of formal essays where you build an argument point by point.",
    items: [
      {
        word: "Furthermore",
        use: "Adds a stronger or more important point. Always followed by a comma when at the start.",
        example:
          "The new policy will boost productivity. Furthermore, it will lower costs.",
      },
      {
        word: "Moreover",
        use: "Very similar to 'furthermore'. Slightly more emphatic and common in academic writing.",
        example:
          "The argument lacks evidence. Moreover, the data has been disputed.",
      },
      {
        word: "In addition (to)",
        use: "'In addition' stands alone with a comma; 'in addition to' is followed by a noun.",
        example:
          "She speaks three languages. In addition, she's fluent in sign language.",
      },
      {
        word: "Likewise",
        use: "Means 'similarly'. Used when the second idea works the same way as the first.",
        example:
          "European markets fell on Monday. Likewise, Asian markets dropped overnight.",
      },
      {
        word: "What is more",
        use: "Slightly less formal than 'furthermore', often used in spoken argumentation.",
        example:
          "The trip was exhausting. What is more, it was a waste of money.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent:
          "The candidate has extensive experience. ___, she speaks four languages.",
        opts: ["Furthermore", "Nevertheless", "Conversely", "Hence"],
        key: "Furthermore",
        exp: "Adding a stronger point — classic 'Furthermore'.",
      },
      {
        type: "blank",
        sent:
          "European markets fell sharply yesterday. ___, Asian markets opened lower this morning.",
        opts: ["Likewise", "Albeit", "Despite", "On the contrary"],
        key: "Likewise",
        exp: "Both cases behave the same way — 'Likewise' = similarly.",
      },
      {
        type: "blank",
        sent:
          "The treatment is highly effective. ___, it has minimal side effects.",
        opts: ["Moreover", "However", "Hence", "Conversely"],
        key: "Moreover",
        exp: "Adding a second positive point — 'Moreover'.",
      },
      {
        type: "mcq",
        sent: "Which sentence is correctly written?",
        opts: [
          "In addition to her degree, she has 10 years of experience.",
          "In addition her degree, she has 10 years of experience.",
        ],
        ans: "In addition to her degree, she has 10 years of experience.",
        exp: "'In addition to' is followed by a noun. 'In addition' stands alone with a comma.",
      },
      {
        type: "blank",
        sent: "The hotel was overpriced. ___, the service was terrible.",
        opts: ["What is more", "Albeit", "Conversely", "Therefore"],
        key: "What is more",
        exp: "Adding a second complaint — 'What is more'.",
      },
      {
        type: "mcq",
        sent: "Pick the more formal addition connector.",
        opts: ["Furthermore", "And also"],
        ans: "Furthermore",
        exp: "'Furthermore' belongs to formal/academic register; 'and also' is colloquial.",
      },
    ],
    build: [
      {
        sent: "Use 'Furthermore' to add a second point.",
        words: [
          "The",
          "evidence",
          "is",
          "weak.",
          "Furthermore,",
          "it",
          "is",
          "outdated.",
        ],
        ans: "The evidence is weak. Furthermore, it is outdated.",
      },
      {
        sent: "Use 'Likewise' to draw a parallel.",
        words: [
          "Tom",
          "passed",
          "the",
          "exam.",
          "Likewise,",
          "Sarah",
          "got",
          "top",
          "marks.",
        ],
        ans: "Tom passed the exam. Likewise, Sarah got top marks.",
      },
      {
        sent: "Use 'In addition to' to introduce extra qualifications.",
        words: [
          "In",
          "addition",
          "to",
          "her",
          "degree,",
          "she",
          "has",
          "a",
          "diploma.",
        ],
        ans: "In addition to her degree, she has a diploma.",
      },
      {
        sent: "Use 'Moreover' to reinforce the argument.",
        words: [
          "The",
          "plan",
          "is",
          "costly.",
          "Moreover,",
          "it",
          "is",
          "impractical.",
        ],
        ans: "The plan is costly. Moreover, it is impractical.",
      },
    ],
  },

  {
    id: "cause",
    name: "Cause & Effect",
    hint: "Linking reason and consequence",
    accent: "#2980B9",
    intro:
      "These connectors signal that one idea is the consequence of another. Essential for argumentative writing.",
    items: [
      {
        word: "Consequently",
        use: "Introduces a logical result. More formal than 'so'.",
        example:
          "The data was incomplete. Consequently, the conclusions are questionable.",
      },
      {
        word: "Therefore",
        use: "Classic logical connector — links premise to conclusion.",
        example: "All humans are mortal. Therefore, Socrates is mortal.",
      },
      {
        word: "Hence",
        use: "Very formal. Often used in academic and legal writing.",
        example: "He had no alibi. Hence, the police's suspicion grew.",
      },
      {
        word: "Accordingly",
        use: "Means 'in accordance with what was said'. Slightly more formal.",
        example:
          "Demand has fallen. Accordingly, production will be reduced.",
      },
      {
        word: "As a result",
        use: "Less formal, but very common. Always followed by a comma.",
        example:
          "Sales dropped 30% last quarter. As a result, several stores will close.",
      },
      {
        word: "Thus",
        use: "Very formal, often used at the start of a concluding sentence.",
        example:
          "The variables are independent. Thus, the correlation is spurious.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "The research was flawed. ___, the results were considered invalid.",
        opts: ["Hence", "Albeit", "Conversely", "Likewise"],
        key: "Hence",
        exp: "Logical consequence — 'Hence' marks the conclusion from the premise.",
      },
      {
        type: "blank",
        sent: "Demand has decreased. ___, prices have fallen.",
        opts: ["Consequently", "Nevertheless", "Furthermore", "Albeit"],
        key: "Consequently",
        exp: "Lower demand causes lower prices — clear cause and effect.",
      },
      {
        type: "blank",
        sent:
          "All the witnesses agreed on the timeline. ___, the suspect's alibi collapsed.",
        opts: ["Therefore", "Moreover", "Likewise", "On the contrary"],
        key: "Therefore",
        exp: "Logical conclusion from agreed facts — 'Therefore'.",
      },
      {
        type: "blank",
        sent: "Profits have soared this year. ___, bonuses will be doubled.",
        opts: ["Accordingly", "Nevertheless", "Whereas", "Albeit"],
        key: "Accordingly",
        exp: "In line with the profits, bonuses follow — 'Accordingly'.",
      },
      {
        type: "blank",
        sent: "He missed the deadline. ___, his application was rejected.",
        opts: ["As a result", "Conversely", "Furthermore", "Albeit"],
        key: "As a result",
        exp: "Direct consequence of missing the deadline.",
      },
      {
        type: "mcq",
        sent: "Which is the MOST formal cause-effect connector?",
        opts: ["So", "Thus", "And then"],
        ans: "Thus",
        exp: "'Thus' is the most formal of the three.",
      },
    ],
    build: [
      {
        sent: "Use 'Consequently' to link cause and effect.",
        words: [
          "The",
          "report",
          "was",
          "delayed.",
          "Consequently,",
          "the",
          "meeting",
          "was",
          "postponed.",
        ],
        ans:
          "The report was delayed. Consequently, the meeting was postponed.",
      },
      {
        sent: "Use 'Therefore' to draw a logical conclusion.",
        words: [
          "Sales",
          "have",
          "doubled.",
          "Therefore,",
          "we",
          "need",
          "more",
          "staff.",
        ],
        ans: "Sales have doubled. Therefore, we need more staff.",
      },
      {
        sent: "Use 'Hence' for a formal conclusion.",
        words: [
          "The",
          "data",
          "is",
          "incomplete.",
          "Hence,",
          "the",
          "conclusion",
          "is",
          "tentative.",
        ],
        ans:
          "The data is incomplete. Hence, the conclusion is tentative.",
      },
      {
        sent: "Use 'As a result' to state a consequence.",
        words: [
          "It",
          "rained",
          "all",
          "day.",
          "As",
          "a",
          "result,",
          "the",
          "match",
          "was",
          "cancelled.",
        ],
        ans:
          "It rained all day. As a result, the match was cancelled.",
      },
    ],
  },

  {
    id: "concession",
    name: "Concession",
    hint: "Acknowledging an opposing point",
    accent: "#8E44AD",
    intro:
      "Concession connectors admit that something is true while arguing the opposite. They show nuance — a hallmark of C1 writing.",
    items: [
      {
        word: "Even so",
        use: "Acknowledges a previous point but introduces a contrasting conclusion.",
        example: "The plan is risky. Even so, we should try it.",
      },
      {
        word: "Despite the fact that",
        use:
          "Followed by a full clause (subject + verb). Equivalent to 'although'.",
        example:
          "Despite the fact that it was raining, the event went ahead.",
      },
      {
        word: "Despite / In spite of",
        use:
          "Followed by a noun or -ing form, never a full clause. 'In spite of' is slightly more formal.",
        example: "She succeeded despite all the obstacles.",
      },
      {
        word: "Much as",
        use:
          "Formal way to introduce something you accept before disagreeing. Followed by subject + verb.",
        example: "Much as I admire her work, I disagree with her conclusion.",
      },
      {
        word: "While / Whilst",
        use:
          "Used to introduce a concession at the start of a sentence. 'Whilst' is British and more formal.",
        example:
          "While the design is innovative, it isn't practical.",
      },
    ],
    quiz: [
      {
        type: "blank",
        sent: "He decided to buy the house ___ the fact that it was far from the city centre.",
        opts: ["despite", "although", "whereas", "albeit"],
        key: "despite",
        exp: "'Despite the fact that' takes a full clause; 'despite' alone takes a noun. Here followed by 'the fact that' (= noun phrase).",
      },
      {
        type: "blank",
        sent: "The proposal has many flaws. ___, it deserves consideration.",
        opts: ["Even so", "Therefore", "Likewise", "Hence"],
        key: "Even so",
        exp: "Acknowledging flaws but defending its merit — 'Even so'.",
      },
      {
        type: "blank",
        sent: "___ I respect your opinion, I must disagree.",
        opts: ["Much as", "However", "Despite", "Likewise"],
        key: "Much as",
        exp: "'Much as' starts a formal concession before the main clause.",
      },
      {
        type: "blank",
        sent: "___ the design is innovative, it is not commercially viable.",
        opts: ["While", "Despite", "Albeit", "Hence"],
        key: "While",
        exp: "'While' introduces a concession before the main idea.",
      },
      {
        type: "mcq",
        sent: "Which sentence is grammatically correct?",
        opts: [
          "Despite of the rain, we went out.",
          "Despite the rain, we went out.",
        ],
        ans: "Despite the rain, we went out.",
        exp: "It's 'despite' (no 'of') or 'in spite of'. 'Despite of' is incorrect.",
      },
      {
        type: "mcq",
        sent: "Which is correctly built?",
        opts: [
          "In spite of being tired, she finished the report.",
          "In spite of she was tired, she finished the report.",
        ],
        ans: "In spite of being tired, she finished the report.",
        exp: "'In spite of' takes a noun or -ing form, never a full clause.",
      },
    ],
    build: [
      {
        sent: "Use 'Even so' to concede then push back.",
        words: [
          "The",
          "evidence",
          "is",
          "weak.",
          "Even",
          "so,",
          "the",
          "theory",
          "is",
          "worth",
          "testing.",
        ],
        ans:
          "The evidence is weak. Even so, the theory is worth testing.",
      },
      {
        sent: "Use 'Despite' + noun.",
        words: [
          "Despite",
          "the",
          "delays,",
          "the",
          "project",
          "was",
          "completed.",
        ],
        ans: "Despite the delays, the project was completed.",
      },
      {
        sent: "Use 'Much as' to introduce a formal concession.",
        words: [
          "Much",
          "as",
          "I",
          "enjoy",
          "her",
          "novels,",
          "this",
          "one",
          "disappointed",
          "me.",
        ],
        ans:
          "Much as I enjoy her novels, this one disappointed me.",
      },
      {
        sent: "Use 'While' to concede at the start.",
        words: [
          "While",
          "the",
          "idea",
          "sounds",
          "good,",
          "it",
          "lacks",
          "funding.",
        ],
        ans: "While the idea sounds good, it lacks funding.",
      },
    ],
  },
];
