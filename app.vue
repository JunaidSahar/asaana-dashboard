<template>
  <div class="w-screen relative bg-[#f4f4f6]">
    <div class="p-6 flex gap-4 h-screen overflow-x-scroll">
      <ColumContainer
        :title="item.name"
        @editTitle="(selectedColumnForEdit = item.id), (isOpenEditListModal = true)"
        @deleteTitle="(selectedColumnForEdit = item.id), (isOpenDeleteListModal = true)"
        v-for="(item, index) in columList"
        :key="index"
      >
        <draggable
          :itemKey="String(index)"
          v-model="item.items"
          group="people"
          class="space-y-3"
          ghost-class="ghost"
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
        title="Add new colum"
        :selectedColumn="
          columList.find((column) => column.id == selectedColumnForEdit)?.name
        "
        @disableModal="isOpenAddListModal = false"
        @inputValue="(value) => (ModalTitle = value)"
        @submitForm="addItemToList"
      />
      <AddListModal
        title="Edit colum name"
        :selectedColumn="
          columList.find((column) => column.id == selectedColumnForEdit).name
        "
        v-if="isOpenEditListModal"
        @disableModal="isOpenEditListModal = false"
        @inputValue="(value) => (ModalTitle = value)"
        @submitForm="editTitle"
      />
      <DeleteColumnModal
        title="Are you sure you want to delete?"
        :selectedColumn="
          columList.find((column) => column.id == selectedColumnForEdit).name
        "
        v-if="isOpenDeleteListModal"
        @disableModal="isOpenDeleteListModal = false"
        @submitForm="deleteTitle"
      />
    </div>
  </div>
</template>

<script setup>
const isOpenAddListModal = ref(false);
const isOpenEditListModal = ref(false);
const isOpenDeleteListModal = ref(false);
const ModalTitle = ref("");
const columList = ref([
  {
    id: 0,
    name: "Todo",
    items: [
      {
        id: 1,
        title: "Title 1",
        skills: ["javascript", "python", "react", "vue", "node", "angular"],
      },
      {
        id: 2,
        title: "Title 2",
        description: "Description 2",
        skills: ["javascript", "python", "react", "vue", "node", "angular"],
        links: [
          {
            name: "Download",
            to: "https://www.linkedin.com",
            icon: "material-symbols:download-sharp",
          },
          {
            name: "LinkedIn",
            to: "https://www.linkedin.com",
            icon: "bi:linkedin",
          },
          {
            name: "Email",
            to: "example@example.com",
            icon: "material-symbols:stacked-email-outline",
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
    id: 1,
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
    id: 2,
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
    this.id = name;
    this.name = name;
    this.items = [];
  }
}

const selectedColumnForEdit = ref();
const addItemToList = () => {
  columList.value.push({ id: columList.value.length, name: ModalTitle.value, items: [] });
  isOpenAddListModal.value = false;
};

const editTitle = () => {
  columList.value.find((list) => list.id === selectedColumnForEdit.value).name =
    ModalTitle.value;
  isOpenEditListModal.value = false;
};
const deleteTitle = () => {
  isOpenDeleteListModal.value = false;
  columList.value = columList.value.filter(
    (list) => list.id !== selectedColumnForEdit.value
  );
};
</script>

<style>
.scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #d4eafd;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #bbdefb;
  max-height: 20px;
  border-radius: 50px;
}
</style>
