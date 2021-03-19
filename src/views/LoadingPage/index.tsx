import * as React from "react";
import Loading from "../../components/Loading";
import styles from "./LoadingPage.module.css";

export interface LoadingPageProps {}

const LoadingPage: React.FunctionComponent<LoadingPageProps> = () => {
  return (
    <div className={styles.ManaDo__LoadingPage}>
      <Loading />
    </div>
  );
};

export default LoadingPage;
