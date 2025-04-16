<template>
    <div class="provider-container">
      <!-- Botones de proveedores -->
      <div class="tabs">
        <button
          v-for="(provider, index) in providers"
          :key="provider.id"
          class="provider-btn"
          :class="{ active: index === activeProviderIndex }"
          @click="setActiveProvider(index)"
        >
          {{ provider.name }}
        </button>
      </div>
  
      <div class="content">
        <!-- Sección de inspección -->
        <div class="inspection-section">
          <h2>Inspección <span class="icon">📋</span></h2>
          <div class="file-list">
            <div
              class="file-item"
              v-for="file in activeProvider.files"
              :key="file.id"
            >
              <span class="file-icon">
                {{ file.type === 'pdf' ? '📄' : file.type === 'image' ? '🖼️' : '🎥' }}
              </span>
              <div class="file-info">
                <span class="file-name">{{ file.name }}</span>
                <span class="file-size">{{ formatFileSize(file.size) }}</span>
              </div>
              <button class="download-btn" @click="downloadFile(file)">↓</button>
            </div>
          </div>
        </div>
  
        <!-- Sección de notas -->
        <div class="notes-section">
          <h2>Notas <span class="icon">📝</span></h2>
          <textarea
            class="notes-input"
            placeholder="Escribe tus notas aquí..." style="color: black;"
            v-model="activeProvider.notes"
          ></textarea>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import type { IProvider } from '@/types/provider';
import type { IFile } from '@/types/file';

// Recibe el array de proveedores como prop
const props = defineProps<{
  providers: IProvider[];
}>();

// Estado para manejar el proveedor activo
const activeProviderIndex = ref(0);

// Computed para obtener el proveedor activo
const activeProvider = computed(() => props.providers[activeProviderIndex.value]);

// Cambiar el proveedor activo
const setActiveProvider = (index: number) => {
  activeProviderIndex.value = index;
};

// Descargar archivo
const downloadFile = (file: IFile): void => {
  console.log('Descargando archivo:', file);
  // Aquí puedes implementar la lógica de descarga
};

// Formatear tamaño de archivo
const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/ContainerInspection.scss";
</style>