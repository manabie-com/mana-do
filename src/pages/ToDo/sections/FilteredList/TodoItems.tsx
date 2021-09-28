import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Todo } from "../../../../models/todo";

const TodoItems = (props: {
  todo: Todo;
  onUpdateTodo: (todoId: string, newContent: string) => void;
}) => {
  const history = useHistory();
  const { todo } = props;
  const [todoContent, setTodoContent] = useState(todo.content);
  useEffect(() => {
    setTodoContent(todo.content);
  }, [todo]);

  const onChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(event.target.value);
  };

  const onSubmitTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContent = todoContent.trim();
    if (newContent.length) {
      try {
        props.onUpdateTodo(todo.id, newContent);
        setIsUpdating(false);
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const [isUpdating, setIsUpdating] = useState(false);
  return isUpdating ? (
    <form onSubmit={onSubmitTodo}>
      <input
        autoFocus={true}
        placeholder="Enter new content..."
        value={todoContent}
        onChange={onChangeTodo}
        onBlur={() => {
          setIsUpdating(false);
          setTodoContent(todo.content);
        }}
      />
    </form>
  ) : (
    <div onDoubleClick={() => setIsUpdating(true)}>
      <p>{todoContent}</p>
    </div>
  );
};

export default TodoItems;
