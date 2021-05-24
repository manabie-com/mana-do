import React, {ReactChildren, ReactChild, useContext} from 'react';
import Classes from './Layout.module.scss';
import AuthContext, {IAuthContext} from '../../context/AuthContext';
import AuthActionsCreator from '../../store/auth/AuthActions';

export interface ILayoutProps {
  children: ReactChildren | ReactChild
}

const Layout = (props: ILayoutProps) => {
  const {dispatch} = useContext(AuthContext) as IAuthContext;
  const logout = () => {
    dispatch(AuthActionsCreator.logout());
  };
  return (
    <section className={Classes.Layout}>
      <header className={Classes.Header}>
        <h3 className={Classes.HeaderText}>Quick Todo</h3>
        <div>
          <button onClick={logout} className={Classes.LoginButton}>Logout</button>
        </div>
      </header>
      <main className={Classes.Content}>{props.children}</main>
      <footer className={Classes.Footer}>Created by <b className={Classes.AuthorName}>Hoang Nguyen</b> with <span
        className={Classes.HearthIcon}>&hearts;</span></footer>
    </section>
  )
};

export default Layout;