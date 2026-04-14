<script lang="ts">
  import ArchitectureTabs from './lib/components/ArchitectureTabs.svelte';
  import StepRail from './lib/components/StepRail.svelte';
  import PipelineScene from './lib/components/PipelineScene.svelte';
  import DetailPanel from './lib/components/DetailPanel.svelte';
  import CompareOverview from './lib/components/CompareOverview.svelte';
  import ComparisonBand from './lib/components/ComparisonBand.svelte';
  import {
    architectures,
    architectureOrder,
    type ArchitectureId,
    type ArchitectureTab,
  } from './lib/data';

  let selectedTab: ArchitectureTab = 'vit';
  let stageIndex = 0;

  const tabOptions = [
    {
      id: 'vit' as const,
      label: 'ViT',
      caption: 'Flat image tokens',
      accent: architectures.vit.accent,
    },
    {
      id: 'mvit' as const,
      label: 'MViT',
      caption: 'Multiscale hierarchy',
      accent: architectures.mvit.accent,
    },
    {
      id: 'memvit' as const,
      label: 'MeMViT',
      caption: 'Memory over time',
      accent: architectures.memvit.accent,
    },
    {
      id: 'compare' as const,
      label: 'Compare',
      caption: 'One-screen summary',
      accent: '#5f6d7d',
    },
  ];

  $: architecture =
    selectedTab === 'compare' ? null : architectures[selectedTab as ArchitectureId];

  $: if (architecture && stageIndex >= architecture.stages.length) {
    stageIndex = 0;
  }

  function handleTabSelect(event: CustomEvent<ArchitectureTab>) {
    selectedTab = event.detail;
    stageIndex = 0;
  }

  function handleStageSelect(event: CustomEvent<number>) {
    stageIndex = event.detail;
  }

  function advance(delta: number) {
    if (!architecture) return;
    const next = stageIndex + delta;
    const lastIdx = architecture.stages.length - 1;
    stageIndex = Math.max(0, Math.min(lastIdx, next));
  }
</script>

<svelte:head>
  <title>ViT, MViT, and MeMViT Explorer</title>
  <meta
    name="description"
    content="Interactive artifact comparing ViT, MViT, and MeMViT with browser-based architecture visuals and dummy data."
  />
</svelte:head>

<div class="shell">
  <header class="masthead card">
    <div class="masthead-copy">
      <div class="eyebrow">AI Frontier Artifact</div>
      <h1>Vision Transformer Families</h1>
      <p>
        Interactive artifact for the progression from <strong>ViT</strong> to
        <strong>MViT</strong> to <strong>MeMViT</strong>. Each stage uses lightweight
        browser visuals to show how the representation changes from flat image patches
        to multiscale video tokens to memory-aware long-range context.
      </p>
    </div>

    <div class="masthead-side">
      <div class="hero-preview card">
        <div class="hero-preview-head">
          <span class="eyebrow">Architecture Arc</span>
          <span class="preview-caption">What changes at each generation</span>
        </div>
        <div class="preview-track">
          {#each architectureOrder as id}
            <div
              class:selected={selectedTab === id}
              class="preview-node"
              style={`--preview-accent:${architectures[id].accent}; --preview-rgb:${architectures[id].rgb};`}
            >
              <strong>{architectures[id].title}</strong>
              <span>{architectures[id].kicker}</span>
              <div class="preview-bars">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          {/each}
        </div>
        <div class="preview-foot">
          <span>flat patches</span>
          <span>multiscale hierarchy</span>
          <span>cached memory</span>
        </div>
      </div>
      <ArchitectureTabs
        options={tabOptions}
        selected={selectedTab}
        on:select={handleTabSelect}
      />
    </div>
  </header>

  {#if architecture}
    <section class="summary-grid">
      <article class="summary-card card" style={`--accent:${architecture.accent}; --accent-rgb:${architecture.rgb};`}>
        <div class="summary-head">
          <div>
            <div class="eyebrow">{architecture.kicker}</div>
            <h2>{architecture.title}</h2>
          </div>
          <span class="accent-dot" aria-hidden="true"></span>
        </div>
        <p>{architecture.intro}</p>
        <div class="mini-metrics">
          {#each architecture.metrics as metric}
            <div class="metric-chip">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.hint}</small>
            </div>
          {/each}
        </div>
      </article>

      <article class="summary-card card problem-card">
        <div class="eyebrow">Why It Exists</div>
        <h3>{architecture.problem.title}</h3>
        <p>{architecture.problem.body}</p>
        <div class="stage-chip">
          Stage {stageIndex + 1} of {architecture.stages.length}: {architecture.stages[stageIndex].title}
        </div>
        <div class="control-row">
          <button class="ghost" type="button" on:click={() => advance(-1)} disabled={stageIndex === 0}>
            Previous
          </button>
          <button
            class="ghost"
            type="button"
            on:click={() => advance(1)}
            disabled={stageIndex === architecture.stages.length - 1}
          >
            Next
          </button>
        </div>
      </article>
    </section>

    <section class="workspace">
      <div class="main-stack">
        <div class="card rail-card">
          <div class="card-title-row">
            <div>
              <div class="eyebrow">Architecture Stages</div>
              <h3>Click through the representation shift step by step</h3>
            </div>
            <div class="legend-inline">
              {#each architecture.legend as item}
                <span class="legend-item">
                  <span class="legend-swatch" style={`background:${item.color}`}></span>
                  {item.label}
                </span>
              {/each}
            </div>
          </div>
          <StepRail
            stages={architecture.stages}
            activeIndex={stageIndex}
            accent={architecture.accent}
            on:select={handleStageSelect}
          />
        </div>

        <PipelineScene {architecture} {stageIndex} />
      </div>

      <div class="side-stack">
        <article class="card teaching-card">
          <div class="eyebrow">Key Ideas</div>
          <h3>{architecture.callout.title}</h3>
          <p>{architecture.callout.body}</p>
          <ul class="script-points">
            {#each architecture.script as point}
              <li>{point}</li>
            {/each}
          </ul>
        </article>

        <DetailPanel {architecture} {stageIndex} />
      </div>
    </section>
  {:else}
    <CompareOverview {architectures} {architectureOrder} />
  {/if}

  <ComparisonBand
    {architectures}
    {architectureOrder}
    selected={selectedTab}
    on:select={handleTabSelect}
  />
</div>
