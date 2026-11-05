<script setup lang="ts">
import { kindName, platformOf, relTime } from "../data";
import type { FeedItem } from "../types";

defineProps<{ item: FeedItem; now: number }>();
</script>

<template>
  <article class="card">
    <div class="avatar" :style="{ background: platformOf(item.platform).color }">
      {{ item.author.slice(0, 1) }}
    </div>
    <div>
      <div class="head">
        <span class="author">{{ item.author }}</span>
        <span class="handle">@{{ item.handle }}</span>
        <time class="time">{{ relTime(item.ts, now) }}</time>
      </div>
      <p class="body">{{ item.body }}</p>
      <div class="tags">
        <span class="chip kind">{{ kindName(item.kind) }}</span>
        <span class="chip">{{ platformOf(item.platform).name }}</span>
        <span v-for="tag in item.tags" :key="tag" class="chip">#{{ tag }}</span>
      </div>
    </div>
  </article>
</template>
