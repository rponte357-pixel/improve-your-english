// Paste-text parser for the "Paste & import" wizard (Round B1).
//
// Goals:
//   • Per-line detection (each line may have 1, 2 or 3 fields).
//   • Auto-detect separator (TAB, pipe, em-dash, hyphen, colon, comma).
//   • Auto-strip wrapping double quotes from the example field.
//   • Flag suspected headers (all-uppercase rows, separator-less rows
//     in an otherwise paired block, etc.) without dropping them — the
//     review screen lets the user override.
//
// Pure module: no React, no localStorage, no fetch. Easy to unit-test.
//
// Return shape from parsePaste():
//   {
//     rows: ParsedRow[],     // one per source line (blank lines skipped)
//     summary: {
//       total:     number,   // rows.length
//       withEs:    number,
//       withExample: number,
//       flagged:   number,   // suspected headers / odd shape
//     },
//   }
//
// Each ParsedRow:
//   {
//     raw:       string,     // the original line, trimmed
//     en:        string,
//     es:        string,     // "" if missing
//     example:   string,     // "" if missing
//     separator: "tab" | "pipe" | "em-dash" | "hyphen" | "colon" |
//                "comma" | "none",
//     fields:    1 | 2 | 3,
//     warnings:  string[],   // e.g. ["looks like a header"]
//   }

// ─── Constants ────────────────────────────────────────────────────────

// Maximum total characters we'll accept in a single paste, to keep
// memory and UI predictable. Roughly 10× the realistic worst case.
export const MAX_PASTE_LENGTH = 50_000;

// Soft limit on rows. We surface a warning above this so the user
// notices accidental paste-bombs (e.g. an entire textbook chapter).
export const SOFT_ROW_WARNING = 200;

// Heuristic: anything longer than this in `en` is unlikely to be a
// single vocabulary entry, so we flag it (but keep it).
const SUSPECT_EN_LENGTH = 60;

// ─── Separator detection priority ────────────────────────────────────
//
// Per-line precedence:
//   1. TAB (\t)   ← unambiguous; supports 3 fields
//   2. PIPE (|)   ← also unambiguous; supports 3 fields
//   3. " — " or " – " (em/en dash with surrounding spaces) ← 2 fields
//   4. " - " (hyphen with surrounding spaces)              ← 2 fields
//   5. " : "  (colon with surrounding spaces)              ← 2 fields
//   6. ", "   (comma + space)                              ← 2 fields
//
// Em-dash, hyphen, colon and comma only split into 2 fields max — the
// example field would be too risky to extract because those characters
// can appear inside an example sentence.

const TAB_RE       = /\t/;
const PIPE_RE      = /\s*\|\s*/;
const EM_DASH_RE   = /\s+[—–]\s+/;
const HYPHEN_RE    = /\s+-\s+/;
const COLON_RE     = /\s+:\s+/;
const COMMA_RE     = /,\s+/;

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Parse a multi-line paste into structured rows.
 *
 * @param {string} text - the raw pasted text
 * @returns {{ rows: object[], summary: object }}
 */
export function parsePaste(text) {
  if (typeof text !== "string") {
    return emptyResult();
  }
  // Hard length cap. Truncating is safer than freezing the UI on
  // 5-MB pastes — we surface the truncation in the summary.
  const truncated = text.length > MAX_PASTE_LENGTH;
  const safeText  = truncated ? text.slice(0, MAX_PASTE_LENGTH) : text;

  const lines = safeText.split(/\r?\n/);

  const rows = [];
  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) continue;        // skip blank lines
    rows.push(parseLine(trimmed));
  }

  // Heuristic pass: flag rows that look like headers based on context.
  // A row is "header-like" if it has only 1 field but most of the
  // surrounding lines have 2+, OR it's all-caps with separator chars.
  applyHeaderHeuristics(rows);

  const summary = {
    total:       rows.length,
    withEs:      rows.filter((r) => r.es).length,
    withExample: rows.filter((r) => r.example).length,
    flagged:     rows.filter((r) => r.warnings.length > 0).length,
    truncated,
  };

  return { rows, summary };
}

