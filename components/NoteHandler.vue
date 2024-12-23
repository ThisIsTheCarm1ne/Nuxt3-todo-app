<script setup lang="ts">
import { cloneDeep } from 'lodash';

import type Note from "~/shared/types/notes";
import type { TODO } from "~/shared/types/notes";

const {
  notes,
  addNote,
  updateNote,
  deleteNote
} = useNotes();

const props = defineProps({
  isNew: { type: Boolean, required: false, default: false },
  noteId: { type: String, required: false}
});
const { isNew } = props;
const { noteId } = props;

const emit = defineEmits(['close']);

const note = ref<Note | null>(null);

onMounted(() => {
  if (isNew) {
    note.value = { id: Date.now().toString(), title: '', todos: <TODO[]>[] };
  } else {
    const existingNote = notes.value.find((n) => n.id === noteId);
    if (!existingNote) {
      emit('close');
    }

    note.value = { ...existingNote, todos: cloneDeep(existingNote.todos) }; // deep copy of todos
  }
});

const saveNote = () => {
  if (note.value?.title === '' || note.value?.todos.length === 0) {
    alert('Note cannot be empty');
    return;
  }

  if (note.value.todos.some((todo) => todo.text.trim() === '')) {
    alert('Todos cannot have empty text.');
    return;
  }

  if (isNew) {
    addNote(note.value);
  } else {
    updateNote({...note.value, todos: cloneDeep(note.value.todos)});
  }
  emit('close');
};

const cancelEditing = () => {
  if (confirm('Discard changes?')) {
    emit('close');
  }
};

const deleteNoteWithConfirm = () => {
  if (confirm('Are you sure you want to delete this note?')) {
    deleteNote(note.value.id);
    emit('close');
  }
};
</script>

<template>
  <div class="backdrop">
    <div class="popup">
      <h1>{{ isNew ? 'Create Note' : 'Edit Note' }}</h1>
      <div v-if="note">
        <input v-model="note.title" placeholder="Note Title" />
        <TodoList v-model:todos="note.todos" />
        <div class="btn-collection">
          <button @click="saveNote">Save</button>
          <button @click="cancelEditing" class="danger-btn">Cancel</button>
          <button v-if="!isNew" @click="deleteNoteWithConfirm" class="danger-btn">Delete</button>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000bd;
  position: absolute;
  top: 0;
  left: 0;
}
.popup {
  padding: 2vh 2vw;
  background: white;
}
.btn-collection {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2vh;
}
</style>