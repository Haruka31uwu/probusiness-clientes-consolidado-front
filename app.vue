<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
      <CommonsSpinner v-if="isLoading" />
    </NuxtLayout>

  </div>
</template>
<script setup lang="ts">

const uiStore = useUiStore();

const isLoading = computed(() => uiStore.getIsLoading);
const authStore = useAuthStore();

</script>
