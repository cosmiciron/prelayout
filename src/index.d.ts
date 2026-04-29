export interface PrelayoutPiece {
  [key: string]: unknown;
  x: number;
  y: number;
  width: number;
  height: number;
  baselineY?: number;
  lineIndex: number;
  pieceIndex: number;
  kind: "text";
  text: string;
  direction?: "ltr" | "rtl" | string;
  fontFamily?: string;
  fontSize?: number;
  letterSpacing?: number;
  fontWeight?: string;
  fontStyle?: string;
  ascent?: number;
  descent?: number;
  color?: string;
  _sourceId?: string;
  _sourceStart?: number;
  _sourceEnd?: number;
}

export interface PrelayoutLineGuide {
  x: number;
  y: number;
  width: number;
  height: number;
  baselineY: number;
  lineIndex: number;
  direction?: "ltr" | "rtl" | string;
}

export interface PrelayoutStructuredTextProperties {
  sourceId?: string;
  style?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface PrelayoutStructuredTextElement {
  type: string;
  content?: string;
  children?: PrelayoutStructuredTextElement[];
  properties?: PrelayoutStructuredTextProperties;
  [key: string]: unknown;
}

export interface PrelayoutStructuredTextContent {
  elements: PrelayoutStructuredTextElement[];
}

export interface PrelayoutPerformance {
  layoutMs: number;
  materializeMs: number;
  resolveLinesMs: number;
  buildTokensMs: number;
  wrapStreamMs: number;
  bidiMs: number;
  scriptSplitMs: number;
  wordSegmentMs: number;
  actorMeasurementMs: number;
  actorPlacementMs: number;
  actorOverflowMs: number;
  textMeasurementCacheHits: number;
  textMeasurementCacheMisses: number;
  colliderFieldQueryCalls: number;
  colliderFieldNarrowphaseCalls: number;
}

export interface PrelayoutMargins {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

export type PrelayoutExclusionKind = "circle" | "rect" | "ellipse" | "polygon" | "assembly";

export interface PrelayoutExclusion {
  readonly kind: PrelayoutExclusionKind;
  readonly input: Readonly<Record<string, unknown>>;
}

export interface PrelayoutExclusionAssembly extends PrelayoutExclusion {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly parts: {
    readonly count: number;
  };
  toJSON(): object;
  preview(options?: { scale?: number }): HTMLCanvasElement;
}

export interface PrelayoutCircleExclusionOptions {
  x?: number;
  y?: number;
  radius: number;
  gap?: number;
}

export interface PrelayoutRectExclusionOptions {
  x?: number;
  y?: number;
  width: number;
  height: number;
  gap?: number;
}

export interface PrelayoutEllipseExclusionOptions {
  x?: number;
  y?: number;
  width: number;
  height: number;
  gap?: number;
}

export interface PrelayoutPolygonPoint {
  x: number;
  y: number;
}

export interface PrelayoutPolygonExclusionOptions {
  x?: number;
  y?: number;
  points: Array<PrelayoutPolygonPoint | [number, number]>;
  gap?: number;
}

export interface PrelayoutFromAlphaChannelOptions {
  x?: number;
  y?: number;
  bandHeight?: number;
  tiers?: 1 | 2 | 3 | 4;
  gap?: number;
}

export interface PrelayoutFromJSONOptions {
  x?: number;
  y?: number;
  gap?: number;
}

export interface PrelayoutExclusionNamespace {
  circle(options: PrelayoutCircleExclusionOptions): PrelayoutExclusion;
  rect(options: PrelayoutRectExclusionOptions): PrelayoutExclusion;
  ellipse(options: PrelayoutEllipseExclusionOptions): PrelayoutExclusion;
  polygon(options: PrelayoutPolygonExclusionOptions): PrelayoutExclusion;
  fromAlphaChannel(
    alpha: Uint8Array,
    width: number,
    height: number,
    options?: PrelayoutFromAlphaChannelOptions
  ): PrelayoutExclusionAssembly;
  fromJSON(data: unknown, options?: PrelayoutFromJSONOptions): PrelayoutExclusionAssembly;
}

export interface PrelayoutRequest {
  width?: number | string;
  height?: number | string;
  format?: "plain";
  fontFamily?: string;
  fontSize?: number | string;
  lineHeight?: number | string;
  lineHeightMode?: "print" | "css" | "browser";
  lineHeightAdjustment?: number | string;
  hyphenation?: "off" | "auto" | "soft";
  margins?: PrelayoutMargins;
  styles?: Record<string, Record<string, unknown>>;
  exclusions?: PrelayoutExclusion[];
}

export type PrelayoutTargetInput = PrelayoutRequest;
export type PrelayoutContentInput = string;

export interface PrelayoutContentSlice {
  text: string;
  length: number;
}

export interface PrelayoutContentReport {
  consumed: PrelayoutContentSlice;
  remaining: PrelayoutContentSlice;
  complete: boolean;
  hyphenated: boolean;
  sourceLength: number;
}

export interface FormResult {
  pieces: PrelayoutPiece[];
  lines: PrelayoutLineGuide[];
  height: number;
  performance: PrelayoutPerformance;
}

export interface FitResult {
  pieces: PrelayoutPiece[];
  lines: PrelayoutLineGuide[];
  height: number;
  content: PrelayoutContentReport;
  performance: PrelayoutPerformance;
}

export interface FlowPlacement {
  index: number;
  pieces: PrelayoutPiece[];
  lines: PrelayoutLineGuide[];
  height: number;
  content: PrelayoutContentReport;
}

export interface FlowResult {
  placements: FlowPlacement[];
  content: PrelayoutContentReport;
  performance: PrelayoutPerformance;
}

export interface PourResult {
  pieces: PrelayoutPiece[];
  lines: PrelayoutLineGuide[];
  height: number;
  content: PrelayoutContentReport;
  performance: PrelayoutPerformance;
}

export interface ProducePage {
  index: number;
  width: number;
  height: number;
  occupiedHeight: number;
  pieces: PrelayoutPiece[];
  lines: PrelayoutLineGuide[];
}

export interface ProduceOptions extends PrelayoutRequest {}

export interface ProduceResult {
  pages: ProducePage[];
  performance: PrelayoutPerformance;
}

export type FormResultHandler = (result: FormResult) => void;
export type FitResultHandler = (result: FitResult) => void;
export type FlowResultHandler = (result: FlowResult) => void;
export type PourResultHandler = (result: PourResult) => void;
export type ProduceResultHandler = (result: ProduceResult) => void;

export declare function form(content?: PrelayoutContentInput, options?: PrelayoutTargetInput, handler?: FormResultHandler): FormResult;
export declare function form(content?: PrelayoutContentInput, handler?: FormResultHandler): FormResult;
export declare function fit(content?: PrelayoutContentInput, options?: PrelayoutTargetInput, handler?: FitResultHandler): FitResult;
export declare function fit(content?: PrelayoutContentInput, handler?: FitResultHandler): FitResult;
export declare function flow(content?: PrelayoutContentInput, targets?: PrelayoutTargetInput[], handler?: FlowResultHandler): FlowResult;
export declare function pour(content?: PrelayoutContentInput, shape?: PrelayoutExclusion, options?: PrelayoutTargetInput, handler?: PourResultHandler): PourResult;
export declare function pour(content?: PrelayoutContentInput, shape?: PrelayoutExclusion, handler?: PourResultHandler): PourResult;
export declare function produce(source: unknown, options?: ProduceOptions, handler?: ProduceResultHandler): ProduceResult;
export declare function produce(source: unknown, handler?: ProduceResultHandler): ProduceResult;
export declare const exclusion: PrelayoutExclusionNamespace;
export declare function debugBuildHiddenDocument(content?: PrelayoutContentInput, options?: PrelayoutRequest, mode?: "form" | "fit"): unknown;
