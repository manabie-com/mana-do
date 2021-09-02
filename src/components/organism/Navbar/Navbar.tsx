import { GlobalState } from "modules/reducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as globalActions from "modules/actions";

function Navbar() {
  
  const isLogined = useSelector((state: GlobalState) => state.isLogined)
  const dispatch = useDispatch();
  

  return (
    <nav>
      {isLogined && (
        <Link to="/" className="nav__logout" onClick={() => dispatch(globalActions.logout())}>
          Logout
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
