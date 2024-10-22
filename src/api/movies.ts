import type { IMovie } from "@/types/movie";

export const getRandomMovie = async(): Promise<IMovie> => {
	try {
		const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/movie/random');
		const response = await fetchResponse.json();
		return response as IMovie; //проверить безопасно ли
	}
	catch(err) {
		throw new Error('response was not ok');
	}
}

export const getMovieById = async(id:number): Promise<IMovie> => {
	try {
		const fetchResponse = await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`);
		const response = await fetchResponse.json();
		return response as IMovie; //проверить безопасно ли
	}
	catch(err) {
		throw new Error('response was not ok');
	}
}

export const getTop10 = async(): Promise<IMovie[]> => {
	try {
		const fetchResponse = await fetch(`https://cinemaguide.skillbox.cc/movie/top10`);
		const response = await fetchResponse.json();
		return response as IMovie[]; //проверить безопасно ли
	}
	catch(err) {
		throw new Error('response was not ok');
	}
}