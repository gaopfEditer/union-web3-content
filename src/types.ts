export type ViewId = "live" | "board" | "hot" | "sources" | "settings";

export type PlatformId = "x" | "binance" | "telegram" | "truth" | "wire";

export type KindId = "flash" | "opinion" | "announce" | "thread";

export interface PlatformMeta {
  id: PlatformId;
  name: string;
  short: string;
  color: string;
}

export interface KindMeta {
  id: KindId;
  name: string;
}

export interface FeedItem {
  id: string;
  platform: PlatformId;
  kind: KindId;
  author: string;
  handle: string;
  body: string;
  tags: string[];
  ts: number;
}

export interface SourceProfile {
  handle: string;
  author: string;
  platform: PlatformId;
  note: string;
}
