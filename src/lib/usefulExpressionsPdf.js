// PDF renderer for Useful Expressions — TWO-COLUMN flowing layout (r90).
// Fix from r89: the cursor tracked a single y for both columns, which
// caused full-width headers to overlap with phrases above when a
// function had uneven column heights. Now we track yLeft/yRight
// separately and reconcile them before each full-width header.
//
// Uses jsPDF loaded from CDN via window.jspdf.

// ─── Layout constants (millimetres, A4 portrait) ─────────────────────

const PAGE = {
  width: 210, height: 297,
  marginTop: 16, marginBottom: 14,
  marginLeft: 12, marginRight: 12,
};
const CONTENT_W = PAGE.width - PAGE.marginLeft - PAGE.marginRight;
const COL_GAP   = 6;
const COL_W     = (CONTENT_W - COL_GAP) / 2;
const COL_X = [
  PAGE.marginLeft,
  PAGE.marginLeft + COL_W + COL_GAP,
];

const C_ACCENT      = [181, 69, 27];
const C_ACCENT_DARK = [156, 59, 23];
const C_INK         = [26, 23, 20];
const C_GREY        = [100, 100, 100];
const C_GREY_LIGHT  = [150, 150, 150];
const C_DIVIDER     = [222, 222, 222];

// ─── Public API ──────────────────────────────────────────────────────

export function exportBlockToPdf({ block, functions }) {
  if (!block || !functions) {
    return { ok: false, error: "Missing block or functions data." };
  }

  const sections = block.functionIds
    .map((id) => ({ id, fn: functions[id] }))
    .filter((s) => s.fn);

  if (sections.length === 0) {
    return { ok: false, error: "No content to export." };
  }

  const jsPDFCtor = resolveJsPDF();
  if (!jsPDFCtor) {
    return {
      ok: false,
      error: "PDF library not loaded. Add the jsPDF <script> tag to index.html.",
    };
  }

  const doc = new jsPDFCtor({ unit: "mm", format: "a4", orientation: "portrait" });

  renderCover(doc, block, sections);

  // Cursor: separate y for each column + current writing column.
  // After a full-width header, BOTH yLeft and yRight reset to the same
  // starting point underneath the header.
  const cursor = {
    col: 0,
    yLeft: coverEndY(),
    yRight: coverEndY(),
  };

  for (const s of sections) {
    // Before a new function header, sync both columns: the header
    // takes its position from MAX(yLeft, yRight) so it never overlaps
    // anything that's already been drawn in either column.
    const headerY = Math.max(cursor.yLeft, cursor.yRight);
    const headerHeight = 13;

    // Ensure full-width room for the header.
    if (headerY + headerHeight > PAGE.height - PAGE.marginBottom) {
      doc.addPage();
      cursor.yLeft = PAGE.marginTop;
      cursor.yRight = PAGE.marginTop;
      cursor.col = 0;
      renderFunctionHeader(doc, s.fn, block, PAGE.marginTop);
      cursor.yLeft = PAGE.marginTop + headerHeight;
      cursor.yRight = PAGE.marginTop + headerHeight;
    } else {
      renderFunctionHeader(doc, s.fn, block, headerY);
      cursor.yLeft = headerY + headerHeight;
      cursor.yRight = headerY + headerHeight;
    }

    // Start phrases in left column.
    cursor.col = 0;

    for (const level of block.levels) {
      const phrases = s.fn.levels[level] || [];
      if (phrases.length === 0) continue;
      renderLevelSubhead(doc, level, phrases.length, cursor);
      for (const p of phrases) {
        renderPhrase(doc, p, cursor);
      }
      // Small gap after a level block in the current column.
      bumpCurrentColumn(cursor, 2);
    }

    // Small visual gap before next function.
    cursor.yLeft += 3;
    cursor.yRight += 3;
  }

  renderFooters(doc);

  const filename = buildFilename(block);
  doc.save(filename);
  return { ok: true, filename };
}

// ─── jsPDF resolution ────────────────────────────────────────────────

function resolveJsPDF() {
  const w = typeof window !== "undefined" ? window : null;
  if (!w) return null;
  if (w.jspdf && w.jspdf.jsPDF) return w.jspdf.jsPDF;
  if (w.jsPDF) return w.jsPDF;
  return null;
}

// ─── Cover ───────────────────────────────────────────────────────────

function renderCover(doc, block, sections) {
  const cx = PAGE.width / 2;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...C_ACCENT);
  doc.text("Vocabulary Lab", cx, PAGE.marginTop + 6, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(...C_GREY);
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
  const levelStr = block.levels.join("-");
  const subtitle = `Useful Expressions · ${block.name} · ${levelStr} · ${dateStr}`;
  doc.text(subtitle, cx, PAGE.marginTop + 12, { align: "center" });

  let totalPhrases = 0;
  for (const s of sections) {
    for (const lvl of block.levels) {
      const arr = s.fn.levels[lvl];
      if (Array.isArray(arr)) totalPhrases += arr.length;
    }
  }
  const meta = `${sections.length} function${sections.length === 1 ? "" : "s"} · ${totalPhrases} phrase${totalPhrases === 1 ? "" : "s"}`;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...C_GREY_LIGHT);
  doc.text(meta, cx, PAGE.marginTop + 17, { align: "center" });

  doc.setDrawColor(...C_DIVIDER);
  doc.setLineWidth(0.3);
  doc.line(PAGE.marginLeft, PAGE.marginTop + 22, PAGE.width - PAGE.marginRight, PAGE.marginTop + 22);
}

