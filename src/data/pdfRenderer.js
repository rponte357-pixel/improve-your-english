// PDF renderer — generates a downloadable PDF using jsPDF loaded from
// a CDN <script> tag (available as the global `window.jspdf`).
//
// IMPORTANT: this module does NOT `import` jsPDF from npm. Instead it
// reads `window.jspdf`, which is populated by a <script> tag in
// index.html:
//
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
//
// This keeps the project install-free: no `npm install jspdf`, no
// bundler config. The same approach the user successfully used in a
// previous project.
//
// Output: a real .pdf file downloaded to the user's Downloads folder
// via doc.save(). No popup, no print dialog, no about:blank, works in
// mobile/responsive emulation.
//
// Two layouts:
//   • "cheat"     — 3-column compact grid, one line per word.
//   • "reference" — 1-column, each entry with its example sentence(s).

// ─── Layout constants (millimetres, A4 portrait) ─────────────────────

const PAGE = {
  width: 210, height: 297,
  marginTop: 16, marginBottom: 14,
  marginLeft: 12, marginRight: 12,
};
const CONTENT_W = PAGE.width - PAGE.marginLeft - PAGE.marginRight;

// Colours (RGB)
const C_ACCENT      = [181, 69, 27];
const C_ACCENT_DARK = [156, 59, 23];
const C_INK         = [26, 23, 20];
const C_GREY        = [100, 100, 100];
const C_GREY_LIGHT  = [150, 150, 150];
const C_LEARNED     = [46, 125, 50];
const C_DIVIDER     = [222, 222, 222];

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Build and download the PDF.
 * @returns {{ok:true, filename:string} | {ok:false, error:string}}
 */
export function exportToPdf({
  selection, vocabThemes, blocks, customLists, isLearned,
  format = "cheat", markLearned = true,
}) {
  const sections = collectSections({
    selection, vocabThemes, blocks, customLists, isLearned,
  });
  if (sections.length === 0) {
    return { ok: false, error: "Nothing selected to export." };
  }

  // jsPDF must be available as a global (loaded via <script> in index.html).
  const jsPDFCtor = resolveJsPDF();
  if (!jsPDFCtor) {
    return {
      ok: false,
      error: "PDF engine not loaded. Make sure the jsPDF <script> tag is in index.html.",
    };
  }

  try {
    const doc = new jsPDFCtor({ unit: "mm", format: "a4", orientation: "portrait", compress: true });

    renderCover(doc, sections, markLearned);

    let y = coverEndY();
    for (const section of sections) {
      y = (format === "cheat")
        ? renderSectionCheat(doc, section, y, markLearned)
        : renderSectionReference(doc, section, y, markLearned);
    }

    renderFooters(doc);

    const filename = buildFilename();
    doc.save(filename);
    return { ok: true, filename };
  } catch (e) {
    return { ok: false, error: (e && e.message) || "PDF generation failed." };
  }
}

// Resolve the jsPDF constructor from whatever global the CDN exposes.
// The UMD build exposes `window.jspdf.jsPDF`. Some older builds expose
// `window.jsPDF` directly. We handle both.
function resolveJsPDF() {
  if (typeof window === "undefined") return null;
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  return null;
}

// ─── Cover ───────────────────────────────────────────────────────────

function renderCover(doc, sections, markLearned) {
  const cx = PAGE.width / 2;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...C_ACCENT);
  doc.text("Vocabulary Lab", cx, PAGE.marginTop + 6, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(...C_GREY);
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  doc.text(`Personal vocabulary export · ${dateStr}`, cx, PAGE.marginTop + 12, { align: "center" });

  const totalWords = sections.reduce((a, s) => a + s.words.length, 0);
  const totalLearned = sections.reduce((a, s) => a + s.learnedCount, 0);
  const meta = `${sections.length} section${sections.length === 1 ? "" : "s"} · ${totalWords} word${totalWords === 1 ? "" : "s"}` +
               (markLearned ? ` · ${totalLearned} marked as learned` : "");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...C_GREY_LIGHT);
  doc.text(meta, cx, PAGE.marginTop + 17, { align: "center" });

  doc.setDrawColor(...C_DIVIDER);
  doc.setLineWidth(0.3);
  doc.line(PAGE.marginLeft, PAGE.marginTop + 22, PAGE.width - PAGE.marginRight, PAGE.marginTop + 22);
}

function coverEndY() { return PAGE.marginTop + 30; }

// ─── Section header (shared) ─────────────────────────────────────────

