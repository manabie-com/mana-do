import React from 'react';
import ToDoItem from '../../molecules/ToDoItem';
import {Todo} from '../../../models/todo';
import styles from './styles.module.scss';
interface TodosProps {
    onDelete: (value: string) => void,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onCheck: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void,
    onEditTodo: (e: React.KeyboardEvent<HTMLInputElement>, value: string, id: string) => void,
    todos: Todo[],
    activeTodos: number
}

const Todos: React.FC<TodosProps> = ({  todos, onDelete, onChange, activeTodos, onCheck, onEditTodo }) => (
    <div className={styles.list}>
    {
        todos.map((todo, index) => {
            return (
                <ToDoItem 
                    onCheck={onCheck}
                    onEditTodo={onEditTodo}
                    key={index}
                    index={index}
                    todo={todo}
                    onDelete={onDelete}
                />
            );
        })
        
    }
    {todos.length > 0 ?
        <input
            type="checkbox"
            className={styles.label_all}
            checked={activeTodos === 0}
            onChange={onChange}
        /> : <div/>
    }
</div>
);

Todos.defaultProps = {
    todos: []
}

export default Todos;
