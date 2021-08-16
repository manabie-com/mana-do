import React, { useState } from "react";
import { useTranslation } from "react-i18next";
/**
 * @param {Number} activeTodos - status of check box select all - deselect all
 * @param {Event} onToggleAllTodo - trigger when user tick in box
 * @param {Array Object} listStatus
 *          [{
 *             value: string,
 *            label: string
 *          }]
 *          trigger when user tick in box
 * @param {Event} onDeleteAllTodo - trigger when user click delete all
 * @param {Event} onClickTab - trigger when user click one tab
 */
export default function Toolbar(props) {
  const {
    activeTodos = false,
    onToggleAllTodo = () => {},
    onClickTab = () => {},
    listStatus = [],
    onDeleteAllTodo = () => {},
    showing = "",
  } = props;
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  return (
    <div className="Todo__toolbar">
      <div className="Todo__tabs todo-toolbar-sec2">
        {listStatus &&
          listStatus.length &&
          listStatus.map((v, i) => {
            return (
              <button
                key={i}
                className={
                  showing === v.value
                    ? "Action__btn ma-todo-tab ma-todo-tab-active"
                    : "Action__btn ma-todo-tab"
                }
                onClick={() => onClickTab(v.value)}
              >
                {t(v.label)}
              </button>
            );
          })}
      </div>
      <div className="todo-toolbar-sec1">
        <div
          style={{}}
          className="mark__all_done-wrap"
          onClick={() => {
            onToggleAllTodo(!activeTodos);
          }}
        >
          {activeTodos ? (
            <img alt="mana-do" src="/img/TodoScreen/checkbox.svg" />
          ) : (
            <img alt="mana-do" src="/img/TodoScreen/unCheckbox.svg" />
          )}
          <span className="ma-text ma-checkall-label">
            {t("mark_all_done")}
          </span>
        </div>
        <button
          className="Action__btn delete-all-button"
          onClick={onDeleteAllTodo}
        >
          {t("clear_all_todo")}
        </button>
      </div>
      <div
        onMouseLeave={() => {
          if (show) {
            setShow(false);
          }
        }}
        className="todo-toolbar-sec1-mobile"
      >
        <img
          onMouseEnter={() => {
            if (!show) {
              setShow(true);
            }
          }}
          className="ma-more-button"
          src="/img/more.svg"
        />
        {show ? (
          <div className="menu-more-wrapper">
            <div
              onClick={() => {
                onToggleAllTodo(!activeTodos);
              }}
              className="menu-more-item"
            >
              {activeTodos ? (
                <img
                  src="/img/TodoScreen/checkbox.svg"
                />
              ) : (
                <img
                  src="/img/TodoScreen/unCheckbox.svg"
                />
              )}
              <span className="ma-text ma-mark-all">{t("mark_all_done")}</span>
            </div>
            <div
              onClick={onDeleteAllTodo}
              className="menu-more-item ma-text ma-delete-all-mobile"
            >
              <img alt="mana-do" src="/img/TodoScreen/delete.svg"></img>
              <span>{t("clear_all_todo")}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
