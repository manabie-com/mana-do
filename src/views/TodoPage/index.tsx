import React from "react";

import styles from "./TodoPage.module.css";

import { ReactComponent as Wave } from "../../svgs/wave.svg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ManaDoContainer from "../../components/ManaDoContainer";
import TodoFeatureSection from "../../components/TodoFeatureSection";

const ToDoPage = () => {
  React.useEffect(() => {
    document.title = "ManaDo - Todo";
  }, []);

  return (
    <>
      <Wave className={styles.ManaDo__AnimateWave + " " + styles.WaveWidth} />
      <ManaDoContainer>
        <Header />
        <TodoFeatureSection />
      </ManaDoContainer>
      <Footer className="mt-3" />
    </>
  );
};

export default ToDoPage;
