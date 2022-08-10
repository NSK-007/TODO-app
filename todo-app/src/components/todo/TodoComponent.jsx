import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import { Component } from "react";
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            // targetDate : moment(new Date()).format('YYYY-MM-DD')
            id : this.props.params.id,
            // description : 'retrieving the data...',
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate =  this.validate.bind(this);
    }

    onSubmit(values){
        // console.log(values);
        let username = AuthenticationService.getLoggedInUserName();
        let todo = {
            id : this.state.id,
            description : values.description,
            targetDate : values.targetDate
        }
        if(this.state.id===-1)
            TodoDataService.createTodo(username, todo).then(() => this.props.navigate('/todos'))
        else
            TodoDataService.updateTodo(username, this.state.id, todo).then(() => { this.props.navigate(`/todos`) })
    }

    validate(values){
        let errors={}
        if(!values.description)
            errors.description = "Enter a description"
        else if(values.description.length<5)
            errors.description = "Enter atleast 5 characters in description"

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Enter a valid date"
        }   

        return errors;
    }

   componentDidMount(){
    console.log(this.state.id)
        if(this.state.id==-(1)){
            return;
        }

        else{let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => {this.setState({targetDate:moment(response.data.targetDate).format('YYYY-MM-DD'), description:response.data.description})})
        .catch(error => console.log(error))    }
   }

    render(){
        let {description, targetDate} = this.state;
        return(
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{description, targetDate}}
                            onSubmit={this.onSubmit} 
                            validate={this.validate}
                            validateOnChange={true}
                            validateOnBlur={true}
                            enableReinitialize={true}>
                        {
                            (props) => (
                                <Form
                                    initialvalues ={{
                                        description : description,
                                        targetDate : targetDate
                                    }}
                                >
                                      <ErrorMessage className="alert alert-danger" name="description" component="div" />
                                      <ErrorMessage className="alert alert-danger" name="targetDate" component="div" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset><br/>

                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset><br/>

                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent;