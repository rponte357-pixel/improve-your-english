// ─── useAuth — session + profile from Supabase Auth (r98) ────────────
//
// Single source of truth for "who is using the app":
//   const { user, profile, loading } = useAuth();
//
// - user:    Supabase auth user (null if signed out)
// - profile: row from public.profiles (display_name, role) — created
//            automatically by the on_auth_user_created trigger
// - loading: true until the initial session check finishes
//
// Sign-in is Google-only (signInWithGoogle). The legacy /admin
// email+password login is untouched and shares the same client.

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Session: initial read + live updates (sign in / out, token refresh)
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session || null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Profile: fetched whenever the signed-in user changes
  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    supabase
      .from("profiles")
      .select("display_name, role")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setProfile(data || null);
      });
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tidy the address bar: once signed in, remove the leftover ?code=
  // from the OAuth redirect (PKCE). The exchange already happened.
  useEffect(() => {
    if (session && window.location.search.includes("code=")) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.hash
      );
    }
  }, [session]);

  return { session, user: session?.user || null, profile, loading };
}

// ─── Actions ─────────────────────────────────────────────────────────

export async function signInWithGoogle() {
  // Back to the app root after Google; must be in the Supabase
  // Auth → URL Configuration allow-list (prod + localhost).
  const redirectTo = window.location.origin + import.meta.env.BASE_URL;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) {
    console.error("Google sign-in error:", error.message);
    window.alert("No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
  }
}

export async function signOut() {
  await supabase.auth.signOut();
}
