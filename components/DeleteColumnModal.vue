<template>
  <div
    class="absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg"
  >
    <div class="p-6 rounded-lg border space-y-4">
      <div class="flex items-center gap-2 justify-between">
        <p class="text-lg font-semibold">{{ title }}</p>
        <p class="text-gray-600 cursor-pointer" @click="$emit('disableModal')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
            />
          </svg>
        </p>
      </div>
      <form @submit.prevent="$emit('submitForm')">
        <p for="name" class="font-medium">Title: {{ selectedColumn }}</p>

        <button
          type="submit"
          class="px-5 bg-red-500 hover:bg-red-600 font-medium text-white rounded-lg mt-5 py-2"
        >
          Delete
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  selectedColumn: {
    type: String,
    default: "",
  },
});
</script>
