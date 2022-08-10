import './Counter.css'
import { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component{
    constructor(){
        super();
        this.state = {
            counter : 0
        }
        // this.increment = this.increment.bind(this);
    }

    render(){
        return(
            <div>
                <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <span className='count' style={{color:'red'}}>{this.state.counter}</span><br/>
                <div><button className="reset" onClick={this.reset}>RESET</button></div>
            </div>
        )
    }

    increment = (by)=>{
        this.setState(
           (x) => {
              return {counter : x.counter + by};
           }
        )
        // console.log("increment");
    }    

    decrement = (by) => {
        this.setState(
            (x) => {
                return {counter : x.counter-by};
            }
        )
    }

    reset = () => {
        this.setState(
            () => {
                return {counter: 0};
            }
        )
    }
}


class CounterButton extends Component{

    constructor(){
        super();
        this.state = {
            counter : 0
        }
        // this.increment = this.increment.bind(this);
    }

    render(){
        return(
            <div className="counterComponent">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button><br/>
                {/* <span className='count' style={{color:'red'}}>{this.state.counter}</span> */}
            </div>
        )
    }

    increment = ()=>{
        this.setState(
            (prevState) => {
                return {counter : prevState.counter+this.props.by}
            }
        )
        this.props.incrementMethod(this.props.by);
        // console.log("increment");
    }    

    decrement = () => {
        this.setState(
           (prevState) => {
                return {counter : prevState-this.props.by}
           }
        )
        this.props.decrementMethod(this.props.by);
    }
}
CounterButton.defaultProps = {
    by : 1
}
CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter