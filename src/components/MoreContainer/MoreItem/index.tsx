import * as React from "react";

import styles from "./MoreItem.module.css";

export interface IItem extends React.HTMLAttributes<HTMLElement> {
  label: string;
  variant: "danger" | "primary";
}

export interface MoreItemProps extends React.HTMLAttributes<HTMLElement> {
  data: IItem;
}

const MoreItem: React.FunctionComponent<MoreItemProps> = ({
  data,
  className,
  ...props
}) => {
  return (
    <li
      className={`${styles.ManaDo__MoreItem} ${
        (data.variant === "danger" && styles.danger) || ""
      } ${className || ""}`}
      onClick={data.onClick}
      {...props}
    >
      {data.label}
    </li>
  );
};

export default React.memo(MoreItem);