/**
 * Parse a single line into a ParsedRow.
 *
 * Exported for testing — the wizard uses parsePaste().
 */
export function parseLine(line) {
  const raw = line.trim();
  const empty = {
    raw, en: "", es: "", example: "",
    separator: "none", fields: 1, warnings: [],
  };
  if (!raw) return empty;

  // TAB — unambiguous, supports 3 fields.
  if (TAB_RE.test(raw)) {
    const parts = raw.split(/\t+/).map((s) => s.trim()).filter(Boolean);
    return buildRow(raw, parts, "tab");
  }

  // PIPE — unambiguous, supports 3 fields.
  if (PIPE_RE.test(raw)) {
    const parts = raw.split(PIPE_RE).map((s) => s.trim()).filter(Boolean);
    return buildRow(raw, parts, "pipe");
  }

  // Em-dash / en-dash with spaces around — 2 fields max.
  if (EM_DASH_RE.test(raw)) {
    const idx = raw.search(EM_DASH_RE);
    return buildRow(
      raw,
      [raw.slice(0, idx).trim(), raw.slice(idx).replace(EM_DASH_RE, "").trim()],
      "em-dash",
      /* maxFields */ 2
    );
  }

  // Hyphen with spaces — 2 fields max. Distinct from inline hyphens
  // (e.g. "far-fetched") because we require surrounding whitespace.
  if (HYPHEN_RE.test(raw)) {
    const idx = raw.search(HYPHEN_RE);
    return buildRow(
      raw,
      [raw.slice(0, idx).trim(), raw.slice(idx).replace(HYPHEN_RE, "").trim()],
      "hyphen",
      2
    );
  }

  // Colon with spaces — 2 fields max.
  if (COLON_RE.test(raw)) {
    const idx = raw.search(COLON_RE);
    return buildRow(
      raw,
      [raw.slice(0, idx).trim(), raw.slice(idx).replace(COLON_RE, "").trim()],
      "colon",
      2
    );
  }

  // Comma + space — 2 fields max. Least reliable; only triggers if no
  // higher-priority separator matched.
  if (COMMA_RE.test(raw)) {
    const idx = raw.search(COMMA_RE);
    return buildRow(
      raw,
      [raw.slice(0, idx).trim(), raw.slice(idx).replace(COMMA_RE, "").trim()],
      "comma",
      2
    );
  }

  // No separator: the entire line is en, with no translation/example.
  const noSepWarnings = [];
  // r38: even with a single field, mark as header if the cell text is
  // exactly a known header token. Catches a single-column table where
  // the header is just "English" or "Vocabulario".
  const isLoneHeaderToken =
    HEADER_TOKENS.has(raw.trim().toLowerCase());
  if (isLoneHeaderToken) {
    noSepWarnings.push("looks like a header");
  }
  if (!isLoneHeaderToken && looksLikeAllCapsHeader(raw, "")) {
    noSepWarnings.push("looks like a header");
  }
  if (raw.length > SUSPECT_EN_LENGTH) {
    noSepWarnings.push("very long English field");
  }
  return {
    raw,
    en: raw,
    es: "",
    example: "",
    separator: "none",
    fields: 1,
    warnings: noSepWarnings,
    isHeader: isLoneHeaderToken,
  };
}

// ─── Internals ───────────────────────────────────────────────────────

function emptyResult() {
  return { rows: [], summary: { total: 0, withEs: 0, withExample: 0, flagged: 0, truncated: false } };
}

