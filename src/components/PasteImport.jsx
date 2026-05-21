// PasteImport — 3-step wizard for importing words by pasting text.
//
// Used from MyListsView (button "📋 Paste & import"). Owns its own
// step state; on success calls onDone() and the parent navigates back
// to the list of lists. Cancel returns the user without changes.
//
// Steps:
//   1 · Paste     — textarea + auto-detect feedback
//   2 · Review    — editable rows with per-field inputs, warnings,
//                   duplicates against the chosen destination
//   3 · Destination — new list (with name input) OR existing list
//
// Destination affects duplicate detection in step 2, so when the user
// changes destination we re-derive the "duplicate" flag on rows. We
// store the chosen destination as { kind: 'new' | 'existing', name? ,
// listId? }.

import { useEffect, useMemo, useRef, useState } from "react";
import {
  useCustomLists,
  validateWord,
  validateListName,
  makeListId,
} from "../data/customLists";
import {
  parsePaste,
  SOFT_ROW_WARNING,
} from "../data/pasteParser";

const STEPS = [
  { id: "paste",  label: "1 · Paste" },
  { id: "review", label: "2 · Review" },
  { id: "dest",   label: "3 · Destination" },
];

export default function PasteImport({ onCancel, onDone }) {
  const { lists } = useCustomLists();

  // ─── Wizard state ────────────────────────────────────────────────
  const [step, setStep]       = useState("paste");

  // Step 1
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed]       = useState(null);  // { rows, summary }

  // Step 2 — editable copy of parsed rows. Each row gets an `included`
  // flag (checkbox). Edits flow into local fields without mutating the
  // original parse result so users can re-parse from Step 1 cleanly.
  const [reviewRows, setReviewRows] = useState([]);

  // Step 3
  const [destKind, setDestKind]       = useState("new");  // 'new' | 'existing'
  const [newListName, setNewListName] = useState("");
  const [existingId, setExistingId]   = useState(null);

  // Final-import state
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState(null);

  // ─── Step 1 → Step 2 transition (parsing) ────────────────────────
  const goToReview = () => {
    const result = parsePaste(pasteText);
    setParsed(result);
    setReviewRows(
      result.rows.map((r, i) => ({
        ...r,
        id: `r${i}`,
        // Default-unchecked ONLY for rows clearly identified as headers
        // (either via the structured isHeader flag from token matching,
        // or via the all-caps heuristic warning). Everything else stays
        // checked — the user can uncheck what they don't want.
        included:
          !r.isHeader &&
          !r.warnings.includes("looks like a header"),
      }))
    );
    setStep("review");
  };

  // ─── Step 2 helpers ──────────────────────────────────────────────
  const updateRow = (rowId, patch) => {
    setReviewRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, ...patch } : r))
    );
  };
  const removeRow = (rowId) => {
    setReviewRows((prev) => prev.filter((r) => r.id !== rowId));
  };
  const selectAll  = () => setReviewRows((p) => p.map((r) => ({ ...r, included: true })));
  const selectNone = () => setReviewRows((p) => p.map((r) => ({ ...r, included: false })));

  // Resolve the chosen destination's existing words (lowercased) so we
  // can flag duplicates in the review table. Re-derived whenever the
  // destination changes.
  const destExistingEns = useMemo(() => {
    if (destKind === "existing" && existingId) {
      const l = lists.find((x) => x.id === existingId);
      return l ? new Set(l.words.map((w) => w.en.trim().toLowerCase())) : new Set();
    }
    return new Set();
  }, [destKind, existingId, lists]);

  // Decorated rows with `isDuplicate` and `isValid` flags computed.
  const decoratedRows = useMemo(() => {
    const seenInPaste = new Set();
    return reviewRows.map((r) => {
      const key = r.en.trim().toLowerCase();
      const dupInDest  = destExistingEns.has(key);
      const dupInPaste = key && seenInPaste.has(key);
      if (key) seenInPaste.add(key);
      const v = validateWord({
        en: r.en, es: r.es, example: r.example,
      });
      return {
        ...r,
        isDuplicate: dupInDest || dupInPaste,
        dupReason: dupInDest ? "in destination list" : dupInPaste ? "duplicate within paste" : null,
        isValid: v.ok,
        validationError: v.ok ? null : v.error,
      };
    });
  }, [reviewRows, destExistingEns]);

  const toImportCount = decoratedRows.filter(
    (r) => r.included && r.isValid && !r.isDuplicate
  ).length;

  const flaggedCount = decoratedRows.filter((r) => r.warnings.length > 0).length;
  const duplicateCount = decoratedRows.filter((r) => r.isDuplicate).length;

  // ─── Step 3 validation ───────────────────────────────────────────
  const destReady =
    (destKind === "new"      && newListName.trim().length > 0) ||
    (destKind === "existing" && !!existingId);

  // ─── Final import ────────────────────────────────────────────────
  //
  // We bypass the per-call useCustomLists API for this batched
  // operation. Doing createList() + addWord() N times via the hook
  // wouldn't work — every addWord call would close over a stale `lists`
  // array missing the just-created list, and we'd see "List not found"
  // errors. Instead we read the storage once, mutate it atomically and
  // write it back. The validators from data/customLists are reused so
  // shape/duplicate rules stay consistent. After the write, the parent
  // unmounts us via onDone and the consumer remounts with fresh data.
  const doImport = async () => {
    setImporting(true);
    setImportError(null);

    try {
      // Re-read storage to avoid racing with anything else that might
      // have written to localStorage in another tab.
      const raw = window.localStorage.getItem("iye:vocab:custom-lists");
      const currentLists = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(currentLists)) {
        throw new Error("Storage corrupted; please refresh and retry.");
      }

      // Resolve / create target list.
      let targetId = existingId;
      if (destKind === "new") {
        const trimmed = newListName.trim();
        const v = validateListName(
          trimmed,
          currentLists.map((l) => l.name)
        );
        if (!v.ok) {
          setImportError(v.error);
          setImporting(false);
          return;
        }
        const now = Date.now();
        const newList = {
          id: makeListId(),
          name: trimmed,
          createdAt: now,
          updatedAt: now,
          words: [],
        };
        currentLists.push(newList);
        targetId = newList.id;
      }

      const target = currentLists.find((l) => l.id === targetId);
      if (!target) {
        setImportError("Destination list not found.");
        setImporting(false);
        return;
      }

      // Add each included row in order. Duplicate / invalid rows are
      // already filtered out by the review UI, but we double-check to
      // stay safe against direct mutations.
      const existingEnsLower = new Set(
        target.words.map((w) => w.en.trim().toLowerCase())
      );
      let added = 0;
      let skipped = 0;
      for (const r of decoratedRows) {
        if (!r.included) continue;
        if (r.isDuplicate || !r.isValid) { skipped++; continue; }
        const enClean = r.en.trim();
        const enLower = enClean.toLowerCase();
        if (existingEnsLower.has(enLower)) { skipped++; continue; }

        const word = { en: enClean };
        if (r.es.trim())      word.es      = r.es.trim();
        if (r.example.trim()) word.example = r.example.trim();
        target.words.push(word);
        existingEnsLower.add(enLower);
        added++;
      }
      target.updatedAt = Date.now();

      window.localStorage.setItem(
        "iye:vocab:custom-lists",
        JSON.stringify(currentLists)
      );

      setImporting(false);
      onDone({
        listId: targetId,
        added,
        skipped,
        destKind,
      });
    } catch (e) {
      setImportError(
        e && e.message ? e.message : "Something went wrong during import."
      );
      setImporting(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────
  return (
    <>
      <div className="vocab-blocknav">
        <button className="vocab-blocknav-back" onClick={onCancel}>
          ← Cancel
        </button>
        <div className="vocab-blocknav-title">
          <span className="vocab-blocknav-icon vocab-blocknav-icon-custom">📋</span>
          <span>Paste &amp; import</span>
        </div>
        <div className="vocab-blocknav-spacer" />
      </div>

      <div className="vocab-pi-steps">
        {STEPS.map((s, idx) => {
          const cur = STEPS.findIndex((x) => x.id === step);
          const state = idx === cur ? "on" : idx < cur ? "done" : "todo";
          return (
            <span key={s.id} className={`vocab-pi-step vocab-pi-step-${state}`}>
              {s.label}
            </span>
          );
        })}
      </div>

      {step === "paste" && (
        <StepPaste
          pasteText={pasteText}
          setPasteText={setPasteText}
          onContinue={goToReview}
        />
      )}

      {step === "review" && parsed && (
        <StepReview
          rows={decoratedRows}
          summary={parsed.summary}
          toImportCount={toImportCount}
          flaggedCount={flaggedCount}
          duplicateCount={duplicateCount}
          updateRow={updateRow}
          removeRow={removeRow}
          selectAll={selectAll}
          selectNone={selectNone}
          onBack={() => setStep("paste")}
          onContinue={() => setStep("dest")}
        />
      )}

      {step === "dest" && (
        <StepDestination
          destKind={destKind}        setDestKind={setDestKind}
          newListName={newListName}  setNewListName={setNewListName}
          existingId={existingId}    setExistingId={setExistingId}
          lists={lists}
          destReady={destReady}
          toImportCount={toImportCount}
          importing={importing}
          importError={importError}
          onBack={() => setStep("review")}
          onImport={doImport}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Step 1 — Paste
// ─────────────────────────────────────────────────────────────────────

function StepPaste({ pasteText, setPasteText, onContinue }) {
  // Live preview of what would parse — purely informational, helps the
  // user notice issues before clicking Continue.
  const preview = useMemo(() => {
    if (!pasteText.trim()) return null;
    return parsePaste(pasteText);
  }, [pasteText]);

  const canContinue = pasteText.trim().length > 0;

  // Two collapsible help panels. Layout C from the r38 sketches:
  // permanent banner for the AI prompt, small "see formats" link as a
  // secondary affordance.
  const [showAiPanel, setShowAiPanel]         = useState(false);
  const [showFormatPanel, setShowFormatPanel] = useState(false);
  const [copyState, setCopyState]             = useState("idle"); // idle | done

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(AI_PROMPT_TEXT);
      setCopyState("done");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      // Fallback: select the textarea content so the user can Cmd+C.
      // Most modern browsers allow clipboard.writeText in HTTPS / file
      // contexts, so this fallback should be rare.
      setCopyState("idle");
    }
  };

  return (
    <div className="vocab-pi-card">
      <h2 className="vocab-pi-card-h">Paste your text below</h2>
      <p className="vocab-pi-card-s">
        Copy from a PDF, Word doc, web page or notes app.{" "}
        <button
          type="button"
          className="vocab-pi-link"
          onClick={() => setShowFormatPanel((v) => !v)}
        >
          {showFormatPanel ? "Hide" : "See"} supported formats
        </button>
      </p>

      {/* AI banner — always visible (layout C). */}
      <div className="vocab-pi-ai-banner">
        <span className="vocab-pi-ai-banner-text">
          <b>Got a long article or transcript?</b> Use our AI prompt to
          extract vocabulary in the exact format the app needs.
        </span>
        <button
          type="button"
          className="vocab-pi-ai-cta"
          onClick={() => setShowAiPanel((v) => !v)}
        >
          {showAiPanel ? "Hide prompt" : "✨ Get prompt"}
        </button>
      </div>

      {/* Format panel (collapsible) */}
      {showFormatPanel && (
        <div className="vocab-pi-help-panel">
          <div className="vocab-pi-help-h">SUPPORTED FORMATS</div>

          <div className="vocab-pi-help-label">
            Tab-separated · best (paste from Excel, Google Sheets or Word tables)
          </div>
          <pre className="vocab-pi-help-block">{`cumbersome\tengorroso\t"It feels cumbersome but reliable."
backlash\treacción negativa\t"the announcement triggered a backlash"`}</pre>

          <div className="vocab-pi-help-label">Em-dash or pipe separators</div>
          <pre className="vocab-pi-help-block">{`cumbersome — engorroso
backlash | reacción negativa | "triggered a backlash"`}</pre>

          <div className="vocab-pi-help-label">Comma — one entry per line</div>
          <pre className="vocab-pi-help-block">{`cumbersome, engorroso
to dwell on, dar vueltas a`}</pre>

          <ul className="vocab-pi-help-list">
            <li><b>ONE entry per line</b>. Don't put multiple words on the same line.</li>
            <li>Spanish translation and example are <b>optional</b>.</li>
            <li>Quotes around examples are stripped automatically.</li>
            <li>Header rows like "English / Spanish / Example" are detected and excluded.</li>
          </ul>
        </div>
      )}

      {/* AI prompt panel (collapsible) */}
      {showAiPanel && (
        <div className="vocab-pi-help-panel">
          <div className="vocab-pi-help-h">AI PROMPT</div>
          <p className="vocab-pi-help-intro">
            Paste this prompt into <b>ChatGPT</b>, <b>Claude</b>, <b>Gemini</b>{" "}
            or any other AI chat, then add your source text where it says
            <code> PASTE YOUR TEXT HERE</code>. Copy the AI's output and
            paste it in the textarea below.
          </p>
          <pre className="vocab-pi-help-block vocab-pi-help-block-tall">
{AI_PROMPT_TEXT}
          </pre>
          <div className="vocab-pi-help-actions">
            <button
              type="button"
              className="vocab-pi-help-copy"
              onClick={copyPrompt}
            >
              {copyState === "done" ? "✓ Copied!" : "📋 Copy prompt"}
            </button>
          </div>
        </div>
      )}

      <textarea
        className="vocab-pi-textarea"
        placeholder={
          "Paste here…\n\n" +
          "Examples:\n" +
          "cumbersome — engorroso\n" +
          "to live up to\n" +
          "by no means\tde ninguna manera\t\"is by no means a friendly place to be\"\n" +
          "backlash | reacción negativa"
        }
        value={pasteText}
        onChange={(e) => setPasteText(e.target.value)}
      />

      {preview && (
        <div className="vocab-pi-preview">
          <span className="vocab-pi-preview-num">
            <b>{preview.summary.total}</b> rows detected
          </span>
          <span className="vocab-pi-preview-num">
            <b>{preview.summary.withEs}</b> with translation
          </span>
          <span className="vocab-pi-preview-num">
            <b>{preview.summary.withExample}</b> with example
          </span>
          {preview.summary.flagged > 0 && (
            <span className="vocab-pi-preview-num vocab-pi-warn">
              <b>{preview.summary.flagged}</b> flagged
            </span>
          )}
          {preview.summary.total >= SOFT_ROW_WARNING && (
            <span className="vocab-pi-preview-num vocab-pi-warn">
              ⚠ that's a lot — is this intentional?
            </span>
          )}
        </div>
      )}

      <div className="vocab-pi-ctas">
        <span />
        <button
          className="vocab-pi-btn-primary"
          onClick={onContinue}
          disabled={!canContinue}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

// The "rigorous" AI prompt — embedded in source so it ships with the
// build and works fully offline (the user still needs an AI service to
// run the prompt against, of course). Comments inside the string would
// confuse the LLMs, so it's plain instructions.
const AI_PROMPT_TEXT = `You are extracting vocabulary from a text for an advanced English learning app. The target learner is a Spanish-speaker studying English at B1+/B2/C1 level (CEFR).

# Output format — STRICT
- ONE entry per line.
- Three fields per line, separated by a single TAB character.
- Order: english_term <TAB> spanish_translation <TAB> "example_from_text"
- No header row. No bullet points. No numbering. No commentary.
- If a term has no usable example in the source text, leave the third field empty (the line still has two TABs).
- Use straight double quotes "..." for the example, never curly quotes.
- Do NOT wrap the whole output in code fences.

# Selection rules
- Extract 8-15 vocabulary items that would be valuable for an advanced learner — uncommon words, phrasal verbs, idioms, collocations.
- Skip very basic terms the learner already knows.
- For phrasal verbs and idioms, keep them as a single English unit (e.g. "to dwell on", "by no means").
- Spanish translation should be natural Spanish, not literal. Multiple acceptable translations separated with " / " is fine.
- Example must come from the source text — quote directly or near-paraphrase. Never invent.

# Example output (format only)
to delve into\tprofundizar en / ahondar en\t"researchers delved into the archive for months"
backlash\treacción negativa\t"the announcement triggered an immediate backlash online"
to live up to\testar a la altura de\t"the sequel didn't live up to expectations"
by no means\tde ninguna manera\t"is by no means a friendly place to be"

# Source text
PASTE YOUR TEXT HERE

Now produce the vocabulary list following the rules above.`;

// ─────────────────────────────────────────────────────────────────────
// Step 2 — Review
// ─────────────────────────────────────────────────────────────────────

function StepReview({
  rows, toImportCount, flaggedCount, duplicateCount,
  updateRow, removeRow, selectAll, selectNone,
  onBack, onContinue,
}) {
  if (rows.length === 0) {
    return (
      <div className="vocab-pi-card">
        <p className="vocab-pi-card-s">
          No rows detected in your text. Go back and try again.
        </p>
        <div className="vocab-pi-ctas">
          <button className="vocab-pi-btn-secondary" onClick={onBack}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vocab-pi-card vocab-pi-review">
      <h2 className="vocab-pi-card-h">Review what we found</h2>
      <p className="vocab-pi-card-s">
        Edit any field, uncheck rows you don't want, or remove them with
        ✕. Rows flagged in amber look unusual; greyed rows are duplicates.
      </p>

      <div className="vocab-pi-summary">
        <span className="vocab-pi-stat"><b>{rows.length}</b> found</span>
        <span className="vocab-pi-stat"><b>{toImportCount}</b> will import</span>
        {flaggedCount > 0 && (
          <span className="vocab-pi-stat vocab-pi-warn"><b>{flaggedCount}</b> flagged</span>
        )}
        {duplicateCount > 0 && (
          <span className="vocab-pi-stat vocab-pi-muted"><b>{duplicateCount}</b> duplicates</span>
        )}
      </div>

      <div className="vocab-pi-bulk">
        <button type="button" onClick={selectAll}>Select all</button>
        <span className="vocab-pi-bulk-sep">·</span>
        <button type="button" onClick={selectNone}>Select none</button>
      </div>

      <div className="vocab-pi-rows">
        {rows.map((r) => (
          <ReviewRow
            key={r.id}
            row={r}
            onChange={(patch) => updateRow(r.id, patch)}
            onRemove={() => removeRow(r.id)}
          />
        ))}
      </div>

      <div className="vocab-pi-ctas">
        <button className="vocab-pi-btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button
          className="vocab-pi-btn-primary"
          onClick={onContinue}
          disabled={toImportCount === 0}
        >
          Continue ({toImportCount} word{toImportCount === 1 ? "" : "s"}) →
        </button>
      </div>
    </div>
  );
}

function ReviewRow({ row, onChange, onRemove }) {
  // A row is "flaggable" if it has warnings OR validation errors.
  // Duplicates have their own styling.
  const hasWarning   = row.warnings.length > 0 && !row.isDuplicate;
  const hasError     = !row.isValid && row.en.trim().length > 0;
  const cls = [
    "vocab-pi-row",
    !row.included && "vocab-pi-row-off",
    row.isDuplicate && "vocab-pi-row-dup",
    hasWarning && "vocab-pi-row-warn",
    hasError && "vocab-pi-row-err",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      <input
        type="checkbox"
        className="vocab-pi-check"
        checked={row.included}
        disabled={row.isDuplicate}
        onChange={(e) => onChange({ included: e.target.checked })}
        title={row.isDuplicate ? `Duplicate — ${row.dupReason}` : "Include this row"}
      />
      <div className="vocab-pi-fields">
        <input
          type="text"
          className="vocab-pi-input vocab-pi-input-en"
          value={row.en}
          placeholder="English"
          onChange={(e) => onChange({ en: e.target.value })}
        />
        <input
          type="text"
          className="vocab-pi-input vocab-pi-input-es"
          value={row.es}
          placeholder="Spanish (optional)"
          onChange={(e) => onChange({ es: e.target.value })}
        />
        <input
          type="text"
          className="vocab-pi-input vocab-pi-input-ex"
          value={row.example}
          placeholder="Example (optional)"
          onChange={(e) => onChange({ example: e.target.value })}
        />
      </div>
      <button
        type="button"
        className="vocab-pi-remove"
        onClick={onRemove}
        title="Remove this row entirely"
      >
        ✕
      </button>
      {row.isDuplicate && (
        <span className="vocab-pi-badge vocab-pi-badge-dup">
          DUPLICATE · {row.dupReason}
        </span>
      )}
      {row.isHeader && !row.isDuplicate && (
        <span className="vocab-pi-badge vocab-pi-badge-header">
          📋 HEADER ROW — excluded by default
        </span>
      )}
      {hasWarning && !row.isDuplicate && !row.isHeader && (
        <span className="vocab-pi-badge vocab-pi-badge-warn">
          ⚠ {row.warnings[0]}
        </span>
      )}
      {hasError && !row.isDuplicate && (
        <span className="vocab-pi-badge vocab-pi-badge-err">
          ⚠ {row.validationError}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Step 3 — Destination
// ─────────────────────────────────────────────────────────────────────

function StepDestination({
  destKind, setDestKind,
  newListName, setNewListName,
  existingId, setExistingId,
  lists,
  destReady, toImportCount,
  importing, importError,
  onBack, onImport,
}) {
  // If there are no existing lists, we hide the "existing" choice
  // entirely — there's nothing meaningful to pick.
  const showExisting = lists.length > 0;

  return (
    <div className="vocab-pi-card">
      <h2 className="vocab-pi-card-h">
        Where do these {toImportCount} word{toImportCount === 1 ? "" : "s"} go?
      </h2>

      <div className="vocab-pi-dest-options">
        <button
          type="button"
          className={`vocab-pi-dest-opt ${destKind === "new" ? "vocab-pi-dest-opt-on" : ""}`}
          onClick={() => setDestKind("new")}
        >
          <span className="vocab-pi-dest-radio" />
          <div>
            <div className="vocab-pi-dest-label">Create a new list</div>
            <div className="vocab-pi-dest-sub">
              Start a new list with these words
            </div>
          </div>
        </button>

        {destKind === "new" && (
          <input
            type="text"
            className="vocab-pi-dest-input"
            placeholder="List name (e.g. Advanced Vocab — June)"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            autoFocus
            maxLength={60}
          />
        )}

        {showExisting && (
          <button
            type="button"
            className={`vocab-pi-dest-opt ${destKind === "existing" ? "vocab-pi-dest-opt-on" : ""}`}
            onClick={() => setDestKind("existing")}
          >
            <span className="vocab-pi-dest-radio" />
            <div>
              <div className="vocab-pi-dest-label">Add to an existing list</div>
              <div className="vocab-pi-dest-sub">
                Append these words to a list you already have
              </div>
            </div>
          </button>
        )}

        {destKind === "existing" && showExisting && (
          <div className="vocab-pi-dest-list">
            {lists.map((l) => (
              <button
                type="button"
                key={l.id}
                className={`vocab-pi-dest-list-row ${existingId === l.id ? "vocab-pi-dest-list-row-on" : ""}`}
                onClick={() => setExistingId(l.id)}
              >
                <span>{l.name}</span>
                <span className="vocab-pi-dest-list-meta">
                  {l.words.length} {l.words.length === 1 ? "word" : "words"}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {importError && (
        <div className="vocab-pi-error">⚠ {importError}</div>
      )}

      <div className="vocab-pi-ctas">
        <button
          className="vocab-pi-btn-secondary"
          onClick={onBack}
          disabled={importing}
        >
          ← Back
        </button>
        <button
          className="vocab-pi-btn-primary"
          onClick={onImport}
          disabled={!destReady || importing || toImportCount === 0}
        >
          {importing
            ? "Importing…"
            : `Import ${toImportCount} word${toImportCount === 1 ? "" : "s"} →`}
        </button>
      </div>
    </div>
  );
}
