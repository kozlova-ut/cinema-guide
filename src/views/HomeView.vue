<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { IMovie } from '@/types/movie';
import MovieBanner from '@/components/MovieBanner.vue';
import MovieList from '@/components/MovieList.vue'
import { getTop10 } from '@/api/movies';

const movies = ref<IMovie[]>([]);

const loadMovies = async () => {
	const response = await getTop10();
	if (response) {
		movies.value = response;
	}
}

onMounted(() => {
	loadMovies();
});
</script>

<template>
	<MovieBanner />
		<div class="pt-10 md:pb-[120px]">
			<div class="wrapper">
				<h1 class="font-play-bold text-2xl md:text-[40px]/[48px]">
					Топ 10 фильмов
				</h1>
			</div>
			
			<MovieList :movies="movies" :labels="true" class="md:pt-16" />
		</div>
</template>