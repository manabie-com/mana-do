import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '../../store/reducer';
import {
  setTodos as setTodoList,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoItem,
} from '../../store/actions';
import Service from '../../service';
import { Todo, TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import { getTodos, setTodos } from '../../utils/helpers';
import '../../stylesheets/ToDoPage.css';

type EnhanceTodoStatus = TodoStatus | TodoStatus.ALL;

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = React.useReducer(reducer, initialState);
  const [showing, setShowing] = React.useState<EnhanceTodoStatus>(TodoStatus.ALL);
  const [todoId, setTodoId] = React.useState('');
  const [curValue, setCurValue] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const inputUpdateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Handle click outside to discard the value that edited
    // Bind the event listener
    document.addEventListener("click", (e: MouseEvent) => handleClickOutside(e));
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("click", (e: MouseEvent) => handleClickOutside(e));
    };
  }, [inputUpdateRef]);

  useEffect(() => {
    // Persist todos after change
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [todos])

  useEffect(() => {
    // Handle set todos after refesh page
    const todos = getTodos();
    if (todos) {
      dispatch(setTodoList(todos));
    }
  }, [])

  let showTodos = todos.filter((todo: Todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        if (inputRef.current.value) {
          const resp = await Service.createTodo(inputRef.current.value);
          dispatch(createTodo(resp));
          setShowing(TodoStatus.ALL);
          inputRef.current.value = '';
        }
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/')
        }
      }
    }
  }

  const onUpdateTodo = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
    if (e.key === 'Enter' && inputUpdateRef.current) {
      if (inputUpdateRef.current.value) {
        dispatch(updateTodoItem(todoId, inputUpdateRef.current.value)); // Update todos
        setTodoId(''); // Remove current todo id
        inputUpdateRef.current.value = ''; // Set null for current input value
      }
    }
  }

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
    if (e.target.checked) {
      setShowing(TodoStatus.COMPLETED)
    } else {
      setShowing(TodoStatus.ALL)
    }
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  }

  const handleDbClick = (todoId: string, content: string) => {
    setTodoId(todoId);
    setCurValue(content);
  };

  const handleOnChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurValue(e.target.value);
  }

  const handleClickOutside = (e: any) => {
    if (inputUpdateRef.current && !inputUpdateRef.current.contains(e.target)) {
      setTodoId('')
    }
  }

  const activeTodos = todos.reduce(function (accum: number, todo: Todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>

      {todos && todos.length > 0
        ? (
          <>
            <div className="Todo__total">
              You have <strong>{todos.length}</strong> {todos.length > 1 ? 'things' : 'thing'} to do
            </div>
            
            <div className="ToDo__list">
              {
                showTodos.map((todo: Todo, index: React.Key|undefined) => (
                  <div key={index} className="ToDo__item">
                    <input
                      type="checkbox"
                      checked={isTodoCompleted(todo)}
                      onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                    />

                    { todoId === todo.id
                      ? (
                        <input
                          ref={inputUpdateRef}
                          value={curValue}
                          autoFocus
                          className='ToDo__input__edit'
                          onChange={handleOnChangeEdit}
                          onKeyDown={(e) => onUpdateTodo(e, todo.id)}
                        />
                      ) : (
                        <span onDoubleClick={() => handleDbClick(todo.id, todo.content)}>
                          <span>{todo.content}</span>
                          <span className={`ToDo__status ToDo__status__${todo.status?.toLowerCase()}`}>
                            {`(${todo.status})`}
                          </span>
                        </span>
                      )
                    }

                    <button
                      className="Todo__delete"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      X
                    </button>
                  </div>
                ))
              }
            </div>
          </>
        ) : <div className="ToDo__empty">Time to chill! You have nothing to do. :)</div>
      }

      <div className="Todo__toolbar">
        {showTodos.length > 0 ?
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          /> : <div/>
        }

        <div className="Todo__tabs">
          <button
            data-testid="btn-all"
            className={`Action__btn ${showing === TodoStatus.ALL ? 'Action__btn__active' : ''}`}
            onClick={()=>setShowing(TodoStatus.ALL)}
          >
            All
          </button>
          <button
            data-testid="btn-active"
            className={`Action__btn ${showing === TodoStatus.ACTIVE ? 'Action__btn__active' : ''}`}
            onClick={()=>setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            data-testid="btn-completed"
            className={`Action__btn ${showing === TodoStatus.COMPLETED ? 'Action__btn__active' : ''}`}
            onClick={()=>setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>

        <button
          data-testid="btn-clear"
          className="Action__btn"
          onClick={onDeleteAllTodo}
        >
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;