import React, { useEffect, useReducer, useRef, useState } from 'react';

import Service from './service';
import { Todo, TodoStatus } from './models/todo';
import TodoList from './dumpComponents/TodoList';
import TodoCreation from './dumpComponents/TodoCreation';
import TodoToolbar from './dumpComponents/TodoToolbar';
import Header from './dumpComponents/Header';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    // One (temporal) list for displaying, no need to save this list in localStorage after each changes
    // One list for saving in localStorage, save this list each time it changes
    const [todoListDisplay, setTodoListDisplay] = useState<Todo[]>([]);
    const [todoListSave, setTodoListSave] = useState<Todo[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<Number>(-1);
    const inputRef = useRef<any>(null);
    const editRef = useRef<any>(null);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            
            const resp = await Service.createTodo(inputRef.current.value);
            const newList = [...todoListDisplay, resp];
            setTodoListDisplay(newList);
            setTodoListSave(newList);
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        const checked = e.target.checked;
        const newList = todoListDisplay.map((todo, i) => {
            if (i === todoId) {
                return { ...todo, status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE };
            }
            return todo;
        })
        setTodoListDisplay(newList);
        setTodoListSave(newList);
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const newList = todoListDisplay.map((todo, i) => {
            return { ...todo, status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE };
        })
        setTodoListDisplay(newList);
        setTodoListSave(newList);
    }

    const onDeleteAllTodo = () => {
        localStorage.setItem('todoList', '[]');
        setTodoListDisplay([]);
        setTodoListSave([]);
    }

    const handleDeleteTodo = (index: Number) => {
        const newList = todoListDisplay.filter((todo, i) => {
            return index !== i;
        });
        setTodoListDisplay(newList);
        setTodoListSave(newList);
    }

    const handleEditTodo = (index: number) => {
        setEditing(true);
        setEditIndex(index);
    }

    const handleOnChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Display changed value while typing but still not save in localStoge
        const value = e.target.value;
        const newList = todoListDisplay.map((todo, i) => {
            if (i === editIndex) {
                return { ...todo, content: value };
            }
            return todo;
        })
        setTodoListDisplay(newList);
    }

    const onSaveEdit = (e: any) => {
        // Until tapping Enter, save this changed value in localStorage
        if (e.key === 'Enter') {
            setTodoListSave(todoListDisplay);
            setEditing(false);
        }
    }

    const onCancelEdit = (e: any) => {
        // Display the old content, if user doesnt want to change this todo more
        if (editing && !editRef.current.contains(e.target)) {
            setTodoListDisplay(todoListSave);
            setEditing(false);
        };
    }

    useEffect(() => {
        // Catch the event Click outside of input element while editing to cancel this edit process
        document.addEventListener('mousedown', onCancelEdit);
        return () => document.removeEventListener('mousedown', onCancelEdit);
    });

    // Get todos from localStorage at first time
    useEffect(() => {
        const currentList = JSON.parse(localStorage.getItem('todoList') || '[]');
        setTodoListDisplay(currentList);
        setTodoListSave(currentList);
    }, [])

    // After todos changed, saved it in localStorage
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoListSave));
    }, [todoListSave])

    return (
        <div className="ToDo__container">
            <Header/>
            <TodoCreation
                inputRef={inputRef}
                onCreateTodo={onCreateTodo}
            />
            <TodoList
                todoListDisplay={todoListDisplay}
                showing={showing}
                editing={editing}
                onUpdateTodoStatus={onUpdateTodoStatus}
                handleOnChangeData={handleOnChangeData}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
                onSaveEdit={onSaveEdit}
                editRef={editRef}
                editIndex={editIndex}
            />
            <TodoToolbar
                todos={todoListDisplay}
                onToggleAllTodo={onToggleAllTodo}
                showing={showing}
                setShowing={setShowing}
                onDeleteAllTodo={onDeleteAllTodo}
            />
        </div>
    );
};

export default ToDoPage;