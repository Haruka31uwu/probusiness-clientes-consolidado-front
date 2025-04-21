<template>
    <main>
        <UserProfileSkeleton v-if="isLoading" />
        <UserProfileComponent v-else :userProfile="userProfile" class="user-profile" />
        <!-- <Sidebar :userProfile="userProfile" class="sidebar" /> -->
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

    try {
    const response = await fetch('/api/user-profile'); // Cambia la URL por la de tu API
    if (!response.ok) {
      throw new Error('Error al cargar los datos del perfil');
    }
    const data = await response.json();
    userProfile.value = data;
    isLoading.value = false;
    console.log('Datos del perfil cargados:', userProfile.value);
  } catch (error) {
    console.error('Error al cargar el perfil:', error);
    // isLoading.value = false;
  }
    setTimeout(() => {
        userProfile.value = {
            id: 1,
            fullName: "Juan Pérez",
            photoUrl: "https://static-00.iconduck.com/assets.00/profile-icon-2048x2048-yj5zf8da.png",
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