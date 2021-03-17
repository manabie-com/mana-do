import * as React from "react";
import FormGroup from "../FormGroup";
import ManaDoButton from "../ManaDoButton";
import styles from "./TodoFeatureSection.module.css";

export interface TodoFeatureSectionProps {}

const TodoFeatureSection: React.FunctionComponent<TodoFeatureSectionProps> = () => {
  const [todoContent, setTodoContent] = React.useState("");
  const [inputFeedbackLabel, setInputFeedbackLabel] = React.useState("");

  const handleCreateTodo = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!todoContent.trim()) {
        setInputFeedbackLabel("Please provide a work to be added!");
      }
      console.log(todoContent);
    },
    [todoContent]
  );

  const handleTodoChange = React.useCallback((e) => {
    const { currentTarget } = e;
    if (currentTarget.value) {
      setInputFeedbackLabel("");
    }
    setTodoContent(currentTarget.value);
  }, []);

  return (
    <div className={styles.ManaDo_TodoFeature_Container}>
      <form
        className={styles.ManaDo_TodoFeature_Form}
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
          label="Add"
          type="submit"
          className={`${styles.ManaDo_TodoFeature_Button} ml-1`}
        />
      </form>
    </div>
  );
};

export default React.memo(TodoFeatureSection);
