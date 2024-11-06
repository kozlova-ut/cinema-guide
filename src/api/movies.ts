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

export const getGenres = async(): Promise<string[]> => {
	return fetchData<string[]>('https://cinemaguide.skillbox.cc/movie/genres');
}

export const getMoviesByParams = async(params: Record<string, string>):Promise<IMovie[]> => {
	const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
	return fetchData<IMovie[]>(`https://cinemaguide.skillbox.cc/movie?${query}`)
}