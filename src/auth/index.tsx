import React, { Fragment, ReactNode, useContext, useEffect } from "react";
import { setAuth } from "store/actions";
import { StoreContext } from "store/provider";
import { History} from "history";

type Props = { 
  history: History,
  children: ReactNode
}

const Auth = ({ history, children } : Props) => {
  const { dispatch } = useContext(StoreContext);

  useEffect(()=>{
    const hasToken = localStorage.getItem("token");
    dispatch(setAuth(hasToken ? true : false));
    
    if(!hasToken){
      history.push("/");
    }
  },[dispatch, history])

  return <Fragment>{children}</Fragment>;
};

export default Auth;