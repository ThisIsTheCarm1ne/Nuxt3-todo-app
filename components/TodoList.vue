<script setup lang="ts">
import type { TODO } from "~/shared/types/notes";

const props = defineProps({ todos: { type: Array as PropType<TODO[]>, required: true } });
const { todos } = props;

const addTodo = () => {
  todos.push({ text: '', completed: false });
};

const deleteTodo = (index: number) => {
  todos.splice(index, 1);
};
</script>

<template>
    <div>
      <ul v-if="todos" class="todo-list">
        <li v-for="(todo, index) in todos" :key="index" class="todo">
          <input type="checkbox" v-model="todo.completed"  title="Is Completed?" />
          <input v-model="todo.text" placeholder="Todo text" />
          <button @click="deleteTodo(index)" class="danger-btn">Delete</button>
        </li>
      </ul>
      <button @click="addTodo">Add Todo</button>
    </div>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}
.todo {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5vw;
}
</style>