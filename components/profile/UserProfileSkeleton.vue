<template>
    <div class="user-profile-skeleton">
        <div class="skeleton-header">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-name"></div>
        </div>
        <div class="skeleton-details">
            <div class="skeleton-detail"></div>
            <div class="skeleton-detail"></div>
            <div class="skeleton-detail"></div>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.user-profile-skeleton {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.skeleton-header {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.skeleton-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #e0e0e0;
}
.skeleton-name {
    width: 150px;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
}
.skeleton-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.skeleton-detail {
    width: 100%;
    height: 15px;
    background-color: #e0e0e0;
    border-radius: 4px;
}
</style>