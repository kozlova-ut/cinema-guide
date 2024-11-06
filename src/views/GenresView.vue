<script lang="ts" setup>
import { getGenres } from '@/api/movies';
import { useGenresImagesStore } from '@/stores/genresImages';
import type { ApiResponse } from '@/types/service';
import { useApi } from '@/api/service';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import LoadingStatus from '@/components/LoadingStatus.vue';

const genresImagesStore = useGenresImagesStore();

const genresResponse = ref<ApiResponse<string[]>>({
    data: null,
    hasError: false,
    isLoading: true
})

const genresImages = ref<Record<string, string | null>>({});

const loadGenres = async () => {
    genresResponse.value = await useApi(() => getGenres());

    if (genresResponse.value.data) {
        for (const genre of genresResponse.value.data) {
            genresImages.value[genre] = await genresImagesStore.getGenreImage(genre);
        }
    }
}

onMounted(() => {
    loadGenres();
})


const loadingFinished = ref(false);

const handleLoadingFinished = () => {
	loadingFinished.value = true;
}
	
</script>

<template>
    <LoadingStatus :responseArray="[genresResponse]" @loading-finished="handleLoadingFinished" />
    <div v-if="loadingFinished && genresResponse.data">
        <div class="wrapper">
            <div class="pt-6 pb-10 md:pt-16 md:pb-[160px]">
                <h1 class="font-play-bold text-2xl md:text-5xl">
					Жанры фильмов
				</h1>
                <div class="pt-10 md:pt-16">
                    <div class="flex flex-wrap gap-6 sm:gap-y-16 gap-x-[3.125%]">
                        <RouterLink v-for="(image, genre) of genresImages" :to="`/genres/${genre}`" :key="genre" 
                        class="w-full sm:w-[48.43%] md:w-[31.25%] lg:w-[22.656%] h-[304px] card-glow rounded-3xl overflow-hidden flex flex-col"
                        >
                            <div class="bg-no-repeat bg-cover bg-center grow" 
                                :style="{ backgroundImage: `url(${image})` }">
                            </div>
                            <div class="bg-black bottom-0 w-full pt-[22px] pb-[30px] text-center font-play-bold text-2xl capitalize">
                                {{ genre }}
                            </div>
                        </RouterLink>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>
