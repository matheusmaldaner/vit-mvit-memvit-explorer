<script lang="ts">
  import type { ArchitectureSpec } from '../data';

  export let architecture: ArchitectureSpec;
  export let stageIndex = 0;

  $: stage = architecture.stages[stageIndex];
  $: labels = stage.matrixLabels ?? stage.matrix.map((_, index) => `t${index}`);
</script>

<article
  class="detail card"
  style={`--accent:${architecture.accent}; --accent-rgb:${architecture.rgb}; --matrix-size:${stage.matrix.length};`}
>
  <div class="detail-head">
    <div class="head-copy">
      <div class="eyebrow">Interaction Map (Schematic)</div>
      <h3>{stage.title}</h3>
    </div>
    <div class="detail-badge">{stage.short}</div>
  </div>

  <p class="detail-copy">{stage.note}</p>

  <div class="matrix-outer">
    <div class="matrix-wrap">
      <div class="matrix-labels row">
        <span></span>
        {#each labels as label, index}
          {#if index < stage.matrix.length}
            <strong>{label}</strong>
          {/if}
        {/each}
      </div>

      <div class="matrix-grid">
        {#each stage.matrix as row, rowIndex}
          <div class="matrix-row">
            <strong class="row-label">{labels[rowIndex]}</strong>
            {#each row as value}
              <div class="cell" style={`--alpha:${0.14 + value * 0.82};`}>
                <span>{value.toFixed(2)}</span>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="detail-foot">
    <div class="foot-card">
      <span class="eyebrow-mini">Toy token view</span>
      <strong class="foot-val">{stage.tokens}</strong>
    </div>
    <div class="foot-card">
      <span class="eyebrow-mini">Why this step matters</span>
      <strong class="foot-val">{stage.receptive}</strong>
    </div>
  </div>

  <p class="bottom-line">{architecture.bottomLine}</p>
</article>

<style>
  .detail {
    padding: clamp(18px, 3vw, 24px);
    display: grid;
    gap: 20px;
    min-width: 0;
  }

  .detail-head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: start;
  }
  
  .head-copy {
    display: grid;
    gap: 4px;
    min-width: 0;
  }

  .detail-head h3 {
    font-family: var(--display, 'Space Grotesk', sans-serif);
    font-size: 1.5rem;
    letter-spacing: -0.04em;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .detail-badge {
    padding: 0.52rem 0.82rem;
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.1);
    border: 1px solid rgba(var(--accent-rgb), 0.18);
    font-family: var(--mono, 'IBM Plex Mono', monospace);
    font-size: 0.72rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .detail-copy {
    color: #52606d;
    font-size: 0.98rem;
    line-height: 1.5;
  }

  .matrix-outer {
    position: relative;
    border-radius: 24px;
    border: 1px solid rgba(23, 34, 44, 0.08);
    background: rgba(255, 255, 255, 0.45);
    padding: 16px;
    overflow: hidden;
  }

  .matrix-wrap {
    overflow: auto;
    padding-bottom: 4px; /* Space for scrollbar */
  }

  .matrix-labels,
  .matrix-row {
    display: grid;
    grid-template-columns: 42px repeat(var(--matrix-size), minmax(42px, 1fr));
    gap: 8px;
    align-items: center;
    min-width: max-content;
  }

  .matrix-labels {
    margin-bottom: 8px;
  }

  .matrix-grid {
    display: grid;
    gap: 8px;
    min-width: max-content;
  }

  .matrix-labels strong,
  .row-label {
    font-family: var(--mono, 'IBM Plex Mono', monospace);
    font-size: 0.72rem;
    color: #7f6344;
    text-align: center;
    font-weight: 500;
  }

  .row-label {
    text-align: left;
  }

  .cell {
    aspect-ratio: 1;
    min-width: 42px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background:
      linear-gradient(180deg, rgba(var(--accent-rgb), var(--alpha)), rgba(255, 255, 255, 0.32));
    border: 1px solid rgba(var(--accent-rgb), 0.14);
    transition: transform 0.2s var(--ease-out, ease-out);
  }
  
  .cell:hover {
    transform: scale(1.08);
    z-index: 1;
    box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.15);
  }

  .cell span {
    font-family: var(--mono, 'IBM Plex Mono', monospace);
    font-size: 0.7rem;
    color: #17222c;
    font-weight: 500;
  }

  .detail-foot {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .foot-card {
    border-radius: 20px;
    border: 1px solid rgba(23, 34, 44, 0.08);
    background: rgba(255, 255, 255, 0.58);
    padding: 14px;
    display: grid;
    gap: 6px;
    min-width: 0;
  }

  .eyebrow-mini {
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7f6344;
  }

  .foot-val {
    font-size: 0.95rem;
    letter-spacing: -0.02em;
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottom-line {
    padding: 16px;
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.08), rgba(255, 255, 255, 0.46));
    border: 1px dashed rgba(var(--accent-rgb), 0.28);
    color: #33404d;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  @media (max-width: 720px) {
    .detail {
      padding: 20px;
    }

    .detail-foot {
      grid-template-columns: 1fr;
    }
  }
</style>
