import React, { useReducer, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Service from '../service';
import { createTodo } from '../store/actions';
import reducer, { initialState } from '../store/reducer';

const AddNewTaskForm = (props: any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const getNewTodo = props.getNewTodo;

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                getNewTodo(resp);
                inputRef.current.value = '';
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }
    return (

        <div className="Todo__creation floating-label-group">
            <input
                ref={inputRef}
                className="Todo__input"
                onKeyDown={onCreateTodo}
                required
            />
            <label className="floating-label-1">What need to be done?</label>
        </div>
    )
}

export default AddNewTaskForm