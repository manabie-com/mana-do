import * as React from "react";

import styles from "./TodoTypeContainer.module.css";

import { Todo, TodoStatus } from "../../../models/todo";
import { UserContext } from "../../../store/contexts/userContext";
import { TodoContext } from "../../../store/contexts/todoContext";
import Service from "../../../service";
import {
  toggleAllTodos,
  triggerRefresh,
  updateTodoContent,
} from "../../../store/actions/todoActions";
import { IFormGroupProps } from "../../FormGroup";
import { ReactComponent as More } from "../../../svgs/more.svg";

import ManaDoModal from "../../ManaDoModal";
import TodoContainer from "./TodoContainer";
import MoreContainer from "../../MoreContainer";
import useConfirm from "../../../_hooks/useConfirm/useConfirm";

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
  className,
  ...props
}) => {
  const [{ user_id }] = React.useContext(UserContext);
  const [, dispatch] = React.useContext(TodoContext);
  const { setConfirmConfig, closeConfirmModal, setLoadingState } = useConfirm();
  const [show, setShow] = React.useState(false);
  const [showMore, setShowMoreFlg] = React.useState(false);
  const [fieldData, setFieldData] = React.useState([] as IFormGroupProps[]);
  const [isUpdateLoading, setIsUpdateLoadingState] = React.useState(false);

  const handleToggleTodoStatus = React.useCallback(async () => {
    try {
      const response = await Service.updateAllTodoStatus(
        actionKey === TodoStatus.ACTIVE,
        user_id
      );

      dispatch(toggleAllTodos(response));
      setShowMoreFlg(false);
    } catch (error) {
      console.error(error);
    }
  }, [actionKey, dispatch, user_id]);

  const handleShowUpdateModal = React.useCallback(async (todoId) => {
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
      setShow(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleUpdateConfirm = React.useCallback(
    (data) => {
      if (data?.todoContent?.trim()) {
        setIsUpdateLoadingState(true);
        setTimeout(async () => {
          try {
            const todo = await Service.updateTodoContent(
              data.id,
              data.todoContent
            );
            dispatch(updateTodoContent(todo));
            setIsUpdateLoadingState(false);
            setShow(false);
          } catch (error) {
            console.error(error);
            setIsUpdateLoadingState(false);
          }
        }, 1000);
      } else setShow(false);
    },
    [dispatch]
  );

  const handleClearAllTodoByType = React.useCallback(async () => {
    setLoadingState(true);
    try {
      await Service.removeAllTodoByType(user_id, actionKey);
      setTimeout(() => {
        closeConfirmModal();
        setShowMoreFlg(false);
        dispatch(triggerRefresh()); // Trigger refresh all todos
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }, [actionKey, closeConfirmModal, dispatch, setLoadingState, user_id]);

  const handleOpenConfirmModal = React.useCallback(() => {
    setConfirmConfig({
      title: actionKey === TodoStatus.ACTIVE ? "Hold on" : "Clear confirm",
      subLabel: "Remove all todo",
      content: (
        <p>
          Are your sure you want to clear all
          {actionKey === TodoStatus.ACTIVE ? "active" : "completed"} todos?
        </p>
      ),
      variant: "danger",
      primaryLabel: "Do it!",
      primaryVariant: "danger-light",
      onConfirm: handleClearAllTodoByType,
    });
  }, [actionKey, handleClearAllTodoByType, setConfirmConfig]);

  React.useEffect(() => {
    const app = document.querySelector(".App");
    const mousedownHandler = () => {
      setShowMoreFlg(false);
    };
    if (app) {
      app.addEventListener("click", mousedownHandler);
    }
    return () => app?.removeEventListener("click", mousedownHandler);
  }, []);

  return (
    <>
      <div className={`${styles.ManaDo__TodoTypeContainer} ${className || ""}`}>
        <div className={styles.ManaDo__TodoTypeHeader_Wrapper}>
          <h4 className={styles.ManaDo__TodoTypeHeader_TypeLabel}>{label}</h4>
          <div
            className={
              styles.ManaDo__TodoTypeHeader_More +
                " " +
                (showMore && styles.focused) || ""
            }
            onClick={() => setShowMoreFlg((prev) => !prev)}
          >
            <More className={styles.ManaDo__MoreButton} />
            <MoreContainer
              className={styles.ManaDo__MoreContainer}
              show={showMore}
              items={[
                {
                  label: `Mark all as ${
                    actionKey === TodoStatus.ACTIVE ? "completed" : "active"
                  }`,
                  onClick: handleToggleTodoStatus,
                  variant: "primary",
                },
                {
                  label: `Clear all ${
                    actionKey === TodoStatus.ACTIVE ? "completed" : "active"
                  } todo`,
                  onClick: handleOpenConfirmModal,
                  variant: "danger",
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.ManaDo__Todos}>
          {(todos.length &&
            todos.map((todo) => (
              <TodoContainer
                key={todo.id}
                className="mb-1"
                data={todo}
                type={actionKey}
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
        isLoading={isUpdateLoading}
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
