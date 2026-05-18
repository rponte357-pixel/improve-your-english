// ListEditor — full edit/study view for a single custom vocabulary list.
//
// Opened from MyListsView when the user clicks a list card. Owns:
//   • Topbar with inline rename of the list name.
//   • Tab row: Edit (functional in A3) + 4 study modes (locked, A4).
//   • Edit tab: word list with inline edit and inline delete-confirm,
//     plus an always-visible "add new word" form at the bottom.
//   • Soft-cap warning above the add form once total words across all
//     lists exceeds SOFT_TOTAL_WORDS_WARNING.
//
// Why this isn't a route: keeps the navigation flow consistent with the
// rest of Vocabulary (BlockSelector → ThemeView is also internal state)
// and avoids nesting routes inside HashRouter for GitHub Pages.
//
// Why we surface "locked" tabs at all: showing where study modes will
// live is more honest than hiding them. The user can already see the
// shape of the finished feature.

import { useEffect, useRef, useState } from "react";
import {
  useCustomLists,
  SOFT_TOTAL_WORDS_WARNING,
  MAX_NAME_LENGTH,
} from "../data/customLists";
import { lookupDictionary } from "../data/dictionary";

const MODE_TABS = [
  { id: "edit",       label: "Edit",                  icon: null },
  { id: "flashcards", label: "🃏 Flashcards",          icon: null },
  { id: "quiz",       label: "❓ Quiz",                icon: null },
  { id: "matching",   label: "🔀 Matching",            icon: null },
  { id: "stats",      label: "📊 Stats",               icon: null },
];

