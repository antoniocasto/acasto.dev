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
- The copied Jekyll adapter includes are adapted from Liquid `{&#37; render &#37;}` to Jekyll 3.10-compatible `{&#37; include &#37;}` because this site uses Liquid 4.0.4.
- Site-specific layout and content CSS belongs in `_sass/`.
- Production must not load files from the private `ACDesignWeb` repository.
