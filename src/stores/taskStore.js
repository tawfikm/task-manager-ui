import { defineStore } from 'pinia'
import * as taskService from '../services/taskService'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const response = await taskService.fetchTasks()
        this.tasks = response.data
      } catch (err) {
        this.error = err.message || 'Failed to fetch tasks'
      } finally {
        this.loading = false
      }
    },
    async addTask(task) {
      try {
        const response = await taskService.addTask(task)
        this.tasks.push(response.data)
      } catch (err) {
        this.error = err.message || 'Failed to add task'
      }
    },
    async updateTask(task) {
      try {
        await taskService.updateTask(task)
        const index = this.tasks.findIndex(t => t.id === task.id)
        if (index !== -1) {
          this.tasks[index] = { ...task }
        }
      } catch (err) {
        this.error = err.message || 'Failed to update task'
      }
    },
    async deleteTask(id) {
      try {
        await taskService.deleteTask(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (err) {
        this.error = err.message || 'Failed to delete task'
      }
    }
  }
})
