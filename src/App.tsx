import React, {useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';
import {createTodo, deleteAllTodos, deleteTodo, toggleAllTodos, updateTodoStatus} from './store/actions';
import './App.css';

type EnhanceTodoStatus = TodoStatus | 'ALL';

function App() {
  const [{todos}, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      dispatch(createTodo(inputRef.current.value));
      inputRef.current.value = '';
    }
  }

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  }

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <main className="App">
      <div className="ToDo__container">
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        <div className="ToDo__list">
          {
            showTodos.map((todo, index) => {
              return (
                <div key={index} className="ToDo__item">
                  <input
                    type="checkbox"
                    checked={isTodoCompleted(todo)}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  />
                  <span>{todo.content}</span>
                  <button
                    className="Todo__delete"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    X
                  </button>
                </div>
              );
            })
          }
        </div>
        <div className="Todo__toolbar">
          {todos.length > 0 ?
            <input
              type="checkbox"
              checked={activeTodos === 0}
              onChange={onToggleAllTodo}
            /> : <div/>
          }
          <div className="Todo__tabs">
            <button className="Action__btn" onClick={()=>setShowing('ALL')}>
              All
            </button>
            <button className="Action__btn" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
              Active
            </button>
            <button className="Action__btn" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
              Completed
            </button>
          </div>
          <button className="Action__btn" onClick={onDeleteAllTodo}>
            Clear all todos
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
