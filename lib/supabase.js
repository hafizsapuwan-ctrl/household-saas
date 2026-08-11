// =================================================================
// SUPABASE CLIENT — initialized once, imported wherever DB access
// is needed. Uses the SERVICE ROLE key (not the public/anon key),
// since this runs entirely server-side and needs full access —
// never expose the service role key to a browser/client.
// =================================================================

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn(
    "WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. " +
    "The server will still start, but any database call will fail until " +
    "these are configured (e.g. as environment variables on Render)."
  );
}

// Placeholder values let the client construct successfully even before
// real credentials are set, so the rest of the app (health checks etc.)
// still runs. Actual DB calls will fail clearly at the point of use,
// not crash the whole server on startup.
const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseServiceRoleKey || "placeholder-key"
);

module.exports = supabase;
