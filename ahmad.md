# Shopify: “Branch is not a valid theme”

The error **“branch is not a valid theme”** (or “Branch isn’t a valid theme”) means the selected branch does **not** match Shopify’s required theme folder structure at the **root** of the repository.

Shopify only accepts branches that look like a ready-to-use (buildless) theme. Anything else is rejected.

## Required folder structure (must be at the root)

```text
.
├── assets/
├── config/
├── layout/
│   └── theme.liquid     ← required
├── locales/
├── sections/
├── snippets/
└── templates/
```

(Optional: `blocks/` on newer themes.)

Folders that don’t match this structure are ignored. If the theme files are nested inside another folder, or the structure is incomplete, the branch is considered invalid.

## Common causes

1. **Theme files are inside a subfolder** (e.g. `/theme/`, `/src/`, `/dist/`, or a monorepo path).
2. **Build tools** — You have source files (`src/`, SCSS, Webpack, etc.) instead of the compiled theme files in the standard structure.
3. **Missing `layout/theme.liquid`**.
4. **Wrong branch** — You selected a branch that doesn’t contain the theme files.

## How to fix it

### Option 1: Move the theme to the root (simplest)

1. Make sure the folders above sit directly at the root of the branch (not inside any parent folder).
2. Commit and push the change.
3. Try connecting the branch again in Shopify.

### Option 2: Use a dedicated “deploy” branch (recommended if you use a build process)

1. Keep your source code on a development branch.
2. Build the theme so the output matches the standard structure.
3. Put only that built output on a separate branch (e.g. `main` or `production`).
4. Connect that clean branch to Shopify.

### Option 3: Start from a proper theme export

1. In Shopify admin → **Online Store → Themes**.
2. On your current theme → **Actions → Download theme file**.
3. Unzip it.
4. Push the contents of the unzipped folder (the folders listed above) to the root of your GitHub branch.
5. Connect that branch.

## Quick checklist before connecting

- [ ] `layout/theme.liquid` exists
- [ ] The standard folders (`assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`) are at the **root** of the branch
- [ ] No extra parent folder wrapping the theme
- [ ] You have write access to the branch
- [ ] The Shopify GitHub app has access to that repository

Once the structure is correct, go back to **Online Store → Themes → Add theme → Connect from GitHub**, select the repository and the fixed branch, and it should connect successfully.

## This repo (`muqawiherb`)

A minimal valid theme skeleton lives at the repo root (`layout/theme.liquid` plus the standard folders). Replace or extend these files with your real theme export when ready.
