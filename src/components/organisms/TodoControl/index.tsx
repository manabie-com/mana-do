import React, { Fragment } from 'react';
import { Button } from 'components/atoms';
import { TodoStatus } from 'models/todo';

import "./styles.css" 

type EnhanceTodoStatus = TodoStatus | 'ALL';

type Props = {
    onDeleteAllTodo: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    onSetShowTodo: (status: EnhanceTodoStatus) => void;
    showing: EnhanceTodoStatus;
}

const listButton = [
    {
        title:"All",
        typeShow: "ALL",
    },
    {
        title:"Active",
        typeShow: TodoStatus.ACTIVE,
    },
    {
        title:"Completed",
        typeShow: TodoStatus.COMPLETED,
    }
]

const TodoControl = ({  onDeleteAllTodo, onSetShowTodo, showing }:Props) => {

    const renderButtonFilter = () => {
        return listButton.map(({typeShow, title})=>{
            return (
            <div key={title} className="col-12 col-sm-4 col-md-4 col-lg-4">
                <Button className={`TodoControl__button ${showing === typeShow ? "bg-success": "bg-primary"}`} 
                        onClick={() => onSetShowTodo(typeShow as EnhanceTodoStatus)} >
                    {title}
                </Button>
            </div>
        )})
    }

    return (
        <Fragment>
            <div className="row">
                {renderButtonFilter()}
            </div>
            
            <div className="row">
                <div className="col-12">
                    <Button className="TodoControl__button bg-danger" onClick={onDeleteAllTodo}>
                        Clear all todo
                    </Button>
                </div>
            </div>
         </Fragment>
    );
};

export default TodoControl;