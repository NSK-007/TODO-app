// import logo from './logo.svg';
import './App.css';
import './bootstrap.css'
import TodoApp from './components/todo/TodoApp';
// import React, { Component } from 'react';
// import FirstComponent, {SecondComponent} from './components/learning-examples/FirstComponent';
// import ThirdComponent from './components/learning-examples/ThirdComponent';
// import Counter from './components/counter/Counter';

function App() {
  return (
    <div className="App">
        {/*<Counter/>*/}
        <TodoApp/>
    </div>
  );
}

// class LearningComponent extends Component{
//   render(){
//     return(
//       <div className='learningComponent'>
//             <FirstComponent/>
//             <SecondComponent/>
//             <ThirdComponent />
//       </div>
//     )
//   }
// }

export default App;
