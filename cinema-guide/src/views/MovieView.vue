<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { IMovie } from '@/types/movie';
import { getMovieById } from '@/api/movies';
import MovieBanner from '@/components/MovieBanner.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const movieId = Number(route.params.id);

const movie = ref<IMovie | null>(null);

const loadMovie = async () => {
	const response = await getMovieById(movieId);
	if (response) {
		movie.value = response;
	}
}

onMounted(() => {
	loadMovie();
});

</script>

<template>
	<main>
		<MovieBanner v-if="movie" :currentMovie="movie" />
	</main>
</template>

<style lang="scss" scoped>
	
</style>