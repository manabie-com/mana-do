import React from 'react';

function Header({onCreateTodo, inputRef} : {onCreateTodo: any, inputRef: any}) {
     
  return (
     <header className="header">
     <h1>todos</h1>
     <input  ref={inputRef} onKeyDown={onCreateTodo} className="new-todo" placeholder="What needs to be done?" autoFocus/>
     </header>
  );
}

export default Header;
