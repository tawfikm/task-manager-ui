import axios from 'axios'

export const fetchTasks = () => axios.get('/api/tasks')
export const addTask = (task) => axios.post('/api/tasks', task)
export const updateTask = (task) => axios.put(`/api/tasks/${task.id}`, task)
export const deleteTask = (id) => axios.delete(`/api/tasks/${id}`)
