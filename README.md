# Sid Portfolio

Cyber-themed portfolio built with Vite, React, TypeScript, shadcn/ui, and Tailwind CSS.

## Stack

- Vite 5
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Vitest + Testing Library

## Local development

```sh
npm install
npm run dev
```

## Build for deployment

```sh
npm run build
npm run preview
```

The Vite config is set with `base: "/Sid_Portfolio/"` for GitHub Pages-style deployments. Routing uses `HashRouter`, so the `/vault` page works on static hosting without additional rewrite rules.

## GitHub Pages setup

If GitHub Pages shows an error mentioning `src/main.tsx`, GitHub is serving the raw source files instead of the built Vite output. `src/main.tsx` is TypeScript/TSX entry code for development, not a browser-ready file.

This repo uses **Vite**, not Next.js. The Vite equivalent of:

- `basePath: '/Sid_Portfolio'`
- `assetPrefix: '/Sid_Portfolio/'`

is:

```ts
export default defineConfig({
  base: '/Sid_Portfolio/',
})
```

That configuration already exists in `vite.config.ts`, and the GitHub Actions workflow deploys the built `dist/` folder.

Use this repository's GitHub Actions workflow to deploy:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to the `main` branch.
5. Open the **Actions** tab and confirm the `Deploy Vite site to GitHub Pages` workflow passes.

Do **not** use the legacy **Deploy from a branch** mode for this repo, because that serves `index.html` directly and the browser will try to load `/src/main.tsx`.

## Windows quick start

If you're using Codex with GitHub on Windows for the first time, these are the commands you usually need in PowerShell:

```powershell
npm install
npm run dev
npm run build
git status
git add .
git commit -m "Update portfolio site"
git push origin main
```

After pushing, wait for the GitHub Actions deployment to finish before checking your GitHub Pages URL.

## Certificates workflow

Published certificate files live in `public/certificates/`.

To add a new certificate:

1. Copy the file into `public/certificates/`.
2. Add or update the matching entry in `src/data/certificates.ts`.
3. Set `available: true` and provide the expected file name.
4. Run `npm run build` to verify the deployment bundle.

## Notes

- Platform-specific generator metadata and dependencies were removed.
- The uploaded zip has been turned into the main app source in this repository.
