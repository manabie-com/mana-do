import React, { memo } from 'react';
import { ITodoItem } from '../../../models/todo';
import { isTodoCompleted } from '../../../utils';

const ToDoItem = ({
  editTodoIndex,
  todo,
  index,
  className,
  isShowEditInput,
  inputEditedTodoRef,
  handleDeleteTodo,
  onClickEditTodo,
  onUpdateTodoStatus,
  onKeyDownEdit,
  onMouseOutFocusEdit,
}: ITodoItem) => {
  return (
    <div
      key={index}
      className={className}
      onDoubleClick={() => onClickEditTodo(todo, index)}
    >
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      {isShowEditInput && index === editTodoIndex ? (
        <input
          ref={inputEditedTodoRef}
          type="text"
          style={{ width: '100%' }}
          onBlur={onMouseOutFocusEdit}
          defaultValue={todo.content}
          onKeyDown={(e) => onKeyDownEdit(todo.id, e)}
        />
      ) : (
        <span className="todo-item__content">{todo.content}</span>
      )}
      <span
        className="delete-icon"
        onClick={() => handleDeleteTodo(todo.id)}
      ></span>
    </div>
  );
};

export default memo(ToDoItem);
