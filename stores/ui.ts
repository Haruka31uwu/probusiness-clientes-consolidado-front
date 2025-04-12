import { defineStore } from 'pinia'
import type { Module } from '~/types/ui'

export const useUiStore = defineStore('ui', () => {
  const selectedModule = ref<Module | null>(null)
  const isSidebarOpen = ref(false)
  const isDarkMode = ref(false)
  const modules = ref<Module[]>([
    {
        id: 1,
        name: 'Inicio',
        route: '/',
        icon: 'home',
        subModules: [],
        isActive: false,
        description: '',
        isOpen: false
    },
    {
        id: 2,
        name: 'Mis importaciones',
        route: null,
        icon: 'import',
        isOpen: false,
        subModules: [
            {
                id: 3,
                name: 'Trayecto',
                route: '/importaciones/trayecto',
                icon: 'submodule-a',
                subModules: [],
                isActive: false,
                description: '',
                isOpen: false
            },
            {
                id: 4,
                name: 'Entregados',
                route: '/importaciones/entregados',
                icon: 'submodule-b',
                subModules: [],
                isActive: false,
                description: '',
                isOpen: false
            }
        ],
        isActive: false,
        description: ''
    },
  ])  
  // Restaurar del sessionStorage
  if (process.client) {
    const stored = sessionStorage.getItem('selectedModule')
    if (stored) selectedModule.value = JSON.parse(stored)
  }

  // Actions
  const selectModule = (module: Module) => {
    // Desmarcar todos los módulos
    modules.value.forEach(m => m.isActive = false)
    
    // Marcar el módulo seleccionado
    module.isActive = true
    selectedModule.value = module
    console.log('selectedModule', selectedModule.value)
  }

  const openSubModules = (module: Module) => {
    // Desmarcar todos los módulos
    modules.value.forEach(m => m.isActive = false)
    
    // Marcar el módulo seleccionado
    module.isActive = true

    // Guardar en sessionStorage
    if (process.client) {
      sessionStorage.setItem('selectedModule', JSON.stringify(module))
    }
  }
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  // Getters
  const getIsSidebarOpen = computed(() => isSidebarOpen.value)
  const getIsDarkMode = computed(() => isDarkMode.value)
  const getSelectedModule = computed(() => selectedModule.value)
  return {
    // state
    selectedModule,
    isSidebarOpen,
    isDarkMode,
    modules,
    
    // actions
    selectModule,
    toggleSidebar,
    toggleDarkMode,

    // getters
    getIsSidebarOpen,
    getIsDarkMode
  }
})
