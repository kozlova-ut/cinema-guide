import { defineStore } from 'pinia';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import type { Breakpoints } from '@/types/service';

export const useBreakpointsStore = defineStore('breakpoints', () => {
  const innerWidth = ref<number>(window.innerWidth);

  const breakpoints = computed<Breakpoints>(() => ({
		xs: innerWidth.value >=425,
		sm: innerWidth.value >=640,
		md: innerWidth.value >=768,
		lg: innerWidth.value >=1024,
		xl: innerWidth.value >=1280,
		xxl: innerWidth.value >=1536,
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