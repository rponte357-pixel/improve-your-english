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
          variant="editorial"
          eyebrow="✦ Daily"
          title="Phrases"
          delay="0s"
          to="/phrases"
        />
        <Bubble
          variant="audio"
          eyebrow="Speak it right"
          title="Pronunciation"
          delay="0.1s"
          to="/pronunciation"
        />
        <Bubble
          variant="academic"
          eyebrow="Master C1"
          title="Grammar"
          delay="0.2s"
          to="/grammar"
        />
        <Bubble
          variant="playful"
          eyebrow="✦ Play"
          title="Games"
          delay="0.3s"
          to="/games"
        />
        <Bubble
          variant="flags"
          eyebrow="Grow your"
          title="Vocabulary"
          delay="0.4s"
          to="/vocabulary"
        />
      </div>
    </>
  );
}
