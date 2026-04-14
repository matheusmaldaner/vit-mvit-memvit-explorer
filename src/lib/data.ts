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
  tokenRows: number;
  tokenCols: number;
  tokenAccent?: 'base' | 'focus' | 'memory';
  memorySlots?: number;
  filmstripFrames?: number;
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

const vitMatrix = [
  [1.0, 0.66, 0.18, 0.12],
  [0.62, 1.0, 0.22, 0.16],
  [0.31, 0.28, 1.0, 0.56],
  [0.18, 0.24, 0.67, 1.0],
];

const mvitMatrix = [
  [1.0, 0.58, 0.24, 0.12],
  [0.53, 1.0, 0.34, 0.2],
  [0.26, 0.39, 1.0, 0.52],
  [0.17, 0.26, 0.63, 1.0],
];

const memvitMatrix = [
  [0.74, 0.52, 0.29, 0.15, 0.43, 0.68],
  [0.4, 0.88, 0.31, 0.2, 0.24, 0.54],
  [0.18, 0.26, 1.0, 0.56, 0.49, 0.35],
  [0.11, 0.18, 0.58, 1.0, 0.66, 0.32],
  [0.3, 0.19, 0.54, 0.72, 1.0, 0.51],
  [0.51, 0.36, 0.31, 0.27, 0.48, 1.0],
];

