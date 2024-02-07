<template>
  <div
    class="shadow-sm hover:shadow-lg rounded-lg p-7 space-y-3 cursor-pointer bg-white group hover:bg-blue-400 transition-all"
  >
    <div class="w-10 rounded-full h-1 bg-blue-500 group-hover:bg-white" />
    <div class="flex items-center gap-2">
      <p class="text-blue-500 group-hover:text-blue-100">
        <Icon name="material-symbols:adjust" class="h-5 w-5" />
      </p>
      <p class="text-slate-700 group-hover:text-white">{{ cardData.title }}</p>
    </div>
    <div
      v-if="cardData.skills?.length"
      class="flex items-center gap-x-2 gap-y-4 pt-4 flex-wrap"
    >
      <p
        class="text-xs px-3 py-0.5 bg-blue-500 group-hover:bg-white group-hover:text-blue-500 rounded-full text-white"
        v-for="(skill, index) in isShowAllSkills
          ? cardData.skills
          : cardData.skills.slice(0, 4)"
        :key="index"
      >
        {{ skill }}
      </p>
      <p
        @click="isShowAllSkills = !isShowAllSkills"
        v-show="cardData.skills?.length > 4"
        class="text-xs group-hover:text-white underline"
      >
        {{ isShowAllSkills ? `Hide` : `View` }}
        {{ cardData.skills.length - 4 }} skills
      </p>
    </div>
    <div
      class="pt-2 flex items-center gap-2 text-sm"
      v-if="cardData.links?.length"
    >
      <NuxtLink
        :to="link.name === 'Email' ? `mailto:${link.to}` : link.to"
        class="flex items-center gap-1 font-medium group-hover:text-white text-slate-600"
        :class="link.name === 'Download' ? 'w-full underline' : 'w-fit'"
        v-for="(link, index) in cardData.links"
        :key="index"
        target="_blank"
      >
        <Icon :name="link.icon" />
        {{ link.name }}
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

const isShowAllSkills = ref(false);
</script>
