// ─── Roots editor (read-only for now, piece 3a) ─────────────────────
// Reads roots + words straight from Supabase and shows one root at a
// time: pick a root, see its words grouped by category. No editing yet
// — that's piece 3b. This proves the editor reads live data correctly.

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { loadAndExportRoots } from "../data/pdfRenderer";

const CATEGORIES = [
  { id: "verb",      label: "Verbs" },
  { id: "noun",      label: "Nouns" },
  { id: "adjective", label: "Adjectives" },
  { id: "adverb",    label: "Adverbs" },
  { id: "negative",  label: "Negatives" },
  { id: "related",   label: "Related" },
];

export default function RootsEditor() {
  const [roots, setRoots] = useState([]);
  const [rootId, setRootId] = useState(null);
  const [words, setWords] = useState([]);
  const [loadingRoots, setLoadingRoots] = useState(true);
  const [loadingWords, setLoadingWords] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // word being edited
  const [savedId, setSavedId] = useState(null);      // word just saved (✓)
  const [exporting, setExporting] = useState(false);
  const [exportMsg, setExportMsg] = useState(null);

  // Load the list of roots once.
  useEffect(() => {
    let active = true;
    setLoadingRoots(true);
    supabase
      .from("roots")
      .select("id, slug, root, idea, sort_order")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setError("No se pudieron cargar las raíces: " + error.message);
        } else {
          setRoots(data);
          if (data.length > 0) setRootId(data[0].id);
        }
        setLoadingRoots(false);
      });
    return () => { active = false; };
  }, []);

  // Load the words for the selected root whenever it changes.
  useEffect(() => {
    if (!rootId) return;
    let active = true;
    setLoadingWords(true);
    setError(null);
    supabase
      .from("words")
      .select("id, category, en, es, affix, example, sort_order")
      .eq("root_id", rootId)
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setError("No se pudieron cargar las palabras: " + error.message);
          setWords([]);
        } else {
          setWords(data);
        }
        setLoadingWords(false);
      });
    return () => { active = false; };
  }, [rootId]);

  // Save edits to one word back to Supabase, then update local state.
  // Returns true on success so the form can close.
  const saveWord = async (wordId, fields) => {
    const { data, error } = await supabase
      .from("words")
      .update({
        en: fields.en.trim(),
        es: fields.es.trim(),
        affix: fields.affix.trim() || null,
        example: fields.example.trim() || null,
      })
      .eq("id", wordId)
      .select()
      .single();

    if (error) {
      return { ok: false, message: error.message };
    }
    // Reflect the change in the list without a full reload.
    setWords((prev) => prev.map((w) => (w.id === wordId ? { ...w, ...data } : w)));
    setSavedId(wordId);
    window.setTimeout(() => setSavedId((id) => (id === wordId ? null : id)), 2500);
    return { ok: true };
  };

  // Export ALL roots + words to PDF. Loads everything fresh from
  // Supabase (so the PDF reflects your latest edits), groups words under
  // their root, and hands it to the shared PDF engine.
  const exportAll = async () => {
    if (exporting) return;
    setExporting(true);
    setExportMsg(null);
    const result = await loadAndExportRoots(supabase);
    if (result.ok) {
      setExportMsg({ ok: true, text: "PDF generado: " + result.filename });
    } else {
      setExportMsg({ ok: false, text: result.error });
    }
    setExporting(false);
  };

  if (loadingRoots) {
    return <div className="redit-status">Cargando raíces…</div>;
  }

  if (error && roots.length === 0) {
    return <div className="redit-status redit-error">{error}</div>;
  }

  const currentRoot = roots.find((r) => r.id === rootId);

  return (
    <div className="redit">
      <div className="redit-pickbar">
        <label className="redit-label" htmlFor="redit-root">Raíz</label>
        <select
          id="redit-root"
          className="redit-select"
          value={rootId || ""}
          onChange={(e) => setRootId(e.target.value)}
        >
          {roots.map((r) => (
            <option key={r.id} value={r.id}>
              {r.root} — {r.idea.replace(/^la idea de "?/, "").replace(/"$/, "")}
            </option>
          ))}
        </select>
        <span className="redit-count">{roots.length} raíces</span>
        <button
          type="button"
          className="redit-export-btn"
          onClick={exportAll}
          disabled={exporting}
          title="Exportar todas las raíces y palabras a PDF"
        >
          {exporting ? "Generando…" : "⬇ Exportar PDF"}
        </button>
      </div>

      {exportMsg && (
        <div className={`redit-export-msg ${exportMsg.ok ? "redit-export-ok" : "redit-export-err"}`}>
          {exportMsg.ok ? "✓ " : "⚠ "}{exportMsg.text}
        </div>
      )}

      {currentRoot && (
        <div className="redit-roothead">
          <span className="redit-root-word">{currentRoot.root}</span>
          <span className="redit-root-idea">{currentRoot.idea}</span>
        </div>
      )}

      {error && <div className="redit-status redit-error">{error}</div>}

      {loadingWords ? (
        <div className="redit-status">Cargando palabras…</div>
      ) : (
        <div className="redit-cats">
          {CATEGORIES.map((cat) => {
            const items = words.filter((w) => w.category === cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id} className="redit-cat">
                <div className="redit-cat-label">{cat.label}</div>
                <ul className="redit-words">
                  {items.map((w) =>
                    editingId === w.id ? (
                      <li key={w.id} className="redit-word-editing">
                        <WordEditForm
                          word={w}
                          onCancel={() => setEditingId(null)}
                          onSave={async (fields) => {
                            const res = await saveWord(w.id, fields);
                            if (res.ok) setEditingId(null);
                            return res;
                          }}
                        />
                      </li>
                    ) : (
                      <li key={w.id} className="redit-word">
                        <span className="redit-word-en">{w.en}</span>
                        <span className="redit-word-es">{w.es}</span>
                        {w.affix && <span className="redit-word-affix">{w.affix}</span>}
                        {savedId === w.id && <span className="redit-saved">✓ Guardado</span>}
                        <button
                          type="button"
                          className="redit-edit-btn"
                          onClick={() => { setEditingId(w.id); setError(null); }}
                        >
                          Editar
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            );
          })}
          <div className="redit-total">
            {words.length} palabras en esta raíz · leídas desde Supabase
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Edit form for one word ──────────────────────────────────────────
// Spaced-out fields (en / es / affix / example) with Save & Cancel.
// Handles the saving / error states locally; calls onSave(fields) which
// returns { ok, message }.

function WordEditForm({ word, onCancel, onSave }) {
  const [en, setEn] = useState(word.en || "");
  const [es, setEs] = useState(word.es || "");
  const [affix, setAffix] = useState(word.affix || "");
  const [example, setExample] = useState(word.example || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!en.trim() || !es.trim()) {
      setError("El inglés y el español no pueden estar vacíos.");
      return;
    }
    setBusy(true);
    setError(null);
    const res = await onSave({ en, es, affix, example });
    if (!res.ok) {
      setBusy(false);
      setError("No se pudo guardar: " + res.message);
    }
    // On success the parent closes this form.
  };

  return (
    <form className="wef" onSubmit={submit}>
      <div className="wef-row">
        <label className="wef-field">
          <span className="wef-label">Inglés</span>
          <input className="wef-input" value={en} onChange={(e) => setEn(e.target.value)} />
        </label>
        <label className="wef-field">
          <span className="wef-label">Español</span>
          <input className="wef-input" value={es} onChange={(e) => setEs(e.target.value)} />
        </label>
      </div>
      <div className="wef-row">
        <label className="wef-field">
          <span className="wef-label">Afijo</span>
          <input className="wef-input" value={affix} onChange={(e) => setAffix(e.target.value)} placeholder="ej. re-, -ion" />
        </label>
        <label className="wef-field">
          <span className="wef-label">Ejemplo</span>
          <input className="wef-input" value={example} onChange={(e) => setExample(e.target.value)} placeholder="(opcional)" />
        </label>
      </div>

      {error && <p className="wef-error">{error}</p>}

      <div className="wef-actions">
        <button type="button" className="wef-cancel" onClick={onCancel} disabled={busy}>
          Cancelar
        </button>
        <button type="submit" className="wef-save" disabled={busy}>
          {busy ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
