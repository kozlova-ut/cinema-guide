<script lang="ts" setup>
import AppLogo from './AppLogo.vue';
import AppSearch from './AppSearch.vue';
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
						<RouterLink to="/">Главная</RouterLink>
						<RouterLink to="/about">Жанры</RouterLink>
					</nav>
					<AppSearch />
				</div>
				<button>Войти</button>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.header {
	&__content {
		width: 100%;
		display: flex;
		gap: 80px;
		align-items: center;
		padding: 32px 0px;

		button {
			border: none;
			background: transparent;
			cursor: pointer;
			@include zxcvbn1;
		}
	}

	&__nav {
		display: flex;
		flex-grow: 1;
		align-items: center;

		a {
			margin-right: 40px;
			@include zxcvbn1;
		}
	}
}

</style>