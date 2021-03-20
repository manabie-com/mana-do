import * as React from "react";

import styles from "./TodoTypeContainer.module.css";

import { Todo, TodoStatus } from "../../../models/todo";
import { UserContext } from "../../../store/contexts/userContext";
import { TodoContext } from "../../../store/contexts/todoContext";
import Service from "../../../service";
import {
  toggleAllTodos,
  updateTodoContent,
} from "../../../store/actions/todoActions";
import { IFormGroupProps } from "../../FormGroup";

import ManaDoModal from "../../ManaDoModal";
import TodoContainer from "./TodoContainer";

export interface TodoTypeContainerProps
  extends React.HTMLAttributes<HTMLElement> {
  label: string;
  toggleText: string;
  actionKey: TodoStatus.ACTIVE | TodoStatus.COMPLETED;
  todos: Array<Todo>;
}

const TodoTypeContainer: React.FunctionComponent<TodoTypeContainerProps> = ({
  label,
  toggleText,
  actionKey,
  todos = [],
  className,
  ...props
}) => {
  const [{ user_id }] = React.useContext(UserContext);
  const [, dispatch] = React.useContext(TodoContext);
  const [show, setShow] = React.useState(false);
  const [fieldData, setFieldData] = React.useState([] as IFormGroupProps[]);
  const [isUpdateLoading, setIsUpdateLoadingState] = React.useState(false);

  const handleToggleTodoStatus = React.useCallback(async () => {
    try {
      const response = await Service.updateAllTodoStatus(
        actionKey === TodoStatus.ACTIVE,
        user_id
      );

      dispatch(toggleAllTodos(response));
    } catch (error) {
      console.error(error);
    }
  }, [actionKey, dispatch, user_id]);

  const handleShowUpdateModal = React.useCallback(async (todoId) => {
    try {
      const todo = await Service.getTodo(todoId);
      setFieldData([
        {
          id: todo.id,
          name: "todoContent",
          type: "text",
          placeholder: "How do you want to change this?",
          required: true,
          defaultValue: todo.content,
        },
      ]);
      setShow(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleUpdateConfirm = React.useCallback(
    (data) => {
      if (data.todoContent.trim()) {
        setIsUpdateLoadingState(true);
        setTimeout(async () => {
          try {
            const todo = await Service.updateTodoContent(
              data.id,
              data.todoContent
            );
            dispatch(updateTodoContent(todo));
            setIsUpdateLoadingState(false);
            setShow(false);
          } catch (error) {
            console.error(error);
            setIsUpdateLoadingState(false);
          }
        }, 2000);
      } else setShow(false);
    },
    [dispatch]
  );

  return (
    <>
      <div className={`${styles.ManaDo__TodoTypeContainer} ${className || ""}`}>
        <div className={styles.ManaDo__TodoTypeHeader_Wrapper}>
          <h4 className={styles.ManaDo__TodoTypeHeader_TypeLabel}>{label}</h4>
          <span
            className={styles.ManaDo__TodoTypeHeader_MarkAllButton}
            onClick={handleToggleTodoStatus}
          >
            {toggleText}
          </span>
        </div>
        <div className={styles.ManaDo__Todos}>
          {(todos.length &&
            todos.map((todo) => (
              <TodoContainer
                key={todo.id}
                className="mb-1"
                data={todo}
                type={actionKey}
                onDoubleClick={() => handleShowUpdateModal(todo.id)}
              />
            ))) || (
            <div className={styles.ManaDo__Todos_Empty}>
              {actionKey === TodoStatus.ACTIVE
                ? "Start by add new todo"
                : "Completed todos are shown here"}
            </div>
          )}
        </div>
      </div>
      <ManaDoModal
        isLoading={isUpdateLoading}
        fields={fieldData}
        show={show}
        onClickOutside={() => setShow(false)}
        onConfirm={handleUpdateConfirm}
        onClose={() => setShow(false)}
      />
    </>
  );
};

export default React.memo(TodoTypeContainer);
