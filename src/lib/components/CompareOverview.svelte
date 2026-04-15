<script lang="ts">
  import type { ArchitectureId, ArchitectureSpec } from '../data';

  export let architectures: Record<ArchitectureId, ArchitectureSpec>;
  export let architectureOrder: ArchitectureId[] = [];
</script>

<section class="compare card">
  <div class="compare-head">
    <div class="head-copy">
      <div class="eyebrow">One-Screen Comparison</div>
      <h2>What changes from one generation to the next?</h2>
    </div>
    <p>
      This comparison view compresses the whole artifact into one screen: flat image tokens,
      multiscale video hierarchy, then long-term memory over windows.
    </p>
  </div>

  <div class="compare-grid">
    {#each architectureOrder as id}
      <article class="mini-card" style={`--accent:${architectures[id].accent}; --accent-rgb:${architectures[id].rgb};`}>
        <div class="mini-head">
          <div class="mini-titles">
            <span class="eyebrow">{architectures[id].kicker}</span>
            <h3>{architectures[id].title}</h3>
          </div>
          <span class="mini-dot"></span>
        </div>

        <p class="mini-intro">{architectures[id].intro}</p>

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
            <div class="mini-metric">
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
    padding: clamp(18px, 4vw, 32px);
    display: grid;
    gap: 28px;
    background: 
      radial-gradient(circle at bottom right, rgba(23, 34, 44, 0.03), transparent 40%),
      var(--panel);
  }

  .compare-head {
    display: grid;
    grid-template-columns: 1.2fr 0.9fr;
    gap: 24px;
    align-items: end;
  }

  .head-copy {
    display: grid;
    gap: 12px;
  }

  .compare-head h2 {
    font-family: var(--display, 'Space Grotesk', sans-serif);
    font-size: clamp(1.8rem, 3.2vw, 2.7rem);
    line-height: 1;
    letter-spacing: -0.05em;
    max-width: 18ch;
  }

  .compare-head p {
    color: #52606d;
    max-width: 50ch;
    font-size: 1.05rem;
    line-height: 1.5;
  }

  .compare-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }

  .mini-card {
    border-radius: 28px;
    border: 1px solid rgba(var(--accent-rgb), 0.16);
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.06), rgba(255, 255, 255, 0.72));
    padding: 24px;
    display: grid;
    gap: 20px;
    transition: transform 0.3s var(--ease-out, ease-out), box-shadow 0.3s var(--ease-standard, ease);
    min-width: 0;
  }

  .mini-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(var(--accent-rgb), 0.12);
    border-color: rgba(var(--accent-rgb), 0.32);
  }

  .mini-head {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 12px;
  }

  .mini-titles {
    display: grid;
    gap: 4px;
    min-width: 0;
  }

  .mini-head h3 {
    font-family: var(--display, 'Space Grotesk', sans-serif);
    font-size: 1.7rem;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  .mini-dot {
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 0 10px rgba(var(--accent-rgb), 0.12);
    flex-shrink: 0;
  }

  .mini-intro {
    color: #52606d;
    font-size: 0.95rem;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .mini-stage-list {
    display: grid;
    gap: 10px;
  }

  .mini-stage {
    border-radius: 18px;
    border: 1px solid rgba(23, 34, 44, 0.06);
    background: rgba(255, 255, 255, 0.64);
    padding: 14px;
    display: grid;
    gap: 4px;
    min-width: 0;
  }

  .mini-stage strong {
    font-size: 0.95rem;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mini-stage span {
    color: #52606d;
    font-size: 0.78rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mini-metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .mini-metric {
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(23, 34, 44, 0.05);
    padding: 10px;
    display: grid;
    gap: 4px;
    min-width: 0;
    text-align: center;
  }

  .mini-metric span {
    color: #52606d;
    font-size: 0.72rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mini-metric strong {
    font-size: 0.92rem;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 1180px) {
    .compare-head {
      grid-template-columns: 1fr;
      align-items: start;
    }

    .compare-grid {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  }

  @media (max-width: 720px) {
    .compare {
      padding: 20px;
      gap: 20px;
    }
    
    .mini-card {
      padding: 20px;
    }
  }
</style>
