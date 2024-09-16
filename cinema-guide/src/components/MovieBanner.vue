<script lang="ts" setup>
import { computed } from 'vue';
import { useBreakpointsStore } from '@/stores/breakpoints';
const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);
	
</script>

<template>
	<div class="banner">
		<div class="movie__image">
			<div class="img"></div>
			<div class="overlay"></div>
		</div>
		<div class="movie__info">
			<div class="content">
				<div class="info">
					<div class="rating">7,5</div>
					<div class="year">1979</div>
					<div class="genre">детектив</div>
					<div class="duration">1 ч 7 мин</div>
				</div>
				<h2 class="title">
					Шерлок Холмс и доктор Ватсон: Знакомство
				</h2>
				<span class="description">Увлекательные приключения самого известного сыщика всех времен</span>
				<div class="buttons">
					<button :class="['trailer', 'wide', 'accent', {'width100': breakpoints.point768}]">Трейлер</button>
					<button class="about wide">О фильме</button>
					<button class="favourites round">
						<img src="@/assets/img/favorites.svg" alt="add to favorites">
					</button>
					<button class="random round">
						<img src="@/assets/img/random.svg" alt="show a random movie">
					</button>
				</div>
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
@import '@/assets/scss/variables.scss';

.banner {
	position: relative;
	aspect-ratio: 2.465753424657534;
}

.movie {

	&__info {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	max-width: 760px;
	padding: 0px 80px;
	display: flex;
	align-items: center;

		.title {
			margin: 16px 0px;
			@include zxcvbn3;

			@media ($point1024) {
				margin: 12px 0px;
			}
		}

		.description {
			@include zxcvbn1;
			opacity: 0.7;
		}

		.info {
			display: flex;
			align-items: center;
			gap: 16px;
			

			& > div:not(.rating) {
				@include zxcvbn5;
				opacity: 0.7;
			}

			.rating {
				@include rating($green);
			}
		}

		.buttons {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
			margin-top: 60px;

			button {
				@include button;
			}

			@media ($point1024) {
				margin-top: 20px;
			}
		}

		@media ($point1024) {
			padding: 0px 40px;
		}

		@media ($point768) {
			position: relative;
			padding: 24px 20px;
		}

		@media ($point425) {
			padding: 32px 20px;
		}
	}

	&__image {
		position: absolute;
		top: 0px;
		right: 0px;
		width: 62.5%;
		height: auto;
		aspect-ratio: 1.541095890410959;
		
		.img {
			width: 100%;
			height: 100%;
			background: url('@/assets/img/banner.png') no-repeat;
			background-size: cover;
			background-position: center;
		}

		.overlay {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.5) 20.41%, rgba(0, 0, 0, 0) 100%);

			@media ($point768) {
				transform: rotate(-180deg)
			}
		}

		@media ($point768) {
			position: relative;
			width: 100%;
		}
	}
}


</style>