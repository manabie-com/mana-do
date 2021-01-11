import React from "react";
import PropTypes from "prop-types";
import { TodoStatus } from "../../constant";
import Context from "../../store";
import InputCheck from "../InputCheck";
import BaseInput from "../BaseInput";

import "./styles.css";

/**
 *
 * Important Component for todos List
 */

const TodoItems = ({ id, content, status, created_date }) => {
  /**
   * get Store using Context
   */
  const propsContext = React.useContext(Context);
  const {
    state: { todos = [], currentEdit = null, contentEdit = "" },
    onDeleteTodo = () => {},
    setCurrentEdit = () => {},
    onChangeContentEdit = () => {},
    onSaveEdit = () => {},
    toggleTodo = () => {},
  } = propsContext;

  const ref = React.useRef(); // set ref for auto Focus call when hit edit
  /**
   * Find todoIndex of todos
   */
  let todoIndex =
    Array.isArray(todos) &&
    todos.findIndex((todo) => todo.id === id && todo.content === content);

  /**
   * when hit edit, call input focus in effect
   */
  React.useEffect(() => {
    if (currentEdit === todoIndex && ref.current) {
      ref.current.focus();
    }
  }, [currentEdit, todoIndex]);

  /**
   * call when click Done
   */
  const handleOnSaveEdit = () => {
    onSaveEdit(todoIndex); // let store knnow whave index should be edit
    /**
     * Clean up current Edit and content Edit
     */
    setCurrentEdit(null); //
    onChangeContentEdit("");
  };

  /**
   *
   * call when hit enter
   */
  const handleOnSaveEditKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      typeof content === "string" &&
      content.length !== 0
    ) {
      handleOnSaveEdit();
    }
  };

  /**
   * call when click Cancel
   */
  const handleOnCancel = () => {
    /**
     * Clean up current Edit and content Edit and Cancel
     */
    setCurrentEdit(null); //
    onChangeContentEdit("");
  };

  return (
    <React.Fragment>
      <div className="todo-head-item">
        {/* Show Date as toLocaleString */}
        {created_date &&
          status &&
          `${new Date(created_date).toLocaleString()} | ${status} |  `}
        {/* Before hit edit State */}
        {currentEdit !== todoIndex && (
          <React.Fragment>
            {status !== TodoStatus.COMPLETED && (
              <button
                className="todo-item-btn todo-item-btn-edit"
                onClick={() => {
                  /**
                   * Set up content edit to the current content
                   * and save todoIndex to trash which one is on editing
                   */
                  onChangeContentEdit(content);
                  setCurrentEdit(todoIndex);
                }}
              >
                Edit
              </button>
            )}
            &nbsp;
            <button
              className="todo-item-btn todo-item-btn-del"
              onClick={() => {
                /**
                 * Let Store know what todoIndex to be removed
                 */
                onDeleteTodo(todoIndex);
              }}
            >
              Delete
            </button>
          </React.Fragment>
        )}
        {currentEdit === todoIndex && (
          <React.Fragment>
            <button
              className="todo-item-btn todo-item-btn-success"
              onClick={/* Click to save */ handleOnSaveEdit}
            >
              Done
            </button>
            &nbsp;
            <button
              className="todo-item-btn todo-item-btn-del"
              onClick={/* Click to Cancel */ handleOnCancel}
            >
              Cancel
            </button>
            {/* Infor let User Know what options of saving when they edit */}
            &nbsp; click to Save or Enter
          </React.Fragment>
        )}
      </div>
      {currentEdit === todoIndex && (
        <div className="todo-item-edit">
          {/* input that take current content and allow user edit */}
          <BaseInput
            value={contentEdit}
            onChange={
              /* save edit content in content edit */ (e) =>
                onChangeContentEdit(e.target.value)
            }
            inputRef={ref}
            onKeyDown={
              /* support save when user hit enter */ handleOnSaveEditKeyDown
            }
           
          />
        </div>
      )}
      <div className="todo-item">
        <InputCheck
          // when edit mode set label react with content edit, if normal mode just show current content.
          label={currentEdit === todoIndex ? contentEdit : content}
          // Check or not on status
          checked={status === TodoStatus.COMPLETED}
          onChange={() => {
            toggleTodo(
              /* payload of toggle Todo */ {
                todoIndex,
                newStatus:
                  todos[todoIndex].status === TodoStatus.COMPLETED
                    ? TodoStatus.ACTIVE
                    : TodoStatus.COMPLETED,
              }
            );
          }}
        />
      </div>
    </React.Fragment>
  );
};

TodoItems.propTypes = {
  content: PropTypes.string,
  status: PropTypes.string,
  created_date: PropTypes.string,
  id: PropTypes.string,
};

export default TodoItems;
