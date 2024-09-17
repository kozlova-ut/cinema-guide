<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useBreakpointsStore } from '@/stores/breakpoints';
import type { IMovie } from '@/types/movie';
import { getRandomMovie } from '@/api/movies';
import { formatRating, formatDuration } from '@/utils/formatters';


const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);

const movie = ref<IMovie>();

const loadRandomMovie = async() => {
	const response = await getRandomMovie();
	console.log(response);
	if (response) {
		movie.value = response;
	}	
}

onMounted(() => {
    loadRandomMovie();
});

</script>

<template>
	<div class="banner" v-if="movie"> <!-- подумать что будет если фильм не загрузится -->
		<div class="movie__image">
			<div class="img" :style="{backgroundImage: `url(${movie.posterUrl})`}"></div>
			<div class="overlay"></div>
		</div>
		<div class="movie__info">
			<div class="content">
				<div class="info">
					<div class="rating">{{ formatRating(movie.tmdbRating) }}</div>
					<div class="year">{{ movie.releaseYear }}</div>
					<div class="genre">{{ movie.genres[0] }}</div>
					<div class="duration">{{ formatDuration(movie.runtime) }}</div>
				</div>
				<h2 class="title">
					{{ movie.title }}
				</h2>
				<span class="description">{{ movie.plot }}</span>
				<div class="buttons"> <!-- добавить признак отображения кнопок на главной -->
					<button :class="['trailer', 'wide', 'accent', {'width100': breakpoints.point768}]">Трейлер</button>
					<button class="about wide">О фильме</button>
					<button class="favourites round">
						<img src="@/assets/img/favorites.svg" alt="add to favorites">
					</button>
					<button class="random round" @click="loadRandomMovie">
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
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
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
				@include rating($green); // реализовать смену цветов в зависимости от рейтинга
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

			@media ($point425) {
				margin-top: 32px;
				justify-content: space-between;
			}
		}

		@media ($point1024) {
			padding: 0px 40px;
			bottom: auto;
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
			background-repeat: no-repeat;
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