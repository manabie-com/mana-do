import React, { useContext } from "react";
import { AppContext } from "../../store/context";
import TodoItem from './TodoItem';
import './TodoList.css';
interface ITodoListProps {
    filter:string,
    [x:string]:string | any
}

const TodoList = ({filter}:ITodoListProps) => {
    const { state } = useContext(AppContext);
    const { todos } = state; 
    const filteredTodo = todos.filter(item => filter!=='ALL'?item.status === filter:item);
    return (<table className="app-table">
            <thead>
                <tr>
                    <th className="th-seq-number align-center">No</th>
                    <th className="th-seq-number align-center">Done?</th>
                    <th className="th-15-percent align-left">Content</th>
                    <th className="align-center">Status</th>
                    <th className="align-center">Created</th>
                    <th className="align-center">Action</th>
                </tr>
            </thead>
            <tbody>
                    { filteredTodo.map((item,index)=>{
                        return <TodoItem itemNo={index+1} key={item.id} todo={item}  />
                    }
                    ) }
            </tbody>
        </table>)
}

export default TodoList;


