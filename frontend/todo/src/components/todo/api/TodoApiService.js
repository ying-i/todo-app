import { apiClient } from './ApiClient'

//displaying todos from Spring Boot REST API in React app

export const retrieveAllTodosForUsernameApi = (username) => apiClient.get(`/users/${username}/todos`)
//we want the username value to be repalced so we cannot use single quotes anymore.
//we need to use sticks.
//http://localhost:8080/users/ying/todos
//(username) is parameter, will be pass to ${username}

export const deleteTodoApi = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)

export const retrieveTodoApi= (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoApi = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`,todo)

export const createTodoApi = (username,todo) => apiClient.post(`/users/${username}/todos`,todo)
//we want the username value to be repalced so we cannot use single quotes anymore, so we need to use sticks.




