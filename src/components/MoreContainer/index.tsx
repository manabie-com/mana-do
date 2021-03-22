import * as React from "react";

import styles from "./MoreContainer.module.css";
import MoreItem, { IItem } from "./MoreItem";

export interface MoreContainerProps extends React.HTMLAttributes<HTMLElement> {
  items?: Array<IItem>;
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
          items.map((item, idx) => <MoreItem key={idx} data={item} />)) ||
          "Nothing here..."}
      </ul>
    </div>
  );
};

export default React.memo(MoreContainer);
