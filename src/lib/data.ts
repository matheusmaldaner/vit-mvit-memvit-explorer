export type ArchitectureId = 'vit' | 'mvit' | 'memvit';
export type ArchitectureTab = ArchitectureId | 'compare';

export interface LegendItem {
  label: string;
  color: string;
}

export interface MetricItem {
  label: string;
  value: string;
  hint: string;
}

export interface StageSpec {
  id: string;
  title: string;
  short: string;
  tokens: string;
  channels: string;
  receptive: string;
  note: string;
  matrix: number[][];
  matrixLabels?: string[];
  tokenRows: number;
  tokenCols: number;
  filmstripFrames?: number;
  frameStates?: string[];
  frameLabels?: string[];
  tokenPattern?: string;
  mechanismVariant?: string;
  mechanismText?: string;
  memorySlots?: number;
}

export interface ArchitectureSpec {
  id: ArchitectureId;
  title: string;
  kicker: string;
  intro: string;
  accent: string;
  rgb: string;
  problem: {
    title: string;
    body: string;
  };
  callout: {
    title: string;
    body: string;
  };
  script: string[];
  inputLabel: string;
  bottomLine: string;
  metrics: MetricItem[];
  legend: LegendItem[];
  stages: StageSpec[];
}

const vitPatchify = [
  [1.0, 0.45, 0.12, 0.08],
  [0.48, 1.0, 0.16, 0.11],
  [0.14, 0.18, 1.0, 0.43],
  [0.1, 0.12, 0.46, 1.0],
];

const vitEmbed = [
  [1.0, 0.58, 0.22, 0.11],
  [0.62, 1.0, 0.28, 0.14],
  [0.24, 0.31, 1.0, 0.52],
  [0.12, 0.18, 0.57, 1.0],
];

const vitAttention = [
  [1.0, 0.72, 0.44, 0.36],
  [0.69, 1.0, 0.48, 0.38],
  [0.46, 0.51, 1.0, 0.68],
  [0.38, 0.42, 0.71, 1.0],
];

const vitReadout = [
  [1.0, 0.83, 0.77, 0.69],
  [0.54, 1.0, 0.31, 0.24],
  [0.48, 0.34, 1.0, 0.29],
  [0.43, 0.25, 0.27, 1.0],
];

const mvitTubelet = [
  [1.0, 0.51, 0.19, 0.1],
  [0.47, 1.0, 0.27, 0.13],
  [0.21, 0.32, 1.0, 0.49],
  [0.12, 0.17, 0.54, 1.0],
];

const mvitStage1 = [
  [1.0, 0.63, 0.28, 0.15],
  [0.58, 1.0, 0.36, 0.21],
  [0.24, 0.41, 1.0, 0.55],
  [0.16, 0.23, 0.6, 1.0],
];

const mvitStage2 = [
  [1.0, 0.64, 0.32],
  [0.57, 1.0, 0.51],
  [0.34, 0.58, 1.0],
];

const mvitStage3 = [
  [1.0, 0.74],
  [0.68, 1.0],
];

const memvitWindow = [
  [1.0, 0.36, 0.2, 0.11],
  [0.29, 1.0, 0.33, 0.16],
  [0.19, 0.34, 1.0, 0.46],
  [0.11, 0.17, 0.44, 1.0],
];

const memvitCache = [
  [1.0, 0.42, 0.25, 0.16, 0.31, 0.29],
  [0.36, 1.0, 0.29, 0.21, 0.27, 0.32],
  [0.24, 0.33, 1.0, 0.49, 0.41, 0.37],
  [0.14, 0.21, 0.46, 1.0, 0.58, 0.54],
  [0.28, 0.25, 0.37, 0.63, 1.0, 0.69],
  [0.26, 0.29, 0.34, 0.55, 0.66, 1.0],
];

const memvitCompress = [
  [1.0, 0.39, 0.24, 0.16, 0.42],
  [0.34, 1.0, 0.31, 0.18, 0.47],
  [0.21, 0.28, 1.0, 0.51, 0.58],
  [0.14, 0.19, 0.49, 1.0, 0.63],
  [0.38, 0.44, 0.57, 0.68, 1.0],
];

