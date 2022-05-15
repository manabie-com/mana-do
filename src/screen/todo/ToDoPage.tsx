import React, { useEffect, useRef, useState } from 'react';

import { Todo, TodoStatus } from '../../models/todo';
import { useAppDispatch, useAppselector } from '../../store';
import { isTodoActive, isTodoCompleted } from '../../utils';

import { actions, selectors } from './duck';
import TodoItem from './TodoItem';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const TodoPage = () => {
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppselector(selectors.selectTodo);

  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    dispatch(actions.getTodos());
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef?.current?.value !== '') {
      dispatch(actions.createTodo(inputRef.current.value));
      inputRef.current.value = '';
    }
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(actions.updateTodoStatus({ todoId, checked: e.target.checked }));
  };

  const onUpdateTodoContent = (content: string, todoId: string) => {
    dispatch(actions.onUpdateTodoContent({ content, todoId }));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(actions.deleteAllTodos());
  };
  const onDeleteTodo = (todoId: string) => {
    dispatch(actions.deleteTodo(todoId));
  };

  const handleTodoFilter = (todoItem: Todo) => {
    if (showing === 'ALL') return true;
    if (showing === TodoStatus.ACTIVE) return isTodoActive(todoItem);
    if (showing === TodoStatus.COMPLETED) return isTodoCompleted(todoItem);
  };

  return (
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          className='Todo__input'
          placeholder='What need to be done?'
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className='ToDo__list'>
        {todos.filter(handleTodoFilter).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodoContent={onUpdateTodoContent}
          />
        ))}
      </div>
      <div className='Todo__toolbar'>
        {todos.length > 0 ? <input type='checkbox' onChange={onToggleAllTodo} /> : <div />}
        <div className='Todo__tabs'>
          <button className='Action__btn' onClick={() => setShowing('ALL')}>
            All
          </button>
          <button className='Action__btn' onClick={() => setShowing(TodoStatus.ACTIVE)}>
            Active
          </button>
          <button className='Action__btn' onClick={() => setShowing(TodoStatus.COMPLETED)}>
            Completed
          </button>
        </div>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default TodoPage;
