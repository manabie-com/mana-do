import * as React from "react";

import styles from "./MoreContainer.module.css";

interface IArrayItem extends React.HTMLAttributes<HTMLElement> {
  label: string;
  variant: "danger";
  data: object;
}

export interface MoreContainerProps extends React.HTMLAttributes<HTMLElement> {
  items?: Array<IArrayItem>;
  show: boolean;
}

const MoreContainer: React.FunctionComponent<MoreContainerProps> = ({
  show = false,
  items = [],
  className,
}) => {
  return (
    <div
      className={`${styles.ManaDo__MoreContainer} ${
        (!show && styles.hidden) || ""
      } ${className || ""}`}
    >
      <ul className={styles.ManaDo__MoreList}>
        {(items.length &&
          items.map((item, idx) => (
            <li
              key={idx}
              className={`${styles.ManaDo__MoreList__Item} ${
                (item.variant === "danger" && styles.danger) || ""
              }`}
              onClick={item.onClick}
            >
              {item.label}
            </li>
          ))) ||
          "Nothing here..."}
      </ul>
    </div>
  );
};

export default React.memo(MoreContainer);
