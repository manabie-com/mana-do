import * as React from "react";
import styles from "./SkeletonTodoTypes.module.css";

export interface SkeletonTodoTypesProps {}

const SkeletonTodoTypes: React.FunctionComponent<SkeletonTodoTypesProps> = () => {
  return (
    <div className={styles.ManaDo__TodoTypeSkeleton__Container}>
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
    </div>
  );
};

export default React.memo(SkeletonTodoTypes);
