// ─── Account — "Tu cuenta": Google sign-in / session info (r98) ──────
//
// Route: /account
// Signed out → why register + "Continuar con Google".
// Signed in  → name, email, role badge, sign out.
//
// Registration gates nothing existing: the whole app keeps working
// without an account. The account is the foundation for challenges
// (r99+) and, later, cross-device progress sync.

import { Link } from "react-router-dom";
import { useAuth, signInWithGoogle, signOut } from "../hooks/useAuth";
import "../styles/vocabulary.css";

export default function Account() {
  const { user, profile, loading } = useAuth();

  return (
    <section className="vocab">
      <div className="account-page">
        <Link to="/" className="foundations-back account-back">
          ← Back to home
        </Link>

        <header className="foundations-header">
          <h1 className="foundations-title account-title">Tu cuenta</h1>
        </header>

        {loading ? null : !user ? <SignedOut /> : (
          <SignedIn user={user} profile={profile} />
        )}
      </div>
    </section>
  );
}

function SignedOut() {
  return (
    <div className="account-card">
      <p className="account-intro">
        Con tu cuenta podrás retar a otras personas a jugar tus ejercicios
        y, próximamente, llevar tu progreso entre dispositivos. Todo lo
        demás sigue funcionando sin registrarte.
      </p>
      <button
        type="button"
        className="account-google-btn"
        onClick={signInWithGoogle}
      >
        <GoogleLogo />
        Continuar con Google
      </button>
      <p className="account-note">
        Solo usamos tu nombre y tu email de Google para identificarte.
      </p>
    </div>
  );
}

function SignedIn({ user, profile }) {
  const name = profile?.display_name || user.email || "";
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const isAdmin = profile?.role === "admin";

  return (
    <div className="account-card">
      <div className="account-identity">
        <span className="account-avatar">{initial}</span>
        <div className="account-identity-text">
          <div className="account-name">{name}</div>
          <div className="account-email">{user.email}</div>
        </div>
      </div>

      <div className={`account-role ${isAdmin ? "account-role-admin" : ""}`}>
        {isAdmin ? "Administradora" : "Estudiante"}
      </div>

      <button type="button" className="account-signout-btn" onClick={signOut}>
        Cerrar sesión
      </button>
    </div>
  );
}

// Official-ish multicolour "G" so the button is recognisable without
// loading external images.
function GoogleLogo() {
  return (
    <svg className="account-google-logo" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.4 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.4 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.4 2.2-6.3 0-11.7-3.9-13.6-9.3l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}
