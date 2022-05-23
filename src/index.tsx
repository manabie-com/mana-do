import React from 'react';
import ReactDOM from 'react-dom';
import ToDoPage from './components/Todo';
import * as serviceWorker from './serviceWorker';
import '../src/assets/styles/base.css';
import '../src/assets/styles/index.css';

ReactDOM.render(
  <main className="App">
  <ToDoPage />
</main>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
