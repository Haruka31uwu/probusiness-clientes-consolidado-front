<template>
    <div class="layout-with-sidebar">
      <Sidebar />
      <main class="main-content">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Sidebar/Sidebar.vue'
  </script>
  
  <style scoped lang="scss">
  .layout-with-sidebar {
    display: flex;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    margin-left: 250px; // Igual al ancho de tu sidebar
    padding: 20px;
  }
  </style>