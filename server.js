// =================================================================
// PHASE 1: Minimal server, just to prove the deploy pipeline works.
// GitHub -> Render -> live URL, before any real features are added.
// Every later phase builds on top of this file.
// =================================================================

const express = require("express");
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
