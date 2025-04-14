<template>
    {{ userProfile }}
</template>
<script setup lang="ts">
/*usa html y sass(guiate de los archivos .sass que existen o del componente de skeleton, vease que luego tendras que modificarlo) para hacer la vista, haz lo mismo en el componente de skeleton para definir la vista de carga toda la informacion que ncesitas esta en
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
</style>