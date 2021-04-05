import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* Utils */
import { isTodoCompleted } from "src/utils";

/* Models */
import { Todo, TodoStatus } from "src/models/todo";

/* Components */
import Input from "src/common/Input/Input";
import Button from "src/common/Button/Button";

type Props = {
  todo: Todo;
  handleUpdateTodo: (todo: Todo) => Promise<void>;
  clearErrorUpdate: () => void;
  errorUpdate: boolean;
  messageUpdate: string;
  handleDeleteTodo: (id: string) => Promise<void>;
};

const ToDoPage = ({
  todo,
  handleUpdateTodo,
  clearErrorUpdate,
  errorUpdate,
  messageUpdate,
  handleDeleteTodo
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

    handleUpdateTodo({ ...todo, status })
  };

  const onUpdateTodoValue = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && inputRef.current) {
      const content = inputRef.current.value;

      handleUpdateTodo({ ...todo, content });
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  };

  const clearWhitespace = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrorUpdate();
    e.currentTarget.value = e.currentTarget.value.replace(/^\s+$/, "");
  };

  const handleDelete = useCallback(() => {
    handleDeleteTodo(todo.id)
  }, [handleDeleteTodo, todo]);


  const handleOutFocus = () => {
    clearErrorUpdate();
    setIsEdit(false);
  };

  return (
    <div className="todo__item">
      {isEdit ? (
        <Input
          ref={inputRef}
          className="todo__input"
          type="text"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            onUpdateTodoValue(e)
          }
          onChange={clearWhitespace}
          onBlur={handleOutFocus}
          defaultValue={todo.content}
          error={errorUpdate}
          messageError={messageUpdate}
        />
      ) : (
        <span
          className={todo.status?.toLocaleLowerCase()}
          onClick={() => {
            setIsEdit(true);
          }}
        >
          {todo.content}
        </span>
      )}
      <Input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onUpdateTodoStatus(e)
        }
      />
      <Button type="del" onClick={handleDelete}>
        &#10539;
      </Button>
    </div>
  );
};

export default React.memo(ToDoPage);
