import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "guards/AuthenticatedGuard";
import { PATH } from "constants/paths";
import Loading from "components/Loading/Loading";
const TodoPage = lazy(() => import("pages/Todo"));

export default function TodoRoutes() {
  return (
    <Switch>
      <AuthenticatedGuard
        exact
        path={PATH.HOME}
        component={() => (
          <Suspense fallback={<Loading />}>
            <TodoPage />
          </Suspense>
        )}
      />
    </Switch>
  );
}
