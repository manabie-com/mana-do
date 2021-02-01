import React from "react";
import { useImmer } from "use-immer";
import { Todo } from "../../../models/todo";
import { isTodoCompleted } from "../../../utils";
import Button from "../../Button";
import ErrorMessage from "../../ErrorMessage";
import Input from "../../Input";
import { isDuplicateContent } from "../../../utils/validate.utils";

interface ItemTodoProps {
  todo: Todo;
  listTodos: Todo[];
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  onUpdateTodo: (todoId: string, newContent: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

const ItemTodo: React.FC<ItemTodoProps> = (props) => {
  const { todo, listTodos } = props;
  const [state, setState] = useImmer({
    value: todo.content,
    readOnly: true,
    errorMessage: "",
  });

  const setStateCommon = (objects: any) => {
    Object.keys(objects).forEach((key) => {
      setState((draft: any) => {
        draft[key] = objects[key];
      });
    });
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdateTodoStatus(e, todo.id);
  };

  const onDoubleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setStateCommon({ readOnly: false });
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd;
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (state.errorMessage.length > 0) {
      setStateCommon({ errorMessage: "" });
    }

    setStateCommon({ readOnly: true, value: todo.content });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (state.errorMessage.length > 0) {
      setStateCommon({ errorMessage: "" });
    }

    if (e.key === "Enter" && !state.readOnly) {
      const valueInput = e.currentTarget.value.trim();

      if (valueInput.length !== 0) {
        if (isDuplicateContent(valueInput, listTodos)) {
          setStateCommon({ errorMessage: "Name todo not be duplicate." });
        } else {
          props.onUpdateTodo(todo.id, valueInput);
          setStateCommon({ readOnly: true });
        }
      } else {
        setStateCommon({ errorMessage: "Name todo not be empty." });
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStateCommon({ value });
  };

  const onDeleteTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onDeleteTodo(todo.id);
  };

  return (
    <div className="Todo__WrapperItem">
      <div className="ToDo__item">
        <Input
          type="checkbox"
          valueWidth="20px"
          name={`${todo.id}`}
          checked={isTodoCompleted(todo)}
          value={todo.id}
          onChange={onUpdateTodoStatus}
        />
        <Input
          autoComplete="off"
          type="text"
          name={`${todo.id}`}
          checked={isTodoCompleted(todo)}
          onDoubleClick={onDoubleClick}
          onBlur={onBlur}
          readOnly={state.readOnly}
          value={state.value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="Input__TodoItem"
        />

        <Button
          className="Todo__delete"
          onClick={onDeleteTodo}
          name={todo.id}
          label="X"
        />
      </div>
      <ErrorMessage
        message={state.errorMessage}
        className="Todo__ErrorMessage"
      />
    </div>
  );
};

export default ItemTodo;
