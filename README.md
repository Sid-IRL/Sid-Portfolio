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
