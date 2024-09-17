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