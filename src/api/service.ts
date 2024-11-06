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

export const fetchData = async <T>(url: string):Promise<T> =>{
    try {
        const fetchResponse = await fetch(url);
        if (!fetchResponse.ok) {
            throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        const response = await fetchResponse.json();   
        return response as T;
    }   
    catch(err) {
        throw new Error('Response was not ok: ' + err);
    }
}