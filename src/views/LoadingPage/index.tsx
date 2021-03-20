import * as React from "react";

import styles from "./LoadingPage.module.css";

import Loading from "../../components/Loading";

export interface LoadingPageProps {}

const LoadingPage: React.FunctionComponent<LoadingPageProps> = () => {
  return (
    <div className={styles.ManaDo__LoadingPage}>
      <Loading />
    </div>
  );
};

export default LoadingPage;
