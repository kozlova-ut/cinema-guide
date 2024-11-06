<script lang="ts" setup>
import { computed } from 'vue';
import type { IMovie } from '@/types/movie';
import { useBreakpointsStore } from '@/stores/breakpoints';
import MovieCard from '@/components/MovieCard.vue';
import CardLabel from '@/components/CardLabel.vue';
import { register } from 'swiper/element/bundle';
register();

const breakpointsStore = useBreakpointsStore();
const breakpoints = computed(() => breakpointsStore.breakpoints);

const props = defineProps<{
    movies: IMovie[];
    labels: boolean;
}>();

</script>

<template>
    <div v-if="breakpoints.md">
        <div class="wrapper">
            <div class="flex flex-wrap gap-y-16 gap-x-[4.666%] lg:gap-x-[3.125%] pt-16">
                <MovieCard v-for="(movie, index) in movies" :key="index" :movie="movie"
                    class="relative"
                >
                    <template v-if="labels" v-slot:label>
                        <CardLabel :content="String(index + 1)" class="absolute -top-3 -left-3"/>
                    </template>
                </MovieCard>
            </div>
        </div>
    </div>
    <swiper-container v-else :width="264">
        <swiper-slide v-for="(movie, index) in movies" :key="index" class="pt-10 pb-8 px-5 xs:pl-10 xs:pr-0">
            <MovieCard :movie="movie" class="relative">
                <template v-if="labels" v-slot:label>
                    <CardLabel :content="String(index + 1)" class="absolute -top-3 -left-3" />
                </template>
            </MovieCard>
        </swiper-slide>
    </swiper-container>
</template>