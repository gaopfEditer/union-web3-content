<script setup lang="ts">
import { computed } from "vue";
import { platformOf, sources } from "../data";
import { flash, store, toggleFollow } from "../store";

const rows = computed(() =>
  sources.map((source) => {
    const latest = store.items.find((item) => item.handle === source.handle);
    return { ...source, latest: latest?.body ?? "还没有动态" };
  }),
);

function onToggle(handle: string, author: string) {
  const followed = store.follows.includes(handle);
  toggleFollow(handle);
  flash(followed ? `已取消关注 ${author}` : `已关注 ${author}`);
}
</script>

<template>
  <section class="stage">
    <div class="panel">
      <h2>来源</h2>
      <p class="lead">关注只影响「只看关注」。目录里的号都会出现在实时流，直到你把平台关掉。</p>
      <div class="source-list">
        <article v-for="row in rows" :key="row.handle" class="source-row">
          <div class="avatar" :style="{ background: platformOf(row.platform).color }">
            {{ row.author.slice(0, 1) }}
          </div>
          <div>
            <strong>{{ row.author }}</strong>
            <span class="handle"> @{{ row.handle }} · {{ platformOf(row.platform).name }}</span>
            <p>{{ row.note }}。最近：{{ row.latest }}</p>
          </div>
          <button
            class="pill"
            :class="{ on: store.follows.includes(row.handle) }"
            type="button"
            @click="onToggle(row.handle, row.author)"
          >
            {{ store.follows.includes(row.handle) ? "已关注" : "关注" }}
          </button>
        </article>
      </div>
    </div>
  </section>
</template>
