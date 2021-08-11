import React, {useState, useRef, useEffect} from 'react';
import Button from '../../atoms/Button';
import {Todo} from '../../../models/todo';
import styles from './styles.module.scss';
import Input from '../../atoms/Input';
import {isTodoCompleted} from '../../../utils';


interface ToDoItemProps {
    index: number,
    onCheck: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void,
    onDelete: (value: string) => void,
    onEditTodo: (e: React.KeyboardEvent<HTMLInputElement>, value: string, id: string) => void,
    todo: Todo
}
// Hook
function useOnClickOutside(ref: any, handler: any) {
    useEffect(
      () => {
        const listener = (event: any) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
}

const ToDoItem: React.FC<ToDoItemProps> = ({ index, todo, onDelete, onCheck, onEditTodo }) => {
    const [showEdit, setEdit] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useOnClickOutside(inputRef, () => setEdit(false));
    
    return (
        <div key={index} className={`todo_item ${styles.ToDo__item}`} >
            {showEdit ? null :

                    <input 
                        checked={isTodoCompleted(todo)}
                        onChange={(e) => onCheck(e, todo.id)}
                        className={styles.input} type="checkbox" 
                    />
            }   
            {showEdit ?
                <>
                    <Input 
                        value={todo.content}
                        type="text"
                        innerRef={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setEdit(false);
                            }
                            onEditTodo(e, inputRef.current ? inputRef.current.value : '', todo.id);
                        }}
                        className={styles.todo}
                        placeholder="Edit todo"
                    />
                </>
                :
                <div title={todo.content} onDoubleClick={() => {
                    setEdit(true);
                }}  className={styles.label_item}>{todo.content}</div>
            }
            {showEdit ? null :
                <Button className={styles.delete}  onClick={() => onDelete(todo.id)}> x </Button>
            }   
        </div>
    );
}

ToDoItem.defaultProps = {
    index: 0
}

export default ToDoItem;
