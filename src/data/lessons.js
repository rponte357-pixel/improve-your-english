// Index of grammar topics shown on the Grammar hub page.
//
// `section` groups bubbles visually on the hub: "core" (foundational C1
// structures) and "advanced" (broader topics that benefit from a solid
// grammatical base). Order within each section is the display order.

import { inversionUnits } from "./inversion";
import { connectorFamilies } from "./connectors";
import { conditionalTypes } from "./conditionals";
import { modalFamilies } from "./modals";
import { cleftFamilies } from "./cleft";
import { clauseFamilies } from "./clauses";
import { formalFamilies } from "./formal";
import { verbFamilies } from "./verbs";
import { cohesionFamilies } from "./cohesion";

export const grammarIndex = [
  // === Core C1 ===
  {
    slug: "cleft-sentences",
    title: "Cleft Sentences",
    path: "/grammar/cleft-sentences",
    progressBase: "cleft",
    familyIds: cleftFamilies.map((f) => f.id),
    section: "core",
  },
  {
    slug: "inversion",
    title: "Inversion",
    path: "/grammar/inversion",
    progressBase: "inversion",
    familyIds: inversionUnits.map((u) => u.id),
    section: "core",
  },
  {
    slug: "passive",
    title: "Advanced Passive",
    path: "/grammar/passive",
    progressBase: "passive",
    familyIds: ["quiz", "build"],
    section: "core",
  },
  {
    slug: "conditionals",
    title: "Mixed Conditionals",
    path: "/grammar/conditionals",
    progressBase: "conditionals",
    familyIds: conditionalTypes.map((t) => t.id),
    section: "core",
  },
  {
    slug: "modals",
    title: "Modal Deduction",
    path: "/grammar/modals",
    progressBase: "modals",
    familyIds: modalFamilies.map((f) => f.id),
    section: "core",
  },
  {
    slug: "connectors",
    title: "Connectors",
    path: "/grammar/connectors",
    progressBase: "connectors",
    familyIds: connectorFamilies.map((f) => f.id),
    section: "core",
  },
  // === Advanced topics ===
  {
    slug: "clauses",
    title: "Advanced Clauses",
    path: "/grammar/clauses",
    progressBase: "clauses",
    familyIds: clauseFamilies.map((f) => f.id),
    section: "advanced",
  },
  {
    slug: "verbs",
    title: "Verb Structures",
    path: "/grammar/verbs",
    progressBase: "verbs",
    familyIds: verbFamilies.map((f) => f.id),
    section: "advanced",
  },
  {
    slug: "formal",
    title: "Formal & Academic",
    path: "/grammar/formal",
    progressBase: "formal",
    familyIds: formalFamilies.map((f) => f.id),
    section: "advanced",
  },
  {
    slug: "cohesion",
    title: "Cohesion & Style",
    path: "/grammar/cohesion",
    progressBase: "cohesion",
    familyIds: cohesionFamilies.map((f) => f.id),
    section: "advanced",
  },
];
