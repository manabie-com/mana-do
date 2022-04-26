import React, { useMemo, useState } from "react";
import { Todo, TodoStatus } from "../../models/todo";
interface TodoItemPropsInterface {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, content: string) => void;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => void;
}

function TodoItem(props: TodoItemPropsInterface) {
  const { todo, onDeleteTodo, onEditTodo, onUpdateTodoStatus } = props;
  const [todoInputValue, setTodoInputValue] = useState<string>(todo.content);
  const [isShowEditInput, setIsShowEditIput] = useState<boolean>(false);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoInputValue(event.target.value);
  }
  const currentContentValue = useMemo(() => {
    return todo.content;
  }, [todo]);

  const onEditContentTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!todoInputValue) return;
      onEditTodo(todo.id, todoInputValue);
      toggleShowInputToEdit();
    }
  };

  const toggleShowInputToEdit = () => {
    setIsShowEditIput(!isShowEditInput);
  };
  const handleBlur = () => {
    setTodoInputValue(currentContentValue);
    toggleShowInputToEdit();
  };
  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={TodoStatus.COMPLETED === todo.status}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      <>
        {isShowEditInput && (
          <input
            className="Todo__content__input"
            value={todoInputValue}
            onKeyDown={onEditContentTodo}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        )}
      </>
      <>
        {!isShowEditInput && (
          <span
            style={{ cursor: "pointer" }}
            onDoubleClick={toggleShowInputToEdit}
            className="Todo__content"
          >
            {todo.content}
          </span>
        )}
      </>

      <button className="Todo__delete" onClick={() => onDeleteTodo(todo.id)}>
        X
      </button>
    </div>
  );
}

export default TodoItem;
