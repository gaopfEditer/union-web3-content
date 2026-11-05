<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import FeedCard from "./FeedCard.vue";
import { platforms } from "../data";
import { isPlatformOn, itemsByPlatform } from "../store";

const now = ref(Date.now());
let clock = 0;
onMounted(() => {
  clock = window.setInterval(() => {
    now.value = Date.now();
  }, 1000);
});
onUnmounted(() => window.clearInterval(clock));

const columns = () => platforms.filter((item) => isPlatformOn(item.id));
</script>

<template>
  <section class="stage">
    <div class="board">
      <section v-for="col in columns()" :key="col.id" class="column">
        <header class="col-head">
          <span class="dot" :style="{ background: col.color, width: '8px', height: '8px', borderRadius: '50%' }"></span>
          <strong>{{ col.name }}</strong>
          <span class="count">{{ itemsByPlatform(col.id).length }}</span>
        </header>
        <div class="col-body">
          <div v-if="itemsByPlatform(col.id).length === 0" class="empty">
            <strong>暂无内容</strong>
            等待新动态
          </div>
          <FeedCard
            v-for="item in itemsByPlatform(col.id)"
            :key="item.id"
            :item="item"
            :now="now"
          />
        </div>
      </section>
    </div>
  </section>
</template>
