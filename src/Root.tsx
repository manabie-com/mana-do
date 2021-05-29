import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router";
import styled from "styled-components";
import Header from "./components/Header";
import SignInPage from "./pages/SignInPage";
import ToDoPage from "./pages/ToDoPage";

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function Root() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    try {
      const token = window.localStorage.getItem("token")
      if (!token) {
        history.push('/')
      } else if (location.pathname === "/") {
        history.push('/todo');
      }
    } catch (error) {
      // 
    }
    return () => {
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledRoot>
      <Header />
      <Switch>
        <Route path="/" exact component={SignInPage} />
        <Route path="/todo" component={ToDoPage} />
      </Switch>
    </StyledRoot>
  );
}
