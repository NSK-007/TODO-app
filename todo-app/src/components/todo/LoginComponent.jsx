import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
class LoginComponent extends Component{
    constructor(props){
        super();
        this.state = {
            username : 'in28minutes',
            password : '',
            hasLoginFailed : false,
            hasLoginSuccessful : false
        }

        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    render(){
        return(
            <>
                <h1>Login</h1>
                {/* <ShowMessage hasLoginFailed={this.state.hasLoginFailed} hasLoginSuccessful={this.state.hasLoginSuccessful}/> */}
               <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-danger">Invalid Credentials</div>}
                    {this.state.hasLoginSuccessful && <div style={{color:'green'}}>Login Successful</div>}
                    {/* User Name: <input type="text" name="username" onChange={this.handleChange}/><br/><br/> */}
                    {/* Password : <input type="password" name="password" onChange={this.handleChange}/><br/><br/> */}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" name="username" onChange={this.handleChange} className="form-control" aria-label="Text input with checkbox" />
                    </div>

                    <div className="input-group">
                        <span className="input-group-text" id="addon-wrapping"><i className="bi bi-key"></i></span>
                    <input type="password" name="password" onChange={this.handleChange} className="form-control" aria-label="Text input with radio button" />
                    </div><br></br>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
               </div>
            </>
        )
    }

    // handleUsernameChange(event){
    //     console.log(event.target.value);
    //     this.setState({username:event.target.value})
    // }

    // handlePasswordChange(event){
    //     console.log(event.target.value);
    //     this.setState({password:event.target.value})
    // }

    handleChange(event){
        // console.log(this.state);
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    loginClicked(){
        // if(this.state.username==='in28minutes' && this.state.password==='dummy'){
        //     // console.log('Successful')
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     this.props.navigate(`/welcome/${this.state.username}`)
        //     // this.setState({hasLoginSuccessful:true})
        //     // this.setState({hasLoginFailed:false})
        // }
        // else{
        //     console.log('Failed')
        //     this.setState({hasLoginSuccessful:false})
        //     this.setState({hasLoginFailed:true})
        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(
        //         () => {
        //             AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //             this.props.navigate(`/welcome/${this.state.username}`)
        //         }).catch(
        //             () => {
        //                 this.setState({ hasLoginSuccessful: false })
        //                 this.setState({ hasLoginFailed: true })
        //             }
        //         )

        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
                    .then(
                        (response) => {
                            AuthenticationService.registerSuccesfulLoginForJwt(this.state.username,response.data.token)
                            this.props.navigate(`/welcome/${this.state.username}`)
                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error)
                            this.setState({ hasLoginSuccessful: false })
                            this.setState({ hasLoginFailed: true })
                        }
                    )
    }
}

export default LoginComponent;