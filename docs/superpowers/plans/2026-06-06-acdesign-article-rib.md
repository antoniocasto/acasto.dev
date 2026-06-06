# ACDesign Article and RIB Update Plan

**Goal:** Add RIB to relevant architecture references in Italian and English, then publish a bilingual article about ACDesign.

**Branch:** Continue on the current branch, `feature/acdesignweb-foundation`, as requested.

**Sources:** `antoniocasto/ACDesign` README and `antoniocasto/ACDesignWeb` README.

## Checklist

- [x] Verify that `main` and `develop` branches exist.
- [x] Confirm the current working branch and repository status.
- [x] Locate bilingual pages and posts that mention iOS architectures.
- [x] Review ACDesign and ACDesignWeb source information.
- [x] Add RIB to relevant Italian and English architecture references.
- [x] Create the Italian ACDesign article.
- [x] Create the English ACDesign article.
- [x] Run Jekyll build and static checks.
- [x] Record verification results in this plan.

## Verification Results

- `bundle exec jekyll build` passed on 2026-06-06.
- `git diff --check` passed on 2026-06-06.
- Generated HTML confirms `MVVM/VIPER/RIB` on both home pages.
- Generated HTML confirms `MVVM, VIPER, RIB, Coordinator, Repository pattern` on both About pages and both website launch posts.
- Generated HTML confirms both ACDesign posts are published at `/it/blog/2026/06/06/acdesign/` and `/en/blog/2026/06/06/acdesign/`.
- Source check confirms the new ACDesign posts do not contain emoji.
- Local Jekyll preview is running at `http://127.0.0.1:4001/`.
- `curl -I` returned `200 OK` for both localized ACDesign article URLs.
- Browser preview on `http://localhost:4001/it/blog/2026/06/06/acdesign/` confirmed the Italian article title, two repository links, `ACDesignWeb` text, and `overflowX: 0`.

## Implementation Notes

- Keep all work on the current branch.
- Keep the article voice light, direct, and consistent with the existing site tone.
- Do not use emoji in the new articles.
- Use source facts from ACDesign and ACDesignWeb without turning the article into a README rewrite.
