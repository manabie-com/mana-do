import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { Todo } from '../../../../models/todo';
import Service from '../../../../service';
import { AppActions, createTodo } from '../../../../store/actions';
import FormInput from '../../../atom/FormInput/FormInput';

interface ICreateTask {
    dispatch: React.Dispatch<AppActions>,
    todos: Todo[]
}

const CreateTask = ({ dispatch, todos }: ICreateTask) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const history = useHistory()

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = inputRef.current
        if (e.key === 'Enter' && input) {
            if (input.value !== '') {

                const duplicateTask = todos.find((todo) => todo.content === input.value)
                if (!duplicateTask) {
                    try {
                        const resp = await Service.createTodo(input.value);
                        dispatch(createTodo(resp));
                        input.value = '';
                    } catch (e) {
                        if (e.response.status === 401) {
                            history.push('/')
                        }
                    }
                }
                else alert(`Task name '${duplicateTask.content}' had been created`)
            }
            else alert('Task can not be empty')
        }
    }

    const handleOnBlur = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <FormInput
            style={{ height: '2.5rem' }}
            className="Todo__creation"
            inputRef={inputRef}
            onKeyDown={onCreateTodo}
            onBlur={handleOnBlur}
            placeholder="What need to be done?"
        />
    )
}

export default CreateTask;