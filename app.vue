<script setup lang="ts">
import type Note from "~/shared/types/notes";

const {
  notes,
  deleteNote
} = useNotes();

const managingNote = ref<boolean>(false);
const creatingANewNote = ref<boolean>(false);
const noteId = ref<string>('');

const createNewNote = () => {
  creatingANewNote.value = true;
  managingNote.value = true;
};

const editNote = (id: string) => {
  creatingANewNote.value = false;
  noteId.value = id;
  managingNote.value = true;
};

const deleteNoteWithConfirm = (id: string) => {
  if (confirm('Are you sure you want to delete this note?')) {
    deleteNote(id);
  }
};
</script>

<template>
  <div class="main">
    <h1>Notes</h1>
    <button @click="createNewNote">Create Note</button>
  </div>
  <div class="notes-collection">
    <div v-for="note in notes" :key="note.id">
      <h3>{{ note.title }}</h3>
      <ul>
        <li
            v-for="(todo, index) in note.todos.slice(0, 3)"
            :key="index"
            :style="{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'green' : 'inherit'
           }"
        >
          {{ todo.text }}
        </li>
      </ul>
      <div class="btns-container">
        <button @click="editNote(note.id)">Edit</button>
        <button @click="deleteNoteWithConfirm(note.id)" class="danger-btn">Delete</button>
      </div>
    </div>
  </div>
  <NoteHandler v-if="managingNote" v-model:is-new="creatingANewNote" v-model:note-id="noteId" @close="managingNote = false"  />
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.notes-collection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2vw;
  padding-left: 2vw;
  padding-right: 2vw;
}
.btns-container {
  display: flex;
  gap: 1vw;
}
@media screen and (max-width: 500px) {
  .notes-collection {
    flex-direction: column;
    align-items: center;
    margin-top: 2vh;
    text-align: center;
  }
}
</style>

<style>
body {
  font-family: Lato, sans-serif;
}
button {
  border: 1px solid black;
  background: none;
}
.danger-btn {
  background-color: red;
}
</style>