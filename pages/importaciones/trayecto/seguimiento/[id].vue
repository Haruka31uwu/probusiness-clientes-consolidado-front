<template>
  <ClientOnly>
    <h4 v-if="selectedModule" class="flex flex-row gap-1 px-1  mt-4">
      <span>{{ getParentModule(selectedModule)?.nameSection }}</span>
      <div class="divider_vertical"></div>
      <span>{{ selectedModule?.nameSection }}</span>
      <div class="divider_vertical"></div>
      <span>{{ currentRouteArray.at(-1) }}</span>
      <div class="divider_vertical"></div>
      <span class="w-auto flex flex-row items-center "><div class="circle-success"></div>En proceso</span>
    </h4>
    <!-- Mostrar datos específicos del trayecto -->
    <h2 class="text-3xl font-bold text-start mt-10 mb-1">
      Tu carga está en camino a Perú
    </h2>
    <div class="grid grid-cols-2 gap-4 items-start justify-center h-screen">
      <ShipTrackerSkeleton v-if="isLoadingShipTracker"  />
      <ShipTracker  :progress="progress" v-else />
      <CommonsTimeLineComponent v-if="!isLoadingTimeline" :events="events" class="w-3/4 min-h-screen mx-auto" />
      <CommonsTimeLineSkeleton v-else class="w-3/4 min-h-screen mx-auto" />


    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import ShipTracker from '~/components/commons/ShipTracker.vue';
import ShipTrackerSkeleton from '~/components/commons/ShipTrackerSkeleton.vue';
import type { ContainerJourneyStatus } from '~/types/containers';

// Obtener el ID de la URL
const route = useRoute();
const id = route.params.id;
const currentRouteArray = ref<string[]>([]);
const selectedModule = computed(() => useUiStore().getSelectedModule);
const getParentModule = computed(() => useUiStore().getParentModule);
const events = ref([] as ContainerJourneyStatus[]);
const progress = ref(0);
const isLoadingShipTracker = ref(true);
const isLoadingTimeline = ref(true);
// Simular carga de datos (en un caso real, usa `useFetch` o `useAsyncData`)


onMounted(() => {
  currentRouteArray.value = route.path.split("/").filter((item) => item !== "");
  watch(
    route,
    (to) => {
      currentRouteArray.value = to.path.split("/").filter((item) => item !== "");
    },
    { immediate: true }
  );
  // Simular eventos de seguimiento
  events.value = [
    { id: 1, status: 0, createdAt: "2023-10-01", containerId: 1, name: "Entregado" },
    { id: 2, status: 0, createdAt: "2023-10-05", containerId: 1, name: "Pago" },
    { id: 3, status: 0, createdAt: "2023-10-07", containerId: 1, name: "Levante" },
    { id: 4, status: 1, createdAt: "2023-10-08", containerId: 1, name: "Declaración aduanera" },
    { id: 5, status: 1, createdAt: "2023-10-09", containerId: 1, name: "Arribo" },
    { id: 6, status: 1, createdAt: "2023-10-09", containerId: 1, name: "En trayecto" },
    { id: 7, status: 1, createdAt: "2023-10-09", containerId: 1, name: "Zarpe" },
    { id: 8, status: 1, createdAt: "2023-10-09", containerId: 1, name: "Llenado de contenedor" },
    { id: 9, status: 1, createdAt: "2023-10-09", containerId: 1, name: "Carga recibida" },
  ];
  // Simular carga de datos
  setTimeout(() => {
    isLoadingShipTracker.value = false;
  }, 2000);
  progress.value =//if all status on events are 1, set progress to 100
    events.value.every((event) => event.status === 1)
      ? 100
      : Math.round(
        (events.value.filter((event) => event.status === 1).length /
          events.value.length) *
        100
      );
  setTimeout(() => {
    isLoadingTimeline.value = false;
  }, 2000);
});
useHead({
  title: `Seguimiento #${id}`,
});
</script>
