<template>
  <button @click="isOpenNav = !isOpenNav"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
  </button>

  <div class="md:mr-64">
    <div class="max-w-3xl mx-auto relative h-screen p-4">
      <div class="flex items-center justify-center h-96" v-if="!showMessage">
        <h2 class="text-3xl font-medium">How can I help you today?</h2>
      </div>
      <div class="space-y-10 pb-40 pt-10" v-if="showMessage">
        <div v-for="message in messages" class="relative">
          <img class="w-10 absolute -left-16" :src="message.sender == 'bot' ? '/bot.png' : '/human.png'" />
          <div class="w-full">
            <div v-for="line in message.content" class="relative">
              <div v-if="line.type == 'code'" class="code-snippet">
                <pre><code v-html="highlightCode(line.content, line.language)"></code></pre>
              </div>
              <div v-else>
                <p>
                  {{ line.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="fixed lg:w-[720px] md:w-[520px] w-full px-4 py-2 bg-[#f4f4f6] bottom-8 flex items-end gap-4 border border-slate-200 rounded-lg">
        <textarea id="query" type="text" v-model="query" @input="autoResizeTextArea" placeholder="Write a message..."
          rows="1" class="bg-[#f4f4f6] w-full focus:outline-0 overflow-hidden autoresize" />
        <button class="p-2 bg-white rounded-lg relative" @mouseenter="showKnownLanguages = true"
          @mouseleave="showKnownLanguages = false">
          <div v-if="showKnownLanguages" class="absolute bottom-10 right-0 bg-white border border-gray-200 rounded">
            <button @click="addBackticksAroundSelection(knownLanguage.value)"
              class="hover:bg-gray-100 px-2 py-1 border-b w-full text-left capitalize"
              v-for="knownLanguage in knownLanguages">{{ knownLanguage.name }}</button>
          </div>
          <span>{{ '</>' }}</span>
        </button>

        <button class="p-3 bg-white rounded-lg" @click="
    sendQuery(query),
    messages.length == 0 && chatsList.push('Chat 1'),
    (query = ''),
    autoResizeTextArea(),
    (showMessage = true)
    ">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20">
            <path fill="currentColor" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z" />
          </svg>
        </button>
      </div>
    </div>
  </div>


  <aside class="fixed top-0 right-0 z-40 w-[400px] h-screen transition-transform -translate-x-full md:translate-x-0"
    :class="isOpenNav ? 'translate-x-0' : ''">
    <Notes />
  </aside>

  <div v-if="isOpenNav" @click="isOpenNav = false"
    class="absolute top-0 right-0 w-full h-screen bg-black z-30 opacity-40"></div>
</template>
<script setup>
import { highlightCode } from '@/composables/highlightCode';
import { separateTextAndCode } from '@/composables/separateCodeAndText';
import knownLanguage from '@/composables/knownLanguages';

import "highlight.js/styles/github.css";
const showMessage = ref(false);

const autoResizeTextArea = () => {
  const textarea = document.getElementById("query");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};

const isOpenNav = ref(false);
const messages = ref([])
const dummyResponse = {
  sender: "bot",
  content: separateTextAndCode("The code should be written like this: \n````python\n print('this is python code')```` \n ````cpp\n cout<< ‘hello’ << end;```` ")
}



function sendQuery(message) {
  // add message in the current chat
  const request = {
    sender: "user",
    content: separateTextAndCode(message),
  }
  messages.value.push(request)
  // make api call and store the response
  messages.value.push(dummyResponse)
}

const query = ref("");
const chatsList = ref([]);

const addBackticksAroundSelection = (language) => {
  const textarea = document.getElementById("query");
  const selectionStart = textarea.selectionStart;
  const selectionEnd = textarea.selectionEnd;

  if (selectionStart !== null && selectionEnd !== null) {
    const selectedText = textarea.value.substring(selectionStart, selectionEnd);
    const newText = textarea.value.substring(0, selectionStart) + '````' + language + '\n' + selectedText + '````' + textarea.value.substring(selectionEnd);
    query.value = newText;
  }
  showKnownLanguages.value = false
};

const showKnownLanguages = ref(false)
</script>

<style>
/* ChatWindow.vue */
.code-snippet {
  background-color: #f4f4f6;
  padding: 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  overflow-x: auto;
  border: 1px solid rgb(226, 232, 240);
  margin-top: 2px;
  margin-bottom: 2px;
}

.autoresize {
  resize: none;
  /* Disable manual resizing */
  height: auto;
  /* Set initial height to auto */
  min-height: 32px;
  /* Set minimum height */
  max-height: 150px;
  /* Set maximum height */
  overflow-y: auto;
  /* Hide scrollbar */
  scrollbar-width: none;
  /* Hide scrollbar for Firefox */
  -ms-overflow-style: none;
  /* Hide scrollbar for IE/Edge */
}

.autoresize::-webkit-scrollbar {
  display: none;
  /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
}
</style>
