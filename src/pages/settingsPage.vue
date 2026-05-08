<script setup lang="ts">
import { useSlidingPanel } from "../composables/slidingPanel";
const { goToPage } = useSlidingPanel();
</script>

<template>
  <div class="example-container" page-left="1">
    <div class="example-page">
      <mdui-button variant="filled" @click="goToPage('2')">第2步</mdui-button>
    </div>
    <div class="example-page">
      <mdui-button variant="filled" @click="goToPage('3')">第3步</mdui-button>
      <div style="height: 10000px">Page Content 2</div>
    </div>
    <div class="example-page">
      <mdui-button variant="filled" @click="goToPage('1')">第1步</mdui-button>
      <div style="height: 10000px">Page Content 3</div>
    </div>
  </div>
</template>
