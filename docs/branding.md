# acasto.dev branding

The site uses the **Orbital A / 02** logo from the iCloud package
`Documenti/Branding/acasto/acasto.dev - Logo 2026-10-12/02 - Logo rifinito e varianti`.
The original exports and editable VectorCraft masters remain in iCloud.

| Surface | Asset | Variant |
| --- | --- | --- |
| Desktop and mobile navigation | `assets/images/brand/symbol-{light,dark}.svg` | Navy or white body with the original turquoise dot |
| Footer | `assets/images/brand/wordmark-{light,dark}.svg` | Complete logo with outlined lettering |
| SVG favicon | `assets/images/favicon.svg` | Monochrome navy or white, following the browser's system theme |
| Raster favicon and ICO | `assets/images/favicon-96x96.png`, `favicon.ico` | Monochrome navy on white; ICO preserves the supplied 16, 24, 32, 48 and 64 px exports |
| Apple touch and web app icons | `assets/images/apple-touch-icon.png`, `web-app-manifest-*.png` | Two-color symbol on opaque white, inset for the circular maskable safe area |
| Social previews | `assets/images/acasto-social.png` | Complete white/turquoise logo on navy, 1200 × 630 px |
| Structured data / existing public PNG URL | `assets/images/acasto-logo.png` | Updated two-color symbol, 512 × 512 px |

`_includes/brand-logo.html` shares the logo markup across both navigation layouts
and the footer. CSS selects the supplied theme variant from `data-ac-theme`, with
a system-theme fallback when JavaScript is unavailable. No color inversion is used.
`_includes/site-icons.html` supplies icons to both the standard layout and the
language redirect page. Root-level legacy icon URLs contain the updated artwork.

The default social image is configured in `_config.yml`; individual pages can
override it through their own `image` front matter. Increment `asset_version`
when replacing brand assets, and update the manifest's icon version queries too.
