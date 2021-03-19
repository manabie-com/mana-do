import * as React from "react";
import { Todo, TodoStatus } from "../../../models/todo";
import { TodoContext } from "../../../store/contexts/todoContext";
import TodoContainer from "./TodoContainer";
import styles from "./TodoTypeContainer.module.css";
import {
  toggleAllTodos,
  updateTodoContent,
} from "../../../store/actions/todoActions";
import Service from "../../../service";
import ManaDoModal from "../../ManaDoModal";
import { IFormGroupProps } from "../../FormGroup";

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
  ...props
}) => {
  const [, dispatch] = React.useContext(TodoContext);
  const [show, setShow] = React.useState(false);
  const [fieldData, setFieldData] = React.useState([] as IFormGroupProps[]);

  const handleToggleTodoStatus = React.useCallback(async () => {
    try {
      const response = await Service.updateAllTodoStatus(
        actionKey === TodoStatus.ACTIVE
      );

      dispatch(toggleAllTodos(response));
    } catch (error) {
      console.log(error);
    }
  }, [actionKey, dispatch]);

  const handleShowUpdateModal = React.useCallback(async (todoId) => {
    setShow(true);
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdateConfirm = React.useCallback(
    async (data) => {
      try {
        console.log(data);
        const todo = await Service.updateTodoContent(data.id, data.todoContent);
        dispatch(updateTodoContent(todo));
        setShow(false);
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  return (
    <>
      <div
        className={`${styles.ManaDo__TodoTypeContainer} ${
          props.className || ""
        }`}
      >
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
                data={todo}
                type={actionKey}
                className="mb-1"
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
