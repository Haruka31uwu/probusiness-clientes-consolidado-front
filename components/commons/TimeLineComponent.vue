<template>
    <Timeline :value="events" class="w-3/4 min-h-screen mx-auto">
        <template #content="slotProps">
            <div class="flex flex-row justify-between ">
                <div class="flex flex-col gap-1">
                    <span>{{ slotProps.item.name }}</span>
                    <small>Camino al puerto Callao - Perú</small>
                </div>
                <span>{{ slotProps.item.createdAt }}</span>
            </div>
        </template>
        <template #marker="slotProps">
            <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm">
                <!--circle with check if item.status==1 else circle gray-->
                <span :class="{
                    'bg-success': slotProps.item.status === 1 && !props.completed,
                    'bg-gray': slotProps.item.status === 0 && !props.completed,
                    'bg-bold-gray': props.completed,
                }" class="w-8 h-8 rounded-full flex items-center justify-center">
                    <img v-if="slotProps.item.status === 1" src="assets/icon/check.svg" alt="check" class="h-4 w-4" />

                </span>
            </span>
        </template>
        <template #connector="slotProps">
            <span class="w-2 h-full " :class="{
                'bg-success': slotProps.item.status === 1 && !props.completed,
                'bg-gray': slotProps.item.status === 0 && !props.completed,
                'bg-bold-gray': props.completed,
            }"></span>

        </template>
    </Timeline>
</template>
<script setup lang="ts">
import type { ContainerJourneyStatus } from '~/types/containers';

const props = defineProps({
    events: {
        type: Array as () => ContainerJourneyStatus[],
        default: () => [] as ContainerJourneyStatus[],
    },
    completed: {
        type: Boolean,
        default: false,
    }
});
</script>
<style scoped lang="scss"></style>