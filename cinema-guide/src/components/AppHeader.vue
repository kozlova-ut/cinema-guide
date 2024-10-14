<script lang="ts" setup>
import { computed } from 'vue';
import AppLogo from './AppLogo.vue';
import AppSearch from '@/components/AppSearch.vue';
import { useBreakpointsStore } from '@/stores/breakpoints';

const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);
</script>

<template>
	<header class="sticky top-0 z-50 bg-black/90">
		<div class="wrapper">
			<div class="py-8 flex gap-0 lg:gap-20 items-center">
				<RouterLink to="/" class="border-none">
					<AppLogo />
				</RouterLink>
				<div class="flex grow items-center justify-end lg:justify-normal">
					<nav class="flex items-center">
						<RouterLink class="router-link py-2 mr-10" to="/" v-if="breakpoints.md">
							<span class="text-2xl">Главная</span>
						</RouterLink>
						<RouterLink class="router-link py-2 mr-5 md:mr-10" to="/genres">
							<span class="text-2xl" v-if="breakpoints.md">Жанры</span>
							<img v-else src="@/assets/img/genres.svg" alt="Жанры">
						</RouterLink>
					</nav>
					<div class="flex w-auto mr-5 lg:w-full lg:mr-0"><AppSearch /></div>
				</div>
				<button class="text-2xl">
					<span v-if="breakpoints.lg">Войти</span>
					<img v-else src="@/assets/img/lk.svg" alt="Личный кабинет">
				</button>
			</div>
		</div>
	</header>
</template>