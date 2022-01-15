import React, { memo } from "react";
import clsx from "clsx";

import styles from "./TodoToolbar.module.scss";

import { tabsList } from "./constants";
import { getItemLeft } from "utils";

export interface ITodoToolbarProps {
  className?: string,
  onTabClick?: Function,
  onClearAll?: Function,
  active?: string,
  activeTodos?: number
}

const TodoToolbar = (props: ITodoToolbarProps) => {
  const { className, onTabClick, onClearAll, active, activeTodos } = props;

  const handleTabClick = (value: string): void => {
    if (onTabClick) onTabClick(value);
  } 

  const handleClearAll = (): void => {
    if (onClearAll) onClearAll();
  }

  return (
    <div className={clsx(styles.root, className && className)} data-test="todo-toolbar"> 
      <div className={styles.count} data-test="count-active-todos">
        { getItemLeft(activeTodos || 0) }
      </div>
      <div className={styles.tabList} data-test="tab-list">
        { tabsList.map(item =>
          <div 
            className={clsx(styles.tabItem, active === item.value && styles.active)} 
            key={item.id}
            onClick={() => handleTabClick(item.value)}
            data-test={`tab-item-${item.value}`}
          >
            { item.label }
          </div>  
        )}
      </div>
      <div className={styles.clearAllButton} onClick={handleClearAll} data-test="clear-all-button">
        Clear all todos
      </div>
    </div>
  )
}

export default memo(TodoToolbar)