export interface IMovie {
    awardsSummary: string | null,
    budget: string | null,
    director: string | null,
    genres: string[],
    id: number,
    language: string,
    plot: string,
    posterUrl: string,
    production: string | null,
    releaseYear: number,
    revenue: string | null,
    runtime: number,
	title: string,
    tmdbRating: number,   
}

export interface MovieDetail {
    label: string;
    value: string | null;
}