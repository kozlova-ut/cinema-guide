<script lang="ts" setup>
import { computed } from 'vue';
import { useBreakpointsStore } from '@/stores/breakpoints';
import type { IMovie } from '@/types/movie';
import { formatRating, formatDuration } from '@/utils/formatters';
import { useRoute, RouterLink } from 'vue-router';

const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);

const props = defineProps<{
	movie: IMovie;
}>();

const emit = defineEmits<{
  (event: 'load-random-movie'): void;
}>();

const route = useRoute();

const isHomePage = computed(() => {
    return route.name === 'home'; 
}); 

</script>

<template>
	<div v-if="movie" class="relative aspect-[2.465753424657534]"> 
		<div class="aspect-[1.541095890410959] relative md:w-[62.5%] md:absolute md:right-0" v-if="breakpoints.md || movie.backdropUrl || movie.posterUrl">
			<div class="w-full h-full bg-no-repeat bg-cover bg-center" :style="{backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`}"></div>
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
						<RouterLink :to="`/movie/${movie.id}`" class="button grow sm:grow-0 sm:px-12" v-if="isHomePage">
							О фильме
						</RouterLink>
						<button class="button">
							<img src="@/assets/img/favorites.svg" alt="add to favorites">
						</button>
						<button class="button" @click="emit('load-random-movie')" v-if="isHomePage">
							<img src="@/assets/img/random.svg" alt="show a random movie">
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>