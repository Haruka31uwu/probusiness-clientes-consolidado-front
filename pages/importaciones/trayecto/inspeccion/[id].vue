<template>
    <ClientOnly>
        <h4 v-if="selectedModule" class="flex flex-row gap-1 px-1  mt-4">
            <span>Consolidado # {{ currentRouteArray.at(-1) }}</span>
            <div class="divider_vertical"></div>
            <span>Inspección</span>
        </h4>
    </ClientOnly>
    <main>
        {{ providers }}
        <!--div por list of provider and skeleton for preview-->
        <!--containerProviderinspection on skeleton  -->
        <!--create containerNotasInpection and skeleton and use here-->
    </main>
</template>

<script setup lang="ts">
import type {
    ContainerInspectionProviders
} from '~/types/containers';

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
                type: "pdf",
                size: 1024,
                path: "file1.pdf",
                createdAt: "2023-10-01"
            },
            {
                id: 2,
                name: "File 2",
                type: "pdf",
                size: 1024,
                path: "file2.pdf",
                createdAt: "2023-10-01"
            },
            {
                id: 3,
                name: "File 3",
                type: "pdf",
                size: 1024,
                path: "file3.pdf",
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
                type: "pdf",
                size: 1024,
                path: "file1.pdf",
                createdAt: "2023-10-01"
            },
            {
                id: 2,
                name: "File 2",
                type: "pdf",
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
                type: "pdf",
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
