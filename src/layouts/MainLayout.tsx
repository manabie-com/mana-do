import React, { ReactNode } from "react";
import Header from "components/Header/Header";
import { MainLayoutContainer } from "./MainLayout.styles";
interface Props {
  children: ReactNode;
}

export default function MainLayout(props: Props) {
  const { children } = props;
  return (
    <MainLayoutContainer>
      <main>
        <Header />
        <div>{children}</div>
      </main>
    </MainLayoutContainer>
  );
}
