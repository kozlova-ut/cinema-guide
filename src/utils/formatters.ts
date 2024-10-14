export function formatRating(rating: number | null | undefined): string {
	if (rating === null || rating === undefined) {
			return '0,0';
	}
	return rating.toFixed(1).replace('.', ',');
}

export function formatDuration(duration: number):string {
	const hours = Math.floor(duration / 60);
	const minutes = duration - hours*60;
	return `${hours} ч ${minutes} мин`
}