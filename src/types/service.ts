export interface Breakpoints {
	xs: boolean,
	sm: boolean,
	md: boolean,
	lg: boolean,
	xl: boolean,
	xxl: boolean,
}

export interface ApiResponse<T> {
	data: T | null;
	hasError: boolean;
	isLoading: boolean;
}