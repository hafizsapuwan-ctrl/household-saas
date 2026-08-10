# household-saas — Phase 1: Deploy Pipeline

This is intentionally the smallest possible working server — the goal of this
phase is only to prove GitHub → Render → live URL works, before any real
features are added.

## What this does right now
- `GET /` → returns "OK — household-saas is running."
- `GET /health` → returns a small JSON status object

Nothing else yet. That's on purpose.

## Deploy steps — 100% browser, no installs needed

### 1. Create a GitHub repo
1. Go to github.com, sign in (create a free account if you don't have one)
2. Click the **+** in the top right → **New repository**
3. Name it `household-saas`, keep it **Private** (this will hold real backend
   code, including secrets later — private is safer)
4. Click **Create repository**

### 2. Upload these files
1. On your new repo's page, click **uploading an existing file** (or
   **Add file → Upload files**)
2. Drag all the files from this project (`package.json`, `server.js`,
   `.gitignore`, `README.md`) into the browser upload area
3. Scroll down, click **Commit changes**

### 3. Deploy on Render
1. Go to render.com, sign up (you can sign up directly with your GitHub
   account, which also handles connecting the two)
2. Click **New +** → **Web Service**
3. Select your `household-saas` repo
4. Settings:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (fine for this phase)
5. Click **Create Web Service**

Render will build and deploy automatically. This takes a couple of minutes
the first time.

### 4. Confirm it's live
Once deployed, Render gives you a URL like:
`https://household-saas-xxxx.onrender.com`

Open that URL in your browser — you should see:
`OK — household-saas is running.`

Also try `https://household-saas-xxxx.onrender.com/health` — you should see
a small JSON response with a timestamp.

**Once you see both of those working, Phase 1 is done — come back and we'll
move on to Phase 2 (connecting a real database).**

## Note on Render's free tier
Free-tier services on Render "spin down" after periods of inactivity and take
a few seconds to wake back up on the next request. That's fine for
development, but this becomes relevant later when we set up the Telegram
webhook — Telegram may see a slow first response. We'll address this when we
get there (either a low-cost paid tier, or a periodic ping to keep it warm).
