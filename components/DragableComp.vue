<template>
  <draggable v-model="array" group="people">
    <template #item="{ element }">
      <div class="p-5 border bg-slate-400">{{ element.name }}</div>
    </template>
  </draggable>

  <draggable v-model="array2" group="people">
    <template #item="{ element }">
      <div class="p-5 border bg-slate-400">{{ element.name }}</div>
    </template>
  </draggable>
</template>

<script setup>
const array = ref([
  { name: "areema" },
  { name: "josh" },
  { name: "price" },
  { name: "robin" },
]);

const array2 = ref([
  { name: "banaana" },
  { name: "apple" },
  { name: "orange" },
  { name: "mango" },
]);
</script>
