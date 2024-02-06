<template>
  <div
    class="shadow border rounded-lg p-5 space-y-2 cursor-pointer group hover:bg-blue-400 transition-all"
  >
    <div class="w-16 rounded-full h-1 bg-blue-500 group-hover:bg-white" />
    <div class="flex items-center gap-2">
      <p class="text-blue-500 group-hover:text-blue-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"
          />
        </svg>
      </p>
      <p class="text-slate-700 group-hover:text-white">{{ cardData.title }}</p>
    </div>
    <div v-if="cardData.skills?.length" class="flex items-center gap-1 pt-4">
      <p
        class="text-xs px-3 py-0.5 bg-blue-500 group-hover:bg-white group-hover:text-blue-500 rounded-full text-white"
        v-for="(skill, index) in cardData.skills"
        :key="index"
      >
        {{ skill }}
      </p>
    </div>
    <div
      class="pt-2 flex items-center gap-2 text-sm"
      v-if="cardData.links?.length"
    >
      <NuxtLink
        :to="link.name === 'Email' ? `mailto:${link.to}` : link.to"
        class="flex items-center gap-1 font-medium"
        v-for="(link, index) in cardData.links"
        :key="index"
        target="_blank"
      >
        <img :src="link.icon" :alt="link.name" class="w-6 h-6" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cardData: {
    type: Object,
    required: true,
  },
});
</script>
