export interface Module {
    id: number
    name: string
    description: string
    icon: string
    route: string|null
    subModules: Module[]
    isActive: boolean,
    isOpen?: boolean
  }
  