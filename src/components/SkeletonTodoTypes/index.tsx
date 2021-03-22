import * as React from "react";

import styles from "./SkeletonTodoTypes.module.css";

export interface SkeletonTodoTypesProps {}

// Skeleton loading for todos
const SkeletonTodoTypes: React.FunctionComponent<SkeletonTodoTypesProps> = () => {
  return (
    <div className={styles.ManaDo__TodoTypeSkeleton__Container}>
      {/* Start of todo type column */}
      <div className={styles.ManaDo__Skeleton__TodoTypeContainer}>
        <div className={styles.ManaDo__Skeleton__TodoTypeHeader}>
          <div
            className={
              styles.ManaDo__Skeleton__TodoTypeLabel + " " + styles.skeleton
            }
          ></div>
          <div
            className={
              styles.ManaDo__Skeleton__TodoTypeToggler + " " + styles.skeleton
            }
          ></div>
        </div>
        <div className={styles.ManaDo__Skeleton__TodoTypeBody}>
          <div
            className={styles.ManaDo__Skeleton__Todo + " " + styles.skeleton}
          ></div>
          <div
            className={styles.ManaDo__Skeleton__Todo + " " + styles.skeleton}
          ></div>
          <div
            className={styles.ManaDo__Skeleton__Todo + " " + styles.skeleton}
          ></div>
        </div>
      </div>
      {/* End of todo type column */}

      {/* Start of todo type column */}
      <div className={styles.ManaDo__Skeleton__TodoTypeContainer}>
        <div className={styles.ManaDo__Skeleton__TodoTypeHeader}>
          <div
            className={
              styles.ManaDo__Skeleton__TodoTypeLabel + " " + styles.skeleton
            }
          ></div>
          <div
            className={
              styles.ManaDo__Skeleton__TodoTypeToggler + " " + styles.skeleton
            }
          ></div>
        </div>
        <div className={styles.ManaDo__Skeleton__TodoTypeBody}>
          <div
            className={styles.ManaDo__Skeleton__Todo + " " + styles.skeleton}
          ></div>
          <div
            className={styles.ManaDo__Skeleton__Todo + " " + styles.skeleton}
          ></div>
          <div
            className={styles.ManaDo__Skeleton__Todo + " " + styles.skeleton}
          ></div>
        </div>
      </div>
      {/* End of todo type column */}
    </div>
  );
};

export default React.memo(SkeletonTodoTypes);
