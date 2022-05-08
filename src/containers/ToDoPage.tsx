import { Checkbox } from "components/checkbox";
import { Input } from "components/input";
import { TodoItemList } from "components/todoItemList";
import { TodoTab } from "components/todoTab";
import { useStateReducer } from "hooks";
import { TodoStatus } from "models";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Service from "service";
import {
  createTodo,
  deleteAllTodos,
  toggleAllTodos,
} from "store/action-handlers";
import { isTodoActive, isTodoCompleted } from "utils";

export type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useStateReducer();
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  /** Event hanlders --- start */

  const onCreateTodo = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
      if (e.key === "Enter" && inputRef.current) {
        const { value } = inputRef.current;
        if (!value) {
          return;
        }
        try {
          const resp = await Service.createTodo(value);
          dispatch(createTodo(resp));
          inputRef.current.value = "";
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }
    },
    [dispatch]
  );

  const onToggleAllTodo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(toggleAllTodos(e.target.checked));
    },
    [dispatch]
  );

  const onDeleteAllTodo = useCallback(() => {
    dispatch(deleteAllTodos());
  }, [dispatch]);

  /** Event hanlders --- end */

  const todoTasks = useMemo(
    () =>
      todos.filter((todo) => {
        switch (showing) {
          case TodoStatus.ACTIVE:
            return isTodoActive(todo.status);
          case TodoStatus.COMPLETED:
            return isTodoCompleted(todo.status);
          default:
            return true;
        }
      }),
    [showing, todos]
  );

  return (
    <>
      <div className="ToDo__container">
        <div className="Todo__creation">
          <Input
            ref={inputRef}
            placeholder="What need to be done?"
            name="todo"
            onKeyDown={onCreateTodo}
          />
        </div>
        <TodoItemList todos={todoTasks} dispatch={dispatch} />
        <div className="Todo__toolbar">
          {todoTasks.length > 0 ? (
            <Checkbox onChange={onToggleAllTodo} />
          ) : (
            <div />
          )}
          <TodoTab
            selectedStatus={showing}
            onClickSelectStatus={setShowing}
            onDeleteAllTodo={onDeleteAllTodo}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ToDoPage;
