/**
 * For applying presentation component pattern
 * Split UI process and logic process.
 */
import React from 'react';
import TodoItem from './subPresentations/todoItem';
import { Todo, TodoStatus, TodoStatusExtend } from 'root/models/todo';

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
  onUpdateTodoContent: Function,
  showing: string,
  text?: any
}

const defaultText = {
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
    inputRef, onCreateTodo, showTodos, showing, text = defaultText
    , onUpdateTodoStatus, deleteTodo, todos
    , activeTodos, onToggleAllTodo, onUpdateTodoContent
    , handleShowingAll, handleShowingActive
    , handleShowingCompleted, onDeleteAllTodo
  } = props

  return (
    <div data-testid={'todo-wrapper'} className='ToDo__Wrapper'>
      <div className='ToDo__container'>
        <div className='Todo__creation'>
          <input
            ref={inputRef}
            data-testid={'todo-input'}
            className='Todo__input'
            placeholder={text.whatNeedToBeDone}
            onKeyDown={onCreateTodo}
          />
        </div>
        <div className='ToDo__list'>
          {
            showTodos.map((todo: Todo) => (
              <TodoItem key={`show-todo-item-${todo.id}`}
                todo={todo}
                deleteItemText={text.x}
                deleteTodo={deleteTodo}
                onUpdateTodoStatus={onUpdateTodoStatus}
                onUpdateTodoContent={onUpdateTodoContent}
              />
            ))
          }
        </div>
        <div className='Todo__toolbar'>
          {todos.length > 0 ?
            <input
              data-testid={'checkbox-toggle-all-todo'}
              type='checkbox'
              checked={activeTodos === 0}
              onChange={onToggleAllTodo}
            /> : <div />
          }
          <div className='Todo__tabs'>
            <button data-testid='btn-showing-all' className={`Action__btn ${showing === TodoStatusExtend.ALL && 'active'}`} onClick={handleShowingAll}>
              {text.all}
            </button>
            <button data-testid='btn-showing-active' className={`Action__btn ${showing === TodoStatus.ACTIVE && 'active'}`} onClick={handleShowingActive}>
              {text.active}
            </button>
            <button data-testid='btn-showing-completed' className={`Action__btn ${showing === TodoStatus.COMPLETED && 'active'}`} onClick={handleShowingCompleted}>
              {text.completed}
            </button>
          </div>
          <button data-testid='btn-delete-all-todo' className='Action__btn' onClick={onDeleteAllTodo}>
            {text.clearAllTodos}
          </button>
        </div>
      </div>
    </div>
  );
};

//use shallowly compare complex objects in the props object
export default React.memo(TodoPresentation)