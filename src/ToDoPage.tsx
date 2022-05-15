import React, {
  ChangeEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import reducer, { initialState } from './store/reducer';
import {
  setTodos,
  createTodo,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  updateTodoContent,
  updateAllStatus,
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import { DarkMode, LightMode } from './components/Themes';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [editMode, setEditMode] = useState(true);
  const [newTask, setNewTask] = useState<string>('');
  const [editTodoIdx, setEditTodoIdx] = useState<string>('');
  const [editError, setEditError] = useState<string>('');
  const [darkMode, setDarkMode] = useState(false);
  const inputRef = useRef<any>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };
  const handleEdit = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(event.target.value);
  };

  // useEffect(()=>{
  //     (async ()=>{
  //         const resp = await Service.getTodos();
  //         dispatch(setTodos(resp || []));
  //     })()
  // }, [])

  // Get todos at startup
  useEffect(() => {
    (async () => {
      const getTodosList = JSON.parse(localStorage.getItem('todos') || '');
      const getTheme = JSON.parse(localStorage.getItem('darkMode') || 'false');
      if (getTodosList) {
        dispatch(setTodos(getTodosList));
      } else {
        dispatch(setTodos([]));
      }
      if (getTheme) {
        setDarkMode(getTheme);
      }
    })();
  }, []);

  // Saving to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [todos, darkMode]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (task.length < 1) {
        setError('Please input something!');
        return false;
      }
      const resp = await Service.createTodo(task);
      dispatch(createTodo(resp));
      setTask('');
      setError('');
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (id: string): void => {
    dispatch(deleteTodo(id));
  };

  const toggleEditText = (id: string): void => {
    setEditTodoIdx(id);
    setEditMode(true);
  };

  const onToggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  const handleUpdateTodoContent = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      if (newTask.length < 1) {
        setEditError('Please input something!');
        return false;
      }
      dispatch(updateTodoContent(editTodoIdx, newTask));
      setEditError('');
      setNewTask('');
      setEditMode(false);
    }
    if (e.key === 'Escape') {
      setEditError('');
      setNewTask('');
      setEditMode(false);
    }
  };

  const handleClickActive = (): void => {
    dispatch(updateAllStatus(false));
  };

  const handleClickCompleted = (): void => {
    dispatch(updateAllStatus(true));
  };

  return (
    <div
      className='ToDo__container'
      style={
        darkMode
          ? { backgroundColor: DarkMode.backgroundColor }
          : { backgroundColor: LightMode.backgroundColor }
      }
    >
      <div className='Todo__creation' style={{ flexDirection: 'column' }}>
        <input
          ref={inputRef}
          className='Todo__input'
          placeholder='What need to be done?'
          value={task}
          onChange={handleChange}
          onKeyDown={onCreateTodo}
        />
        {/* Notify error when leaving blank on input */}
        {!!error && <small className='Error__text'>{error}</small>}
      </div>
      <div className='ToDo__list'>
        {todos.map((todo, index) => {
          return (
            <div key={index} className='ToDo__item'>
              <input
                type='checkbox'
                checked={todo.status === TodoStatus.ACTIVE ? false : true} // change condition for checked
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {/* Adding some style to content to distinguish ACTIVE/COMPLETED tasks */}
              {todo.id === editTodoIdx && editMode === true ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    marginLeft: '10px',
                    marginRight: '2rem',
                  }}
                >
                  <input
                    type='text'
                    className='Todo__input'
                    placeholder='What you want to change?'
                    value={newTask}
                    onChange={handleEdit}
                    onKeyDown={handleUpdateTodoContent}
                    autoFocus
                    style={{ width: '100%', flex: 1 }}
                    onBlur={() => {
                      setEditError('');
                      setNewTask('');
                      setEditMode(false);
                    }}
                  />
                  {!!editError && (
                    <small className='Error__text'>{editError}</small>
                  )}
                </div>
              ) : (
                <span
                  className='Todo__content'
                  style={
                    todo.status === TodoStatus.ACTIVE
                      ? darkMode
                        ? { color: DarkMode.text }
                        : {
                            color: LightMode.text,
                          }
                      : {
                          color: LightMode.text,
                          textDecoration: 'line-through',
                        }
                  }
                  onDoubleClick={() => toggleEditText(todo.id)}
                >
                  {todo.content}
                </span>
              )}
              <button
                className='Todo__delete'
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className='Todo__toolbar'>
        <>
          <button
            onClick={onToggleDarkMode}
            style={
              darkMode
                ? {
                    backgroundColor: '#FFF',
                    boxShadow: '3px 3px #CCC',
                    color: '#000',
                  }
                : { backgroundColor: '#000', boxShadow: '3px 3px #EEE' }
            }
          >
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </button>
        </>
        <div className='Todo__tabs'>
          <button className='Action__btn__active' onClick={handleClickActive}>
            All Active
          </button>
          <button
            className='Action__btn__completed'
            onClick={handleClickCompleted}
          >
            All Completed
          </button>
        </div>
        <button className='Action__btn__clear' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
