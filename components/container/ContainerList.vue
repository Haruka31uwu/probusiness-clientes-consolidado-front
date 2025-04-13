<template>
    <div class="container-list">
        <div v-if="isLoading" class="loading-spinner">
            <Spinner/>
        </div>
        <div v-else class="container-list__content">
            <ContainerItem
                v-for="container in containers"
                :key="container.id"
                :container="container"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import Spinner from '../commons/Spinner.vue';
import type { Container } from '~/types/containers';
const isLoading = ref(false);
const containers = ref([] as Container[]);
onMounted(() => {
    isLoading.value = true;
    setTimeout(() => {
        containers.value = [
            {
                id: 1,
                type: 1,
                progress: 0.94,
                carga: 100,
                status: 'active',
                userIsPresent: true,
                closeDate: '2023-10-01',
                shipDate: '2023-10-02',
                arrivalDate: '2023-10-03',
                deliveryDate: '2023-10-04',
                createdAt: '2023-09-01',
            },
            {
                id: 2,
                type: 2,
                progress: 0.75,
                carga: 50,
                status: 'inactive',
                userIsPresent: false,
                closeDate: '2023-10-05',
                shipDate: '2023-10-06',
                arrivalDate: '2023-10-07',
                deliveryDate: '2023-10-08',
                createdAt: '2023-09-02',
            },
            {
                id: 3,
                type: 1,
                progress: 0.50,
                carga: 75,
                status: 'active',
                userIsPresent: true,
                closeDate: '2023-10-09',
                shipDate: '2023-10-10',
                arrivalDate: '2023-10-11',
                deliveryDate: '2023-10-12',
                createdAt: '2023-09-03',
            }
        ];
        isLoading.value = false;
    }, 2000);
});
</script>
<style scoped lang="scss">
@import "@/assets/scss/home.scss";
</style>

