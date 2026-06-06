# Remove ACDesign Repository Links Plan

**Goal:** Remove public GitHub links from the bilingual ACDesign article because `ACDesign` and `ACDesignWeb` are not public repositories.

**Branch:** Continue on `feature/acdesignweb-foundation`.

## Checklist

- [x] Verify that `main` and `develop` branches exist.
- [x] Confirm current branch and working tree state.
- [x] Inspect the Italian and English ACDesign articles.
- [x] Remove GitHub repository links from the Italian article.
- [x] Remove GitHub repository links from the English article.
- [x] Run build and static checks.
- [x] Verify generated HTML no longer contains the private repository links.
- [x] Record verification results.

## Verification Results

- `bundle exec jekyll build` passed on 2026-06-06.
- `git diff --check` passed on 2026-06-06.
- Source and generated HTML checks confirm `github.com/antoniocasto/ACDesign` and `github.com/antoniocasto/ACDesignWeb` are no longer present in the ACDesign articles.
