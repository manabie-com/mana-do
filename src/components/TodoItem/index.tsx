import classnames from 'classnames';
import useOutSideClick from 'hooks/useOutSideClick';
import { Todo, TodoStatus } from 'models';
import React, { useLayoutEffect, useRef } from 'react';
import { formatDate, isTodoCompleted } from 'utils';
import './TodoItem.css';

export interface TodoItemProps {
  todo: Todo;
  editing: string;
  onUpdateTodoStatus(todoID: string,value:boolean): void;
  onDeleteTodo(todoID: string): void;
  onTodoDoubleClick(todoID: string): void;
  onToggleEditTodo():void
  onEditTodoContent(todoID:string,todoContent:string):void
}

export const TodoItem = ({
  todo,
  editing,
  onUpdateTodoStatus,
  onDeleteTodo,
  onTodoDoubleClick,
  onToggleEditTodo,
  onEditTodoContent
}: TodoItemProps) => {

  const editRef = useRef<HTMLInputElement>(null);
  const handleUpdateTodoStatus = (e:React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTodoStatus(todo.id,e.target.checked)
  }
  const handleEditTodo = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && editing === todo.id && editRef.current?.value) {
      onEditTodoContent(todo.id,editRef.current.value)
      onToggleEditTodo()
    }
  }
  // Sử dụng useLayoutEffect để xử lí callback trước khi render
  useLayoutEffect(() =>{
    if(editing === todo.id) {
      editRef.current!.value = todo.content
      editRef.current?.focus()
    }
  },[editing,todo.id,todo.content])

  useOutSideClick(editRef,onToggleEditTodo)

  if (editing !== todo.id)
    return (
      <div
        data-testid='todo-item'
        className={classnames('ToDo__item', {
          'ToDo__item--completed': todo.status === TodoStatus.COMPLETED,
        })}
      >
        <input
          type='checkbox'
          checked={isTodoCompleted(todo)}
          onChange={handleUpdateTodoStatus}
        />
        <span className='Todo__content' onDoubleClick={() => onTodoDoubleClick(todo.id)}>{todo.content}</span>
        <span className='Todo__date'>{formatDate(todo.created_date)}</span>
        <button data-testid='btn' className='Todo__delete' onClick={() => onDeleteTodo(todo.id)}></button>
      </div>
    );
  else return <input data-testid='todo-item--edit' ref={editRef} onKeyDown={handleEditTodo} className='ToDo__item ToDo__item--editing' type='text' />;
};
