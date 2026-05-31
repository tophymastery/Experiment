# Experiment

A React + Vite + TypeScript project with a component-driven design system.

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 |
| Bundler | Vite 5 |
| Language | TypeScript 5 (strict) |
| Styling | CSS Modules + design tokens |
| Path alias | `@/` → `src/` |

## Project Structure

```
src/
├── components/
│   ├── ui/           # Design system primitives (Button, Card, Badge …)
│   └── layout/       # App-level shells (AppLayout, Header)
├── pages/            # Route-level page components
├── styles/
│   └── globals.css   # Design tokens (CSS custom properties) + reset
├── App.tsx
└── main.tsx
```

### Component rules

- **UI components** live in `src/components/ui/`. Each component gets its own
  `ComponentName.tsx` + `ComponentName.module.css` pair, then re-exported from
  `src/components/ui/index.ts`.
- **Layout components** live in `src/components/layout/` and follow the same
  pairing convention.
- **Pages** live in `src/pages/`. They compose UI and layout components; they
  do not contain reusable logic.
- All design values (colors, spacing, radii, shadows, transitions) come from
  CSS custom properties defined in `src/styles/globals.css`. Do **not** hard-code
  raw values in component CSS modules.

## Dev Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server on http://localhost:3000 |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run type-check` | TypeScript check without emitting |
| `npm run lint` | ESLint across `src/` |

## Adding a New UI Component

1. Create `src/components/ui/MyComponent.tsx` and `MyComponent.module.css`.
2. Use design tokens (CSS custom properties) for all values.
3. Export from `src/components/ui/index.ts`.
4. Render it in `src/pages/Home.tsx` under the Components section to keep the
   living showcase up to date.

## Code Style

- TypeScript strict mode is on — no `any`, no implicit `undefined`.
- Prefer CSS Modules over inline styles.
- Keep components small and single-responsibility.
- No comments unless the why is non-obvious.
