<script setup lang="ts">
import { computed } from "vue";
import { store, visibleItems } from "../store";

const topics = computed(() => {
  const map = new Map<string, { tag: string; count: number; sample: string }>();
  for (const item of visibleItems.value) {
    for (const tag of item.tags) {
      const prev = map.get(tag);
      if (prev) prev.count += 1;
      else map.set(tag, { tag, count: 1, sample: item.body });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "zh"));
});

function openTopic(tag: string) {
  store.query = tag;
  store.view = "live";
}
</script>

<template>
  <section class="stage">
    <div class="panel">
      <h2>热点</h2>
      <p class="lead">按当前筛选里的话题出现次数排列。点一行就回到实时流，并带上这个词。</p>
      <div v-if="topics.length === 0" class="empty">
        <strong>还没有可排的话题</strong>
        放宽筛选后再看。
      </div>
      <div class="hot-list">
        <button
          v-for="(topic, index) in topics"
          :key="topic.tag"
          class="hot-row"
          type="button"
          @click="openTopic(topic.tag)"
        >
          <span class="rank">{{ index + 1 }}</span>
          <span>
            <strong>#{{ topic.tag }}</strong>
            <p>{{ topic.sample }}</p>
          </span>
          <span class="count">{{ topic.count }}</span>
        </button>
      </div>
    </div>
  </section>
</template>
