import * as React from "react";
import styles from "./TodoCreationForm.module.css";

import FormGroup from "../../FormGroup";
import ManaDoButton from "../../ManaDoButton";
import { ReactComponent as RightArrow } from "../../../svgs/right-arrow.svg";
import Service from "../../../service";
import { TodoContext } from "../../../store/contexts/todoContext";
import { createTodo } from "../../../store/actions/todoActions";

export interface TodoCreationFormProps
  extends React.HTMLAttributes<HTMLElement> {}

const TodoCreationForm: React.FunctionComponent<TodoCreationFormProps> = () => {
  const [, dispatch] = React.useContext(TodoContext);
  const [todoContent, setTodoContent] = React.useState("");
  const [inputFeedbackLabel, setInputFeedbackLabel] = React.useState("");

  const handleCreateTodo = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (!todoContent.trim()) {
        setInputFeedbackLabel("Please provide a work to be added!");
      } else {
        try {
          const resp = await Service.createTodo(todoContent, "");

          if (resp) {
            dispatch(createTodo(resp));
            setTodoContent("");
          }
        } catch (e) {
          setInputFeedbackLabel(e?.error?.message);
        }
      }
    },
    [dispatch, todoContent]
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
      className={styles.ManaDo_TodoFeature_TodoCreationForm}
      onSubmit={handleCreateTodo}
    >
      <FormGroup
        className={styles.ManaDo_TodoFeature_Input}
        feedbackLabel={inputFeedbackLabel}
        value={todoContent}
        placeholder="Enter your work here..."
        type="text"
        id="Todo-create-input"
        name="Todo-create-input"
        onChange={handleTodoChange}
      />
      <ManaDoButton
        type="submit"
        variant="icon"
        className={`${styles.ManaDo_TodoFeature_Button} ml-1`}
      >
        <RightArrow className={`${styles.ManaDo_TodoFeature_Icon}`} />
      </ManaDoButton>
    </form>
  );
};

export default React.memo(TodoCreationForm);
