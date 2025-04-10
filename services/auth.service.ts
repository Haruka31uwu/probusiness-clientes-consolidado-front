
class AuthService {
    //login method using fetch and process.env.NEXT_PUBLIC_API_URL
    async login({email, password}: {email: string, password: string}) {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.backendBaseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    }
}
export default new AuthService();