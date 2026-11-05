<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import FeedCard from "./FeedCard.vue";
import { store, visibleItems } from "../store";

const now = ref(Date.now());
const pending = ref(0);
const stage = ref<HTMLElement | null>(null);
let clock = 0;

onMounted(() => {
  clock = window.setInterval(() => {
    now.value = Date.now();
  }, 1000);
});
onUnmounted(() => window.clearInterval(clock));

watch(
  () => store.items[0]?.id,
  (id, prev) => {
    if (!prev || id === prev) return;
    const top = stage.value?.scrollTop ?? 0;
    if (top > 80) pending.value += 1;
  },
);

const list = computed(() => visibleItems.value);

function jump() {
  stage.value?.scrollTo({ top: 0, behavior: "smooth" });
  pending.value = 0;
}

function onScroll() {
  if ((stage.value?.scrollTop ?? 0) < 40) pending.value = 0;
}
</script>

<template>
  <section class="stage" ref="stage" @scroll="onScroll">
    <div class="stream">
      <button v-if="pending" class="jump" type="button" @click="jump">
        {{ pending }} 条新动态
      </button>
      <div v-if="list.length === 0" class="empty">
        <strong>这一屏没有内容</strong>
        换个平台、类型，或关掉「只看关注」。
      </div>
      <FeedCard v-for="item in list" :key="item.id" :item="item" :now="now" />
    </div>
  </section>
</template>
