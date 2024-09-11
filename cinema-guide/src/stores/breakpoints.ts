import { defineStore } from 'pinia';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import type { Breakpoints } from '@/types/service';

export const useBreakpointsStore = defineStore('breakpoints', () => {
  const innerWidth = ref<number>(window.innerWidth);

  const breakpoints = computed<Breakpoints>(() => ({
		point1024: innerWidth.value <= 1024,
		point768: innerWidth.value <= 768,
    point425: innerWidth.value <= 425,
  }));

  const handleResize = () => {
    innerWidth.value = document.documentElement.clientWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  return { breakpoints };
});