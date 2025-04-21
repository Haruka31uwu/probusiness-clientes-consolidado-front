<template>
    <ClientOnly>
        <div class="title-container py-8">
        <h4 v-if="selectedModule" class="title">
            <span>Consolidado # {{ currentRouteArray.at(-1) }}</span>
            <div class="divider-vertical"></div>
            <span>Inspección</span>
        </h4>
        <div class="divider-horizontal"></div>
        </div>
    </ClientOnly>
    <main>
      <!-- Mostrar Skeleton mientras se cargan los datos -->
      <div v-if="isLoadingProviders">
        <ContainerProviderInspectionSkeleton />
      </div>
  
      <!-- Mostrar los datos de los proveedores cuando estén disponibles -->
      <div v-else>
        <ContainerProviderInspection :providers="providers" />
      </div>
    </main>
  </template>

<script setup lang="ts">
import type {
    ContainerInspectionProviders
} from '~/types/containers';
import ContainerProviderInspection from '~/components/container/ContainerProviderInspection.vue';
import ContainerProviderInspectionSkeleton from '~/components/container/ContainerProviderInspectionSkeleton.vue'; // Importa el Skeleton

const route = useRoute();
const currentRouteArray = ref<string[]>([]);
const selectedModule = computed(() => useUiStore().getSelectedModule);
const isLoadingProviders = ref(true);
const isLoadingInspection = ref(true);
const isLoadingNotes = ref(true);
const providers = ref([] as ContainerInspectionProviders[]);
const id = route.params.id;

onMounted(() => {
    currentRouteArray.value = route.path.split("/").filter((item) => item !== "");
    watch(
        route,
        (to) => {
            currentRouteArray.value = to.path.split("/").filter((item) => item !== "");
        }, {
        immediate: true
    }
    );
    // Simular carga de datos (en un caso real, usa `useFetch` o `useAsyncData`)
    setTimeout(() => {
        providers.value = [{
            id: 1,
            name: "Proveedor 1",
            files: [{
                id: 1,
                name: "File 1",
                type: "video",
                size: 1024,
                path: "file1.mp4",
                createdAt: "2023-10-01"
            },
            {
                id: 2,
                name: "File 2",
                type: "video",
                size: 1024,
                path: "file2.mp4",
                createdAt: "2023-10-01"
            },
            {
                id: 3,
                name: "File 3",
                type: "video",
                size: 1024,
                path: "file3.mp4",
                createdAt: "2023-10-01"
            },
            ],
            notes: "xd"
        },
        {
            id: 2,
            name: "Proveedor 2",
            files: [{
                id: 1,
                name: "File 1",
                type: "video",
                size: 1024,
                path: "file1.pdf",
                createdAt: "2023-10-01"
            },
            {
                id: 2,
                name: "File 2",
                type: "video",
                size: 1024,
                path: "file2.pdf",
                createdAt: "2023-10-01"
            },
            ],
            notes: "xd"
        },
        {
            id: 3,
            name: "Proveedor 3",
            files: [{
                id: 2,
                name: "File 2",
                type: "video",
                size: 1024,
                path: "file2.pdf",
                createdAt: "2023-10-01"
            },
            ],
            notes: "xd"
        }

        ];
        isLoadingProviders.value = false;
    }, 1000);
});
useHead({
  title: `Inspeccion Contenedor #${id}`,
});
</script>
<style scoped lang="scss">
.title-container {
  display: flex;
  flex-direction: column;
  gap: 10px; // Espaciado entre el título y la línea horizontal

  .title {
    display: flex;
    align-items: center;
    gap: 12px; // Espaciado entre "Consolidado", la línea vertical y "Inspección"
    font-size: 18px;
    font-weight: 500;
    color: #333;

    .divider-vertical {
      width: 1px;
      height: 40px; // Altura de la línea vertical
      background-color: #e0e0e0; // Color tenue para la línea
    }
  }

  .divider-horizontal {
    width: 100%;
    height: 1px;
    background-color: #e0e0e0; // Color tenue para la línea horizontal
  }
}
</style>
