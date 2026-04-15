<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { StageSpec } from '../data';

  export let stages: StageSpec[] = [];
  export let activeIndex = 0;
  export let accent = '#17222c';

  const dispatch = createEventDispatcher<{ select: number }>();
</script>

<div class="rail" role="list">
  {#each stages as stage, index}
    <button
      type="button"
      role="listitem"
      aria-current={index === activeIndex ? 'step' : undefined}
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
    transition: 
      transform 0.2s var(--ease-out, ease-out), 
      background 0.2s var(--ease-standard, ease), 
      border-color 0.2s var(--ease-standard, ease);
    min-width: 0;
  }

  button:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.68);
    border-color: rgba(23, 34, 44, 0.16);
  }

  button.active {
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 12%, white), rgba(255, 255, 255, 0.9));
    border-color: color-mix(in srgb, var(--accent) 45%, transparent);
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 8%, transparent);
    transform: none;
  }

  .rail-index {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: rgba(23, 34, 44, 0.08);
    color: #17222c;
    display: grid;
    place-items: center;
    font-family: var(--mono, 'IBM Plex Mono', monospace);
    font-size: 0.85rem;
    font-weight: 500;
    flex: 0 0 auto;
    transition: transform 0.2s var(--ease-out, ease-out);
  }

  button.active .rail-index {
    background: var(--accent);
    color: #fff7ef;
    transform: scale(1.1);
  }

  .rail-copy {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  strong {
    font-size: 0.98rem;
    letter-spacing: -0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    color: #52606d;
    font-size: 0.78rem;
    line-height: 1.2;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    
    button {
      padding: 12px;
    }
  }
</style>
