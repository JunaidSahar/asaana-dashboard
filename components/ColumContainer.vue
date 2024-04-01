<template>
  <div class="min-w-[350px] space-y-2 overflow-y-scroll scrollbar px-3">
    <div class="flex items-center pb-4 justify-between gap-2 sticky top-0 bg-[#f4f4f6]">
      <p class="font-bold text-lg">{{ title }}</p>
      <div class="text-lg text-slate-700 flex gap-x-1">
        <Icon
        class="hover:bg-blue-100 hover:text-blue-600 p-1 rounded-lg block w-max h-max cursor-pointer"
          @click="$emit('editTitle')"
          name="material-symbols:drive-file-rename-outline-outline"
        />
        <Icon
          class="hover:bg-red-100 hover:text-red-600 p-1 rounded-lg block w-max h-max cursor-pointer"
          @click="$emit('deleteTitle')"
          name="material-symbols:delete-outline"
        />
      </div>
    </div>
    <slot> </slot>
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
