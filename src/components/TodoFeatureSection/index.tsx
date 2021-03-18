import * as React from "react";
import TodoTypeContainer from "./TodoTypeContainer";
import TodoCreationForm from "./TodoCreationForm";
import styles from "./TodoFeatureSection.module.css";
import { TodoContext } from "../../store/contexts/todoContext";
import { TodoStatus } from "../../models/todo";

export interface TodoFeatureSectionProps {}

const TodoFeatureSection: React.FunctionComponent<TodoFeatureSectionProps> = () => {
  const [{ todos }] = React.useContext(TodoContext);

  return (
    <div className={`${styles.ManaDo__TodoFeature__Container}`}>
      <TodoCreationForm />
      <div className={`${styles.ManaDo__TodoTypes} mt-3`}>
        <TodoTypeContainer
          todos={todos.filter((todo) => todo.status === TodoStatus.ACTIVE)}
          label="Active"
          actionKey="active"
          toggleText="Mark all as completed"
        />
        <TodoTypeContainer
          todos={todos.filter((todo) => todo.status === TodoStatus.COMPLETED)}
          label="Completed"
          actionKey="completed"
          toggleText="Mark all as active"
        />
      </div>
    </div>
  );
};

export default React.memo(TodoFeatureSection);
