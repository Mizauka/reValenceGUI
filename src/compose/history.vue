<template>
  <mdui-list>
    <mdui-list-subheader>2026/5/7</mdui-list-subheader>
    <mdui-list-item v-for="n in 3"
      icon="medication"
      end-icon="edit"
      rounded
    >
      Headline
      <span slot="description">Supporting text</span>
    </mdui-list-item>
    <mdui-list-subheader>2026/4/28</mdui-list-subheader>
    <mdui-list-item v-for="n in 2"
      icon="medication"
      end-icon="edit"
      rounded
    >
      Headline
      <span slot="description">Supporting text</span>
    </mdui-list-item>
  </mdui-list>
</template>
