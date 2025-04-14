export default defineNuxtPlugin(({ $pinia }) => {
    const uiStore = useUiStore()

    // Esperar a que el DOM esté listo
    if (process.client) {
        setTimeout(() => {
            uiStore.initializeFromSessionStorage()
        }, 0)
    }
})