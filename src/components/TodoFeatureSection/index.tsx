import * as React from "react";
import TodoTypeContainer from "./TodoTypeContainer";
import TodoCreationForm from "./TodoCreationForm";
import styles from "./TodoFeatureSection.module.css";
import { TodoContext } from "../../store/contexts/todoContext";
import { TodoStatus } from "../../models/todo";
import Service from "../../service";
import { setTodos } from "../../store/actions/todoActions";

export interface TodoFeatureSectionProps {}

const TodoFeatureSection: React.FunctionComponent<TodoFeatureSectionProps> = () => {
  const [{ todos }, dispatch] = React.useContext(TodoContext);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await Service.getTodos();

        if (response) {
          setLoading(false);
          dispatch(setTodos(response));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  return (
    <div className={`${styles.ManaDo__TodoFeature__Container}`}>
      <TodoCreationForm />
      <div className={`${styles.ManaDo__TodoTypes} mt-3`}>
        {!loading ? (
          <>
            <TodoTypeContainer
              todos={todos.filter((todo) => todo.status === TodoStatus.ACTIVE)}
              label="Active"
              actionKey="active"
              toggleText="Mark all as completed"
            />
            <TodoTypeContainer
              todos={todos.filter(
                (todo) => todo.status === TodoStatus.COMPLETED
              )}
              label="Completed"
              actionKey="completed"
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
