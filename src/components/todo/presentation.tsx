/**
 * For applying presentation component pattern
 * Split UI process and logic process.
 */
import React from 'react';
import TodoItem from './subPresentations/todoItem';
import { Todo } from 'root/models/todo';

export type TodoProps = {
  inputRef: any,
  onCreateTodo: React.KeyboardEventHandler,
  showTodos: Array<Todo>,
  onUpdateTodoStatus: Function,
  deleteTodo: Function,
  todos: Array<Todo>,
  activeTodos: Number,
  onToggleAllTodo: React.ChangeEventHandler,
  handleShowingAll: React.MouseEventHandler,
  handleShowingActive: React.MouseEventHandler,
  handleShowingCompleted: React.MouseEventHandler,
  onDeleteAllTodo: React.MouseEventHandler,
}

const text = {
  /** help to concentrate all text, easy to edit text or apply multi-language feature */
  x: 'X',
  all: 'All',
  active: 'Active',
  completed: 'Completed',
  clearAllTodos: 'Clear all todos',
  whatNeedToBeDone: 'What need to be done?'
}


const TodoPresentation = (props: TodoProps) => {
  const {
    inputRef, onCreateTodo, showTodos
    , onUpdateTodoStatus, deleteTodo, todos
    , activeTodos, onToggleAllTodo
    , handleShowingAll, handleShowingActive
    , handleShowingCompleted, onDeleteAllTodo
  } = props

  return (
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          className='Todo__input'
          placeholder={text.whatNeedToBeDone}
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className='ToDo__list'>
        {
          showTodos.map((todo: Todo, index: number) => (
            <TodoItem key={`show-todo-item-${index}`}
              todo={todo}
              deleteItemText={text.x}
              deleteTodo={deleteTodo}
              onUpdateTodoStatus={onUpdateTodoStatus}
            />
          ))
        }
      </div>
      <div className='Todo__toolbar'>
        {todos.length > 0 ?
          <input
            type='checkbox'
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          /> : <div />
        }
        <div className='Todo__tabs'>
          <button className='Action__btn' onClick={handleShowingAll}>
            {text.all}
          </button>
          <button className='Action__btn' onClick={handleShowingActive}>
            {text.active}
          </button>
          <button className='Action__btn' onClick={handleShowingCompleted}>
            {text.completed}
          </button>
        </div>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          {text.clearAllTodos}
        </button>
      </div>
    </div>
  );
};

//use shallowly compare complex objects in the props object
export default React.memo(TodoPresentation)