<script lang="ts" setup>
import type { IMovie } from '@/types/movie';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    movie: IMovie;
}>();

const background = props.movie.posterUrl || props.movie.backdropUrl;

</script>

<template>
    <RouterLink :to="`/movie/${movie.id}`"
        :class="['block w-[224px] md:w-[21.5%] lg:w-[17.5%] aspect-[2/3] rounded-2xl card-glow', 
            {'bg-no-repeat bg-cover bg-center': background},
            {'bg-black flex items-center justify-center': !background}
            ]" 
        :style="background ? {backgroundImage: `url(${background})`} : {}"
    >
        <h3 v-if="!background" class="text-center text-lg/6 opacity-70">
            {{ movie.title }}
        </h3>
        <slot name="label"></slot>
    </RouterLink>  
</template>

