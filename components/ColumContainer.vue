<template>
  <div class="min-w-[350px] space-y-2 overflow-y-scroll scrollbar px-3">
    <div class="flex items-center pb-4 justify-between gap-2">
      <p class="font-bold text-lg">{{ title }}</p>
      <p
        class="text-lg text-slate-700 cursor-pointer"
        @click="$emit('editTitle')"
      >
        <Icon name="material-symbols:drive-file-rename-outline-outline" />
      </p>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
