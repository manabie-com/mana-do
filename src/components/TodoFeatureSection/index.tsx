import * as React from "react";
import TodoTypeContainer from "./TodoTypeContainer";
import TodoCreationForm from "./TodoCreationForm";
import styles from "./TodoFeatureSection.module.css";
import { TodoContext } from "../../store/contexts/todoContext";
import { TodoStatus } from "../../models/todo";
import Service from "../../service";
import { setTodos } from "../../store/actions/todoActions";
import { UserContext } from "../../store/contexts/userContext";

export interface TodoFeatureSectionProps {}

const TodoFeatureSection: React.FunctionComponent<TodoFeatureSectionProps> = () => {
  const [{ todos }, dispatch] = React.useContext(TodoContext);
  const [{ user_id }] = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await Service.getTodos(user_id);

        if (response) {
          setLoading(false);
          dispatch(setTodos(response));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch, user_id]);

  return (
    <div className={`${styles.ManaDo__TodoFeature__Container}`}>
      <TodoCreationForm />
      <div className={`${styles.ManaDo__TodoTypes} mt-3`}>
        {!loading ? (
          <>
            <TodoTypeContainer
              todos={todos.filter((todo) => todo.status === TodoStatus.ACTIVE)}
              label="Active"
              actionKey={TodoStatus.ACTIVE}
              toggleText="Mark all as completed"
            />
            <TodoTypeContainer
              todos={todos.filter(
                (todo) => todo.status === TodoStatus.COMPLETED
              )}
              label="Completed"
              actionKey={TodoStatus.COMPLETED}
              toggleText="Mark all as active"
            />
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default React.memo(TodoFeatureSection);
