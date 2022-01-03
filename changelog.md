# Errors
- Error with tsconfig.json: "cannot find type definition file for 'babel__core'"
  - run this command: `npm install @types/node --save-dev`

# Bugs to be fixed
## User is able to save empty todo
- When input is empty, if user presses "Enter", app still creates an empty todo.
- I think this feature is not necessary. I changed this feature that only non-empty todos are created.

## Duplicated new todo
- After pressing "Enter", a todo appears twice.

## Duplicated delete todo
- When user click on "delete a todo", two of them are deleted.

?? These bugs appears because the current "todos" state is mutated directly which causes side-effect. Because, React renders twice in StrictMode to ensure the app works properly, the app triggers the useReducer twice. That's why the state is updated duplicatedly.

=> To fix this, I create new state in each action and update it to the app. This is also recommended by React.

# New Features
- Store on localStorage.
- User double-clicks the todo to edit, presses "Enter" to apply the changes, or clicks outside to discard.
- Show the quantity of each status counts so that users can know how many todos in all and every status type.
- Add some UI/UX.

- I commented the original lines in [Reducer file](./src/store/reducer.ts) for you to compare

# Testing
## Test library
- Run command `npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/react-hooks`

## Test try
- I have tested to make sure useReducer works and the App works properly as required.

1. However, I got a **warning** which I tried different ways to find solutions to fixed it but I couldn't. Some of them still passed the test but have nothing to do with the warning.
- If I remove the 
  - `const resp = await Service.getTodos();` in [Component File](src/ToDoPage.tsx),
  - `expect(mockGetItems).toHaveBeenCalledTimes(1)` in [Test File](src/ToDoPage.test.tsx) 
  - and leave it with just `dispatch(setTodos([]));`
it shows no warnings anymore.

2. Moreover, I still cannot test the 2 **"Duplicated bugs"** above. I tried the *original way* and *my way* but both of them still passed the test.

## Some tries for problem 1
### Try #1
```
describe('useEffect', () => {
	it('should not show warning' , async () => {
		const spy = jest
    .spyOn(Service, "getTodos")
    .mockReturnValue(Promise.resolve([{
			content: 'wash dishes',
			created_date: new Date().toISOString(),
			status: TodoStatus.ACTIVE,
			id: 'abc123',
			user_id: 'firstUser',
			isEditing: false
		}]));

		const { findAllByTestId } = render(<ToDoPage />)

		const elements = await findAllByTestId('abc123__status')
		expect(elements.length).toBe(1);
		spy.mockRestore();
	})
})
```

### Try #2
```
describe('useEffect', () => {
	it('should not show warning' , async () => {
    await act(async () => {
      render(<ToDoPage />);
    })
		expect(await screen.findByPlaceholderText('What need to be done?')).toBeInTheDocument()
	})
})
```

### Try #3
```
describe('useEffect', () => {
  const actions = require('./store/actions')
	const mockSetTodos = (actions.setTodos = jest.fn());

	it('should not show warning' , async () => {
		mockSetTodos.mockResolvedValueOnce( {type: 'SET_TODO', payload: mockTodo1} );
    await act(async () => {
      render(<ToDoPage />);
    })
		expect(mockSetTodos).toHaveBeenCalledTimes(1)
	})
})
```

### Try #4
```
describe('integration test for reducers and actions', () => {
	const dispatch= jest.fn();
	const useReducerMock= (reducer,initialState) => [initialState, dispatch];
	jest.spyOn(React, 'useReducer').mockImplementation(useReducerMock);
	it('should render', () => {
		expect(dispatch).toBeCalledWith({
			type: 'SET_TODO',
			payload: [],
		});
	})
});
```

### Try #5
```
describe('integration test for reducers and actions', () => {
	const initialState = { todos: [] };
	test('dispatch actions and verify updated state', () => {
		const {result} = renderHook(() => useReducer(reducer, initialState));
		const [state, dispatch] = result.current
		act(() => {
			dispatch({ type: 'SET_TODO', payload: [] });
		})
		expect(state).toEqual({ todos: [] });
	});
});
```