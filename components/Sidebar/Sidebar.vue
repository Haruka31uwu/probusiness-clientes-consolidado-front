<template>
  <aside class="sidebar">
    <h1 class="sidebar__title">
      probusiness
      <img src="~/assets/img/logo.png" alt="Logo" class="sidebar__logo" />
    </h1>

    <nav class="sidebar__nav">
      <small>Menu</small>
      <ul class="sidebar__list">
        <li v-for="module in modules" :key="module.id">
          <div 
          
          v-if="module.subModules && module.subModules.length > 0" class="sidebar__link flex flex-column"
            @click="toggleSubModule(module)">
            <div class="flex flex-row">
              <i :class="module.icon"></i>
              {{ module.name }}
              <span @click.stop="toggleSubModule(module)">
                arrow
              </span>
            </div>
            <div v-if="module.isOpen" class="sidebar__sublist" :class="{ 'sidebar__sublist--active': module.isOpen }">
              <ul class="sidebar__sublist">
                <NuxtLink v-for="subModule in module.subModules" :key="subModule.id"
                  @NuxtLink.stop="selectModule(subModule)"
                  :class="{ 'sidebar__subitem--active': selectedModule === subModule }" :to="subModule.route">
                  <span>{{ subModule.name }}</span>
                </NuxtLink>
              </ul>
            </div>

          </div>
          <NuxtLink v-else :to="module.route" :class="{ 'sidebar__item--active': selectedModule === module }"
            @click="selectModule(module)">
            <div>
              <span>
                <i :class="module.icon"></i>
                {{ module.name }}

              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="sidebar__divider"></div>

    <!-- Preferencias -->
    <nav class="sidebar__nav">
      <small>Preferencias</small>
      <ul class="sidebar__list">
        <li class="sidebar__item">
          <a href="#" class="sidebar__link">
            <input type="checkbox" id="modo-oscuro" class="sidebar__checkbox">
            <label for="modo-oscuro">Modo oscuro</label>
          </a>
        </li>
        <li class="sidebar__item">
          <a href="#" class="sidebar__link">
            <input type="checkbox" id="miguel" class="sidebar__checkbox">
            <label for="miguel">Miguel</label>
          </a>
        </li>
        <li class="sidebar__item">
          <a href="#" class="sidebar__link" @click="logout">
            <span>Cerrar sesión {{ selectedModule }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useUiStore } from '~/stores/ui'

const uiStore = useUiStore()

const modules = computed(() => uiStore.modules)
const selectedModule = computed(() => uiStore.getSelectedModule)

const selectModule = (module) => {
  event.stopPropagation()
  uiStore.selectModule(module)
}

const toggleSubModule = (module) => {
  console.log(module)
  // Aquí activamos o desactivamos el submódulo al hacer clic
  module.isOpen = !module.isOpen
  console.log(module.isOpen)
  // Si necesitas mantener el estado persistente entre recargas, podrías usar sessionStorage o Pinia
}

const logout = () => {
  // Lógica de cierre de sesión
}
</script>

<style scoped>
@import '@/assets/scss/Sidebar.scss';
</style>
