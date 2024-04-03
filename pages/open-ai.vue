<template>
  <button
    @click="isOpenNav = !isOpenNav"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0"
    :class="isOpenNav ? 'translate-x-0' : ''"
  >
    <div class="h-full px-3 py-4 space-y-4 overflow-y-auto bg-[#f4f4f6]">
      <div>
        <button
          class="flex font-medium justify-between w-full text-lg hover:bg-blue-500 transition-all hover:text-white p-1 rounded-lg items-center"
        >
          New Chat
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 22 22"
          >
            <path
              fill="currentColor"
              d="M5 14q-.425 0-.712-.288T4 13q0-.425.288-.712T5 12h5q.425 0 .713.288T11 13q0 .425-.288.713T10 14zm0-4q-.425 0-.712-.288T4 9q0-.425.288-.712T5 8h9q.425 0 .713.288T15 9q0 .425-.288.713T14 10zm0-4q-.425 0-.712-.288T4 5q0-.425.288-.712T5 4h9q.425 0 .713.288T15 5q0 .425-.288.713T14 6zm8 13v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T15.65 20H14q-.425 0-.712-.287T13 19m7.5-5.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z"
            />
          </svg>
        </button>
      </div>
      <ul class="space-y-2 font-medium">
        <li
          v-for="(list, index) in promptList"
          class="line-clamp-1 p-1 hover:bg-white transition-all text-gray-600 hover:text-black cursor-pointer rounded-lg"
          :key="index"
        >
          {{ list }}
        </li>
      </ul>
    </div>
  </aside>

  <div class="md:ml-64">
    <div class="max-w-3xl mx-auto relative h-screen p-4">
      <div class="flex items-center justify-center h-96" v-if="!showMessage">
        <h2 class="text-3xl font-medium">How can I help you today?</h2>
      </div>
      <div class="space-y-10 pb-28" v-if="showMessage">
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.type === 'code'" class="code-snippet">
            <pre><code v-html="highlightCode(message.content, message.language)"></code></pre>
          </div>
          <div v-else>
            <p>
              {{ message.content }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="fixed lg:w-[720px] md:w-[520px] w-full px-4 py-2 bg-[#f4f4f6] bottom-8 flex items-end gap-4 border border-slate-200 rounded-lg"
      >
        <textarea
          id="note"
          type="text"
          v-model="searchValue"
          @input="autoResizeTextArea"
          placeholder="Write a message..."
          rows="1"
          class="bg-[#f4f4f6] w-full focus:outline-0 overflow-hidden autoresize"
        />
        <button
          class="p-3 bg-white rounded-lg"
          @click="
            promptList.push(searchValue),
              (searchValue = ''),
              (showMessage = true)
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="isOpenNav"
    @click="isOpenNav = false"
    class="absolute top-0 left-0 w-full h-screen bg-black z-30 opacity-40"
  ></div>
</template>
<script setup>
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";
const showMessage = ref(false);

// Load languages for syntax highlighting
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);

const autoResizeTextArea = () => {
  const textarea = document.getElementById("note");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};

const isOpenNav = ref(false);

const messages = [
  {
    id: 1,
    type: "text",
    content:
      "You can run highlighting inside a web worker to avoid freezing the browser window while dealing with very big chunks of code.",
  },
  {
    id: 2,
    type: "code",
    content: 'let a = console.log("Hello, world!");',
    language: "javascript",
  },
  {
    id: 3,
    type: "text",
    content:
      "We strongly recommend <pre><code> wrapping for code blocks. It's quite semantic and 'just works' out of the box with zero fiddling. It is possible to use other HTML elements (or combos), but you may need to pay special attention to preserving linebreaks.",
  },

  {
    id: 3,
    type: "text",
    content:
      "We strongly recommend <pre><code> wrapping for code blocks. It's quite semantic and 'just works' out of the box with zero fiddling. It is possible to use other HTML elements (or combos), but you may need to pay special attention to preserving linebreaks.",
  },
  {
    id: 2,
    type: "code",
    content: 'let a = console.log("Hello, world!");',
    language: "javascript",
  },
  {
    id: 3,
    type: "text",
    content:
      "We strongly recommend <pre><code> wrapping for code blocks. It's quite semantic and 'just works' out of the box with zero fiddling. It is possible to use other HTML elements (or combos), but you may need to pay special attention to preserving linebreaks.",
  },
];

const highlightCode = (content, language) => {
  if (language && hljs.getLanguage(language)) {
    try {
      return hljs.highlight(language, content).value;
    } catch (__) {}
  }
  return content;
};
const searchValue = ref("");
const promptList = ref([]);
</script>

<style scoped>
/* ChatWindow.vue */
.code-snippet {
  background-color: #f4f4f6;
  padding: 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  overflow-x: auto;
  border: 1px solid rgb(226, 232, 240);
}

.autoresize {
  resize: none; /* Disable manual resizing */
  height: auto; /* Set initial height to auto */
  min-height: 32px; /* Set minimum height */
  max-height: 100px; /* Set maximum height */
  overflow-y: hidden; /* Hide scrollbar */
}
</style>
