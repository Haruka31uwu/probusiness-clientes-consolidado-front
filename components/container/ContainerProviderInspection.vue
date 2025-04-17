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
              <span class="file-icon" @click="previewFile(file)" style="cursor: pointer;">
                {{ getFileIcon(file.type) }}
              </span>
              <div class="file-info">
                <span class="file-name">{{ file.name }}</span>
                <span class="file-size">{{ formatFileSize(file.size) }}</span>
              </div>
              <button class="delete-btn" @click="deleteFile(file)">🗑️</button>
            </div>
          </div>
        </div>
  
        <!-- Sección de notas -->
        <div class="notes-section">
          <h2>Notas <span class="icon" @click="toggleEditNotes" style="cursor: pointer;">📝</span></h2>
          <textarea
            class="notes-input"
            placeholder="Escribe tus notas aquí" v-model="notesValue"
            :disabled="!isEditingNotes" style="color: black;"
          ></textarea>
          <button
          v-if="isEditingNotes"
          class="save-btn"
          @click="saveNotes"
        >
          Guardar
        </button>
        </div>
      </div>
      <!-- Modal para vista previa -->
    <div v-if="previewFileData" class="preview-modal">
      <div class="preview-content">
        <button class="close-btn" @click="closePreview">✖</button>
        <div v-if="previewFileData.type === 'image'">
          <img :src="previewFileData.path" alt="Vista previa" />
        </div>
        <div v-else-if="previewFileData.type === 'pdf'">
          <iframe :src="previewFileData.path" frameborder="0"></iframe>
        </div>
        <div v-else>
          <p>Vista previa no disponible para este tipo de archivo.</p>
        </div>
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

const notesValue = computed({
  get: () => (isEditingNotes.value ? editableNotes.value : activeProvider.value.notes),
  set: (value: string) => {
    if (isEditingNotes.value) {
      editableNotes.value = value;
    }
  },
});

// Diccionario de íconos según el tipo de archivo
const fileIcons: Record<string, string> = {
  pdf: '📄',
  image: '🖼️',
  video: '🎥',
  excel: '📊',
  word: '📝',
  default: '📁', // Ícono por defecto para tipos desconocidos
};

// Función para obtener el ícono según el tipo de archivo
const getFileIcon = (type: string): string => {
  if (type.includes('image')) return fileIcons.image; // Para tipos como "image/png", "image/jpeg"
  if (type.includes('video')) return fileIcons.video; // Para tipos como "video/mp4"
  if (type.includes('pdf')) return fileIcons.pdf;
  if (type.includes('excel') || type.includes('spreadsheet')) return fileIcons.excel; // Para Excel
  if (type.includes('word')) return fileIcons.word; // Para Word
  return fileIcons.default; // Ícono por defecto
};

// Función para borrar un archivo
const deleteFile = (file: IFile): void => {
  const fileIndex = activeProvider.value.files.findIndex((f) => f.id === file.id);
  if (fileIndex !== -1) {
    activeProvider.value.files.splice(fileIndex, 1);
    console.log(`Archivo "${file.name}" eliminado.`);
  }
};

// Formatear tamaño de archivo
const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

// Estado para la vista previa
const previewFileData = ref<IFile | null>(null);

// Función para mostrar la vista previa
const previewFile = (file: IFile): void => {
  previewFileData.value = file;
};

// Función para cerrar la vista previa
const closePreview = (): void => {
  previewFileData.value = null;
};

// Estado para manejar la edición de notas
const isEditingNotes = ref(false);
const editableNotes = ref('');

// Función para habilitar/deshabilitar la edición de notas
const toggleEditNotes = (): void => {
  isEditingNotes.value = !isEditingNotes.value;
  if (isEditingNotes.value) {
    editableNotes.value = activeProvider.value.notes; // Cargar las notas actuales
  }
};

// Función para guardar las notas
const saveNotes = (): void => {
  activeProvider.value.notes = editableNotes.value; // Guardar las notas editadas
  isEditingNotes.value = false; // Deshabilitar la edición
  console.log('Notas guardadas:', editableNotes.value);
};

</script>

<style scoped lang="scss">
@import "@/assets/scss/ContainerInspection.scss";

.save-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
}
</style>