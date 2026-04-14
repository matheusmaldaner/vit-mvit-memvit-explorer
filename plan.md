# ViT / MViT / MeMViT Artifact Plan

## Goal

Build a lightweight interactive web artifact that explains the progression:

`ViT -> MViT -> MeMViT`

The artifact should help classmates understand:

- how each architecture processes visual input,
- what problem each new architecture solves,
- why MViT introduces multiscale hierarchy,
- why MeMViT adds memory for longer videos,
- how these ideas connect to the presentation slides.

This should function as both:

- a live demo during the 20 minute presentation, and
- a polished takeaway resource for classmates after class.

## Time Constraint

The assignment text says materials must be submitted by Tuesday before class. In this workspace, the current date is **Tuesday, April 14, 2026**, so the plan should be treated as immediate and biased toward a strong MVP instead of an overbuilt research reproduction.

## Product Decision

We should **not** try to run full paper checkpoints in the browser.

We should build a **teaching-focused interactive explainer** with simplified but faithful animations and state transitions:

- small toy token grids,
- a few preset image/video examples,
- explicit stage-by-stage visual changes,
- visual memory accumulation for MeMViT,
- a comparison mode that makes the differences obvious in under 60 seconds.

That gives the class what they need:

- conceptual clarity,
- visual intuition,
- something interactive they can revisit later.

## Non-Goals

- Full training or evaluation of ViT, MViT, or MeMViT
- Browser inference with real MeMViT weights
- A literal clone of `transformer-explainer` or `cnn-explainer`
- A paper-perfect implementation of every tensor operation
- Arbitrary file upload support in the first version

## Recommended Stack

Use **Svelte + Vite + TypeScript** for the first shipping version.

Reason:

- both reference explainers are Svelte-based, so UI reuse is realistic;
- `transformer-explainer` already uses a modern Svelte/Vite-style stack;
- this keeps the artifact lighter than trying to port old Rollup-era code directly;
- Svelte is a good fit for animation-heavy educational interfaces.

Implementation note:

- the current workspace implementation has already started with plain Svelte + Vite for speed;
- if routing or deployment needs grow later, it can still be migrated to SvelteKit.

## What To Reuse vs What To Rebuild

### Reuse From `poloclub/transformer-explainer` (MIT)

Reuse ideas and selected UI primitives from:

- `src/routes/+page.svelte`
- `src/store/index.ts`
- `src/components/Attention.svelte`
- `src/components/AttentionMatrix.svelte`
- `src/components/Sankey.svelte`
- `src/components/common/Matrix.svelte`
- `src/components/common/TokenVector.svelte`

Use these for:

- token visualization patterns,
- attention matrix layout,
- store-driven interaction,
- staged architecture walkthrough layout.

Do **not** reuse:

- GPT-2 ONNX runtime pipeline,
- tokenizer/model-loading code,
- `static/model-v2/*`,
- textbook content that is specific to language transformers.

### Reuse From `poloclub/cnn-explainer` (MIT)

Reuse ideas and possibly small patterns from:

- `src/overview/Overview.svelte`
- `src/stores.js`
- overview/detail interaction flow,
- hover-to-detail / click-to-focus interaction model.

Use these for:

- the overall explainer choreography,
- guided overview plus detail panes,
- simple layered educational interactions.

Do **not** reuse:

- TensorFlow model code,
- `tiny-vgg/`,
- CNN-specific math/detail views,
- old build tooling.

### Use As Conceptual References Only

Use these to validate the concepts, not as direct code copy unless license is checked first:

- `references/mvit-reference/MViT.py`
- official MeMViT paper
- official MeMViT repo

Important note:

- the Polo Club repos are MIT-licensed and safe for direct reuse;
- the official MeMViT repo is **CC-BY-NC 4.0**, so we should treat it as a conceptual reference unless we explicitly decide how to handle that license.

## Artifact Shape

The artifact should be a **single-page explainer** with two usage modes:

### 1. Guided Mode

Used during the presentation.

- fixed scripted flow,
- large labels,
- minimal controls,
- clean transitions,
- fast to explain live.

### 2. Explore Mode

Used after class by classmates.

