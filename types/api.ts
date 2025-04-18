export interface ApiOptions{
    method: string
    headers?: {
        [key: string]: string
    }
    body?: any
    params?: {
        [key: string]: any
    }
}