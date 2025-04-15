<template>
    <div class="p-8">
        <h1 class="text-xl font-medium text-onix-pro">Mi cuenta</h1>
        <hr class="divider" />
    </div>
    <div class="user-profile p-8">
        <!-- Información Personal -->
        <div class="card profile-header" style="grid-area: profile-header;">
            <img :src="userProfile.photoUrl" alt="Foto de perfil" class="profile-avatar" />
            <div class="profile-info px-4">
                <div class="pb-10">
                    <h2 class="profile-name">{{ userProfile.fullName }}</h2>
                    <p class="profile-dni">DNI: {{ userProfile.documentNumber }}</p>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="flex place-content-start"><strong style="width:80px; font-weight: 300;">Edad:</strong> {{ userProfile.age }} años</p>
                    <p class="flex place-content-start"><strong style="width:80px; font-weight: 300;">País:</strong> {{ userProfile.country }}</p>
                    <p class="flex place-content-start"><strong style="width:80px; font-weight: 300;">Ciudad:</strong> {{ userProfile.city }}</p>
                    <p class="flex place-content-start"><strong style="width:80px; font-weight: 300;">Correo:</strong> {{ userProfile.email }}</p>
                    <p class="flex place-content-start"><strong style="width:80px; font-weight: 300;">Celular:</strong> {{ userProfile.phone }}</p>
                </div>
                    
            </div>
        </div>

        <!-- Estadísticas -->
        <div class="card profile-stats" style="grid-area: profile-stats;">
            <h3>¡Felicitaciones! </h3>
            <p class="stats-amount">${{ userProfile.importedAmount }}</p>
            <p>de {{ userProfile.importedContainers }} importaciones realizadas con éxito</p>
        </div>

        <!-- Información de la Empresa -->
        <div class="card business-details" style="grid-area: business-details;" v-if="userProfile.business">
            <div class="flex flex-row gap-2 items-center mb-4">
                <h3>Mi empresa</h3>
                <img src="~/assets/icon/home.svg" class="mb-2" style="width:30px;" />
            </div>
            <div class="flex flex-col gap-4">
                <p class="flex place-content-start"><strong style="width:200px; font-weight: 300;">Empresa:</strong> {{ userProfile.business.name }}</p>
                <p class="flex place-content-start"><strong style="width:200px; font-weight: 300;">RUC:</strong> {{ userProfile.business.ruc }}</p>
                <p class="flex place-content-start"><strong style="width:200px; font-weight: 300;">Capacidad Comercial:</strong> {{ userProfile.business.comercialCapacity }}</p>
                <p class="flex place-content-start"><strong style="width:200px; font-weight: 300;">Rubro:</strong> {{ userProfile.business.rubric }}</p>
                <p class="flex place-content-start"><strong style="width:200px; font-weight: 300;">Red social:</strong> {{ userProfile.business.socialAddress }}</p>
            </div>
            
        </div>
        <div v-else>
            <p>No hay información de la empresa disponible.</p>
        </div>

        <!-- Metas -->
        <div class="card profile-goals" style="grid-area: profile-goals;">
            <h3>Mis metas</h3>
            <textarea style="color: black;" placeholder="Ingresa tus metas personales o las de tu empresa">{{ userProfile.goals }}</textarea>
        </div>
    </div>
</template>
<script setup lang="ts">
/*usa html y sass(guiate de los archivos .sass que existen o del componente de skeleton, vease que luego tendras que modificarlo) para hacer la vista, 
haz lo mismo en el componente de skeleton para definir la vista de carga toda la informacion que ncesitas esta en
 userProfile hazle console.log(userProfile en el onMounted o en el template se ven todos los campos)*/
import type { UserProfile } from '~/types/userprofile';

const props = defineProps({
    userProfile: {
        type: Object as () => UserProfile,
        required: true
    }
});
const userProfile = ref({} as UserProfile);
onMounted(() => {
    console.log("UserProfile mounted", props.userProfile);
    userProfile.value = props.userProfile;
});

</script>
<style scoped lang="scss">

.divider {
    border: none;
    border-top: 1px solid #ccc;
    margin: 1.5rem 0;
    width: 100%;
}
.user-profile {
    display: grid;
    grid-template-areas:
        "profile-header profile-stats profile-goals"
        "profile-header business-details profile-goals";
    grid-template-columns: 1.2fr 2fr 2fr; /* La primera columna es más estrecha */
    grid-template-rows: auto auto auto; /* Cada fila se ajusta automáticamente */
    gap: 1.5rem;
    padding: 2rem;
}

.card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.profile-header {
    align-items: center;
    height: auto; /* Ajusta la altura automáticamente */
    display: flex;
    flex-direction: column;
}

.profile-stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.business-details,
.profile-goals {
    display: flex;
    flex-direction: column;
    padding: 5%;
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
}

.stats-amount {
    font-size: 5rem;
    font-weight: 600;
    color: black;
    font-family: "Sora", Arial, "Helvetica Neue", Helvetica, sans-serif;
}

textarea {
    width: 100%;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 0.5rem;
    font-size: 1rem;
    resize: none;
}
</style>