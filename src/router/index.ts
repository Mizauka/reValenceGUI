import { createRouter, createWebHashHistory } from "vue-router";
import { ref } from "vue";
import { breakpoint } from "mdui";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
import homePage from "../pages/homePage.vue";
import historyPage from "../pages/historyPage.vue";
import libPage from "../pages/libPage.vue";
import addPage from "../pages/addPage.vue";
import calibrationPage from "../pages/calibrationPage.vue";
import settingsPage from "../pages/settingsPage.vue";

function getCurrentBreakpoint(): Breakpoint {
  const bp = breakpoint();
  if (bp.only("xs")) return "xs";
  if (bp.only("sm")) return "sm";
  if (bp.only("md")) return "md";
  if (bp.only("lg")) return "lg";
  if (bp.only("xl")) return "xl";
  return "xxl";
}

/** 共享响应式断点状态 */
export const currentBreakpoint = ref<Breakpoint>(getCurrentBreakpoint());
export const isMobile = ref(breakpoint().down("sm"));

function updateBreakpoint() {
  currentBreakpoint.value = getCurrentBreakpoint();
  isMobile.value = breakpoint().down("sm");
}

// 模块级监听，只注册一次
window.addEventListener("resize", updateBreakpoint);

const routes = [
  { path: "/", name: "home", component: homePage, meta: { title: "浓度曲线" } },
  { path: "/history", name: "history", component: historyPage, meta: { title: "药历核对" } },
  { path: "/library", name: "library", component: libPage, meta: { title: "药物列表" } },
  { path: "/add", name: "add", component: addPage, meta: { title: "添加记录" } },
  { path: "/calibration", name: "calibration", component: calibrationPage, meta: { title: "校准曲线" } },
  { path: "/settings", name: "settings", component: settingsPage, meta: { title: "程序设置" } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

