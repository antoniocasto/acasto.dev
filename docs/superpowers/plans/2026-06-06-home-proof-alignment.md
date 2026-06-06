# Home Proof Alignment Fix Plan

**Goal:** Fix the desktop home proof alignment after adding RIB.

**Branch:** Continue on `feature/acdesignweb-foundation`.

## Root Cause

The desktop home proof area uses three equal-width stat cards. `MVVM/VIPER/RIB` is too long for the compact stat-card value slot, so it wraps and breaks the visual rhythm.

## Fix Direction

Use an ACDesign list-row style surface, matching the blog list-row layout pattern, for the home proof points. This keeps each proof point scannable without forcing architecture names into a cramped metric card.

## Checklist

- [x] Verify that `main` and `develop` branches exist.
- [x] Inspect the screenshot and current home proof markup.
- [x] Identify the root cause.
- [x] Replace desktop home proof stat cards with a blog-style ACDesign list-row layout.
- [x] Keep mobile layout clean and responsive.
- [x] Run Jekyll build and static checks.
- [x] Verify generated desktop home output.
- [x] Record verification results.

## Verification Results

- `bundle exec jekyll build` passed on 2026-06-06.
- `git diff --check` passed on 2026-06-06.
- Generated HTML confirms the home proof area now uses `ac-list-row home-proof__item` rows in both Italian and English home pages.
- Browser desktop check at `1440x900` on `http://localhost:4001/it/` confirmed `overflowX: 0`.
- Browser desktop check confirmed `MVVM/VIPER/RIB` renders in one line inside the Architecture row.
- Local Jekyll preview is still running at `http://127.0.0.1:4001/`.
