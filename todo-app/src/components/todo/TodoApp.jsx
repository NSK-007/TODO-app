import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import withNavigation from "./WithNavigation.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "./LoginComponent.jsx";
import ListTodosComponent from "./ListTodoComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import withParams from "./WithParams.jsx";
import FooterComponent from "./FooterComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import TodoComponent from "./TodoComponent.jsx";

class TodoApp extends Component{
   
    render(){
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        // const HeaderComponentWithNavigation = HeaderComponent;
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent);
        const TodoComponentWithParams = withParams(TodoComponent);
        const TodoComponentWithParamsAndNavigation = withNavigation(TodoComponentWithParams);
        return(
            
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation />
                    <Routes>
                        <Route path="/" element={<AuthenticatedRoute><WelcomeComponentWithParams/></AuthenticatedRoute>} />
                        <Route path="/login" element={<LoginComponentWithNavigation/>} />
                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>} />
                        <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponentWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        <Route path="/todo/:id" element={<AuthenticatedRoute><TodoComponentWithParamsAndNavigation /></AuthenticatedRoute>} />
                        <Route path="*" element={<ErrorComponent/>}/>
                    </Routes>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}

export default TodoApp;