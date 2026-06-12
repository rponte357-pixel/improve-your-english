// ─── AccountChip — header chip: "Entrar" or the user's name (r98) ────
//
// Drop-in for the Hub header:
//   import AccountChip from "../components/AccountChip";
//   ...
//   <AccountChip />
//
// Signed out → "Entrar" (links to /account).
// Signed in  → avatar initial + first name (links to /account).

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AccountChip() {
  const { user, profile, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <Link to="/account" className="account-chip">
        Entrar
      </Link>
    );
  }

  const name = profile?.display_name || user.email || "";
  const firstName = name.split(" ")[0];
  const initial = (firstName || "?").charAt(0).toUpperCase();

  return (
    <Link to="/account" className="account-chip account-chip-on" title={name}>
      <span className="account-chip-avatar">{initial}</span>
      <span className="account-chip-name">{firstName}</span>
    </Link>
  );
}
