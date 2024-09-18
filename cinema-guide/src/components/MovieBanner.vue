<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useBreakpointsStore } from '@/stores/breakpoints';
import type { IMovie } from '@/types/movie';
import { getRandomMovie } from '@/api/movies';
import { formatRating, formatDuration } from '@/utils/formatters';
import { useRoute, RouterLink } from 'vue-router';

const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);

const movie = ref<IMovie | null>(null);

const props = defineProps<{
	currentMovie?: IMovie;
}>();

const route = useRoute();


const loadMovie = async () => {
	if (props.currentMovie) {
		movie.value = props.currentMovie;
	}
	else {
		const response = await getRandomMovie();
		if (response) {
			movie.value = response;
		}
	}
}

const isHomePage = computed(() => {
    return route.name === 'home'; 
}); 

onMounted(() => {
	loadMovie();
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
				<div class="buttons">
					<button :class="['button', 'trailer', 'wide', 'accent', {'width100': breakpoints.point768 && isHomePage, 'flexgrow1': breakpoints.point768 && !isHomePage}]">
						Трейлер
					</button>
					<RouterLink :to="`/movie/${movie?.id}`" class="button about wide" v-if="isHomePage">
						О фильме
					</RouterLink>
					<button class="button favourites round">
						<img src="@/assets/img/favorites.svg" alt="add to favorites">
					</button>
					<button class="button random round" @click="loadMovie" v-if="isHomePage">
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

			.button {
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