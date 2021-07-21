import React from 'react';
import {isAuthenticated} from "./utils/authen";
import {removeLoginToken} from "./utils/storeageUtils";
import {useHistory} from "react-router-dom";
import {ROUTES} from "./utils/constants";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  const history = useHistory();

  const onLogOut =() => {
    removeLoginToken();
    history.replace(ROUTES.SIGN_IN);
  }

  return (
    <>
      <nav className="main-nav">
        <div className="nav-inner">
          {
            isAuthenticated() ? <button onClick={onLogOut} className="basic red">Logout</button> : (
              <>
                <button className="basic green">Login</button>
                <button>Sign up</button>
              </>
            )
          }
        </div>
      </nav>
      <section>{children}</section>
    </>
  )
}

export default Layout;
