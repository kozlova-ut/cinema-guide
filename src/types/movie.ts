export interface IMovie {
	id: number,
	title: string,
	plot: string, 
	tmdbRating: number, 
	releaseYear: number,
	genres: string[],
	runtime: number,
	posterUrl: string,
}