- free architecture switching,
- stepper controls,
- attention/memory toggles,
- explanatory side panel.

## Core Screens / Panels

### Panel A: Architecture Selector

Top-level selector:

- `ViT`
- `MViT`
- `MeMViT`
- `Compare`

### Panel B: Input + Tokenization View

Show the input as:

- one image for ViT,
- a short video clip for MViT,
- chunked video windows for MeMViT.

Visualize:

- patch splitting,
- token count,
- spatial vs temporal grouping,
- class token if included in the explanation.

### Panel C: Stage Pipeline View

Show the main forward-pass structure for the selected architecture.

For ViT:

- patch embed,
- positional encoding,
- repeated transformer blocks at fixed token resolution.

For MViT:

- patch embed,
- hierarchical stages,
- token count decreases,
- channel depth increases,
- attention/pooling blocks.

For MeMViT:

- MViT backbone,
- per-window processing,
- cached memory bank,
- current queries attending to current tokens plus past memory.

### Panel D: Attention / Detail View

A focused detail view driven by the selected architecture:

- ViT: global patch attention over a single image
- MViT: stage-by-stage pooled attention / multiscale token reduction
- MeMViT: current-window attention with appended memory keys/values

### Panel E: Comparison Summary

A persistent comparison strip or card showing:

- token count behavior,
- resolution behavior,
- temporal support,
- compute intuition,
- what problem this model solves that the previous one did not.

## Architecture Story To Tell

### ViT

Key teaching point:

- treats an image as a flat set of patch tokens;
- attention is global, but token resolution stays fixed through the stack.

What users should see:

- image split into equal patches,
- all patches can attend to all patches,
- token count stays constant,
- extending this naively to long videos gets expensive quickly.

### MViT

Key teaching point:

- adds a multiscale hierarchy to transformer processing;
- later stages operate on fewer, coarser tokens with richer channels.

What users should see:

- video tokens start dense,
- stages progressively pool/merge tokens,
- token count drops across stages,
- channel richness grows,
- the model becomes more efficient and hierarchical like a CNN backbone, but remains transformer-based.

### MeMViT

Key teaching point:

- keeps MViT as the backbone but augments it with memory over prior video windows.

What users should see:

- video processed window by window,
- previous keys/values cached as memory,
- memory optionally compressed,
- current queries attend to current chunk plus memory,
- temporal support grows without the cost of feeding the full long video into one giant attention operation.

## Fidelity Strategy

The artifact should be honest about what is exact and what is simplified.

Recommended rule:

- use exact terminology for architectural ideas,
- use simplified toy tensors for visualization,
- label illustrations as conceptual where needed.

Examples:

- Use a tiny `4 x 4` patch grid instead of real production token counts.
- Use a tiny `4-frame` or `6-frame` clip instead of real training windows.
- Use deterministic or handcrafted attention weights if that keeps the animation clear.

## Data Model

Use static TypeScript data definitions instead of real checkpoints.

Recommended internal model:

- `ArchitectureSpec`
- `StageSpec`
- `TokenSpec`
- `AttentionEdge`
- `MemoryState`
- `DemoScenario`

Suggested files:

- `src/lib/data/architectures/vit.ts`
- `src/lib/data/architectures/mvit.ts`
- `src/lib/data/architectures/memvit.ts`
- `src/lib/data/scenarios/presets.ts`
- `src/lib/types.ts`

## Proposed UI Components

Suggested component breakdown:

- `src/lib/components/ArchitectureTabs.svelte`
- `src/lib/components/InputViewer.svelte`
- `src/lib/components/TokenGrid.svelte`
- `src/lib/components/StageTimeline.svelte`
- `src/lib/components/AttentionMatrixLite.svelte`
- `src/lib/components/PipelineDiagram.svelte`
- `src/lib/components/MemoryBank.svelte`
- `src/lib/components/ComparisonCards.svelte`
- `src/lib/components/ExplanationPanel.svelte`
- `src/lib/components/Legend.svelte`

Suggested state:

- selected architecture,
- selected preset,
- current step/stage,
- selected token,
- selected window,
- memory on/off,
- guided mode vs explore mode.

## Visual Design Direction

Keep the UI clean and bold, not paper-like and cluttered.

