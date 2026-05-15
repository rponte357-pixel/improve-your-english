// PronunciationPractice — a classification quiz.
//
// The user hears a verb (audio plays automatically on round start) and must
// classify it as /ɪd/, /t/, or /d/. Streak counter, score, and progress bar.
//
// Errors are recorded in localStorage via usePronunciationErrors so the user
// can review them in the "My Errors" tab.

import { useEffect, useMemo, useRef, useState } from "react";
import { PRONUNCIATION_VERBS, PRONUNCIATION_RULES } from "../data/pronunciation";
import { usePronunciationErrors } from "../hooks/usePronunciationErrors";
import AudioButton from "../components/AudioButton";

const ROUND_LENGTH = 12;
const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);

export default function PronunciationPractice() {
  const { recordError } = usePronunciationErrors();
  const [round, setRound] = useState(() => shuffle(PRONUNCIATION_VERBS).slice(0, ROUND_LENGTH));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState(null);
  const [hint, setHint] = useState(null);
  const audioPlayedRef = useRef(false);

  const current = round[index];
  const finished = index >= ROUND_LENGTH;

  // Auto-play the audio on each new round.
  useEffect(() => {
    audioPlayedRef.current = false;
    if (!current) return;
    const baseUrl = import.meta.env.BASE_URL || "/";
    const fullSrc = `${baseUrl}audio/${current.file}`.replace(/\/{2,}/g, "/");
    const audio = new Audio(fullSrc);
    const t = setTimeout(() => {
      audio.play().catch(() => {
        // Autoplay blocked — user can tap the button instead.
      });
    }, 250);
    return () => {
      clearTimeout(t);
      audio.pause();
    };
  }, [index, current]);

  if (finished) {
    return (
      <Result
        score={score}
        total={ROUND_LENGTH}
        onRestart={() => {
          setRound(shuffle(PRONUNCIATION_VERBS).slice(0, ROUND_LENGTH));
          setIndex(0);
          setScore(0);
          setStreak(0);
          setPicked(null);
          setHint(null);
        }}
      />
    );
  }

  const choose = (sound) => {
    if (picked !== null) return;
    setPicked(sound);
    if (sound === current.sound) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
      recordError(current.verb, current.sound, sound);
    }
  };

  const next = () => {
    setIndex((i) => i + 1);
    setPicked(null);
    setHint(null);
  };

  const isCorrect = picked === current.sound;

  return (
    <div className="pron-practice">
      <div className="practice-meta">
        <span>
          ⭐ <b>{score}</b>
        </span>
        <span>
          🔥 streak <b>{streak}</b>
        </span>
        <span>
          {index + 1} / {ROUND_LENGTH}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(index / ROUND_LENGTH) * 100}%` }}
        />
      </div>

      <div className="pron-practice-stage">
        <div className="pron-practice-word">{current.verb}</div>
        <div className="pron-practice-audio">
          <AudioButton src={`audio/${current.file}`} label="Listen again" size="lg" />
        </div>
        <p className="pron-practice-question">
          Which sound does the -ed have?
        </p>

        <div className="pron-practice-choices">
          {["id", "t", "d"].map((opt) => {
            const rule = PRONUNCIATION_RULES[opt];
            let status = "";
            if (picked !== null) {
              if (opt === current.sound) status = "correct";
              else if (opt === picked) status = "wrong";
            }
            return (
              <button
                key={opt}
                type="button"
                className={`pron-choice ${status}`}
                style={{ "--choice-color": rule.color }}
                onClick={() => choose(opt)}
                disabled={picked !== null}
              >
                <span className="pron-choice-sound">{rule.sound}</span>
                <span className="pron-choice-title">{rule.title}</span>
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className={`pron-feedback ${isCorrect ? "ok" : "ko"}`}>
            {isCorrect ? (
              <>
                ✓ <strong>Correct.</strong> "{current.verb}" ends with the {PRONUNCIATION_RULES[current.sound].sound} sound. <em>{current.example}</em>
              </>
            ) : (
              <>
                ✗ <strong>Not quite.</strong> "{current.verb}" ends with {PRONUNCIATION_RULES[current.sound].sound} — {PRONUNCIATION_RULES[current.sound].title.toLowerCase()}. <em>{current.example}</em>
              </>
            )}
          </div>
        )}

        {!picked && (
          <button
            type="button"
            className="pron-hint-btn"
            onClick={() => setHint(current.example)}
            disabled={!!hint}
          >
            {hint ? `💡 ${hint}` : "💡 Show me a hint (penalises score)"}
          </button>
        )}

        <div className="pron-practice-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={next}
            disabled={picked === null}
          >
            {index + 1 >= ROUND_LENGTH ? "See result" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Result({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100);
  let msg;
  if (pct === 100) msg = "Perfect ear. You're done.";
  else if (pct >= 75) msg = "Strong. A bit more practice and it's second nature.";
  else if (pct >= 50) msg = "Solid foundation. Review your errors and try again.";
  else msg = "Take another look at the Learn tab, then try again.";
  return (
    <div className="result-box">
      <div className="result-points">{score}</div>
      <div className="result-of">of {total} ({pct}%)</div>
      <p className="result-msg">{msg}</p>
      <div className="result-actions">
        <button type="button" className="btn-primary" onClick={onRestart}>
          New round
        </button>
      </div>
    </div>
  );
}
