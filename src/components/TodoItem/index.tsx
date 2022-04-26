import React, { useState, useMemo } from "react";
import { Todo, TodoStatus } from "../../models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";
interface TodoItemPropsInterface {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, content: string) => void;
}

function TodoItem(props: TodoItemPropsInterface) {
  const { todo, onDeleteTodo, onEditTodo } = props;
  // console.log("todo", todo);
  const [todoInputValue, setTodoInputValue] = useState<string>(todo.content);

  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [isShowEditInput, setIsShowEditIput] = useState<boolean>(false);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.value);
    setTodoInputValue(event.target.value);
  }
  const currentContentValue = useMemo(() => {
    return todo.content;
  }, [todo]);
  // const onDeleteTodo = (id: string) => {
  //   dispatch(deleteTodo(id));
  // };
  // const onUpdateTodoStatus = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   todoId: any
  // ) => {
  //   dispatch(updateTodoStatus(todoId, e.target.checked));
  // };
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
        checked={showing === todo.status}
        // onChange={(e) => onUpdateTodoStatus(e, todo.id)}
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