function coverEndY() { return PAGE.marginTop + 30; }

// ─── Function header (full-width) ────────────────────────────────────

function renderFunctionHeader(doc, fn, block, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...C_ACCENT);
  doc.text("USEFUL EXPRESSIONS", PAGE.marginLeft, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...C_INK);
  const title = `${stripEmoji(fn.name)} — ${fn.es}`;
  doc.text(title, PAGE.marginLeft, y + 5.5);

  let total = 0;
  for (const lvl of block.levels) {
    const arr = fn.levels[lvl];
    if (Array.isArray(arr)) total += arr.length;
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...C_GREY);
  doc.text(`${block.levels.join("-")}  ·  ${total} phrases`, PAGE.width - PAGE.marginRight, y + 5.5, { align: "right" });

  doc.setDrawColor(...C_DIVIDER);
  doc.setLineWidth(0.2);
  doc.line(PAGE.marginLeft, y + 8, PAGE.width - PAGE.marginRight, y + 8);
}

// ─── Level subhead ───────────────────────────────────────────────────

function renderLevelSubhead(doc, level, count, cursor) {
  const need = 12;
  ensureColumnRoom(doc, cursor, need);
  const x = COL_X[cursor.col];
  const y = currentY(cursor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C_ACCENT_DARK);
  doc.text(level, x, y);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...C_GREY_LIGHT);
  doc.text(`${count} phrases`, x + 10, y);
  bumpCurrentColumn(cursor, 4);
}

// ─── Phrase ──────────────────────────────────────────────────────────

function renderPhrase(doc, p, cursor) {
  const enLines = doc.splitTextToSize(p.en, COL_W);
  const esLines = doc.splitTextToSize(p.es, COL_W);
  const ctxLines = p.context ? doc.splitTextToSize(p.context, COL_W) : [];

  const totalH =
    enLines.length * 3.8 + 0.4 +
    esLines.length * 3.4 +
    (ctxLines.length ? ctxLines.length * 2.9 + 0.8 : 0) +
    2;

  ensureColumnRoom(doc, cursor, totalH);

  const x = COL_X[cursor.col];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...C_INK);
  doc.text(enLines, x, currentY(cursor));
  bumpCurrentColumn(cursor, enLines.length * 3.8 + 0.4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C_GREY);
  doc.text(esLines, x, currentY(cursor));
  bumpCurrentColumn(cursor, esLines.length * 3.4);

  if (ctxLines.length) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(...C_GREY_LIGHT);
    doc.text(ctxLines, x, currentY(cursor) + 0.6);
    bumpCurrentColumn(cursor, ctxLines.length * 2.9 + 0.8);
  }

  bumpCurrentColumn(cursor, 2);
}

// ─── Cursor helpers ──────────────────────────────────────────────────

function currentY(cursor) {
  return cursor.col === 0 ? cursor.yLeft : cursor.yRight;
}

function bumpCurrentColumn(cursor, dy) {
  if (cursor.col === 0) cursor.yLeft += dy;
  else                  cursor.yRight += dy;
}

// Make sure the current column has `need` mm of room; if not, switch
// to the other column or add a new page.
function ensureColumnRoom(doc, cursor, need) {
  const bottom = PAGE.height - PAGE.marginBottom;
  const y = currentY(cursor);
  if (y + need <= bottom) return;

  if (cursor.col === 0) {
    // Try right column.
    if (cursor.yRight + need <= bottom) {
      cursor.col = 1;
      return;
    }
  }
  // Both columns full → new page.
  doc.addPage();
  cursor.col = 0;
  cursor.yLeft = PAGE.marginTop;
  cursor.yRight = PAGE.marginTop;
}

// ─── Footer ──────────────────────────────────────────────────────────

function renderFooters(doc) {
  const total = doc.internal.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7);
    doc.setTextColor(...C_GREY_LIGHT);
    const yy = PAGE.height - 7;
    doc.text("Generated by Vocabulary Lab", PAGE.marginLeft, yy);
    doc.text(`Page ${i} of ${total}`, PAGE.width - PAGE.marginRight, yy, { align: "right" });
  }
}

// ─── Filename ────────────────────────────────────────────────────────

function buildFilename(block) {
  const slug = block.id.replace(/-phrases$/, "");
  const today = new Date().toISOString().slice(0, 10);
  return `useful-expressions-${slug}-${today}.pdf`;
}

// ─── Helpers ─────────────────────────────────────────────────────────

function stripEmoji(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/[\u{2600}-\u{27BF}]/gu, "")
    .replace(/[\uFE0F\u200D]/g, "")
    .replace(/[\u{1F3FB}-\u{1F3FF}]/gu, "")
    .replace(/[\u{E0020}-\u{E007F}]/gu, "")
    .trim();
}
