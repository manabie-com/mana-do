import * as React from "react";
import Service from "../service";
import { AppActions, createTodo } from "../store/actions";

interface CreateTodoProps extends React.HTMLAttributes<HTMLDivElement> {
  dispatch: React.Dispatch<AppActions>;
}

export const CreateTodo = (props: CreateTodoProps) => {
  const { dispatch } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };
  return (
    <div className="Todo__creation">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};
