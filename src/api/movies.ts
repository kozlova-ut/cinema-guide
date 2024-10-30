import type { IMovie } from "@/types/movie";
import { fetchData } from "./service";

export const getRandomMovie = async(): Promise<IMovie> => {
	return fetchData<IMovie>('https://cinemaguide.skillbox.cc/movie/random');
}

export const getMovieById = async(id:number): Promise<IMovie> => {
	return fetchData<IMovie>(`https://cinemaguide.skillbox.cc/movie/${id}`);
}

export const getTop10 = async(): Promise<IMovie[]> => {
	return fetchData<IMovie[]>('https://cinemaguide.skillbox.cc/movie/top10');
}