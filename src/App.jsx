import { useState, useEffect } from 'react'
import './App.css'

// --- DATOS ---
const C1_SUGGESTIONS = { "but": "nevertheless / however", "think about": "consider the implications of", "get": "acquire / obtain", "important": "crucial / paramount", "show": "demonstrate / illustrate", "so": "consequently / therefore", "bad": "detrimental / suboptimal", "good": "exemplary / beneficial", "and": "furthermore / moreover", "small": "insignificant / minute", "very": "exceptionally / profoundly", "help": "assist / facilitate", "change": "alter / modify", "fast": "rapid / expeditious" };

const GRAMMAR_POINTS = [ 
  { title: "Cleft Sentences", url: "./cleft-sentences.html", color: "#5D6D7E" }, 
  { title: "Inversion", url: "./english_inversion.html", color: "#5D6D7E" }, 
  { title: "Advanced Passive", url: "./passive-voice.html", color: "#5D6D7E" }, 
  { title: "Mixed Conditionals", url: "./conditionals.html", color: "#5D6D7E" }, 
  { title: "Modal Deduction", url: "./modals.html", color: "#5D6D7E" }, 
  { title: "Connectors", url: "./connectors.html", color: "#5D6D7E" } 
];

const SPEAKING_SCENARIOS = [ "Should governments invest more in public transport or green energy?", "How important is it for young people to travel abroad before university?", "What are the advantages and disadvantages of working from home?", "To what extent does social media affect our personal relationships?" ];

const AI_RESPONSES = [ "That’s a valid point, however, taking everything into account, don't you think...?", "I see where you're coming from, but we mustn't overlook the fact that...", "Building on what you've just said, it's also worth considering...", "Precisely! And that brings us to the question of whether..." ];

const LISTENING_CHALLENGES = [
  { id: 1, text: "The rapid expansion of urban areas has led to a significant decrease in green spaces, which is profoundly detrimental to biodiversity.", hint: "Topic: Urbanization" },
  { id: 2, text: "It is crucial to consider the implications of implementing such a radical policy before reaching a definitive conclusion.", hint: "Topic: Policy making" }
];

function Bubble({ title, url, color, delay, onClick, isLink = true, className = "" }) {
  const styles = { backgroundColor: color, animationDelay: delay, cursor: 'pointer' };
  return isLink ? (
    <a href={url} className={`bubble ${className}`} style={styles}><div className="bubble-content">{title}</div></a>
  ) : (
    <div className={`bubble ${className}`} onClick={onClick} style={styles}><div className="bubble-content">{title}</div></div>
  );
}

function App() {
  const [view, setView] = useState('main');
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState([]);
  const [scenario, setScenario] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [listeningInput, setListeningInput] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const machineSpeak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const bestVoice = voices.find(v => v.name.includes("Google") && v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en-GB"));
    if (bestVoice) utterance.voice = bestVoice;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const startSim = () => {
    const s = SPEAKING_SCENARIOS[Math.floor(Math.random() * SPEAKING_SCENARIOS.length)];
    setScenario(s);
    machineSpeak("Let's discuss: " + s);
  };

  const startListening = () => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) return alert("Navegador no compatible.");
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      const reply = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setTimeout(() => machineSpeak(reply), 1000);
    };
    recognition.onresult = (e) => setTranscript(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className="main-container">
      <header>
        <h1>C1 Mastery Hub</h1>
        <p>{view === 'main' ? "Selecciona una herramienta" : "Advanced Training Active"}</p>
      </header>

      <div className="bubble-container">
        {view === 'main' && (
          <>
            <Bubble title="Daily Phrases" url="https://rponte357-pixel.github.io/phraseup/" color="#FF6B6B" delay="0s" />
            <Bubble title="Pronunciation" url="https://rponte357-pixel.github.io/english-pronunciation/" color="#4ECDC4" delay="0.2s" />
            <Bubble title="Grammar" color="#2E4053" delay="0.4s" isLink={false} onClick={() => setView('grammar')} />
            <Bubble title="Exam Lab" color="#F1C40F" delay="0.6s" isLink={false} onClick={() => setView('exam')} />
          </>
        )}

        {view === 'grammar' && (
          <>
            {GRAMMAR_POINTS.map((p, i) => (
              <Bubble key={i} title={p.title} url={p.url} color={p.color} delay={`${i * 0.1}s`} className="grammar-point" />
            ))}
            <Bubble title="Back" color="#bbb" isLink={false} onClick={() => setView('main')} />
          </>
        )}

        {view === 'exam' && (
          <>
            <Bubble title="Register Analyzer" color="#8E44AD" isLink={false} onClick={() => setView('analyzer')} />
            <Bubble title="Listening Lab" color="#3498DB" isLink={false} onClick={() => setView('listening')} />
            <Bubble title="Speaking Simulator" color="#27AE60" isLink={false} onClick={() => setView('simulator')} />
            <Bubble title="Back" color="#bbb" isLink={false} onClick={() => setView('main')} />
          </>
        )}

        {(view === 'analyzer' || view === 'listening' || view === 'simulator') && (
          <div className="ui-card">
            {view === 'analyzer' && (
              <>
                <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type here..." />
                <div className="ui-actions">
                  <button className="btn-primary" onClick={() => {
                    const found = [];
                    Object.keys(C1_SUGGESTIONS).forEach(key => {
                      if (new RegExp(`\\b${key}\\b`, 'gi').test(inputText)) found.push({ b2: key, c1: C1_SUGGESTIONS[key] });
                    });
                    setAnalysis(found);
                  }}>Analyze</button>
                  <button className="btn-secondary" onClick={() => setView('exam')}>Back</button>
                </div>
                {analysis.map((item, i) => <div key={i} className="ui-item"><b>{item.b2}</b> → {item.c1}</div>)}
              </>
            )}

            {view === 'listening' && (
              <>
                <div className="ui-scenario-box">{currentChallenge ? currentChallenge.hint : "Ready for a dictation?"}</div>
                <textarea value={listeningInput} onChange={(e) => setListeningInput(e.target.value)} placeholder="Type what you hear..." />
                <div className="ui-actions">
                  {!currentChallenge ? (
                    <button className="btn-primary" onClick={() => {
                      const c = LISTENING_CHALLENGES[Math.floor(Math.random()*LISTENING_CHALLENGES.length)];
                      setCurrentChallenge(c); machineSpeak(c.text);
                    }}>Start</button>
                  ) : <button className="btn-primary" onClick={() => machineSpeak(currentChallenge.text)}>Repeat</button>}
                  <button className="btn-secondary" onClick={() => {setView('exam'); setCurrentChallenge(null); setListeningInput("");}}>Back</button>
                </div>
              </>
            )}

            {view === 'simulator' && (
              <>
                <div className="ui-scenario-box">{scenario || "Press start to get a topic"}</div>
                {transcript && <div className="ui-transcript"><i>"{transcript}"</i></div>}
                <div className="ui-actions">
                  {!scenario ? (
                    <button className="btn-primary" onClick={startSim}>Start Simulation</button>
                  ) : (
                    <button className={`btn-primary ${isListening ? 'active' : ''}`} onClick={startListening}>
                      {isListening ? "Listening..." : "Push to Talk"}
                    </button>
                  )}
                  <button className="btn-secondary" onClick={() => {setView('exam'); setScenario(""); setTranscript("");}}>Back</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default App;
