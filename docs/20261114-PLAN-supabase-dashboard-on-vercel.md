# Dashboard Plan: Move to Vercel and Read From Supabase

**Date:** 2026-11-14
**Owner:** Gary
**Status:** Draft for review
**Depends on:** the PRD in the investmentAgent repo, docs/20261114-PRD-prediction-tracking-and-alerts.md. Phase 1 of that PRD, recording calls into Supabase, must be live before step 3 here can show real data.

---

## 1. Where Things Stand Today

The dashboard is a Vue 3 app built with Vite, Tailwind, and Chart.js, with tests in Vitest. It loads one file, the data file in the public folder, at startup. The agent PC rebuilds that file and commits it to this repo roughly every hour. More than a thousand of the commits in this repo are those snapshot commits.

That setup has three problems:

1. The repo history is mostly data, not code.
2. The dashboard can only show what fits in one snapshot file, so it can never show the scorecard, every call, or the alert history.
3. The data is only as fresh as the last commit and push from the agent PC.

---

## 2. Where It Is Going

- The app is hosted on Vercel.
- The agent PC keeps doing all the work and writes to Supabase.
- The dashboard reads from Supabase through small server-side functions on Vercel. The browser never talks to Supabase directly and never sees a key.
- A simple password gate protects the whole dashboard, the same pattern used in the plant app.
- The hourly data commits stop once the new path has run cleanly for a week.

Nothing on Vercel writes data and nothing on Vercel needs a scheduled job. The agent PC is the only writer. That keeps the Vercel side free of the Hobby plan's once-a-day cron limit.

---

## 3. Key Decisions

### 3.1 Read through Vercel functions, not straight from the browser

Two options were considered. The browser could read Supabase directly using the public key and row level security rules that only allow reading. Or the browser could call Vercel functions, which read Supabase with a server key that never leaves Vercel.

The plan uses Vercel functions because it keeps every key off the browser, lets the password gate protect the data as well as the page, and matches the plant app, so the same login, session cookie, and request helpers can be copied over instead of reinvented.

### 3.2 Keep the existing data shape first

The current components all expect the shape of the existing data file. The first function on Vercel builds that exact same shape from Supabase. That way the existing screens move over with almost no changes, and new screens are added afterwards. The current loader is pointed at the new endpoint and keeps the old file as a fallback during the switch.

### 3.3 Secrets

These live only in Vercel's environment settings and in a local untracked environment file for development. They are never committed or pasted into chat.

| Setting | Purpose |
|---|---|
| Supabase project URL | Where to read from |
| Supabase server key | Read access for the functions only |
| Dashboard password | The login gate |
| Session secret | Signs the login cookie |

---

## 4. New Screens

### 4.1 Scorecard (new)

The main reason for the move. It answers the three questions from the PRD.

- Headline: 5 day hit rate, number of calls behind it, and cumulative excess return of the agent's acted-on calls versus VOO.
- A switch between the 1 day, 5 day, and 20 day horizons.
- Hit rate broken down by conviction, by market direction, by signal, by ticker, and by strategy version.
- Picked versus not picked, side by side.
- Every rate shows its call count. Groups with fewer than 30 calls are greyed out with a note saying the sample is too small.

### 4.2 Calls log (new)

A table of every call: date, ticker, stance, conviction, whether it was acted on, the reason, and its outcome at each horizon once known. Filter by ticker, stance, and hit or miss. Calls still waiting for their horizon show as pending.

### 4.3 Today (expanded)

The long-form content that is leaving Telegram lands here: the briefing, the bilingual market summary, the bilingual daily lesson, and the trade list with reasoning. This replaces the current briefing card and today's plan section.

### 4.4 Alerts (new)

A list of every alert the agent sent or suppressed as a duplicate, newest first. Useful for checking whether the alert thresholds are catching the right things.

### 4.5 Existing screens

The hero card, stats grid, equity chart against VOO, allocation panel, and trade history all stay, fed by the new endpoint.

---

## 5. Steps

| Step | What happens | Done when |
|---|---|---|
| 1. Vercel project | Connect this repo to Vercel, confirm the existing build works there unchanged, still reading the committed data file | The current dashboard loads from a Vercel address |
| 2. Password gate | Copy the login, logout, and session helpers from the plant app, add a login screen, and protect every function | Opening the site without logging in shows only the login screen, and the data endpoint refuses requests without a valid session |
| 3. Dashboard data endpoint | A function that reads Supabase and returns the same shape as today's data file. Point the loader at it, keeping the old file as a fallback | The existing screens show live Supabase data, and the tests pass against both sources |
| 4. Scorecard | Endpoint for the saved scorecard views, plus the scorecard screen | All breakdowns render with counts, and small groups are greyed |
| 5. Calls log | Paged endpoint for calls with outcomes, plus the table with filters | Filters work, and pending calls show as pending |
| 6. Today and alerts | Endpoints and screens for the long-form daily content and the alert history | Yesterday's lesson and today's alerts are visible on the dashboard |
| 7. Retire the snapshot commits | After a clean week, the agent stops pushing the data file (change made in the agent repo), and the fallback and committed file are removed here | No new snapshot commits appear, and the dashboard still works |

Steps 1 and 2 can start right away. Step 3 onward needs phase 1 of the agent PRD to be live.

---

## 6. Testing

- Vitest stays the test runner. Each new function and screen gets tests in the same style as the existing component and composable tests.
- New fixtures for scorecard data, including a group under 30 calls and an empty state for the first days, when nothing has been scored yet.
- The function that rebuilds today's data shape is tested against the existing valid and empty fixtures so the old screens are proven unchanged.
- Login tests cover the right password, the wrong password, an expired session, and calling a data endpoint with no session.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Scorecard looks impressive on tiny samples | Counts everywhere and small groups greyed out |
| Supabase free project pauses if the agent PC is off for a week | The dashboard shows a clear "data source paused" message instead of a blank page |
| Vercel function cold starts make the first load slow | Acceptable for one user. A loading state is already in place |
| Breaking the existing screens during the switch | The old data file stays as a fallback until step 7 |

---

## 8. Open Questions

| ID | Question | Default if not answered |
|---|---|---|
| D1 | Where is the dashboard hosted today, and should that be switched off once Vercel is live? | Switch it off after step 3 is stable |
| D2 | Should the Vercel address be the only way in, or is a custom domain wanted? | Default Vercel address for now |
| D3 | One shared password, same as the plant app, or a separate one? | Separate password |