export const architectures: Record<ArchitectureId, ArchitectureSpec> = {
  vit: {
    id: 'vit',
    title: 'ViT',
    kicker: 'Single-scale baseline',
    intro:
      'ViT flattens an image into a fixed set of patch tokens, then lets every patch attend to every other patch. It is elegant, global, and simple, but expensive to extend over long videos.',
    accent: '#d48331',
    rgb: '212, 131, 49',
    problem: {
      title: 'Global attention is clean, but the token count stays flat.',
      body:
        'That makes the model easy to explain and strong on images, but it gives us no hierarchy and no native way to stretch temporal context cheaply.',
    },
    callout: {
      title: 'Teaching angle',
      body:
        'Use ViT as the baseline your classmates already understand. The demo should make it obvious that the model sees an image as one wide field of equally sized patches.',
    },
    script: [
      'Start with one image and cut it into equal patches.',
      'Each patch becomes one token at a fixed resolution for the whole stack.',
      'Attention is global, so every patch can interact with every other patch immediately.',
    ],
    inputLabel: 'Image patches',
    bottomLine: 'Strength: simple global context. Limitation: no hierarchy and poor scaling to long videos.',
    metrics: [
      { label: 'Spatial Tokens', value: 'Constant', hint: '16 patch tokens in the toy demo' },
      { label: 'Temporal Reach', value: 'Single frame', hint: 'No built-in long memory' },
      { label: 'Backbone Feel', value: 'Flat', hint: 'Same token granularity throughout' },
    ],
    legend: [
      { label: 'Patch token', color: '#d48331' },
      { label: 'CLS / readout', color: '#17222c' },
      { label: 'Attention highlight', color: '#f1c27a' },
    ],
    stages: [
      {
        id: 'patchify',
        title: 'Patchify',
        short: '16 equal patches',
        tokens: '16 tokens',
        channels: 'd = 768',
        receptive: 'Local patch only',
        note: 'The image becomes a flat grid of patch tokens with no temporal dimension yet.',
        matrix: vitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 1,
      },
      {
        id: 'embed',
        title: 'Embedding + Position',
        short: 'Add patch order',
        tokens: '16 + CLS',
        channels: 'd = 768',
        receptive: 'Token identity + position',
        note: 'Positional encodings keep the patches from becoming a bag of unordered tiles.',
        matrix: vitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 1,
      },
      {
        id: 'attention',
        title: 'Global Attention',
        short: 'Every patch can talk',
        tokens: '16 + CLS',
        channels: 'd = 768',
        receptive: 'Whole image',
        note: 'This is the clean transformer idea: one global attention field over the full image.',
        matrix: vitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        tokenAccent: 'focus',
        filmstripFrames: 1,
      },
      {
        id: 'readout',
        title: 'Classification Readout',
        short: 'CLS summarizes scene',
        tokens: '1 output token',
        channels: 'd = 768',
        receptive: 'Whole image summary',
        note: 'A single readout token collects evidence from the full patch set and drives the prediction.',
        matrix: vitMatrix,
        tokenRows: 2,
        tokenCols: 2,
        filmstripFrames: 1,
      },
    ],
  },
  mvit: {
    id: 'mvit',
    title: 'MViT',
    kicker: 'Multiscale video transformer',
    intro:
      'MViT keeps the transformer backbone but adds a hierarchy: token resolution decreases while channel richness grows. It looks more like a visual pyramid than a flat ViT stack.',
    accent: '#1f8f88',
    rgb: '31, 143, 136',
    problem: {
      title: 'Video needs hierarchy, not one giant flat token table.',
      body:
        'If we keep every patch from every frame at the same scale, compute grows too fast. MViT solves that by pooling as it goes deeper.',
    },
    callout: {
      title: 'Teaching angle',
      body:
        'This is the bridge slide between ViT and MeMViT. Emphasize that MViT still uses attention, but now it builds increasingly coarse and semantic representations across stages.',
    },
    script: [
      'Show a short clip rather than one frame, so the temporal dimension becomes visible.',
      'Point out that tokens shrink across stages while channels grow.',
      'Connect the hierarchy to the CNN intuition from class without saying it turns into a CNN.',
    ],
    inputLabel: 'Short video clip',
    bottomLine: 'Strength: transformer with multiscale efficiency. Limitation: still limited temporal support inside one clip.',
    metrics: [
      { label: 'Spatial Tokens', value: 'Shrinking', hint: '16 -> 9 -> 4 -> 1 in the toy demo' },
      { label: 'Temporal Reach', value: 'Short clip', hint: 'Several frames, but finite window' },
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
        short: 'Video becomes tokens',
        tokens: '4 x 4 x 4 toy tokens',
        channels: 'd = 96',
        receptive: 'Small local cubes',
        note: 'Instead of one image grid, the model now starts from a short video chunk with space-time patches.',
        matrix: mvitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
      },
      {
        id: 'stage1',
        title: 'Stage 1 MHPA',
        short: 'Dense attention',
        tokens: '16 visible tokens',
        channels: 'd = 96',
        receptive: 'Local plus some global',
        note: 'The early stage keeps detail, with many visible tokens and small channels.',
        matrix: mvitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
      },
      {
        id: 'stage2',
        title: 'Stage 2 Downsample',
        short: 'Pool and widen',
        tokens: '9 visible tokens',
        channels: 'd = 192',
        receptive: 'Larger space-time neighborhoods',
        note: 'Multi-head pooling attention reduces resolution while the channels grow, so the representation gets more semantic.',
        matrix: mvitMatrix,
        tokenRows: 3,
        tokenCols: 3,
        tokenAccent: 'focus',
        filmstripFrames: 4,
      },
      {
        id: 'stage3',
        title: 'Stage 3 Coarse Context',
        short: 'Fewer, richer tokens',
        tokens: '4 visible tokens',
        channels: 'd = 384',
        receptive: 'Broad clip context',
        note: 'By the late stage, the model is operating on a compact set of coarse tokens that already summarize wide areas of the clip.',
        matrix: mvitMatrix,
        tokenRows: 2,
        tokenCols: 2,
        filmstripFrames: 4,
      },
    ],
  },
  memvit: {
    id: 'memvit',
    title: 'MeMViT',
    kicker: 'Memory-augmented MViT',
    intro:
      'MeMViT keeps the multiscale MViT backbone, but now each new video window can attend to cached keys and values from the past. The result is much longer temporal support without feeding the entire long video at once.',
    accent: '#d25737',
    rgb: '210, 87, 55',
    problem: {
      title: 'Long videos break naive scaling.',
      body:
        'You could keep adding more frames to the input clip, but cost grows badly. MeMViT instead processes windows online and reuses past information as memory.',
    },
    callout: {
      title: 'Teaching angle',
      body:
        'This is the main frontier idea for your talk. The demo should make the memory cache visible, not abstract: current queries, past keys/values, and optional compression.',
    },
    script: [
      'Keep the MViT hierarchy on screen so the audience sees MeMViT as an extension, not a replacement.',
      'Process one window at a time and drop old information into a memory bank.',
      'Show that current queries attend to current tokens plus past memory, which is the big conceptual leap.',
    ],
    inputLabel: 'Online video stream',
    bottomLine: 'Strength: long-term context with modest extra cost. Key idea: cache and compress past keys/values.',
    metrics: [
      { label: 'Spatial Tokens', value: 'Hierarchical', hint: 'Inherited from MViT stages' },
      { label: 'Temporal Reach', value: 'Extended', hint: 'Past windows stay available as memory' },
      { label: 'Backbone Feel', value: 'Memory-aware', hint: 'Current chunk + cached K/V' },
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
        short: 'Process one chunk now',
        tokens: '4 current frames',
        channels: 'MViT base stages',
        receptive: 'Local clip support',
        note: 'The model still processes a manageable short window at each step.',
        matrix: memvitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        memorySlots: 0,
      },
      {
        id: 'cache',
        title: 'Cache K / V',
        short: 'Past becomes memory',
        tokens: 'Current + 4 memory slots',
        channels: 'Hierarchical K / V',
        receptive: 'Past windows become available',
        note: 'Keys and values from earlier windows are stored so later queries can look backward in time.',
        matrix: memvitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        memorySlots: 4,
      },
      {
        id: 'compress',
        title: 'Compress Memory',
        short: 'Pool memory before reuse',
        tokens: 'Current + 3 compressed slots',
        channels: 'Compressed K / V',
        receptive: 'Longer but efficient',
        note: 'The memory bank is compressed so temporal reach grows faster than compute cost.',
        matrix: memvitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        filmstripFrames: 4,
        memorySlots: 3,
      },
      {
        id: 'attend',
        title: 'Attend Across Time',
        short: 'Current queries look back',
        tokens: 'Current + memory together',
        channels: 'Hierarchical MViT features',
        receptive: 'Current plus long past',
        note: 'Current queries attend to both the present chunk and the cached memory, which expands the temporal receptive field.',
        matrix: memvitMatrix,
        tokenRows: 4,
        tokenCols: 4,
        tokenAccent: 'focus',
        filmstripFrames: 4,
        memorySlots: 5,
      },
    ],
  },
};

export const architectureOrder: ArchitectureId[] = ['vit', 'mvit', 'memvit'];
