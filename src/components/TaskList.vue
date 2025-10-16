<template>
  <div>
    <form @submit.prevent="addNewTask" class="task-form">
      <input v-model="newTask.title" placeholder="Task title" required />
      <input v-model="newTask.description" placeholder="Description" />
      <button type="submit">Add Task</button>
    </form>

    <div v-if="taskStore.error" class="error">{{ taskStore.error }}</div>
    <div v-if="taskStore.loading">Loading tasks...</div>

    <ul>
      <li v-for="task in taskStore.tasks" :key="task.id" class="task-item">
        <input type="checkbox" v-model="task.completed" @change="updateTask(task)" />
        <input v-model="task.title" @blur="updateTask(task)" class="task-title" />
        <input v-model="task.description" @blur="updateTask(task)" class="task-desc" />
        <button @click="updateTask(task)" class="update-btn">Update</button>
        <button @click="deleteTask(task.id)" class="delete-btn">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from "@/stores/taskStore.js";
import '../assets/styles.css'

const taskStore = useTaskStore()

const newTask = ref({
  title: '',
  description: '',
  completed: false
})

const addNewTask = () => {
  if (!newTask.value.title.trim()) return
  taskStore.addTask(newTask.value)
  newTask.value = { title: '', description: '', completed: false }
}

const updateTask = (task) => {
  taskStore.updateTask(task)
}

const deleteTask = (id) => {
  taskStore.deleteTask(id)
}

onMounted(() => {
  taskStore.fetchTasks()
})
</script>
