<script lang="ts" setup>
import { computed } from 'vue';
import { useBreakpointsStore } from '@/stores/breakpoints';

const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);

</script>

<template>
<img v-if="breakpoints.point1024" src="@/assets/img/search.svg" alt="Поиск">
<div class="search" v-else>
	<input  type="text" placeholder="Поиск">
</div>

</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
@import '@/assets/scss/variables.scss';

.search {
	position: relative;
	padding: 12px 16px 12px 52px;
	flex-grow: 1;
	background: $gray;
	border-radius: 8px;
	
	input {
		width: 100%;
		background: none;
		border: none;
		outline: none;
		@include zxcvbn2;
	}

	&::before {
		content: url('@/assets/img/search.svg');
		width: 24px;
		height: 24px;
		position: absolute;
		left: 16px;
		opacity: 0.5;
	}
}
</style>