export interface Module {
  id: number
  name: string
  description: string
  icon: string | null
  route: string | null
  subModules: Module[]
  isActive: boolean
  isOpen?: boolean
}
