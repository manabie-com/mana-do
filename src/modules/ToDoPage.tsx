import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTodo, toggleAllTodos, deleteAllTodos } from './actions';
import { TodoStatus } from './../models/todo';
import { RootState } from '../store/type';
import { v4 as uuid } from 'uuid';
import { Todo } from '../models/todo';
import ToDoItem from './ToDoItem';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const { todos } = useSelector((state: RootState) => state.toDo);
  const dispatch = useDispatch();
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<any>(null);

  const handleCreateTodo = () => {
    const data = {
      id: uuid(),
      content: inputRef.current.value,
      status: TodoStatus.ACTIVE,
    };
    dispatch(createTodo(data));
    inputRef.current.value = '';
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateTodo();
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const renderToDoList: any = () => {
    let toDoFilter = todos;
    if (showing !== 'ALL') {
      const filterResult = todos.filter((todo: Todo) => {
        return todo.status === showing;
      });
      toDoFilter = filterResult;
    }
    return toDoFilter.map((todo: Todo) => {
      return <ToDoItem todo={todo} key={todo.id} />;
    });
  };

  return (
    <div className='ToDo__container'>
      <h1 className='Todo__title'>Todos list application</h1>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          type='text'
          name='todo'
          className='Todo__input'
          aria-label='todo-input'
          placeholder='What need to be done?'
          onKeyDown={onCreateTodo}
        />
        <button
          className='Todo__add btn-primary'
          name='addTodo'
          onClick={handleCreateTodo}
        >
          Add
        </button>
      </div>
      <div className='ToDo__list'>{renderToDoList()}</div>
      <div className='Todo__toolbar'>
        {todos.length > 0 ? (
          <input type='checkbox' onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className='Todo__tabs'>
          <button
            className={`Action__btn btn-default ${
              showing === 'ALL' ? 'active' : ''
            }`}
            onClick={() => setShowing('ALL')}
          >
            All
          </button>
          <button
            className={`Action__btn btn-default ${
              showing === TodoStatus.ACTIVE ? 'active' : ''
            }`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn btn-default ${
              showing === TodoStatus.COMPLETED ? 'active' : ''
            }`}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className='Action__btn btn-default' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
