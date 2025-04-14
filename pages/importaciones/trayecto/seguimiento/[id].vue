<template>
  <ClientOnly>
    <h4 v-if="selectedModule" class="flex flex-row gap-1">
      <span>{{ getParentModule(selectedModule)?.nameSection }}</span>
      <div class="divider_vertical"></div>
      <span>{{ selectedModule?.nameSection }}</span>
      <div class="divider_vertical"></div>
      <span>{{ currentRouteArray.at(-1) }}</span>
      <div class="divider_vertical"></div>
    </h4>
    <!-- Mostrar datos específicos del trayecto -->
    <h2 class="text-3xl font-bold text-start mb-8">
          Tu carga está en camino a Perú
    </h2>
    <div class="grid grid-cols-2 gap-4">
        
      <ShipTracker
        class="mt-5"
        :progress="50"
        />
        <Timeline :value="events" class="w-1/2 min-h-screen">
            <template #content="slotProps">
                {{ slotProps.item.status }}
            </template>
        </Timeline>
    </div>
  </ClientOnly>
</template>
  
<script setup lang="ts">
import ShipTracker from '~/components/commons/ShipTracker.vue';

// Obtener el ID de la URL
const route = useRoute();
const id = route.params.id;
const currentRouteArray = ref<string[]>([]);
const selectedModule = computed(() => useUiStore().getSelectedModule);
const getParentModule = computed(() => useUiStore().getParentModule);
const events = ref([
    { status: 'Entregado', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0'},
    { status: 'Pago', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Levante', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Declaracion aduanera', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
    { status: 'Arribo', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
    { status: 'En trayecto', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
    { status: 'Zarpe', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
    { status: 'Llenado de contenedor', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
    { status: 'Carga recibida', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
]);

// Simular carga de datos (en un caso real, usa `useFetch` o `useAsyncData`)
const trayecto = ref({
  id: id,
  carga: 100,
  status: "active",
  progress: 0.75,
});

onMounted(() => {
  currentRouteArray.value = route.path.split("/").filter((item) => item !== "");
  watch(
    route,
    (to) => {
      currentRouteArray.value = to.path.split("/").filter((item) => item !== "");
    },
    { immediate: true }
  );
});
useHead({
  title: `Seguimiento #${id}`,
});
</script>
<style scoped lang="scss">
.divider_vertical {
  border-left: 1px solid #e0e0e0;
  height: 20px;
  margin: 0 10px;
  width: 1px;
}
</style>