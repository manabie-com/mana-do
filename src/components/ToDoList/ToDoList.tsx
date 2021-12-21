import React, { memo } from 'react';
import { Todo } from '../../models/todo';
import { isTodoCompleted } from '../../utils';

export interface ToDoListProps {
  data: Todo[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  onDbClickTodo: (todo: Todo) => void;
  isEditing: { id: string | null; value: boolean };
  onEditTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEditEnd: () => void;
  onDeleteTodo: (todoId: string) => void;
}

function ToDoList({
  data,
  inputValue,
  setInputValue,
  onUpdateTodoStatus,
  onDbClickTodo,
  isEditing,
  onEditTodo,
  onEditEnd,
  onDeleteTodo,
}: ToDoListProps) {
  return (
    <div className="ToDo__list">
      {data.map((todo, index) => {
        return (
          // Not use index as key
          <div key={todo.id} className="ToDo__item">
            <input
              data-testid={`todo-checkbox-${index}`}
              type="checkbox"
              checked={isTodoCompleted(todo)}
              onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <div
              data-testid="todo-content"
              onDoubleClick={() => onDbClickTodo(todo)}
            >
              {isEditing.value && isEditing.id === todo.id ? (
                <input
                  data-testid="edit-input"
                  value={inputValue}
                  className="Todo__content--edit"
                  onKeyDown={onEditTodo}
                  onBlur={onEditEnd}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                />
              ) : (
                <span
                  data-testid={`todo-text-${index}`}
                  className={
                    isTodoCompleted(todo)
                      ? 'Todo__content--completed'
                      : undefined
                  }
                >
                  {todo.content}
                </span>
              )}
            </div>

            <button
              className="Todo__delete"
              onClick={() => onDeleteTodo(todo.id)}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default memo(ToDoList);
