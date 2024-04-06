<template>
    <div class="h-full px-3 py-4 space-y-4 overflow-y-auto bg-[#f4f4f6] relative">
        <div>
            <button class="flex font-medium justify-between w-full text-xl transition-all p-1 rounded-lg items-center">
                Notes
                <Icon @click="writingNote = true, currentNote = null, newNote = ''" name="material-symbols:add" />
            </button>
        </div>
        <ul class="space-y-2 font-medium">
            <li v-for="(note, index) in notesList" @click="setCurrentNote(note.id)"
                class="py-1 px-2 hover:bg-white transition-all text-gray-600 hover:text-black cursor-pointer rounded-lg border relative line-clamp-2"
                :key="index">
                <span class="absolute right-3 ">
                    <Icon v-if="currentNote == note.id" name="material-symbols:edit-square-outline-sharp" />
                </span>
                <template v-for="line in note.content">
                    <div v-if="line.type == 'code'" class="code-snippet">
                        <pre><code v-html="highlightCode(line.content, line.language)"></code></pre>
                    </div>
                    <div v-else>
                        <p>
                            {{ line.content }}
                        </p>
                    </div>
                </template>
            </li>
        </ul>


        <div
            v-if="writingNote"
            class="absolute w-[94%] px-4 py-2 bg-[#f4f4f6] bottom-8 flex items-center gap-4 border border-slate-200 rounded-lg">
            <textarea id="note" type="text" v-model="newNote" @input="autoResizeTextArea" placeholder="Write Notes..."
                rows="1" class="bg-[#f4f4f6] w-full focus:outline-0 overflow-hidden autoresize h-full" />
            <button class="p-2 bg-white rounded-lg relative" @mouseenter="showKnownLanguages = true"
                @mouseleave="showKnownLanguages = false">
                <div v-if="showKnownLanguages"
                    class="absolute bottom-10 right-0 bg-white border border-gray-200 rounded">
                    <button @click="addBackticksAroundSelection(knownLanguage.value)"
                        class="hover:bg-gray-100 px-2 py-1 border-b w-full text-left capitalize"
                        v-for="knownLanguage in knownLanguages">{{ knownLanguage.name }}</button>
                </div>
                <span>{{ '</>' }}</span>
            </button>

            <button class="p-2 text-xl w-14 bg-white rounded-lg" @click="
                    addNotes(newNote),
                    autoResizeTextArea()
                    ">
                <Icon name="ri:upload-cloud-2-line" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { highlightCode } from '@/composables/highlightCode'; // import all langauges, this may make bundle size big | above example load manually
import { separateTextAndCode } from '@/composables/separateCodeAndText'; // import all langauges, this may make bundle size big | above example load manually

const notesList = ref([]);
const newNote = ref("")
const showKnownLanguages = ref(false)
const writingNote = ref(false)
const currentNote = ref()

function setCurrentNote(noteId) {
    currentNote.value = noteId
    newNote.value = (notesList.value?.find((note) => note.id == noteId)?.content?.map((line) => line.type == 'text' ? line.content : ('````' + `${line.language}\n` + line.content + '````'))).join('\n')
    writingNote.value = true
}
function addNotes(content, isInitialDummy = false) {
    if (content.length == 0) {
        return
    }
    if (!isInitialDummy && currentNote.value) {
        notesList.value.find((note) => note.id == currentNote.value).content = separateTextAndCode(content)
    }
    else {
        notesList.value.push({ id: notesList.value.length + 1, content: separateTextAndCode(content) })
        if (!isInitialDummy) {
            currentNote.value = notesList.value.length
        }
    }
    if (process.client) {
        autoResizeTextArea()
    }
}



const autoResizeTextArea = () => {
    const textarea = document.getElementById("note");
    if(textarea){
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
        newNote.value = newText;
    }
    showKnownLanguages.value = false
};


const knownLanguages = [
    {
        name: "Python",
        value: "python",
    },
    {
        name: "JavaScript",
        value: "javascript"
    },
    {
        name: "Bash",
        value: "bash",
    },
    {
        name: "C++",
        value: "cpp",
    },
    {
        name: "Markdown",
        value: "md",
    },
    {
        name: "Other",
        value: "md",
    },
]



addNotes("Nice Backend Code\n\
    ````python\n\
print('Hello World')\
    ````", true)

addNotes("Nice UI Code\
    ````html\n\
<html>\n\
    <p>hello world</p>\n\
</html>\
    ````", true)
</script>