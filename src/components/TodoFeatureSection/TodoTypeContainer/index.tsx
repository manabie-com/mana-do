import * as React from "react";
import { Todo } from "../../../models/todo";
import { TodoContext } from "../../../store/contexts/todoContext";
import TodoContainer from "./TodoContainer";
import styles from "./TodoTypeContainer.module.css";

const ACTIVE_KEY = "active";

export interface TodoTypeContainerProps
  extends React.HTMLAttributes<HTMLElement> {
  label: string;
  toggleText: string;
  actionKey: string;
  todos: Array<Todo>;
}

const TodoTypeContainer: React.FunctionComponent<TodoTypeContainerProps> = ({
  label = "",
  toggleText = "",
  actionKey = "",
  todos = [],
  ...props
}) => {
  return (
    <div
      className={`${styles.ManaDo__TodoTypeContainer} ${props.className || ""}`}
    >
      <div className={styles.ManaDo__TodoTypeHeader_Wrapper}>
        <h4 className={styles.ManaDo__TodoTypeHeader_TypeLabel}>{label}</h4>
        <span className={styles.ManaDo__TodoTypeHeader_MarkAllButton}>
          {toggleText}
        </span>
      </div>
      <div className={styles.ManaDo__Todos}>
        {(todos.length &&
          todos.map((todo) => <TodoContainer data={todo} className="mb-1"/>)) || (
          <div className={styles.ManaDo__Todos_Empty}>
            {actionKey === ACTIVE_KEY
              ? "Add new todo..."
              : "Complete a todo now"}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(TodoTypeContainer);
