import type { ApiResponse } from "@/types/service"

export const useApi = async <T>(
    apiFunction: (...args: any[]) => Promise<T>,
    ...args: any[]
): Promise<ApiResponse<T>> => {
    const response: ApiResponse<T> = {
        data: null,
        hasError: false,
        isLoading: true,
    }

    try {
        response.data = await apiFunction(...args);
    }
    catch (error) {
        response.hasError = true;
    }
    finally {
        response.isLoading = false;
    }

    return response
}