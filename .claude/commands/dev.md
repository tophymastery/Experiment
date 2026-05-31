Run the local development server and open the app in the browser.

## Steps

1. Check that dependencies are installed — if `node_modules/` is missing or
   `package.json` has changed since the last install, run:
   ```
   npm install
   ```

2. Start the Vite dev server:
   ```
   npm run dev
   ```
   The server starts at **http://localhost:3000** and hot-reloads on file saves.

3. Confirm the terminal shows `Local: http://localhost:3000` before reporting
   the app is running.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 3000 in use | Kill the occupying process or set `VITE_PORT=3001 npm run dev` |
| Type errors on startup | Run `npm run type-check` and fix reported issues |
| Blank white screen | Open browser DevTools console; look for import/module errors |
| CSS tokens missing | Verify `src/styles/globals.css` is imported in `src/main.tsx` |

## Notes

- The `@/` path alias resolves to `src/` (configured in `vite.config.ts` and
  `tsconfig.json`).
- CSS Modules are zero-config with Vite — any `*.module.css` file is
  automatically scoped.
- To build for production run `npm run build`; preview the build with
  `npm run preview`.
