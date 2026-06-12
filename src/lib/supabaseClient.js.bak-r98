// ─── Supabase connection ─────────────────────────────────────────────
// Creates the single client the app uses to talk to Supabase.
// The URL and public key come from the .env file (VITE_… variables),
// so they're never hard-coded here.
//
// Vite exposes variables that start with VITE_ through import.meta.env.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// A friendly check: if the .env is missing or misnamed, fail with a
// clear message instead of a confusing crash later.
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase config missing. Check your .env file has " +
      "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