export default function ListEditor({ listId, onBack }) {
  const {
    getList,
    totalWords,
    renameList,
    addWord,
    editWord,
    removeWord,
  } = useCustomLists();

  // Pull the list fresh on every render via getList — useCustomLists()
  // re-reads from state, so this stays in sync with mutations.
  const list = getList(listId);

  const [activeTab, setActiveTab] = useState("edit");

  // ─── Rename state ───────────────────────────────────────────────────
  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [renameError, setRenameError] = useState(null);
  const renameInputRef = useRef(null);

  useEffect(() => {
    if (renaming && renameInputRef.current) renameInputRef.current.focus();
  }, [renaming]);

  // If the list disappears underneath us (deleted from another tab,
  // storage cleared, etc.) bounce back to the list of lists.
  if (!list) {
    return (
      <div className="vocab-le-missing">
        <p>This list no longer exists.</p>
        <button className="vocab-le-back-btn" onClick={onBack}>
          ← My lists
        </button>
      </div>
    );
  }

  const startRename = () => {
    setDraftName(list.name);
    setRenameError(null);
    setRenaming(true);
  };
  const cancelRename = () => {
    setRenaming(false);
    setDraftName("");
    setRenameError(null);
  };
  const submitRename = () => {
    const result = renameList(listId, draftName);
    if (!result.ok) {
      setRenameError(result.error);
      return;
    }
    setRenaming(false);
    setRenameError(null);
  };
  const renameKey = (e) => {
    if (e.key === "Enter")  { e.preventDefault(); submitRename(); }
    if (e.key === "Escape") { e.preventDefault(); cancelRename(); }
  };

  return (
    <>
      {/* ─── Topbar ─── */}
      <div className="vocab-blocknav">
        <button className="vocab-blocknav-back" onClick={onBack}>
          ← My lists
        </button>

        <div className="vocab-blocknav-title vocab-le-title">
          {!renaming ? (
            <button
              className="vocab-le-name-btn"
              onClick={startRename}
              title="Rename this list"
            >
              <span className="vocab-le-name">{list.name}</span>
              <span className="vocab-le-pencil" aria-hidden="true">✎</span>
            </button>
          ) : (
            <div className="vocab-le-rename">
              <input
                ref={renameInputRef}
                type="text"
                className={`vocab-le-rename-input ${renameError ? "vocab-le-input-error" : ""}`}
                value={draftName}
                onChange={(e) => {
                  setDraftName(e.target.value);
                  if (renameError) setRenameError(null);
                }}
                onKeyDown={renameKey}
                maxLength={MAX_NAME_LENGTH}
              />
              <button className="vocab-le-save-btn" onClick={submitRename}>
                Save
              </button>
              <button className="vocab-le-cancel-btn" onClick={cancelRename}>
                Cancel
              </button>
            </div>
          )}
          {renameError && (
            <div className="vocab-le-rename-error">⚠ {renameError}</div>
          )}
        </div>

        <div className="vocab-le-counter">
          {list.words.length} {list.words.length === 1 ? "word" : "words"}
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div className="vocab-tabs vocab-le-tabs">
        {MODE_TABS.map((t) => {
          const locked = t.id !== "edit";
          return (
            <button
              key={t.id}
              className={`vocab-tab ${activeTab === t.id ? "vocab-tab-on" : ""} ${locked ? "vocab-le-tab-locked" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
              {locked && <span className="vocab-le-tab-soon">A4</span>}
            </button>
          );
        })}
      </div>

      {/* ─── Body ─── */}
      {activeTab === "edit" && (
        <EditTab
          list={list}
          totalWords={totalWords}
          addWord={addWord}
          editWord={editWord}
          removeWord={removeWord}
        />
      )}

      {activeTab !== "edit" && (
        <LockedTab tab={MODE_TABS.find((t) => t.id === activeTab)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// EditTab — word list + per-row edit/delete + add form
// ─────────────────────────────────────────────────────────────────────

function EditTab({ list, totalWords, addWord, editWord, removeWord }) {
  // Word-level micro-states. At most one row at a time can be in any of
  // these — UI cancels the others when a new one opens.
  const [editingEn, setEditingEn]         = useState(null);  // wordEn
  const [confirmingEn, setConfirmingEn]   = useState(null);
  const [quickCheckEn, setQuickCheckEn]   = useState(null);  // r35

  // Reset row-level UI state when the list changes (e.g. user goes
  // back and opens a different list without unmounting the editor).
  useEffect(() => {
    setEditingEn(null);
    setConfirmingEn(null);
    setQuickCheckEn(null);
  }, [list.id]);

  const startEdit = (word) => {
    setConfirmingEn(null);
    setQuickCheckEn(null);
    setEditingEn(word.en);
  };
  const cancelEdit = () => setEditingEn(null);

  const requestDelete = (word) => {
    setEditingEn(null);
    setQuickCheckEn(null);
    setConfirmingEn(word.en);
  };
  const cancelDelete = () => setConfirmingEn(null);
  const confirmDelete = (word) => {
    removeWord(list.id, word.en);
    setConfirmingEn(null);
  };

  // Quick check (r35): only meaningful for rows without a Spanish
  // translation yet. Opens an inline expanded panel below the row.
  const startQuickCheck = (word) => {
    setEditingEn(null);
    setConfirmingEn(null);
    setQuickCheckEn(word.en);
  };
  const cancelQuickCheck = () => setQuickCheckEn(null);

  // Soft cap surfaces a warning banner — never blocks. The 500 figure
  // comes from customLists.js (SOFT_TOTAL_WORDS_WARNING).
  const overSoftCap = totalWords >= SOFT_TOTAL_WORDS_WARNING;

  return (
    <>
      {list.words.length === 0 && (
        <div className="vocab-le-empty-words">
          <p>This list is empty — add your first word below.</p>
        </div>
      )}

      {list.words.length > 0 && (
        <div className="vocab-le-words">
          {list.words.map((word) => {
            const isEditing      = editingEn === word.en;
            const isConfirming   = confirmingEn === word.en;
            const isQuickCheck   = quickCheckEn === word.en;
            return (
              <WordRow
                key={word.en}
                word={word}
                listId={list.id}
                otherEns={list.words
                  .filter((w) => w.en !== word.en)
                  .map((w) => w.en.toLowerCase())}
                isEditing={isEditing}
                isConfirming={isConfirming}
                isQuickCheck={isQuickCheck}
                onStartEdit={() => startEdit(word)}
                onCancelEdit={cancelEdit}
                onSaveEdit={(updated) => {
                  const r = editWord(list.id, word.en, updated);
                  if (r.ok) setEditingEn(null);
                  return r;
                }}
                onRequestDelete={() => requestDelete(word)}
                onCancelDelete={cancelDelete}
                onConfirmDelete={() => confirmDelete(word)}
                onStartQuickCheck={() => startQuickCheck(word)}
                onCancelQuickCheck={cancelQuickCheck}
                onSaveQuickCheck={(updated) => {
                  const r = editWord(list.id, word.en, updated);
                  if (r.ok) setQuickCheckEn(null);
                  return r;
                }}
              />
            );
          })}
        </div>
      )}

      {overSoftCap && (
        <div className="vocab-le-cap-warning">
          ⚠ You have {totalWords} words across all your lists. Browser
          storage is limited — consider trimming unused lists if you
          notice slowdowns.
        </div>
      )}

      <AddWordForm
        listId={list.id}
        existingEns={list.words.map((w) => w.en.toLowerCase())}
        addWord={addWord}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// WordRow — one row, three visual states (normal / editing / confirming)
// ─────────────────────────────────────────────────────────────────────

function WordRow({
  word,
  listId,
  otherEns,
  isEditing,
  isConfirming,
  isQuickCheck,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
  onStartQuickCheck,
  onCancelQuickCheck,
  onSaveQuickCheck,
}) {
  // Local draft while editing — never mutates the parent until Save.
  const [draftEn, setDraftEn]   = useState(word.en);
  const [draftEs, setDraftEs]   = useState(word.es || "");
  const [draftEx, setDraftEx]   = useState(word.example || "");
  const [draftEx2, setDraftEx2] = useState(word.example2 || "");
  const [draftPos, setDraftPos] = useState(word.partOfSpeech || "");
  const [error, setError]       = useState(null);
  const enInputRef              = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setDraftEn(word.en);
      setDraftEs(word.es || "");
      setDraftEx(word.example || "");
      setDraftEx2(word.example2 || "");
      setDraftPos(word.partOfSpeech || "");
      setError(null);
      setTimeout(() => enInputRef.current?.focus(), 0);
    }
  }, [isEditing, word.en, word.es, word.example, word.example2, word.partOfSpeech]);

  const onKeyDown = (e) => {
    if (e.key === "Escape") { e.preventDefault(); onCancelEdit(); }
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); doSave(); }
  };

  const doSave = () => {
    const cleanEn = draftEn.trim().toLowerCase();
    if (cleanEn && otherEns.includes(cleanEn)) {
      setError(`"${draftEn.trim()}" is already in this list`);
      return;
    }
    const r = onSaveEdit({
      en: draftEn,
      es: draftEs,
      example: draftEx,
      example2: draftEx2,
      partOfSpeech: draftPos,
    });
    if (!r.ok) setError(r.error);
  };

  // ─── State 1: editing inline ──────────────────────────────────────
  if (isEditing) {
    return (
      <div className="vocab-le-row vocab-le-row-editing">
        <input
          ref={enInputRef}
          type="text"
          className="vocab-le-row-input"
          value={draftEn}
          onChange={(e) => { setDraftEn(e.target.value); if (error) setError(null); }}
          onKeyDown={onKeyDown}
          placeholder="English"
          maxLength={80}
        />
        <input
          type="text"
          className="vocab-le-row-input"
          value={draftEs}
          onChange={(e) => { setDraftEs(e.target.value); if (error) setError(null); }}
          onKeyDown={onKeyDown}
          placeholder="Spanish (optional)"
          maxLength={80}
        />
        <div className="vocab-le-row-actions">
          <button className="vocab-le-save-btn" onClick={doSave}>Save</button>
          <button className="vocab-le-cancel-btn" onClick={onCancelEdit}>Cancel</button>
        </div>
        <input
          type="text"
          className="vocab-le-row-input vocab-le-row-input-ex"
          value={draftEx}
          onChange={(e) => setDraftEx(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Example sentence (optional)"
          maxLength={240}
        />
        <input
          type="text"
          className="vocab-le-row-input vocab-le-row-input-ex"
          value={draftEx2}
          onChange={(e) => setDraftEx2(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Second example sentence (optional)"
          maxLength={240}
        />
        {error && (
          <div className="vocab-le-row-error">⚠ {error}</div>
        )}
      </div>
    );
  }

  // ─── State 2 + 3: normal / confirming-delete (+ quick-check expanded) ─
  // The row body itself is the same in normal and confirming. The
  // Quick check panel renders BELOW the row when active, so we wrap
  // both in a fragment-like container.
  const showQuickCheckBtn = !word.es && !isConfirming;

  return (
    <div className={`vocab-le-row ${isConfirming ? "vocab-le-row-confirming" : ""} ${isQuickCheck ? "vocab-le-row-quick" : ""}`}>
      <span className="vocab-le-row-en">
        {word.en}
        {word.partOfSpeech && (
          <span className="vocab-le-row-pos">{word.partOfSpeech}</span>
        )}
      </span>
      <span className={`vocab-le-row-es ${!word.es ? "vocab-le-row-es-empty" : ""}`}>
        {word.es || "— no translation yet"}
      </span>
      {isConfirming ? (
        <div className="vocab-le-row-confirm">
          <span className="vocab-le-row-confirm-text">Delete?</span>
          <button
            className="vocab-le-row-confirm-yes"
            onClick={onConfirmDelete}
          >
            Yes
          </button>
          <button
            className="vocab-le-row-confirm-no"
            onClick={onCancelDelete}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="vocab-le-row-actions">
          {showQuickCheckBtn && (
            <button
              className="vocab-le-qc-btn"
              onClick={onStartQuickCheck}
              title="Look up this word in the dictionary"
            >
              🔎 Quick check
            </button>
          )}
          <button
            className="vocab-le-icon-btn"
            onClick={onStartEdit}
            title="Edit this word"
          >
            ✎
          </button>
          <button
            className="vocab-le-icon-btn vocab-le-icon-danger"
            onClick={onRequestDelete}
            title="Delete this word"
          >
            🗑
          </button>
        </div>
      )}
      {word.example && !isConfirming && (
        <div className="vocab-le-row-ex">"{word.example}"</div>
      )}
      {word.example2 && !isConfirming && (
        <div className="vocab-le-row-ex">"{word.example2}"</div>
      )}
      {isQuickCheck && (
        <QuickCheckPanel
          word={word}
          onCancel={onCancelQuickCheck}
          onSave={onSaveQuickCheck}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// QuickCheckPanel — inline expanded panel shown below a word when the
// user pulls the Quick check trigger. Fetches a definition from
// dictionaryapi.dev, lets the user edit the result, then saves.
// ─────────────────────────────────────────────────────────────────────

function QuickCheckPanel({ word, onCancel, onSave }) {
  // status: 'loading' | 'ready' | 'error'
  const [status, setStatus]   = useState("loading");
  const [errMsg, setErrMsg]   = useState("");
  const [dictPos, setDictPos] = useState("");
  const [dictDef, setDictDef] = useState("");

  // Editable fields. We seed them from the dictionary response when it
  // arrives; the user can override anything before saving.
  const [draftEs, setDraftEs]   = useState(word.es || "");
  const [draftEx, setDraftEx]   = useState(word.example || "");
  const [draftEx2, setDraftEx2] = useState(word.example2 || "");
  const [draftPos, setDraftPos] = useState(word.partOfSpeech || "");

  const [saveErr, setSaveErr] = useState(null);

  // Fire the dictionary lookup on mount. We use an AbortController so
  // navigating away or closing the panel mid-flight doesn't cause a
  // state update on an unmounted component.
  useEffect(() => {
    const ac = new AbortController();
    setStatus("loading");
    setErrMsg("");
    (async () => {
      const result = await lookupDictionary(word.en, { signal: ac.signal });
      if (ac.signal.aborted) return;
      if (!result.ok) {
        setStatus("error");
        setErrMsg(result.error);
        return;
      }
      const { partOfSpeech, definition, examples } = result.data;
      setDictPos(partOfSpeech);
      setDictDef(definition);
      // Pre-fill editable fields ONLY where the user hasn't typed
      // anything yet (don't overwrite their existing value).
      setDraftPos((prev) => prev || partOfSpeech);
      setDraftEx((prev)  => prev || examples[0] || "");
      setDraftEx2((prev) => prev || examples[1] || "");
      setStatus("ready");
    })();
    return () => ac.abort();
  }, [word.en]);

  const doSave = () => {
    const r = onSave({
      en: word.en,
      es: draftEs,
      example: draftEx,
      example2: draftEx2,
      partOfSpeech: draftPos,
    });
    if (!r.ok) setSaveErr(r.error);
  };

  return (
    <div className="vocab-le-qc-panel">
      {status === "loading" && (
        <div className="vocab-le-qc-loading">
          <span className="vocab-le-qc-spinner" aria-hidden="true">⏳</span>
          <span>Looking up "{word.en}" in the dictionary…</span>
        </div>
      )}

      {status === "error" && (
        <>
          <div className="vocab-le-qc-error">⚠ {errMsg}</div>
          <p className="vocab-le-qc-hint">
            You can still fill the fields manually below.
          </p>
          <QuickCheckForm
            draftEs={draftEs} setDraftEs={setDraftEs}
            draftEx={draftEx} setDraftEx={setDraftEx}
            draftEx2={draftEx2} setDraftEx2={setDraftEx2}
            draftPos={draftPos} setDraftPos={setDraftPos}
          />
          {saveErr && <div className="vocab-le-qc-error">⚠ {saveErr}</div>}
          <div className="vocab-le-qc-actions">
            <button className="vocab-le-cancel-btn" onClick={onCancel}>Cancel</button>
            <button className="vocab-le-save-btn" onClick={doSave}>Save</button>
          </div>
        </>
      )}

      {status === "ready" && (
        <>
          <div className="vocab-le-qc-head">
            {dictPos && <span className="vocab-le-qc-tag">{dictPos}</span>}
            <p className="vocab-le-qc-def">{dictDef}</p>
          </div>
          <QuickCheckForm
            draftEs={draftEs} setDraftEs={setDraftEs}
            draftEx={draftEx} setDraftEx={setDraftEx}
            draftEx2={draftEx2} setDraftEx2={setDraftEx2}
            draftPos={draftPos} setDraftPos={setDraftPos}
          />
          {saveErr && <div className="vocab-le-qc-error">⚠ {saveErr}</div>}
          <div className="vocab-le-qc-actions">
            <button className="vocab-le-cancel-btn" onClick={onCancel}>Cancel</button>
            <button className="vocab-le-save-btn" onClick={doSave}>Save</button>
          </div>
        </>
      )}
    </div>
  );
}

// Editable form shared by both the "ready" and "error" branches of
// QuickCheckPanel. Lifted out for readability and to avoid duplicated
// markup.
function QuickCheckForm({
  draftEs, setDraftEs,
  draftEx, setDraftEx,
  draftEx2, setDraftEx2,
  draftPos, setDraftPos,
}) {
  return (
    <>
      <div className="vocab-le-qc-section">SPANISH TRANSLATION</div>
      <input
        type="text"
        className="vocab-le-row-input"
        value={draftEs}
        placeholder="Type your Spanish translation…"
        onChange={(e) => setDraftEs(e.target.value)}
        maxLength={80}
      />

      <div className="vocab-le-qc-section">PART OF SPEECH</div>
      <input
        type="text"
        className="vocab-le-row-input"
        value={draftPos}
        placeholder='e.g. "Noun", "Phrasal verb"'
        onChange={(e) => setDraftPos(e.target.value)}
        maxLength={40}
      />

      <div className="vocab-le-qc-section">EXAMPLE 1</div>
      <input
        type="text"
        className="vocab-le-row-input"
        value={draftEx}
        placeholder="First example sentence"
        onChange={(e) => setDraftEx(e.target.value)}
        maxLength={240}
      />

      <div className="vocab-le-qc-section">EXAMPLE 2</div>
      <input
        type="text"
        className="vocab-le-row-input"
        value={draftEx2}
        placeholder="Second example sentence"
        onChange={(e) => setDraftEx2(e.target.value)}
        maxLength={240}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// AddWordForm — always visible at the bottom of the Edit tab
// ─────────────────────────────────────────────────────────────────────

function AddWordForm({ listId, existingEns, addWord }) {
  const [en, setEn] = useState("");
  const [es, setEs] = useState("");
  const [ex, setEx] = useState("");
  const [error, setError] = useState(null);
  const enInputRef = useRef(null);

  // Spanish is OPTIONAL now (r35) — users can save a word without
  // translating it yet and use the per-row "Quick check" button later
  // to look up the definition.
  const canSubmit = en.trim().length > 0;

  const reset = () => {
    setEn("");
    setEs("");
    setEx("");
    setError(null);
    // Bring focus back to "English" so users can keep adding words
    // without taking their hands off the keyboard.
    setTimeout(() => enInputRef.current?.focus(), 0);
  };

  const submit = () => {
    if (!canSubmit) return;
    // Local duplicate check for a nicer message before the hook's
    // generic one fires.
    const cleanEn = en.trim().toLowerCase();
    if (existingEns.includes(cleanEn)) {
      setError(`"${en.trim()}" is already in this list`);
      return;
    }
    const r = addWord(listId, { en, es, example: ex });
    if (!r.ok) { setError(r.error); return; }
    reset();
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  return (
    <div className="vocab-le-add">
      <div className="vocab-le-add-h">+ ADD NEW WORD</div>
      <div className="vocab-le-add-grid">
        <input
          ref={enInputRef}
          type="text"
          className="vocab-le-row-input"
          placeholder="English word"
          value={en}
          onChange={(e) => { setEn(e.target.value); if (error) setError(null); }}
          onKeyDown={onKey}
          maxLength={80}
        />
        <input
          type="text"
          className="vocab-le-row-input"
          placeholder="Spanish translation (optional)"
          value={es}
          onChange={(e) => { setEs(e.target.value); if (error) setError(null); }}
          onKeyDown={onKey}
          maxLength={80}
        />
        <button
          className="vocab-le-add-btn"
          onClick={submit}
          disabled={!canSubmit}
        >
          + Add
        </button>
        <input
          type="text"
          className="vocab-le-row-input vocab-le-add-ex"
          placeholder="Example sentence (optional)"
          value={ex}
          onChange={(e) => setEx(e.target.value)}
          onKeyDown={onKey}
          maxLength={240}
        />
      </div>
      {error && <div className="vocab-le-row-error">⚠ {error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// LockedTab — placeholder shown for the 4 study modes until A4
// ─────────────────────────────────────────────────────────────────────

function LockedTab({ tab }) {
  return (
    <div className="vocab-le-locked">
      <div className="vocab-le-locked-icon">🔒</div>
      <div className="vocab-le-locked-h">
        {tab?.label || "This mode"} — coming in the next round
      </div>
      <div className="vocab-le-locked-s">
        All four study modes will be wired to your custom lists in Round
        A4 (the one after this). For now you can build the list in the
        Edit tab.
      </div>
    </div>
  );
}