const memvitAttend = [
  [1.0, 0.48, 0.29, 0.18, 0.52, 0.67],
  [0.37, 1.0, 0.34, 0.2, 0.44, 0.58],
  [0.24, 0.32, 1.0, 0.55, 0.63, 0.47],
  [0.16, 0.22, 0.52, 1.0, 0.71, 0.43],
  [0.41, 0.39, 0.61, 0.76, 1.0, 0.74],
  [0.55, 0.47, 0.42, 0.34, 0.69, 1.0],
];

export const architectures: Record<ArchitectureId, ArchitectureSpec> = {
  vit: {
    id: 'vit',
    title: 'ViT',
    kicker: 'Single-scale baseline',
    intro:
      'ViT treats an image or video frame stack as a flat set of patch tokens. This artifact shows a 16-token toy view for readability, while the key idea is that the model keeps one patch scale through the stack and uses global self-attention to connect every patch to every other patch.',
    accent: '#d48331',
    rgb: '212, 131, 49',
    problem: {
      title: 'ViT is clean and global, but it stays flat.',
      body:
        'That simplicity is what makes ViT a useful baseline. In one paper-style video example, an 8 x 224 x 224 input with 1 x 16 x 16 non-overlapping patches would produce 8 x 14 x 14 tokens, but the artifact compresses that to 16 visible tokens so the flat-scale behavior stays easy to read.',
    },
    callout: {
      title: 'What to notice',
      body:
        'The important idea in ViT is not just that it uses attention. It is that the model keeps one patch scale all the way through, so the representation stays wide rather than hierarchical. The token counts drawn here are illustrative rather than paper-exact.',
    },
    script: [
      'The visible grid is intentionally reduced to 16 tokens so the flat layout is easy to inspect.',
      'A paper-style video example can use 1 x 16 x 16 non-overlapping patches, yielding 8 x 14 x 14 tokens from an 8 x 224 x 224 input.',
      'Global attention allows any patch token to exchange information with any other patch token.',
    ],
    inputLabel: 'Image patches',
    bottomLine: 'Strength: simple global context. Limitation: no hierarchy and weak scaling to long videos.',
    metrics: [
      { label: 'Toy View', value: '16 tokens', hint: 'Visible here for readability' },
      { label: 'Patch Size', value: '1 x 16 x 16', hint: 'Non-overlapping example patches' },
      { label: 'Example Grid', value: '8 x 14 x 14', hint: 'From 8 x 224 x 224 input' },
    ],
    legend: [
      { label: 'Patch token', color: '#d48331' },
      { label: 'CLS / readout', color: '#17222c' },
      { label: 'Highlighted interaction', color: '#f1c27a' },
    ],
    stages: [
      {
        id: 'patchify',
        title: 'Patchify',
        short: 'Image becomes 16 patches',
        tokens: '16 tokens',
        channels: 'd = 768',
        receptive: 'Local patch only',
        note: 'The image is split into fixed square patches before any attention happens. The 16 visible tiles are a toy view of a much larger possible token grid.',
        matrix: vitPatchify,
        matrixLabels: ['p0', 'p1', 'p2', 'p3'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 1,
        frameStates: ['neutral'],
        frameLabels: ['image'],
        tokenPattern: 'grid',
        mechanismVariant: 'patch-grid',
        mechanismText: 'A single image is cut into equal tiles, each becoming one token.',
      },
      {
        id: 'embed',
        title: 'Embedding + Position',
        short: 'Patch identity plus order',
        tokens: '16 + CLS',
        channels: 'd = 768',
        receptive: 'Token identity + position',
        note: 'Positional information preserves where each patch came from inside the image grid, even though the artifact is only showing a compact illustrative token layout.',
        matrix: vitEmbed,
        matrixLabels: ['p0', 'p1', 'p2', 'p3'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 1,
        frameStates: ['focus'],
        frameLabels: ['ordered'],
        tokenPattern: 'position',
        mechanismVariant: 'position-encoding',
        mechanismText: 'Patch content is now paired with positional signals so the model knows where each token belongs.',
      },
      {
        id: 'attention',
        title: 'Global Attention',
        short: 'All patches can interact',
        tokens: '16 + CLS',
        channels: 'd = 768',
        receptive: 'Whole image',
        note: 'Self-attention spreads information across the full image instead of staying local. The visual matrix is schematic but the all-to-all behavior is the important part.',
        matrix: vitAttention,
        matrixLabels: ['q0', 'q1', 'q2', 'q3'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 1,
        frameStates: ['focus'],
        frameLabels: ['global'],
        tokenPattern: 'attention',
        mechanismVariant: 'global-attention',
        mechanismText: 'Attention creates a dense interaction field so every patch can influence any other patch.',
      },
      {
        id: 'readout',
        title: 'Classification Readout',
        short: 'CLS summarizes the scene',
        tokens: 'CLS + pooled evidence',
        channels: 'd = 768',
        receptive: 'Whole image summary',
        note: 'The readout token collects information from the entire image and feeds the final decision head. The simplified token count here is only meant to show the final aggregation step clearly.',
        matrix: vitReadout,
        matrixLabels: ['cls', 'fg', 'edge', 'bg'],
        tokenRows: 2,
        tokenCols: 2,
        filmstripFrames: 1,
        frameStates: ['focus'],
        frameLabels: ['summary'],
        tokenPattern: 'readout',
        mechanismVariant: 'cls-readout',
        mechanismText: 'The final prediction comes from a compact summary token rather than every patch individually.',
      },
    ],
  },
  mvit: {
    id: 'mvit',
    title: 'MViT',
    kicker: 'Multiscale video transformer',
    intro:
      'MViT keeps transformer attention, but it stops treating every layer as a flat token table. The representation becomes hierarchical: token resolution shrinks while channel capacity grows. This artifact compresses the real token counts into small grids so the stage-to-stage changes stay visible.',
    accent: '#1f8f88',
    rgb: '31, 143, 136',
    problem: {
      title: 'Video needs hierarchy to stay efficient.',
      body:
        'A flat ViT-style token table becomes expensive when space and time both grow. In the paper-style setup referenced in feedback, MViT uses overlapping patch embedding with kernel (3, 7, 7) and stride (2, 4, 4), which yields an 8 x 56 x 56 token grid from a 16 x 224 x 224 input clip before deeper multiscale processing.',
    },
    callout: {
      title: 'What to notice',
      body:
        'The key shift is not abandoning attention. It is reorganizing attention around a pyramid: early stages are dense and detailed, later stages are coarse and semantic. The 4 x 4, 3 x 3, and 2 x 2 grids shown here are simplified illustrations of that shrinkage.',
    },
    script: [
      'The paper-style patch embed uses overlapping kernel (3, 7, 7) and stride (2, 4, 4).',
      'That produces an example 8 x 56 x 56 token grid from a 16 x 224 x 224 input clip before the later multiscale stages.',
      'The smaller grids in this artifact are toy views that make the hierarchy legible on one screen.',
    ],
    inputLabel: 'Input Clip Window',
    bottomLine: 'Strength: multiscale efficiency. Limitation: temporal context is still bounded by the current clip.',
    metrics: [
      { label: 'Patch Kernel', value: '(3, 7, 7)', hint: 'Overlapping patch embed' },
      { label: 'Patch Stride', value: '(2, 4, 4)', hint: 'Temporal and spatial overlap' },
      { label: 'Example Grid', value: '8 x 56 x 56', hint: 'From 16 x 224 x 224 clip' },
    ],
    legend: [
      { label: 'Fine token', color: '#1f8f88' },
      { label: 'Coarse token', color: '#92d0cb' },
      { label: 'Expanded channel depth', color: '#173d45' },
    ],
    stages: [
      {
        id: 'tubelet',
        title: 'Tubelet Patch Embed',
        short: 'Video becomes space-time tokens',
        tokens: '4 x 4 toy tokens per clip view',
        channels: 'd = 96',
        receptive: 'Small local cubes',
        note: 'The model starts from a short clip and forms tokens from small space-time tubelets. The artifact draws a compact toy grid instead of the much larger paper-scale token grid.',
        matrix: mvitTubelet,
        matrixLabels: ['t0', 't1', 't2', 't3'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        frameStates: ['focus', 'neutral', 'neutral', 'neutral'],
        frameLabels: ['t0', 't1', 't2', 't3'],
        tokenPattern: 'dense',
        mechanismVariant: 'tubelet-stack',
        mechanismText: 'Short video cubes are embedded into tokens before the multiscale stages begin.',
      },
      {
        id: 'stage1',
        title: 'Stage 1 MHPA Pool',
        short: 'Dense toy view before pooling',
        tokens: '16 toy visible tokens',
        channels: 'd = 96',
        receptive: 'Fine local detail',
        note: 'This toy view shows the dense early-stage representation before aggressive resolution reduction. The visible 4 x 4 layout is a teaching simplification rather than an exact per-layer token count.',
        matrix: mvitStage1,
        matrixLabels: ['s0', 's1', 's2', 's3'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        frameStates: ['current', 'focus', 'current', 'current'],
        frameLabels: ['t0', 't1', 't2', 't3'],
        tokenPattern: 'dense-focus',
        mechanismVariant: 'stage-dense',
        mechanismText: 'This panel is the pre-pool toy view for the early MHPA stage, where the model still preserves dense local detail.',
      },
      {
        id: 'stage2',
        title: 'Stage 2 MLP Widen',
        short: 'Pooled tokens, wider channels',
        tokens: '9 toy pooled tokens',
        channels: 'd = 192',
        receptive: 'Larger neighborhoods',
        note: 'Resolution has dropped and the channel dimension has widened, making each token more semantic than before. The 3 x 3 view is a schematic stand-in for a much larger pooled representation.',
        matrix: mvitStage2,
        matrixLabels: ['c0', 'c1', 'c2'],
        tokenRows: 3,
        tokenCols: 3,
        filmstripFrames: 4,
        frameStates: ['past', 'current', 'focus', 'current'],
        frameLabels: ['t0', 't1', 't2', 't3'],
        tokenPattern: 'pooled',
        mechanismVariant: 'stage-pool',
        mechanismText: 'This toy stage summarizes the widen step: after pooling reduces the token map, the MLP can expand channel capacity so information richness keeps growing.',
      },
      {
        id: 'stage3',
        title: 'Stage 3 Coarse Context',
        short: 'Fewer, richer tokens',
        tokens: '4 toy coarse tokens',
        channels: 'd = 384',
        receptive: 'Broad clip context',
        note: 'Late-stage tokens summarize much larger parts of the clip, so the representation becomes compact and semantic. The artifact uses four coarse tokens simply to make that transition easy to see.',
        matrix: mvitStage3,
        matrixLabels: ['g0', 'g1'],
        tokenRows: 2,
        tokenCols: 2,
        filmstripFrames: 4,
        frameStates: ['past', 'past', 'current', 'focus'],
        frameLabels: ['t0', 't1', 't2', 't3'],
        tokenPattern: 'coarse',
        mechanismVariant: 'stage-coarse',
        mechanismText: 'The deepest stage works with only a few tokens, but each one already summarizes large space-time regions.',
      },
    ],
  },
  memvit: {
    id: 'memvit',
    title: 'MeMViT',
    kicker: 'Memory-augmented MViT',
    intro:
      'MeMViT keeps the multiscale MViT backbone and adds memory. Current queries can attend not only to the present clip window, but also to cached keys and values from earlier windows.',
    accent: '#d25737',
    rgb: '210, 87, 55',
    problem: {
      title: 'Long videos need more than a bigger input window.',
      body:
        'Instead of feeding a huge video chunk at once, MeMViT processes windows online and keeps relevant information available as memory.',
    },
    callout: {
      title: 'What to notice',
      body:
        'MeMViT is easiest to understand as MViT plus a memory bank. The current window, cached memory, and compressed memory shown here are schematic panels meant to explain the behavior, not exact paper memory sizes.',
    },
    script: [
      'The current clip window is still processed with an MViT-style hierarchy.',
      'Past keys and values are cached rather than discarded.',
      'Compression keeps that memory useful without letting compute grow like a full long-context attention map.',
    ],
    inputLabel: 'Online video stream',
    bottomLine: 'Strength: longer temporal context with modest extra cost. Key idea: cache and compress past keys and values.',
    metrics: [
      { label: 'Spatial Tokens', value: 'Hierarchical', hint: 'Inherited from MViT' },
      { label: 'Temporal Reach', value: 'Extended', hint: 'Past windows remain available' },
      { label: 'Backbone Feel', value: 'Memory-aware', hint: 'Current window + cached K/V' },
    ],
    legend: [
      { label: 'Current-window token', color: '#d25737' },
      { label: 'Cached memory token', color: '#7d2f1d' },
      { label: 'Compressed memory', color: '#f1b39d' },
    ],
    stages: [
      {
        id: 'window',
        title: 'Current Window',
        short: 'Process one clip now',
        tokens: 'Current window tokens',
        channels: 'MViT base stages',
        receptive: 'Current clip only',
        note: 'The model begins with the current clip window, just like a standard short-context video backbone.',
        matrix: memvitWindow,
        matrixLabels: ['q0', 'q1', 'q2', 'q3'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        frameStates: ['current', 'current', 'current', 'focus'],
        frameLabels: ['w-3', 'w-2', 'w-1', 'now'],
        tokenPattern: 'current',
        mechanismVariant: 'memory-empty',
        mechanismText: 'At the start of a sequence, only the current clip contributes context.',
        memorySlots: 0,
      },
      {
        id: 'cache',
        title: 'Cache K / V',
        short: 'Past becomes memory',
        tokens: 'Current + cached memory',
        channels: 'Hierarchical K / V',
        receptive: 'Current plus recent past',
        note: 'Keys and values from older windows are saved so later windows can look backward in time.',
        matrix: memvitCache,
        matrixLabels: ['q0', 'q1', 'q2', 'q3', 'p0', 'p1'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        frameStates: ['past', 'past', 'current', 'focus'],
        frameLabels: ['old', 'past', 'recent', 'now'],
        tokenPattern: 'memory',
        mechanismVariant: 'memory-fill',
        mechanismText: 'Earlier windows are no longer visible in the main clip, but their keys and values remain available in memory.',
        memorySlots: 4,
      },
      {
        id: 'compress',
        title: 'Compress Memory',
        short: 'Pool memory before reuse',
        tokens: 'Current + compressed memory',
        channels: 'Compressed K / V',
        receptive: 'Longer but efficient',
        note: 'Past memory is compressed so the model can remember more time without replaying every old token in full detail.',
        matrix: memvitCompress,
        matrixLabels: ['q0', 'q1', 'q2', 'q3', 'c0'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        frameStates: ['past', 'past', 'past', 'focus'],
        frameLabels: ['mem 0', 'mem 1', 'compress', 'now'],
        tokenPattern: 'compressed',
        mechanismVariant: 'memory-compress',
        mechanismText: 'Compression reduces the size of the memory bank while preserving useful long-range structure.',
        memorySlots: 3,
      },
      {
        id: 'attend',
        title: 'Attend Across Time',
        short: 'Current queries look back',
        tokens: 'Current and memory together',
        channels: 'Hierarchical MViT features',
        receptive: 'Current plus longer past',
        note: 'Current queries now attend to both the present window and the memory bank, extending temporal support across windows.',
        matrix: memvitAttend,
        matrixLabels: ['q0', 'q1', 'q2', 'q3', 'm0', 'm1'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        frameStates: ['past', 'memory', 'current', 'focus'],
        frameLabels: ['old', 'memory', 'recent', 'now'],
        tokenPattern: 'attend',
        mechanismVariant: 'memory-attend',
        mechanismText: 'This is the core MeMViT step: present-time queries can retrieve information from compressed memory.',
        memorySlots: 5,
      },
    ],
  },
};

export const architectureOrder: ArchitectureId[] = ['vit', 'mvit', 'memvit'];
