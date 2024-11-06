import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getMoviesByParams } from '@/api/movies';

export const useGenresImagesStore = defineStore('genres-images', () => {
    const genresImageCache = ref<Record<string, string>>({});

    const getRandomMovieImage = async (genre: string): Promise<string | null> => {
        const movies = await getMoviesByParams({ genre });

        if (movies.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * movies.length);
        return movies[randomIndex].posterUrl || movies[randomIndex].backdropUrl || null;
    };

    const getGenreImage = async (genre: string):Promise<string | null> => {
        if (genresImageCache.value[genre]) {
            return genresImageCache.value[genre];
        }

        let imageUrl;
        do {
            imageUrl = await getRandomMovieImage(genre);
        } while (imageUrl && Object.values(genresImageCache.value).includes(imageUrl));

        if (imageUrl) {
            genresImageCache.value[genre] = imageUrl;
        }

        return imageUrl;
    }

    return { getGenreImage };
});