function renderSectionHeader(doc, section, y) {
  const x = PAGE.marginLeft;

  const blockLabel = section.kind === "list"
    ? "MY PERSONAL LISTS"
    : (section.blockName || "").toUpperCase();
  const blockColor = section.kind === "list"
    ? C_ACCENT
    : (hexToRgb(section.blockColor) || [120, 120, 120]);

  doc.setFillColor(...blockColor);
  doc.rect(x, y - 3, 1.3, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...C_GREY);
  doc.text(blockLabel, x + 3, y);

  // Title (no emoji — Helvetica can't render them; we strip to keep it clean)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...C_INK);
  doc.text(stripEmoji(section.themeName), x, y + 7);

  let metaX = x;
  const pillY = y + 10;
  if (section.level) {
    doc.setFillColor(...C_INK);
    doc.roundedRect(metaX, pillY, 11, 4.6, 1.2, 1.2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(section.level, metaX + 5.5, pillY + 3.3, { align: "center" });
    metaX += 14;
  } else {
    doc.setFillColor(...C_ACCENT);
    doc.roundedRect(metaX, pillY, 17, 4.6, 1.2, 1.2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text("PERSONAL", metaX + 8.5, pillY + 3.3, { align: "center" });
    metaX += 20;
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C_GREY);
  const lbl = section.words.length === 1 ? "word" : "words";
  const learned = section.learnedCount > 0 ? ` · ${section.learnedCount} learned` : "";
  doc.text(`${section.words.length} ${lbl}${learned}`, metaX, pillY + 3.3);

  return y + 17;
}

// ─── Cheat-sheet (2 columns, English + meaning side by side) ────────
//
// Each page has 2 columns. Within each column, every word is a row:
// English headword on the left (~45% of the column width), Spanish
// translation on the right (~55%). Either side wraps downward within
// its half if it's long; the row height is the taller of the two
// sides. Nothing is truncated. Blocks flow top-to-bottom filling
// column 1, then column 2, paginating when both are full.

function renderSectionCheat(doc, section, y, markLearned) {
  y = ensureSpace(doc, y, 28);
  y = renderSectionHeader(doc, section, y);

  const COLS = 2;
  const colGap = 8;
  const colW = (CONTENT_W - colGap * (COLS - 1)) / COLS;
  const enFont = 8.5;
  const esFont = 8;
  const lineH = 3.8;
  const blockGap = 2.4;
  const checkW = 3.3;        // reserved for the ✓ mark on the EN side

  // Split each column into an EN half (left) and an ES half (right).
  const innerGap = 3;
  const enHalfW = (colW - innerGap) * 0.45 - checkW;
  const esHalfW = (colW - innerGap) * 0.55;
  const enX0Offset = checkW;                       // EN text x within col
  const esX0Offset = checkW + ((colW - innerGap) * 0.45) - checkW + innerGap;
  // (esX0Offset simplifies to (colW-innerGap)*0.45 + innerGap)

  // ── Pass 1: measure ──
  const measured = section.words.map((w) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(enFont);
    const enLines = doc.splitTextToSize(w.en, enHalfW);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(esFont);
    const esLines = doc.splitTextToSize(w.es || "\u2014", esHalfW);

    // Row height = the taller of the two sides.
    const enH = enLines.length * lineH;
    const esH = esLines.length * lineH;
    const height = Math.max(enH, esH) + blockGap;
    return { w, enLines, esLines, height };
  });

  const colBottom = PAGE.height - PAGE.marginBottom;

  // Balance the two columns when everything fits on one page, so we
  // don't fill column 1 and leave column 2 nearly empty.
  const totalHeight = measured.reduce((a, b) => a + b.height, 0);
  const pageCapacity = (colBottom - y) * COLS;
  const balanceTarget = totalHeight <= pageCapacity ? totalHeight / COLS : Infinity;

  let col = 0;
  let colTop = y;
  let cursorY = colTop;
  let maxBottomY = cursorY;
  let heightInCol = 0;

  const drawBlock = (block, cellX, atY) => {
    // ✓ check on the EN side
    if (markLearned && block.w.learned) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(enFont);
      doc.setTextColor(...C_LEARNED);
      doc.text("\u2713", cellX, atY);
    }
    // EN lines (bold, left half)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(enFont);
    doc.setTextColor(...C_INK);
    let yEn = atY;
    for (const line of block.enLines) {
      doc.text(line, cellX + enX0Offset, yEn);
      yEn += lineH;
    }
    // ES lines (grey, right half — same starting baseline as EN)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(esFont);
    doc.setTextColor(...C_GREY);
    let yEs = atY;
    for (const line of block.esLines) {
      doc.text(line, cellX + esX0Offset, yEs);
      yEs += lineH;
    }
    return atY + block.height;
  };

  let i = 0;
  while (i < measured.length) {
    const block = measured[i];
    const cellX = PAGE.marginLeft + col * (colW + colGap);

    const fitsOnPage = cursorY + block.height <= colBottom;
    const shouldBalance = col === 0 && heightInCol >= balanceTarget;

    if (fitsOnPage && !shouldBalance) {
      cursorY = drawBlock(block, cellX, cursorY);
      heightInCol += block.height;
      if (cursorY > maxBottomY) maxBottomY = cursorY;
      i++;
    } else if (col < COLS - 1) {
      col++;
      cursorY = colTop;
      heightInCol = 0;
    } else {
      doc.addPage();
      col = 0;
      colTop = PAGE.marginTop;
      cursorY = colTop;
      maxBottomY = colTop;
      heightInCol = 0;
    }
  }

  return maxBottomY + 8;
}

