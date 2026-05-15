// Advanced Passive lesson data.
// Three tabs: theory, quiz, build (sentence-tile reconstruction).

export const passiveTypes = {
  report: { label: "Reporting verbs", colorBg: "#EEEDFE", colorTxt: "#3C3489" },
  caus:   { label: "Causative have/get", colorBg: "#E1F5EE", colorTxt: "#085041" },
  modal:  { label: "Modal passive", colorBg: "#E6F1FB", colorTxt: "#0C447C" },
  impers: { label: "Impersonal passive", colorBg: "#FAEEDA", colorTxt: "#633806" },
  infger: { label: "Passive inf./gerund", colorBg: "#FAECE7", colorTxt: "#712B13" },
  double: { label: "Double-object passive", colorBg: "#EAF3DE", colorTxt: "#27500A" },
};

export const passiveTheory = [
  {
    type: "report",
    rule:
      "Used with verbs like say, think, believe, know, expect, report, consider, claim. Two structures:",
    formulas: ["It + be + past participle + that-clause", "Subject + be + past participle + to-infinitive"],
    examples: [
      { active: "People say she is very talented.", note: "impersonal", passive: "It is said that she is very talented." },
      { active: "People say she is very talented.", note: "personal", passive: "She is said to be very talented." },
      { active: "They believed he had escaped.", passive: "He was believed to have escaped." },
    ],
  },
  {
    type: "caus",
    rule: "Expresses that someone else does the action for you.",
    formulas: ["have + object + past participle", "get + object + past participle"],
    examples: [
      { active: "Someone repaired my car. (I arranged it)", passive: "I had my car repaired." },
      { active: "Someone cut her hair.", passive: "She got her hair cut." },
      { active: "Someone is delivering the packages.", passive: "We are having the packages delivered." },
    ],
  },
  {
    type: "modal",
    rule: "Modals combine with passive to express obligation, possibility or deduction.",
    formulas: ["modal + be + past participle (present)", "modal + have been + past participle (past)"],
    examples: [
      { passive: "This must be done immediately." },
      { passive: "The report should have been submitted yesterday." },
      { passive: "The package might have been stolen." },
      { passive: "These rules ought to be followed." },
    ],
  },
  {
    type: "impers",
    rule:
      "Used to distance yourself from the information — typical of formal contexts, news and academic writing.",
    formulas: ["It is said / known / reported / believed / thought / claimed + that"],
    examples: [
      { passive: "It is widely known that the economy is recovering." },
      { passive: "It has been reported that several people were injured." },
      { passive: "It is claimed that the new policy will create jobs." },
    ],
  },
  {
    type: "infger",
    rule: "Infinitives and gerunds can also be passive.",
    formulas: ["to be + past participle (passive infinitive)", "being + past participle (passive gerund)"],
    examples: [
      { passive: "She expects to be promoted next year." },
      { passive: "He hates being interrupted during meetings." },
      { passive: "The contract needs to be signed today." },
      { passive: "I remember being told about this rule." },
    ],
  },
  {
    type: "double",
    rule:
      "Verbs like give, send, show, offer, tell, award, teach can have two passive forms.",
    formulas: [
      "Indirect obj. + be + past participle + direct obj.",
      "Direct obj. + be + past participle + to + indirect obj.",
    ],
    examples: [
      { active: "They gave her a prize.", note: "form 1", passive: "She was given a prize." },
      { active: "They gave her a prize.", note: "form 2", passive: "A prize was given to her." },
    ],
  },
];

