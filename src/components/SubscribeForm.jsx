// SubscribeForm — captures email subscriptions for the daily phrase newsletter.
//
// Posts to the existing Express backend at phraseup-api.onrender.com, which
// handles validation, deduplication, and stores into the Supabase subscribers
// table. The same backend serves the standalone phraseup app and the daily
// cron that sends the morning email.
//
// IMPORTANT — Render Free tier cold start:
//   Render Free dynos sleep after 15 minutes of inactivity. The first request
//   after a sleep takes 30-60 seconds while the server boots. We show a
//   honest "this may take a moment" message so the user doesn't think the
//   app is broken.

import { useState } from "react";

const API_URL = "https://phraseup-api.onrender.com/subscribe";

// Simple HTML5-style email check. The backend will do the real validation.
const isLikelyEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export default function SubscribeForm() {
  // status: idle | submitting | success | error | duplicate
  const [status, setStatus] = useState("idle");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!isLikelyEmail(value)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        return;
      }

      // The backend returns 409 (Conflict) for already-subscribed emails.
      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }

      // Try to extract an error message from the response, if any.
      let msg = "Something went wrong. Please try again.";
      try {
        const body = await res.json();
        if (body?.error) msg = body.error;
      } catch {
        /* response wasn't JSON, keep the default message */
      }
      setStatus("error");
      setErrorMsg(msg);
    } catch (networkErr) {
      // Network failure: offline, CORS, server unreachable.
      setStatus("error");
      setErrorMsg(
        "Couldn't reach the server. Please check your connection and try again."
      );
    }
  };

  // After success or duplicate, allow the user to subscribe a different
  // email without reloading the page.
  const reset = () => {
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <section className="phrases-subscribe">
      <div className="phrases-subscribe-eye">
        ✦ Get a new expression every morning
      </div>
      <p className="phrases-subscribe-tagline">
        One C1 idiom or proverb in your inbox each day. No spam, no noise —
        just better English, one expression at a time.
      </p>

      {(status === "idle" || status === "submitting" || status === "error") && (
        <form className="phrases-subscribe-form" onSubmit={submit} noValidate>
          <input
            type="email"
            className="phrases-subscribe-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
            aria-label="Email address"
            required
          />
          <button
            type="submit"
            className="phrases-subscribe-btn"
            disabled={status === "submitting" || !email.trim()}
          >
            {status === "submitting" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}

      {status === "submitting" && (
        <p className="phrases-subscribe-hint">
          This may take a moment if the server has been idle.
        </p>
      )}

      {status === "error" && errorMsg && (
        <p className="phrases-subscribe-msg phrases-subscribe-error">
          {errorMsg}
        </p>
      )}

      {status === "success" && (
        <div className="phrases-subscribe-success">
          <p className="phrases-subscribe-msg phrases-subscribe-ok">
            🎉 You're subscribed! Check your inbox tomorrow morning.
          </p>
          <button
            type="button"
            className="phrases-subscribe-reset"
            onClick={reset}
          >
            Subscribe another email
          </button>
        </div>
      )}

      {status === "duplicate" && (
        <div className="phrases-subscribe-success">
          <p className="phrases-subscribe-msg phrases-subscribe-ok">
            👋 That email is already on the list. You'll receive the next one tomorrow.
          </p>
          <button
            type="button"
            className="phrases-subscribe-reset"
            onClick={reset}
          >
            Subscribe another email
          </button>
        </div>
      )}
    </section>
  );
}
