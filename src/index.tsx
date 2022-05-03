import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Todo, TodoStatus } from './models/todo';
import shortid from "shortid";

const exampleTodosItem: Todo[] = [{
  content: 'To do from remote api',
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "firstUser",
}];

localStorage.setItem('todosFromApi', JSON.stringify(exampleTodosItem));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
