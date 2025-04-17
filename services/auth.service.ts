import type { AuthResponse } from "~/types/auth";
import { apiService } from "./api.service";
import { useAuthStore } from "~/stores/auth.store";
//use auth store
export const handleLogout = async () => {
    // Eliminar token del localStorage
    localStorage.removeItem('token');

    // Opcionalmente, hacer una petición al endpoint de logout en el backend
    await apiService.post('/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }, {

    }).catch(err => console.log('Error al hacer logout en el servidor:', err));
};
export const login = async (email: string, password: string) => {
    try {
        const response = await apiService.post<AuthResponse>('login',
            {
                email,
                password
            },
            {
                credentials: 'include'
            }
        );

        if (!response) {
            throw new Error('No se recibió respuesta del servidor');
        }
        if (response) {
            // Guardar el token en el localStorage
            //set token in cookie 


            // Guardar el token en el store
            // authStore.setToken(response.access_token);
            return response;
        } else {
            throw new Error('Error al iniciar sesión');
        }
    } catch (error) {

        throw error;
    }

}