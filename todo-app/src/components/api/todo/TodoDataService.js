import axios from "axios"
import { JPA_API_URL } from "../../../Constants";
// import { API_URL } from "../../../Constants";
class TodoDataService{
    retrieveAllTodos(name){
        return axios.get(`${JPA_API_URL}/users/${name}/todos`);
    }

    deleteTodo(username, id){
        return axios.delete(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }

    updateTodo(username, id, todo){
        return axios.put(`${JPA_API_URL}/users/${username}/todos/${id}`, todo);
    }

    createTodo(username, todo){
        return axios.post(`${JPA_API_URL}/users/${username}/todos/`, todo);
    }

    retrieveTodo(username, id){
        return axios.get(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }
}

export default new TodoDataService()