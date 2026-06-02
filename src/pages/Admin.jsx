// ─── Admin ───────────────────────────────────────────────────────────
// The maintenance area, reached at #/admin.
//
//   • While the session is being checked → a brief "Comprobando…".
//   • If signed out  → a branded login form (email + password).
//   • If signed in   → a placeholder where the roots/words editor will
//                      go (piece 3), plus a sign-out button.
//
// Security note: this form only hides the screen. The real protection of
// the data (who can edit the tables) comes from Supabase RLS policies,
// added in piece 3 before we allow any writing.

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import RootsEditor from "./RootsEditor";
import "../styles/admin.css";

const LOGO_SRC = `${import.meta.env.BASE_URL || "/"}logo_rp.png`;

export default function Admin() {
  const { user, loading, signIn, signOut } = useAuth();

  // ── Still checking the session on first load ──
  if (loading) {
    return (
      <div className="admin-screen">
        <div className="admin-card admin-card-center">
          <p className="admin-checking">Comprobando…</p>
        </div>
      </div>
    );
  }

  // ── Signed in → editor placeholder (piece 3 fills this) ──
  if (user) {
    return (
      <div className="admin-screen">
        <div className="admin-topbar">
          <Link to="/" className="admin-back">← Back to home</Link>
          <button className="admin-signout" onClick={signOut}>
            Cerrar sesión
          </button>
        </div>

        <div className="admin-card">
          <div className="admin-welcome">
            <span className="admin-welcome-dot" />
            Sesión iniciada como <strong>{user.email}</strong>
          </div>
          <RootsEditor />
        </div>
      </div>
    );
  }

  // ── Signed out → branded login form ──
  return <LoginForm onSignIn={signIn} />;
}

function LoginForm({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    const { error } = await onSignIn(email.trim(), password);
    setBusy(false);
    if (error) {
      // Keep the message friendly and non-specific (don't reveal which
      // field was wrong).
      setError("Email o contraseña incorrectos.");
    }
    // On success, the auth context updates and this screen swaps to the
    // signed-in view automatically — nothing else to do here.
  };

  return (
    <div className="admin-screen">
      <form className="admin-card admin-login" onSubmit={submit}>
        <img className="admin-logo" src={LOGO_SRC} alt="R. Ponte" />
        <h1 className="admin-title">Área privada</h1>
        <p className="admin-subtitle">Accede para gestionar el contenido.</p>

        <label className="admin-label" htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          className="admin-input"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="admin-label" htmlFor="admin-pass">Contraseña</label>
        <input
          id="admin-pass"
          className="admin-input"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="admin-error">{error}</p>}

        <button className="admin-submit" type="submit" disabled={busy}>
          {busy ? "Entrando…" : "Entrar"}
        </button>

        <Link to="/" className="admin-cancel">← Volver a la app</Link>
      </form>
    </div>
  );
}
