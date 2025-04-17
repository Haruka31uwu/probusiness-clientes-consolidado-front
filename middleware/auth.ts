// middleware/guest.ts
export default defineNuxtRouteMiddleware(async () => {
    const auth = useAuthStore()
    if (!auth.isAuthenticated) {
      try {
        await auth.fetchUser()
      } catch {
        return // No autenticado, permitir quedarse en login
      }
    }
  
    // Si ya está autenticado, redirige al dashboard
    return navigateTo('/')
  })
  