<script setup lang="ts">

const props = defineProps<{
  isOpen: boolean;
  title?: string;
  browseButtonText?: string;
  cancelButtonText?: string;
  continueButtonText?: string;
  dropzoneText?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'continue', file: File | null): void;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const dropzoneRef = ref<HTMLDivElement | null>(null);
const selectedFile = ref<File | null>(null);
const isDragging = ref(false);
const previewUrl = ref<string | null>(null);

// Default texts in Spanish
const title = computed(() => props.title || 'Subir imagen');
const browseButtonText = computed(() => props.browseButtonText || 'Subir archivo');
const cancelButtonText = computed(() => props.cancelButtonText || 'Cancelar');
const continueButtonText = computed(() => props.continueButtonText || 'Continuar');
const dropzoneText = computed(() => props.dropzoneText || 'Selecciona o arrastra tu archivo aquí');

// Handle file selection
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
    createPreview();
  }
};

// Create preview for selected image
const createPreview = () => {
  if (selectedFile.value) {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
    }
    previewUrl.value = URL.createObjectURL(selectedFile.value);
  }
};

// Trigger file input click
const openFileBrowser = () => {
  fileInputRef.value?.click();
};

// Handle drag and drop events
const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = true;
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = true;
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
  
  if (e.dataTransfer?.files.length) {
    selectedFile.value = e.dataTransfer.files[0];
    createPreview();
  }
};

// Close the modal
const handleCancel = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  emit('close');
};

// Continue with selected file
const handleContinue = () => {
  emit('continue', selectedFile.value);
};

// Set up and clean up event listeners
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});

// Close on escape key
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    handleCancel();
  }
};

// Prevent scrolling when modal is open
const preventScroll = computed(() => props.isOpen);
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-backdrop" @click="handleCancel">
      <div class="modal-container" @click.stop>
        <div class="modal-content">
          <h2 class="modal-title">{{ title }}</h2>
          
          <div 
            ref="dropzoneRef" 
            class="dropzone"
            :class="{ 'active': isDragging, 'has-preview': previewUrl }"
            @dragenter="handleDragEnter"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
            @click="openFileBrowser"
          >
            <div v-if="!previewUrl" class="dropzone-content">
              <div class="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p class="dropzone-text">{{ dropzoneText }}</p>
              <button class="browse-button">{{ browseButtonText }}</button>
            </div>
            
            <div v-else class="preview-container">
              <img :src="previewUrl" alt="Preview" class="file-preview" />
              <button class="remove-button" @click.stop="selectedFile = null; previewUrl = null">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <input 
              ref="fileInputRef"
              type="file" 
              class="file-input"
              accept="image/*"
              @change="handleFileChange"
            />
          </div>
          
          <div class="action-buttons">
            <button class="cancel-button" @click="handleCancel">{{ cancelButtonText }}</button>
            <button 
              class="continue-button" 
              :disabled="!selectedFile"
              @click="handleContinue"
            >{{ continueButtonText }}</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  width: 90%;
  max-width: 480px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: modal-appear 0.2s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content {
  padding: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  text-align: center;
}

.dropzone {
  border: 2px dashed #e0e0e0;
  border-radius: 6px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  background-color: #fafafa;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropzone.active {
  border-color: #FF5722;
  background-color: rgba(255, 87, 34, 0.05);
}

.dropzone.has-preview {
  padding: 0;
  border-style: solid;
}

.dropzone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.upload-icon {
  color: #757575;
  margin-bottom: 12px;
}

.dropzone-text {
  color: #757575;
  margin-bottom: 15px;
  font-size: 14px;
}

.browse-button {
  background-color: transparent;
  border: 1px solid #e0e0e0;
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.browse-button:hover {
  background-color: #f5f5f5;
  border-color: #bdbdbd;
}

.file-input {
  display: none;
}

.preview-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.file-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
  max-height: 200px;
}

.remove-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.remove-button:hover {
  background-color: white;
  color: #f44336;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  color: #757575;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-button:hover {
  background-color: #f5f5f5;
}

.continue-button {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  background-color: #FF5722;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.continue-button:hover:not(:disabled) {
  background-color: #F4511E;
}

.continue-button:disabled {
  background-color: #FFCCBC;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .modal-container {
    width: 95%;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }
  
  .cancel-button, .continue-button {
    width: 100%;
  }
  
  .cancel-button {
    order: 2;
  }
  
  .continue-button {
    order: 1;
  }
}
</style>