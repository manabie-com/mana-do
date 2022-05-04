import React from "react";
import { isAuthenticated } from "../../utils/authen";
import { removeLoginToken } from "../../utils/storageUtils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { Wrapper } from "./styles";
import ThemeButton from "../../components/ThemeButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const onLogOut = () => {
    removeLoginToken();
    navigate(ROUTES.SIGN_IN, { replace: true });
  };

  return (
    <Wrapper>
      <nav className="header">
        <div className="nav-inner">
          <ThemeButton />

          {isAuthenticated() && (
            <button onClick={onLogOut} className="basic red">
              Logout
            </button>
          )}
        </div>
      </nav>

      <section>{children}</section>
    </Wrapper>
  );
};

export default Layout;