export const passiveQuiz = [
  { type: "report", stem: "People <em>say</em> that she is the best doctor in the city. → Impersonal:", opts: ["It said that she is the best doctor.", "It is said that she is the best doctor in the city.", "She said to be the best doctor.", "It has said that she is the best doctor."], ans: 1, hint: "It is + past participle + that…", exp: "Impersonal structure: It is said that + full clause." },
  { type: "report", stem: "They <em>think</em> he has left the country. → Personal:", opts: ["He thinks to have left the country.", "It thinks that he has left.", "He is thought to have left the country.", "He is thinking to leave the country."], ans: 2, hint: "Subject + is thought + to have + past participle", exp: "Past perfect in the clause → to have + past participle in the personal structure." },
  { type: "report", stem: "Authorities <em>believe</em> the fire was caused deliberately. → Impersonal:", opts: ["It believed the fire was caused deliberately.", "It is believed that the fire was caused deliberately.", "The fire is believed caused deliberately.", "It is believing that the fire was caused."], ans: 1, hint: "It is + verb3 + that…", exp: "Impersonal passive: It is believed that + original active clause." },
  { type: "caus", stem: "Someone repaired her laptop. She arranged it. → Causative:", opts: ["She had repaired her laptop.", "She had her laptop repaired.", "She got repaired her laptop.", "Her laptop had repaired."], ans: 1, hint: "have + object + past participle", exp: "Causative structure: have + object (her laptop) + participle (repaired)." },
  { type: "caus", stem: "Which one is CORRECT?", opts: ["I want to get my eyes test.", "I want to get my eyes tested.", "I want to have test my eyes.", "I want my eyes get tested."], ans: 1, hint: "get + object + past participle", exp: "get + direct object + past participle = 'get my eyes tested'." },
  { type: "caus", stem: "They are building a pool for us. → Causative:", opts: ["We have a pool build.", "We are having a pool built.", "We are getting build a pool.", "We have built a pool."], ans: 1, hint: "have/get + object + participle (present continuous)", exp: "Continuous: be + having + object + past participle." },
  { type: "modal", stem: "Someone must submit the report immediately. → Passive:", opts: ["The report must submitted immediately.", "The report must be submitting immediately.", "The report must be submitted immediately.", "The report must have submitted immediately."], ans: 2, hint: "modal + be + past participle", exp: "Present modal passive: must + be + past participle." },
  { type: "modal", stem: "Someone should have told her about the meeting. → Passive:", opts: ["She should have been told about the meeting.", "She should be told about the meeting.", "She should had been told about the meeting.", "She must have been told about the meeting."], ans: 0, hint: "modal + have been + past participle (past)", exp: "Past modal passive: should + have been + past participle." },
  { type: "modal", stem: "Pick the CORRECT form:", opts: ["The package might been delivered.", "The package might have deliver.", "The package might have been delivered.", "The package might had been delivered."], ans: 2, hint: "might + have been + past participle", exp: "'might have been delivered' = modal + have been + participle. Correct." },
  { type: "impers", stem: "Everyone knows the climate is changing. → Formal impersonal:", opts: ["It knows that the climate is changing.", "It is known that the climate is changing.", "The climate is known changing.", "It was known the climate changes."], ans: 1, hint: "It is known that…", exp: "Formal impersonal passive: It is known that + clause." },
  { type: "infger", stem: "She expects ___ next year. (promote)", opts: ["to promote", "to be promoting", "to be promoted", "being promoted"], ans: 2, hint: "to be + past participle", exp: "Passive infinitive: to be + participle (promoted)." },
  { type: "infger", stem: "He hates ___ during class. (interrupt)", opts: ["to interrupt", "being interrupted", "to be interrupting", "to have interrupted"], ans: 1, hint: "being + past participle after 'hate'", exp: "After verbs like hate/enjoy/mind → passive gerund: being + participle." },
  { type: "double", stem: "They gave the winner a trophy. → Preferred passive:", opts: ["A trophy was given the winner.", "The winner was given a trophy.", "The winner was given to a trophy.", "A trophy gave to the winner."], ans: 1, hint: "Indirect obj. + was given + direct obj.", exp: "The version with the indirect object as subject is more natural: The winner was given a trophy." },
  { type: "double", stem: "They awarded her the prize. → Alternative passive:", opts: ["A prize was awarded her.", "She was awarded the prize.", "The prize was awarded to her.", "Both B and C are correct."], ans: 3, hint: "Two correct forms here", exp: "Both are correct: 'She was awarded the prize' and 'The prize was awarded to her.'" },
  { type: "report", stem: "'Experts <em>claim</em> the treatment is effective.' → Personal passive:", opts: ["The treatment is claimed to be effective.", "It claimed the treatment is effective.", "The treatment has claimed to be effective.", "Experts are claimed the treatment is effective."], ans: 0, hint: "subject + is claimed + to be", exp: "Personal structure: The treatment + is claimed + to be + adjective." },
  { type: "modal", stem: "You ought to complete this form. → Passive:", opts: ["This form ought complete.", "This form ought to be completed.", "This form ought to have completed.", "This form ought to complete."], ans: 1, hint: "ought to + be + past participle", exp: "'ought to be completed' = ought to + be + past participle." },
];

export const passiveBuild = [
  { type: "report", orig: "People say she is brilliant.", inv: "She is said to be brilliant.", words: ["She", "is", "said", "to", "be", "brilliant."] },
  { type: "report", orig: "They think he has fled the country.", inv: "He is thought to have fled the country.", words: ["He", "is", "thought", "to", "have", "fled", "the", "country."] },
  { type: "caus", orig: "Someone cleaned my house. (I arranged it)", inv: "I had my house cleaned.", words: ["I", "had", "my", "house", "cleaned."] },
  { type: "caus", orig: "They are painting our flat.", inv: "We are having our flat painted.", words: ["We", "are", "having", "our", "flat", "painted."] },
  { type: "modal", orig: "Someone should inform the committee.", inv: "The committee should be informed.", words: ["The", "committee", "should", "be", "informed."] },
  { type: "modal", orig: "Someone could have warned us.", inv: "We could have been warned.", words: ["We", "could", "have", "been", "warned."] },
  { type: "infger", orig: "She hates it when people interrupt her.", inv: "She hates being interrupted.", words: ["She", "hates", "being", "interrupted."] },
  { type: "double", orig: "They sent him a letter.", inv: "He was sent a letter.", words: ["He", "was", "sent", "a", "letter."] },
];
