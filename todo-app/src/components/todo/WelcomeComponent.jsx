import { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../api/todo/HelloWorldService";

class WelcomeComponent extends Component{
    constructor(props){
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulMessage = this.handleSuccessfulMessage.bind(this);
        this.state = {
            welcomeMessage : '',
            isError : false,
            errorMessage : ''
        }
    }

    render(){
        return(
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.params.name}. You can manage your <Link to="/todos">todos</Link>
                </div><br/>
                <div className="container">
                    Click here to get a customized welcome message.&nbsp;
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                   {this.state.welcomeMessage}
                </div><br></br>
                <div className="container">
                    {this.state.isError && <div className="alert alert-danger">{this.state.errorMessage}</div>}
                </div>
            </>
        ) 
    }

    retrieveWelcomeMessage(){
        // console.log("welcome-message-retrieved");
        // HelloWorldService.executeHelloWorldService()
        // .then( response => this.handleSuccessfulMessage(response))

        // HelloWorldService.executeHelloWorldBeanService()
        //     .then(response => this.handleSuccessfulMessage(response))

        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
            .then(response => this.handleSuccessfulMessage(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessfulMessage(response){
        this.setState({welcomeMessage : response.data.message})
    }

    handleError(error){
        console.log(error.response)
        let errorMessage = ''

        if(error.message)
            errorMessage += error.message
        
        if(error.response && error.response.data)
            errorMessage += error.response.data.message

        // this.setState({errorMessage : error.response.data.message, isError: true})
        this.setState({welcomeMessage:errorMessage})
    }
}

export default WelcomeComponent