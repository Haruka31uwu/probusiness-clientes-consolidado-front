<template>
    <main>
        <UserProfileSkeleton v-if="isLoading" />
        <UserProfileComponent v-else :userProfile="userProfile" class="user-profile" />
        <Sidebar :userProfile="userProfile" class="sidebar" />
    </main>
</template>
<script setup lang="ts">
import UserProfileSkeleton from '~/components/profile/UserProfileSkeleton.vue';
import type { UserProfile } from '~/types/userprofile';
import Sidebar from '~/components/Sidebar/Sidebar.vue';
import UserProfileComponent from '../components/profile/UserProfileComponent.vue';
const isLoading = ref(true);
let userProfile = ref({} as UserProfile);
onMounted(async () => {
    setTimeout(() => {
        userProfile.value = {
            id: 1,
            fullName: "Juan Pérez",
            photoUrl: "https://example.com/photo.jpg",
            email: "juan.perez@example.com",
            documentNumber: "12345678",
            age: 30,
            country: "Perú",
            city: "Lima",
            phone: "+51 987654321",
            business: {
                id: 101,
                name: "Empresa Ejemplo S.A.",
                ruc: "20123456781",
                comercialCapacity: "Grande Contribuyente",
                rubric: "Comercio Internacional",
                socialAddress: "Av. Ejemplo 123, Lima"
            },
            importedAmount: 50000,
            importedContainers: 12,
            goals: "Expandir el negocio a 3 países más en 2024"
        };
        isLoading.value = false;
    }, 1000);

});
</script>