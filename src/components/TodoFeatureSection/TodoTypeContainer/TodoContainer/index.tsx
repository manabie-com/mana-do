import * as React from "react";

import styles from "./TodoContainer.module.css";

import { Todo, TodoStatus } from "../../../../models/todo";
import Service from "../../../../service";
import { TodoContext } from "../../../../store/contexts/todoContext";
import {
  deleteTodo,
  updateTodoStatus,
} from "../../../../store/actions/todoActions";
import { formatDate } from "../../../../utils/dateFormatter";

import { ReactComponent as Check } from "../../../../svgs/check.svg";
import { ReactComponent as RemoveIcon } from "../../../../svgs/delete.svg";
import useConfirm from "../../../../_hooks/useConfirm/useConfirm";

export interface TodoContainerProps extends React.HTMLAttributes<HTMLElement> {
  data: Todo;
  type: TodoStatus.ACTIVE | TodoStatus.COMPLETED;
}

const TodoContainer: React.FunctionComponent<TodoContainerProps> = ({
  data,
  type,
  className,
  ...props
}) => {
  const { setConfirmConfig, closeConfirmModal, setLoadingState } = useConfirm();
  const [, dispatch] = React.useContext(TodoContext);

  const handleUpdateTodoStatus = React.useCallback(async () => {
    try {
      const response = await Service.updateTodoStatus(
        data.id,
        type === TodoStatus.ACTIVE ? true : false
      );
      dispatch(updateTodoStatus(data.id, response));
    } catch (error) {
      console.error(error);
    }
  }, [data.id, dispatch, type]);

  const handleRemoveTodo = React.useCallback(() => {
    setLoadingState(true);
    setTimeout(async () => {
      try {
        const response = await Service.removeTodo(data.id);
        if (response) {
          setLoadingState(false);
          dispatch(deleteTodo(response.id));
          closeConfirmModal();
        }
      } catch (error) {
        setLoadingState(false);
        console.error(error);
      }
    }, 1000);
  }, [closeConfirmModal, data.id, dispatch, setLoadingState]);

  const handleOpenRemoveTodoModal = React.useCallback(() => {
    // Use custom hook to set confirm modal props
    setConfirmConfig({
      title:
        data.status === TodoStatus.ACTIVE
          ? "Work is not completed yet"
          : "Remove confirmation",
      subLabel: "Confirm on remove todo",
      content: <p>Are you sure you want to remove selected todo?</p>,
      onConfirm: handleRemoveTodo,
      variant: "danger",
      primaryLabel: "I'm sure",
      primaryVariant: "danger-light",
    });
  }, [data.status, handleRemoveTodo, setConfirmConfig]);

  return (
    <div
      className={`${styles.ManaDo__Todo__Container} ${className || ""}`}
      {...props}
    >
      <div
        className={`${styles.ManaDo__TodoContent} ${
          data.status === TodoStatus.COMPLETED && styles.ManaDo__Completed
        }`}
      >
        <Check
          onClick={handleUpdateTodoStatus}
          className={`${styles.ManaDo__CompleteToggler} ${
            data.status === TodoStatus.COMPLETED && styles.ManaDo__Completed
          }`}
        />
        {data.content || ""}
      </div>
      <div className={`${styles.ManaDo__Todo__Footer} mt-1`}>
        <span
          className={`${
            data.status === TodoStatus.COMPLETED && styles.ManaDo__Completed
          }`}
        >
          {formatDate(data.created_date) || ""}
        </span>
        <div
          className={styles.ManaDo__Todo__RemoveWrapper}
          onClick={handleOpenRemoveTodoModal}
        >
          <RemoveIcon className={styles.ManaDo__Todo__Remove} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoContainer);
