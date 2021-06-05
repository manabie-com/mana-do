import React, { useState } from 'react';
import ToDoItem from './todo-item/ToDoItem';
import { Todo, TodoStatus } from '../../../models/todo';
import { isTodoCompleted } from '../../../utils';
import { MButton , MCheckbox} from '../../commons';

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface ToDoPageViewProps {
  inputRef: React.RefObject<HTMLInputElement>,
  todos: Array<Todo>,
  onCreateTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  onUpdateTodoStatus: (checked: boolean, todoId: string) => void,
  onUpdateTodoContent: (content: string, todoId: string) => void,
  onDeleteTodo: (todoId: string) => void,
  onDeleteAllTodo: () => void,
  onToggleAllTodo: (checked: boolean) => void
}

const ToDoPageView = ({
  inputRef,
  todos,
  onCreateTodo,
  onUpdateTodoStatus,
  onUpdateTodoContent,
  onDeleteTodo,
  onDeleteAllTodo,
  onToggleAllTodo
}: ToDoPageViewProps) => {
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

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
    <div className='Todo__container'>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          className='Todo__input'
          placeholder='What need to be done?'
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className='Todo__list'>
        {
          showTodos.map(todo => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              updateTodoStatus={onUpdateTodoStatus}
              updateTodoContent={onUpdateTodoContent}
              deleteTodo={onDeleteTodo}/>
          ))
        }
      </div>
      <div className='Todo__toolbar'>
        {todos.length > 0
          ? <MCheckbox checked={activeTodos === 0} onChange={onToggleAllTodo}/>
          : <div/>
        }
        <div className='Todo__tabs'>
          <MButton
            className={showing === 'ALL' ? 'active' : ''}
            onClickAction={() => setShowing('ALL')}
          >
            All
          </MButton>
          <MButton
            className={showing === TodoStatus.ACTIVE ? 'active' : ''}
            onClickAction={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </MButton>
          <MButton
            className={showing === TodoStatus.COMPLETED ? 'active' : ''}
            onClickAction={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </MButton>
        </div>
        <MButton
          onClickAction={onDeleteAllTodo}
        >
          Clear all todos
        </MButton>
      </div>
    </div>
  )
}

export default ToDoPageView;
