# Progress

## Project

Interactive course artifact for the AI Frontier Exploration assignment:

- compare `ViT`, `MViT`, and `MeMViT`,
- support the presentation slides,
- serve as a takeaway resource after class.

## Status As Of 2026-04-14 16:08 EDT

### Completed

- Reviewed the assignment requirements and constraints.
- Reviewed the slide deck in HTML mode and extracted the main story arc:
  - `MeMViT`
  - `MViT`
  - `MeMViT attention / memory`
  - demo implementation reference
- Confirmed the workspace started empty and needs to be treated as a fresh artifact repo.
- Cloned `poloclub/cnn-explainer` into `references/cnn-explainer`.
- Inspected `poloclub/transformer-explainer` structure via the GitHub API.
- Fetched the slide-linked `MViT.py` reference into `references/mvit-reference/MViT.py`.
- Located the official MeMViT paper and repo for concept validation.
- Verified GitHub CLI auth is available in this environment.
- Scaffolded a new Svelte + Vite + TypeScript app in the repo root.
- Implemented the first working artifact UI with:
  - architecture tabs,
  - guided stage rail,
  - ViT / MViT / MeMViT views,
  - compare mode,
  - Poloclub-style cards and explainer layout,
  - conceptual attention and memory visuals.
- Installed local Playwright support and browser binaries for screenshot capture.
- Captured working screenshots for:
  - home / ViT,
  - MeMViT,
  - Compare.
- Replaced the default README with project-specific instructions.
- Added an automated screenshot script at `scripts/capture-screenshots.mjs`.
- Created and pushed the public GitHub repository:
  - `https://github.com/matheusmaldaner/vit-mvit-memvit-explorer`
- Deployed the artifact to GitHub Pages:
  - `http://matheus.wiki/vit-mvit-memvit-explorer/`

### Key Decisions

- Build a new lightweight explainer instead of trying to run full model checkpoints in-browser.
- Use `Svelte + Vite + TypeScript` for the first implementation pass to keep iteration fast.
- Reuse only the UI ideas and selected primitives from the Polo Club explainers.
- Treat MViT / MeMViT model code as conceptual reference unless license is verified for direct reuse.
- Prioritize an MVP that works for the presentation first, then add polish.

### What We Learned From The References

- `transformer-explainer` is useful for:
  - token views,
  - attention matrices,
  - interactive step layout,
  - store-driven UI structure.
- `transformer-explainer` is not useful for:
  - GPT-2 ONNX model loading,
  - tokenizer pipeline,
  - its large static model payload.
- `cnn-explainer` is useful for:
  - overview/detail interaction flow,
  - educational explainer choreography,
  - layered component structure.
- `cnn-explainer` is not useful for:
  - TensorFlow CNN logic,
  - CNN-specific math views,
  - legacy build tooling.
- `MViT.py` confirms the teaching story for MViT:
  - patch embedding,
  - staged hierarchy,
  - multiscale pooling attention,
  - token resolution reduction with channel growth.
- The MeMViT paper confirms the teaching story for MeMViT:
  - online chunk processing,
  - memory made from cached keys/values,
  - compressed memory,
  - longer temporal support with modest added cost.

## Current Risk Assessment

- The due date appears immediate relative to the current workspace date.
- Full source transplantation from the reference repos would waste time.
- MeMViT can become vague quickly if the memory visualization is not explicit.
- We need to keep the first build focused on explanation, not numerical fidelity.
- The current UI is structurally solid, but the motion and stage-to-stage transitions are still lighter than the Polo Club references.
- The artifact still needs a companion takeaway document beyond the web app itself.

## Next Actions

1. Add richer stage animation and transition polish.
2. Strengthen the MeMViT memory interaction so the cache growth is even clearer.
3. Create the takeaway handout / one-page guide.
4. Decide on deployment target and publish the artifact.
5. Create a private GitHub repo once the next polish pass lands.

## Repo Note

- A private GitHub repo can be created from this environment; the codebase is now mature enough for that next step.
