<template>
  <aside class="sidebar">
    <div>
      <h1 class="sidebar__title">
        probusiness
        <img src="~/assets/img/logo.png" alt="Logo" class="sidebar__logo" />
      </h1>

      <nav class="sidebar__nav py-4">
        <small>Menu</small>
        <ul class="sidebar__list">
          <li v-for="module in modules" :key="module.id">
            <div
              v-if="module.subModules && module.subModules.length > 0"
              class="flex flex-col"
              @click="toggleSubModule(module)"
            >
              <div class="flex flex-row w-full sidebar__sublink gap-2">
                <img
                  v-if="
                    typeof icons === 'object' &&
                    icons.hasOwnProperty(module.icon)
                  "
                  :src="icons[`${module.icon}`]"
                  :alt="`${module.name} icon`"
                />
                <span>{{ module.name }}</span>
                <span @click.stop="toggleSubModule(module)"> </span>
              </div>
              <div
                v-if="module.isOpen"
                class="sidebar__sublist"
                :class="{ 'sidebar__sublist--active': module.isOpen }"
              >
                <ul class="sidebar__sublist">
                  <li
                    v-for="subModule in module.subModules"
                    :key="subModule.id"
                    class="sidebar__sublink"
                    :class="{
                      'sidebar__item--active':
                        selectedModule.id === subModule.id,
                    }"
                  >
                    <NuxtLink
                      @click="selectSubModule(subModule)"
                      :to="subModule.route"
                      ><span> {{ subModule.name }}</span></NuxtLink
                    >
                  </li>
                </ul>
              </div>
            </div>
            <NuxtLink
              v-else
              :to="module.route"
              class="sidebar__link flex flex-col"
              :class="{ 'sidebar__item--active': selectedModule === module }"
              @click="selectModule(module)"
            >
              <div class="flex flex-row gap-2">
                <img
                  v-if="
                    typeof icons === 'object' &&
                    icons.hasOwnProperty(module.icon)
                  "
                  :src="icons[`${module.icon}`]"
                  :alt="`${module.name} icon`"
                />
                <span>{{ module.name }}</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="sidebar__divider"></div>

      <!-- Preferencias -->
      <nav class="sidebar__nav py-4">
        <small>Preferencias</small>
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <label class="inline-flex items-center w-full cursor-pointer">
                <div class="flex flex-row gap-2">
                    <img src="~/assets/icon/moon.svg" alt="moon icon" />
                    <span>
                        Modo oscuro
                    </span>
                </div>
                &nbsp;
                <input
                    type="checkbox"
                    class="sr-only peer"
                    :checked="uiStore.isDarkMode"
                    @change="uiStore.toggleDarkMode"
                />
                <div
                    class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600 dark:peer-checked:bg-orange-600"
                ></div>
            </label>
            </a>
          </li>
        </ul>
        <div class="sidebar__divider"></div>
      </nav>
    </div>
    <div class="sidebar__logout flex flex-col justify-end">
      <div class="sidebar__sublink flex flex-row gap-2">
        <NuxtLink to="/perfil" class="flex flex-row gap-2 items-center">
          <img src="~/assets/icon/default.svg" alt="user icon" class="h-8 w-8" />
          <span>Miguel</span>
        </NuxtLink>
      </div>
      <div class="sidebar__divider"></div>
      <NuxtLink
        to="/login"
        class="sidebar__sublink flex flex-row gap-2"
        @click="logout"
      >
        <img src="~/assets/icon/log-out.svg" alt="logout icon" />
        <span>Cerrar sesión</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
import { useUiStore } from "~/stores/ui.store";
import { filename } from "pathe/utils";
const glob = import.meta.glob("@/assets/icon/*.svg", { eager: true });
const icons = ref({});
const uiStore = useUiStore();

const modules = computed(() => uiStore.modules);
const selectedModule = computed(() => uiStore.getSelectedModule);

const selectModule = (module) => {
  event.stopPropagation();
  uiStore.selectModule(module);
};
const selectSubModule = (subModule) => {
  event.stopPropagation();
  uiStore.selectSubModule(subModule);
};

const toggleSubModule = (module) => {
  // Aquí activamos o desactivamos el submódulo al hacer clic
  module.isOpen = !module.isOpen;
  // Si necesitas mantener el estado persistente entre recargas, podrías usar sessionStorage o Pinia
};
onMounted(() => {
  uiStore.selectModuleByRoute();
  icons.value = Object.entries(glob).reduce((acc, [path, module]) => {
    const name = filename(path).replace(".svg", "");
    acc[name] = module.default;
    return acc;
  }, {});
});

const logout = () => {
  // Lógica de cierre de sesión
};
</script>

<style scoped>
@import "@/assets/scss/Sidebar.scss";
</style>
