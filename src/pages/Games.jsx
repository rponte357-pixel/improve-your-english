// Games — the lobby. Lists available mini-games and placeholders for the
// ones we plan to add. Each game card links to its own route.
//
// When a new game ships, add a new entry to GAMES below with status:"live".
// Coming-soon entries render as ghost cards.

import { Link } from "react-router-dom";
import "../styles/games.css";

const GAMES = [
  {
    id: "inversions",
    name: "Master Inversions",
    blurb: "Hardly had you started when… inverted structures across B1, B2 and C1.",
    levels: "B1 · B2 · C1",
    questions: 28,
    icon: "🔄",
    status: "live",
    route: "/games/inversions",
  },
  {
    id: "connectors",
    name: "Connector Combat",
    blurb: "Although, despite, in case — pick the linker that fits the register.",
    levels: "B2 · C1",
    status: "soon",
    icon: "🔗",
  },
  {
    id: "cleft",
    name: "Cleft Architect",
    blurb: "Rebuild plain sentences into emphatic clefts: It is X who…, What I need is…",
    levels: "C1",
    status: "soon",
    icon: "🏗️",
  },
  {
    id: "conditionals",
    name: "Conditional Time-Travel",
    blurb: "Match scenarios with the right conditional — including mixed types.",
    levels: "B1 · B2 · C1",
    status: "soon",
    icon: "⏳",
  },
  {
    id: "modals",
    name: "Modal Detective",
    blurb: "Read the clues, pick the right modal of deduction: must / could / might have…",
    levels: "B2 · C1",
    status: "soon",
    icon: "🔍",
  },
];

export default function Games() {
  return (
    <section className="games">
      <div className="games-topbar">
        <Link to="/" className="games-back">
          ← Back to home
        </Link>
        <div className="games-brand">
          <span className="games-brand-mark">✦</span> Games Arcade
        </div>
      </div>

      <header className="games-hero">
        <div className="games-eye">✦ Play & Practice</div>
        <h1 className="games-h1">Train your English the fun way</h1>
        <p className="games-sub">
          Short, focused mini-games that reinforce what you've learned in
          Grammar. Pick your level. Beat your best score. Repeat.
        </p>
      </header>

      <div className="games-grid">
        {GAMES.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </section>
  );
}

function GameCard({ game }) {
  const isLive = game.status === "live";
  const CardTag = isLive ? Link : "div";
  const props = isLive
    ? { to: game.route, className: "games-card games-card-live" }
    : { className: "games-card games-card-soon", "aria-disabled": "true" };

  return (
    <CardTag {...props}>
      <div className="games-card-top">
        <span className="games-card-icon" aria-hidden="true">
          {game.icon}
        </span>
        {!isLive && <span className="games-card-pill">Coming soon</span>}
        {isLive && <span className="games-card-pill games-card-pill-live">Available</span>}
      </div>
      <h3 className="games-card-name">{game.name}</h3>
      <p className="games-card-blurb">{game.blurb}</p>
      <div className="games-card-meta">
        <span className="games-card-levels">{game.levels}</span>
        {game.questions && (
          <span className="games-card-count">{game.questions} questions</span>
        )}
      </div>
    </CardTag>
  );
}
