import React, { useRef, useState } from "react";

interface ITodoItemProps {}

const TodoItem: React.FunctionComponent<any> = ({
  todo,
  isTodoCompleted,
  onUpdateTodoStatus,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [valueTodo, setValueTodo] = useState(() => {
    return todo.content;
  });
  const editRef = useRef() as any;
  const onEditTodo = () => {
    setIsEdit(true);
    editRef.current.focus();
  };
  const handleBlurEdit = () => {
    setIsEdit(false);
    setValueTodo(todo.content);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTodo(e.target.value);
  };
  const handleFinishEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todo: any
  ) => {
    if (e.key === "Enter" && editRef.current) {
      handleEditTodo && handleEditTodo(editRef.current.value, todo.id);
      editRef.current.blur();
    }
  };
  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      <input
        autoFocus
        ref={editRef}
        type="text"
        name="editTodo"
        value={valueTodo}
        onChange={handleOnChange}
        className={`ToDo__item--edit ${isEdit ? "ToDo__item--active" : ""}`}
        onBlur={handleBlurEdit}
        onKeyDown={(e) => handleFinishEdit(e, todo)}
      />
      <span
        onDoubleClick={onEditTodo}
        className={`${isEdit ? "ToDo__item--text" : ""}`}
      >
        {todo.content}
      </span>

      <button
        className="ToDo__delete"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        &#215;
      </button>
    </div>
  );
};

export default React.memo(TodoItem);
