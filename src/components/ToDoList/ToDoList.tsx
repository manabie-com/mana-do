import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";
import { Container, Item, StyledSpan, StyledButton } from "./styles";
import { ToDoListProps } from "./types";
import { StyledInput } from "./styles";
import { Todo, TodoStatus } from "../../types/types";
import { INPUT_PLACEHOLDER } from "../ToDoCreation/constants";
import { KeyboardKeys } from "../types";

const ToDoList = ({ todos, onUpdateTodoStatus, onDeleteToDo, onEditTodo }: ToDoListProps) => {
    const [showEditField, setShowEditField] = useState(false);
    const [selectedToDoId, setSelectedToDoId] = useState('');
    const [fieldValue, setFieldValue] = useState('');

    const handleUpdateToDoStatus = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => onUpdateTodoStatus(e, idx);
    const handleDelete = (toDoId: string) => () => onDeleteToDo(toDoId);

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickOutside = (e: MouseEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const target = e.target as HTMLInputElement;
            const dataId = target.getAttribute('data-content');
            if (dataId !== target.value) setShowEditField(false);
        }
        else setShowEditField(false);
    }

    const handleDoubleClick = (todoId: string) => () => {
        setShowEditField(true);
        setSelectedToDoId(todoId)
    }

    const handleEditContent = (todo: Todo) => (e: KeyboardEvent<HTMLInputElement>) => { 
        if (e.key === KeyboardKeys.ENTER) {
            console.log(fieldValue);
            onEditTodo(e, todo.id, fieldValue); 
            setShowEditField(false);
        } 
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setFieldValue(e.target.value);

    return (
        <Container>
            {
                todos.map(( todo, index ) => {
                    return (
                        <Item key={index}>
                            <StyledInput
                                type="checkbox"
                                checked={todo.status === TodoStatus.COMPLETED}
                                onChange={handleUpdateToDoStatus(todo.id)}
                            />
                            { showEditField && todo.id === selectedToDoId ? <StyledInput data-content={todo.content} defaultValue={todo.content} placeholder={INPUT_PLACEHOLDER} onKeyDown={handleEditContent(todo)} onChange={handleOnChange}/> : <StyledSpan onDoubleClick={handleDoubleClick(todo.id)}>{todo.content}</StyledSpan> }
                            <StyledButton onClick={handleDelete(todo.id)}>X</StyledButton>
                        </Item>
                    );
                })
            }
        </Container>
    );
};

export default ToDoList;
