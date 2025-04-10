import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css','@/assets/scss/main.scss'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ["@nuxt/icon"],
  runtimeConfig: {
    
    public: {
      backendBaseUrl: process.env.BACKEND_BASE_URL || 'http://localhost:8001',
    }
  },
 

});