import React from "react";
import styles from "./TodoPage.module.css";

import ManaDoContainer from "../../components/ManaDoContainer";
import Header from "../../components/Header";
import TodoFeatureSection from "../../components/TodoFeatureSection";
import Footer from "../../components/Footer";
import { ReactComponent as Wave } from "../../svgs/wave.svg";

const ToDoPage = () => {
  return (
    <>
      <Wave className={styles.ManaDo__AnimateWave} />
      <ManaDoContainer>
        <Header />
        <TodoFeatureSection />
      </ManaDoContainer>
      <Footer />
    </>
  );
};

export default ToDoPage;