// ─── Reference book ─────────────────────────────────────────────────
//
// Always TWO columns. Each entry: English bold, Spanish translation
// underneath, and (if present) the example sentence(s) in italic below
// the translation — all within the column. Examples wrap to as many
// lines as needed within the column width.

function renderSectionReference(doc, section, y, markLearned) {
  return renderReferenceTwoCol(doc, section, y, markLearned);
}

// Two-column reference layout (with examples included when present).
function renderReferenceTwoCol(doc, section, y, markLearned) {
  y = ensureSpace(doc, y, 28);
  y = renderSectionHeader(doc, section, y);

  const COLS = 2;
  const colGap = 8;
  const colW = (CONTENT_W - colGap * (COLS - 1)) / COLS;
  const enFont = 10;
  const esFont = 9;
  const exFont = 8.5;
  const lineH = 4.2;
  const exLineH = 3.7;
  const blockGap = 3.5;
  const checkW = 4;
  const usableW = colW - checkW;

  // Measure each block (wrapped EN + ES + examples)
  const measured = section.words.map((w) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(enFont);
    const enLines = doc.splitTextToSize(stripEmoji(w.en), usableW);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(esFont);
    const esLines = doc.splitTextToSize(w.es || "(no translation)", usableW);

    // Examples (italic) — each wrapped within the column.
    doc.setFont("helvetica", "italic");
    doc.setFontSize(exFont);
    const exLineGroups = [w.example, w.example2]
      .filter(Boolean)
      .map((ex) => doc.splitTextToSize(`"${ex}"`, usableW - 1));
    const exLineCount = exLineGroups.reduce((a, g) => a + g.length, 0);

    const height =
      enLines.length * lineH +
      esLines.length * lineH +
      exLineCount * exLineH +
      blockGap;
    return { w, enLines, esLines, exLineGroups, height };
  });

  const colBottom = PAGE.height - PAGE.marginBottom;

  const totalHeight = measured.reduce((a, b) => a + b.height, 0);
  const pageCapacity = (colBottom - y) * COLS;
  const balanceTarget = totalHeight <= pageCapacity
    ? totalHeight / COLS
    : Infinity;

  let col = 0;
  let colTop = y;
  let cursorY = colTop;
  let maxBottomY = cursorY;
  let heightInCol = 0;

  const drawBlock = (block, cellX, atY) => {
    let yy = atY;
    if (markLearned && block.w.learned) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(enFont);
      doc.setTextColor(...C_LEARNED);
      doc.text("\u2713", cellX, yy);
    }
    // EN (bold), with POS chip after first line if it fits
    doc.setFont("helvetica", "bold");
    doc.setFontSize(enFont);
    doc.setTextColor(...C_INK);
    let firstLine = true;
    for (const line of block.enLines) {
      doc.text(line, cellX + checkW, yy);
      if (firstLine && block.w.partOfSpeech) {
        const pos = String(block.w.partOfSpeech).toUpperCase();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6);
        const pw = doc.getTextWidth(pos) + 2.5;
        const chipX = cellX + checkW + doc.getTextWidth(line) + 2;
        if (chipX + pw < cellX + colW) {
          doc.setFillColor(240, 229, 220);
          doc.roundedRect(chipX, yy - 2.4, pw, 3.2, 0.8, 0.8, "F");
          doc.setTextColor(...C_ACCENT_DARK);
          doc.text(pos, chipX + pw / 2, yy + 0.1, { align: "center" });
          doc.setFont("helvetica", "bold");
          doc.setFontSize(enFont);
          doc.setTextColor(...C_INK);
        }
        firstLine = false;
      }
      yy += lineH;
    }
    // ES (grey)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(esFont);
    doc.setTextColor(...C_GREY);
    for (const line of block.esLines) {
      doc.text(line, cellX + checkW, yy);
      yy += lineH;
    }
    // Examples (italic, slightly indented)
    if (block.exLineGroups.length) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(exFont);
      doc.setTextColor(...C_GREY_LIGHT);
      for (const group of block.exLineGroups) {
        for (const line of group) {
          doc.text(line, cellX + checkW + 1, yy);
          yy += exLineH;
        }
      }
    }
    return yy + blockGap;
  };

  let i = 0;
  while (i < measured.length) {
    const block = measured[i];
    const cellX = PAGE.marginLeft + col * (colW + colGap);

    const fitsOnPage = cursorY + block.height <= colBottom;
    const shouldBalance = col === 0 && heightInCol >= balanceTarget;

    if (fitsOnPage && !shouldBalance) {
      cursorY = drawBlock(block, cellX, cursorY);
      heightInCol += block.height;
      if (cursorY > maxBottomY) maxBottomY = cursorY;
      i++;
    } else if (col < COLS - 1) {
      col++;
      cursorY = colTop;
      heightInCol = 0;
    } else {
      doc.addPage();
      col = 0;
      colTop = PAGE.marginTop;
      cursorY = colTop;
      maxBottomY = colTop;
      heightInCol = 0;
    }
  }

  return maxBottomY + 8;
}

