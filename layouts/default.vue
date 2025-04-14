<template>
  <div class="layout-with-sidebar">
    <Sidebar />
    <main class="main-content">
      <ClientOnly v-if="routePath && selectedModule.route == routePath
     
      ">
        <header
          class="header"
          v-if="selectedModule && selectedModule.nameSection != 'Inicio'"
        >
          <h2 v-if="selectedModule && getParentModule(selectedModule)">
            {{ getParentModule(selectedModule).nameSection }}
          </h2>
          <component
            :is="
              selectedModule && !getParentModule(selectedModule) ? 'h2' : 'span'
            "
          >
            {{ selectedModule ? selectedModule.nameSection : "" }}
          </component>
          <div class="header__divider"></div>
        </header>
      </ClientOnly>
      <ClientOnly v-else>
        
        <header class="header_no-module" v-if="routePath!='/perfil'">
          <div class="back-button">
            <img src="/assets/icon/arrow-left.svg" alt="Logo" />
            Regresar
          </div>
          <!-- <div class="header_no-module-title">
            <span>
              {{ getParentModule(selectedModule).nameSection }}
            </span>
            <div class="header__divider-vertical">
            </div>
            <span>
              {{ selectedModule.nameSection }}
            </span>
            <div class="header__divider-vertical">
            </div>
            <span>
              Consolidado # {{ routePathArray.at(-1) }}
            </span>
          </div>
          <div class="header__divider"></div> -->
        </header>
      </ClientOnly>
      <slot />
    </main>
  </div>
</template>
  
<script setup >
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import { useUiStore } from "~/stores/ui";
//get current route
import { useRoute } from "vue-router";

const selectedModule = computed(() => useUiStore().getSelectedModule);
const getParentModule = computed(() => useUiStore().getParentModule);
const route = useRoute();
const routePath = ref(null);
const routePathArray = ref([]);
onMounted(() => {
  routePath.value = route.path;
  routePathArray.value = route.path.split("/").filter((item) => item !== "");
  watch(
    route,
    (to) => {
      routePath.value = to.path;
      routePathArray.value = to.path.split("/").filter((item) => item !== "");
      //console.log("Route changed:", to.path);
    },
    { immediate: true }
  );
});
</script>
  
  <style scoped lang="scss">
.layout-with-sidebar {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px; // Igual al ancho de tu sidebar
  padding: 20px;
  background-color: #f4f4f4; // Color de fondo del contenido principal
}
.header {
  padding: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  h2 {
    margin-bottom: 1em;
  }
}
.header__divider {
  width: 100%;
  height: 1px;
  background-color: #e0e0e0; // Color del separador
  margin: 1em 0;
}
.header__divider-vertical {
  width: 1px;
  height: 100%;
  background-color: #e0e0e0; // Color del separador
  margin: 0 1em;
}
.header_no-module {
  height: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.header_no-module-title {
  display: flex;
  flex-direction: row;
  width: 100% !important;
  margin-bottom: 1em;
}
</style>