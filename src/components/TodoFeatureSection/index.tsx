import * as React from "react";

import styles from "./TodoFeatureSection.module.css";
import { TodoContext } from "../../store/contexts/todoContext";
import { TodoStatus } from "../../models/todo";
import Service from "../../service";
import { setTodos, triggerRefresh } from "../../store/actions/todoActions";
import { UserContext } from "../../store/contexts/userContext";

import TodoTypeContainer from "./TodoTypeContainer";
import TodoCreationForm from "./TodoCreationForm";
import SkeletonTodoTypes from "../SkeletonTodoTypes";
import useConfirm from "../../_hooks/useConfirm/useConfirm";

export interface TodoFeatureSectionProps {}

const TodoFeatureSection: React.FunctionComponent<TodoFeatureSectionProps> = () => {
  const [{ todos, refreshTrigger }, dispatch] = React.useContext(TodoContext);
  const [{ user_id }] = React.useContext(UserContext);
  const { closeConfirmModal, setConfirmConfig, setLoadingState } = useConfirm();
  const [loading, setLoading] = React.useState(true);

  const handleRemoveAllTodo = React.useCallback(async () => {
    setLoadingState(true);
    try {
      await Service.removeAllTodo(user_id);
      setTimeout(() => {
        setLoadingState(false);
        closeConfirmModal();
        dispatch(triggerRefresh());
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoadingState(false);
    }
  }, [closeConfirmModal, dispatch, setLoadingState, user_id]);

  const handleOpenRemoveAllConfirmModal = React.useCallback(() => {
    setConfirmConfig({
      title: "This action can't be reverted!",
      subLabel: "Remove all todos",
      content: (
        <p>
          This will remove all of your todos in the system. Are your sure you
          want to clear them?
        </p>
      ),
      variant: "danger",
      primaryLabel: "I'm sure",
      primaryVariant: "danger",
      onConfirm: handleRemoveAllTodo,
    });
  }, [handleRemoveAllTodo, setConfirmConfig]);

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
  }, [dispatch, user_id, refreshTrigger]); // Re run effect on refreshTrigger changed

  return (
    <div className={styles.ManaDo__TodoFeature__Container}>
      <TodoCreationForm />
      <div className={`${styles.ManaDo__TodoTypes} mt-1`}>
        {!loading ? (
          <>
            {/* Active type column */}
            <TodoTypeContainer
              label="Active"
              todos={todos
                .filter((todo) => todo.status === TodoStatus.ACTIVE)
                .sort((a, b) => {
                  return (
                    new Date(b.created_date).getTime() -
                    new Date(a.created_date).getTime()
                  );
                })} // Sort todo by date time created (Latest first)
              actionKey={TodoStatus.ACTIVE}
              toggleText="Mark all as completed"
            />

            {/* Completed type column */}
            <TodoTypeContainer
              label="Completed"
              todos={todos
                .filter((todo) => todo.status === TodoStatus.COMPLETED)
                .sort((a, b) => {
                  return (
                    new Date(b.created_date).getTime() -
                    new Date(a.created_date).getTime()
                  );
                })} // Sort todo by date time created (Latest first)
              actionKey={TodoStatus.COMPLETED}
              toggleText="Mark all as active"
            />
          </>
        ) : (
          <SkeletonTodoTypes />
        )}
      </div>
      <div className={styles.ManaDo__ClearAllTodoWrapper + " mt-2"}>
        <span onClick={handleOpenRemoveAllConfirmModal}>Clear all todos</span>
      </div>
    </div>
  );
};

export default React.memo(TodoFeatureSection);
