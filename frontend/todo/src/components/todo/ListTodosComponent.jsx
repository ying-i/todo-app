import { useEffect, useState } from "react";
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";


function ListTodosComponent(){

    const today = new Date();

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const [message, setMessage] = useState(null)//default value is empty array

    const [todos,setTodos] = useState([])

    // const todos = [
    //                 // {id:1, description:'Learn AWS',done:false, targetDate:targetDate},
    //                 // {id:2, description:'React',done:false, targetDate:targetDate},
    //                 // {id:3, description:'Full Stack',done:false, targetDate:targetDate}
    //             ]

    //useEffect-tell React that your component needs to do somthing after render
    //the best practice is to call refreshTodos method in useEffect hook
    useEffect(
        ()=> refreshTodos(),[]
    )

    function refreshTodos(){
        //retrieveAllTodosForUsername method of TodoApiService.js
        retrieveAllTodosForUsernameApi(username)
            .then(response => {
                setTodos(response.data)
            })
            .catch(error => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi(username, id)
            .then(
                //1.:dispaly message
                //2:update todos list
                () => {
                    setMessage(`Delete of todo with ${id} successful`)
                    // use sticks``, because there is ${}
                }
           
            )
            .catch(error => console.log(error))
    }

    function updateTodo(id){
        navigate(`/todo/${id}`)   
    }
    //we need to create a new todo page and redirect to it.we can go ahead and show the page.

    function addNewTodo(){
        navigate(`/todo/-1`)//new todo's id always is 1, the latest one
    }
    

    return(
        <div className="container">
            <h1>Things You Want To Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
           {/* only message is not null, the specific div would be shown */}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target tDate</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>                          
                    </thead>
                    <tbody>
                        {/* arrow function
                        we are mapping each todo to <tr></tr>*/}
                        {
                            todos.map(
                                todo => (
                                    // each child in a list should have a unique "key" prop
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toDateString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" 
                                                    onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                                    {/* if you need to pass parameter you should use arrow function */}
                                        <td><button className="btn btn-success"
                                                    onClick={() => updateTodo(todo.id)}>Update</button></td>
                                                    {/* when update is clicked, we'd want to redirect him to the todo page(todoComponent.jsx) */}
                                    </tr>
                                )
                            )
                        }
                                              
                 </tbody>
                </table>
            </div>
            <div className="btn btn-success m-3" onClick={addNewTodo}>Add new Todo</div>
        </div>
    )
}


export default ListTodosComponent 







