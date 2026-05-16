// Inversions Game — questions database (28 items across B1/B2/C1).
//
// Each question has:
//   level       "B1" | "B2" | "C1"
//   type        "quiz" | "fill" | "order" | "match" | "transform"
//   q           the question text shown to the user
//   sentence    optional context sentence (often with ___ blanks)
//   opts        for "quiz": array of 4 options (strings)
//   ans         for "quiz": index of correct option (0..3)
//                for "order": the correct full sentence (string)
//   blank       for "fill": the correct word the user must type
//   hint        for "fill": a hint shown before/after attempt
//   words       for "order": array of words to reorder
//   pairs       for "match": array of [left, right] pairs
//   original    for "transform": the original sentence
//   target      for "transform": the correct rewritten sentence
//   explain     HTML explanation shown after answering

export const QUESTIONS = [
// B1 - Quiz
{level:'B1',type:'quiz',q:'Choose the correct inversion:',sentence:'"___ I knew about the problem until it was too late."',opts:['So did','Neither did','Little did','Hardly did'],ans:2,explain:'<strong>Little did I know</strong> = I had no idea. Used with negative adverbials for emphasis.'},
{level:'B1',type:'quiz',q:'Which is the correct agreement inversion?',sentence:'',opts:['So I do like tea.','So do I.','So I do.','Do so I.'],ans:1,explain:'<strong>So do I</strong> = Me too (for affirmative). Subject comes AFTER the auxiliary verb.'},
{level:'B1',type:'quiz',q:'Pick the correct negative agreement:',sentence:'"I can\'t swim." "___ my brother."',opts:['Neither can','Neither does','So can\'t','Neither do'],ans:0,explain:'<strong>Neither can</strong> my brother = My brother can\'t either. Use the same auxiliary as in the original sentence.'},
{level:'B1',type:'quiz',q:'Complete: "Here ___ the results you asked for."',sentence:'',opts:['comes','come','are coming','is'],ans:1,explain:'<strong>Here come</strong> the results — with plural subjects after "Here/There", the verb agrees with the subject.'},
{level:'B1',type:'fill',q:'Complete with the missing inversion word:',sentence:'___ did he imagine that he would win the prize.',blank:'Little',hint:'Negative adverb meaning "not at all"',explain:'<strong>Little did he imagine</strong> — "Little" + inversion expresses that something was completely unexpected.'},
{level:'B1',type:'fill',q:'Complete the agreement:',sentence:'She loves jazz. ___ do I.',blank:'So',hint:'Affirmative agreement inversion',explain:'<strong>So do I</strong> = I also love jazz. "So" for affirmative agreement triggers inversion.'},
{level:'B1',type:'order',q:'Reorder the words:',words:['Neither','can','she','swim'],ans:'Neither can she swim',explain:'<strong>Neither + auxiliary + subject + verb</strong> — standard negative agreement inversion pattern.'},
{level:'B1',type:'order',q:'Build the correct sentence:',words:['Here','comes','the','train'],ans:'Here comes the train',explain:'<strong>Here comes</strong> — with "Here/There" + verb of motion, subject follows the verb.'},
// B2 - Quiz
{level:'B2',type:'quiz',q:'Choose the correct conditional inversion:',sentence:'"___ I known, I would have called you."',opts:['If had','Had','Would have','Should'],ans:1,explain:'<strong>Had I known</strong> = If I had known. Drop "if" and invert Had + subject in 3rd conditional.'},
{level:'B2',type:'quiz',q:'Select the correct sentence:',sentence:'',opts:['Not until she arrived did the party begin.','Not until she arrived the party began.','The party not until began she arrived.','Did not the party begin until she arrived.'],ans:0,explain:'<strong>Not until + clause + did + subject + verb</strong> — inversion required after "Not until" at the start.'},
{level:'B2',type:'quiz',q:'Which inversion is correct?',sentence:'"___ I seen such chaos in my life."',opts:['Never have','Never had','Have never','Never did'],ans:0,explain:'<strong>Never have I seen</strong> — "Never" at the start triggers inversion: auxiliary + subject + past participle.'},
{level:'B2',type:'quiz',q:'Choose the right structure:',sentence:'"___ a word had he spoken before the verdict."',opts:['Scarcely','Hardly ever','No sooner','Only'],ans:0,explain:'<strong>Scarcely a word had he spoken</strong> — "Scarcely/Barely + noun" triggers inversion in formal style.'},
{level:'B2',type:'fill',q:'Complete the inversion:',sentence:'___ had she left the office when her phone rang.',blank:'Hardly',hint:'Means "almost immediately after" — past perfect inversion',explain:'<strong>Hardly had she left</strong> = She had just left. Followed by "when" to show immediate sequence.'},
{level:'B2',type:'fill',q:'Complete with the correct word:',sentence:'___ then did the truth finally become clear.',blank:'Only',hint:'"___ then" = at that moment and not before',explain:'<strong>Only then did</strong> — "Only + time expression" forces auxiliary inversion.'},
{level:'B2',type:'order',q:'Reorder into a correct sentence:',words:['Not','until','midnight','did','they','finally','leave'],ans:'Not until midnight did they finally leave',explain:'<strong>Not until + time + did + subject + verb</strong> — complete pattern for "not until" inversion.'},
{level:'B2',type:'order',q:'Build the correct inversion:',words:['Rarely','does','she','miss','a','class'],ans:'Rarely does she miss a class',explain:'<strong>Rarely does + subject + base verb</strong> — present simple inversion with frequency adverbials.'},
{level:'B2',type:'match',q:'Match the sentence halves:',pairs:[['Had I more time,','I would study harder.'],['Were she here,','she would know what to do.'],['Should you need help,','call me anytime.'],['Had it not rained,','we would have had a picnic.']],explain:'Conditional inversions: Had/Were/Should replace "if" clauses — formal and literary style.'},
// C1 - Quiz
{level:'C1',type:'quiz',q:'Choose the correct "Not only" inversion:',sentence:'',opts:['Not only she is talented, but she works hard.','Not only is she talented, but she also works hard.','Not only does she talented, but she also.','Not only talented is she, but hard works.'],ans:1,explain:'<strong>Not only is she talented</strong> — "Not only" at the start inverts the auxiliary. Second clause uses "but also".'},
{level:'C1',type:'quiz',q:'Select the correct formal inversion:',sentence:'"___ cold was it that the pipes froze."',opts:['Very','Such','So','Too'],ans:2,explain:'<strong>So cold was it that</strong> — "So + adjective + be + subject + that" is a formal result-clause inversion.'},
{level:'C1',type:'quiz',q:'Which subjunctive inversion is correct?',sentence:'"___ it to snow tomorrow, school will be cancelled."',opts:['If were','Were','Should be','Had been'],ans:1,explain:'<strong>Were it to snow</strong> = If it were to snow. Subjunctive inversion — very formal, common in legal/academic writing.'},
{level:'C1',type:'quiz',q:'Choose the correct "No sooner" inversion:',sentence:'',opts:['No sooner he sat down than the alarm rang.','No sooner had he sat down than the alarm rang.','No sooner did he sit down when the alarm rang.','No sooner he had sat down when the alarm rang.'],ans:1,explain:'<strong>No sooner had + subject + V3 + than</strong> — always "than" (not "when"), always past perfect with inversion.'},
{level:'C1',type:'fill',q:'Complete the emphatic inversion:',sentence:'___ was his determination that he trained for 12 hours a day.',blank:'Such',hint:'"___ was + noun + that" — formal emphasis structure',explain:'<strong>Such was his determination</strong> = His determination was so great. "Such was/is" inverts for dramatic effect.'},
{level:'C1',type:'fill',q:'Complete the literary inversion:',sentence:'___ a sound did she make throughout the entire ceremony.',blank:'Not',hint:'"___ a + noun + did + subject + verb" — emphatic negative',explain:'<strong>Not a sound did she make</strong> = She made no sound at all. Highly emphatic literary device.'},
{level:'C1',type:'order',q:'Reorder this formal inversion:',words:['Seldom','have','politicians','spoken','so','candidly'],ans:'Seldom have politicians spoken so candidly',explain:'<strong>Seldom have + subject + past participle</strong> — "Seldom/Rarely/Scarcely" at the start trigger present perfect inversion.'},
{level:'C1',type:'order',q:'Build this complex inversion:',words:['No','sooner','had','the','doors','opened','than','the','crowd','surged','in'],ans:'No sooner had the doors opened than the crowd surged in',explain:'<strong>No sooner had + subject + V3 + than + subject + V2</strong> — complete structure for immediate-sequence inversion.'},
{level:'C1',type:'transform',q:'Transform using inversion. Keep the same meaning:',original:'If the chairman had been present, the vote would have passed.',target:'Had the chairman been present, the vote would have passed.',explain:'<strong>Had the chairman been present</strong> — remove "If", use Had + subject + past participle for 3rd conditional inversion.'},
{level:'C1',type:'transform',q:'Rewrite using formal inversion:',original:'The conditions were so harsh that the expedition was abandoned.',target:'So harsh were the conditions that the expedition was abandoned.',explain:'<strong>So harsh were the conditions</strong> — "So + adj" at the start, then invert be-verb + subject + that-clause.'},
{level:'C1',type:'match',q:'Match inversion type to example:',pairs:[['Not only...but also','Not only did he lie, but he also stole.'],['No sooner...than','No sooner had I left than it rained.'],['Such was...','Such was her skill that all admired her.'],['Were it to...','Were it to fail, we would start over.']],explain:'C1 inversions are used for emphasis, formality, and literary effect — common in essays, literature and formal speech.'},
];

