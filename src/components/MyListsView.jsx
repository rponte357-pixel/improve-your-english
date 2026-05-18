// MyListsView — "My Vocabulary" view shown after the user picks the
// custom (⭐) block in the Vocabulary BlockSelector.
//
// Responsibilities:
//   • List the user's custom vocabulary lists as cards.
//   • Empty state when no lists exist yet.
//   • Inline form to create a new list (no modal).
//   • Inline delete confirmation on each card (no modal).
//   • Click a card body → call onOpenList(listId) so the parent can
//     navigate to the editor / study view (A3 / A4).
//
// What this component does NOT do (yet):
//   • Renaming a list (lives in the editor view in A3).
//   • Editing words inside a list (A3).
//   • Launching study modes from the card (A4).
//
// Data + persistence is handled entirely by useCustomLists() from
// ../data/customLists. This component is presentational on top.

import { useEffect, useRef, useState } from "react";
import { useCustomLists } from "../data/customLists";

export default function MyListsView({ onBack, onOpenList }) {
  const {
    lists,
    totalLists,
    totalWords,
    createList,
    deleteList,
  } = useCustomLists();

  // ─── Create-form state ──────────────────────────────────────────────
  const [creating, setCreating] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [createError, setCreateError] = useState(null);
  const draftInputRef = useRef(null);

  // Auto-focus the input as soon as the form expands.
  useEffect(() => {
    if (creating && draftInputRef.current) {
      draftInputRef.current.focus();
    }
  }, [creating]);

  const openCreateForm = () => {
    setCreating(true);
    setDraftName("");
    setCreateError(null);
  };

  const cancelCreate = () => {
    setCreating(false);
    setDraftName("");
    setCreateError(null);
  };

  const submitCreate = () => {
    const result = createList(draftName);
    if (!result.ok) {
      setCreateError(result.error);
      return;
    }
    setCreating(false);
    setDraftName("");
    setCreateError(null);
    // We deliberately do NOT auto-open the new list. Most users will
    // create several in a row, or want to see it land in the list.
  };

  const onCreateKeyDown = (e) => {
    if (e.key === "Enter")  { e.preventDefault(); submitCreate(); }
    if (e.key === "Escape") { e.preventDefault(); cancelCreate(); }
  };

  // ─── Delete-confirm state ───────────────────────────────────────────
  // We track at most one card in "confirming delete" mode at a time.
  const [confirmingId, setConfirmingId] = useState(null);

  // Clicking outside the confirming card cancels the prompt. Listening
  // to document is heavy-handed; we just reset on any list-level click.
  useEffect(() => {
    if (!confirmingId) return;
    const onKey = (e) => {
      if (e.key === "Escape") setConfirmingId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmingId]);

  const requestDelete = (listId) => {
    setConfirmingId(listId);
  };

  const confirmDelete = (listId) => {
    deleteList(listId);
    setConfirmingId(null);
  };

  // ─── Render ─────────────────────────────────────────────────────────
  return (
    <>
      <div className="vocab-blocknav">
        <button className="vocab-blocknav-back" onClick={onBack}>
          ← Back to blocks
        </button>
        <div className="vocab-blocknav-title">
          <span className="vocab-blocknav-icon vocab-blocknav-icon-custom">🗂️</span>
          <span>My Vocabulary</span>
        </div>
        <div className="vocab-blocknav-spacer" />
      </div>

      <header className="vocab-cl-header">
        <h2 className="vocab-cl-h">Your custom lists</h2>
        <p className="vocab-cl-sub">
          Build your own word lists from class notes, mistakes you keep
          making, or vocabulary you want to revise — and study them with
          the same four modes as the EOI blocks.
        </p>
        {totalLists > 0 && (
          <div className="vocab-cl-counter">
            {totalLists} {totalLists === 1 ? "list" : "lists"} ·{" "}
            {totalWords} {totalWords === 1 ? "word" : "words"}
          </div>
        )}
      </header>

      {/* ─── Empty state ─── */}
      {totalLists === 0 && !creating && (
        <div className="vocab-cl-empty">
          <div className="vocab-cl-empty-icon">🗂️</div>
          <div className="vocab-cl-empty-title">
            You haven't created any lists yet
          </div>
          <p className="vocab-cl-empty-sub">
            Build your own word lists from class notes, mistakes you keep
            making, or vocabulary you want to revise. You'll study them
            with the same four modes as the EOI blocks.
          </p>
          <button className="vocab-cl-empty-cta" onClick={openCreateForm}>
            + Create your first list
          </button>
          <div className="vocab-cl-empty-hint">
            Tip: keep each list focused on one theme or purpose.
          </div>
        </div>
      )}

      {/* ─── List of cards ─── */}
      {totalLists > 0 && (
        <div className="vocab-cl-list">
          {lists.map((list) => {
            const isConfirming = confirmingId === list.id;
            return (
              <div
                key={list.id}
                className={`vocab-cl-card ${isConfirming ? "vocab-cl-card-confirming" : ""}`}
              >
                <button
                  className="vocab-cl-card-body"
                  onClick={() => onOpenList(list.id)}
                  disabled={isConfirming}
                  title="Open this list"
                >
                  <div className="vocab-cl-card-title">{list.name}</div>
                  <div className="vocab-cl-card-meta">
                    {list.words.length === 0
                      ? "no words yet"
                      : `${list.words.length} ${list.words.length === 1 ? "word" : "words"}`}
                  </div>
                </button>

                {isConfirming ? (
                  <div className="vocab-cl-confirm">
                    <span className="vocab-cl-confirm-text">Delete?</span>
                    <button
                      className="vocab-cl-confirm-yes"
                      onClick={() => confirmDelete(list.id)}
                    >
                      Yes
                    </button>
                    <button
                      className="vocab-cl-confirm-no"
                      onClick={() => setConfirmingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="vocab-cl-card-actions">
                    <button
                      className="vocab-cl-icon-btn"
                      onClick={() => onOpenList(list.id)}
                      title="Edit list"
                    >
                      ✎
                    </button>
                    <button
                      className="vocab-cl-icon-btn vocab-cl-icon-danger"
                      onClick={() => requestDelete(list.id)}
                      title="Delete list"
                    >
                      🗑
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Create form / button ─── */}
      {(totalLists > 0 || creating) && (
        <div className="vocab-cl-create">
          {!creating && (
            <button className="vocab-cl-add-btn" onClick={openCreateForm}>
              + New list
            </button>
          )}

          {creating && (
            <div className="vocab-cl-create-form">
              <div className="vocab-cl-create-row">
                <input
                  ref={draftInputRef}
                  type="text"
                  className={`vocab-cl-input ${createError ? "vocab-cl-input-error" : ""}`}
                  placeholder="List name (e.g. EOI Mock Exam — June)"
                  value={draftName}
                  onChange={(e) => {
                    setDraftName(e.target.value);
                    if (createError) setCreateError(null);
                  }}
                  onKeyDown={onCreateKeyDown}
                  maxLength={60}
                />
                <button
                  className="vocab-cl-create-btn"
                  onClick={submitCreate}
                  disabled={!draftName.trim()}
                >
                  Create
                </button>
                <button
                  className="vocab-cl-cancel-btn"
                  onClick={cancelCreate}
                >
                  Cancel
                </button>
              </div>
              {createError && (
                <div className="vocab-cl-error">⚠ {createError}</div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
