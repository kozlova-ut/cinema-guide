<script lang="ts" setup>
import { computed } from 'vue';
import AppLogo from './AppLogo.vue';
import AppSearch from '@/components/AppSearch.vue';
import { useBreakpointsStore } from '@/stores/breakpoints';

const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="header__content">
				<RouterLink to="/" class="logo">
					<AppLogo />
				</RouterLink>
				<div class="header__nav">
					<nav>
						<RouterLink to="/" v-if="!breakpoints.point768">
							Главная
						</RouterLink>
						<RouterLink class="genres" to="/genres">
							<img v-if="breakpoints.point768" src="@/assets/img/genres.svg" alt="Жанры">
							<span v-else>Жанры</span>
						</RouterLink>
					</nav>
					<div class="search"><AppSearch /></div>
				</div>
				<button>
					<img v-if="breakpoints.point1024" src="@/assets/img/lk.svg" alt="Личный кабинет">
					<span v-else>Войти</span>
				</button>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
@import '@/assets/scss/variables.scss';

.header {
	position: sticky;
	top: 0;
	z-index: 100;
	background: rgba(#000000, 0.9);

	&__content {
		width: 100%;
		display: flex;
		gap: 80px;
		align-items: center;
		padding: 32px 0px;

		button {
			display: flex;
			border: none;
			background: transparent;
			cursor: pointer;
			@include zxcvbn1;
		}

		@media ($point1024) {
			gap: 0px;
		}
	}

	&__nav {
		display: flex;
		flex-grow: 1;
		align-items: center;

		nav {
			display: flex;
			align-items: center;
		}

		a {
			padding: 8px 0px;
			margin-right: 40px;
			@include zxcvbn1;

			&.genres {
				display: inline-flex;

				@media ($point768) {
					margin: 0px 20px;;
				}
			}

			&.router-link-active {
				border-bottom: 1.5px solid $accent-additional;
			}
		}

		.search {
			width: 100%;
			display: flex;

			@media ($point1024) {
				width: auto;
				margin-right: 20px;
			}
		}

		@media ($point1024) {
			justify-content: flex-end;
		}
	}
}

</style>