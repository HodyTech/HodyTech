# hody.tech

Personal tech-identity landing page for **Hoda Helmoinzadeh** — Tech · Development · Coding · GitHub · Gaming.

Live at: <https://hody.tech>
Personal site: <https://hodahelmoinzadeh.com>

## Stack

Static HTML / CSS / JS. No build step, no dependencies. Three source files:

- `index.html` — page markup
- `style.css` — dark/neon theme
- `script.js` — small enhancements (parallax glow, broken-image guard)

Other files: `favicon.svg`, `CNAME` (custom domain), `assets/` (drop logo here).

## Logo

Drop your logo file at `assets/hodytech.png`. It's already wired up in `index.html`. No code change needed.

## Local preview

Just open `index.html` in a browser:

```sh
xdg-open index.html   # Linux
open index.html       # macOS
start index.html      # Windows
```

Or serve it locally:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment (GitHub Pages)

1. Push to `main` (or set Pages source to whichever branch you prefer in **Settings → Pages**).
2. The `CNAME` file makes GitHub Pages serve on `hody.tech`.
3. Configure DNS at your registrar:

   **Apex `hody.tech`** — A records:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **`www.hody.tech`** — CNAME → `<your-github-username>.github.io`

4. In GitHub repo **Settings → Pages**, enable "Enforce HTTPS" once the cert provisions.

## License

© 2026 Hoda Helmoinzadeh. All rights reserved.
