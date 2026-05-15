// Inversion lesson data — same structure as before, now with hint + exp on
// every quiz question so the learner gets a reason when they get it wrong.
//
// Each question carries:
//   hint — optional shortcut shown when 💡 is tapped (penalises score)
//   exp  — explanation shown after the answer is revealed (correct or wrong)

export const inversionUnits = [
  {
    id: "neg",
    name: "Never / Rarely / Seldom",
    hint: "Negative adverbs at the start",
    accent: "#3C3489",
    slides: [
      {
        label: "The rule",
        rule: "When a negative adverb starts the sentence, subject and auxiliary swap places.",
        desc: "Works with: Never, Rarely, Seldom, Barely, Little, At no time…",
        formula: "<b>Negative adverb</b> + auxiliary + subject + verb",
        pairs: [
          { a: "I have never seen this.", b: "Never have I seen this." },
          { a: "She rarely goes out.", b: "Rarely does she go out." },
        ],
      },
      {
        label: "With do / does / did",
        rule: "In simple present and simple past, use do / does / did as the auxiliary.",
        desc: "The main verb returns to its base form (no -s, no -ed).",
        formula: "Rarely <b>does</b> she speak. — Little <b>did</b> I know.",
        pairs: [
          { a: "He seldom calls.", b: "Seldom does he call." },
          { a: "I little knew the answer.", b: "Little did I know the answer." },
        ],
      },
      {
        label: "With have / had",
        rule: "In perfect tenses, have / has / had goes straight after the adverb.",
        desc: "The participle stays the same.",
        formula: "Never <b>have</b> I seen. — Rarely <b>has</b> she been.",
        pairs: [
          { a: "They had never experienced this.", b: "Never had they experienced this." },
          { a: "She has rarely been late.", b: "Rarely has she been late." },
        ],
      },
    ],
    levels: [
      {
        name: "Easy",
        desc: "Pick the correctly inverted sentence.",
        qs: [
          { sent: "I have never eaten sushi.", ans: "Never have I eaten sushi.", opts: ["Never have I eaten sushi.", "Never I have eaten sushi."], hint: "Auxiliary BEFORE the subject.", exp: "After 'Never', the auxiliary 'have' jumps in front of 'I'." },
          { sent: "She rarely speaks in public.", ans: "Rarely does she speak in public.", opts: ["Rarely does she speak in public.", "Rarely she speaks in public."], hint: "Simple present needs 'does'.", exp: "Simple present takes 'do/does' as the auxiliary, and the main verb returns to its base form ('speak', not 'speaks')." },
          { sent: "They seldom visit us.", ans: "Seldom do they visit us.", opts: ["Seldom they visit us.", "Seldom do they visit us."], hint: "Add 'do' for plural subject in present.", exp: "Plural subject + simple present → 'do' as auxiliary, before the subject." },
          { sent: "He had never seen the sea.", ans: "Never had he seen the sea.", opts: ["Never had he seen the sea.", "Never he had seen the sea."], hint: "Past perfect: 'had' jumps before the subject.", exp: "Past perfect inversion: 'had' goes straight after 'Never', then the subject, then the participle." },
          { sent: "I barely know him.", ans: "Barely do I know him.", opts: ["Barely do I know him.", "Barely I know him."], hint: "Same rule as Rarely/Seldom.", exp: "'Barely' is a negative adverb. Simple present needs 'do' as auxiliary in the inverted form." },
        ],
      },
      {
        name: "Medium",
        desc: "Tap the words to build the sentence.",
        qs: [
          { sent: "I have never tasted anything so good.", words: ["Never", "have", "I", "tasted", "anything", "so", "good."], ans: "Never have I tasted anything so good." },
          { sent: "She seldom arrives on time.", words: ["Seldom", "does", "she", "arrive", "on", "time."], ans: "Seldom does she arrive on time." },
          { sent: "We had rarely seen such chaos.", words: ["Rarely", "had", "we", "seen", "such", "chaos."], ans: "Rarely had we seen such chaos." },
          { sent: "He little knew what awaited him.", words: ["Little", "did", "he", "know", "what", "awaited", "him."], ans: "Little did he know what awaited him." },
          { sent: "They have never been so happy.", words: ["Never", "have", "they", "been", "so", "happy."], ans: "Never have they been so happy." },
        ],
      },
      {
        name: "Hard",
        desc: "Pick the right auxiliary.",
        qs: [
          { sent: "Never ___ he worked so hard.", opts: ["has", "had", "have", "did"], key: "had", hint: "Look at the participle 'worked' — what tense?", exp: "'Worked' is a past participle, so it needs 'had' (past perfect) before the subject. 'Did' would take the base form 'work'." },
          { sent: "Rarely ___ she sing in public.", opts: ["do", "does", "has", "had"], key: "does", hint: "Simple present, 3rd-person singular.", exp: "Simple present + 3rd-person singular ('she') → 'does'. The main verb stays as 'sing' (base form)." },
          { sent: "Seldom ___ they seen such a storm.", opts: ["had", "have", "do", "did"], key: "have", hint: "'Seen' is the participle of 'see'.", exp: "'Seen' is a past participle. With 'they' (plural), present perfect uses 'have': 'Seldom have they seen…'." },
          { sent: "Little ___ I understand the problem.", opts: ["has", "do", "did", "does"], key: "did", hint: "Past simple, 1st person.", exp: "'Little did I know/understand…' is a fixed past-simple inversion. 'Did' + base form 'understand'." },
          { sent: "Never ___ I been so embarrassed.", opts: ["had", "has", "have", "do"], key: "have", hint: "'Been' is the participle of 'be'.", exp: "Present perfect + 1st person ('I') → 'have'. The form is 'Never have I been…'." },
        ],
      },
    ],
  },

  {
    id: "hardly",
    name: "Hardly / No sooner",
    hint: "Two things happening almost at once",
    accent: "#0C447C",
    slides: [
      {
        label: "The rule",
        rule: "Hardly/Scarcely… when and No sooner… than describe two near-simultaneous actions.",
        desc: "The first verb is past perfect (had + pp); the second is past simple.",
        formula: "<b>Hardly/Scarcely</b> + had + S + pp + <b>when</b> + S + past simple",
        pairs: [
          { a: "I had hardly sat down when the phone rang.", b: "Hardly had I sat down when the phone rang." },
        ],
      },
      {
        label: "No sooner… than",
        rule: "No sooner works identically but uses 'than' instead of 'when'.",
        desc: "Structure is the same: inverted past perfect + than + past simple.",
        formula: "<b>No sooner</b> + had + S + pp + <b>than</b> + S + past simple",
        pairs: [
          { a: "She had no sooner left than it started raining.", b: "No sooner had she left than it started raining." },
        ],
      },
    ],
    levels: [
      {
        name: "Easy",
        desc: "Pick the correctly inverted sentence.",
        qs: [
          { sent: "I had hardly arrived when it started to rain.", ans: "Hardly had I arrived when it started to rain.", opts: ["Hardly had I arrived when it started to rain.", "Hardly I had arrived when it started to rain."], hint: "Auxiliary 'had' BEFORE the subject.", exp: "After 'Hardly', the auxiliary 'had' jumps in front of the subject 'I'. The connector stays as 'when'." },
          { sent: "She had no sooner left than he called.", ans: "No sooner had she left than he called.", opts: ["No sooner she had left than he called.", "No sooner had she left than he called."], hint: "Same inversion rule. Don't forget 'than'.", exp: "'No sooner had + subject + participle… than…' is the fixed structure. Note 'than', not 'when'." },
          { sent: "We had scarcely sat down when the alarm went off.", ans: "Scarcely had we sat down when the alarm went off.", opts: ["Scarcely had we sat down when the alarm went off.", "Scarcely we had sat down when the alarm went off."], hint: "Scarcely works exactly like Hardly.", exp: "'Scarcely' is a near-synonym of 'Hardly' and triggers the same inversion: aux 'had' before the subject, followed by 'when'." },
          { sent: "He had hardly spoken when she interrupted.", ans: "Hardly had he spoken when she interrupted.", opts: ["Hardly he had spoken when she interrupted.", "Hardly had he spoken when she interrupted."], hint: "Aux 'had' before 'he'.", exp: "After 'Hardly', invert: 'had' → subject → participle. The second clause keeps normal word order." },
          { sent: "They had no sooner arrived than the show ended.", ans: "No sooner had they arrived than the show ended.", opts: ["No sooner had they arrived than the show ended.", "No sooner they arrived than the show ended."], hint: "Use 'had' even though it sounds short.", exp: "'No sooner' requires past perfect ('had + participle'), inverted. Without 'had' the structure breaks." },
        ],
      },
      {
        name: "Medium",
        desc: "Order the words.",
        qs: [
          { sent: "I had hardly sat down when the phone rang.", words: ["Hardly", "had", "I", "sat", "down", "when", "the", "phone", "rang."], ans: "Hardly had I sat down when the phone rang." },
          { sent: "She had no sooner left than it rained.", words: ["No", "sooner", "had", "she", "left", "than", "it", "rained."], ans: "No sooner had she left than it rained." },
          { sent: "We had scarcely arrived when the boss called.", words: ["Scarcely", "had", "we", "arrived", "when", "the", "boss", "called."], ans: "Scarcely had we arrived when the boss called." },
          { sent: "He had hardly finished when she asked for more.", words: ["Hardly", "had", "he", "finished", "when", "she", "asked", "for", "more."], ans: "Hardly had he finished when she asked for more." },
        ],
      },
      {
        name: "Hard",
        desc: "Choose 'when' or 'than'.",
        qs: [
          { sent: "Hardly had I opened the door ___ the cat ran out.", opts: ["when", "than", "that", "as"], key: "when", hint: "Hardly pairs with one specific connector.", exp: "'Hardly' and 'Scarcely' pair with 'when'. Only 'No sooner' uses 'than'." },
          { sent: "No sooner had she sat down ___ the meeting started.", opts: ["when", "than", "as", "that"], key: "than", hint: "'No sooner' has its own connector.", exp: "'No sooner… than' is the fixed pairing. Don't say 'No sooner… when' — it's wrong." },
          { sent: "Scarcely had he left ___ the storm began.", opts: ["than", "when", "that", "before"], key: "when", hint: "Same rule as Hardly.", exp: "'Scarcely' behaves exactly like 'Hardly': it pairs with 'when', not 'than'." },
          { sent: "No sooner had we arrived ___ it started to snow.", opts: ["when", "that", "than", "as"], key: "than", hint: "Remember the pair: No sooner… ?", exp: "Always 'No sooner… than'. The pairing is fixed — memorise it." },
        ],
      },
    ],
  },

  {
    id: "notonly",
    name: "Not only… but also",
    hint: "Double emphasis on two ideas",
    accent: "#633806",
    slides: [
      {
        label: "The rule",
        rule: "'Not only' at the start inverts the auxiliary in the first clause only.",
        desc: "The second clause (but also) keeps normal subject-verb order.",
        formula: "<b>Not only</b> + aux + S + verb … <b>but</b> (S) <b>also</b> + verb",
        pairs: [
          { a: "He not only lied but also stole.", b: "Not only did he lie but he also stole." },
          { a: "She not only sings but also plays guitar.", b: "Not only does she sing but she also plays guitar." },
        ],
      },
      {
        label: "Remember",
        rule: "The main verb returns to its base form (no -s, no -ed).",
        desc: "'Not only did he lie' — 'lie' has no -d because tense is on 'did'.",
        formula: "Not only <b>did</b> he <b>lie</b> (not 'lied') but he also <b>stole</b>.",
        pairs: [
          { a: "They not only lost the match but also got injured.", b: "Not only did they lose the match but they also got injured." },
        ],
      },
    ],
    levels: [
      {
        name: "Easy",
        desc: "Pick the correct form.",
        qs: [
          { sent: "He not only lied but also stole money.", ans: "Not only did he lie but he also stole money.", opts: ["Not only did he lie but he also stole money.", "Not only he lied but also stole money."], hint: "Past simple needs 'did' as auxiliary.", exp: "Past simple inversion: 'did' before the subject, and the main verb becomes 'lie' (base form, no -d). The second clause keeps normal order." },
          { sent: "She not only speaks French but also writes it.", ans: "Not only does she speak French but she also writes it.", opts: ["Not only she speaks French but also writes it.", "Not only does she speak French but she also writes it."], hint: "3rd person singular present → 'does'.", exp: "Simple present + 'she' → 'does'. Main verb returns to base form: 'speak' (not 'speaks')." },
          { sent: "They not only won the cup but also broke the record.", ans: "Not only did they win the cup but they also broke the record.", opts: ["Not only they won the cup but also broke the record.", "Not only did they win the cup but they also broke the record."], hint: "Past simple, plural subject.", exp: "Past simple inversion: 'did' + 'they' + base form 'win'. 'Broke' in the second clause stays as past simple because it isn't inverted." },
          { sent: "I not only finished but also helped others.", ans: "Not only did I finish but I also helped others.", opts: ["Not only did I finish but I also helped others.", "Not only I finished but also helped others."], hint: "'Did' goes before 'I'.", exp: "Past simple → 'did' + subject + base form 'finish'. The second clause keeps the simple past 'helped'." },
        ],
      },
      {
        name: "Medium",
        desc: "Build the inversion.",
        qs: [
          { sent: "He not only lied but also stole.", words: ["Not", "only", "did", "he", "lie", "but", "he", "also", "stole."], ans: "Not only did he lie but he also stole." },
          { sent: "She not only sings but also plays guitar.", words: ["Not", "only", "does", "she", "sing", "but", "she", "also", "plays", "guitar."], ans: "Not only does she sing but she also plays guitar." },
          { sent: "They not only arrived late but also forgot the keys.", words: ["Not", "only", "did", "they", "arrive", "late", "but", "they", "also", "forgot", "the", "keys."], ans: "Not only did they arrive late but they also forgot the keys." },
        ],
      },
      {
        name: "Hard",
        desc: "Pick the right auxiliary.",
        qs: [
          { sent: "Not only ___ he lie but he also stole.", opts: ["does", "did", "has", "had"], key: "did", hint: "Match the tense of 'stole'.", exp: "Both clauses share the same time frame. 'Stole' is past simple, so the inverted half needs 'did' + base form." },
          { sent: "Not only ___ she sing but she also dances.", opts: ["do", "did", "does", "has"], key: "does", hint: "3rd person present, like 'dances'.", exp: "'Dances' is simple present, 3rd person, so the inverted half mirrors it: 'does she sing'." },
          { sent: "Not only ___ they finished but they also won.", opts: ["did", "do", "have", "had"], key: "had", hint: "'Finished' here is a past participle.", exp: "Tricky: 'finished' could be past simple OR past participle. With 'they' + past participle inverted, it's past perfect → 'had'. ('Did' would need base form 'finish'.)" },
          { sent: "Not only ___ I apologized but I also offered help.", opts: ["have", "had", "did", "do"], key: "did", hint: "Match the tense of 'offered'.", exp: "'Offered' is past simple, so the inverted clause uses 'did' + base form. 'Apologized' here is the base 'apologize' inverted with 'did'." },
        ],
      },
    ],
  },

  {
    id: "so",
    name: "So / Neither",
    hint: "Quick agreement",
    accent: "#27500A",
    slides: [
      {
        label: "So — positive agreement",
        rule: "'So' shows that someone else also does an affirmative action.",
        desc: "The auxiliary must match the tense of the original.",
        formula: "<b>So</b> + auxiliary + subject",
        pairs: [
          { a: "I love pizza. — Me too.", b: "So do I." },
          { a: "She has finished. — Me too.", b: "So have I." },
          { a: "They were tired. — Us too.", b: "So were we." },
        ],
      },
      {
        label: "Neither / Nor — negative agreement",
        rule: "'Neither' or 'Nor' express that someone also doesn't do something.",
        desc: "Used with negatives. The auxiliary takes the affirmative form.",
        formula: "<b>Neither/Nor</b> + auxiliary + subject",
        pairs: [
          { a: "I can't swim. — Me neither.", b: "Neither can I." },
          { a: "He hasn't eaten. — She hasn't either.", b: "Neither has she." },
        ],
      },
    ],
    levels: [
      {
        name: "Easy",
        desc: "Pick the correct answer.",
        qs: [
          { sent: "I love chocolate. (me too)", ans: "So do I.", opts: ["So do I.", "So I do."], hint: "Aux before subject, like a question.", exp: "'So do I' inverts auxiliary 'do' before subject 'I'. 'So I do' has normal order — that's used to confirm, not to agree." },
          { sent: "She can't drive. (he can't either)", ans: "Neither can he.", opts: ["Neither can he.", "Neither he can."], hint: "Affirmative auxiliary after 'Neither'.", exp: "After 'Neither', the auxiliary is affirmative (NOT 'can't') and goes BEFORE the subject. The negation is already in 'Neither'." },
          { sent: "They have finished. (us too)", ans: "So have we.", opts: ["So we have.", "So have we."], hint: "Match the auxiliary of the original ('have').", exp: "The original uses 'have' (present perfect), so we mirror it: 'So have we'." },
          { sent: "He won't come. (she won't either)", ans: "Neither will she.", opts: ["Neither she will.", "Neither will she."], hint: "Affirmative 'will' (not 'won't').", exp: "After 'Neither', the auxiliary becomes affirmative — 'will', not 'won't'. The negation is already inside 'Neither'." },
          { sent: "We were happy. (them too)", ans: "So were they.", opts: ["So they were.", "So were they."], hint: "Past simple of 'be' → 'were'.", exp: "Original is 'were' (past simple of 'be'). Mirror it inverted: 'So were they'." },
          { sent: "I haven't eaten. (you neither)", ans: "Neither have you.", opts: ["Neither have you.", "Neither you have."], hint: "Aux 'have' goes before subject.", exp: "Present perfect → auxiliary 'have', affirmative after 'Neither', then the subject. The 'not' is gone because 'Neither' already negates." },
        ],
      },
      {
        name: "Medium",
        desc: "Order the words.",
        qs: [
          { sent: "I love music. (me too)", words: ["So", "do", "I."], ans: "So do I." },
          { sent: "She can't sing. (he can't either)", words: ["Neither", "can", "he."], ans: "Neither can he." },
          { sent: "They have arrived. (us too)", words: ["So", "have", "we."], ans: "So have we." },
          { sent: "I wasn't there. (me neither)", words: ["Neither", "was", "I."], ans: "Neither was I." },
          { sent: "He will help. (she too)", words: ["So", "will", "she."], ans: "So will she." },
        ],
      },
      {
        name: "Hard",
        desc: "Pick the right auxiliary.",
        qs: [
          { sent: "So ___ I. (I love it too)", opts: ["am", "do", "have", "did"], key: "do", hint: "'Love' is simple present.", exp: "'Love' is a present-simple lexical verb, so the auxiliary is 'do'. 'Am' would require an adjective ('happy'), not a verb." },
          { sent: "Neither ___ she. (she also cannot)", opts: ["does", "is", "can", "has"], key: "can", hint: "Match the modal of the original.", exp: "'Cannot' contains the modal 'can'. After 'Neither', we use the affirmative 'can'." },
          { sent: "So ___ we. (we also finished)", opts: ["do", "had", "have", "are"], key: "have", hint: "'Finished' — present perfect or past simple?", exp: "If the original were 'we finished' (past simple), it would be 'So did we'. Here 'have finished' (present perfect) gives 'So have we'." },
          { sent: "Neither ___ I. (I also was not there)", opts: ["did", "were", "am", "was"], key: "was", hint: "'Was' is the auxiliary in 'was not'.", exp: "The auxiliary in 'was not' is 'was' (past of 'be'). Mirror it: 'Neither was I'." },
          { sent: "So ___ they. (they also went)", opts: ["do", "were", "did", "have"], key: "did", hint: "'Went' is past simple of 'go'.", exp: "'Went' is past simple of a lexical verb, so the auxiliary is 'did'. 'So did they' = they also went." },
        ],
      },
    ],
  },

  {
    id: "cond",
    name: "Had / Were / Should",
    hint: "Conditionals without 'if'",
    accent: "#085041",
    slides: [
      {
        label: "The rule",
        rule: "In formal conditionals, 'if' is dropped and the auxiliary inverts to the start.",
        desc: "Three types: Had (3rd cond.), Were (2nd cond.), Should (1st cond. formal).",
        formula: "<b>Had</b> + S + pp… / <b>Were</b> + S + to/adj… / <b>Should</b> + S + inf…",
        pairs: [
          { a: "If I had known, I would have helped.", b: "Had I known, I would have helped." },
          { a: "If she were here, she would understand.", b: "Were she here, she would understand." },
          { a: "If you should need help, call me.", b: "Should you need help, call me." },
        ],
      },
      {
        label: "When to use each",
        rule: "'Had' = imaginary past situation. 'Were' = impossible present/future. 'Should' = formal future possibility.",
        desc: "Very common in formal and literary written English.",
        formula: "Had I <b>known</b> (past) — Were I <b>you</b> (present) — Should you <b>need</b> (future)",
        pairs: [
          { a: "If I were you, I would accept.", b: "Were I you, I would accept." },
          { a: "If they had called, we would have answered.", b: "Had they called, we would have answered." },
        ],
      },
    ],
    levels: [
      {
        name: "Easy",
        desc: "Pick the correctly inverted sentence.",
        qs: [
          { sent: "If I had known, I would have helped.", ans: "Had I known, I would have helped.", opts: ["Had I known, I would have helped.", "Had I knew, I would have helped."], hint: "After 'Had', use the participle.", exp: "Past perfect inversion needs the past participle 'known', not the past simple 'knew'." },
          { sent: "If she were here, she would understand.", ans: "Were she here, she would understand.", opts: ["Were she here, she would understand.", "If were she here, she would understand."], hint: "Drop 'If' entirely.", exp: "Inversion REPLACES 'if' — you can't keep both. 'If were she…' is a double trigger and is ungrammatical." },
          { sent: "If you should need help, please call.", ans: "Should you need help, please call.", opts: ["Should you need help, please call.", "Should you needed help, please call."], hint: "After 'Should', use the base form.", exp: "After 'Should', the verb stays in its base form: 'need', not 'needed'." },
          { sent: "If they had arrived earlier, they would have met him.", ans: "Had they arrived earlier, they would have met him.", opts: ["Had they arrived earlier, they would have met him.", "They had arrived earlier, they would have met him."], hint: "Aux 'Had' must come first.", exp: "The inversion is the trigger that replaces 'if', so 'Had' has to be at the very start of the sentence." },
          { sent: "If it were to rain, we would cancel.", ans: "Were it to rain, we would cancel.", opts: ["Were it to rain, we would cancel.", "If were it to rain, we would cancel."], hint: "Drop 'If' when you invert.", exp: "Same trap: the inversion replaces 'if'. Never use both." },
        ],
      },
      {
        name: "Medium",
        desc: "Build the sentence.",
        qs: [
          { sent: "If I had known, I would have helped.", words: ["Had", "I", "known,", "I", "would", "have", "helped."], ans: "Had I known, I would have helped." },
          { sent: "If she were here, she would understand.", words: ["Were", "she", "here,", "she", "would", "understand."], ans: "Were she here, she would understand." },
          { sent: "If you should need help, call me.", words: ["Should", "you", "need", "help,", "call", "me."], ans: "Should you need help, call me." },
          { sent: "If they had left earlier, they would have caught it.", words: ["Had", "they", "left", "earlier,", "they", "would", "have", "caught", "it."], ans: "Had they left earlier, they would have caught it." },
        ],
      },
      {
        name: "Hard",
        desc: "Pick Had, Were or Should.",
        qs: [
          { sent: "___ I known, I would have called you.", opts: ["Were", "Had", "Should", "Have"], key: "Had", hint: "Past participle 'known' → past perfect.", exp: "'Known' is a past participle, so this is a 3rd-conditional inversion → 'Had'." },
          { sent: "___ she here, she would help us.", opts: ["Had", "Should", "Were", "Would"], key: "Were", hint: "Imaginary present situation.", exp: "'She is not here now, but if she were…' — 2nd-conditional inversion uses 'Were'." },
          { sent: "___ you need assistance, press this button.", opts: ["Were", "Had", "Would", "Should"], key: "Should", hint: "Future possibility, formal.", exp: "Formal future-possibility conditional. 'Should you need…' = 'If you should need…'." },
          { sent: "___ they arrived on time, they would have seen it.", opts: ["Should", "Were", "Had", "Have"], key: "Had", hint: "'Arrived' could be a past participle here.", exp: "The result clause 'would have seen' is 3rd-conditional, so the if-clause needs past perfect → 'Had they arrived'." },
          { sent: "___ it to happen again, we would be prepared.", opts: ["Had", "Should", "Were", "Would"], key: "Were", hint: "Pattern: 'Were S + to + base form'.", exp: "'Were + subject + to + base form' is a formal way to express a hypothetical future. Equivalent to 'If it were to happen…'." },
        ],
      },
    ],
  },
];
