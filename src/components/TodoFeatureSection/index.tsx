import * as React from "react";

import styles from "./TodoFeatureSection.module.css";
import { TodoContext } from "../../store/contexts/todoContext";
import { TodoStatus } from "../../models/todo";
import Service from "../../service";
import { setTodos } from "../../store/actions/todoActions";
import { UserContext } from "../../store/contexts/userContext";

import TodoTypeContainer from "./TodoTypeContainer";
import TodoCreationForm from "./TodoCreationForm";
import SkeletonTodoTypes from "../SkeletonTodoTypes";

export interface TodoFeatureSectionProps {}

const TodoFeatureSection: React.FunctionComponent<TodoFeatureSectionProps> = () => {
  const [{ todos }, dispatch] = React.useContext(TodoContext);
  const [{ user_id }] = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await Service.getTodos(user_id);
        setTimeout(() => {
          // Wait 1s for todos response
          if (response) {
            setLoading(false);
            dispatch(setTodos(response));
          }
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch, user_id]);

  return (
    <div className={styles.ManaDo__TodoFeature__Container}>
      <TodoCreationForm />
      <div className={`${styles.ManaDo__TodoTypes} mt-3`}>
        {!loading ? (
          <>
            {/* Active type column */}
            <TodoTypeContainer
              label="Active"
              todos={todos.filter((todo) => todo.status === TodoStatus.ACTIVE)}
              actionKey={TodoStatus.ACTIVE}
              toggleText="Mark all as completed"
            />

            {/* Completed type column */}
            <TodoTypeContainer
              label="Completed"
              todos={todos.filter(
                (todo) => todo.status === TodoStatus.COMPLETED
              )}
              actionKey={TodoStatus.COMPLETED}
              toggleText="Mark all as active"
            />
          </>
        ) : (
          <SkeletonTodoTypes />
        )}
      </div>
    </div>
  );
};

export default React.memo(TodoFeatureSection);
