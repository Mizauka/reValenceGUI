<script setup lang="ts">
import { useSlidingPanel } from "../composables/slidingPanel";
const { currentPageColumn } = useSlidingPanel();
import chart from "../compose/chart.vue";
import history from "../compose/history.vue";
import charttitle from "../compose/charttitle.vue";
</script>

<template>
  <div class="example-container" page-left="1">
    <div class="example-page" page-id="1">
      <charttitle v-if="currentPageColumn === 1"/>
      <chart v-if="currentPageColumn === 1" />
      <history />
    </div>
    <div class="example-page" page-id="2">
      <charttitle />
      <chart v-if="currentPageColumn === 2" />
    </div>
    <div class="example-page" page-id="3">
      <chart v-if="currentPageColumn === 3" />
    </div>
  </div>
</template>

