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
		<div class="aspect-[2.465753424657534] relative flex items-center">
			<div class="wrapper">
				<div class="py-6 max-w-[600px]">
					<div class="flex gap-4 items-center">
						<div :class="['flex gap-1 px-3 py-1 rounded-2xl font-play-bold text-lg/6', 
							{'bg-rating-red': movie.tmdbRating < 5,
								'bg-rating-gray': movie.tmdbRating >= 5 && movie.tmdbRating < 7,
								'bg-rating-green': movie.tmdbRating >= 7 && movie.tmdbRating < 8.5,
								'bg-rating-gold': movie.tmdbRating >= 8.5 
							}]">
							<img src="@/assets/img/star.svg" alt="star">
							{{ formatRating(movie.tmdbRating) }}
						</div>
						<div class="text-sm xs:text-lg/6 opacity-70">{{ movie.releaseYear }}</div>
						<div class="text-sm xs:text-lg/6 opacity-70">{{ movie.genres[0] }}</div>
						<div class="text-sm xs:text-lg/6 opacity-70">{{ formatDuration(movie.runtime) }}</div>
					</div>
					<h2 class="my-3 md:my-4 font-play-bold text-2xl md:text-5xl">
						{{ movie.title }}
					</h2>
					<span class="text-lg/6 md:text-2xl opacity-70 md:line-clamp-2">{{ movie.plot }}</span>
					<div class="mt-8 md:mt-[60px] flex gap-4 flex-wrap">
						<button :class="['button bg-accent-main sm:px-12',  {'w-full': isHomePage && !breakpoints.sm, 'grow': !isHomePage && !breakpoints.md}]">
							Трейлер
						</button>
						<RouterLink :to="`/movie/${movie?.id}`" class="button grow sm:grow-0 sm:px-12" v-if="isHomePage">
							О фильме
						</RouterLink>
						<button class="button">
							<img src="@/assets/img/favorites.svg" alt="add to favorites">
						</button>
						<button class="button" @click="loadMovie" v-if="isHomePage">
							<img src="@/assets/img/random.svg" alt="show a random movie">
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>