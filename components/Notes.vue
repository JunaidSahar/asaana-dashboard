<template>
    <div class="h-full px-3 py-4 space-y-4 overflow-y-auto border-l max-h-[100vh] overflow-hidden bg-[#f4f4f6]">
        <div class="flex font-medium justify-between w-full text-xl transition-all p-1 rounded-lg items-center">
            <span>Notes</span>

            <div class="flex gap-1">
                <button class="p-2 bg-white rounded-lg relative text-sm border" @mouseenter="showKnownLanguages = true"
                    @mouseleave="showKnownLanguages = false">
                    <div v-if="showKnownLanguages"
                        class="absolute top-9 right-0 bg-white border border-gray-200 rounded">
                        <button @click="addBackticksAroundSelection(knownLanguage.value)"
                            class="hover:bg-gray-100 px-2 py-1 border-b w-full text-left capitalize"
                            v-for="knownLanguage in knownLanguages">{{ knownLanguage.name }}</button>
                    </div>
                    <span class="text-sm">{{ '</>' }}</span>
                </button>
                <button v-if="!editingNotes" @click="editingNotes = true"
                    class="px-3 py-[6px] bg-white rounded-lg relative text-base border">
                    <Icon name="material-symbols:edit-square-outline" />
                </button>
                <button v-else @click="() => saveNotes(notesText)"
                    class="px-3 py-[6px] bg-white rounded-lg relative text-base border">
                    <Icon name="ion:save-outline" />
                </button>
            </div>

        </div>

        <div class="px-4 py-2 bg-[#f4f4f6] border border-slate-200 rounded-lg min-h-[500px]">
            <textarea v-if="editingNotes" id="note" type="text" v-model="notesText" @input="autoResizeTextArea"
                placeholder="Write Notes..."
                class="bg-[#f4f4f6] w-full focus:outline-0 overflow-hidden h-full min-h-[500px] resize-none" />
            <template v-else v-for="line in notesContent">
                <div v-if="line.type == 'code'" class="code-snippet">
                    <pre><code v-html="highlightCode(line.content, line.language)"></code></pre>
                </div>
                <p v-else class="mb-1 whitespace-pre-line">
                    {{ line.content }}
                </p>
            </template>
        </div>
    </div>
</template>

<script setup>
import { highlightCode } from '@/composables/highlightCode'; // import all langauges, this may make bundle size big | above example load manually
import { separateTextAndCode } from '@/composables/separateCodeAndText'; // import all langauges, this may make bundle size big | above example load manually
import knownLanguage from '@/composables/knownLanguages';

const showKnownLanguages = ref(false)
const editingNotes = ref(false)
const notesContent = ref([])
const notesText = ref('')

function saveNotes(content) {
    notesContent.value = separateTextAndCode(content)
    notesText.value = notesContent.value.map(line => line.type == 'text' ? line.content : ('````' + `${line.language}\n` + line.content + '````')).join('\n')
    editingNotes.value = false
}



const autoResizeTextArea = () => {
    const textarea = document.getElementById("note");
    if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
};



const addBackticksAroundSelection = (language) => {
    const textarea = document.getElementById("note");
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    if (selectionStart !== null && selectionEnd !== null) {
        const selectedText = textarea.value.substring(selectionStart, selectionEnd);
        const newText = textarea.value.substring(0, selectionStart) + '````' + language + '\n' + selectedText + '````' + textarea.value.substring(selectionEnd);
        notesContent.value = newText;
    }
    showKnownLanguages.value = false
};


saveNotes("\
Nice Backend Code\
\n\
\n````python\
\nprint('Hello World')\
\n````\
\nNice UI Code\
\n````html\
\n<html>\
\n    <p>hello world</p>\
\n</html>\
\n````\
", true)

</script>