// Build a ParsedRow from a normalised array of field strings.
// `maxFields` lets em-dash/hyphen/colon/comma cap at 2 even if the
// raw split could produce more (e.g. multiple commas in a sentence).
function buildRow(raw, parts, separator, maxFields = 3) {
  // Clamp parts to maxFields, joining any overflow back into the last
  // field. This way "a, b, c" with maxFields=2 → ["a", "b, c"] rather
  // than dropping "c".
  let effective = parts;
  if (parts.length > maxFields) {
    effective = parts.slice(0, maxFields - 1).concat([
      parts.slice(maxFields - 1).join(", "),
    ]);
  }

  const en      = (effective[0] || "").trim();
  const es      = (effective[1] || "").trim();
  // Strip wrapping quotes from the example field. If the user pasted
  // 'foo "bar" baz' we only strip the outermost wrappers, never inner.
  const example = stripWrappingQuotes((effective[2] || "").trim());

  const fields = effective.filter(Boolean).length || 1;

  const warnings = [];
  // r38: header-by-tokens trumps everything — typical Excel/Sheets header
  // row like "English\tSpanish\tExample" is detected here. The review UI
  // will surface it with the HEADER badge and default to unchecked.
  const looksLikeKnownHeader = fieldsAllLookLikeHeaders(
    effective.filter(Boolean)
  );
  if (looksLikeKnownHeader) {
    warnings.push("looks like a header");
  }
  if (en.length > SUSPECT_EN_LENGTH) warnings.push("very long English field");
  if (en.length === 0)               warnings.push("empty English field");
  if (!looksLikeKnownHeader && looksLikeAllCapsHeader(en, es)) {
    warnings.push("looks like a header");
  }

  return {
    raw, en, es, example,
    separator,
    fields: Math.max(1, Math.min(3, fields)),
    warnings,
    isHeader: looksLikeKnownHeader,  // r38: structured flag for the UI
  };
}

// Remove a single matched pair of " or ' wrapping the whole string.
// "hello" → hello ;  'hello' → hello ;  hello → hello ;  "a" → a.
// Curly quotes (“ ” ‘ ’) also matched. Inner quotes are preserved.
function stripWrappingQuotes(s) {
  if (s.length < 2) return s;
  const first = s[0];
  const last  = s[s.length - 1];
  const pairs = [
    ['"',  '"'],
    ["'",  "'"],
    ["\u201C", "\u201D"],  // “ ”
    ["\u2018", "\u2019"],  // ‘ ’
  ];
  for (const [a, b] of pairs) {
    if (first === a && last === b) return s.slice(1, -1).trim();
  }
  return s;
}

// Heuristic: if a row contains 2+ fields and EVERY field matches a
// known header keyword (in English or Spanish), it's almost certainly
// a table header from Excel/Sheets/Word. r38.
const HEADER_TOKENS = new Set([
  // English
  "english", "en", "word", "term", "vocabulary", "vocab",
  "spanish", "es", "translation", "meaning", "definition",
  "example", "examples", "context", "sentence", "sample",
  "part of speech", "pos", "category", "type", "class",
  "notes", "comment", "comments", "remark", "remarks",
  // Spanish
  "inglés", "ingles",
  "español", "espanol", "castellano",
  "palabra", "término", "termino", "vocabulario",
  "traducción", "traduccion", "significado",
  "ejemplo", "ejemplos", "contexto", "frase",
  "categoría", "categoria", "tipo", "clase",
  "notas", "comentario", "comentarios", "observaciones",
]);

function fieldsAllLookLikeHeaders(fields) {
  if (fields.length < 2) return false;
  return fields.every((f) => {
    const norm = f.trim().toLowerCase().replace(/[._\-:]+$/, "");
    return HEADER_TOKENS.has(norm);
  });
}
function looksLikeAllCapsHeader(en, es) {
  if (!en || es) return false;
  if (en.length < 3) return false;
  const hasLetters = /[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(en);
  if (!hasLetters) return false;
  // All caps OR mostly caps + no lowercase letters at all.
  return en === en.toUpperCase();
}

// Second pass: if a row has 1 field but most of its neighbours have 2+,
// flag it as potential header. This catches "Unit 4 — Advanced" style
// headers that are otherwise plain English text and wouldn't trigger
// the all-caps rule.
function applyHeaderHeuristics(rows) {
  if (rows.length < 3) return;
  const multiFieldCount = rows.filter((r) => r.fields >= 2).length;
  const ratio = multiFieldCount / rows.length;

  // Only apply the contextual heuristic when the bulk of the paste is
  // 2+ fields. Otherwise (e.g. "one word per line") we shouldn't flag
  // every line.
  if (ratio < 0.6) return;

  for (const r of rows) {
    if (r.fields === 1 && !r.warnings.includes("looks like a header")) {
      r.warnings.push("only English, while others have translations");
    }
  }
}
