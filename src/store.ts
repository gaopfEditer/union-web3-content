import { computed, reactive, watch } from "vue";
import { createSeed, nextItem, platforms } from "./data";
import type { FeedItem, KindId, PlatformId, ViewId } from "./types";

const STORAGE_KEY = "union-wire-prefs";

interface Prefs {
  follows: string[];
  hiddenPlatforms: PlatformId[];
  hiddenKinds: KindId[];
  onlyFollows: boolean;
  muted: boolean;
  live: boolean;
  density: "standard" | "compact";
}

function loadPrefs(): Prefs {
  const fallback: Prefs = {
    follows: ["unionwire", "northwindow", "tgroom"],
    hiddenPlatforms: [],
    hiddenKinds: [],
    onlyFollows: false,
    muted: false,
    live: true,
    density: "standard",
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

const prefs = loadPrefs();

export const store = reactive({
  view: "live" as ViewId,
  query: "",
  follows: prefs.follows,
  hiddenPlatforms: prefs.hiddenPlatforms,
  hiddenKinds: prefs.hiddenKinds,
  onlyFollows: prefs.onlyFollows,
  muted: prefs.muted,
  live: prefs.live,
  density: prefs.density,
  items: createSeed() as FeedItem[],
  navOpen: false,
  notice: "",
});

watch(
  () => ({
    follows: store.follows,
    hiddenPlatforms: store.hiddenPlatforms,
    hiddenKinds: store.hiddenKinds,
    onlyFollows: store.onlyFollows,
    muted: store.muted,
    live: store.live,
    density: store.density,
  }),
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  },
  { deep: true },
);

export const visibleItems = computed(() => {
  const q = store.query.trim().toLowerCase();
  return store.items.filter((item) => {
    if (store.hiddenPlatforms.includes(item.platform)) return false;
    if (store.hiddenKinds.includes(item.kind)) return false;
    if (store.onlyFollows && !store.follows.includes(item.handle)) return false;
    if (!q) return true;
    const blob = `${item.author} ${item.handle} ${item.body} ${item.tags.join(" ")}`.toLowerCase();
    return blob.includes(q);
  });
});

export function itemsByPlatform(id: PlatformId) {
  return visibleItems.value.filter((item) => item.platform === id);
}

export function toggleFollow(handle: string) {
  const index = store.follows.indexOf(handle);
  if (index >= 0) store.follows.splice(index, 1);
  else store.follows.push(handle);
}

export function togglePlatform(id: PlatformId) {
  const index = store.hiddenPlatforms.indexOf(id);
  if (index >= 0) store.hiddenPlatforms.splice(index, 1);
  else store.hiddenPlatforms.push(id);
}

export function toggleKind(id: KindId) {
  const index = store.hiddenKinds.indexOf(id);
  if (index >= 0) store.hiddenKinds.splice(index, 1);
  else store.hiddenKinds.push(id);
}

export function isPlatformOn(id: PlatformId) {
  return !store.hiddenPlatforms.includes(id);
}

export function isKindOn(id: KindId) {
  return !store.hiddenKinds.includes(id);
}

export function pushIncoming() {
  if (!store.live) return;
  store.items.unshift(nextItem());
  if (store.items.length > 80) store.items.length = 80;
}

export function setView(view: ViewId) {
  store.view = view;
  store.navOpen = false;
}

export function flash(message: string) {
  store.notice = message;
  window.setTimeout(() => {
    if (store.notice === message) store.notice = "";
  }, 2200);
}

export const platformCount = computed(() => platforms.length - store.hiddenPlatforms.length);

let timer = 0;

export function startTicker() {
  window.clearInterval(timer);
  timer = window.setInterval(pushIncoming, 9000);
}
