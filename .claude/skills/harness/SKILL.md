---
description: Launch and verify the Experiment React app (Vite dev server + Playwright screenshots + CI checks)
---

# Experiment — Project Harness

Use this skill to set up, run, and verify the full project in one pass.

## 1. Install dependencies

```bash
npm install
```

## 2. Start the dev server

```bash
BROWSER=none npx vite --port 3000 2>&1 &
```

Wait until the port is accepting connections before proceeding:

```bash
timeout 30 bash -c 'until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done' && echo "ready"
```

If the port is already in use, kill the old process first:

```bash
pkill -f vite 2>/dev/null; sleep 1
```

## 3. Type-check

```bash
npm run type-check
```

Exit non-zero → fix TypeScript errors before continuing.
Common cause: missing `src/vite-env.d.ts` with `/// <reference types="vite/client" />`.

## 4. Lint

```bash
npm run lint
```

Requires `.eslintrc.cjs` in the repo root. Exit non-zero → fix lint errors.

## 5. Screenshot all pages with Playwright

Playwright is installed globally at `/opt/node22/lib/node_modules/playwright`.
Use `require('/opt/node22/lib/node_modules/playwright')` — do **not** `npm install playwright`.

Capture page screenshots like this:

```js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const OUT = 'docs/screenshots';
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  // Home
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Design System Starter');
  await page.screenshot({ path: `${OUT}/home-full.png`, fullPage: true });

  // Analytics
  await page.click('button:has-text("Analytics")');
  await page.waitForSelector('text=Total Requests');
  await page.screenshot({ path: `${OUT}/analytics-full.png`, fullPage: true });

  // Logs
  await page.click('button:has-text("Logs")');
  await page.waitForSelector('text=Log Analyzer');
  await page.screenshot({ path: `${OUT}/logs-full.png`, fullPage: true });

  await browser.close();
})();
```

Save screenshots to `docs/screenshots/`. Commit them when components change.

## 6. Production build

```bash
VITE_BASE_PATH=/Experiment/ npm run build
```

Outputs to `dist/`. Verify no TypeScript or Vite errors.

## Project structure quick reference

```
src/
├── components/
│   ├── ui/        Button, Card, Badge, MetricCard, Sparkline,
│   │              LineChart, BarChart, Tabs, SearchInput, Select,
│   │              LogLevelBadge, LogTable, EmptyState
│   └── layout/    AppLayout, Header
├── data/          mockAnalytics.ts, mockLogs.ts
├── pages/         Home, Analytics, Logs
└── styles/        globals.css (CSS custom-property tokens)
```

## Adding a component

1. `src/components/ui/MyComponent.tsx` + `MyComponent.module.css`
2. Use CSS custom properties from `src/styles/globals.css` — no raw values
3. Export from `src/components/ui/index.ts`
4. Add a demo card in `src/pages/Home.tsx`
5. Run the harness to confirm type-check and screenshots pass

## Gotchas

| Problem | Fix |
|---------|-----|
| `Cannot find module '*.module.css'` | Ensure `src/vite-env.d.ts` has `/// <reference types="vite/client" />` |
| Port 3000 in use | `pkill -f vite` then restart |
| Playwright `chromium` not found | Use `require('/opt/node22/lib/node_modules/playwright')` not a local install |
| CSS class selectors fail in Playwright | CSS Modules scope class names — use `text=…`, `role=…`, or `aria-*` selectors |
| `noUnusedLocals` errors | Removed from `tsconfig.json` — linter manages import hygiene |
