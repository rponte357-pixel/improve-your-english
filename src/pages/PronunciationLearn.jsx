// PronunciationLearn — the rules of -ed endings, with one example per category.
// Mirrors the Learn pattern used in Grammar lessons (a column of cards).

import { PRONUNCIATION_RULES, PRONUNCIATION_VERBS } from "../data/pronunciation";
import AudioButton from "../components/AudioButton";

// Pick one canonical example verb per sound for the "hear it" demo.
const DEMO_VERBS = {
  id: PRONUNCIATION_VERBS.find((v) => v.verb === "Decided"),
  t:  PRONUNCIATION_VERBS.find((v) => v.verb === "Looked"),
  d:  PRONUNCIATION_VERBS.find((v) => v.verb === "Played"),
};

export default function PronunciationLearn() {
  return (
    <div className="pron-learn">
      <p className="pron-intro">
        Every regular verb's -ed ending is pronounced one of <strong>three ways</strong> depending on the sound that comes right before it. Native speakers do this automatically; learners often add an extra syllable where there shouldn't be one (saying <em>"work-ed"</em> instead of <em>"workt"</em>). This lesson trains your ear to hear the difference.
      </p>

      <div className="pron-rules">
        {["id", "t", "d"].map((key) => {
          const rule = PRONUNCIATION_RULES[key];
          const demo = DEMO_VERBS[key];
          return (
            <div
              key={key}
              className="pron-rule-card"
              style={{ borderLeftColor: rule.color }}
            >
              <div className="pron-rule-header">
                <span
                  className="pron-rule-badge"
                  style={{ background: rule.color }}
                >
                  {rule.sound}
                </span>
                <h3>{rule.title}</h3>
              </div>

              <p className="pron-rule-text">{rule.rule}</p>

              <div className="pron-rule-example">
                <div className="pron-example-row">
                  <span className="pron-example-label">Example</span>
                  <span className="pron-example-verb">{rule.example.verb}</span>
                </div>
                <div className="pron-example-row">
                  <span className="pron-example-label">IPA</span>
                  <code className="pron-example-ipa">{rule.example.ipa}</code>
                </div>
                <div className="pron-example-row">
                  <span className="pron-example-label">Sounds like</span>
                  <span className="pron-example-soundslike">
                    {rule.example.sounds_like}
                  </span>
                </div>
                {demo && (
                  <div className="pron-example-row pron-example-listen">
                    <span className="pron-example-label">Listen</span>
                    <AudioButton
                      src={`audio/${demo.file}`}
                      label={demo.verb}
                    />
                  </div>
                )}
              </div>

              <div className="pron-rule-cue">
                <strong>Audio cue:</strong> {rule.audio_cue}
              </div>

              <div className="pron-rule-triggers">
                <strong>Triggers:</strong> {rule.triggers}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pron-tip">
        💡 <strong>Tip:</strong> the most common mistake is adding an extra syllable to /t/ and /d/ verbs. <em>Worked</em> is one syllable, not two. <em>Played</em> is one syllable, not two. Practice listening before speaking.
      </div>
    </div>
  );
}
