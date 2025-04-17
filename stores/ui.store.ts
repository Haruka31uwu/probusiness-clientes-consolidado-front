import type { Module } from '~/types/ui'

export const useUiStore = defineStore('ui', () => {
  const selectedModule = ref<Module | null>(null)
  const isSidebarOpen = ref(false)
  const isDarkMode = ref(false)
  const isLoading = ref(false)
  const modules = ref<Module[]>([
    {
      id: 1,
      name: 'Inicio',
      nameSection: 'Inicio',
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
      nameSection: 'Mis Importaciones',
      route: null,
      icon: 'box',
      isOpen: false,
      subModules: [
        {
          id: 3,
          name: 'Trayecto',
          nameSection: 'En trayecto',
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
          nameSection: 'Entregados',
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
  const initializeFromSessionStorage = () => {
    if (process.client) {
      nextTick(() => {
        const stored = sessionStorage.getItem('selectedModule')
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            // Verificamos que el módulo almacenado existe en nuestra lista
            const foundModule = modules.value.find(m => m.id === parsed.id) ||
              modules.value.flatMap(m => m.subModules).find(sm => sm.id === parsed.id)
            if (foundModule) {
              foundModule.isActive = true
              selectedModule.value = foundModule
            } else {
              console.warn('Stored module not found in modules list', parsed)
              sessionStorage.removeItem('selectedModule')
            }
          } catch (e) {
            console.error('Error parsing stored module', e)
            sessionStorage.removeItem('selectedModule')
          }
        }
      })
    }
  }

  // Llamamos a la inicialización cuando se crea el store

  // Actions
  const selectModule = (module: Module) => {
    // Desmarcar todos los módulos
    modules.value.forEach(m => m.isActive = false)

    // Marcar el módulo seleccionado
    module.isActive = true
    selectedModule.value = module
    if (process.client) {
      sessionStorage.setItem('selectedModule', JSON.stringify(module))
    }
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
    //set in sessionStorage
    if (process.client) {
      sessionStorage.setItem('selectedModule', JSON.stringify(subModule))
    }
  }

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    // if(isDarkMode.value) {
    //   document.body.classList.add('dark-mode');
    // }else {
    //   document.body.classList.remove('dark-mode');
    // }
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
  const getParentModule = (subModule: Module) => {
    return modules.value.find(m => m.subModules.some(sm => sm.id === subModule.id))
  }
  const showLoading = () => {
    isLoading.value = true
  }
  const hideLoading = () => {
    isLoading.value = false
  }
  // Getters
  const getIsSidebarOpen = computed(() => isSidebarOpen.value)
  const getIsDarkMode = computed(() => isDarkMode.value)
  const getSelectedModule = computed(() => selectedModule.value)
  const getIsLoading = computed(() => isLoading.value)
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
    getIsDarkMode,
    getParentModule,
    initializeFromSessionStorage,
    showLoading,
    hideLoading,
    getIsLoading
  }
})
