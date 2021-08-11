import React from 'react';
// import Header from '../../organisms/Header';
// import HomeHeader from '../../organisms/HomeHeader';
// import Footer from '../../organisms/Footer';
// import Head from 'next/head'
export default function DefaultLayout(props: any) {
  return (
    <React.Fragment >
      <div className="wrapper">
        {props.children}
        {/* <header>Todo App</header>
        <div className="inputField">
          <input type="text" placeholder="Add your new todo" />
          <button><i className="fas fa-plus" /></button>
        </div>
        <ul className="todoList">
        </ul>
        <div className="footer">
          <span>You have <span className="pendingTasks"></span> pending tasks</span>
          <button>Clear All</button>
        </div> */}
    </div>
    </React.Fragment >
  );
}