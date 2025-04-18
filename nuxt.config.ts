import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '@/assets/scss/main.scss',
    
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ["@nuxt/icon", '@pinia/nuxt', '@nuxt/image', '@primevue/nuxt-module',
  '@hypernym/nuxt-anime'
  ],
  primevue: {
    components:{
      exclude: ['Form','FormField'],
      
    },
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  anime: {
    provide: true
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  runtimeConfig: {

    public: {
      backendBaseUrl: process.env.BACKEND_BASE_URL || 'http://localhost:8001',
    }
  },


});