// ─── Footers ─────────────────────────────────────────────────────────

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

// ─── Page-break helper ───────────────────────────────────────────────

function ensureSpace(doc, y, needMM) {
  if (y + needMM > PAGE.height - PAGE.marginBottom) {
    doc.addPage();
    return PAGE.marginTop;
  }
  return y;
}

// ─── Collecting sections ───────────────────────────────────────────

function collectSections({ selection, vocabThemes, blocks, customLists, isLearned }) {
  const sections = [];
  const activeLevels = ["B1", "B2", "C1", "C2"].filter(
    (l) => selection.levels && selection.levels[l]
  );

  for (const blockId of Object.keys(blocks)) {
    const block = blocks[blockId];
    for (const themeId of block.themeIds) {
      if (!selection.themes || !selection.themes[themeId]) continue;
      const theme = vocabThemes[themeId];
      if (!theme) continue;
      for (const level of activeLevels) {
        const words = (theme.levels && theme.levels[level]) || [];
        if (words.length === 0) continue;
        const decorated = words.map((w) => ({
          ...w, learned: isLearned ? isLearned(themeId, level, w.en) : false,
        }));
        sections.push({
          kind: "theme",
          blockName: block.name,
          blockColor: block.gradientFrom,
          themeName: theme.name,
          themeIcon: theme.icon || "",
          level,
          words: decorated,
          totalCount: words.length,
          learnedCount: decorated.filter((w) => w.learned).length,
        });
      }
    }
  }

  for (const list of customLists || []) {
    if (!selection.lists || !selection.lists[list.id]) continue;
    const decorated = (list.words || []).map((w) => ({
      ...w, learned: isLearned ? isLearned(`custom-${list.id}`, "all", w.en) : false,
    }));
    sections.push({
      kind: "list",
      blockName: "My personal lists",
      themeName: list.name,
      themeIcon: "",
      level: null,
      words: decorated,
      totalCount: list.words.length,
      learnedCount: decorated.filter((w) => w.learned).length,
    });
  }

  return sections;
}

// ─── Helpers ─────────────────────────────────────────────────────────

function buildFilename() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `vocabulary-lab-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}.pdf`;
}

function hexToRgb(hex) {
  if (typeof hex !== "string") return null;
  const m = hex.replace("#", "").match(/^([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Strip emoji + symbols that Helvetica can't render (they'd show as
// garbage boxes in the PDF). Keeps letters, numbers, punctuation,
// accented Latin characters.
function stripEmoji(s) {
  if (s == null) return "";
  return String(s)
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")   // emoji blocks
    .replace(/[\u{2600}-\u{27BF}]/gu, "")     // misc symbols + dingbats
    .replace(/[\u{2190}-\u{21FF}]/gu, "")     // arrows
    .replace(/\uFE0F/g, "")                    // variation selector
    .trim();
}
