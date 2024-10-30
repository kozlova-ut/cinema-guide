<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { IMovie } from '@/types/movie';
import MovieBanner from '@/components/MovieBanner.vue';
import MovieList from '@/components/MovieList.vue'
import { getTop10, getRandomMovie } from '@/api/movies';
import type { ApiResponse } from '@/types/service';
import { useApi } from '@/utils/apiService';
import LoadingStatus from '@/components/LoadingStatus.vue';

const moviesResponse = ref<ApiResponse<IMovie[]>>({
	data: null,
	hasError: false,
	isLoading: true
})

const randomMovieResponse = ref<ApiResponse<IMovie>>({
	data: null,
	hasError:false,
	isLoading: true
})

const loadMovies = async () => {
    const [top10ApiResponse, randomMovieApiResponse] = await Promise.all([
        useApi(() => getTop10()),
        useApi(() => getRandomMovie())
    ]);

    moviesResponse.value = top10ApiResponse;
    randomMovieResponse.value = randomMovieApiResponse;
}

const loadNewRandomMovie = async () => {
	const randomMovieApiResponse = await useApi(() => getRandomMovie());
    randomMovieResponse.value = randomMovieApiResponse;
}

const loadingFinished = ref(false);

const handleLoadingFinished = () => {
	loadingFinished.value = true;
}

onMounted(() => {
	loadMovies();
})

</script>

<template>
	<LoadingStatus :responseArray="[moviesResponse, randomMovieResponse]" @loading-finished="handleLoadingFinished" />
	<div v-if="loadingFinished">
		<MovieBanner v-if="randomMovieResponse.data" :movie="randomMovieResponse.data" @load-random-movie="loadNewRandomMovie" />
		<div v-if="moviesResponse.data" class="pt-10 md:pb-[120px]">
			<div class="wrapper">
				<h1 class="font-play-bold text-2xl md:text-[40px]/[48px]">
					Топ 10 фильмов
				</h1>
			</div>
			<MovieList :movies="moviesResponse.data" :labels="true" class="md:pt-16" />
		</div>
	</div>
</template>