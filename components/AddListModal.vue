<template>
  <div
    class="absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50"
  >
    <div class="p-6 rounded-lg border space-y-4">
      <div class="flex items-center gap-2 justify-between">
        <p class="text-lg font-semibold">Add item to row</p>
        <p class="text-gray-600" @click="$emit('disableModal')">
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
        <label for="name" class="font-medium">title</label>
        <input
          type="text"
          id="name"
          @input="(e) => $emit('inputValue', e.target.value)"
          class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-200 rounded"
        />
        <button
          type="submit"
          class="px-5 bg-blue-500 font-medium text-white rounded-lg mt-5 py-2"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script setup></script>
