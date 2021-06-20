import React, {InputHTMLAttributes, LegacyRef, ReactElement} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAlignLeft, faSearch, faBell, faTasks, faSpinner, faClipboardCheck} from '@fortawesome/free-solid-svg-icons'
import {Button} from "./Button";
import {TodoStatus} from "../models/todo";

type TodoBarProps = {
    onToggleBar: (params: any) => any
}
type TodoToolBarProps = {
    onShowItems: (params: any) => any

}

export const TodoBar = (props: TodoBarProps) => {
    const {onToggleBar} = props;
    const _handleMenuIcon = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleBar(e);
    }
    return <div className="ToDo__bar">
        <FontAwesomeIcon icon={faAlignLeft} className={'Todo__icon Todo__menu'} onClick={_handleMenuIcon}/>
        <FontAwesomeIcon icon={faSearch} className={'Todo__icon Todo__search'}/>
        <FontAwesomeIcon icon={faBell} className={'Todo__icon Todo__notify'}/>
    </div>
}
export const TodoToolBar = (props: TodoToolBarProps) => {
    const {onShowItems} = props
    return <div className="Todo__toolbar">
        {/*{todos.length > 0 ?*/}
        {/*    <input*/}
        {/*        type="checkbox"*/}
        {/*        checked={activeTodos === 0}*/}
        {/*        onChange={onToggleAllTodo}*/}
        {/*    /> : <div/>*/}
        {/*}*/}
        <div className="Todo__tabs">
            <Button text={'All'} icon={<FontAwesomeIcon icon={faTasks} className={'Todo__icon'}/>}
                    className="Action__btn" onClick={() => onShowItems('ALL')}/>
            <Button text={'Active'} icon={<FontAwesomeIcon icon={faSpinner} className={'Todo__icon'}/>}
                    className="Action__btn" onClick={() => onShowItems(TodoStatus.ACTIVE)}/>
            <Button text={'Completed'} icon={<FontAwesomeIcon icon={faClipboardCheck} className={'Todo__icon'}/>}
                    className="Action__btn"
                    onClick={() => onShowItems(TodoStatus.COMPLETED)}/>
        </div>
        {/*<Button text={'Clear all todos'} className="Action__btn" onClick={onDeleteAllTodo}/>*/}
    </div>
}