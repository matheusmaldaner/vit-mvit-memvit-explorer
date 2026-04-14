# ViT, MViT, and MeMViT Explorer

Interactive teaching artifact for the EEL5739 AI Frontier Exploration assignment.

This app is a **conceptual explainer**, not a checkpoint runner. It uses hand-authored dummy data and staged visuals to help classmates understand the progression:

- `ViT`: flat image patches with global attention
- `MViT`: multiscale hierarchy over short video clips
- `MeMViT`: memory-augmented MViT for longer temporal support

The interface is designed for two jobs:

1. a live classroom walkthrough during the presentation
2. a post-class takeaway resource classmates can explore on their own

## Live URLs

- Repo: `https://github.com/matheusmaldaner/vit-mvit-memvit-explorer`
- GitHub Pages: `http://matheus.wiki/vit-mvit-memvit-explorer/`

## Current Status

Implemented:

- architecture tabs for `ViT`, `MViT`, `MeMViT`, and `Compare`
- guided stage rail per architecture
- Poloclub-inspired single-page explainer layout
- dummy token views, attention grids, and memory-bank visuals
- comparison strip for quick recap
- Playwright-based screenshot capture for iteration

Not implemented yet:

- richer stage animations
- custom image/video presets
- deployment config
- downloadable handout / resource sheet

## Local Development

```bash
npm install
npm run dev:host
```

Open `http://127.0.0.1:4173/`.

## Checks

```bash
npm run check
npm run build
```

## Screenshot Workflow

The repo includes a Playwright capture script so UI iteration is repeatable.

Start the app first:

```bash
npm run dev:host
```

Then in another terminal:

```bash
npm run screenshots
```

Generated files go to `screenshots/` by default:

- `vit-home.png`
- `mvit.png`
- `memvit.png`
- `memvit-attend.png`
- `compare.png`

You can override the target URL:

```bash
CAPTURE_URL=http://127.0.0.1:4173/ npm run screenshots
```

## Repo Layout

```text
src/
  App.svelte
  app.css
  lib/
    components/
    data.ts
references/
  cnn-explainer/
  mvit-reference/
plan.md
progress.md
```

## Notes On Sources

- `poloclub/cnn-explainer` and `poloclub/transformer-explainer` were used as UI and interaction references.
- The MViT and MeMViT paper ideas are represented conceptually, not through full model execution.

## Next Priorities

1. add richer motion and per-stage transitions
2. polish the MeMViT memory view
3. create a lightweight takeaway sheet or handout
4. deploy the app and attach it to the final submission
