<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ArchitectureId, ArchitectureSpec, ArchitectureTab } from '../data';

  export let architectures: Record<ArchitectureId, ArchitectureSpec>;
  export let architectureOrder: ArchitectureId[] = [];
  export let selected: ArchitectureTab;

  const dispatch = createEventDispatcher<{ select: ArchitectureTab }>();
</script>

<section class="band card">
  <div class="band-head">
    <div>
      <div class="eyebrow">Quick Reference</div>
      <h3>Use this strip as the takeaway comparison after the live demo.</h3>
    </div>
    <button type="button" class="compare-button" on:click={() => dispatch('select', 'compare')}>
      Open Compare View
    </button>
  </div>

  <div class="band-grid">
    {#each architectureOrder as id}
      <button
        type="button"
        class:selected={selected === id}
        style={`--accent:${architectures[id].accent}; --accent-rgb:${architectures[id].rgb};`}
        on:click={() => dispatch('select', id)}
      >
        <div class="band-title">
          <strong>{architectures[id].title}</strong>
          <span>{architectures[id].kicker}</span>
        </div>
        <p>{architectures[id].bottomLine}</p>
      </button>
    {/each}
  </div>
</section>

<style>
  .band {
    padding: 20px;
    display: grid;
    gap: 18px;
  }

  .band-head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
  }

  .band-head h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.22rem;
    letter-spacing: -0.04em;
  }

  .compare-button {
    border: none;
    border-radius: 999px;
    padding: 0.78rem 1rem;
    background: #17222c;
    color: #fff9f0;
  }

  .band-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .band-grid button {
    border-radius: 20px;
    border: 1px solid rgba(23, 34, 44, 0.08);
    background: rgba(255, 255, 255, 0.58);
    padding: 16px;
    text-align: left;
    display: grid;
    gap: 10px;
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
  }

  .band-grid button:hover {
    transform: translateY(-1px);
  }

  .band-grid button.selected {
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.1), rgba(255, 255, 255, 0.76));
    border-color: rgba(var(--accent-rgb), 0.25);
  }

  .band-title {
    display: grid;
    gap: 4px;
  }

  .band-title strong {
    font-size: 1.1rem;
    letter-spacing: -0.04em;
  }

  .band-title span,
  .band-grid p {
    color: #52606d;
    font-size: 0.84rem;
  }

  @media (max-width: 980px) {
    .band-head,
    .band-grid {
      grid-template-columns: 1fr;
      flex-direction: column;
      align-items: start;
    }
  }

  @media (max-width: 720px) {
    .band {
      padding: 18px;
    }
  }
</style>
