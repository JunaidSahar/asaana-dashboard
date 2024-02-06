<template>
  <div class="p-6 flex gap-4 relative h-screen overflow-x-scroll">
    <ColumContainer
      :title="item.name"
      v-for="(item, index) in columList"
      :key="index"
    >
      <draggable
        v-model="item.items"
        group="people"
        class="space-y-3"
        style="height: calc(100vh - 100px)"
      >
        <template #item="{ element }">
          <Card :cardData="element" />
        </template>
      </draggable>
    </ColumContainer>
    <div class="min-w-[350px]">
      <div
        class="flex gap-2 items-center cursor-pointer"
        @click="isOpenAddListModal = !isOpenAddListModal"
      >
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
            />
          </svg>
        </p>
        <p class="font-medium">Add new colum</p>
      </div>
    </div>
    <AddListModal
      v-if="isOpenAddListModal"
      @disableModal="isOpenAddListModal = false"
      @inputValue="(value) => (ModalTitle = value)"
      @submitForm="addItemToList"
    />
  </div>
</template>

<script setup>
const isOpenAddListModal = ref(false);
const ModalTitle = ref("");
const columList = ref([
  {
    name: "Todo",
    items: [
      {
        id: 1,
        title: "Title 1",
        skills: ["javascript", "python", "react"],
      },
      {
        id: 2,
        title: "Title 2",
        description: "Description 2",
        skills: ["javascript", "python", "react"],
        links: [
          {
            name: "Download",
            to: "https://www.linkedin.com",
            icon: "https://icons.iconarchive.com/icons/martz90/circle-addon2/512/downloads-icon.png",
          },
          {
            name: "LinkedIn",
            to: "https://www.linkedin.com",
            icon: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png",
          },
          {
            name: "Email",
            to: "example@example.com",
            icon: "https://cdn-icons-png.freepik.com/512/8748/8748009.png",
          },
        ],
      },
      {
        id: 3,
        title: "Title 3",
        description: "Description 3",
      },
    ],
  },
  {
    name: "Completed",
    items: [
      {
        id: 1,
        title: "Title 1",
        skills: ["javascript", "python", "react"],
      },
      {
        id: 2,
        title: "Title 2",
        skills: ["javascript", "python", "react"],
      },
      {
        id: 3,
        title: "Title 3",
        skills: ["javascript", "python", "react"],
      },
    ],
  },
  {
    name: "sample",
    items: [
      {
        id: 1,
        title: "Title 1",
        skills: ["javascript", "python", "react"],
      },
      {
        id: 2,
        title: "Title 2",
        skills: ["javascript", "python", "react"],
      },
    ],
  },
]);

class List {
  constructor(name) {
    this.name = name;
    this.items = [];
  }
}

const addItemToList = () => {
  columList.value.push(new List(ModalTitle.value, []));
  isOpenAddListModal.value = false;
};
</script>

<style>
.scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #4d7fff transparent;
}
</style>
