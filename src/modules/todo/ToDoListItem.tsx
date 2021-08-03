import React, { useState } from 'react';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import { deleteTodo, updateTodo, updateTodoStatus } from './store/actions';
import { useTodoContext } from './ToDoContext';

const ToDoListItem = (props: any) => {
  const {showing} = props;
  const { state: { todos }, dispatch } = useTodoContext();
  const [isEditingId, setIsEditingId] = useState<string>('');

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

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onDoubleClickTodoItem = (e: any, id: string) => {
    setIsEditingId(id);
  };

  const onUpdateTodo = async (e: any, id: string) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const value = e.target.value;
      dispatch(updateTodo(id, value));
      setIsEditingId('');
    }
  };

  const onBlurToCancelEditing = () => {
    setIsEditingId('');
  }

  return (
    <div className="ToDo__list">
      {
        showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {
                isEditingId !== todo.id &&
                <span onDoubleClick={(e) => onDoubleClickTodoItem(e, todo.id)}>{todo.content}</span>
              }
              {
                isEditingId === todo.id &&
                <input
                  autoFocus
                  className="Todo__input--active"
                  onKeyDown={(e) => onUpdateTodo(e, todo.id)}
                  onBlur={onBlurToCancelEditing}
                  defaultValue={todo.content}
                />
              }
              <button
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                X
              </button>
            </div>
          );
        })
      }
    </div>
  );
};

export default ToDoListItem;
