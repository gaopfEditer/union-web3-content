<script setup lang="ts">
import { computed, onMounted } from "vue";
import BoardView from "./components/BoardView.vue";
import HotView from "./components/HotView.vue";
import LiveView from "./components/LiveView.vue";
import SettingsView from "./components/SettingsView.vue";
import SourcesView from "./components/SourcesView.vue";
import { kinds, platforms } from "./data";
import {
  isKindOn,
  isPlatformOn,
  platformCount,
  setView,
  startTicker,
  store,
  toggleKind,
  togglePlatform,
  visibleItems,
} from "./store";
import type { ViewId } from "./types";

const nav: { id: ViewId; label: string }[] = [
  { id: "live", label: "实时流" },
  { id: "board", label: "多平台" },
  { id: "hot", label: "热点" },
  { id: "sources", label: "来源" },
  { id: "settings", label: "设置" },
];

const titles: Record<ViewId, string> = {
  live: "实时流",
  board: "多平台",
  hot: "热点",
  sources: "来源",
  settings: "设置",
};

const showFilters = computed(() => store.view === "live" || store.view === "board");
const liveCount = computed(() => visibleItems.value.length);

onMounted(startTicker);

function onSearch(event: Event) {
  store.query = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <div class="app" :class="{ compact: store.density === 'compact' }">
    <button v-if="store.navOpen" class="scrim" type="button" aria-label="关闭菜单" @click="store.navOpen = false"></button>
    <aside class="sidebar" :class="{ open: store.navOpen }">
      <div class="brand">
        <div class="mark">联</div>
        <div>
          <h1>联讯</h1>
          <p>多平台资讯，一屏看完</p>
        </div>
      </div>
      <nav class="nav">
        <button
          v-for="item in nav"
          :key="item.id"
          type="button"
          :class="{ active: store.view === item.id }"
          @click="setView(item.id)"
        >
          <span class="nav-label">
            <i v-if="item.id === 'live'" class="pulse"></i>
            {{ item.label }}
          </span>
          <span v-if="item.id === 'live'" class="count">{{ liveCount }}</span>
          <span v-else-if="item.id === 'board'" class="count">{{ platformCount }}</span>
          <span v-else-if="item.id === 'sources'" class="count">{{ store.follows.length }}</span>
        </button>
      </nav>
      <div class="side-foot">
        <div class="latency"><span>聚合间隔</span><span>9 秒</span></div>
        <span class="demo-tag">演示数据</span>
      </div>
    </aside>

    <main class="main">
      <header class="toolbar">
        <button class="icon-btn menu-btn" type="button" @click="store.navOpen = true">菜单</button>
        <h2>{{ titles[store.view] }}</h2>
        <template v-if="showFilters">
          <input
            class="search"
            :value="store.query"
            type="search"
            placeholder="搜索来源、正文、话题"
            @input="onSearch"
          />
          <button
            v-for="item in platforms"
            :key="item.id"
            class="pill"
            :class="{ on: isPlatformOn(item.id) }"
            type="button"
            @click="togglePlatform(item.id)"
          >
            <span class="dot" :style="{ background: item.color }"></span>{{ item.short }}
          </button>
          <button
            v-for="item in kinds"
            :key="item.id"
            class="pill"
            :class="{ on: isKindOn(item.id) }"
            type="button"
            @click="toggleKind(item.id)"
          >
            {{ item.name }}
          </button>
          <button class="pill" :class="{ on: store.onlyFollows }" type="button" @click="store.onlyFollows = !store.onlyFollows">
            只看关注
          </button>
          <button class="pill" :class="{ on: store.muted }" type="button" @click="store.muted = !store.muted">
            {{ store.muted ? "已静音" : "静音" }}
          </button>
        </template>
      </header>
      <LiveView v-if="store.view === 'live'" />
      <BoardView v-else-if="store.view === 'board'" />
      <HotView v-else-if="store.view === 'hot'" />
      <SourcesView v-else-if="store.view === 'sources'" />
      <SettingsView v-else />
    </main>
    <div v-if="store.notice" class="toast">{{ store.notice }}</div>
  </div>
</template>
