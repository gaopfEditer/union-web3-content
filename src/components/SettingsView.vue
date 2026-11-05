<script setup lang="ts">
import { kinds, platforms } from "../data";
import { flash, isKindOn, isPlatformOn, store, toggleKind, togglePlatform } from "../store";

function reset() {
  store.follows = ["unionwire", "northwindow", "tgroom"];
  store.hiddenPlatforms = [];
  store.hiddenKinds = [];
  store.onlyFollows = false;
  store.muted = false;
  store.live = true;
  store.density = "standard";
  store.query = "";
  flash("已恢复默认");
}
</script>

<template>
  <section class="stage">
    <div class="panel settings">
      <div>
        <h2>设置</h2>
        <p class="lead">这些偏好保存在这台浏览器里。内容是内置演示，不会上传。</p>
      </div>
      <section class="set-card">
        <h3>平台</h3>
        <p>关掉的平台会从实时流和多平台栏里一起消失。</p>
        <div class="row">
          <button
            v-for="item in platforms"
            :key="item.id"
            class="pill"
            :class="{ on: isPlatformOn(item.id) }"
            type="button"
            @click="togglePlatform(item.id)"
          >
            <span class="dot" :style="{ background: item.color }"></span>{{ item.name }}
          </button>
        </div>
      </section>
      <section class="set-card">
        <h3>类型</h3>
        <div class="row">
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
        </div>
      </section>
      <section class="set-card">
        <h3>阅读</h3>
        <div class="switch">
          <span>新动态自动进入列表</span>
          <button class="pill" :class="{ on: store.live }" type="button" @click="store.live = !store.live">
            {{ store.live ? "开" : "关" }}
          </button>
        </div>
        <div class="switch">
          <span>卡片密度</span>
          <button
            class="pill"
            :class="{ on: store.density === 'compact' }"
            type="button"
            @click="store.density = store.density === 'compact' ? 'standard' : 'compact'"
          >
            {{ store.density === "compact" ? "紧凑" : "标准" }}
          </button>
        </div>
        <div class="switch">
          <span>静音标记</span>
          <button class="pill" :class="{ on: store.muted }" type="button" @click="store.muted = !store.muted">
            {{ store.muted ? "已静音" : "未静音" }}
          </button>
        </div>
      </section>
      <div class="row">
        <button class="pill" type="button" @click="reset">恢复默认</button>
      </div>
    </div>
  </section>
</template>
