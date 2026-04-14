<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ArchitectureTab } from '../data';

  export let selected: ArchitectureTab;
  export let options: {
    id: ArchitectureTab;
    label: string;
    caption: string;
    accent: string;
  }[] = [];

  const dispatch = createEventDispatcher<{ select: ArchitectureTab }>();
</script>

<div class="tabs">
  {#each options as option}
    <button
      type="button"
      class:selected={selected === option.id}
      style={`--tab-accent:${option.accent};`}
      on:click={() => dispatch('select', option.id)}
    >
      <strong>{option.label}</strong>
      <span>{option.caption}</span>
    </button>
  {/each}
</div>

<style>
  .tabs {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }

  button {
    border: 1px solid rgba(23, 34, 44, 0.1);
    background: rgba(255, 255, 255, 0.58);
    border-radius: 22px;
    padding: 14px 16px;
    text-align: left;
    display: grid;
    gap: 6px;
    min-height: 88px;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
  }

  button:hover {
    transform: translateY(-1px);
    border-color: rgba(23, 34, 44, 0.16);
  }

  button.selected {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.64));
    border-color: color-mix(in srgb, var(--tab-accent) 38%, rgba(23, 34, 44, 0.08));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tab-accent) 32%, transparent);
  }

  strong {
    font-size: 1.02rem;
    letter-spacing: -0.03em;
  }

  span {
    font-size: 0.8rem;
    color: #52606d;
  }

  @media (max-width: 920px) {
    .tabs {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 540px) {
    .tabs {
      grid-template-columns: 1fr;
    }
  }
</style>
