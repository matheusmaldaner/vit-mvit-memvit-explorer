<script lang="ts">
  import type { ArchitectureId, ArchitectureSpec } from '../data';

  export let architectures: Record<ArchitectureId, ArchitectureSpec>;
  export let architectureOrder: ArchitectureId[] = [];
</script>

<section class="compare card">
  <div class="compare-head">
    <div>
      <div class="eyebrow">One-Screen Comparison</div>
      <h2>What changes from one architecture generation to the next?</h2>
    </div>
    <p>
      The comparison mode compresses the whole talk into one screen: flat image tokens,
      multiscale video hierarchy, then long-term memory over windows.
    </p>
  </div>

  <div class="compare-grid">
    {#each architectureOrder as id}
      <article class="mini-card" style={`--accent:${architectures[id].accent}; --accent-rgb:${architectures[id].rgb};`}>
        <div class="mini-head">
          <div>
            <span class="eyebrow">{architectures[id].kicker}</span>
            <h3>{architectures[id].title}</h3>
          </div>
          <span class="mini-dot"></span>
        </div>

        <p>{architectures[id].intro}</p>

        <div class="mini-stage-list">
          {#each architectures[id].stages.slice(0, 3) as stage}
            <div class="mini-stage">
              <strong>{stage.title}</strong>
              <span>{stage.short}</span>
            </div>
          {/each}
        </div>

        <div class="mini-metrics">
          {#each architectures[id].metrics as metric}
            <div>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          {/each}
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .compare {
    padding: 24px;
    display: grid;
    gap: 22px;
  }

  .compare-head {
    display: grid;
    grid-template-columns: 1.2fr 0.9fr;
    gap: 20px;
    align-items: end;
  }

  .compare-head h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.7rem);
    letter-spacing: -0.05em;
    max-width: 14ch;
  }

  .compare-head p {
    color: #52606d;
    max-width: 50ch;
  }

  .compare-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  .mini-card {
    border-radius: 24px;
    border: 1px solid rgba(var(--accent-rgb), 0.16);
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.08), rgba(255, 255, 255, 0.64));
    padding: 20px;
    display: grid;
    gap: 16px;
  }

  .mini-head {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 12px;
  }

  .mini-head h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.6rem;
    letter-spacing: -0.05em;
  }

  .mini-dot {
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 0 10px rgba(var(--accent-rgb), 0.12);
  }

  .mini-card p {
    color: #52606d;
  }

  .mini-stage-list,
  .mini-metrics {
    display: grid;
    gap: 10px;
  }

  .mini-stage {
    border-radius: 16px;
    border: 1px solid rgba(23, 34, 44, 0.08);
    background: rgba(255, 255, 255, 0.6);
    padding: 12px;
    display: grid;
    gap: 4px;
  }

  .mini-stage strong,
  .mini-metrics strong {
    letter-spacing: -0.03em;
  }

  .mini-stage span,
  .mini-metrics span {
    color: #52606d;
    font-size: 0.8rem;
  }

  .mini-metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .mini-metrics div {
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(23, 34, 44, 0.06);
    padding: 12px;
    display: grid;
    gap: 4px;
  }

  @media (max-width: 1180px) {
    .compare-head,
    .compare-grid,
    .mini-metrics {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .compare {
      padding: 18px;
    }
  }
</style>
