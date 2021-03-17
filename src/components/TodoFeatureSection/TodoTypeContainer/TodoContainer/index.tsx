import * as React from "react";
import styles from "./TodoContainer.module.css";
import { ReactComponent as Check } from "../../../../svgs/check.svg";
import { ReactComponent as More } from "../../../../svgs/more.svg";
import MoreContainer from "./MoreContainer";
import { Todo } from "../../../../models/todo";

export interface TodoContainerProps extends React.HTMLAttributes<HTMLElement> {
  data: Todo;
}

const TodoContainer: React.FunctionComponent<TodoContainerProps> = ({
  data = {},
}) => {
  const [showMore, setShowMoreState] = React.useState(false);
  const handleRemoveTodo = React.useCallback(() => {
    // Handle remove todo
  }, []);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      setShowMoreState(false);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.ManaDo__Todo__Container}>
      <div className={styles.ManaDo__TodoContent}>
        <Check className={`${styles.ManaDo__CompleteToggler}`} />
        {data.content}
      </div>
      <div className={`${styles.ManaDo__Todo__Footer} mt-1`}>
        <span>{data.created_date}</span>
        <div
          className={`${styles.ManaDo__Todo__ToolBar} ${
            showMore && styles.Focused
          }`}
          onClick={() => setShowMoreState((prev) => !prev)}
        >
          <More className={`${styles.ManaDo__Todo__ToolBar}`} />
        </div>
        <MoreContainer
          show={showMore}
          items={[{ label: "Remove todo", onClick: handleRemoveTodo }]}
        />
      </div>
    </div>
  );
};

export default React.memo(TodoContainer);
