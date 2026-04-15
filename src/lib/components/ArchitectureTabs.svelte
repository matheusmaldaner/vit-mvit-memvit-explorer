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

<div class="tabs" role="tablist" aria-label="Architecture selection">
  {#each options as option}
    <button
      type="button"
      role="tab"
      aria-selected={selected === option.id}
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
    gap: 4px;
    min-height: 88px;
    transition: 
      transform 0.2s var(--ease-out, ease-out), 
      background 0.2s var(--ease-standard, ease), 
      border-color 0.2s var(--ease-standard, ease), 
      box-shadow 0.2s var(--ease-standard, ease);
    min-width: 0;
  }

  button:hover {
    transform: translateY(-2px);
    border-color: rgba(23, 34, 44, 0.16);
    background: rgba(255, 255, 255, 0.72);
  }

  button.selected {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.68));
    border-color: color-mix(in srgb, var(--tab-accent) 45%, rgba(23, 34, 44, 0.1));
    box-shadow: 
      0 4px 12px rgba(23, 34, 44, 0.04),
      inset 0 0 0 1px color-mix(in srgb, var(--tab-accent) 32%, transparent);
    transform: none;
  }

  strong {
    font-size: 1.05rem;
    letter-spacing: -0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.8rem;
    color: #52606d;
    line-height: 1.25;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    
    button {
      min-height: auto;
    }
  }
</style>
