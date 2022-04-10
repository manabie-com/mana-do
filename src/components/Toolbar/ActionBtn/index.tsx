import React, { useContext } from 'react';
import classNames from 'classnames';
import { FilterTodos } from 'store/actions';
import { TodoContext } from 'App';
import './index.scss';

export const ActionBtn = (props: any) => {
    const { dispatch, filter } = useContext(TodoContext);

    const onFilterTodos = (typeFilter: string) => {
        dispatch(FilterTodos(typeFilter));
    }

    return (
        <a 
          href={'#/'} 
          className={classNames(
            "action-btn",
            { '-selected': filter === props?.todoStatus },
          )}
          onClick={() => onFilterTodos(props?.todoStatus)}
        >
          {props?.todoStatus || 'ALL'}
        </a>
    );
}
