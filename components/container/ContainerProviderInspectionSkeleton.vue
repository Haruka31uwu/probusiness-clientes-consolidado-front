<template>
    <div class="provider-inspection-skeleton">
      <!-- Skeleton para los botones de proveedores -->
      <div class="skeleton-tabs">
        <div class="skeleton-tab pulse-element delay-1"></div>
        <div class="skeleton-tab pulse-element delay-2"></div>
        <div class="skeleton-tab pulse-element delay-3"></div>
      </div>
  
      <!-- Skeleton para la sección de inspección -->
      <div class="skeleton-content">
        <div class="skeleton-section">
          <div class="skeleton-title pulse-element"></div>
          <div class="skeleton-file pulse-element delay-1"></div>
          <div class="skeleton-file pulse-element delay-2"></div>
          <div class="skeleton-file pulse-element delay-3"></div>
        </div>
  
        <!-- Skeleton para la sección de notas -->
        <div class="skeleton-section">
          <div class="skeleton-title pulse-element"></div>
          <div class="skeleton-notes pulse-element delay-1"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No se requiere lógica adicional para el skeleton
  </script>
  
  <style scoped lang="scss">
  .provider-inspection-skeleton {
    display: flex;
    flex-direction: column;
    gap: 20px;
  
    .skeleton-tabs {
      display: flex;
      gap: 10px;
  
      .skeleton-tab {
        width: 100px;
        height: 36px;
        background-color: #e0e0e0;
        border-radius: 20px;
      }
    }
  
    .skeleton-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
  
      .skeleton-section {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
        .skeleton-title {
          width: 50%;
          height: 20px;
          background-color: #e0e0e0;
          border-radius: 4px;
          margin-bottom: 16px;
        }
  
        .skeleton-file {
          width: 100%;
          height: 40px;
          background-color: #e0e0e0;
          border-radius: 6px;
          margin-bottom: 12px;
        }
  
        .skeleton-notes {
          width: 100%;
          height: 150px;
          background-color: #e0e0e0;
          border-radius: 6px;
        }
      }
    }
  }
  
  /* Animación de pulso */
  .pulse-element {
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.9;
    }
    100% {
      opacity: 0.6;
    }
  }
  
  /* Retrasos para el efecto de onda */
  .delay-1 {
    animation-delay: 0.1s;
  }
  
  .delay-2 {
    animation-delay: 0.2s;
  }
  
  .delay-3 {
    animation-delay: 0.3s;
  }
  </style>