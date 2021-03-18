import * as React from "react";
import styles from "./TodoContainer.module.css";
import { ReactComponent as Check } from "../../../../svgs/check.svg";
import { ReactComponent as More } from "../../../../svgs/more.svg";
import MoreContainer from "./MoreContainer";
import { Todo, TodoStatus } from "../../../../models/todo";
import Service from "../../../../service";
import { TodoContext } from "../../../../store/contexts/todoContext";
import { deleteTodo } from "../../../../store/actions/todoActions";

export interface TodoContainerProps extends React.HTMLAttributes<HTMLElement> {
  data: Todo;
}

const TodoContainer: React.FunctionComponent<TodoContainerProps> = ({
  data,
  ...props
}) => {
  const [, dispatch] = React.useContext(TodoContext);
  const [showMore, setShowMoreState] = React.useState(false);
  const handleRemoveTodo = React.useCallback(async () => {
    // Handle remove todo
    try {
      const response = await Service.removeTodo(data.id);

      if (response) {
        dispatch(deleteTodo(response.id));
      }
    } catch (error) {
      console.log(error);
    }
  }, [data.id, dispatch]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // setShowMoreState(false);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.ManaDo__Todo__Container} ${props.className || ""}`}
    >
      <div
        className={`${styles.ManaDo__TodoContent} ${
          data.status === TodoStatus.COMPLETED && styles.ManaDo__Completed
        }`}
      >
        <Check
          className={`${styles.ManaDo__CompleteToggler} ${
            data.status === TodoStatus.COMPLETED && styles.ManaDo__Completed
          }`}
        />
        {data.content}
      </div>
      <div className={`${styles.ManaDo__Todo__Footer} mt-1`}>
        <span
          className={`${
            data.status === TodoStatus.COMPLETED && styles.ManaDo__Completed
          }`}
        >
          {data.created_date}
        </span>
        <div
          className={`${styles.ManaDo__Todo__ToolBar} ${
            showMore && styles.Focused
          }`}
          onClick={() => setShowMoreState((prev) => !prev)}
        >
          <More className={`${styles.ManaDo__Todo__ToolBar}`} />
          <MoreContainer
            show={showMore}
            items={[
              {
                label: "Remove",
                data: { id: data.id },
                onClick: handleRemoveTodo,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoContainer);
