import React, { useReducer } from 'react';
import {cleanup, fireEvent, render, act, screen } from '@testing-library/react';
import ToDoPage from './ToDoPage';
import { TodoStatus } from './models/todo';
import Service from './service';
import reducer from './store/reducer';
import {setTodos, createTodo, updateTodoStatus, deleteTodo, updateTodoContent, changeTodoMode, toggleAllTodos, deleteAllTodos} from './store/actions'
import { renderHook } from '@testing-library/react-hooks';

afterEach(cleanup);

describe('ToDoPage', () => {
	it('renders without crashing', () => {
		const { getByTestId } = render(<ToDoPage />);
		const toDoPage = getByTestId('todo-page');
		expect(toDoPage).toBeInTheDocument();
	});
});

describe('The reducer and action', () => {
	const initialState = { todos: [] }
	const mockTodo1 = {
		content: 'wash dishes',
		created_date: new Date().toISOString(),
		status: TodoStatus.ACTIVE,
		id: 'abc123',
		user_id: 'firstUser',
		isEditing: false
	}
	const mockTodo2 = {
		content: 'have lunch',
		created_date: new Date().toISOString(),
		status: TodoStatus.ACTIVE,
		id: 'xyz123',
		user_id: 'firstUser',
		isEditing: false
	}
	const mockTodoList = [mockTodo1, mockTodo2]
	const stateWithTodos = { todos: mockTodoList}		
	
	it('should return the initial state', () => {
		expect(initialState).toEqual({ todos: [] });
	});

	it('should set list of todos as empty list if no initial todos', () => {
		expect(reducer(initialState, setTodos([]))).toEqual({ todos: [] });
	});

	it('should set list of todos if any', () => {
		expect(reducer(stateWithTodos, setTodos(mockTodoList))).toEqual({ todos: mockTodoList });
	});

	it('should add new todo', async () => {
		expect(reducer(initialState, createTodo(mockTodo1))).toEqual({ todos: [mockTodo1] });
	});

	it('should update todo status', () => {
		const newMockTodo1 = {...mockTodo1, status: TodoStatus.COMPLETED}
		expect(reducer(stateWithTodos, updateTodoStatus('abc123', true))).toEqual({ todos: [newMockTodo1, mockTodo2] });
	});

	it('should update todo content', () => {
		const newMockTodo1 = {...mockTodo1, content: 'wash car'}
		expect(reducer(stateWithTodos, updateTodoContent('abc123', 'wash car'))).toEqual({ todos: [newMockTodo1, mockTodo2] });
	});

	it('should change todo mode', () => {
		const newMockTodo1 = {...mockTodo1, isEditing: true}
		expect(reducer(stateWithTodos, changeTodoMode('abc123', true))).toEqual({ todos: [newMockTodo1, mockTodo2] });
	});

	it('should toggle all todo status', () => {
		const newMockTodo1 = {...mockTodo1, status: TodoStatus.COMPLETED}
		const newMockTodo2 = {...mockTodo2, status: TodoStatus.COMPLETED}
		expect(reducer(stateWithTodos, toggleAllTodos(true))).toEqual({ todos: [newMockTodo1, newMockTodo2] });
	});

	it('should delete a todo', () => {
		expect(reducer(stateWithTodos, deleteTodo('abc123'))).toEqual({ todos: [mockTodo2] });
	});

	it('should delete all todos', () => {
		expect(reducer(stateWithTodos, deleteAllTodos())).toEqual({ todos: [] });
	});
});

