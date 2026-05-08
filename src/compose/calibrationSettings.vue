<template>
  <div style="padding-left: 10px; padding-right: 10px">
    <p class="step-desc">选择后验校准算法以优化血药浓度预测</p>
    <mdui-segmented-button-group
      :value="calibModel"
      selects="single"
      @change="onModelChange"
    >
      <mdui-segmented-button value="ratio">比率插值</mdui-segmented-button>
      <mdui-segmented-button value="ou-kalman">OU-Kalman</mdui-segmented-button>
    </mdui-segmented-button-group>
    <div class="cal-model-info">
      <p v-if="calibModel === 'ratio'">
        基于实测值与预测值的比率构建分段线性插值器，适用于少量观测数据。
      </p>
      <p v-else>
        基于 Ornstein-Uhlenbeck 过程的卡尔曼滤波器 + RTS
        反向平滑器，适用于有规律的采血检测。
      </p>
    </div>
  </div>
</template>
