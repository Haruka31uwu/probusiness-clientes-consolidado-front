<template>
  <div class="trayecto-container">

    <DataTable
      :value="customers"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 10rem"
      :loading="isLoading"
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="true"
      ></Column>
      <Column field="action" header="Acciones" :sortable="false">
        <template #body="slotProps">
          <NuxtLink
            class="flex justify-center items-center gap-2"
            :to="`/importaciones/trayecto/seguimiento/${slotProps.data.id}`"
          >
            <img
              src="/assets/icon/eye.svg"
              alt="eye"
              class="w-4 h-4 cursor-pointer"
            />
          </NuxtLink>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import type { ContainerJourney } from "~/types/containers";
import { journeySeeder } from "~/helpers/datatable-seeder";
const customers = ref([] as ContainerJourney[]);
const columns = ref([
  { field: "carga", header: "Carga" },
  { field: "closeDate", header: "Fecha cierre" },
  { field: "arrivalDate", header: "Fecha arribo" },
  { field: "deliveryDate", header: "Fecha entrega" },
  { field: "qtyBox", header: "Qty Box" },
  { field: "cbm", header: "FOB" },
  { field: "fob", header: "Logistica" },
  { field: "logistic", header: "Impuestos" },
]);
const isLoading = ref(false);
onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    customers.value = journeySeeder(100);
    isLoading.value = false;
  }, 1000);
});
const openSeguimiento = (id: number) => {
  alert(`Abriendo seguimiento para el trayecto con ID: ${id}`);
};
</script>