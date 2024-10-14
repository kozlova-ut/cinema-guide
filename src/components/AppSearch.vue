<script lang="ts" setup>
import { computed } from 'vue';
import { useBreakpointsStore } from '@/stores/breakpoints';

const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);

</script>

<template>
<div v-if="breakpoints.lg" class="flex grow py-3 px-4 bg-gray rounded-lg">
	<img src="@/assets/img/search.svg" class="w-6 h-6 mr-3 opacity-50" alt="icon">
	<input class="w-full bg-transparent border-none outline-none text-lg/6" type="text" placeholder="Поиск">
</div>
<img v-else src="@/assets/img/search.svg" alt="Поиск">
</template>