<script lang="ts">
  import type { ArchitectureSpec } from '../data';

  export let architecture: ArchitectureSpec;
  export let stageIndex = 0;

  $: stage = architecture.stages[stageIndex];

  function tokenClass(index: number) {
    if (architecture.id === 'memvit' && stage.memorySlots && index >= stage.tokenRows * stage.tokenCols - 2) {
      return 'token focus';
    }

    if (stage.tokenAccent === 'focus' && index % 3 === 0) {
      return 'token focus';
    }

    return 'token';
  }

  $: tokenCount = stage.tokenRows * stage.tokenCols;
  $: frameCount = stage.filmstripFrames ?? 1;
</script>

<section
  class="scene card"
  style={`--accent:${architecture.accent}; --accent-rgb:${architecture.rgb}; --grid-cols:${stage.tokenCols};`}
>
  <div class="scene-column">
    <div class="scene-title">
      <span class="eyebrow">Input</span>
      <h3>{architecture.inputLabel}</h3>
    </div>

    <div class="filmstrip" class:single={frameCount === 1}>
      {#each Array(frameCount) as _, frameIndex}
        <div class="frame" style={`--offset:${frameIndex};`}>
          <div class="frame-overlay"></div>
          <div class="frame-caption">{frameCount === 1 ? 'image' : `t + ${frameIndex}`}</div>
        </div>
      {/each}
    </div>

    <div class="input-note">{stage.note}</div>
  </div>

  <div class="scene-column center">
    <div class="scene-title">
      <span class="eyebrow">Visible Tokens</span>
      <h3>{stage.tokens}</h3>
    </div>

    <div class="token-grid">
      {#each Array(tokenCount) as _, index}
        <div class={tokenClass(index)}></div>
      {/each}
      {#if architecture.id === 'vit'}
        <div class="cls-token">CLS</div>
      {/if}
    </div>

    <div class="meta-grid">
      <div class="meta">
        <span>Channels</span>
        <strong>{stage.channels}</strong>
      </div>
      <div class="meta">
        <span>Receptive field</span>
        <strong>{stage.receptive}</strong>
      </div>
    </div>
  </div>

  <div class="scene-column mechanism">
    <div class="scene-title">
      <span class="eyebrow">{architecture.id === 'memvit' ? 'Memory Mechanism' : 'What Changes'}</span>
      <h3>{stage.title}</h3>
    </div>

    {#if architecture.id === 'vit'}
      <div class="mechanism-box">
        <div class="mesh">
          {#each Array(10) as _, index}
            <span style={`--i:${index};`}></span>
          {/each}
        </div>
        <p>All patches remain on one global attention canvas.</p>
      </div>
    {:else if architecture.id === 'mvit'}
      <div class="mechanism-box">
        <div class="scale-stack">
          <div class="scale-layer large"></div>
          <div class="scale-layer medium"></div>
          <div class="scale-layer small"></div>
        </div>
        <p>Pooling attention shrinks the token map while semantic depth grows.</p>
      </div>
    {:else}
      <div class="mechanism-box">
        <div class="memory-bank">
          {#if stage.memorySlots}
            {#each Array(stage.memorySlots) as _, index}
              <div class="memory-slot">{index + 1}</div>
            {/each}
          {:else}
            <div class="memory-slot empty">No cache yet</div>
          {/if}
        </div>
        <p>Past keys and values stay available as a compressed temporal memory bank.</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .scene {
    padding: 24px;
    display: grid;
    grid-template-columns: 0.92fr 1.05fr 0.95fr;
    gap: 18px;
    overflow: hidden;
  }

  .scene::after {
    content: '';
    position: absolute;
    inset: auto -10% -40% auto;
    width: 38%;
    height: 55%;
    background: radial-gradient(circle, rgba(var(--accent-rgb), 0.16), transparent 70%);
    pointer-events: none;
  }

  .scene-column {
    position: relative;
    border-radius: 24px;
    border: 1px solid rgba(23, 34, 44, 0.09);
    background: rgba(255, 255, 255, 0.58);
    padding: 18px;
    display: grid;
    gap: 16px;
    min-height: 100%;
  }

  .scene-title {
    display: grid;
    gap: 4px;
  }

  .scene-title h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.24rem;
    letter-spacing: -0.04em;
  }

  .filmstrip {
    display: flex;
    gap: 12px;
    align-items: center;
    min-height: 182px;
  }

  .filmstrip.single {
    justify-content: center;
  }

  .frame {
    position: relative;
    width: 100%;
    min-height: 168px;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(var(--accent-rgb), 0.25);
    background:
      linear-gradient(135deg, rgba(var(--accent-rgb), 0.35), rgba(255, 255, 255, 0.08)),
      linear-gradient(180deg, rgba(23, 34, 44, 0.18), transparent),
      radial-gradient(circle at 30% 28%, rgba(255, 255, 255, 0.6), transparent 30%),
      linear-gradient(160deg, #2b3945 0%, #131d25 100%);
    transform: translateY(calc(var(--offset) * 4px));
  }

  .frame::before {
    content: '';
    position: absolute;
    inset: 14px;
    border: 1px solid rgba(255, 248, 236, 0.35);
    border-radius: 12px;
    background:
      linear-gradient(90deg, rgba(255, 248, 236, 0.12) 25%, transparent 25%, transparent 50%, rgba(255, 248, 236, 0.12) 50%, rgba(255, 248, 236, 0.12) 75%, transparent 75%),
      linear-gradient(rgba(255, 248, 236, 0.12) 25%, transparent 25%, transparent 50%, rgba(255, 248, 236, 0.12) 50%, rgba(255, 248, 236, 0.12) 75%, transparent 75%);
    background-size: 25% 100%, 100% 25%;
  }

  .frame-overlay {
    position: absolute;
    inset: auto 10px 10px auto;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 248, 236, 0.3);
  }

  .frame-caption {
    position: absolute;
    inset: auto auto 10px 10px;
    padding: 0.38rem 0.58rem;
    border-radius: 999px;
    background: rgba(255, 251, 244, 0.88);
    font-size: 0.72rem;
    font-family: 'IBM Plex Mono', monospace;
  }

  .input-note {
    color: #52606d;
  }

  .token-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr));
    gap: 10px;
    align-content: start;
    min-height: 182px;
    padding: 12px;
    border-radius: 20px;
    border: 1px dashed rgba(var(--accent-rgb), 0.24);
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.08), rgba(255, 255, 255, 0.46));
  }

  .token {
    aspect-ratio: 1;
    border-radius: 14px;
    background:
      linear-gradient(180deg, rgba(var(--accent-rgb), 0.92), rgba(var(--accent-rgb), 0.72));
    box-shadow: inset 0 0 0 1px rgba(255, 248, 236, 0.26);
  }

  .token.focus {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #fff1d2, rgba(var(--accent-rgb), 0.86));
  }

  .cls-token {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 50px;
    height: 50px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: #17222c;
    color: #fff9f0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .meta {
    border-radius: 18px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.66);
    border: 1px solid rgba(23, 34, 44, 0.08);
    display: grid;
    gap: 6px;
  }

  .meta span {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #7f6344;
  }

  .meta strong {
    letter-spacing: -0.03em;
  }

  .mechanism-box {
    border-radius: 20px;
    border: 1px dashed rgba(var(--accent-rgb), 0.28);
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.08), rgba(255, 255, 255, 0.52));
    padding: 18px;
    display: grid;
    gap: 18px;
    min-height: 182px;
    align-content: start;
  }

  .mechanism-box p {
    color: #52606d;
  }

  .mesh {
    position: relative;
    min-height: 108px;
  }

  .mesh span {
    position: absolute;
    inset: 0;
    border-radius: 18px;
    border: 1px solid rgba(var(--accent-rgb), calc(0.14 + (var(--i) * 0.03)));
    transform:
      translate(calc((var(--i) - 5) * 5px), calc((var(--i) - 5) * 2px))
      scale(calc(1 - (var(--i) * 0.04)));
  }

  .scale-stack {
    display: grid;
    gap: 14px;
    padding-top: 6px;
  }

  .scale-layer {
    height: 34px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.9), rgba(var(--accent-rgb), 0.35));
  }

  .scale-layer.large {
    width: 100%;
  }

  .scale-layer.medium {
    width: 72%;
  }

  .scale-layer.small {
    width: 44%;
  }

  .memory-bank {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .memory-slot {
    min-width: 54px;
    min-height: 54px;
    padding: 0 12px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: linear-gradient(180deg, #7d2f1d, rgba(var(--accent-rgb), 0.82));
    color: #fff5ec;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
  }

  .memory-slot.empty {
    background: rgba(23, 34, 44, 0.08);
    color: #52606d;
  }

  @media (max-width: 1180px) {
    .scene {
      grid-template-columns: 1fr;
    }

    .filmstrip {
      min-height: 120px;
    }
  }

  @media (max-width: 720px) {
    .scene {
      padding: 18px;
    }

    .meta-grid {
      grid-template-columns: 1fr;
    }

    .filmstrip {
      flex-wrap: wrap;
    }
  }
</style>
