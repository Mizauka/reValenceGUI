import { onMounted, onUnmounted, ref, computed, type Ref, type ComputedRef } from "vue";

/**
 * 滑动面板 Composable
 * - 自动管理布局、响应式列数、页面切换
 * - page-id / page-name：按 page-id 排序，page-name 为名称标识
 * - 导出响应式 currentPageColumn、currentPageLeft、isPageActive
 * - 返回 goToPage、setPageId
 */
export function useSlidingPanel(): {
  goToPage: (action: string) => void;
  setPageId: (pageName: string, newId: number) => void;
  currentPageColumn: Ref<number>;
  currentPageLeft: Ref<number>;
  activePageIds: ComputedRef<Set<number>>;
} {
  let isAutoMode: boolean = false;
  let mutationObserver: MutationObserver | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let resizeHandler: (() => void) | null = null;

  /** 响应式：当前列数 */
  const currentPageColumn = ref(1);
  /** 响应式：当前 page-left */
  const currentPageLeft = ref(1);

  /** 当前处于 active 的 page-id 集合（响应式，供 v-if 使用） */
  const activePageIds = computed<Set<number>>(() => {
    const left = currentPageLeft.value;
    const col = currentPageColumn.value;

    const container = document.querySelector<HTMLElement>(".example-container");
    if (!container) return new Set();

    const pages = container.querySelectorAll<HTMLElement>(".example-page");
    const ids: number[] = [];
    pages.forEach((p) => {
      const id = parseInt(p.getAttribute("page-id") ?? "");
      ids.push(Number.isNaN(id) ? -1 : id);
    });

    const result = new Set<number>();
    for (let i = left - 1; i < left - 1 + col && i < ids.length; i++) {
      if (ids[i] !== -1) result.add(ids[i]);
    }
    return result;
  });

  /** 将 container 内的 page 按 page-id（升序）物理排序；id 相同/缺失时按原文档序 */
  const sortPages = (container: HTMLElement): void => {
    const pages = Array.from(
      container.querySelectorAll<HTMLElement>(".example-page"),
    ).map((el, i) => ({
      el,
      id: parseInt(el.getAttribute("page-id") ?? "") ?? NaN,
      domIndex: i,
    }));

    pages.sort((a, b) => {
      const aId = Number.isNaN(a.id) ? Infinity : a.id;
      const bId = Number.isNaN(b.id) ? Infinity : b.id;
      if (aId !== bId) return aId - bId;
      return a.domIndex - b.domIndex;
    });

    pages.forEach((p) => container.appendChild(p.el));
  };

  /** 同步所有 container */
  const sortAllContainers = (): void => {
    document
      .querySelectorAll<HTMLElement>(".example-container")
      .forEach(sortPages);
  };

  /** 计算当前断点下的理想列数 */
  const getResponsiveCol = (): number => {
    const w: number = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1080) return 2;
    return 3;
  };

  /** 布局更新核心逻辑 */
  const updateLayout = (): void => {
    document
      .querySelectorAll<HTMLElement>(".example-container")
      .forEach((container) => {
        const pages = container.querySelectorAll<HTMLElement>(".example-page");
        const pageCount: number = pages.length;
        const scrollTarget: Element | null = container.closest(
          ".example-scroll-target",
        );

        let col: number;
        if (isAutoMode) {
          col = getResponsiveCol();
          if (container.getAttribute("page-column") !== String(col)) {
            container.setAttribute("page-column", String(col));
          }
        } else {
          col = parseInt(container.getAttribute("page-column") ?? "") || 1;
        }

        if (
          document.documentElement.getAttribute("page-column") !== String(col)
        ) {
          document.documentElement.setAttribute("page-column", String(col));
        }

        const left: number =
          parseInt(container.getAttribute("page-left") ?? "") || 1;

        // 同步响应式状态（取首个 container 的值）
        if (container === document.querySelector(".example-container")) {
          currentPageColumn.value = col;
          currentPageLeft.value = left;
        }

        container.style.width = `${(pageCount / col) * 100}%`;
        const offset: number = (left - 1) * (100 / pageCount);
        container.style.transform = `translateX(-${offset}%)`;

        let vh: number = 0;
        if (scrollTarget) {
          const style: CSSStyleDeclaration =
            window.getComputedStyle(scrollTarget);
          vh =
            (scrollTarget as HTMLElement).offsetHeight -
            parseFloat(style.paddingTop) -
            parseFloat(style.paddingBottom);
        }

        pages.forEach((page, i: number) => {
          const isActive: boolean = i >= left - 1 && i < left - 1 + col;
          page.toggleAttribute("active", isActive);
          page.style.width = `${100 / pageCount}%`;

          if (isActive) {
            page.style.height = "";
          } else if (vh > 0) {
            page.style.height = `${vh}px`;
          }
        });
      });
  };

  /** 切换页面 */
  const goToPage = (action: string): void => {
    const container =
      document.querySelector<HTMLElement>(".example-container");
    if (!container) return;

    const col: number =
      parseInt(container.getAttribute("page-column") ?? "") || 1;
    const current: number =
      parseInt(container.getAttribute("page-left") ?? "") || 1;
    const total: number = container.querySelectorAll(".example-page").length;
    let target: number = current;

    if (action === "next") target = Math.min(current + 1, total - col + 1);
    else if (action === "prev") target = Math.max(current - 1, 1);
    else target = Math.max(1, Math.min(parseInt(action), total - col + 1));

    container.setAttribute("page-left", String(Math.max(1, target)));
  };

  /** 根据 page-name 设置 page-id */
  const setPageId = (pageName: string, newId: number): void => {
    const page = document.querySelector<HTMLElement>(
      `.example-page[page-name="${pageName}"]`,
    );
    if (!page) return;
    page.setAttribute("page-id", String(newId));
  };

  /** 初始化：判定模式、排序、执行首次布局、注册监听器 */
  const init = (): void => {
    const container =
      document.querySelector<HTMLElement>(".example-container");
    if (!container) return;

    isAutoMode = !container.hasAttribute("page-column");

    // 初始化排序
    sortAllContainers();
    updateLayout();

    // MutationObserver：监听 page-left / page-column / page-id 变化
    mutationObserver = new MutationObserver(
      (mutations: MutationRecord[]) => {
        let needsUpdate = false;
        mutations.forEach((m) => {
          if (
            m.attributeName === "page-left" ||
            m.attributeName === "page-column"
          )
            needsUpdate = true;
          if (m.attributeName === "page-id") {
            sortAllContainers();
            needsUpdate = true;
          }
        });
        if (needsUpdate) updateLayout();
      },
    );

    document
      .querySelectorAll<HTMLElement>(".example-container")
      .forEach((c) => {
        // 监听 container 自身属性 + 子 page 的 page-id
        mutationObserver!.observe(c, {
          attributes: true,
          subtree: true,
          attributeFilter: ["page-left", "page-column", "page-id"],
        });
      });

    resizeHandler = updateLayout;
    window.addEventListener("resize", resizeHandler);

    resizeObserver = new ResizeObserver(updateLayout);
    const scrollTarget: Element | null = container.closest(
      ".example-scroll-target",
    );
    if (scrollTarget) resizeObserver.observe(scrollTarget);
  };

  const cleanup = (): void => {
    if (mutationObserver) mutationObserver.disconnect();
    if (resizeObserver) resizeObserver.disconnect();
    if (resizeHandler) window.removeEventListener("resize", resizeHandler);
  };

  onMounted(init);
  onUnmounted(cleanup);

  return { goToPage, setPageId, currentPageColumn, currentPageLeft, activePageIds };
}
