import React from "react";
import "./TodoPage.module.css";

import ManaDoContainer from "../../components/ManaDoContainer";
import Header from "../../components/Header";
import TodoFeatureSection from "../../components/TodoFeatureSection";
import Footer from "../../components/Footer";

const ToDoPage = () => {
  return (
    <>
      <ManaDoContainer>
        <Header />
        <TodoFeatureSection />
      </ManaDoContainer>
      <Footer />
    </>
  );
};

export default ToDoPage;
