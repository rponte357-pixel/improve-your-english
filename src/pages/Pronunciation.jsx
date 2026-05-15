import { Link } from "react-router-dom";
import LessonTabs from "../components/LessonTabs";
import PronunciationLearn from "./PronunciationLearn";
import PronunciationExplorer from "./PronunciationExplorer";
import PronunciationPractice from "./PronunciationPractice";
import PronunciationErrors from "./PronunciationErrors";

export default function Pronunciation() {
  return (
    <article className="lesson" style={{ "--accent": "#4ECDC4" }}>
      <Link to="/" className="back-link">
        ← Back to home
      </Link>

      <header className="lesson-header">
        <h1>Pronunciation: -ed endings</h1>
        <p className="lesson-subtitle">
          Master the three sounds of past-tense regular verbs.
        </p>
      </header>

      <LessonTabs
        initial="learn"
        tabs={[
          { id: "learn",     label: "📖 Learn",     render: () => <PronunciationLearn /> },
          { id: "explorer",  label: "🎧 Explore",   render: () => <PronunciationExplorer /> },
          { id: "practice",  label: "🎯 Practice",  render: () => <PronunciationPractice /> },
          { id: "errors",    label: "📝 My Errors", render: () => <PronunciationErrors /> },
        ]}
      />
    </article>
  );
}