describe('App features', () => {
	const mockCreateItem = (Service.createTodo = jest.fn());
	const mockGetItems = (Service.getTodos = jest.fn());
	const {result} = renderHook(() => useReducer(reducer, {todos: []}));
	// const [state, dispatch] = result.current
	const mockSetTodos = (result.current[1] = jest.fn());
	it('should allow create, delete, edit, toggle', async () => {
		const mockTodo1 = {
			content: 'wash dishes',
			created_date: new Date().toISOString(),
			status: TodoStatus.ACTIVE,
			id: 'abc123',
			user_id: 'firstUser',
			isEditing: false
		}
		const mockTodo2 = {
			content: 'have lunch',
			created_date: new Date().toISOString(),
			status: TodoStatus.ACTIVE,
			id: 'xyz000',
			user_id: 'firstUser',
			isEditing: false
		}

		mockCreateItem.mockResolvedValueOnce( mockTodo1 );
		mockCreateItem.mockResolvedValueOnce( mockTodo2 );
		
		const {findByText, findAllByText, findByPlaceholderText, findByTestId, findAllByRole, findByDisplayValue} = screen;

		/* 			
			describe: useEffect run
			it: should run Service.getTodos once
		*/
		mockGetItems.mockImplementationOnce(() => Promise.resolve([]))
		mockSetTodos.mockImplementationOnce(() => ({todos:[]}))

		await act(async () => {
			render(<ToDoPage />)
		})
		expect(mockGetItems).toHaveBeenCalledTimes(1)

		/* 			
			describe: type a todo
			it: should allow change a todo in input
		*/
		const todoInput = await findByPlaceholderText('What need to be done?') as HTMLInputElement;
		fireEvent.change(todoInput, {target: {value: mockTodo1.content} })
		expect(todoInput.value).toBe(mockTodo1.content);
		expect(todoInput).toHaveDisplayValue(mockTodo1.content)

		/* 			
			describe: press Enter
			it: should show a todo
		*/
		fireEvent.keyDown(todoInput, {key: 'Enter', code: 'Enter', charCode: 13})
		
		const mockTodo1Content = await findByText(mockTodo1.content);
		const mockTodo1ContentList = await findAllByText(mockTodo1.content);

		expect(mockTodo1ContentList).toHaveLength(1)
		expect(mockTodo1Content).toBeInTheDocument();
		expect(mockTodo1Content).toHaveTextContent(mockTodo1.content);
	
		// Create mockTodo2
		fireEvent.change(todoInput, {target: {value: mockTodo2.content} })
		fireEvent.keyDown(todoInput, {key: 'Enter', code: 'Enter', charCode: 13})
		const mockTodo2Content = await findByText(mockTodo2.content);
		expect(mockTodo2Content).toBeInTheDocument();

		/* 			
			describe: Toggle mockTodo2 status
			it: should change mockTodo2 status from 'ACTIVE' to 'COMPLETED'
			it: should have 1 todo in 'ACTIVE' and 1 todo in 'COMPLETED
		*/
		const checkboxTodo2 = await findByTestId(`${mockTodo2.id}__status`)
		fireEvent.click(checkboxTodo2)
		expect(checkboxTodo2).toBeChecked()
		const allCompletedChecks = await findAllByRole('checkbox', {checked: true})
		const allActiveChecks = await findAllByRole('checkbox', {checked: false})
		expect(allCompletedChecks).toHaveLength(1)
		// 1 'ACTIVE' checkbox and 1 'toggle-all' checkbox
		expect(allActiveChecks).toHaveLength(2)

		/* 			
			describe: Toggle all todos status
			it: should change all todos status from 'ACTIVE' to 'COMPLETED'
			it: should have 2 todos in 'COMPLETED' and 0 todo in 'ACTIVE
		*/
		const toggleAllCheckbox = await findByTestId('toggle-all')
		fireEvent.click(toggleAllCheckbox)
		const allCompletedTodoCheckboxes = await findAllByRole('checkbox', {checked: true})
		expect(allCompletedTodoCheckboxes).toHaveLength(3)

		/* 			
			describe: Edit content of mockTodo1
			it: should show new content
		*/
		fireEvent.doubleClick(mockTodo1Content)
		const mockTodo1Input = await findByDisplayValue(mockTodo1.content);
		fireEvent.change(mockTodo1Input, {target: {value: 'wash car'} })
		fireEvent.keyDown(mockTodo1Input, {key: 'Enter', code: 'Enter', charCode: 13})
		const newMockTodo1Content = await findByText('wash car');
		const newMockTodo1ContentList = await findAllByText('wash car');
		expect(newMockTodo1Content).toBeInTheDocument()
		expect(newMockTodo1ContentList).toHaveLength(1)

		/* 			
			describe: Click on delete todo button
			it: should delete a todo
		*/
		const deleteTodoBtn1 = await findByTestId(`${mockTodo1.id}__delete`)
		fireEvent.click(deleteTodoBtn1);
		const allDeleteBtns = await findAllByText('X')
		expect(allDeleteBtns).toHaveLength(1)

		/* 			
			describe: Click on 'Clear all todos' button
			it: should delete a todo
		*/
		const clearAllBtn = await findByText('Clear all todos')
		fireEvent.click(clearAllBtn);
		const statusAllBtn = await findByText(/All/)
		expect(statusAllBtn).toHaveTextContent('All (0)')
	})
})