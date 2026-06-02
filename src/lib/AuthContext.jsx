// ─── Auth context ────────────────────────────────────────────────────
// One central place that knows, at all times, whether someone is signed
// in. Any component can read this instead of asking Supabase directly.
//
// What it exposes (via the useAuth() hook):
//   user     → the signed-in user object, or null if signed out
//   loading  → true while we're still checking on first load
//   signIn(email, password) → tries to log in; returns { error } or {}
//   signOut()               → logs out
//
// How it works: on mount we ask Supabase for the current session, then
// we subscribe to auth changes so the app reacts to login/logout
// automatically (and stays logged in across page reloads, because the
// Supabase client persists the session in the browser).

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // 1) Check if there's already a session (e.g. after a page reload).
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session ? data.session.user : null);
      setLoading(false);
    });

    // 2) React to future changes (sign in / sign out / token refresh).
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = { user, loading, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Small helper so components can do: const { user, signIn } = useAuth();
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