// Wholesome jokes shown between rounds to keep the energy up.
export const JOKES = [
  {s:"Why don't scientists trust atoms?",p:"Because they make up everything!"},
  {s:"What do you call a grammar teacher's favourite dessert?",p:"A 'clause'-ic!"},
  {s:"Why did the inversion go to therapy?",p:"Because it had trouble putting itself first!"},
  {s:"What do you call a lazy kangaroo?",p:"A pouch potato!"},
  {s:"Why can't you give Elsa a balloon?",p:"Because she'll let it go!"},
  {s:"What did the ocean say to the beach?",p:"Nothing, it just waved!"},
  {s:"Why did the English student eat his homework?",p:"Because the teacher said it was a piece of cake!"},
  {s:"What's a grammar teacher's pet peeve?",p:"Dangling modifiers — they always leave things hanging!"},
  {s:"What do you call a fish without eyes?",p:"A fsh!"},
  {s:"Why did the past tense go to the doctor?",p:"Because it was feeling a bit tense!"},
  {s:"What do you call cheese that isn't yours?",p:"Nacho cheese!"},
  {s:"Why did the verb apply for a job?",p:"It wanted to be more active!"},
  {s:"What's a linguist's favourite party game?",p:"Conjugate! (like Charades but with more inflection)"},
  {s:"Why was the conjunction always tired?",p:"It spent all day connecting!"},
  {s:"What did one wall say to the other wall?",p:"I'll meet you at the corner!"},
];
