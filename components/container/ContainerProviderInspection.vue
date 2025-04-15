<template>
    <div>
        <ItemFile v-for="file in files" :key="file.id" :file="file"
        @deleteFile="deleteFile"
        @downloadFile="downloadFile"
        @uploadFile="uploadFile"
        />
    </div>
</template>
<script setup lang="ts">
import type { IFile } from '~/types/file';

const props = defineProps({
    files: {
        type: Array as () => IFile[],
        default: () => [] as IFile[]
    },
});
const files = ref(props.files);
const downloadFile = (file: IFile) => {
    // Implement download logic here
    console.log('Downloading file:', file);
};
const deleteFile = (file: IFile) => {
    // Implement delete logic here
    console.log('Deleting file:', file);
};
const uploadFile = (file: IFile) => {
    // Implement upload logic here
    console.log('Uploading file:', file);
};
</script>