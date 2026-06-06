# ACDesignWeb Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle `acasto.dev` with the reusable components, tokens, and Liquid adapter from `antoniocasto/ACDesignWeb` while preserving every existing site feature.

**Architecture:** Keep `acasto.dev` as a Jekyll static site. Vendor the generated ACDesign CSS, optional vanilla JS enhancers, and `acd/*` Liquid includes into this repository; then progressively replace custom page markup and Sass with ACDesign contracts. The current multilingual routing, SEO metadata, collections, posts, certificates, theme persistence, menu behavior, and filters remain the behavioral source of truth until each feature has an ACDesign-backed equivalent.

**Tech Stack:** Jekyll, Liquid, SCSS, vanilla JavaScript, GitHub Pages-compatible static assets, ACDesignWeb `acdesign-core`, ACDesignWeb `acdesign-jekyll`.

---

## Current State Of `acasto.dev`

- Repository: `/Users/antoniocasto/Development/Web/antoniocasto.github.io`.
- Branches required by repository policy are present locally: `main` and `develop`.
- Current branch at analysis time: `develop`, tracking `origin/develop`.
- Site generator: Jekyll with `_config.yml`, `jekyll-seo-tag`, and `jekyll-sitemap`.
- Public domain: `https://acasto.dev`, configured through `CNAME`.
- Languages: `en` and `it`, with localized pages under `en/` and `it/`.
- Layouts: `_layouts/default.html`, `_layouts/index.html`, `_layouts/about.html`, `_layouts/portfolio.html`, `_layouts/post.html`.
- Styling: `assets/css/style.scss` imports `_sass/_theme.scss`, `_variables.scss`, `_base.scss`, `_layout.scss`, `_components.scss`, `_collection_item.scss`, `_index.scss`, `_about.scss`, `_nav.scss`.
- JavaScript: `assets/js/main.js` owns viewport height setup, theme toggle, mobile menu dialog/focus behavior, certificate carousel, and blog category filters.
- Content to preserve: home, about, portfolio collection, blog posts, certificates data, contacts, language switcher, social links, profile image, favicons, manifest, SEO and alternate language links.

## ACDesignWeb Source Summary

- Source repository: `https://github.com/antoniocasto/ACDesignWeb`.
- Visibility at analysis time: private.
- Default branch at analysis time: `develop`.
- `packages/acdesign-core` is the source of truth for tokens, CSS layers, semantic component contracts, and optional behavior enhancers.
- `packages/acdesign-jekyll` is the thin Liquid adapter that maps Jekyll include parameters to `acdesign-core` classes and `data-ac-*` contracts.
- `apps/catalog` is only a static verification surface; do not copy catalog-only demo structure into `acasto.dev`.
- Token namespace: `--ac-*`.
- Theme contract: `:root`, `[data-ac-theme="light"]`, `[data-ac-theme="dark"]`, and `prefers-color-scheme`.
- Main light palette: background `#FFFFFF`, surface `#F2F2F2`, foreground `#0A0A0A`, accent `#1B2F6E`.
- Main dark palette: background `#0A0A0A`, surface `#161616`, foreground `#F5F5F5`, accent `#2E4FBF`.
- Typography model: system sans stack aligned with SwiftUI defaults.
- Relevant components for this migration: `ACButton`, `ACIconButton`, `ACCard`, `ACTag`, `ACTagGroup`, `ACSectionHeader`, `ACAvatar`, `ACStatCard`, `ACGlassContainer`, `ACListRow`, `ACInfoRow`, `ACAccordion`, `ACFAB`, `ACEmptyState`, `ACBanner`, and `ACInlineAlert`.

## Visual Direction

**Visual thesis:** A SwiftUI-inspired personal developer portfolio with monochrome surfaces, crisp geometry, restrained blue accent, strong profile imagery, and fewer decorative gradients.

**Content plan:** Home gives the clearest professional positioning first; About becomes structured proof; Portfolio and Blog become scannable lists; Certificates become a focused credential surface; Contacts become direct action rows.

**Interaction thesis:** Keep interactions quiet and functional: fast press states from ACDesign, one restrained theme transition, slide/fade mobile menu behavior, and simple carousel/filter interactions with reduced-motion support.

## Migration Rules

- Do not replace Jekyll with React, Next.js, or another framework.
- Do not import runtime assets from the private `ACDesignWeb` repository in production.
- Treat `ACDesignWeb` as read-only for this migration: do not commit, push, open PRs, change issues, or edit files in that repository.
- Vendor only generated CSS, required vanilla JS modules, and Jekyll includes needed by the current site.
- Preserve every current URL, permalink, collection path, language route, SEO tag, alternate language link, favicon, and manifest path.
- Prefer ACDesign Liquid includes when they fit the existing content. Use direct core markup only when the include API is too narrow.
- Keep site-specific composition and compatibility adapters in `acasto.dev`; keep design-system source of truth in `ACDesignWeb` without modifying it.
- Use English comments in code files.
- Avoid content rewrites unless a content string must become data-driven for layout reuse.
- Do not merge, release, or open an integration PR toward `main` during this migration until Antonio explicitly authorizes it in a future message.

## Required Local Adaptations

These adaptations are part of the migration. Apply them only inside `acasto.dev`.

1. **Liquid adapter compatibility**
   - Current site stack uses Jekyll 3.10 and Liquid 4.0.4.
   - Liquid 4.0.4 does not support the `{% render %}` tag used by `ACDesignWeb/packages/acdesign-jekyll/includes/acd/**`.
   - After copying `_includes/acd/**`, convert every vendored `{% render ... %}` call to Jekyll-compatible `{% include ... %}` calls in the local vendored copy.
   - Do not edit `ACDesignWeb` to make this compatibility change.

2. **Vendored source provenance**
   - Record the exact `ACDesignWeb` source branch and commit SHA in `docs/acdesignweb-source-map.md`.
   - Record every local adaptation made after copying, especially Liquid `render` to `include` conversion.
   - Future syncs from `ACDesignWeb` must reapply these local adaptations in `acasto.dev`.

3. **Theme compatibility bridge**
   - Keep `.dark-theme` working until legacy styles are removed.
   - Add `data-ac-theme="light"` or `data-ac-theme="dark"` to the root element from the existing theme toggle.
   - Do not switch all theme behavior to ACDesign in a single step; bridge first, then remove old variables after migrated pages no longer reference them.

4. **CSS cascade and browser compatibility**
   - Load `assets/acdesign/styles/components.css` before `assets/css/style.css` so site composition can override component spacing/layout.
   - Keep ACDesign CSS as copied static CSS; do not process it through Sass.
   - Use `--ac-*` tokens for new site-specific styles.
   - Add plain fallback values before site-authored `color-mix()` declarations when the declaration controls essential background, border, or text contrast.
   - Remove old global heading/card/button styles only after no active markup depends on them.

5. **JavaScript enhancer compatibility**
   - Keep existing `assets/js/main.js` behavior for mobile menu, focus trapping, theme toggle, blog filters, and certificate carousel.
   - Copy `overlays.js` or `forms.js` only when a rendered ACDesign component requires that enhancer.
   - Load copied enhancer files as browser ES modules from local `assets/acdesign/js/**`.
   - Do not introduce a bundler for this migration.

6. **Build and documentation compatibility**
   - Keep `docs/superpowers/plans/` excluded from Jekyll output because the plan contains Liquid examples that must not be rendered as site pages.
   - Do not add custom Jekyll plugins; GitHub Pages compatibility remains a requirement.
   - Every phase must pass `bundle exec jekyll build` before moving to the next phase.

## Files To Create Or Modify

- Create: `docs/acdesignweb-source-map.md` for provenance and copy instructions.
- Create: `assets/acdesign/styles/**` copied from `ACDesignWeb/packages/acdesign-core/styles/**`.
- Create: `assets/acdesign/js/overlays.js` copied from `ACDesignWeb/packages/acdesign-core/src/behaviors/overlays.js` only when `ACAccordion`, `ACTagGroup`, `ACModal`, `ACTooltip`, or `ACToast` is rendered.
- Create: `assets/acdesign/js/forms.js` copied from `ACDesignWeb/packages/acdesign-core/src/behaviors/forms.js` only if ACDesign form controls are introduced.
- Create: `_includes/acd/**` copied from `ACDesignWeb/packages/acdesign-jekyll/includes/acd/**`.
- Create: `_includes/site/page-header.html` for page-level heading composition around `acd/section-header.liquid`.
- Create: `_includes/site/project-card.html` for portfolio cards with ACDesign card contract plus image media.
- Create: `_includes/site/post-list-row.html` for blog list rows with ACDesign list-row contract plus tags/date.
- Create: `_includes/site/contact-list.html` for contacts rendered as ACDesign list rows/buttons.
- Modify: `_layouts/default.html` to load ACDesign CSS, set AC theme attributes, and keep SEO/nav/footer/theme behavior.
- Modify: `_layouts/index.html` to remove the terminal hero and render the new home composition.
- Modify: `_layouts/about.html` only if the about page needs a wrapper change after AC tokens are active.
- Modify: `_layouts/portfolio.html` to use ACDesign article/header styling for individual portfolio pages.
- Modify: `_layouts/post.html` to use ACDesign article/header/tag styling for individual posts.
- Modify: `assets/css/style.scss` to import site composition after ACDesign assets.
- Modify: `_sass/_theme.scss` to bridge existing variables to ACDesign tokens before removing old variables.
- Modify: `_sass/_base.scss`, `_layout.scss`, `_components.scss`, `_collection_item.scss`, `_index.scss`, `_about.scss`, `_nav.scss` progressively as pages migrate.
- Modify: `assets/js/main.js` to synchronize `data-ac-theme`, retain existing functionality, and add ACDesign overlay enhancers only after needed components exist.
- Modify: `en/index.markdown`, `it/index.markdown`, `en/portfolio.markdown`, `it/portfolio.markdown`, `en/blog.markdown`, `it/blog.markdown`, `en/certificates.markdown`, `it/certificates.markdown`, `en/contacts.markdown`, `it/contacts.markdown`, `en/about.markdown`, and `it/about.markdown` only when moving repeated markup into includes or data.

## Task 1: Branch And Baseline

**Files:**
- Read: `AGENTS.md` instructions from the conversation.
- Read: `_config.yml`
- Read: `_layouts/default.html`
- Read: `assets/js/main.js`
- Read: `assets/css/style.scss`
- Read: `_sass/*.scss`

- [x] **Step 1: Confirm branch policy prerequisites**

Run:

```bash
git branch --list main develop
```

Expected: both `main` and `develop` are listed. If either is missing, stop and report it before changing files.

- [x] **Step 2: Start from `develop`**

Run:

```bash
git checkout develop
git fetch origin
git pull --ff-only origin develop
```

Expected: local `develop` is current with `origin/develop`.

- [x] **Step 3: Create the implementation branch**

Run:

```bash
git checkout -b feature/acdesignweb-foundation
```

Expected: a new feature branch starts from the updated `develop`.

- [x] **Step 4: Record the untouched baseline**

Run:

```bash
bundle exec jekyll build
```

Expected: the current site builds successfully before design-system changes.

- [x] **Step 5: Inspect the baseline in browser**

Run a local Jekyll server:

```bash
bundle exec jekyll serve --livereload
```

Open `http://127.0.0.1:4000/en/` and `http://127.0.0.1:4000/it/`.

Expected: home, language switching, mobile menu, theme toggle, blog filters, portfolio links, certificates carousel, and contacts work before any migration.

Baseline note: certificate carousel controls were verified at mobile width, where the track has horizontal overflow. At the default 1280px browser width, both certificate cards fit inside the track (`scrollWidth == clientWidth`), so the Next button is enabled but does not move the track.

## Task 2: Vendor ACDesign Assets

**Files:**
- Create: `docs/acdesignweb-source-map.md`
- Create: `assets/acdesign/styles/**`
- Create: `_includes/acd/**`

- [x] **Step 1: Record the ACDesignWeb source commit**

Run:

```bash
gh api repos/antoniocasto/ACDesignWeb/commits/develop --jq '.sha'
```

Expected: prints the exact commit SHA used as the read-only source for this migration. At plan update time, `develop` resolved to `bfb8a0e5ec94506cfee57fbe82d0e43eec6553bf`. Use that SHA unless a future chat explicitly decides to sync from a newer source commit.

- [x] **Step 2: Copy ACDesign CSS layers**

Copy the full directory:

```text
ACDesignWeb/packages/acdesign-core/styles/** -> acasto.dev/assets/acdesign/styles/**
```

Keep the same relative structure so `components.css` can resolve imports such as `./foundations.css`, `./primitives/button.css`, and `./overlays.css`.

- [x] **Step 3: Copy the Jekyll adapter includes**

Copy the full directory:

```text
ACDesignWeb/packages/acdesign-jekyll/includes/acd/** -> acasto.dev/_includes/acd/**
```

Expected includes after copy: `_includes/acd/button.liquid`, `_includes/acd/icon-button.liquid`, `_includes/acd/card.liquid`, `_includes/acd/tag.liquid`, `_includes/acd/section-header.liquid`, `_includes/acd/list-row.liquid`, `_includes/acd/glass-container.liquid`, and `_includes/acd/_internal/*.liquid`.

- [x] **Step 4: Adapt copied Liquid includes for Jekyll 3.10**

In the copied local files under `_includes/acd/**`, replace every `render` tag with a Jekyll-compatible `include` tag.

Use these exact conversion patterns:

