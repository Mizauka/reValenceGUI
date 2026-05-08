<template>
  <div style="padding: 8px">
    <mdui-layout>
      <mdui-layout-item placement="bottom">
        <mdui-segmented-button-group selects="single" value="week">
          <mdui-segmented-button value="week">周</mdui-segmented-button>
          <mdui-segmented-button value="month">月</mdui-segmented-button>
        </mdui-segmented-button-group>
        <div style="flex-grow: 1"></div>
        <mdui-dropdown>
          <mdui-button slot="trigger" icon="download" variant="tonal"
            >导出</mdui-button
          >
          <mdui-menu>
            <mdui-menu-item>CSV</mdui-menu-item>
            <mdui-menu-item>JSON</mdui-menu-item>
          </mdui-menu>
        </mdui-dropdown>
      </mdui-layout-item>
      <mdui-layout-main style="margin-bottom: 10px">
        <div
          style="
            width: 100%;
            height: 250px;
            background: rgb(var(--mdui-color-surface-dim));
            margin: 0;
          "
        >
          在这放置曲线图
        </div>
        <mdui-select value="item-1" icon="analytics--outlined" end-icon="edit">
          <mdui-menu-item value="item-1">默认展示方案</mdui-menu-item>
          <mdui-menu-item value="item-2">Hrt</mdui-menu-item>
          <mdui-menu-item value="item-3">Journal</mdui-menu-item>
          <mdui-menu-item value="item-3">新建方案...</mdui-menu-item>
        </mdui-select>
      </mdui-layout-main>
    </mdui-layout>
  </div>
</template>