Suggested palette:

- ViT: amber / gold
- MViT: teal / cyan
- MeMViT: coral / red-orange
- Memory tokens: darker coral
- neutral scaffolding: warm gray / slate

Design notes:

- use strong labels and a clear legend;
- avoid tiny text during live demo;
- animate only transitions that teach something;
- default to desktop-first, but keep it usable on mobile.

## Implementation Phases

### Phase 0: Scaffold

Deliverables:

- initialize the app,
- add basic routing,
- add global styles,
- define types and stores,
- create the page shell.

Output:

- running app with placeholder sections.

### Phase 1: Shared Primitives

Deliverables:

- token grid component,
- simplified attention matrix,
- architecture stage timeline,
- explanation panel,
- comparison cards.

Output:

- reusable UI pieces independent of a specific architecture.

### Phase 2: ViT Baseline

Deliverables:

- patch tokenization animation,
- fixed-resolution transformer pipeline,
- simple attention demo,
- explanation copy for baseline limitations.

Output:

- first complete architecture mode.

### Phase 3: MViT Mode

Deliverables:

- multiscale stage diagram,
- token merge / downsample animation,
- channel-growth explanation,
- pooled-attention explanation.

Output:

- clear visual contrast against ViT.

### Phase 4: MeMViT Mode

Deliverables:

- chunk-by-chunk processing flow,
- memory bank visualization,
- memory compression view,
- long-range context explanation.

Output:

- the most important model for the presentation is demoable.

### Phase 5: Compare Mode

Deliverables:

- side-by-side cards or synchronized view,
- one-click "show me what changed" interaction,
- summary table for class takeaway.

Output:

- strongest resource for peer teaching.

### Phase 6: Polish + Submission Assets

Deliverables:

- cleaned labels,
- final colors,
- responsive layout,
- README,
- short usage guide / cheat sheet,
- deployment config.

Output:

- submission-ready artifact plus takeaway resource.

## MVP Cut Line

If time gets tight, the MVP should still include:

- one single-page app,
- architecture tabs,
- ViT tokenization,
- MViT multiscale stage transitions,
- MeMViT memory bank animation,
- a simple compare view,
- one-page takeaway notes.

These should be dropped before the deadline if necessary:

- arbitrary uploads,
- complex D3 Sankey transitions,
- many preset examples,
- extra textbook-style overlays,
- advanced mobile polish beyond basic responsiveness.

## Validation Plan

We should verify the artifact against three standards:

### 1. Conceptual Accuracy

- cross-check labels against the slide deck,
- verify MViT stage story against the paper and `MViT.py`,
- verify MeMViT memory explanation against the paper figure and text.

### 2. Demo Quality

- can the guided flow be explained in 3 to 5 minutes?
- can a classmate understand the difference between the three models after one pass?
- are the animations readable on a classroom projector?

### 3. Submission Quality

- app starts locally with simple setup,
- layout does not break on laptop or phone,
- text is polished,
- artifact works as a standalone takeaway.

## Deliverables To Submit

The final submission package should contain:

1. the presentation slides,
2. the interactive web artifact,
3. a short takeaway resource:
   a one-page guide, cheat sheet, or README with:
   - the three architecture summaries,
   - how to run the demo,
   - what classmates should notice.

## Repo Plan

A private GitHub repo is reasonable for this project.

Recommended repo flow:

- create a private repo after the initial scaffold is ready,
- keep `main` deployable,
- use a simple `README.md` with setup instructions,
- deploy static output through GitHub Pages or Vercel if needed.

Note:

- GitHub CLI is authenticated in this environment, so repo creation is available.
- I have not created the remote yet because the current task is planning and documentation first.

## Immediate Next Build Steps

1. Scaffold the SvelteKit app in this workspace.
2. Port only the visual primitives needed from the Polo Club explainers.
3. Implement the ViT baseline first.
4. Add MViT multiscale transitions.
5. Add MeMViT memory behavior.
6. Build compare mode and takeaway material.

## Bottom Line

The right implementation is a **small, high-clarity educational explainer**, not a heavyweight research model port. The teaching value comes from making the architectural differences visible, interactive, and memorable.
