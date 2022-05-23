import React from 'react';
import { Popconfirm } from "antd";
import {TodoStatus} from '../../../models/todo';

function Header({unCompletedCount, status, setStatus, onDeleteAllTodo} : {unCompletedCount: number, status: any, setStatus: any, onDeleteAllTodo: any} ) {
  return (
    <footer className="footer">
				<span className="todo-count"><strong>{unCompletedCount}</strong> item left</span>
				<ul className="filters">
					<li>
						<a className={status === 'ALL' ? "selected" : undefined} href="#/" onClick={() => setStatus('ALL')}>All</a>
					</li>
					<li>
						<a className={status === TodoStatus.ACTIVE ? "selected" : undefined} href="#/active"  onClick={() => setStatus(TodoStatus.ACTIVE)}>Active</a>
					</li>
					<li>
						<a className={status === TodoStatus.COMPLETED ? "selected" : undefined} href="#/completed"  onClick={() => setStatus(TodoStatus.COMPLETED)}>Completed</a>
					</li>
				</ul>
        <Popconfirm
          title="Are you sure to delete all thess task?"
          onConfirm={() => onDeleteAllTodo()}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
         	<button className="clear-completed">Clear completed</button>
        </Popconfirm>
			
			</footer>
  );
}

export default Header;
