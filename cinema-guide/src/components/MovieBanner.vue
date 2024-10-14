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
	<div class="relative aspect-[2.465753424657534]" v-if="movie"> <!-- подумать что будет если фильм не загрузится -->
		<div class="aspect-[1.541095890410959] relative md:w-[62.5%] md:absolute md:right-0">
			<div class="w-full h-full bg-no-repeat bg-cover bg-center" :style="{backgroundImage: `url(${movie.posterUrl})`}"></div>
			<div class="overlay overlay-gradient absolute top-0 w-full h-full"></div>
		</div>
		<div class="movie__info py-6 px-5 md:relative md:max-w-screen-md lg:absolute lg:top-0 lg:bottom-0 lg:left-0 lg:px-20 lg:flex lg:items-center">
			<div>
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

.movie {

	&__info {

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
			// opacity: 0.7;
		}

		.info {
			display: flex;
			align-items: center;
			gap: 16px;
			

			& > div:not(.rating) {
				@include zxcvbn5;
				// opacity: 0.7;
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
	}
}
</style>