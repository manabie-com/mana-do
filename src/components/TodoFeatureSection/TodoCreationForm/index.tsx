import * as React from "react";

import styles from "./TodoCreationForm.module.css";

import Service from "../../../service";
import { UserContext } from "../../../store/contexts/userContext";
import { TodoContext } from "../../../store/contexts/todoContext";
import { createTodo } from "../../../store/actions/todoActions";

import { ReactComponent as RightArrow } from "../../../svgs/right-arrow.svg";
import FormGroup from "../../FormGroup";
import ManaDoButton from "../../ManaDoButton";

export interface TodoCreationFormProps
  extends React.HTMLAttributes<HTMLElement> {}

const TodoCreationForm: React.FunctionComponent<TodoCreationFormProps> = ({
  className,
}) => {
  const [, dispatch] = React.useContext(TodoContext);
  const [{ user_id }] = React.useContext(UserContext);

  const [todoContent, setTodoContent] = React.useState("");
  const [inputFeedbackLabel, setInputFeedbackLabel] = React.useState("");

  const handleCreateTodo = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (!todoContent.trim()) {
        setInputFeedbackLabel("Please provide a work to be added!");
      } else {
        try {
          const resp = await Service.createTodo(todoContent, user_id);

          if (resp) {
            dispatch(createTodo(resp));
            setTodoContent("");
          } else setInputFeedbackLabel("Forbidden action!");
        } catch (err) {
          setInputFeedbackLabel(err);
        }
      }
    },
    [dispatch, todoContent, user_id]
  );

  const handleTodoChange = React.useCallback((e) => {
    const { currentTarget } = e;
    if (currentTarget.value) {
      setInputFeedbackLabel("");
    }
    setTodoContent(currentTarget.value);
  }, []);

  return (
    <form
      className={`${styles.ManaDo_TodoFeature_TodoCreationForm} ${
        className || ""
      } ${styles.CreationFormWidth}`}
      onSubmit={handleCreateTodo}
    >
      <FormGroup
        className={styles.ManaDo_TodoFeature_Input}
        id="Todo-create-input"
        name="Todo-create-input"
        type="text"
        value={todoContent}
        placeholder="Enter your work here..."
        feedbackLabel={inputFeedbackLabel}
        onChange={handleTodoChange}
      />
      <ManaDoButton type="submit" btnType="icon" className="ml-1">
        <RightArrow className={`${styles.ManaDo_TodoFeature_Icon}`} />
      </ManaDoButton>
    </form>
  );
};

export default React.memo(TodoCreationForm);
