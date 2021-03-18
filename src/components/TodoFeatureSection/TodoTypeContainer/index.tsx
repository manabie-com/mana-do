import * as React from "react";
import { Todo, TodoStatus } from "../../../models/todo";
import { TodoContext } from "../../../store/contexts/todoContext";
import TodoContainer from "./TodoContainer";
import styles from "./TodoTypeContainer.module.css";
import { toggleAllTodos } from "../../../store/actions/todoActions";
import Service from "../../../service";

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

  const handleToggleTodoStatus = React.useCallback(async () => {
    try {
      const response = await Service.updateTodosStatus(
        actionKey === TodoStatus.ACTIVE
      );

      dispatch(toggleAllTodos(response));
    } catch (error) {
      console.log(error);
    }
  }, [actionKey, dispatch]);

  return (
    <div
      className={`${styles.ManaDo__TodoTypeContainer} ${props.className || ""}`}
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
  );
};

export default React.memo(TodoTypeContainer);
