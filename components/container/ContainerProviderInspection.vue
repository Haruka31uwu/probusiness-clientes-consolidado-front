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
          <h2>Inspección <span class="icon">
            <img src="/assets/icon/inspection.svg" alt="eye" class="w-4 h-4 cursor-pointer" />
          </span></h2>
          <div class="file-list">
            <div
              class="file-item"
              v-for="file in activeProvider.files"
              :key="file.id"
            >
              <span class="file-icon" @click="previewFile(file)" style="cursor: pointer;">
                <span v-html="getFileIcon(file.type)"></span>
              </span>
              <div class="file-info">
                <span class="file-name">{{ file.name }}</span>
                <span class="file-size">{{ formatFileSize(file.size) }}</span>
              </div>
              <button class="delete-btn" @click="deleteFile(file)">
                <img src="/assets/icon/trash.svg" alt="trash" class="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
  
        <!-- Sección de notas -->
        <div class="notes-section">
          <h2>Notas <span class="icon" @click="toggleEditNotes" style="cursor: pointer;">
            <img src="/assets/icon/edit.svg" alt="edit" class="w-4 h-4 cursor-pointer" />
          </span></h2>
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
        <div v-else-if="previewFileData.type === 'video'">
          <video controls>
            <source :src="previewFileData.path" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
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
  image: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 13L14 8L3 19" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  video: `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 3L16 8L23 13V3Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H14C15.1046 15 16 14.1046 16 13V3C16 1.89543 15.1046 1 14 1Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
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