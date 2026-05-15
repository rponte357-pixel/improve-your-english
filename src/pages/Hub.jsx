import Bubble from "../components/Bubble";

export default function Hub() {
  return (
    <>
      <header className="hub-header">
        <h1>C1 Mastery Hub</h1>
        <p>Pick a tool to get started.</p>
      </header>

      <div className="bubble-container">
        <Bubble
          title="Daily Phrases"
          color="#FF6B6B"
          delay="0s"
          href="https://rponte357-pixel.github.io/phraseup/"
        />
        <Bubble
          title="Pronunciation"
          color="#4ECDC4"
          delay="0.1s"
          href="https://rponte357-pixel.github.io/english-pronunciation/"
        />
        <Bubble title="Grammar" color="#2E4053" delay="0.2s" to="/grammar" />
      </div>
    </>
  );
}
