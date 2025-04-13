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
      icon: 'box',
      isOpen: false,
      subModules: [
        {
          id: 3,
          name: 'Trayecto',
          route: '/importaciones/trayecto',
          icon: null,
          subModules: [],
          isActive: false,
          description: '',
          isOpen: false
        },
        {
          id: 4,
          name: 'Entregados',
          route: '/importaciones/entregados',
          icon: null,
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
  }
  const selectSubModule = (subModule: Module) => {
    // Desmarcar todos los submódulos
    modules.value.forEach(m => {
      m.subModules.forEach(sm => sm.isActive = false)
    })
    //set parent module as isOpen
    const parentModule = modules.value.find(m => m.subModules.some(sm => sm.id === subModule.id))
    if (parentModule) {
      parentModule.isOpen = true
    }

    // Marcar el submódulo seleccionado
    subModule.isActive = true
    selectedModule.value = subModule
  }

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }
  const selectModuleByRoute = () => {
    const route = window.location.pathname
    const module = modules.value.find(m => m.route === route)
    if (module) {
      selectModule(module)
    } else {
      const subModule = modules.value.flatMap(m => m.subModules).find(sm => sm.route === route)
      if (subModule) {
        selectSubModule(subModule)
      }
    }
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
    getSelectedModule,
    // actions
    selectModule,
    selectSubModule,
    toggleSidebar,
    toggleDarkMode,
    selectModuleByRoute,
    // getters
    getIsSidebarOpen,
    getIsDarkMode
  }
})