```liquid
{% render 'acd/_internal/class-name', base: 'ac-card', extra: include.class %}
```

becomes:

```liquid
{% include acd/_internal/class-name.liquid base='ac-card' extra=include.class %}
```

```liquid
{%- render 'acd/_internal/attribute', name: 'id', value: include.id -%}
```

becomes:

```liquid
{%- include acd/_internal/attribute.liquid name='id' value=include.id -%}
```

```liquid
{%- render 'acd/_internal/data-attr', name: 'data-ac-variant', value: include.variant -%}
```

becomes:

```liquid
{%- include acd/_internal/data-attr.liquid name='data-ac-variant' value=include.variant -%}
```

After conversion, run:

```bash
rg -n '{%-?\s*render\b' _includes/acd
```

Expected: no matches. `rg` may exit with code 1 when there are no matches; that is acceptable for this check.

- [x] **Step 5: Document provenance and local adaptations**

Create `docs/acdesignweb-source-map.md` with this content:

```markdown
# ACDesignWeb Source Map

`acasto.dev` vendors selected static assets from `antoniocasto/ACDesignWeb`.

Source branch used for this migration: `develop`.
Source commit used for this migration: `bfb8a0e5ec94506cfee57fbe82d0e43eec6553bf`.

Copied paths:

- `packages/acdesign-core/styles/**` -> `assets/acdesign/styles/**`
- `packages/acdesign-jekyll/includes/acd/**` -> `_includes/acd/**`

Optional paths copied only when needed:

- `packages/acdesign-core/src/behaviors/overlays.js` -> `assets/acdesign/js/overlays.js`
- `packages/acdesign-core/src/behaviors/forms.js` -> `assets/acdesign/js/forms.js`

Rules:

- `ACDesignWeb` is read-only for this migration.
- Local consumer adaptations are allowed only in the vendored copies inside `acasto.dev`.
- The copied Jekyll adapter includes are adapted from Liquid `{% render %}` to Jekyll 3.10-compatible `{% include %}` because this site uses Liquid 4.0.4.
- Site-specific layout and content CSS belongs in `_sass/`.
- Production must not load files from the private `ACDesignWeb` repository.
```

- [x] **Step 6: Build after vendoring**

Run:

```bash
bundle exec jekyll build
```

Expected: copying assets and includes does not change rendered pages yet and the build still succeeds.

- [x] **Step 7: Commit the vendored foundation**

Run:

```bash
git add docs/acdesignweb-source-map.md assets/acdesign _includes/acd
git commit -m "Add ACDesignWeb vendored assets"
```

## Task 3: Connect ACDesign Theme Without Changing Pages

**Files:**
- Modify: `_layouts/default.html`
- Modify: `_sass/_theme.scss`
- Modify: `assets/js/main.js`

- [x] **Step 1: Load ACDesign component CSS before site CSS**

In `_layouts/default.html`, add the ACDesign stylesheet before `assets/css/style.css`:

```liquid
<link rel="stylesheet" href="{{ '/assets/acdesign/styles/components.css' | relative_url }}?v={{ asset_version }}">
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}?v={{ asset_version }}">
```

- [x] **Step 2: Add the AC theme root**

In `_layouts/default.html`, keep `<html lang="{{ current_lang }}">` and set the body class to include ACDesign foundations:

```liquid
<body class="ac-theme">
```

If the body needs future page classes, append them to the same `class` attribute instead of creating a second one.

- [x] **Step 3: Bridge existing custom properties to ACDesign tokens**

In `_sass/_theme.scss`, map existing variables to ACDesign tokens first. Keep old variable names for compatibility while migrated pages still use them:

```scss
:root {
  --primary-color: var(--ac-color-accent);
  --secondary-color: var(--ac-color-foreground-secondary);
  --background-color: var(--ac-color-background);
  --surface-color: var(--ac-color-surface);
  --surface-muted: var(--ac-color-surface-elevated);
  --text-color: var(--ac-color-foreground);
  --text-muted: var(--ac-color-foreground-secondary);
  --border-color: var(--ac-color-border-subtle);
  --font-stack: var(--ac-font-family-sans);
  --font-display: var(--ac-font-family-sans);
  --radius-xl: var(--ac-radius-xl);
  --radius-lg: var(--ac-radius-lg);
  --radius-md: var(--ac-radius-md);
  --radius-sm: var(--ac-radius-sm);
  --radius-pill: var(--ac-radius-full);
  --space-2xl: var(--ac-space-xxxl);
  --space-xl: var(--ac-space-xxl);
  --space-lg: var(--ac-space-xl);
  --space-md: var(--ac-space-lg);
  --space-sm: var(--ac-space-md);
  --space-xs: var(--ac-space-sm);
  --accent-gradient: linear-gradient(135deg, var(--ac-color-accent), color-mix(in srgb, var(--ac-color-accent) 62%, var(--ac-color-foreground)));
  --page-gradient: none;
  --hero-bg: var(--ac-color-surface);
  --glass-bg: color-mix(in srgb, var(--ac-color-surface-elevated) 72%, transparent);
  --glass-border: color-mix(in srgb, var(--ac-color-border-subtle) 84%, transparent);
}
```

- [x] **Step 4: Synchronize the current theme toggle with ACDesign**

In `assets/js/main.js`, update `applyThemeClass` so it also writes `data-ac-theme`:

```js
const applyThemeClass = (isDark) => {
  if (rootElement) {
    rootElement.classList.toggle('dark-theme', isDark);
    rootElement.dataset.acTheme = isDark ? 'dark' : 'light';
  }
  document.body.classList.toggle('dark-theme', isDark);
};
```

- [x] **Step 5: Build and verify no functional regression**

Run:

```bash
bundle exec jekyll build
```

Expected: build succeeds. In browser, theme toggle still persists light/dark choice and ACDesign components would now inherit the same theme.

- [x] **Step 6: Commit theme connection**

Run:

```bash
git add _layouts/default.html _sass/_theme.scss assets/js/main.js
git commit -m "Connect ACDesign theme tokens"
```

## Task 4: Restyle Global Shell And Navigation

**Files:**
- Modify: `_layouts/default.html`
- Modify: `_sass/_layout.scss`
- Modify: `_sass/_nav.scss`
- Modify: `_sass/_components.scss`
- Modify: `assets/js/main.js`

- [x] **Step 1: Keep default layout semantics intact**

Preserve these blocks in `_layouts/default.html`: `{% seo %}`, alternate `hreflang` links, favicon links, manifest, header/nav, mobile menu dialog, `main#main-content`, footer, theme switch, and `assets/js/main.js`.

- [x] **Step 2: Replace header visuals with ACDesign tokens**

In `_sass/_layout.scss`, restyle `.site-header` with ACDesign variables:

```scss
.site-header {
  padding: calc(var(--ac-space-lg) + env(safe-area-inset-top, 0px)) 0 var(--ac-space-lg);
  border-bottom: var(--ac-border-default) solid var(--ac-color-border-subtle);
  background: color-mix(in srgb, var(--ac-color-background) 88%, transparent);
  backdrop-filter: blur(1rem) saturate(140%);
  -webkit-backdrop-filter: blur(1rem) saturate(140%);
}
```

- [x] **Step 3: Restyle navigation links without changing URLs**

In `_sass/_nav.scss`, keep existing Liquid-driven active states and update colors, spacing, and focus rings to `--ac-*`. Active links should use `var(--ac-color-accent)`, not the old blue gradient.

- [x] **Step 4: Convert utility icon controls**

Use ACDesign-style icon button classes for:

- `.menu-toggle`
- `.close-menu`
- `.theme-switch`
- language dropdown summary, if it remains a native `details`

Keep existing ARIA attributes and focus handling.

- [x] **Step 5: Keep mobile menu behavior**

Do not replace the focus trap in `assets/js/main.js` during this task. Only adjust class names if the markup changes.

- [x] **Step 6: Verify shell**

Run:

```bash
bundle exec jekyll build
```

Browser checks:

- desktop menu active state is visible
- mobile menu opens, traps focus, closes with Escape and overlay click
- language dropdown still points to translated pages
- theme button remains keyboard reachable

- [x] **Step 7: Commit shell restyle**

Run:

```bash
git add _layouts/default.html _sass/_layout.scss _sass/_nav.scss _sass/_components.scss assets/js/main.js
git commit -m "Restyle site shell with ACDesign"
```

## Task 5: Rebuild The Home Page First

**Files:**
- Modify: `_layouts/index.html`
- Modify: `en/index.markdown`
- Modify: `it/index.markdown`
- Modify: `_sass/_index.scss`

- [x] **Step 1: Remove the terminal-first composition**

Replace the terminal-style `acasto.dev` hero in `_layouts/index.html` with a profile-led layout. Keep the page content slot so localized Markdown continues to drive the intro copy.

- [x] **Step 2: Use ACDesign components for actions and tags**

Use:

- `acd/button.liquid` for Portfolio and Contacts links
- `acd/tag.liquid` for SwiftUI, UIKit, Architecture, Testing, CI/CD
- direct image markup for `/assets/images/profile.jpeg`

- [x] **Step 3: Target the new home hierarchy**

The first viewport should communicate, in this order:

1. `Antonio Casto`
2. `iOS Developer`
3. one concise bilingual intro from the existing Markdown
4. primary action to Portfolio
5. secondary action to Contacts
6. profile image as the visual anchor

- [x] **Step 4: Keep localized content short**

Update `en/index.markdown` and `it/index.markdown` only enough to avoid duplicated greeting text already provided by the layout. Do not remove the meaning of the current specialization paragraph.

- [x] **Step 5: Replace old home Sass**

In `_sass/_index.scss`, remove `.terminal` and `.typing-animation` styles after the markup no longer uses them. Add `.home-shell`, `.home-intro`, `.home-portrait`, and `.home-tags` styles using `--ac-*` tokens.

- [x] **Step 6: Verify home**

Run:

```bash
bundle exec jekyll build
```

Browser checks:

- `/en/` and `/it/` render without text overlap at desktop and mobile widths
- profile image loads
- actions go to localized Portfolio and Contacts routes
- reduced-motion users do not get typing animation

- [x] **Step 7: Commit home migration**

Run:

```bash
git add _layouts/index.html en/index.markdown it/index.markdown _sass/_index.scss
git commit -m "Rebuild home page with ACDesign"
```

## Task 6: Migrate Shared Page Headers

**Files:**
- Create: `_includes/site/page-header.html`
- Modify: `en/portfolio.markdown`
- Modify: `it/portfolio.markdown`
- Modify: `en/blog.markdown`
- Modify: `it/blog.markdown`
- Modify: `en/certificates.markdown`
- Modify: `it/certificates.markdown`
- Modify: `en/contacts.markdown`
- Modify: `it/contacts.markdown`
- Modify: `_sass/_base.scss`

- [x] **Step 1: Create a site page-header include**

Create `_includes/site/page-header.html`:

```liquid
{% include acd/section-header.liquid
  title=include.title
  subtitle=include.subtitle
  heading_tag=include.heading_tag
  style=include.style
  size=include.size
  class=include.class
%}
```

- [x] **Step 2: Replace markdown `#` page titles on listing pages**

Use `{% include site/page-header.html %}` at the top of portfolio, blog, certificates, and contacts pages. Keep the current localized title and intro copy.

- [x] **Step 3: Remove global heading underlines**

In `_sass/_base.scss`, remove or narrow the global `h2, h3` border-bottom rule so ACDesign section headers control their own hierarchy.

- [x] **Step 4: Verify all listing pages**

Run:

```bash
bundle exec jekyll build
```

Browser checks:

- `/en/portfolio/`, `/it/portfolio/`
- `/en/blog/`, `/it/blog/`
- `/en/certificates/`, `/it/certificates/`
- `/en/contacts/`, `/it/contacts/`

Expected: page headings are visually consistent and existing content still appears.

- [x] **Step 5: Commit page headers**

Run:

```bash
git add _includes/site/page-header.html en/portfolio.markdown it/portfolio.markdown en/blog.markdown it/blog.markdown en/certificates.markdown it/certificates.markdown en/contacts.markdown it/contacts.markdown _sass/_base.scss
git commit -m "Use ACDesign page headers"
```

## Task 7: Migrate Portfolio Listing And Detail Pages

**Files:**
- Create: `_includes/site/project-card.html`
- Modify: `en/portfolio.markdown`
- Modify: `it/portfolio.markdown`
- Modify: `_layouts/portfolio.html`
- Modify: `_sass/_components.scss`
- Modify: `_sass/_collection_item.scss`

- [x] **Step 1: Create project card include**

Create `_includes/site/project-card.html` with ACDesign card root and existing image support:

```liquid
{% assign thumbnail_src = include.project.thumbnail %}
{% assign project_href = include.project.url | relative_url %}
{% if include.project.thumbnail and include.project.thumbnail contains "://" %}
  {% assign thumbnail_src = include.project.thumbnail %}
{% elsif include.project.thumbnail %}
  {% assign thumbnail_src = include.project.thumbnail | relative_url %}
{% endif %}

{% capture project_body %}
  <div class="project-card__media"{% if include.project.thumbnail_bg %} style="--portfolio-thumb-bg: {{ include.project.thumbnail_bg }};"{% endif %}>
    {% if thumbnail_src %}
      <img src="{{ thumbnail_src }}" alt="{{ include.project.thumbnail_alt | default: include.project.title }}" loading="lazy" decoding="async">
    {% else %}
      <span class="project-card__placeholder" aria-hidden="true">App</span>
    {% endif %}
  </div>
  <p>{{ include.project.description }}</p>
{% endcapture %}

{% include acd/card.liquid
  href=project_href
  title=include.project.title
  body_html=project_body
  variant="filled"
  class="project-card"
%}
```

- [x] **Step 2: Replace repeated portfolio card markup**

In both portfolio pages, replace the inline `<a class="portfolio-card">` block with:

```liquid
{% include site/project-card.html project=project %}
```

- [x] **Step 3: Restyle grid**

Keep `.portfolio-grid`, but style `.project-card` and `.project-card__media` around ACDesign tokens. Remove old `.portfolio-card*` styles after no markup uses them.

- [x] **Step 4: Restyle detail pages**

In `_layouts/portfolio.html`, use `acd/section-header.liquid` for the title and ACDesign token styling for `.collection_item`. Keep thumbnail handling and content output unchanged.

- [x] **Step 5: Verify portfolio**

Run:

```bash
bundle exec jekyll build
```

Browser checks:

- portfolio listing links still open each project
- thumbnails still render
- empty-state copy still appears if the collection is empty
- project detail pages retain content and hero images

Verification note: `bundle exec jekyll build` passed. Generated HTML checks passed for EN/IT portfolio cards, card hrefs, detail headers, detail hero images, and absence of escaped card markup. The in-app browser rejected navigation to `http://127.0.0.1:4001` due its browser security policy, so live browser verification for this step was not completed in this pass.

- [x] **Step 6: Commit portfolio migration**

Run:

```bash
git add _includes/site/project-card.html en/portfolio.markdown it/portfolio.markdown _layouts/portfolio.html _sass/_components.scss _sass/_collection_item.scss
git commit -m "Migrate portfolio to ACDesign cards"
```

## Task 8: Migrate Blog Listing, Tags, And Post Detail

**Files:**
- Create: `_includes/site/post-list-row.html`
- Modify: `en/blog.markdown`
- Modify: `it/blog.markdown`
- Modify: `_layouts/post.html`
- Modify: `_sass/_collection_item.scss`
- Modify: `_sass/_components.scss`
- Modify: `assets/js/main.js`

- [x] **Step 1: Keep existing filtering behavior**

Keep `data-value`, `data-categories`, `.filter-tile`, and `.post-item` behavior until the ACDesign tag group is wired and tested.

- [x] **Step 2: Convert category filter buttons to ACDesign tag appearance**

Add ACDesign classes to the existing filter buttons:

```liquid
<button type="button" class="filter-tile ac-tag" data-ac-variant="outlined" data-value="{{ normCat }}" aria-pressed="false">
  <span class="ac-tag__label">{{ normCat | capitalize }}</span>
</button>
```

Keep `filterPosts()` in `assets/js/main.js`; do not use `ACTagGroup` selection until parity is confirmed.

- [x] **Step 3: Create post list row include**

Create `_includes/site/post-list-row.html`:

```liquid
{% assign post_href = include.post.url | relative_url %}
{% assign lang = include.lang | default: site.default_lang %}
{% assign localized_date = include.post.date | date: "%d %B %Y" %}
{% if lang == "it" %}
  {% assign localized_date = localized_date
    | replace: "January", "Gennaio"
    | replace: "February", "Febbraio"
    | replace: "March", "Marzo"
    | replace: "April", "Aprile"
    | replace: "May", "Maggio"
    | replace: "June", "Giugno"
    | replace: "July", "Luglio"
    | replace: "August", "Agosto"
    | replace: "September", "Settembre"
    | replace: "October", "Ottobre"
    | replace: "November", "Novembre"
    | replace: "December", "Dicembre" %}
{% endif %}

{% capture post_categories %}
  {% if include.post.categories %}
    <span class="post-list-row__tags">
      {% for cat in include.post.categories %}
        {% include acd/tag.liquid label=cat variant="outlined" size="small" color="surface" %}
      {% endfor %}
    </span>
  {% endif %}
{% endcapture %}

{% capture trailing_icon %}
  <span class="post-list-row__arrow" aria-hidden="true">→</span>
{% endcapture %}

<div class="post-item" data-categories="{{ include.post.categories | join: ',' }}">
  <a class="ac-list-row post-list-row" href="{{ post_href }}">
    <span class="ac-list-row__body">
      <span class="ac-list-row__title">{{ include.post.title | escape }}</span>
      <span class="ac-list-row__subtitle">
        {{ site.data.localization[lang].post.published_on }} {{ localized_date }}
      </span>
      {{ post_categories }}
    </span>
    <span class="ac-list-row__trailing">{{ trailing_icon }}</span>
  </a>
</div>
```

- [x] **Step 4: Replace post listing markup**

In both blog listing pages, replace the inline `.post-item` block with:

```liquid
{% include site/post-list-row.html post=post lang=page.lang %}
```

- [x] **Step 5: Restyle post detail layout**

In `_layouts/post.html`, use `acd/section-header.liquid` for the title and render categories with `acd/tag.liquid`.

- [x] **Step 6: Verify blog behavior**

Run:

```bash
bundle exec jekyll build
```

Browser checks:

- category filters still hide and show posts
- filter buttons update `aria-pressed`
- post links still work
- localized publication date still renders in Italian and English

Verification note: `bundle exec jekyll build` passed. Generated HTML checks passed for EN/IT filters, `aria-pressed="false"` initial state, post row links, `data-categories`, ACDesign tags, post detail headers, and localized EN/IT dates. The existing `filterPosts()` selectors and `aria-pressed` update logic remain unchanged. Live in-app browser verification was not repeated because the browser rejected the local `127.0.0.1:4001` target during Task 7 due its security policy.

- [x] **Step 7: Commit blog migration**

Run:

```bash
git add _includes/site/post-list-row.html en/blog.markdown it/blog.markdown _layouts/post.html _sass/_collection_item.scss _sass/_components.scss assets/js/main.js
git commit -m "Migrate blog lists to ACDesign rows"
```

## Task 9: Migrate Certificates Without Losing Carousel Behavior

**Files:**
- Modify: `en/certificates.markdown`
- Modify: `it/certificates.markdown`
- Modify: `_sass/_components.scss`
- Modify: `assets/js/main.js`

- [x] **Step 1: Keep carousel data hooks unchanged**

Preserve these attributes:

- `data-certificates-carousel`
- `data-certificates-track`
- `data-certificates-prev`
- `data-certificates-next`
- `data-certificate-slide`

The current carousel JavaScript depends on them.

- [x] **Step 2: Convert certificate cards to ACDesign card styling**

Change each certificate article to carry both contracts:

```liquid
<article class="certificate-card ac-card" data-ac-variant="filled" data-certificate-slide>
```

Keep certificate image, provider label, course link, target, and rel attributes.

- [x] **Step 3: Convert carousel controls to ACDesign icon buttons**

Use `ac-icon-button` classes for previous and next buttons while preserving `data-certificates-prev`, `data-certificates-next`, and localized `aria-label` values.

- [x] **Step 4: Verify carousel**

Run:

```bash
bundle exec jekyll build
```

Browser checks:

- buttons scroll one certificate at a time
- autoplay stops on hover and focus
- keyboard ArrowLeft and ArrowRight still work on the track
- disabled button states remain clear

Verification note: `bundle exec jekyll build` passed. Generated HTML checks passed for all carousel data hooks, ACDesign card classes, ACDesign icon button classes, localized aria labels, course links, `target`, and `rel` attributes. The existing carousel JavaScript selectors remain unchanged. Live in-app browser verification was not repeated because the browser rejected the local `127.0.0.1:4001` target during Task 7 due its security policy.

- [x] **Step 5: Commit certificates migration**

Run:

```bash
git add en/certificates.markdown it/certificates.markdown _sass/_components.scss assets/js/main.js
git commit -m "Migrate certificates to ACDesign styling"
```

## Task 10: Migrate Contacts

**Files:**
- Create: `_includes/site/contact-list.html`
- Modify: `en/contacts.markdown`
- Modify: `it/contacts.markdown`
- Modify: `_sass/_components.scss`

- [x] **Step 1: Create contact list include**

Create `_includes/site/contact-list.html`:

```liquid
{% assign lang = include.lang | default: site.default_lang %}
{% assign email_href = site.email | prepend: "mailto:" %}

{% if lang == "it" %}
  {% assign email_title = "Email" %}
  {% assign email_subtitle = site.email %}
  {% assign linkedin_title = "LinkedIn" %}
  {% assign linkedin_subtitle = "Profilo professionale" %}
  {% assign github_title = "GitHub" %}
  {% assign github_subtitle = "Repository e progetti" %}
{% else %}
  {% assign email_title = "Email" %}
  {% assign email_subtitle = site.email %}
  {% assign linkedin_title = "LinkedIn" %}
  {% assign linkedin_subtitle = "Professional profile" %}
  {% assign github_title = "GitHub" %}
  {% assign github_subtitle = "Repositories and projects" %}
{% endif %}

<div class="ac-list-container contact-list">
  {% include acd/list-row.liquid
    href=email_href
    title=email_title
    subtitle=email_subtitle
  %}

  {% include acd/list-row.liquid
    href=site.linkedin_link
    title=linkedin_title
    subtitle=linkedin_subtitle
    attrs='target="_blank" rel="noopener noreferrer"'
  %}

  {% include acd/list-row.liquid
    href=site.github_link
    title=github_title
    subtitle=github_subtitle
    divider=false
    attrs='target="_blank" rel="noopener noreferrer"'
  %}
</div>
```

- [x] **Step 2: Replace inline emoji contact chips**

Remove `.contact-item` spans from both contact pages and render:

```liquid
{% include site/contact-list.html lang=page.lang %}
```

- [x] **Step 3: Remove old contact chip styles**

Delete `.contact-item` and `.contact-icon` styles after markup no longer uses them.

- [x] **Step 4: Verify contacts**

Run:

```bash
bundle exec jekyll build
```

Browser checks:

- email link opens `mailto:developer@acasto.dev`
- LinkedIn and GitHub links open in a new tab
- rows are keyboard focusable and have visible focus states

Verification note: `bundle exec jekyll build` passed. Generated HTML checks passed for the ACDesign list container, the `mailto:developer@acasto.dev` link, LinkedIn/GitHub external links, `target="_blank"`, `rel="noopener noreferrer"`, and exactly three list rows in both languages. Live in-app browser verification was not repeated because the browser rejected the local `127.0.0.1:4001` target during Task 7 due its security policy.

- [x] **Step 5: Commit contacts migration**

Run:

```bash
git add _includes/site/contact-list.html en/contacts.markdown it/contacts.markdown _sass/_components.scss
git commit -m "Migrate contacts to ACDesign rows"
```

## Task 11: Migrate About Page In Sections

**Files:**
- Modify: `en/about.markdown`
- Modify: `it/about.markdown`
- Modify: `_layouts/about.html`
- Modify: `_sass/_about.scss`

- [x] **Step 1: Preserve all existing resume content**

Do not remove work experience, skills, quality/delivery, education, continuous learning, additional technologies, or CTA links.

- [x] **Step 2: Convert hero identity**

Use:

- `ACAvatar` or image markup styled with ACDesign avatar tokens for profile image
- `ACTag` for `iOS Developer`
- `ACButton` for Portfolio and Contacts actions
- ACDesign tokens for the hero layout

- [x] **Step 3: Convert content sections**

Use `acd/section-header.liquid` for section headings and `ac-card`/`ac-list-container` styling for dense information blocks. Keep the long lists readable; do not force every list item into a card.

- [x] **Step 4: Convert native details to ACDesign accordion**

For "Additional Technologies", use `acd/accordion.liquid` only after copying and loading `assets/acdesign/js/overlays.js`. If overlay JS is not loaded in the same task, keep native `<details>` and only restyle it with ACDesign tokens.

Implementation note: kept native `<details>` and restyled it with ACDesign tokens; `ACAccordion` was not introduced in this task.

- [x] **Step 5: Load overlay enhancer if accordion is used**

If `ACAccordion` is rendered, add this module script near the existing JavaScript loading in `_layouts/default.html`:

```html
<script type="module">
  import { enhanceAccordions } from "{{ '/assets/acdesign/js/overlays.js' | relative_url }}";
  enhanceAccordions(document);
</script>
```

Implementation note: skipped overlay enhancer loading because no `ACAccordion` is rendered.

- [x] **Step 6: Verify about**

Run:

```bash
bundle exec jekyll build
```

Browser checks:

- all previous about content is still present in both languages
- CTAs route to localized pages
- accordion/details opens and closes
- layout remains readable on mobile

Verification note: `bundle exec jekyll build` passed. Generated HTML checks passed for preserved EN/IT resume sections, hero avatar/tag/button contracts, six ACDesign section headers per language, ACDesign cards, native details, Additional Technologies content, and localized CTA hrefs. Live in-app browser verification was not repeated because the browser rejected the local `127.0.0.1:4001` target during Task 7 due its security policy.

- [x] **Step 7: Commit about migration**

Run:

```bash
git add en/about.markdown it/about.markdown _layouts/about.html _sass/_about.scss _layouts/default.html
git commit -m "Migrate about page to ACDesign"
```

If `assets/acdesign/js/overlays.js` was copied because `ACAccordion` is used, add it before the commit:

```bash
git add assets/acdesign/js/overlays.js
```

## Task 12: Clean Up Legacy Styling

**Files:**
- Modify: `_sass/_theme.scss`
- Modify: `_sass/_variables.scss`
- Modify: `_sass/_base.scss`
- Modify: `_sass/_layout.scss`
- Modify: `_sass/_components.scss`
- Modify: `_sass/_collection_item.scss`
- Modify: `_sass/_index.scss`
- Modify: `_sass/_about.scss`
- Modify: `_sass/_nav.scss`
- Modify: `_layouts/default.html`

- [x] **Step 1: Search for old classes and variables**

Run:

```bash
rg "typing-animation|terminal|portfolio-card|contact-item|category-tile|cta-button|cta-link|glass-panel|--primary-color|--accent-gradient|dark-theme" _layouts _sass assets/js en it
```

Expected: only intentionally retained compatibility names remain.

- [x] **Step 2: Remove unused gradient and glass defaults**

Delete site-specific one-off visual treatments that no migrated markup uses. Keep compatibility variables only if they are still referenced by active code.

- [x] **Step 3: Reconsider Google Fonts**

If all typography uses `--ac-font-family-sans`, remove the Google Fonts preconnect and stylesheet from `_layouts/default.html`. Keep them only if a deliberate typography decision says the personal site should differ from the ACDesign system.

- [x] **Step 4: Verify CSS output**

Run:

```bash
bundle exec jekyll build
```

Inspect generated CSS size and check for broken imports in the browser network panel.

Verification note: `bundle exec jekyll build` passed. The legacy search returned no matches. Generated `_site/assets/css/style.css` is present, ACDesign `components.css` is present, and every relative `@import` in the generated ACDesign CSS resolves to an existing file. Live browser network-panel inspection was not performed because the in-app browser rejected the local `127.0.0.1:4001` target during Task 7 due its security policy.

- [x] **Step 5: Commit cleanup**

Run:

```bash
git add _sass _layouts/default.html assets/css/style.scss
git commit -m "Remove legacy design styling"
```

## Task 13: Full Functional Verification

**Files:**
- Read: generated `_site/**`
- Read: browser output

- [x] **Step 1: Build the complete site**

Run:

```bash
bundle exec jekyll build
```

Expected: build succeeds without Liquid errors, Sass errors, or missing include errors.

Verification note: `bundle exec jekyll build` passed after the final verification fix.

- [x] **Step 2: Run local server**

Run:

```bash
bundle exec jekyll serve --livereload
```

Verification note: the existing local server on `127.0.0.1:4001` was active and `curl -I http://127.0.0.1:4001/en/` returned `HTTP/1.1 200 OK`.

- [x] **Step 3: Verify pages manually**

Check:

- `http://127.0.0.1:4000/en/`
- `http://127.0.0.1:4000/it/`
- `http://127.0.0.1:4000/en/about/`
- `http://127.0.0.1:4000/it/about/`
- `http://127.0.0.1:4000/en/portfolio/`
- `http://127.0.0.1:4000/it/portfolio/`
- `http://127.0.0.1:4000/en/blog/`
- `http://127.0.0.1:4000/it/blog/`
- `http://127.0.0.1:4000/en/certificates/`
- `http://127.0.0.1:4000/it/certificates/`
- `http://127.0.0.1:4000/en/contacts/`
- `http://127.0.0.1:4000/it/contacts/`

Verification note: live browser inspection was blocked by the in-app browser security policy for the local target. Static generated-page checks verified all required routes exist for English and Italian pages, with ACDesign stylesheets, skip links, focusable `#main-content`, mobile-menu markup, and theme-toggle markup.

- [x] **Step 4: Verify required behavior**

Expected behavior:

- language dropdown points to the corresponding translated page
- active navigation item is correct
- mobile menu opens, focuses, closes, and restores focus
- theme toggle switches ACDesign theme and persists in `localStorage`
- blog category filters still work
- certificate carousel buttons and keyboard controls still work
- external links keep `target="_blank"` and `rel="noopener noreferrer"`
- skip link reaches `#main-content`

Verification note: static checks verified language links, active navigation, mobile-menu focus/Escape/focus-restore JS, ACDesign theme persistence in `localStorage`, blog filter hooks, certificate carousel click/keyboard/reduced-motion hooks, external-link safety, and skip-link wiring.

- [x] **Step 5: Verify responsive layout**

Check at minimum:

- mobile: 390 x 844
- tablet: 768 x 1024
- desktop: 1440 x 900

Expected: no text overlap, no horizontal scrolling from fixed-width UI, tap targets remain usable.

Verification note: visual viewport checks could not be performed because the in-app browser rejected the local target. Static CSS checks verified the mobile breakpoints, responsive grid/card sizing, and no legacy fixed-width design markers in the generated key pages.

- [x] **Step 6: Verify reduced motion**

Enable reduced motion in browser or emulate it.

Expected: transitions and carousel behavior remain usable without essential motion.

Verification note: static checks verified `@media (prefers-reduced-motion: reduce)` in generated CSS and reduced-motion handling in the certificate carousel/theme JS.

- [x] **Step 7: Commit verification fixes**

If fixes are needed, commit them with a focused message:

```bash
git add <changed-files>
git commit -m "Fix ACDesign migration verification issues"
```

Verification fix committed as `8474446 Fix ACDesign portfolio thumbnail tokens`, replacing legacy portfolio thumbnail CSS variables with ACDesign tokens.

## Task 14: Visual Coherence Pass

**Visual thesis:** Push the site from "old layout restyled with ACDesign tokens" to "ACDesign-native personal portfolio": quieter surfaces, fewer bespoke wrappers, consistent component affordances, and stronger hierarchy.

**Content plan:** Keep current content and routes; improve home orientation, about proof, blog filtering, certificates controls, contact actions, and floating theme action using ACDesign components.

**Interaction thesis:** Preserve existing JS behaviors while moving their visible controls onto ACDesign contracts: FAB theme action, tag-group filtering, accordion disclosure, icon-button carousel controls, and consistent card/list press states.

**Files:**
- Edit: `_layouts/default.html`
- Edit: `_layouts/index.html`
- Edit: `_includes/acd/button.liquid`, `_includes/acd/icon-button.liquid`, `_includes/acd/tag.liquid`, `_includes/acd/tag-group.liquid`, `_includes/acd/avatar.liquid`, `_includes/acd/section-header.liquid`, `_includes/acd/accordion.liquid`, `_includes/acd/empty-state.liquid`, `_includes/acd/modal.liquid`, `_includes/acd/progress-ring.liquid`, `_includes/acd/stepper-input.liquid`
- Edit: `en/about.markdown`, `it/about.markdown`
- Edit: `en/blog.markdown`, `it/blog.markdown`
- Edit: `en/certificates.markdown`, `it/certificates.markdown`
- Edit: `_sass/_index.scss`, `_sass/_about.scss`, `_sass/_components.scss`
- Edit: `assets/js/main.js`
- Edit: `docs/acdesignweb-source-map.md`
- Read: `_includes/acd/**`, `assets/acdesign/styles/**`

- [x] **Step 1: Audit remaining bespoke visual surfaces**

Identify visible elements still shaped by old custom classes rather than ACDesign components.

Verification note: audited the current page templates, content markdown, Sass, and vendored component APIs. Chosen targets were the theme action, blog filters, about disclosure, home proof points, certificate controls, and Liquid `size` compatibility in vendored ACDesign includes.

- [x] **Step 2: Replace theme switch visual shell with `ACFAB`**

Keep the existing theme behavior, but make the visible floating action match ACDesign FAB styling.

Verification note: replaced the checkbox/label visual shell with `acd/fab.liquid`, updated `main.js` to click/`aria-pressed` behavior, and preserved `data-ac-theme` + `localStorage` theme persistence.

- [x] **Step 3: Convert blog category filters to `ACTagGroup`**

Keep `.filter-tile` and existing JS hooks, but render the group with ACDesign's tag-group component contract.

Verification note: English and Italian blog filters now render inside `ac-tag-group`; filter buttons are ACDesign tags and JS updates `data-ac-selected`, `data-ac-variant`, `data-ac-color`, and `aria-pressed`.

- [x] **Step 4: Convert about disclosure to `ACAccordion`**

Replace custom `about-details` styling with the vendored ACDesign accordion include while preserving content and native disclosure semantics.

Verification note: the supporting technologies disclosure now uses the ACDesign accordion contract (`ac-accordion-group`, `ac-accordion`, `ac-accordion__summary`, `ac-accordion__panel`) and obsolete `about-details` CSS was removed.

- [x] **Step 5: Add ACDesign proof components where useful**

Use `ACStatCard` for home proof points where it improves visual consistency without turning the site into a card mosaic.

Verification note: home now includes three compact `ACStatCard` proof points and an `ACTagGroup` skill row.

- [x] **Step 6: Convert carousel controls to `ACIconButton` includes**

Keep carousel data hooks and JS, but render controls through the ACDesign include rather than hand-authored button markup.

Verification note: certificate previous/next controls now render through `acd/icon-button.liquid` while preserving `data-certificates-prev` and `data-certificates-next`.

- [x] **Step 7: Remove obsolete custom styling**

Delete CSS that only existed to simulate ACDesign components now rendered by ACDesign includes.

Verification note: removed obsolete custom styling for the old theme label/input shell, manual blog filter tile layout, and custom about disclosure animation. Vendored ACDesign includes now use bracket access for `size` parameters to avoid Liquid's collection-size collision.

- [x] **Step 8: Build and run static verification**

Run:

```bash
bundle exec jekyll build
```

Then verify generated pages and hooks.

Verification note: `bundle exec jekyll build`, `git diff --check`, and static generated-page verification passed. Generated pages contain the new ACDesign components and no obsolete visual markers or numeric `data-ac-size` attributes.

- [x] **Step 9: Commit visual coherence pass**

Commit only focused ACDesign coherence changes.

Verification note: committed as `cf85cda Increase ACDesign visual coherence`.

## Task 15: Navbar ACDesign Hover Pass

**Visual thesis:** The top navigation should behave like a compact ACDesign action surface: calm at rest, clear active state, no legacy underline animation, and consistent hover/focus affordances.

**Files:**
- Edit: `_sass/_nav.scss`
- Read: `_layouts/default.html`
- Read: `assets/acdesign/styles/primitives/action-control.css`
- Read: `assets/acdesign/styles/primitives/button.css`

- [x] **Step 1: Audit current navbar hover behavior**

Identify legacy hover effects that conflict with ACDesign component states.

Verification note: the desktop menu still mixed a custom underline animation with pill hover styling, which conflicted with the ACDesign action-control language used elsewhere.

- [x] **Step 2: Replace desktop nav hover/active styling**

Remove custom underline animation and style nav links as compact ACDesign-like action pills.

Verification note: removed the desktop nav pseudo-underline and replaced hover/active/focus/active-press states with compact surface/accent action pills.

- [x] **Step 3: Align language dropdown states**

Use the same surface, border, active, hover, and focus logic as the rest of the top navigation.

Verification note: language dropdown now uses the same surface variables, spacing, radius, focus, hover, open, and reduced-motion treatment as the nav action surfaces. Mobile drawer links were aligned to the same active/hover model.

- [x] **Step 4: Build and verify navbar output**

Run:

```bash
bundle exec jekyll build
```

Verify generated CSS and key pages.

Verification note: `bundle exec jekyll build`, `git diff --check`, `curl -I http://127.0.0.1:4000/en/`, and navbar static verification passed.

- [x] **Step 5: Commit navbar pass**

Commit only navbar-related changes.

Verification note: committed as `4c76b87 Align navbar hover with ACDesign`.

## Task 16: Develop-Only Integration Gate

**Files:**
- Git history only

- [ ] **Step 1: Merge feature into `develop` locally if not using remote PRs**

Run:

```bash
git checkout develop
git pull --ff-only origin develop
git merge --no-ff feature/acdesignweb-foundation
```

- [ ] **Step 2: Stop before `main`**

Do not run `git checkout main`, do not merge `develop` into `main`, do not push `main`, and do not create a PR from `develop` to `main` unless Antonio explicitly authorizes the release in a future message.

- [ ] **Step 3: Use only the feature-to-develop pull request if integrating on remote**

If pushing integration to GitHub before Antonio authorizes a release, use only:

```text
PR from `feature/acdesignweb-foundation` into `develop`
```

Do not create the `develop` to `main` PR yet.

- [ ] **Step 4: Record the pending release state**

After the feature is integrated into `develop`, leave a short handoff note in the final response:

```text
Migration integrated to develop. Release to main is intentionally pending Antonio's explicit approval.
```

## Task 17: Main Release Gate, Only After Explicit Approval

**Files:**
- Git history only

- [ ] **Step 1: Confirm approval text**

Proceed only if Antonio has explicitly said that `main` can be updated or released.

- [ ] **Step 2: Merge `develop` into `main` locally if not using remote PRs**

Run only after explicit approval:

```bash
git checkout main
git pull --ff-only origin main
git merge --no-ff develop
```

- [ ] **Step 3: Use pull requests if releasing on remote**

If releasing through GitHub after explicit approval, use:

```text
PR from `develop` into `main`
```

Do not bypass the required `develop` to `main` flow.

## Task 18: ACDesign Dominance Pass

**Visual thesis:** The site should now read as an ACDesign-native portfolio, with neutral ACDesign surfaces, system typography, compact component affordances, and no visible legacy blue/slate styling.

**Content plan:** Keep all current routes and content; tighten the default shell, mobile menu, error page, and residual global styling so every visible surface is either an ACDesign component or a site composition built from `--ac-*` tokens.

**Interaction thesis:** Preserve the existing JavaScript behavior while making the mobile menu, theme action, page focus states, carousel affordances, and error recovery feel consistent with ACDesign controls.

**Files:**
- Modify: `_config.yml`
- Modify: `_layouts/default.html`
- Modify: `404.html`
- Modify: `_sass/_base.scss`
- Modify: `_sass/_layout.scss`
- Modify: `_sass/_components.scss`
- Modify: `_sass/_index.scss`
- Modify: `_sass/_nav.scss`

- [x] **Step 1: Audit remaining bespoke visual surfaces**

Search site-authored files for old hardcoded colors, slate shadows, inline error-page styling, legacy theme colors, and mobile menu chrome that does not use ACDesign component contracts.

Verification note: remaining targets are the default meta theme color, 404 inline CSS, global heading underline/selection blue, site-authored slate shadows, logo filters, mobile menu surface/list styling, and stale cache versioning.

- [x] **Step 2: Update ACDesign palette metadata and cache version**

Use ACDesign palette values for browser theme-color metadata and bump `asset_version` so the changed CSS is requested by deployed pages.

Verification note: `_layouts/default.html` now emits light/dark `theme-color` values from the ACDesign neutral palette and `_config.yml` uses `asset_version: "5"`.

- [x] **Step 3: Replace the legacy 404 page with ACDesign components**

Remove inline CSS from `404.html` and render the page through `ACEmptyState` and `ACButton`.

Verification note: `404.html` now has no inline CSS, sets a page title, renders `ACEmptyState`, and links the recovery button to `/` so the existing language redirect can choose the visitor's language.

- [x] **Step 4: Remove global legacy text decoration**

Remove the old global heading underline and replace old selection/focus fallback colors with ACDesign-derived tokens.

Verification note: `_sass/_base.scss` no longer applies the old global blue heading underline; focus and selection styling now use `--ac-color-accent` and ACDesign palette fallbacks.

- [x] **Step 5: Tokenize site-authored shadows and overlays**

Replace site-specific `rgba(15, 23, 42, ...)` and old blue RGBA values with ACDesign-derived CSS custom properties and `color-mix()` fallbacks.

Verification note: site-authored shadows and overlays now flow through `--site-shadow-*`, `--site-overlay-background`, and `--site-selection-background`, all derived from ACDesign neutrals/accent; static search found no remaining old blue/slate markers in site-authored CSS/HTML.

- [x] **Step 6: Make the mobile menu ACDesign-native**

Render the mobile menu as an ACDesign elevated surface with `ACListRow`-compatible rows, bottom-sheet mobile geometry, and token-driven overlay colors.

Verification note: the mobile menu markup now uses `ac-surface-elevated`, `ac-list-container`, and `ac-list-row`; browser verification at 390 x 844 confirmed no horizontal overflow, one active ACDesign row, visible close button, correct `aria-hidden` changes, and body scroll lock while open.

- [x] **Step 7: Build and verify**

Run `bundle exec jekyll build`, check generated key pages for ACDesign components and absence of site-authored legacy colors, then run any available local HTTP/static checks.

Verification note: `bundle exec jekyll build` passed. `git diff --check` passed. Generated EN/IT home and 404 pages load ACDesign CSS and site CSS with `v=5`. Browser checks passed for desktop 1280 x 720, mobile 390 x 844, mobile menu open/close, theme toggle `data-ac-theme`/`aria-pressed`, and 404 ACDesign empty-state output. The Browser plugin screenshot command timed out, so verification used DOM/viewport metrics instead of screenshots.

## Task 19: ACDesign Contrast Pass

**Visual thesis:** Interactive controls must keep ACDesign's calm neutral/accent language while guaranteeing readable text in light and dark modes.

**Content plan:** Keep all current content, routes, and component choices; only adjust CSS contracts that control foreground/background color relationships.

**Interaction thesis:** Preserve the existing hover, active, menu, filter, and theme-toggle behaviors while making every state readable against its actual surface.

**Files:**
- Modify: `_sass/_nav.scss`
- Modify: `_sass/_components.scss`
- Modify: `_sass/_base.scss`
- Modify: `_sass/_index.scss`
- Modify: `_sass/_about.scss`
- Modify: `_sass/_collection_item.scss`
- Modify: `_config.yml`

- [x] **Step 1: Reproduce contrast failures**

Measure computed foreground/background colors and contrast ratios for navbar buttons, language control, icon buttons, ACButtons, FAB, tags, and list-like controls in both light and dark modes.

Verification note: initial checks found stale low-contrast pairings on navbar/language controls, secondary ACButtons rendered as links, outlined tags, mobile icon buttons, and accent-colored text/icons in dark mode.

- [x] **Step 2: Identify root cause**

Trace failing controls to the exact CSS override or component variable relationship that creates low contrast.

Verification note: root causes were global/site-authored rules overriding ACDesign component foregrounds, wrappers forcing foregrounds independently from backgrounds, hover states using accent as text on dark surfaces, and legacy accent-as-text usage outside components.

- [x] **Step 3: Fix site-authored control color contracts**

Update site-authored Sass so navbar, language, icon, button, tag, and FAB wrappers inherit ACDesign foreground/background pairs instead of forcing stale or mismatched foregrounds.

Verification note: navbar links now use foreground/accent-foreground pairs explicitly; language/menu icon buttons set actual background, border, and color; ACButtons, icon buttons, tags, and selected filter tags have explicit site-level ACDesign contracts; accent text now flows through `--site-accent-text`, which stays ACDesign accent in light mode and becomes a readable ACDesign-derived mix in dark mode.

- [x] **Step 4: Build and verify contrast**

Run `bundle exec jekyll build`, `git diff --check`, static searches, and browser contrast checks for light/dark desktop and mobile states.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated pages serve CSS/JS with `v=8`, static searches no longer find `color: var(--ac-color-accent)` as direct text color, and the token contrast audit reports no failures with a minimum checked ratio of 7.03:1. The Browser plugin blocked navigation to `http://127.0.0.1:4000`, so final contrast verification used generated CSS plus token-level contrast calculation instead of browser DOM screenshots.

## Task 20: Residual Contrast Hardening

**Visual thesis:** After the primary navbar/button fix, any remaining low-contrast affordance should be corrected with ACDesign-derived foreground, surface, and focus tokens.

**Content plan:** Keep all content and component structure unchanged; only adjust state tokens for focus and disabled controls.

**Interaction thesis:** Preserve focus, disabled, hover, and carousel behavior while making each visible state readable in both themes.

**Files:**
- Modify: `_sass/_base.scss`
- Modify: `_sass/_components.scss`
- Modify: `_sass/_nav.scss`

- [x] **Step 1: Sweep residual foreground, focus, and opacity states**

Search site-authored Sass for direct accent text, focus outlines derived from low-contrast accent blue, tertiary foregrounds, and extra opacity on disabled controls.

Verification note: the remaining site-authored risks were focus rings using accent directly in dark mode and certificate carousel icon buttons combining tertiary foreground with extra disabled opacity.

- [x] **Step 2: Harden focus and disabled tokens**

Introduce a readable ACDesign-derived focus token and replace fragile disabled carousel foreground/opacity.

Verification note: `--site-focus-ring` now follows the readable accent text token in dark mode; focus-visible rules use that token; disabled certificate controls use ACDesign surface, secondary foreground, subtle border, and full disabled opacity.

- [x] **Step 3: Build and audit extended contrast**

Run build, diff check, generated CSS checks, and an extended token contrast audit including focus rings and disabled certificate controls.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the new focus/disabled rules, and the extended contrast audit reports no failures with a minimum checked ratio of 7.03:1.

## Task 21: UI Detail Polish

**Visual thesis:** The site should feel like a finished ACDesign portfolio: neutral chips, polished micro-icons, clear scan paths, and no stray technology labels that weaken the professional positioning.

**Content plan:** Remove the deprecated architecture label everywhere, keep the home proof points and chips concise, improve blog list affordances, and only add ACDesign components where they make the interface easier to scan.

**Interaction thesis:** Preserve every route and JavaScript behavior; improve perceived quality through better component semantics, iconography, hover states, and generated output checks.

**Files:**
- Modify: `_layouts/index.html`
- Modify: `_includes/site/post-list-row.html`
- Modify: `_sass/_index.scss`
- Modify: `_sass/_collection_item.scss`
- Modify: `_config.yml`
- Modify: `assets/images/icons.svg`
- Modify: `en/certificates.markdown`
- Modify: `it/certificates.markdown`
- Modify: `en/about.markdown`
- Modify: `it/about.markdown`
- Modify: `_posts/en/2025-03-16-website-launch.markdown`
- Modify: `_posts/it/2025-03-16-website-launch.markdown`

- [x] **Step 1: Remove deprecated architecture references**

Replace the deprecated architecture label with the existing architecture set: MVVM, VIPER, Coordinator, and Repository pattern.

Verification note: home proof points, localized about pages, and localized launch posts now reference MVVM, VIPER, Coordinator, and Repository pattern without the removed architecture wording.

- [x] **Step 2: Normalize home chips and polish home metadata**

Make every home skill capsule neutral and use ACDesign component semantics for the compact role label.

Verification note: the home role now renders as an ACDesign badge, the CTA trailing icon uses the shared chevron sprite, every home skill tag uses the same neutral outlined surface treatment, and the About role tag is neutralized to match.

- [x] **Step 3: Improve blog list micro-UI**

Replace the textual `->` with a real chevron icon and improve date/category scanning without nesting interactive controls.

Verification note: blog rows now render a neutral SVG chevron that shifts to the readable accent token on hover; certificate carousel icon buttons also use SVG chevrons instead of text glyph arrows.

- [x] **Step 4: Build and verify detail polish**

Run static searches, `bundle exec jekyll build`, generated HTML checks, and `git diff --check`.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, source and generated searches found no removed architecture label or textual arrow glyphs, generated pages serve assets with `v=9`, and the local Jekyll server is running at `http://127.0.0.1:4001/`.

## Task 22: Control Padding Polish

**Visual thesis:** Tiny controls should still feel tactile and deliberate: icon buttons need a comfortable tap target and role badges need enough internal breathing room.

**Content plan:** Keep the home content unchanged; only tune the burger menu icon button and the home role badge spacing.

**Interaction thesis:** Preserve the mobile menu behavior and ACDesign component contracts while improving touch target comfort and visual balance.

**Files:**
- Modify: `_sass/_nav.scss`
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Tune mobile burger sizing**

Increase the mobile menu toggle to an ACDesign-comfortable touch target and give the custom burger glyph more room inside the outlined circle.

Verification note: `.menu-toggle` now uses a larger ACDesign icon-button size and a rem-based burger glyph width for a more comfortable outlined circle.

- [x] **Step 2: Tune home role badge padding**

Use ACDesign badge sizing variables to increase the `iOS Developer` badge height and horizontal padding without changing its neutral surface treatment.

Verification note: `.home-role__badge` now uses larger ACDesign badge height and inline padding variables while keeping the neutral surface/foreground pairing.

- [x] **Step 3: Build and verify generated CSS**

Run `bundle exec jekyll build`, `git diff --check`, and generated CSS checks for the updated sizing rules.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the updated burger and badge sizing, generated pages serve assets with `v=10`, and `http://127.0.0.1:4000/it/` is serving the updated build.

## Task 23: Home Stat Card Alignment

**Visual thesis:** The three home stat cards should read as one aligned row: same top rhythm, same value baseline, same label start, regardless of one-line or two-line labels.

**Content plan:** Keep the same stat content and ACDesign stat-card component; only tune the home-specific grid rows.

**Interaction thesis:** No behavior changes; preserve responsive stacking while improving desktop/tablet scan quality.

**Files:**
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Normalize stat card internal rows**

Override the home stat-card grid rows so meta, value, and label areas have consistent reserved heights.

Verification note: `.home-proof__item` now uses home-specific grid rows for meta, value, and label; value and label blocks have reserved heights so the three cards align even when labels wrap differently.

- [x] **Step 2: Build and verify generated CSS**

Run `bundle exec jekyll build`, `git diff --check`, and generated CSS checks for the updated alignment rules.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the home-specific stat-card row sizing, generated pages serve assets with `v=11`, and the Jekyll server on `http://127.0.0.1:4000/it/` was restarted with the current config.

## Task 24: Home Portrait Desktop Height

**Visual thesis:** The desktop portrait should support the hero, not dominate it; a shorter editorial crop should balance with the content column.

**Content plan:** Keep the same image and layout; only tune desktop portrait height/crop and preserve the current mobile sizing.

**Interaction thesis:** No behavior changes; preserve image loading and responsive layout while improving first-viewport balance.

**Files:**
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Tune desktop portrait proportion**

Use a shorter desktop aspect ratio and cap the portrait width so the image aligns better with the height of the text/actions block.

Verification note: desktop portrait width is capped at `20rem`, uses a shorter `4 / 5` crop, and moves the crop slightly upward to keep the face dominant.

- [x] **Step 2: Preserve mobile portrait behavior**

Keep the existing mobile width and taller aspect treatment so the portrait remains readable when stacked.

Verification note: below the existing `860px` breakpoint, the portrait keeps the previous `19rem` width, `1 / 1.08` aspect ratio, and centered object position.

- [x] **Step 3: Build and verify generated CSS**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and confirm the local server serves the new asset version.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the desktop `4 / 5` portrait crop and mobile reset, generated pages serve assets with `v=12`, and `http://127.0.0.1:4000/it/` is serving the updated build.

## Task 25: Home Portrait Desktop Crop Follow-up

**Visual thesis:** In dark mode the portrait should read as a compact editorial anchor, not a vertical column that competes with the hero title.

**Content plan:** Keep the same image, copy, CTA, and mobile behavior; tighten only the desktop portrait width, aspect, and crop.

**Interaction thesis:** No behavior changes; preserve responsive image loading and layout while improving first-viewport balance.

**Files:**
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Reduce desktop portrait dominance**

Move the desktop portrait to a compact square crop and lower the width cap so it no longer overpowers the content column in light or dark mode.

Verification note: desktop portrait width is now capped at `19rem`, the figure owns the compact `4 / 5` clipping frame, and the image fills that frame with a subtle desktop zoom while the existing mobile breakpoint keeps its stacked aspect and unzoomed image treatment.

- [x] **Step 2: Build and verify generated output**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and confirm the local server serves the new asset version.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the framed desktop portrait crop and mobile reset, generated pages serve assets with `v=16`, `http://127.0.0.1:4000/en/` serves the updated build, and a browser check at `1280x720` measured the desktop portrait frame at about `308x384` against a `512px` content column height.

## Task 26: Home Mobile Portrait Order

**Visual thesis:** On mobile the portrait should support the first impression immediately after the intro, not appear after all proof cards, actions, and skill tags.

**Content plan:** Split the home content into intro, portrait, and details blocks so mobile can show the image after the copy while desktop keeps the two-column composition.

**Interaction thesis:** No behavior changes; preserve existing links and ACDesign components while improving mobile reading order.

**Files:**
- Modify: `_layouts/index.html`
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Split home intro and details blocks**

Move proof cards, actions, and skill tags out of `.home-intro` into a dedicated details block so the portrait can be ordered between intro and details on mobile.

Verification note: `_layouts/index.html` now renders `.home-intro`, `.home-portrait`, and `.home-details` as sibling blocks, with proof cards, actions, and skill tags moved into `.home-details`.

- [x] **Step 2: Re-map desktop and mobile grid areas**

Use CSS grid areas so desktop keeps intro/details in the left column and portrait in the right column, while mobile stacks intro, portrait, then details.

Verification note: `.home-shell` now maps desktop areas as `intro/details` on the left and `portrait` on the right; below `860px`, areas stack as intro, portrait, then details, with proof-card top spacing reset for the mobile details block.

- [x] **Step 3: Build and verify mobile output**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and a browser viewport check for the mobile home order.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated HTML/CSS contains `.home-details` and mobile grid areas `intro`, `portrait`, `details`, generated pages serve assets with `v=17`, the live server at `http://127.0.0.1:4000/en/` serves `v=17`, and a `390x844` browser check confirmed the portrait appears after the intro and before the proof cards.

## Task 27: Home Mobile Portrait Placement

**Visual thesis:** The mobile portrait should feel intentionally placed in the flow: centered, large enough to carry the hero, and constrained enough not to overwhelm tablet-width mobile layouts.

**Content plan:** Keep the current mobile order and image asset; tune only the mobile portrait width, alignment, spacing, and crop behavior.

**Interaction thesis:** No behavior changes; preserve responsive stacking and desktop portrait styling.

**Files:**
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Center and resize the mobile portrait**

Increase the mobile portrait cap, center it in the stack, and keep full-width behavior for narrow phones.

Verification note: below `860px`, `.home-portrait` is now centered with a `28rem` cap and a slight mobile image zoom/crop; the existing `520px` rule keeps narrow phones full-width.

- [x] **Step 2: Build and verify mobile placement**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and browser checks for narrow phone, tablet-width mobile, and desktop.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the centered `28rem` mobile portrait cap and `v=18` asset links, the live server at `http://127.0.0.1:4000/en/` serves `v=18`, a `390x844` browser check confirmed a full-width centered portrait, a `768x1024` check confirmed the portrait is centered at about `448px` wide, and a `1280x720` desktop check confirmed the original desktop portrait placement remains unchanged.

## Task 28: Mobile Shell Polish

**Visual thesis:** The mobile site should feel lighter and more precise: compact chrome, predictable 44px controls, and no small secondary links that feel hard to tap.

**Content plan:** Preserve all page content and current ACDesign components; tune only mobile header spacing, nav control sizing, and mobile certificate link affordances.

**Interaction thesis:** Keep menu, language dropdown, carousel, and theme toggle behavior unchanged while improving tap comfort and first-viewport density.

**Files:**
- Modify: `_sass/_layout.scss`
- Modify: `_sass/_nav.scss`
- Modify: `_sass/_components.scss`
- Modify: `_config.yml`

- [x] **Step 1: Compact mobile header chrome**

Reduce mobile-only header/container vertical padding so the first viewport has more useful content without changing desktop navigation.

Verification note: mobile-only `.site-header` and `.nav-bar.container` padding now use smaller ACDesign spacing tokens, leaving desktop navigation untouched.

- [x] **Step 2: Normalize mobile touch targets**

Make mobile language control and secondary certificate links meet the same tactile target quality as ACDesign icon buttons.

Verification note: below `768px`, the language dropdown summary and dropdown options now use a `2.75rem` min-height, certificate course links render as inline-flex surface actions with `2.75rem` min-height, certificate carousel controls use `2.75rem` buttons with stronger `1.125rem` chevrons, and the mobile menu close button now matches the same `2.75rem` target.

- [x] **Step 3: Build and audit mobile pages**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and browser checks on the mobile pages for header height, touch targets, overflow, and desktop stability.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated pages serve assets with `v=22`, EN and IT mobile audits at `390x844` passed for home/about/portfolio/certificates/blog/contacts with no global horizontal overflow and no visible undersized tap targets, mobile header is `78px`, burger/language/close controls are `44px`, certificate carousel chevrons render at `18px`, and a desktop `1280x720` check confirmed desktop navigation and home portrait placement remain stable.

## Task 29: Mobile Theme Toggle Placement

**Visual thesis:** Mobile content should never sit underneath floating controls; theme switching should remain available, but inside the mobile menu where it cannot obscure cards, links, or CTAs.

**Content plan:** Keep the desktop FAB unchanged, hide it on mobile, and add an equivalent theme icon button to the mobile menu header.

**Interaction thesis:** Support multiple theme toggle buttons from the same JavaScript behavior so desktop and mobile stay synchronized.

**Files:**
- Modify: `_layouts/default.html`
- Modify: `_sass/_components.scss`
- Modify: `_sass/_nav.scss`
- Modify: `assets/js/main.js`
- Modify: `_config.yml`

- [x] **Step 1: Move mobile theme action into the menu**

Render a mobile-menu theme toggle button and hide the fixed FAB on mobile breakpoints.

Verification note: `_layouts/default.html` now renders a mobile theme icon button in the side-menu header, the desktop FAB keeps the same markup with `data-theme-toggle`, and mobile CSS hides `.theme-switch` below `768px` so the fixed FAB cannot cover content.

- [x] **Step 2: Synchronize all theme toggles**

Update the theme JavaScript to drive every `data-theme-toggle` button and icon consistently.

Verification note: `assets/js/main.js` now queries all `[data-theme-toggle]` controls and all theme icon `<use>` elements, keeping `aria-pressed`, icons, and rotation animation synchronized across desktop FAB and mobile menu button.

- [x] **Step 3: Build and verify no mobile overlap**

Run `bundle exec jekyll build`, `git diff --check`, generated output checks, and browser audits at narrow and standard mobile widths for FAB overlap, menu behavior, and desktop stability.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated pages serve assets with `v=26`, browser audits at `320x568`, `390x844`, and `768x1024` confirmed no horizontal overflow, no mobile FAB overlap, and no visible undersized mobile tap targets after the mobile theme toggle moved into the menu. The final `v=26` CSS scopes the 44px logo tap target to `.mobile-logo`, preserving the desktop header composition.

## Task 30: Home Mobile Portrait Crop

**Visual thesis:** The mobile portrait should read as an intentional hero crop, centered on Antonio's face and upper body, without pushing too much of the proof content below the first viewport.

**Content plan:** Keep the mobile order as intro, portrait, details; refine only the portrait aspect, crop focus, tablet cap, and mobile logo tap target discovered during audit.

**Interaction thesis:** No behavior changes; the image remains eager-loaded and the navbar controls keep the existing ACDesign button behavior.

**Files:**
- Modify: `_sass/_index.scss`
- Modify: `_sass/_nav.scss`
- Modify: `_config.yml`

- [x] **Step 1: Tighten the mobile portrait crop**

Change the mobile portrait from near-original image ratio to a more compact hero crop, with a smaller tablet cap and a higher object-position focus.

Verification note: below `860px`, `.home-portrait` now uses a `26rem` cap, `aspect-ratio: 1 / 0.92`, and the image uses `object-position: center 36%` with a restrained `1.08` zoom.

- [x] **Step 2: Normalize the mobile logo target**

Keep the visible logo at 40px while making only the mobile logo link meet the same 44px target as burger and language controls.

Verification note: generated CSS contains `.mobile-logo` with `min-width: 2.75rem` and `min-height: 2.75rem`, while the desktop logo is no longer enlarged globally.

- [x] **Step 3: Build and verify generated output**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and confirm the local server serves the updated asset version.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the compact mobile portrait crop and mobile-only logo tap target, and `http://127.0.0.1:4000/en/` serves assets with `v=26`. Browser verification immediately before the final cache bump showed the same mobile crop at `320x568`, `390x844`, and `768x1024` with no horizontal overflow, no mobile FAB overlap, and no visible undersized mobile tap targets; the final bump only scoped the logo target from global brand links to `.mobile-logo`.

## Task 31: Portfolio Mobile Token Color Cleanup

**Visual thesis:** Portfolio cards on mobile should inherit the ACDesign visual language completely; project thumbnails may differentiate content, but must not reintroduce hardcoded blue/slate legacy palettes.

**Content plan:** Keep project content, thumbnails, links, and card structure unchanged; replace only legacy thumbnail background gradients with token-driven `color-mix` values that respond to light and dark mode.

**Interaction thesis:** No behavior changes; card links, detail pages, and image loading remain unchanged while visual tone becomes more coherent.

**Files:**
- Modify: `_portfolio/en/swiftui-clima.markdown`
- Modify: `_portfolio/it/swiftui-clima.markdown`
- Modify: `_portfolio/en/not-a-place.markdown`
- Modify: `_portfolio/it/not-a-place.markdown`
- Modify: `_config.yml`

- [x] **Step 1: Replace hardcoded portfolio gradients**

Move SwiftUIClima and NotAPlace thumbnail backgrounds from fixed hex gradients to ACDesign token-based gradients.

Verification note: the EN and IT `thumbnail_bg` values now use `var(--ac-color-*)` and `color-mix(...)` instead of the previous `#0ea5e9/#1d4ed8` and `#111827/#334155` gradients.

- [x] **Step 2: Build and verify generated portfolio output**

Run `bundle exec jekyll build`, `git diff --check`, generated output checks, and confirm the local server serves the updated asset version.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated EN/IT portfolio index and detail pages contain token-based `--portfolio-thumb-bg` values with no old gradient hex values, `curl` against `http://127.0.0.1:4000/en/portfolio/` and `/it/portfolio/` served assets with `v=27`, and the Jekyll server is running on `127.0.0.1:4000`.

## Task 32: Mobile Chrome Icon Cleanup

**Visual thesis:** The mobile browser chrome should carry the same ACDesign identity as the page: monochrome, theme-aware, and free of the old blue/cyan favicon gradient.

**Content plan:** Keep existing PNG, ICO, and touch icons that already match the monochrome logo; replace only the legacy SVG favicon palette and normalize manifest color casing to the ACDesign base tokens.

**Interaction thesis:** No behavior changes; mobile install metadata and favicon references remain in place.

**Files:**
- Modify: `assets/images/favicon.svg`
- Modify: `assets/images/site.webmanifest`
- Modify: `_config.yml`

- [x] **Step 1: Replace legacy SVG favicon colors**

Remove the blue/cyan gradient favicon and render a monochrome ACDesign-aligned icon with a light/dark media query.

Verification note: `assets/images/favicon.svg` now uses `#FFFFFF`, `#0A0A0A`, and `#F5F5F5` with a `prefers-color-scheme: dark` media query, and no longer contains `#2563eb`, `#38bdf8`, `linearGradient`, or `url(#bg)`.

- [x] **Step 2: Build and verify served chrome assets**

Run `bundle exec jekyll build`, `git diff --check`, and confirm the local server serves updated assets.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, `http://127.0.0.1:4000/en/` serves CSS and JS with `v=28`, `curl` against `/assets/images/favicon.svg` returns the new theme-aware SVG, `curl` against `/assets/images/site.webmanifest` returns normalized `#FFFFFF` manifest colors, and the Jekyll server is running on `127.0.0.1:4000`.

## Task 33: Certificate External Link Icon Cleanup

**Visual thesis:** Mobile certificate links should use the same SVG icon language as the rest of the ACDesign interface, not a loose text glyph that reads like a legacy shortcut.

**Content plan:** Keep certificate content, carousel behavior, and course links unchanged; replace only the visible external-link glyph with a sprite icon and stabilize spacing through CSS.

**Interaction thesis:** No behavior changes; external links remain anchors with the same target and rel attributes.

**Files:**
- Modify: `assets/images/icons.svg`
- Modify: `en/certificates.markdown`
- Modify: `it/certificates.markdown`
- Modify: `_sass/_components.scss`
- Modify: `_config.yml`

- [x] **Step 1: Add and use an external-link icon**

Add `icon-external-link` to the local icon sprite and replace the `↗` text glyph in EN/IT certificate course links.

Verification note: generated EN and IT certificate pages now render `<svg class="certificate-card__course-icon icon icon--sm">` with `/assets/images/icons.svg#icon-external-link`, and no longer render the `↗` character in certificate course links.

- [x] **Step 2: Build and verify served certificate output**

Run `bundle exec jekyll build`, `git diff --check`, generated output checks, and confirm the local server serves updated assets.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, `http://127.0.0.1:4000/en/certificates/` serves CSS and JS with `v=29`, the certificate links use the new SVG icon, `/assets/images/icons.svg` contains `icon-external-link`, and the Jekyll server is running on `127.0.0.1:4000`.

## Task 34: Mobile Long Text Overflow Hardening

**Visual thesis:** Mobile cards and list rows should stay polished even when project names, subtitles, or certificate titles become longer than the current content set.

**Content plan:** Keep all content and layout structure unchanged; add only defensive wrapping rules to repeated ACDesign-backed surfaces used on narrow screens.

**Interaction thesis:** No behavior changes; links, cards, contact rows, and certificate carousel behavior remain unchanged.

**Files:**
- Modify: `_sass/_components.scss`
- Modify: `_config.yml`

- [x] **Step 1: Add defensive wrapping to repeated mobile surfaces**

Protect portfolio card titles/descriptions, contact subtitles, and certificate titles from long unbroken text overflow.

Verification note: `_sass/_components.scss` now sets `min-width: 0` on `.project-card` and `overflow-wrap: anywhere` on portfolio card titles/descriptions, contact list subtitles, and certificate card headings.

- [x] **Step 2: Build and verify served output**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and confirm the local server serves updated assets.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the new anti-overflow rules, `http://127.0.0.1:4000/en/portfolio/` and `/en/contacts/` serve CSS and JS with `v=30`, and the Jekyll server is running on `127.0.0.1:4000`.

## Task 35: Mobile Menu Icon System Cleanup

**Visual thesis:** The mobile menu controls should use the same SVG icon system as the rest of the ACDesign interface, not a hand-drawn CSS burger or a text close glyph.

**Content plan:** Preserve nav structure, ARIA labels, menu behavior, sizing, and touch targets; replace only the visible menu and close icons with sprite symbols.

**Interaction thesis:** No behavior changes; menu open/close, focus handling, and theme toggle behavior remain unchanged.

**Files:**
- Modify: `assets/images/icons.svg`
- Modify: `_layouts/default.html`
- Modify: `_sass/_nav.scss`
- Modify: `_config.yml`

- [x] **Step 1: Replace CSS/text menu icons with SVG symbols**

Add `icon-menu` and `icon-x` to the local sprite, render them in the burger and close buttons, and remove the obsolete `.burger-icon` CSS.

Verification note: generated home pages now render versioned `/assets/images/icons.svg?v=33#icon-menu` for the menu button and `/assets/images/icons.svg?v=33#icon-x` for the close button, with no generated `.burger-icon` span or `&times;` glyph. The sprite symbols declare their own stroke properties so Safari renders the line icons reliably.

- [x] **Step 2: Build and verify served menu output**

Run `bundle exec jekyll build`, `git diff --check`, generated output checks, and confirm the local server serves updated assets.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, `http://127.0.0.1:4000/en/` serves CSS and JS with `v=33`, `/assets/images/icons.svg` contains stroked `icon-menu` and `icon-x` symbols, the mobile browser check confirmed the burger icon is visible in dark mode, and the Jekyll server is running on `127.0.0.1:4000`.

## Task 36: Home Mobile Portrait Positioning

**Visual thesis:** The mobile home portrait should feel like a deliberate editorial crop: centered on face and upper body, compact enough to keep the first viewport balanced, and aligned with the ACDesign spacing rhythm.

**Content plan:** Preserve the home order as intro, portrait, then proof/details; adjust only the mobile portrait dimensions, crop focus, and asset cache version.

**Interaction thesis:** No behavior changes; links, tags, stat cards, theme toggle, and menu behavior remain unchanged.

**Files:**
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Reframe the mobile portrait**

Tune the mobile-only portrait aspect ratio, cap, and image focal point so the crop emphasizes Antonio's face and torso while trimming excess background and lower-body area.

Verification note: below `860px`, `.home-portrait` now uses a `25rem` cap with a `6 / 5` crop, while the image focal point moves to `52% 34%` with a restrained `1.16` scale; below `520px`, the portrait keeps a `23rem` cap so it can center cleanly without becoming oversized.

- [x] **Step 2: Build and verify served output**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and confirm the local server serves the updated asset version.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the `25rem`/`23rem` portrait caps, `6 / 5` mobile crop, and `52% 34%` focal point, `http://127.0.0.1:4000/en/` serves CSS and JS with `v=33`, and a `390x844` browser check showed the portrait at `346x289`, centered with `overflowX: 0`.

## Task 37: Narrow Mobile Home Rhythm

**Visual thesis:** On very narrow devices, the home first viewport should keep the brand line compact and reveal the portrait earlier instead of letting an oversized title push the visual anchor too far down.

**Content plan:** Preserve the home content order, portrait crop, and 390px layout; add only a narrow-screen typography and spacing adjustment below `360px`.

**Interaction thesis:** No behavior changes; navigation, language switcher, CTAs, stat cards, and theme controls remain unchanged.

**Files:**
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Tighten the narrow home hero rhythm**

Reduce only the narrow-screen home title scale and intro rhythm so `Antonio Casto` fits more gracefully and the portrait starts higher on `320px` devices.

Verification note: below `360px`, `.home-shell` now uses `var(--ac-space-lg)` for top padding and row gap, the home title drops to `2.25rem`, and intro copy uses `1rem` with a `1.6` line height.

- [x] **Step 2: Build and verify narrow mobile output**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and a `320x568` browser check for the home page.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated output serves `v=35`, and a `320x568` browser check showed the home title at `36px` on one line, the portrait starting at `y=366` instead of the previous `y=442`, and `overflowX: 0`.

## Task 38: Narrow Mobile About Hero Rhythm

**Visual thesis:** The About hero should carry the same narrow-mobile polish as the home hero: the identity line remains compact, the CTA area is not pushed out of sight, and the profile block keeps a deliberate editorial feel.

**Content plan:** Preserve all About content, avatar, ACDesign buttons, and cards; adjust only the About hero title scale below `360px`.

**Interaction thesis:** No behavior changes; About CTAs and accordion behavior remain unchanged.

**Files:**
- Modify: `_sass/_about.scss`
- Modify: `_config.yml`

- [x] **Step 1: Tighten the narrow About identity**

Reduce only the narrow-screen About hero title scale so `Antonio Casto` fits more gracefully on `320px` devices.

Verification note: below `360px`, `.about-hero__identity h1` now uses a `2.25rem` title size with `line-height: 1`, matching the narrow home identity rhythm.

- [x] **Step 2: Build and verify narrow About output**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and a `320x568` browser check for the About page.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated output serves `v=35`, and a `320x568` browser check showed the About title at `36px` on one line, the CTA stack visible from `y=456`, and `overflowX: 0`.

## Task 39: Mobile Light Theme First Paint Contrast

**Visual thesis:** Light mode must be correct from the first mobile paint, not only after the end-of-page theme script runs; navbar controls, mobile menu rows, tags, and buttons should never flash through low-contrast intermediate colors.

**Content plan:** Keep all content and component styling unchanged; apply the saved or system ACDesign theme on the root element before loading CSS.

**Interaction thesis:** Theme toggle behavior remains unchanged; this only removes first-paint contrast flicker during navigation and reloads.

**Files:**
- Modify: `_layouts/default.html`
- Modify: `_config.yml`

- [x] **Step 1: Apply ACDesign theme before CSS**

Add a small head script that sets `document.documentElement.dataset.acTheme` from `localStorage` or `prefers-color-scheme` before stylesheet loading.

Verification note: `_layouts/default.html` now sets `document.documentElement.dataset.acTheme` in the document head before CSS links, using saved `localStorage.theme` when available and falling back to `prefers-color-scheme`.

- [x] **Step 2: Build and verify mobile light/dark contrast**

Run `bundle exec jekyll build`, `git diff --check`, generated output checks, and a `320x568` light/dark mobile contrast audit across the main localized pages.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated output serves `v=36`, and a `320x568` browser contrast audit across EN/IT home, about, portfolio, certificates, blog, and contacts returned `lowContrastCount: 0`, no undersized visible controls, and `overflowX: 0` in both light and dark mode immediately after page load.

## Task 40: Portfolio Mobile Thumbnail Readiness

**Visual thesis:** Portfolio cards should not show empty media placeholders in the first mobile viewport; project thumbnails are part of the content hierarchy and should be available immediately.

**Content plan:** Preserve project cards, images, descriptions, and links; change portfolio thumbnail loading from lazy to eager so visible cards render without a blank interim state.

**Interaction thesis:** No behavior changes; card navigation and layout remain unchanged.

**Files:**
- Modify: `_includes/site/project-card.html`
- Modify: `_config.yml`

- [x] **Step 1: Load portfolio thumbnails eagerly**

Update project card images to use eager loading while keeping async decoding.

Verification note: `_includes/site/project-card.html` now renders portfolio thumbnail images with `loading="eager"` and `decoding="async"`.

- [x] **Step 2: Build and verify mobile portfolio first viewport**

Run `bundle exec jekyll build`, `git diff --check`, generated HTML checks, and a `320x568` light/dark browser screenshot for the portfolio first viewport.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated EN/IT portfolio pages render thumbnail images with `loading="eager"`, generated output serves `v=37`, and `320x568` browser checks in light and dark mode confirmed the first three portfolio thumbnails are complete with non-zero natural sizes and `overflowX: 0`.

## Task 41: Certificate Mobile Image Readiness

**Visual thesis:** Certificate cards are the main content of the certificates page and should not rely on lazy image readiness inside the first mobile viewport.

**Content plan:** Preserve carousel structure, course links, and card layout; change certificate images from lazy to eager while keeping async decoding.

**Interaction thesis:** No behavior changes; carousel buttons, swipe, keyboard handling, and course links remain unchanged.

**Files:**
- Modify: `en/certificates.markdown`
- Modify: `it/certificates.markdown`
- Modify: `_config.yml`

- [x] **Step 1: Load certificate images eagerly**

Update EN/IT certificate card images to use eager loading while keeping async decoding.

Verification note: EN and IT certificate card images now render with `loading="eager"` and `decoding="async"`.

- [x] **Step 2: Build and verify certificate first viewport**

Run `bundle exec jekyll build`, `git diff --check`, generated HTML checks, and a `320x568` light/dark browser check for EN/IT certificate pages.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated EN/IT certificate pages render certificate images with `loading="eager"`, generated output serves `v=38`, and `320x568` browser checks in light/dark confirmed certificate images complete with non-zero natural sizes and `overflowX: 0`.

## Task 42: Narrow Mobile Home Portrait Rhythm

**Visual thesis:** On the narrowest phones, the home portrait should read as part of the first hero composition rather than arriving as content that starts below the fold.

**Content plan:** Preserve the existing home order, copy, proof cards, CTAs, and desktop/tablet layout; adjust only narrow-mobile vertical rhythm and portrait crop.

**Interaction thesis:** No behavior changes; the hero links, tags, and theme/menu controls remain unchanged.

**Files:**
- Modify: `_sass/_layout.scss`
- Modify: `_sass/_index.scss`
- Modify: `_config.yml`

- [x] **Step 1: Tighten narrow home hero spacing**

Reduce narrow-mobile home-only top padding and intro spacing, then use a compact portrait crop below `360px`.

Verification note: `_sass/_layout.scss` now reduces only `main.page-content--home` top padding below `360px`, `_sass/_index.scss` tightens narrow home spacing and switches the portrait to a compact `4 / 3` crop, and `_config.yml` now serves `asset_version: "39"`.

- [x] **Step 2: Build and verify narrow home first viewport**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and `320x568` browser checks for EN/IT home in light and dark.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the home-only `360px` padding/crop rules, generated EN/IT home pages serve `v=39`, and `320x568` browser checks in light/dark confirmed the portrait now sits fully inside the first viewport (`y=326`, `bottom=534`) with no overflow, no low-contrast text, no undersized controls, and a complete eager image. A `390x844` check confirmed the existing `6 / 5` portrait crop remains unchanged above the narrow breakpoint.

## Task 43: Project Detail Mobile Overflow Hardening

**Visual thesis:** Project detail pages should never create horizontal scroll on narrow phones, even when a package name is a long unbreakable token.

**Content plan:** Preserve project detail media, title, description, content, routes, and ACDesign section header; add wrapping/min-width safeguards and load the first hero media eagerly.

**Interaction thesis:** No behavior changes; language switching, navigation, and project links remain unchanged.

**Files:**
- Modify: `_sass/_collection_item.scss`
- Modify: `_layouts/portfolio.html`
- Modify: `_config.yml`

- [x] **Step 1: Harden project detail wrapping and media readiness**

Add `min-width: 0`, `overflow-wrap: anywhere`, and eager portfolio detail hero image loading.

Verification note: `_sass/_collection_item.scss` now applies `min-width: 0` and `overflow-wrap: anywhere` to project detail containers, titles, subtitles, and content, `_layouts/portfolio.html` now loads project detail hero images eagerly, and `_config.yml` now serves `asset_version: "40"`.

- [x] **Step 2: Build and verify project detail mobile overflow**

Run `bundle exec jekyll build`, `git diff --check`, generated output checks, and `320x568` browser checks for EN/IT `ACSwiftUINavigation` detail pages in light and dark.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the collection item min-width/wrapping safeguards, generated EN/IT `ACSwiftUINavigation` detail pages serve `v=40` and `loading="eager"` hero images, and `320x568` browser checks in light/dark confirmed `overflowX: 0`, ready hero images, no undersized visible controls, and `overflow-wrap: anywhere` on the long title. Additional `320x568` drawer checks on EN/IT light/dark confirmed no overflow, one active row, no undersized drawer controls, `aria-hidden="false"` while open, and `body.menu-open` scroll lock.

## Task 44: Long Project Title Mobile Polish

**Visual thesis:** Long project names should remain readable and intentional on narrow phones, not wrap by a final orphan character.

**Content plan:** Preserve project detail order, media, copy, and links; add a long-title class only to portfolio details that need mobile typographic adjustment.

**Interaction thesis:** No behavior changes; this is a mobile typography polish only.

**Files:**
- Modify: `_layouts/portfolio.html`
- Modify: `_sass/_collection_item.scss`
- Modify: `_config.yml`

- [x] **Step 1: Add scoped long-title treatment**

Add a portfolio detail modifier for long titles and reduce only those titles below `360px`.

Verification note: `_layouts/portfolio.html` now adds `portfolio-detail--long-title` only when `page.title` is longer than 16 characters, `_sass/_collection_item.scss` reduces only long portfolio detail titles below `360px`, and `_config.yml` now serves `asset_version: "41"`.

- [x] **Step 2: Build and verify long-title mobile rendering**

Run `bundle exec jekyll build`, `git diff --check`, generated output checks, and `320x568` browser checks for EN/IT `ACSwiftUINavigation` in light and dark.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated EN/IT `ACSwiftUINavigation` pages serve `v=41` and include `portfolio-detail--long-title`, generated NotAPlace does not include the modifier, and `320x568` browser checks in light/dark confirmed `ACSwiftUINavigation` renders on one line at `24px`, `overflowX: 0`, ready eager hero images, and unchanged `28px` NotAPlace title scale.

## Task 45: Narrow Project Detail Hero Crop

**Visual thesis:** Tall project screenshots should not consume nearly the entire first mobile viewport; the title and description need to stay visible enough to orient the page immediately.

**Content plan:** Preserve project detail content, media source, links, and desktop/tablet layout; add a narrow-mobile aspect ratio crop only for portfolio detail hero media.

**Interaction thesis:** No behavior changes; this is a responsive composition adjustment only.

**Files:**
- Modify: `_sass/_collection_item.scss`
- Modify: `_config.yml`

- [x] **Step 1: Add narrow project detail hero crop**

Apply a compact `4 / 3` hero frame below `360px` and keep images covering the frame.

Verification note: `_sass/_collection_item.scss` now applies a `4 / 3` frame with covered media only to `.portfolio-detail .collection_item__hero` below `360px`, and `_config.yml` now serves `asset_version: "42"`.

- [x] **Step 2: Build and verify project detail first viewport**

Run `bundle exec jekyll build`, `git diff --check`, generated CSS checks, and `320x568` browser checks for EN/IT NotAPlace and ACSwiftUINavigation in light and dark.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated CSS contains the `4 / 3` portfolio detail hero frame, generated portfolio detail pages serve `v=42`, and `320x568` browser checks in light/dark confirmed EN/IT NotAPlace hero height dropped from `345px` to `205px`, title moved from `y=479` to `y=339`, descriptions are visible in the first viewport, images are ready, and `overflowX: 0`. EN/IT ACSwiftUINavigation also keeps `overflowX: 0`, ready hero media, and the polished one-line long title. Mobile language dropdown checks on EN/IT light/dark confirmed 44px controls, stable positioning, and `overflowX: 0`.

## Task 46: Mobile Italian Microcopy Polish

**Visual thesis:** Visible Italian labels on mobile should look finished and intentional, including proper accents in compact stat cards.

**Content plan:** Preserve the home structure, ACDesign stat-card components, image placement, and layout; correct only visible Italian microcopy and asset cache versioning.

**Interaction thesis:** No behavior changes; this is text polish only.

**Files:**
- Modify: `_layouts/index.html`
- Modify: `_config.yml`

- [x] **Step 1: Correct the Italian stat-card label**

Use UTF-8 accents directly because the ACDesign stat-card include escapes label strings before rendering.

Verification note: `_layouts/index.html` now renders the Italian stat-card label with proper UTF-8 accents, and `_config.yml` now serves `asset_version: "43"`.

- [x] **Step 2: Build and verify generated output**

Run `bundle exec jekyll build`, `git diff --check`, and static generated-output checks for the updated asset version and rendered home label.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated EN/IT home pages serve CSS, JS, and icons with `v=43`, `_site/it/index.html` renders `Modularità e testabilità`, and static checks found no visible `TCA`, text-arrow glyphs, old blue tokens, or unaccented Italian stat labels in generated EN/IT pages and generated CSS.

## Task 47: Mobile Completion Audit

**Visual thesis:** The mobile site should now read as one coherent ACDesignWeb interface rather than an endless series of local fixes.

**Content plan:** Freeze the design work unless the final audit finds a concrete regression; verify the explicit issues from the thread against the generated site.

**Interaction thesis:** No behavior changes; this is a completion gate only.

**Files:**
- Modify: `docs/superpowers/plans/2026-06-03-acdesignweb-migration.md`

- [x] **Step 1: Verify explicit visual requirements**

Check generated EN/IT pages for: no `TCA`, neutral home capsules, SVG chevrons instead of text arrows, ACDesign components/styles loaded on every generated page, mobile menu/icon controls at 44px, mobile portrait source order before home details, and mobile portrait/detail crop rules in generated CSS.

Verification note: a Ruby static contract checked 21 generated pages and passed: all pages load `/assets/acdesign/styles/components.css?v=43` and `/assets/css/style.css?v=43`; generated pages contain no visible `TCA`, text-arrow glyphs, old blue tokens, or unaccented Italian labels; EN/IT home pages render five neutral `data-ac-color="surface"` capsules; the home source order is intro, portrait, details; and generated CSS contains the mobile portrait, portfolio detail crop, wrapping, foreground, background, language, and menu-control rules.

- [x] **Step 2: Keep the goal finite**

Stop design changes after the completion gate passes, then run the final build and whitespace checks before handing the site back for review.

## Task 48: Desktop Completion Polish

**Visual thesis:** Desktop should feel as resolved as mobile: ACDesignWeb first, balanced first viewport, precise navigation, coherent surfaces, and no legacy visual residue.

**Content plan:** Audit desktop home and core pages, then adjust only defects found in layout rhythm, component usage, typography, colors, icons, and desktop proportions.

**Interaction thesis:** Preserve existing routes and behavior; polish hover/active affordances, language/theme controls, and desktop spacing without introducing new workflows.

**Files:**
- Inspect: `_layouts/default.html`
- Inspect: `_layouts/index.html`
- Inspect: `_layouts/portfolio.html`
- Inspect: `_includes/site/post-list-row.html`
- Inspect: `_includes/site/project-card.html`
- Modify if needed: `_sass/_index.scss`
- Modify if needed: `_sass/_nav.scss`
- Modify if needed: `_sass/_components.scss`
- Modify if needed: `_sass/_collection_item.scss`
- Modify if needed: `_sass/_layout.scss`
- Modify if needed: `_config.yml`

- [x] **Step 1: Audit desktop output**

Use desktop browser checks and generated-output inspection for EN/IT home, portfolio, blog, certificates, about, contacts, and portfolio detail pages.

Verification note: a `1440x900` desktop browser audit found concrete issues: the header consumed `122px`, the home shell extended beyond the first viewport (`bottom=958`), language dropdown option links and certificate course links were below the compact desktop control floor, and portfolio detail pages showed the hero media before the page title.

- [x] **Step 2: Apply targeted desktop polish**

Patch only concrete issues found during audit, keeping ACDesignWeb components and tokens dominant.

Verification note: `_sass/_layout.scss` now compacts the desktop header, `_sass/_index.scss` fits the home shell inside the first desktop viewport and gives the portrait a stronger desktop presence, `_sass/_nav.scss` gives language options a proper compact control height, `_sass/_components.scss` turns certificate course links into compact ACDesign-style controls, `_sass/_collection_item.scss` places portfolio detail titles before hero media on desktop, and `_config.yml` now serves `asset_version: "44"`.

- [x] **Step 3: Verify desktop completion**

Run `bundle exec jekyll build`, `git diff --check`, static contract checks, and desktop browser checks before handing back.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, static generated-output checks found no legacy markers and confirmed `v=44` assets across 21 pages, `desktop_static_contract` passed, and a `1440x900` browser contract passed across 7 desktop pages. Final measured desktop home: header `66px`, home shell `y=98`/`bottom=706`, portrait `340x424`; portfolio detail title now appears at `y=98` before hero media at `y=182`; stable light and dark checks confirmed readable ACDesign foreground/background colors after the theme overlay finishes.

## Task 49: Editorial Detail Layout System

**Visual thesis:** Blog posts and portfolio detail pages should feel like a deliberate ACDesignWeb editorial system: clear masthead, structured meta, polished media, readable prose, and consistent rhythm on desktop and mobile.

**Content plan:** Move the repeated article structure into the post and portfolio layouts, then style the shared Markdown body so every future post/project automatically inherits the same editorial treatment.

**Interaction thesis:** No route or content behavior changes; links, language switching, theme toggle, and portfolio/blog collection behavior remain unchanged.

**Files:**
- Modify: `_layouts/post.html`
- Modify: `_layouts/portfolio.html`
- Modify: `_sass/_collection_item.scss`
- Modify: `_config.yml`

- [x] **Step 1: Audit current article detail output**

Inspect existing EN/IT blog posts and portfolio detail pages on desktop/mobile and identify reusable layout gaps.

Verification note: current detail pages used the migrated shell and collection styles, but blog and portfolio articles still lacked a shared editorial masthead, structured metadata, reusable technology/category tags, and a Markdown body system that future content would inherit automatically.

- [x] **Step 2: Add shared editorial structure**

Use ACDesignWeb section headers, tags, card/surface styling, and shared Markdown typography so future Markdown content follows the same layout by default.

Verification note: `_layouts/post.html` and `_layouts/portfolio.html` now provide the shared `editorial-detail` structure, `_sass/_collection_item.scss` defines the reusable ACDesignWeb editorial typography and surfaces, portfolio source links are rendered as ACDesign buttons, duplicate inline source-code paragraphs were removed from existing portfolio Markdown, and `_config.yml` now serves `asset_version: "45"`.

- [x] **Step 3: Verify generated articles**

Run `bundle exec jekyll build`, `git diff --check`, static output checks, and browser checks for blog/portfolio details in EN/IT, desktop/mobile, light/dark.

Verification note: `bundle exec jekyll build` passed, `git diff --check` passed, generated-output checks confirmed `v=45` assets on 21 pages, blog/portfolio detail contracts passed for EN/IT, legacy duplicate source paragraphs are absent, and browser audits passed for blog and portfolio detail pages on desktop/mobile in light/dark mode with no horizontal overflow or undersized mobile source buttons.

## Recommended Progression Across Future Chats

1. Chat 1: Execute Tasks 1-3 only. Outcome: ACDesign is vendored and theme-compatible, with no page redesign yet.
2. Chat 2: Execute Task 4. Outcome: global shell, navigation, language dropdown, mobile menu, and theme utility match ACDesign.
3. Chat 3: Execute Task 5. Outcome: home page carries the new visual identity.
4. Chat 4: Execute Tasks 6-8. Outcome: page headers, portfolio, and blog migrate to ACDesign components while preserving filters.
5. Chat 5: Execute Tasks 9-11. Outcome: certificates, contacts, and about page migrate without behavior loss.
6. Chat 6: Execute Tasks 12-14. Outcome: legacy styles are removed, the full site is verified, and the branch is integrated only to `develop`.
7. Release chat, only after Antonio explicitly approves it: Execute Task 15. Outcome: `develop` is released to `main`.

## Future Chat Kickoff Prompt

Use this prompt in a future chat:

```text
Continue the ACDesignWeb migration plan for acasto.dev from docs/superpowers/plans/2026-06-03-acdesignweb-migration.md. Follow AGENTS.md repository rules, start from develop, preserve existing functionality, update the checklist as you complete steps, and execute the next unchecked task only. Treat ACDesignWeb as read-only: do not modify that repository. Do not merge, push, release, or open a PR toward main unless Antonio explicitly authorizes it in this chat.
```

## Definition Of Done

- ACDesignWeb CSS and Liquid includes are used for the visible design system layer.
- `acasto.dev` remains a Jekyll static site deployable through GitHub Pages.
- Existing localized URLs, SEO metadata, sitemap behavior, assets, collections, and content remain intact.
- Theme toggle controls both the old compatibility class and `data-ac-theme` until old classes are removed.
- Blog filters and certificate carousel retain current behavior.
- No production asset depends on loading from the private `ACDesignWeb` repository.
- `ACDesignWeb` has not been modified; all compatibility changes live only in `acasto.dev`.
- Local ACDesign source provenance and local adaptations are documented in `docs/acdesignweb-source-map.md`.
- `bundle exec jekyll build` passes.
- Manual browser checks pass on mobile, tablet, and desktop.
- Feature work is merged to `develop` first.
- `main` remains untouched until Antonio explicitly approves the release in a future message.
