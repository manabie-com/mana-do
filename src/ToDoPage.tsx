import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
  createTodo,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import { setTodosToStorage } from './store/storage';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(() => {
      setTodosToStorage(todos);
    }, [todos]);

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (inputRef.current.value.trim() === '') {
          return;
      }

      onCreateTodo();

      inputRef.current.value = '';
      setShowing('ALL');
    };

    const onCreateTodo = async () => {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    };

    const onUpdateTodoStatus = (
      e: React.ChangeEvent<HTMLInputElement>,
      todoId: string
    ) => {
      dispatch(updateTodoStatus(todoId, e.target.checked));
    };

    const onDeleteTodo = (id: string) => {
      dispatch(deleteTodo(id));
    };

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    return (
        <form className="ToDo__container" onSubmit={handleFormSubmit}>
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What needs to be done?"
                />
            </div>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) => {
                        return (
                          (todo.status === showing || showing === 'ALL') && (
                            <div key={index} className="ToDo__item">
                              <input
                                type="checkbox"
                                checked={todo.status === TodoStatus.COMPLETED}
                                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                              />
                              <span>
                                {todo.status === TodoStatus.COMPLETED ? (
                                  <del>{todo.content}</del>
                                ) : (
                                  <span>{todo.content}</span>
                                )}
                              </span>
                              <button
                                type="button"
                                className="Todo__delete"
                                onClick={() => {
                                  onDeleteTodo(todo.id);
                                }}
                              >
                                &times;
                              </button>
                            </div>
                          )
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                <div className="Todo__tabs">
                    <button type="button" className="Action__btn" onClick={() => setShowing('ALL')}>
                        All
                    </button>
                    <button type="button" className="Action__btn" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button type="button" className="Action__btn" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button type="button" className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </form>
    );
};

export default ToDoPage;
