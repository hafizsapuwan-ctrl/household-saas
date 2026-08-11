// =================================================================
// PHASE 1: Minimal server, just to prove the deploy pipeline works.
// GitHub -> Render -> live URL, before any real features are added.
// Every later phase builds on top of this file.
// =================================================================

const express = require("express");
const supabase = require("./lib/supabase");
const app = express();

app.use(express.json());

// Health check — visiting this URL in a browser should show "OK".
// This is the very first thing to confirm once deployed.
app.get("/", (req, res) => {
  res.send("OK — household-saas is running.");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// PHASE 2: confirms the Supabase connection actually works. Queries
// the profiles table (should return an empty array right now, since
// no one has signed up yet — an empty array is success, not failure).
app.get("/db-test", async (req, res) => {
  try {
    const { data, error } = await supabase.from("profiles").select("*").limit(5);

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    res.json({
      ok: true,
      message: "Supabase connection works.",
      profileCount: data.length,
      profiles: data
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
