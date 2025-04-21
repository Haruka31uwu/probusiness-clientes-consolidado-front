<template>
    <div class="p-8">
        <h1 class="text-xl font-medium text-onix-pro">Mi cuenta</h1>
        <hr class="divider" />
    </div>
    <div class="user-profile p-8">
        <!-- Información Personal -->
        <div class="card profile-header" style="grid-area: profile-header;">
            <div class="edit-header">
                <button class="edit-btn" @click="toggleEditProfile">
                    <img v-if="isEditingProfile" src="/assets/icon/equis.svg" alt="Cerrar" class="edit-icon" />
                    <img v-else src="/assets/icon/pen.svg" alt="Editar" class="edit-icon" />
                </button>
            </div>

            <div class="profile-info px-4">
                <div class="pb-10">
                    <div class="profile-avatar__container">
                        <img :src="userProfile.photoUrl" alt="Foto de perfil" class="profile-avatar" />
                        <div class="profile-avatar__overlay" v-if="isEditingProfile"
                        @click="isDialogOpen = true"
                        >
                            <img src="/assets/icon/camera.svg" alt="Editar foto" class="profile-avatar__icon" />
                        </div>
                    </div>


                    <h2 class="profile-name">{{ userProfile.fullName }}</h2>
                    <p class="profile-dni">DNI: {{ userProfile.documentNumber }}</p>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">Edad:</strong>
                        <span v-if="!isEditingProfile">{{ userProfile.age }} años</span>
                        <input v-else type="number" v-model="editableProfile.age" class="edit-input" />
                    </p>
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">País:</strong>
                        <span v-if="!isEditingProfile">{{ userProfile.country }}</span>
                        <input v-else type="text" v-model="editableProfile.country" class="edit-input" />
                    </p>
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">Ciudad:</strong>
                        <span v-if="!isEditingProfile">{{ userProfile.city }}</span>
                        <input v-else type="text" v-model="editableProfile.city" class="edit-input" />
                    </p>
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">Correo:</strong>
                        <span v-if="!isEditingProfile">{{ userProfile.email }}</span>
                        <input v-else type="email" v-model="editableProfile.email" class="edit-input" />
                    </p>
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">Celular:</strong>
                        <span v-if="!isEditingProfile">{{ userProfile.phone }}</span>
                        <input v-else type="text" v-model="editableProfile.phone" class="edit-input" />
                    </p>
                </div>
                <!-- Botón de guardar para el perfil -->
                <button v-if="isEditingProfile" class="save-btn" @click="saveProfile">
                    Guardar
                </button>
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
            <div class="flex flex-row gap-2 items-center justify-between mb-4">
                <div class="flex flex-row gap-1">
                    <h3>Mi empresa
                    </h3>
                    <img src="/assets/icon/home.svg" alt="Empresa" class="business-icon" />
                </div>
                <button class="edit-btn" @click="toggleEditBusiness">
                    <img v-if="isEditingBusiness" src="/assets/icon/equis.svg" alt="Cerrar" class="edit-icon" />
                    <img v-else src="/assets/icon/pen.svg" alt="Editar" class="edit-icon" />
                </button>

            </div>
            <div class="flex flex-col gap-4">
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">Empresa:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business.name }}</span>
                    <input v-else type="text" v-model="editableBusiness.name" class="edit-input" />
                </p>
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">RUC:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business.ruc }}</span>
                    <input v-else type="text" v-model="editableBusiness.ruc" class="edit-input" />
                </p>
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">Capacidad Comercial:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business.comercialCapacity }}</span>
                    <input v-else type="text" v-model="editableBusiness.comercialCapacity" class="edit-input" />
                </p>
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">Rubro:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business.rubric }}</span>
                    <input v-else type="text" v-model="editableBusiness.rubric" class="edit-input" />
                </p>
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">Red social:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business.socialAddress }}</span>
                    <input v-else type="text" v-model="editableBusiness.socialAddress" class="edit-input" />
                </p>
            </div>
            <!-- Botón de guardar para la empresa -->
            <button v-if="isEditingBusiness" class="save-btn" @click="saveBusiness">
                Guardar
            </button>
        </div>
        <div v-else>
            <p>No hay información de la empresa disponible.</p>
        </div>

        <!-- Metas -->
        <div class="card profile-goals" style="grid-area: profile-goals;">
            <div class="flex flex-row gap-2 items-center ">
                <h3>Mis metas</h3>
                <img src="/assets/icon/star.svg" alt="Metas" class="business-icon" />
            </div>

            <textarea style="color: black;"
                placeholder="Ingresa tus metas personales o las de tu empresa">{{ userProfile.goals }}</textarea>
        </div>
    </div>
    <CommonsFileUploader
    :isOpen="isDialogOpen"
    @close="isDialogOpen = false"
    @continue="(file) =>updateProfilePhoto(file)"
    />

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
const isEditingProfile = ref(false);
const isEditingBusiness = ref(false);
const isDialogOpen=ref(false);
const editableProfile = ref({} as Partial<UserProfile>);
const editableBusiness = ref({} as Partial<UserProfile['business']>);
const saveProfile = () => {
    userProfile.value = { ...userProfile.value, ...editableProfile.value };
    isEditingProfile.value = false;
};
const updateProfilePhoto = (file: File) => {
    //get url from file
    const url = URL.createObjectURL(file);
    userProfile.value.photoUrl = url;
    editableProfile.value.photoUrl = url;
    isDialogOpen.value = false;
};
const saveBusiness = () => {
    if (userProfile.value.business) {
        userProfile.value.business = { ...editableBusiness.value };
    }
    isEditingBusiness.value = false;
    console.log('Empresa guardada:', userProfile.value.business);
};
onMounted(() => {
    console.log("UserProfile mounted", props.userProfile);
    userProfile.value = props.userProfile;
    editableProfile.value = { ...props.userProfile };
    if (props.userProfile.business) {
        editableBusiness.value = { ...props.userProfile.business };
    }
});

// Alternar edición del perfil
const toggleEditProfile = () => {
    isEditingProfile.value = !isEditingProfile.value;
    if (!isEditingProfile.value) {
        // Guardar cambios al salir del modo de edición
        userProfile.value = { ...userProfile.value, ...editableProfile.value };
    }
};

// Alternar edición de la empresa
const toggleEditBusiness = () => {
    isEditingBusiness.value = !isEditingBusiness.value;
    if (!isEditingBusiness.value && userProfile.value.business) {
        // Guardar cambios al salir del modo de edición
        userProfile.value.business = { ...editableBusiness.value };
    }
};

</script>
<style scoped lang="scss">
.save-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #FF500B;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #FF500B;
    }
}

.edit-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #FF500B;

    &:hover {
        color: #FF500B;
    }
}

.edit-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
}

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
    grid-template-columns: 1.2fr 2fr 2fr;
    /* La primera columna es más estrecha */
    grid-template-rows: auto auto auto;
    /* Cada fila se ajusta automáticamente */
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
    align-items: flex-end;
    height: auto;
    /* Ajusta la altura automáticamente */
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
.profile-avatar__container{
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin-bottom: 1rem;
    z-index: 1;
}
.profile-avatar__overlay{
    z-index: 2;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 2em;
    height: 2em;
    background-color: #FF500B;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
   
}
</style>