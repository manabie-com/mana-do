import ToDoItem from './todo-item/ToDoItem';
import {Todo, TodoStatus} from '../../../models/todo';
import React, {useState} from 'react';
import {isTodoCompleted} from '../../../utils';
import {MButton} from '../../commons';

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface ToDoPageViewProps {
  inputRef: React.RefObject<HTMLInputElement>,
  todos: Array<Todo>,
  onCreateTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void,
  onUpdateTodoContent: (content: string, todoId: string) => void,
  onDeleteTodo: (todoId: string) => void,
  onDeleteAllTodo: () => void,
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void
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
          showTodos.map((todo, index) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              updateTodoStatus={(e:React.ChangeEvent<HTMLInputElement>) => onUpdateTodoStatus(e, todo.id)}
              updateTodoContent={(content : string) => onUpdateTodoContent(content, todo.id)}
              deleteTodo={(todoId) => onDeleteTodo(todoId)}/>
          ))
        }
      </div>
      <div className='Todo__toolbar'>
        {todos.length > 0 ?
          <input
            type='checkbox'
            checked={activeTodos === 0}
            onChange={(e) => onToggleAllTodo(e)}
          /> : <div/>
        }
        <div className='Todo__tabs'>
          <MButton
            btnExtraClassName={showing === 'ALL' ? 'active' : ''}
            onClickAction={()=>setShowing('ALL')}
          >
            All
          </MButton>
          <MButton
            btnExtraClassName={showing === TodoStatus.ACTIVE ? 'active' : ''}
            onClickAction={()=>setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </MButton>
          <MButton
            btnExtraClassName={showing === TodoStatus.COMPLETED ? 'active' : ''}
            onClickAction={()=>setShowing(TodoStatus.COMPLETED)}
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
