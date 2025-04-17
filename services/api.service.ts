// services/api.service.ts
export class ApiError extends Error {
    status?: number;
    data?: any;

    constructor(message: string, status?: number, data?: any) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}


export const apiService = {
    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T | undefined> {
        const API_URL = useRuntimeConfig().public.backendBaseUrl;
        const token = localStorage.getItem('token');

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string> || {})
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config: RequestInit = {
            ...options,
            headers
        };

        try {
            const response = await fetch(`${API_URL}/${endpoint}`, config);

            if (response.status === 401) {
                const data = await response.json();
                throw new ApiError('Unauthorized access', 401, data);
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new ApiError('Request failed', response.status, errorData);
            }

            return await response.json() as T;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                error instanceof Error ? error.message : 'Error de red desconocido'
            );
        }
    },

    get<T>(endpoint: string,options:any) {
        return this.request<T>(endpoint, {
            method: 'GET',
            ...options
        });
    },
    post<T>(endpoint: string, data: any,options:any) {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options

        });
    },

    put<T>(endpoint: string, data: any) {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    ,
    delete<T>(endpoint: string) {
        return this.request<T>(endpoint, {
            method: 'DELETE'
        });
    }
};