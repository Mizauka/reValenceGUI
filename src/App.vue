<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { isMobile } from "./router";

const router = useRouter();
const route = useRoute();

/** 当前激活的路由名称，用于同步导航高亮 */
const activeTab = computed(() => route.name as string);

/** 导航项定义 */
interface NavItem {
  icon: string;
  value: string;
  label: string;
}

const navItems: NavItem[] = [
  { icon: "dataset", value: "home", label: "浓度曲线" },
  { icon: "watch_later", value: "history", label: "药历核对" },
  { icon: "medication", value: "library", label: "药物列表" },
];

/** 点击导航项跳转 */
function navigate(name: string) {
  router.push({ name });
}
</script>

<template>
  <mdui-layout style="height: 100%; overflow: hidden" class="example-modal">
    <mdui-navigation-rail v-if="!isMobile" :value="activeTab">
      <mdui-tooltip content="菜单" slot="top">
        <mdui-button-icon icon="menu"></mdui-button-icon>
      </mdui-tooltip>
      <mdui-fab
        :active="activeTab === 'add'"
        lowered
        icon="add--outlined"
        slot="top"
        @click="navigate('add')"
      ></mdui-fab>

      <mdui-navigation-rail-item
        v-for="item in navItems"
        :key="item.value"
        :icon="item.icon + '--outlined'"
        :active-icon="item.icon"
        :value="item.value"
        @click="navigate(item.value)"
        >{{ item.label }}</mdui-navigation-rail-item
      >

      <!-- settings 固定在底部 -->
      <mdui-navigation-rail-item
        slot="bottom"
        icon="settings--outlined"
        active-icon="settings"
        value="settings"
        :active="activeTab === 'settings'"
        @click="navigate('settings')"
      ></mdui-navigation-rail-item>
    </mdui-navigation-rail>

    <mdui-top-app-bar
      :variant="isMobile ? 'medium' : 'small'"
      scroll-behavior="shrink"
      scroll-threshold="30"
      scroll-target=".example-scroll-target"
    >
      <mdui-tooltip content="菜单" v-if="isMobile">
        <mdui-button-icon icon="menu"></mdui-button-icon>
      </mdui-tooltip>
      <mdui-top-app-bar-title>{{ route.meta.title }}</mdui-top-app-bar-title>
      <div style="flex-grow: 1"></div>
      <mdui-tooltip content="更多">
        <mdui-button-icon icon="more_vert"></mdui-button-icon>
      </mdui-tooltip>
    </mdui-top-app-bar>

    <mdui-layout-main class="example-scroll-target" style="overflow-x: hidden">
      <router-view />
    </mdui-layout-main>
  </mdui-layout>

  <mdui-bottom-app-bar
    v-if="isMobile"
    fab-detach
    scroll-behavior="hide"
    scroll-threshold="30"
    scroll-target=".example-scroll-target"
  >
    <mdui-tooltip v-for="item in navItems" :key="item.value" :content="item.label">
      <mdui-button-icon
        :icon="item.icon + '--outlined'"
        :selected-icon="item.icon"
        :selected="activeTab === item.value"
        @click="navigate(item.value)"
      ></mdui-button-icon>
    </mdui-tooltip>
    <mdui-tooltip content="程序设置">
      <mdui-button-icon
        selected-icon="settings"
        icon="settings--outlined"
        :selected="activeTab === 'settings'"
        @click="navigate('settings')"
      ></mdui-button-icon>
    </mdui-tooltip>
    <div style="flex-grow: 1"></div>
    <mdui-fab
      icon="add"
      @click="navigate('add')"
      :active="activeTab === 'add'"
    ></mdui-fab>
  </mdui-bottom-app-bar>
</template>
