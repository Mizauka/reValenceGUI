<script setup lang="ts">
import { useSlidingPanel } from "../composables/slidingPanel";
const { goToPage, currentPageColumn } = useSlidingPanel();
import history from "../compose/history.vue";
import calibration from "../compose/calibration.vue";
import calibrationSettings from "../compose/calibrationSettings.vue";
</script>

<template>
  <div class="example-container" page-left="1">
    <div class="example-page" page-id="1">
      <mdui-tabs value="tab-1" v-if="currentPageColumn === 1" placement="top">
        <mdui-tab value="tab-1">用药记录</mdui-tab>
        <mdui-tab value="tab-2">测量记录</mdui-tab>
        <mdui-tab value="tab-3">校准模型</mdui-tab>

        <mdui-tab-panel slot="panel" value="tab-1"
          ><history /><history /><history
        /></mdui-tab-panel>
        <mdui-tab-panel slot="panel" value="tab-2"
          ><calibration
        /></mdui-tab-panel>
        <mdui-tab-panel slot="panel" value="tab-3"
          ><calibrationSettings
        /></mdui-tab-panel>
      </mdui-tabs>

      <mdui-layout v-if="currentPageColumn > 1">
        <mdui-layout-item placement="top">
          <span style="padding-left: 10px; line-height: 40px">用药记录</span>

          <div style="flex-grow: 1"></div>
          <mdui-button variant="text" icon="download">导出</mdui-button>
        </mdui-layout-item>
        <mdui-layout-main style="margin-top: 10px">
          <history />
          <history />
          <history />
        </mdui-layout-main>
      </mdui-layout>
    </div>
    <div class="example-page" page-id="2">
      <mdui-layout v-if="currentPageColumn > 1">
        <mdui-layout-item placement="top">
          <span style="padding-left: 10px; line-height: 40px">测量记录</span>

          <div style="flex-grow: 1"></div>

          <mdui-button variant="text" icon="download">导出</mdui-button>

          <mdui-button
            variant="text"
            @click="goToPage('3')"
            icon="medical_services"
            >校准模型</mdui-button
          >
        </mdui-layout-item>
        <mdui-layout-main style="margin-top: 10px">
          <calibration />
        </mdui-layout-main>
      </mdui-layout>
    </div>
    <div class="example-page" page-id="3">
      <mdui-layout v-if="currentPageColumn > 1">
        <mdui-layout-item placement="top">
          <mdui-button-icon v-if="currentPageColumn != 3"
            icon="arrow_back"
            @click="goToPage('1')"
          ></mdui-button-icon>

          <span style="padding-left: 10px; line-height: 40px"
            >管理校准模型</span
          >

          <div style="flex-grow: 1"></div>

        </mdui-layout-item>
        <mdui-layout-main style="margin-top: 10px">
          <calibrationSettings />
        </mdui-layout-main>
      </mdui-layout>

      <mdui-button variant="filled" @click="goToPage('1')">第1步</mdui-button>
    </div>
  </div>
</template>
