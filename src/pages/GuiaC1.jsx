// Guía C1 — exam preparation guide. Seven exam-task sections (Essay,
// Complaint, Report, Article, Email, Mediation, Speaking), each with a
// coaching tip and useful structures (English + Spanish). Every
// structure can be saved into the user's custom lists with one tap.
//
// Styling lives in styles/guiaC1.css and follows the app identity
// (navy background, cream cards, terracotta accent) with an amber/gold
// accent specific to this section ("Aprobado Seguro" = achievement).

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GUIA_C1_SECTIONS,
  GUIA_C1_SKILLS,
  GUIA_C1_TARGET_LIST_NAME,
  getAllStructures,
  getSectionsBySkill,
  saveStructuresToList,
} from "../data/guiaC1";
import "../styles/guiaC1.css";

export default function GuiaC1() {
  const [skill, setSkill] = useState(null); // null = landing (skill bubbles)
  const [activeId, setActiveId] = useState(null);
  const [toast, setToast] = useState(null);
  const [savedSet, setSavedSet] = useState(() => new Set());
  const [innerTab, setInnerTab] = useState("structures"); // "tricks" | "structures"

  const skillMeta = skill ? GUIA_C1_SKILLS.find((s) => s.id === skill) : null;
  const sections = skill ? getSectionsBySkill(skill) : [];
  const active = sections.find((s) => s.id === activeId) || sections[0] || null;

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 3500);
  };

  // Enter a skill from the landing bubbles.
  const enterSkill = (skillId) => {
    const meta = GUIA_C1_SKILLS.find((s) => s.id === skillId);
    if (!meta || !meta.available) return;
    setSkill(skillId);
    const first = getSectionsBySkill(skillId)[0];
    setActiveId(first ? first.id : null);
    setInnerTab("structures");
  };

  // Back to the landing bubbles.
  const backToSkills = () => {
    setSkill(null);
    setActiveId(null);
  };

  const handleSaveOne = (item) => {
    const res = saveStructuresToList(item);
    if (res.ok && res.added > 0) {
      setSavedSet((prev) => new Set(prev).add(item.en));
      showToast(`Saved to "${res.listName}"`);
    } else if (res.ok && res.skipped > 0) {
      setSavedSet((prev) => new Set(prev).add(item.en));
      showToast("Already in your list");
    } else {
      showToast("Couldn't save — try again");
    }
  };

  const handleSaveSection = () => {
    if (!active) return;
    const items = active.groups.flatMap((g) => g.items);
    const res = saveStructuresToList(items);
    if (res.ok) {
      setSavedSet((prev) => {
        const next = new Set(prev);
        items.forEach((it) => next.add(it.en));
        return next;
      });
      const msg =
        res.added > 0
          ? `Saved ${res.added} structure${res.added === 1 ? "" : "s"}` +
            (res.skipped > 0 ? ` (${res.skipped} already saved)` : "")
          : "All already in your list";
      showToast(msg);
    } else {
      showToast("Couldn't save — try again");
    }
  };

  const totalStructures = getAllStructures().length;

  return (
    <section className="guia">
      <div className="guia-topbar">
        {skill ? (
          <button className="guia-back" onClick={backToSkills}>← Skills</button>
        ) : (
          <Link to="/" className="guia-back">← Back to home</Link>
        )}
        <div className="guia-brand">
          <span className="guia-brand-mark">🎓</span> Guía C1
        </div>
      </div>

      {/* ── Landing: the four skill bubbles ── */}
      {!skill ? (
        <>
          <header className="guia-hero">
            <div className="guia-eye">✦ Aprobado Seguro</div>
            <h1 className="guia-h1">Guía C1</h1>
            <p className="guia-slogan">Tu aprobado empieza aquí.</p>
            <p className="guia-sub">Pick an exam skill to get started.</p>
          </header>

          <div className="guia-bubbles">
            {GUIA_C1_SKILLS.map((s) => (
              <button
                key={s.id}
                className={`guia-bubble ${s.available ? "" : "guia-bubble-soon"}`}
                onClick={() => enterSkill(s.id)}
                disabled={!s.available}
                aria-label={s.available ? s.label : `${s.label} — próximamente`}
              >
                <span className="guia-bubble-icon">{s.icon}</span>
                <span className="guia-bubble-label">{s.label}</span>
                {!s.available && <span className="guia-bubble-badge">Coming soon</span>}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <header className="guia-hero guia-hero-compact">
            <h1 className="guia-h1">
              <span className="guia-hero-icon">{skillMeta.icon}</span> {skillMeta.label}
            </h1>
          </header>

          {/* Task sub-tabs within the skill */}
          {sections.length > 1 && (
            <div className="guia-tabs" role="tablist" aria-label="Tasks">
              {sections.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={s.id === active.id}
                  className={`guia-tab ${s.id === active.id ? "guia-tab-active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <div className="guia-section" role="tabpanel">
            <div className="guia-tip">
              <div className="guia-tip-head">💡 Tip: {active.label}</div>
              <p className="guia-tip-body">{active.tip}</p>
            </div>

            {active.tricks && active.tricks.length > 0 ? (
              <>
                {/* Inner tabs: Tricks | Structures (Speaking sections) */}
                <div className="guia-inner-tabs" role="tablist">
                  <button
                    role="tab"
                    aria-selected={innerTab === "tricks"}
                    className={`guia-inner-tab ${innerTab === "tricks" ? "guia-inner-tab-active" : ""}`}
                    onClick={() => setInnerTab("tricks")}
                  >
                    💡 Tricks
                  </button>
                  <button
                    role="tab"
                    aria-selected={innerTab === "structures"}
                    className={`guia-inner-tab ${innerTab === "structures" ? "guia-inner-tab-active" : ""}`}
                    onClick={() => setInnerTab("structures")}
                  >
                    🚀 Structures
                  </button>
                </div>

                {innerTab === "tricks" ? (
                  <div className="guia-tricks">
                    {active.tricks.map((t, ti) => (
                      <div key={ti} className="guia-trick">
                        <div className="guia-trick-title">{t.title}</div>
                        <p className="guia-trick-body">{t.body}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="guia-structures-head">
                      <span>🚀 Structures</span>
                      <button type="button" className="guia-save-all" onClick={handleSaveSection}>
                        + Save all
                      </button>
                    </div>
                    {renderGroups(active, savedSet, handleSaveOne)}
                  </>
                )}
              </>
            ) : (
              <>
                <div className="guia-structures-head">
                  <span>🚀 Structures</span>
                  <button type="button" className="guia-save-all" onClick={handleSaveSection}>
                    + Save all
                  </button>
                </div>
                {renderGroups(active, savedSet, handleSaveOne)}
              </>
            )}
          </div>
        </>
      )}

      <footer className="guia-footer">
        <p className="guia-footer-line">
          {totalStructures} structures · saved to <em>“{GUIA_C1_TARGET_LIST_NAME}”</em> in My Vocabulary
        </p>
      </footer>

      {toast && <div className="guia-toast" role="status">{toast}</div>}
    </section>
  );
}

// Render the structure groups (rows with a Save button) for a section.
function renderGroups(active, savedSet, handleSaveOne) {
  return active.groups.map((group, gi) => (
    <div key={gi} className="guia-group">
      {active.groups.length > 1 && (
        <div className="guia-group-label">{group.label}</div>
      )}
      <ul className="guia-list">
        {group.items.map((item, ii) => {
          const isSaved = savedSet.has(item.en);
          return (
            <li key={ii} className="guia-item">
              <div className="guia-item-text">
                <div className="guia-item-en">{item.en}</div>
                <div className="guia-item-es">{item.es}</div>
              </div>
              <button
                type="button"
                className={`guia-item-save ${isSaved ? "guia-item-save-done" : ""}`}
                onClick={() => handleSaveOne(item)}
                aria-label={isSaved ? "Saved to your lists" : "Save to your lists"}
                title={isSaved ? "Saved" : "Save to your vocabulary lists"}
              >
                {isSaved ? "✓ Saved" : "+ Save"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  ));
}
