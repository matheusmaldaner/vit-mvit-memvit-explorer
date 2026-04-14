<script lang="ts">
  import type { ArchitectureSpec } from '../data';

  export let architecture: ArchitectureSpec;
  export let stageIndex = 0;

  $: stage = architecture.stages[stageIndex];
  $: tokenCount = stage.tokenRows * stage.tokenCols;
  $: frameCount = stage.filmstripFrames ?? 1;

  function frameState(index: number) {
    return stage.frameStates?.[index] ?? 'neutral';
  }

  function frameLabel(index: number) {
    return stage.frameLabels?.[index] ?? (frameCount === 1 ? 'image' : `t + ${index}`);
  }

  function tokenClass(index: number) {
    const classes = ['token'];
    const pattern = stage.tokenPattern ?? 'grid';

    if (pattern === 'position') {
      classes.push('position');
      if (index % stage.tokenCols === 0 || index < stage.tokenCols) classes.push('focus');
    } else if (pattern === 'attention') {
      classes.push('attention');
      if ([0, 5, 10, 15].includes(index)) classes.push('focus');
      else classes.push('soft');
    } else if (pattern === 'readout') {
      classes.push('readout');
      if (index === 0) classes.push('focus');
      else classes.push('soft');
    } else if (pattern === 'dense-focus') {
      if ([1, 4, 5, 6, 9].includes(index)) classes.push('focus');
    } else if (pattern === 'pooled') {
      classes.push('pooled');
      if ([0, 2, 4, 6, 8].includes(index)) classes.push('focus');
    } else if (pattern === 'coarse') {
      classes.push('coarse');
      if (index === 0 || index === 3) classes.push('focus');
    } else if (pattern === 'memory') {
      if (index >= tokenCount - 4) classes.push('memory');
      if ([1, 6, 10].includes(index)) classes.push('focus');
    } else if (pattern === 'compressed') {
      if (index >= tokenCount - 3) classes.push('compressed');
      if ([3, 7, 15].includes(index)) classes.push('focus');
    } else if (pattern === 'attend') {
      if (index >= tokenCount - 5) classes.push('memory');
      if ([0, 5, 10, 15].includes(index)) classes.push('focus');
    }

    return classes.join(' ');
  }
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
        <div class={`frame ${frameState(frameIndex)}`} style={`--offset:${frameIndex};`}>
          <div class="frame-grid"></div>
          {#if architecture.id === 'vit' && stage.id === 'attention'}
            <div class="frame-rays">
              <span></span><span></span><span></span>
            </div>
          {/if}
          {#if architecture.id === 'vit' && stage.id === 'embed'}
            <div class="frame-dots">
              {#each Array(4) as _, index}
                <i style={`--i:${index};`}></i>
              {/each}
            </div>
          {/if}
          <div class="frame-caption">{frameLabel(frameIndex)}</div>
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

    <div class={`token-grid ${stage.tokenPattern ?? 'grid'}`}>
      {#each Array(tokenCount) as _, index}
        <div class={tokenClass(index)}>
          {#if stage.tokenPattern === 'memory' && index >= tokenCount - 4}
            <small>M</small>
          {:else if stage.tokenPattern === 'compressed' && index >= tokenCount - 3}
            <small>C</small>
          {:else if stage.tokenPattern === 'attend' && index >= tokenCount - 5}
            <small>K/V</small>
          {/if}
        </div>
      {/each}

      {#if stage.tokenPattern === 'attention'}
        <div class="attention-links">
          <span class="horizontal"></span>
          <span class="vertical"></span>
          <span class="diag"></span>
        </div>
      {/if}

      {#if stage.tokenPattern === 'readout'}
        <div class="readout-core">CLS</div>
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
      <span class="eyebrow">{architecture.id === 'memvit' ? 'Memory View' : 'Structure Shift'}</span>
      <h3>{stage.title}</h3>
    </div>

    <div class="mechanism-box">
      {#if stage.mechanismVariant === 'patch-grid'}
        <div class="micro-grid">
          {#each Array(16) as _, index}
            <i class:focus={index % 5 === 0}></i>
          {/each}
        </div>
      {:else if stage.mechanismVariant === 'position-encoding'}
        <div class="micro-grid positions">
          {#each Array(9) as _, index}
            <i></i>
          {/each}
          <span class="pin p1">1</span>
          <span class="pin p2">2</span>
          <span class="pin p3">3</span>
        </div>
      {:else if stage.mechanismVariant === 'global-attention'}
        <div class="attention-star">
          <span class="node n0"></span>
          <span class="node n1"></span>
          <span class="node n2"></span>
          <span class="node n3"></span>
          <span class="beam b0"></span>
          <span class="beam b1"></span>
          <span class="beam b2"></span>
          <span class="beam b3"></span>
        </div>
      {:else if stage.mechanismVariant === 'cls-readout'}
        <div class="cls-readout">
          <div class="chip tl"></div>
          <div class="chip tr"></div>
          <div class="chip bl"></div>
          <div class="chip br"></div>
          <div class="summary">CLS</div>
        </div>
      {:else if stage.mechanismVariant === 'tubelet-stack'}
        <div class="tubelet-stack">
          {#each Array(4) as _, index}
            <div class="tubelet" style={`--i:${index};`}>t{index}</div>
          {/each}
        </div>
      {:else if stage.mechanismVariant === 'stage-dense'}
        <div class="band-stack">
          <div class="band b0"></div>
          <div class="band b1"></div>
          <div class="band b2"></div>
          <div class="band b3"></div>
        </div>
      {:else if stage.mechanismVariant === 'stage-pool'}
        <div class="pool-funnel">
          <div class="pool-row wide">
            {#each Array(4) as _}
              <i></i>
            {/each}
          </div>
          <div class="funnel-arrow"></div>
          <div class="pool-row narrow">
            {#each Array(3) as _}
              <i></i>
            {/each}
          </div>
        </div>
      {:else if stage.mechanismVariant === 'stage-coarse'}
        <div class="coarse-layout">
          <div class="coarse-grid">
            {#each Array(4) as _, index}
              <i class:focus={index === 0 || index === 3}></i>
            {/each}
          </div>
          <div class="channel-bars">
            <span></span><span></span><span></span>
          </div>
        </div>
      {:else if stage.mechanismVariant === 'memory-empty'}
        <div class="memory-layout">
          <div class="current-query">Current</div>
          <div class="memory-bank empty"><span>No memory yet</span></div>
        </div>
      {:else if stage.mechanismVariant === 'memory-fill'}
        <div class="memory-layout">
          <div class="current-query">Current</div>
          <div class="memory-bank">
            {#each Array(stage.memorySlots ?? 0) as _, index}
              <i>{index + 1}</i>
            {/each}
          </div>
        </div>
      {:else if stage.mechanismVariant === 'memory-compress'}
        <div class="compress-layout">
          <div class="memory-bank source">
            {#each Array(4) as _, index}
              <i>{index + 1}</i>
            {/each}
          </div>
          <div class="compress-arrow"></div>
          <div class="memory-bank compact">
            {#each Array(2) as _, index}
              <i>C{index + 1}</i>
            {/each}
          </div>
        </div>
      {:else if stage.mechanismVariant === 'memory-attend'}
        <div class="attend-layout">
          <div class="query-column">
            <span>Q</span><span>Q</span><span>Q</span>
          </div>
          <div class="attend-links">
            <i></i><i></i><i></i>
          </div>
          <div class="memory-bank">
            <i>M1</i><i>M2</i><i>M3</i>
          </div>
        </div>
      {/if}

      <p>{stage.mechanismText}</p>
    </div>
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
      linear-gradient(135deg, rgba(var(--accent-rgb), 0.32), rgba(255, 255, 255, 0.08)),
      linear-gradient(180deg, rgba(23, 34, 44, 0.18), transparent),
      radial-gradient(circle at 30% 28%, rgba(255, 255, 255, 0.58), transparent 30%),
      linear-gradient(160deg, #2b3945 0%, #131d25 100%);
    transform: translateY(calc(var(--offset) * 4px));
  }

  .frame.neutral {
    opacity: 0.84;
  }

  .frame.focus {
    box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.28);
  }

  .frame.current {
    box-shadow: inset 0 0 0 1px rgba(255, 248, 236, 0.25);
  }

  .frame.past,
  .frame.memory {
    filter: saturate(0.65) brightness(0.9);
  }

  .frame-grid {
    position: absolute;
    inset: 14px;
    border: 1px solid rgba(255, 248, 236, 0.35);
    border-radius: 12px;
    background:
      linear-gradient(90deg, rgba(255, 248, 236, 0.12) 25%, transparent 25%, transparent 50%, rgba(255, 248, 236, 0.12) 50%, rgba(255, 248, 236, 0.12) 75%, transparent 75%),
      linear-gradient(rgba(255, 248, 236, 0.12) 25%, transparent 25%, transparent 50%, rgba(255, 248, 236, 0.12) 50%, rgba(255, 248, 236, 0.12) 75%, transparent 75%);
    background-size: 25% 100%, 100% 25%;
  }

  .frame-rays,
  .frame-dots {
    position: absolute;
    inset: 24px;
  }

  .frame-rays span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 72%;
    height: 2px;
    background: rgba(255, 248, 236, 0.58);
    transform-origin: left center;
  }

  .frame-rays span:nth-child(1) {
    transform: rotate(-28deg);
  }

  .frame-rays span:nth-child(2) {
    transform: rotate(18deg);
  }

  .frame-rays span:nth-child(3) {
    transform: rotate(58deg);
  }

  .frame-dots i {
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: rgba(255, 251, 244, 0.9);
    color: #17222c;
    border: 1px solid rgba(var(--accent-rgb), 0.3);
  }

  .frame-dots i::after {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.6);
  }

  .frame-dots i:nth-child(1) { top: 8%; left: 12%; }
  .frame-dots i:nth-child(2) { top: 24%; right: 18%; }
  .frame-dots i:nth-child(3) { bottom: 18%; left: 24%; }
  .frame-dots i:nth-child(4) { bottom: 8%; right: 12%; }

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
    position: relative;
    aspect-ratio: 1;
    border-radius: 14px;
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.92), rgba(var(--accent-rgb), 0.72));
    box-shadow: inset 0 0 0 1px rgba(255, 248, 236, 0.26);
    transition: transform 180ms ease;
  }

  .token.focus {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #fff1d2, rgba(var(--accent-rgb), 0.86));
  }

  .token.soft {
    opacity: 0.74;
  }

  .token.position::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 248, 236, 0.82);
  }

  .token.memory {
    background: linear-gradient(180deg, #7d2f1d, rgba(var(--accent-rgb), 0.8));
  }

  .token.compressed {
    background: linear-gradient(180deg, #f4c1ae, rgba(var(--accent-rgb), 0.6));
  }

  .token.coarse {
    border-radius: 22px;
  }

  .token small {
    position: absolute;
    bottom: 6px;
    right: 6px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.56rem;
    color: #fff8f1;
  }

  .readout-core {
    position: absolute;
    inset: 50% auto auto 50%;
    width: 58px;
    height: 58px;
    transform: translate(-50%, -50%);
    border-radius: 18px;
    display: grid;
    place-items: center;
    background: #17222c;
    color: #fff9f0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem;
    box-shadow: 0 10px 20px rgba(23, 34, 44, 0.22);
  }

  .attention-links {
    position: absolute;
    inset: 18px;
    pointer-events: none;
  }

  .attention-links span {
    position: absolute;
    background: rgba(255, 248, 236, 0.62);
    border-radius: 999px;
  }

  .attention-links .horizontal {
    top: 30%;
    left: 8%;
    width: 78%;
    height: 2px;
  }

  .attention-links .vertical {
    top: 12%;
    left: 46%;
    width: 2px;
    height: 76%;
  }

  .attention-links .diag {
    top: 20%;
    left: 18%;
    width: 62%;
    height: 2px;
    transform: rotate(34deg);
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

  .micro-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .micro-grid i,
  .coarse-grid i,
  .pool-row i {
    display: block;
    aspect-ratio: 1;
    border-radius: 10px;
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.88), rgba(var(--accent-rgb), 0.62));
  }

  .micro-grid i.focus,
  .coarse-grid i.focus {
    background: linear-gradient(180deg, #fff1d2, rgba(var(--accent-rgb), 0.82));
  }

  .micro-grid.positions {
    position: relative;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .pin {
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: rgba(255, 251, 244, 0.94);
    border: 1px solid rgba(var(--accent-rgb), 0.24);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem;
  }

  .pin.p1 { top: -8px; left: -8px; }
  .pin.p2 { top: 18%; right: -10px; }
  .pin.p3 { bottom: -8px; left: 42%; }

  .attention-star {
    position: relative;
    min-height: 120px;
  }

  .node {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.9);
    box-shadow: 0 0 0 6px rgba(var(--accent-rgb), 0.12);
  }

  .node.n0 { top: 10%; left: 14%; }
  .node.n1 { top: 18%; right: 16%; }
  .node.n2 { bottom: 18%; left: 26%; }
  .node.n3 { bottom: 10%; right: 22%; }

  .beam {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 44%;
    height: 2px;
    background: rgba(var(--accent-rgb), 0.42);
    transform-origin: left center;
  }

  .beam.b0 { transform: rotate(-154deg); }
  .beam.b1 { transform: rotate(-26deg); }
  .beam.b2 { transform: rotate(132deg); }
  .beam.b3 { transform: rotate(24deg); }

  .cls-readout {
    position: relative;
    min-height: 120px;
  }

  .chip,
  .summary {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.88), rgba(var(--accent-rgb), 0.64));
  }

  .chip.tl { top: 6%; left: 14%; }
  .chip.tr { top: 6%; right: 14%; }
  .chip.bl { bottom: 8%; left: 24%; }
  .chip.br { bottom: 8%; right: 24%; }

  .summary {
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    background: #17222c;
    color: #fff9f0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem;
    width: 62px;
    height: 62px;
  }

  .tubelet-stack {
    display: grid;
    gap: 10px;
  }

  .tubelet {
    border-radius: 14px;
    padding: 0.7rem 0.9rem;
    background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.85), rgba(var(--accent-rgb), 0.3));
    color: #fff8f1;
    font-family: 'IBM Plex Mono', monospace;
    transform: translateX(calc(var(--i) * 6px));
  }

  .band-stack {
    display: grid;
    gap: 10px;
  }

  .band {
    height: 20px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.9), rgba(var(--accent-rgb), 0.36));
  }

  .band.b0 { width: 100%; }
  .band.b1 { width: 86%; }
  .band.b2 { width: 70%; }
  .band.b3 { width: 54%; }

  .pool-funnel,
  .compress-layout,
  .memory-layout,
  .attend-layout {
    display: grid;
    gap: 12px;
    align-content: start;
  }

  .pool-row {
    display: grid;
    gap: 10px;
  }

  .pool-row.wide {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .pool-row.narrow {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 74%;
    margin: 0 auto;
  }

  .funnel-arrow,
  .compress-arrow {
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 18px solid rgba(var(--accent-rgb), 0.55);
    justify-self: center;
  }

  .coarse-layout {
    display: grid;
    gap: 14px;
  }

  .coarse-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .coarse-grid i {
    border-radius: 18px;
  }

  .channel-bars {
    display: grid;
    gap: 8px;
  }

  .channel-bars span {
    display: block;
    height: 12px;
    border-radius: 999px;
    background: linear-gradient(90deg, #173d45, rgba(var(--accent-rgb), 0.4));
  }

  .memory-bank {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .memory-bank i,
  .current-query {
    min-width: 56px;
    min-height: 56px;
    padding: 0 12px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: linear-gradient(180deg, #7d2f1d, rgba(var(--accent-rgb), 0.82));
    color: #fff5ec;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78rem;
    font-style: normal;
  }

  .current-query {
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.92), rgba(var(--accent-rgb), 0.66));
  }

  .memory-bank.empty {
    min-height: 56px;
    border-radius: 16px;
    border: 1px dashed rgba(var(--accent-rgb), 0.24);
    display: grid;
    place-items: center;
    color: #52606d;
    background: rgba(255, 255, 255, 0.48);
  }

  .memory-bank.compact i {
    background: linear-gradient(180deg, #f4c1ae, rgba(var(--accent-rgb), 0.62));
    color: #3e231c;
  }

  .attend-layout {
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }

  .query-column {
    display: grid;
    gap: 10px;
  }

  .query-column span {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.92), rgba(var(--accent-rgb), 0.66));
    color: #fff8f1;
    font-family: 'IBM Plex Mono', monospace;
  }

  .attend-links {
    position: relative;
    min-height: 120px;
  }

  .attend-links i {
    position: absolute;
    left: 12%;
    right: 12%;
    height: 2px;
    background: rgba(var(--accent-rgb), 0.42);
    display: block;
    transform-origin: left center;
  }

  .attend-links i:nth-child(1) { top: 24%; transform: rotate(-12deg); }
  .attend-links i:nth-child(2) { top: 50%; transform: rotate(4deg); }
  .attend-links i:nth-child(3) { top: 76%; transform: rotate(14deg); }

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

    .attend-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
