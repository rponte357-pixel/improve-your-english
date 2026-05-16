// Static UI metadata for the phrases section.
// Kept separate from phrases.js so the data file stays focused on content only.

import { ENTRIES } from "./phrases";

export const CATEGORIES = [
  "All",
  "Courage",
  "Relationships",
  "Communication",
  "Accuracy",
  "Secrets",
  "Health",
  "Work",
  "Opinion",
  "Situations",
];

export const CAT_ICONS = {
  Courage:        "🔥",
  Relationships:  "❤️",
  Communication:  "💬",
  Accuracy:       "🎯",
  Secrets:        "🤫",
  Health:         "🌿",
  Work:           "💼",
  Opinion:        "⚖️",
  Situations:     "🌀",
  All:            "✦",
};

export const CAT_COLORS = {
  Courage:        "#B5451B",
  Relationships:  "#C0392B",
  Communication:  "#1D8348",
  Accuracy:       "#1A5276",
  Secrets:        "#7D3C98",
  Health:         "#1A6FA8",
  Work:           "#0E6655",
  Opinion:        "#566573",
  Situations:     "#A04000",
};

export const TYPES = ["All", "Idiom", "Proverb"];

// Derived from the data so it stays in sync if new tones are added.
export const TONES_ALL = [
  "All",
  ...Array.from(new Set(ENTRIES.map((e) => e.tone))).sort(),
];

// Counts used in the hero subtitle.
export const COUNTS = {
  total:    ENTRIES.length,
  idioms:   ENTRIES.filter((e) => e.type === "Idiom").length,
  proverbs: ENTRIES.filter((e) => e.type === "Proverb").length,
};
