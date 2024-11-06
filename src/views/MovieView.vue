<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import type { IMovie, MovieDetail } from '@/types/movie';
import { getMovieById } from '@/api/movies';
import MovieBanner from '@/components/MovieBanner.vue';
import { useRoute } from 'vue-router';
import { useBreakpointsStore } from '@/stores/breakpoints';
import ISO6391 from 'iso-639-1';
import type { ApiResponse } from '@/types/service';
import { useApi } from '@/api/service';
import LoadingStatus from '@/components/LoadingStatus.vue';

const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);

const route = useRoute();
const movieId = Number(route.params.id);

const movieResponse = ref<ApiResponse<IMovie>>({
	data: null,
	hasError:false,
	isLoading: true
})

const loadMovie = async (id: number) => {
	movieResponse.value = await useApi(() => getMovieById(id));
}

onMounted(() => {
	loadMovie(movieId)
})

const getMovieDetails = (movie: IMovie):MovieDetail[] => {
	if (!movie) return [];

	const details:MovieDetail[] = [
		{ label: 'Язык оригинала', value: ISO6391.getName(movie.language) || movie.language },
		{ label: 'Бюджет', value: movie.budget },
		{ label: 'Выручка', value: movie.revenue },
		{ label: 'Режиссёр', value: movie.director },
		{ label: 'Продакшен', value: movie.production },
		{ label: 'Награды', value: movie.awardsSummary },
	]

	return details.filter(details => details.value !== null);
}

const loadingFinished = ref(false);

const handleLoadingFinished = () => {
	loadingFinished.value = true;
}

</script>

<template>
	<LoadingStatus :responseArray="[movieResponse]" @loading-finished="handleLoadingFinished" />
	<div v-if="loadingFinished && movieResponse.data">
		<MovieBanner :movie="movieResponse.data" />
		<div class="wrapper">
			<div class="py-8 md:pt-10 md:pb-[120px]">
				<h1 class="font-play-bold text-2xl md:text-[40px]/[48px]">
					О фильме
				</h1>
				<div class="pt-10 md:pt-16">
					<div class="mb-3 sm:mb-6 last:mb-0 sm:flex gap-2" v-for="detail in getMovieDetails(movieResponse.data)" :key="detail.label">
						<div class="sm:min-w-[320px] sm:flex sm:gap-2">
							<span class="text-sm opacity-50 sm:text-lg/6 sm:opacity-100">{{ detail.label }}</span>
							<div v-if="breakpoints.sm" class="grow border-b-[1px] border-white border-dashed opacity-50"></div>
						</div>
						<span class="block mt-1 text-lg/6 sm:mt-0">{{ detail.value }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
