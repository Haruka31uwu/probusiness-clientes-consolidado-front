// ~/stores/auth.ts
import { defineStore } from 'pinia'
import { apiService } from '~/services/api.service'
import type { User } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    isInitialized: false,
  }),

  actions: {
    async fetchUser() {
      try {
        if (this.isInitialized) return
        this.isInitialized = true
        const response = await apiService.get('me',{
            credentials: 'include'
        })
        console.log(response)
        this.user = response.data
        this.isAuthenticated = true
      } catch (error) {
        console.error('Error fetching user:', error)
        
        this.user = null
        this.isAuthenticated = false
        throw error
      }
    },

    async login(credentials: { email: string; password: string }) {
      try {
        await apiService.post('login', credentials, {
          credentials: 'include'// 👈 importante para que se envíen las cookies
        })
        await this.fetchUser()
      } catch (error) {
        throw error
      }
    },

    async logout() {
      try {
        await apiService.post('logout', {}, {
          credentials: 'include'// 👈 también aquí
        })
      } finally {
        this.user = null
        this.isAuthenticated = false
      }
    },
  },
})
