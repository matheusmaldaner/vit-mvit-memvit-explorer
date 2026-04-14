<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { StageSpec } from '../data';

  export let stages: StageSpec[] = [];
  export let activeIndex = 0;
  export let accent = '#17222c';

  const dispatch = createEventDispatcher<{ select: number }>();
</script>

<div class="rail">
  {#each stages as stage, index}
    <button
      type="button"
      class:active={index === activeIndex}
      style={`--accent:${accent};`}
      on:click={() => dispatch('select', index)}
    >
      <span class="rail-index">{index + 1}</span>
      <div class="rail-copy">
        <strong>{stage.title}</strong>
        <small>{stage.short}</small>
      </div>
    </button>
  {/each}
</div>

<style>
  .rail {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }

  button {
    display: flex;
    gap: 12px;
    align-items: start;
    border: 1px solid rgba(23, 34, 44, 0.08);
    background: rgba(255, 255, 255, 0.54);
    border-radius: 20px;
    padding: 14px;
    text-align: left;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
  }

  button:hover {
    transform: translateY(-1px);
  }

  button.active {
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 12%, white), rgba(255, 255, 255, 0.86));
    border-color: color-mix(in srgb, var(--accent) 35%, transparent);
  }

  .rail-index {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: rgba(23, 34, 44, 0.08);
    color: #17222c;
    display: grid;
    place-items: center;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.82rem;
    flex: 0 0 auto;
  }

  button.active .rail-index {
    background: var(--accent);
    color: #fff7ef;
  }

  .rail-copy {
    display: grid;
    gap: 4px;
  }

  strong {
    font-size: 0.96rem;
    letter-spacing: -0.03em;
  }

  small {
    color: #52606d;
    font-size: 0.78rem;
  }

  @media (max-width: 1180px) {
    .rail {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 620px) {
    .rail {
      grid-template-columns: 1fr;
    }
  }
</style>
