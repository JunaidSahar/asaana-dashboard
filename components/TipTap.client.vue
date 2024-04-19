<template>
  <div class="w-full border shadow-lg rounded-lg p-4">
    <div v-if="editor">
      <button
        class="text-sm text-black px-2 py-0.5 bg-white rounded-full"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        <Icon name="material-symbols:code-off" /> code
      </button>
    </div>
    <div class="editor">
      <TiptapEditorContent class="py-4 text-sm text-black" :editor="editor" />
    </div>
  </div>
  <button
    @click="getSelectedContent"
    class="text-black p rounded-full p-2 text-sm bg-white"
  >
    Generated HTML
  </button>
</template>

<script setup>
const lowlight = TiptapcreateLowlight(Tiptapcommon);
const currentContent = ref();
const selectedContent = ref();

function getSelectedContent() {
  selectedContent.value = currentContent.value;
  console.log(selectedContent.value);
}

const editor = useEditor({
  content: "<p>Write code to the editor</p>",
  onUpdate: ({ editor }) => {
    currentContent.value = editor.getHTML();
  },
  extensions: [
    TiptapStarterKit.configure({
      codeBlock: false, //to avoid duplication issues
    }),
    TiptapCodeBlockLowlight.configure({
      lowlight,
    }),
  ],
});
</script>

<style>
.editor pre {
  background-color: rgba(255, 255, 255, 0.6);
  padding: 1rem;
  backdrop-filter: blur(0.2);
  font-size: 0.9rem;
  border-radius: 4px;
  overflow-x: auto;
  border: 1px solid rgb(226, 232, 240);
  margin-top: 8px;
  margin-bottom: 8px;
}

.tiptap {
  outline: none !important;
}

.editor > div > div {
  min-height: 400px;
}
</style>
