<template>
    <div> 
        <!--define aqui el elemento un file input si no le pasas el prop de file y la informacion del file si se le pasa-->
        <div v-if="file"></div>
        <div v-else></div>
    </div>
</template>
<script setup lang="ts">
import type { IFile } from '~/types/file';
//use emits to delete, download and upload file and send event to father
const props=defineProps({
    file: {
        type: Object as () => IFile,
        default: null
    },
   
});
const file=ref(props.file);
const emits=defineEmits(['deleteFile','downloadFile','uploadFile']);
const deleteFile=()=>{
    emits('deleteFile',file);
}
const downloadFile=()=>{
    emits('downloadFile',file);
}
const uploadFile=()=>{
    emits('uploadFile',file);
} 
</script>