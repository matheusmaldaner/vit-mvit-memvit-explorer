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
      'ViT treats an image as a flat set of patch tokens. The full model keeps that same token granularity through the stack and uses global self-attention to connect every patch to every other patch.',
    accent: '#d48331',
    rgb: '212, 131, 49',
    problem: {
      title: 'ViT is clean and global, but it stays flat.',
      body:
        'That simplicity is what makes ViT a useful baseline. The same design also means it does not build a multiscale hierarchy on its own.',
    },
    callout: {
      title: 'What to notice',
      body:
        'The important idea in ViT is not just that it uses attention. It is that the model keeps one patch scale all the way through, so the representation stays wide rather than hierarchical.',
    },
    script: [
      'The input image is split into equal-size patches.',
      'Each patch becomes a token, and the stack keeps that same spatial granularity.',
      'Global attention allows any patch to exchange information with any other patch.',
    ],
    inputLabel: 'Image patches',
    bottomLine: 'Strength: simple global context. Limitation: no hierarchy and weak scaling to long videos.',
    metrics: [
      { label: 'Spatial Tokens', value: 'Constant', hint: '16 patch tokens in the toy view' },
      { label: 'Temporal Reach', value: 'Single frame', hint: 'No built-in long memory' },
      { label: 'Backbone Feel', value: 'Flat', hint: 'Same token scale throughout' },
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
        note: 'The image is split into fixed square patches before any attention happens.',
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
        note: 'Positional information preserves where each patch came from inside the image grid.',
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
        note: 'Self-attention spreads information across the full image instead of staying local.',
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
        note: 'The readout token collects information from the entire image and feeds the final decision head.',
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
      'MViT keeps transformer attention, but it stops treating every layer as a flat token table. The representation becomes hierarchical: token resolution shrinks while channel capacity grows.',
    accent: '#1f8f88',
    rgb: '31, 143, 136',
    problem: {
      title: 'Video needs hierarchy to stay efficient.',
      body:
        'A flat ViT-style token table becomes expensive when space and time both grow. MViT responds by pooling through stages instead of staying at one scale.',
    },
    callout: {
      title: 'What to notice',
      body:
        'The key shift is not abandoning attention. It is reorganizing attention around a pyramid: early stages are dense and detailed, later stages are coarse and semantic.',
    },
    script: [
      'The input is now a short clip rather than a single frame.',
      'Early stages preserve detail with many tokens and smaller channels.',
      'Later stages use fewer, richer tokens that summarize larger space-time regions.',
    ],
    inputLabel: 'Short video clip',
    bottomLine: 'Strength: multiscale efficiency. Limitation: temporal context is still bounded by the current clip.',
    metrics: [
      { label: 'Spatial Tokens', value: 'Shrinking', hint: '16 -> 9 -> 4 in the toy view' },
      { label: 'Temporal Reach', value: 'Short clip', hint: 'Several frames, still finite' },
      { label: 'Backbone Feel', value: 'Hierarchical', hint: 'Pooling attention across stages' },
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
        tokens: '4 x 4 tokens per clip view',
        channels: 'd = 96',
        receptive: 'Small local cubes',
        note: 'The model starts from a short clip and forms tokens from small space-time tubelets.',
        matrix: mvitTubelet,
        matrixLabels: ['t0', 't1', 't2', 't3'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        frameStates: ['focus', 'neutral', 'neutral', 'neutral'],
        frameLabels: ['tubelet 0', 'tubelet 1', 'tubelet 2', 'tubelet 3'],
        tokenPattern: 'dense',
        mechanismVariant: 'tubelet-stack',
        mechanismText: 'Short video cubes are embedded into tokens before the multiscale stages begin.',
      },
      {
        id: 'stage1',
        title: 'Stage 1 MHPA',
        short: 'Dense early-stage attention',
        tokens: '16 visible tokens',
        channels: 'd = 96',
        receptive: 'Fine local detail',
        note: 'The first stage stays dense to preserve motion and appearance detail across the clip.',
        matrix: mvitStage1,
        matrixLabels: ['s0', 's1', 's2', 's3'],
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        frameStates: ['current', 'focus', 'current', 'current'],
        frameLabels: ['frame 0', 'frame 1', 'frame 2', 'frame 3'],
        tokenPattern: 'dense-focus',
        mechanismVariant: 'stage-dense',
        mechanismText: 'Early multiscale pooling attention still favors dense coverage so local detail is not lost too early.',
      },
      {
        id: 'stage2',
        title: 'Stage 2 Downsample',
        short: 'Pool and widen',
        tokens: '9 visible tokens',
        channels: 'd = 192',
        receptive: 'Larger neighborhoods',
        note: 'Resolution drops while channel richness grows, making each token more semantic than before.',
        matrix: mvitStage2,
        matrixLabels: ['c0', 'c1', 'c2'],
        tokenRows: 3,
        tokenCols: 3,
        filmstripFrames: 4,
        frameStates: ['past', 'current', 'focus', 'current'],
        frameLabels: ['early', 'mid', 'pool', 'late'],
        tokenPattern: 'pooled',
        mechanismVariant: 'stage-pool',
        mechanismText: 'Pooling reduces the token map, while wider channels preserve and enrich the information content.',
      },
      {
        id: 'stage3',
        title: 'Stage 3 Coarse Context',
        short: 'Fewer, richer tokens',
        tokens: '4 coarse tokens',
        channels: 'd = 384',
        receptive: 'Broad clip context',
        note: 'Late-stage tokens summarize much larger parts of the clip, so the representation becomes compact and semantic.',
        matrix: mvitStage3,
        matrixLabels: ['g0', 'g1'],
        tokenRows: 2,
        tokenCols: 2,
        filmstripFrames: 4,
        frameStates: ['past', 'past', 'current', 'focus'],
        frameLabels: ['coarse 0', 'coarse 1', 'coarse 2', 'coarse 3'],
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
        'MeMViT is easiest to understand as MViT plus a memory bank. The important visual change is that current processing and past context are now both visible at the same time.',
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
