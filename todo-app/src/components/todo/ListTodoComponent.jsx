import moment from "moment";
import React, { Component } from "react";
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
class ListTodosComponent extends Component{
    constructor(){
        // console.log("constructor");
        super();
        this.state={
            todos : [],
            message : null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    // componentWillUnmount(){
    //     console.log("compoent will unmount");
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("should component update");
    //     console.log(nextProps)
    //     console.log(nextState)
    //     return true
    // }

    componentDidMount(){
        // console.log("component did mount")
        this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
            .then(response => {this.setState({todos : response.data})})
            .catch(error => console.log(error))
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message : `Delete of todo ${id} successful`})
                    this.refreshTodos();
                }
            )
    }

    updateTodoClicked(id){
        console.log(id);
        this.props.navigate(`/todo/${id}`);
    }

    addTodoClicked(){
        this.props.navigate(`/todo/-1`);
    }

    render(){
        // console.log("render")
        return(
            <div>
                <h1>List Todos</h1>
               { this.state.message && <div className="alert alert-success">{this.state.message}</div> }
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>End Date</th>
                            <th>isCompleted?</th>
                            <th>Update</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><div className="btn btn-info" onClick={() => this.updateTodoClicked(todo.id)}>Update</div></td>
                                        <td><div className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</div></td>
                                    </tr>
                            )
                        }
                        <tr>
                            <td><button className="btn btn-success" onClick={this.addTodoClicked}>+ Add</button></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}
export default ListTodosComponent;