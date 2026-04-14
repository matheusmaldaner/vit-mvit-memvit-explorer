<script lang="ts">
  import type { ArchitectureSpec } from '../data';

  export let architecture: ArchitectureSpec;
  export let stageIndex = 0;

  $: stage = architecture.stages[stageIndex];
  $: labels =
    architecture.id === 'memvit'
      ? ['q0', 'q1', 'q2', 'q3', 'm0', 'm1']
      : ['t0', 't1', 't2', 't3'];
</script>

<article
  class="detail card"
  style={`--accent:${architecture.accent}; --accent-rgb:${architecture.rgb}; --matrix-size:${stage.matrix.length};`}
>
  <div class="detail-head">
    <div>
      <div class="eyebrow">Attention Detail</div>
      <h3>{stage.title}</h3>
    </div>
    <div class="detail-badge">{stage.short}</div>
  </div>

  <p class="detail-copy">{stage.note}</p>

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

  <div class="detail-foot">
    <div class="foot-card">
      <span>Token view</span>
      <strong>{stage.tokens}</strong>
    </div>
    <div class="foot-card">
      <span>Why this step matters</span>
      <strong>{stage.receptive}</strong>
    </div>
  </div>

  <p class="bottom-line">{architecture.bottomLine}</p>
</article>

<style>
  .detail {
    padding: 22px;
    display: grid;
    gap: 18px;
  }

  .detail-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: start;
  }

  .detail-head h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.42rem;
    letter-spacing: -0.04em;
  }

  .detail-badge {
    padding: 0.52rem 0.72rem;
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.1);
    border: 1px solid rgba(var(--accent-rgb), 0.18);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem;
  }

  .detail-copy {
    color: #52606d;
  }

  .matrix-wrap {
    border-radius: 22px;
    border: 1px solid rgba(23, 34, 44, 0.08);
    background: rgba(255, 255, 255, 0.58);
    padding: 14px;
    overflow: auto;
  }

  .matrix-labels,
  .matrix-row {
    display: grid;
    grid-template-columns: 42px repeat(var(--matrix-size), minmax(0, 1fr));
    gap: 8px;
    align-items: center;
  }

  .matrix-labels {
    margin-bottom: 8px;
  }

  .matrix-grid {
    display: grid;
    gap: 8px;
  }

  .matrix-labels strong,
  .row-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem;
    color: #7f6344;
    text-align: center;
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
  }

  .cell span {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem;
    color: #17222c;
  }

  .detail-foot {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .foot-card {
    border-radius: 18px;
    border: 1px solid rgba(23, 34, 44, 0.08);
    background: rgba(255, 255, 255, 0.58);
    padding: 12px;
    display: grid;
    gap: 6px;
  }

  .foot-card span {
    font-size: 0.78rem;
    color: #52606d;
  }

  .foot-card strong {
    letter-spacing: -0.03em;
  }

  .bottom-line {
    padding: 14px 16px;
    border-radius: 18px;
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.08), rgba(255, 255, 255, 0.46));
    border: 1px dashed rgba(var(--accent-rgb), 0.24);
    color: #33404d;
  }

  @media (max-width: 720px) {
    .detail {
      padding: 18px;
    }

    .detail-foot {
      grid-template-columns: 1fr;
    }
  }
</style>
