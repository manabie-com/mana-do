import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useSession } from "../containers/SessionProvider";
import ActionButton from "./ActionButton";
import ManabieIcon from "./svg/ManabieIcon";

const StyledHeader = styled.div`
  display: flex;
  width: 100vw;
  padding: 10px 15px;
  box-shadow: 0 0 15px rgb(0 0 0 / 20%);

  justify-content: space-between;
  align-items: center;
`;

export default function Header() {
  const history = useHistory();
  const { isLogged, signOut } = useSession();

  const handleSignout = () => {
    history.push("/");
    signOut();
  };

  return (
    <StyledHeader className="header">
      <div className="header__logo">
        <ManabieIcon />
      </div>
      <div className="header__info">
        {isLogged && <ActionButton text="Signout" onClick={handleSignout} />}
      </div>
    </StyledHeader>
  );
}
